import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import {
  generateOrderNumber,
  resolveItems,
  validateCustomer,
  type CheckoutItemInput,
} from "@/lib/orders";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const customer = validateCustomer(body.customer ?? {});
    const items: CheckoutItemInput[] = Array.isArray(body.items) ? body.items : [];
    if (items.length === 0 || items.length > 50) {
      return NextResponse.json({ error: "Cart is empty" }, { status: 400 });
    }

    const paymentMethod = body.paymentMethod === "ONLINE" ? "ONLINE" : "COD";
    const resolved = resolveItems(items);
    const subtotal = resolved.reduce((s, i) => s + i.price * i.qty, 0);
    const shipping = 0; // free shipping on all orders
    const total = subtotal + shipping;

    const order = await prisma.order.create({
      data: {
        orderNumber: generateOrderNumber(),
        paymentMethod,
        ...customer,
        notes: customer.notes ?? null,
        subtotal,
        shipping,
        total,
        items: { create: resolved },
      },
      include: { items: true },
    });

    // If online payment is configured, create a Razorpay order for the client to pay.
    let razorpay: { orderId: string; keyId: string; amount: number } | null = null;
    if (paymentMethod === "ONLINE") {
      const keyId = process.env.RAZORPAY_KEY_ID;
      const keySecret = process.env.RAZORPAY_KEY_SECRET;
      if (!keyId || !keySecret) {
        return NextResponse.json(
          { error: "Online payment is not available. Please choose Cash on Delivery." },
          { status: 400 }
        );
      }
      const rpRes = await fetch("https://api.razorpay.com/v1/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization:
            "Basic " + Buffer.from(`${keyId}:${keySecret}`).toString("base64"),
        },
        body: JSON.stringify({
          amount: Math.round(total * 100),
          currency: "INR",
          receipt: order.orderNumber,
        }),
      });
      if (!rpRes.ok) {
        return NextResponse.json(
          { error: "Could not initiate online payment. Please try Cash on Delivery." },
          { status: 502 }
        );
      }
      const rpOrder = await rpRes.json();
      await prisma.order.update({
        where: { id: order.id },
        data: { paymentRef: rpOrder.id },
      });
      razorpay = { orderId: rpOrder.id, keyId, amount: rpOrder.amount };
    }

    return NextResponse.json({
      orderNumber: order.orderNumber,
      total: order.total,
      email: order.email,
      razorpay,
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Could not place order";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
