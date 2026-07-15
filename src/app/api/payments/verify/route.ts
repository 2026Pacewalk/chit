import { NextRequest, NextResponse } from "next/server";
import { createHmac, timingSafeEqual } from "crypto";
import { prisma } from "@/lib/db";

export const runtime = "nodejs";

/** Verify a Razorpay payment signature and mark the order as paid. */
export async function POST(req: NextRequest) {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = await req.json();
    const keySecret = process.env.RAZORPAY_KEY_SECRET;
    if (!keySecret || !razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return NextResponse.json({ error: "Invalid payment verification request" }, { status: 400 });
    }

    const expected = createHmac("sha256", keySecret)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest("hex");

    const a = Buffer.from(expected);
    const b = Buffer.from(String(razorpay_signature));
    if (a.length !== b.length || !timingSafeEqual(a, b)) {
      return NextResponse.json({ error: "Payment signature mismatch" }, { status: 400 });
    }

    const order = await prisma.order.findFirst({ where: { paymentRef: razorpay_order_id } });
    if (!order) return NextResponse.json({ error: "Order not found" }, { status: 404 });

    await prisma.order.update({
      where: { id: order.id },
      data: { paymentStatus: "PAID", status: "CONFIRMED", paymentRef: razorpay_payment_id },
    });

    return NextResponse.json({ ok: true, orderNumber: order.orderNumber });
  } catch {
    return NextResponse.json({ error: "Payment verification failed" }, { status: 400 });
  }
}
