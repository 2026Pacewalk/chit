import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export const runtime = "nodejs";

/**
 * Order lookup: requires the order number PLUS the email or phone used at
 * checkout, so order details are only visible to the customer who placed it.
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const orderNumber = String(body.orderNumber || "").trim().toUpperCase();
    const contact = String(body.contact || "").trim().toLowerCase();
    if (!orderNumber || !contact) {
      return NextResponse.json({ error: "Order number and email/phone are required" }, { status: 400 });
    }

    const order = await prisma.order.findUnique({
      where: { orderNumber },
      include: { items: true },
    });

    const digits = contact.replace(/[^\d]/g, "");
    const matches =
      order &&
      (order.email.toLowerCase() === contact ||
        (digits.length >= 8 && order.phone.replace(/[^\d]/g, "").endsWith(digits.slice(-10))));

    if (!order || !matches) {
      return NextResponse.json(
        { error: "No order found for that order number and email/phone" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      order: {
        orderNumber: order.orderNumber,
        status: order.status,
        paymentMethod: order.paymentMethod,
        paymentStatus: order.paymentStatus,
        customerName: order.customerName,
        city: order.city,
        state: order.state,
        subtotal: order.subtotal,
        shipping: order.shipping,
        total: order.total,
        createdAt: order.createdAt,
        items: order.items.map((i) => ({
          title: i.title,
          variantTitle: i.variantTitle,
          image: i.image,
          price: i.price,
          qty: i.qty,
        })),
      },
    });
  } catch {
    return NextResponse.json({ error: "Could not look up order" }, { status: 400 });
  }
}
