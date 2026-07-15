"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { formatINR } from "@/lib/catalog";

type TrackedOrder = {
  orderNumber: string;
  status: string;
  paymentMethod: string;
  paymentStatus: string;
  customerName: string;
  city: string;
  state: string;
  subtotal: number;
  shipping: number;
  total: number;
  createdAt: string;
  items: {
    title: string;
    variantTitle: string | null;
    image: string | null;
    price: number;
    qty: number;
  }[];
};

const STATUS_STEPS = ["PENDING", "CONFIRMED", "PROCESSING", "SHIPPED", "DELIVERED"];

const STATUS_LABELS: Record<string, string> = {
  PENDING: "Order Placed",
  CONFIRMED: "Confirmed",
  PROCESSING: "In Production",
  SHIPPED: "Shipped",
  DELIVERED: "Delivered",
  CANCELLED: "Cancelled",
};

export default function TrackOrderContent() {
  const [orderNumber, setOrderNumber] = useState("");
  const [contact, setContact] = useState("");
  const [order, setOrder] = useState<TrackedOrder | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    try {
      const last = sessionStorage.getItem("chitrangi:lastOrder");
      if (last) {
        const parsed = JSON.parse(last);
        if (parsed.orderNumber) setOrderNumber(parsed.orderNumber);
        if (parsed.contact) setContact(parsed.contact);
      }
    } catch {}
  }, []);

  async function lookup(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setOrder(null);
    setLoading(true);
    try {
      const res = await fetch("/api/orders/track", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderNumber, contact }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Lookup failed");
      setOrder(data.order);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Lookup failed");
    } finally {
      setLoading(false);
    }
  }

  const stepIndex = order ? STATUS_STEPS.indexOf(order.status) : -1;

  return (
    <div>
      <h1 className="font-display text-3xl font-semibold text-ink-950 sm:text-4xl">Track Order</h1>
      <p className="mt-3 text-ink-500">
        Enter your order number along with the email or phone you used at checkout.
      </p>
      <div className="gold-rule mt-5 w-24" />

      <form onSubmit={lookup} className="mt-8 grid gap-4 sm:grid-cols-[1fr_1fr_auto]">
        <input
          required
          value={orderNumber}
          onChange={(e) => setOrderNumber(e.target.value)}
          placeholder="Order number (e.g. CH-XXXXXX)"
          className="rounded-xl border border-cream-300 bg-cream-50 px-4 py-3 text-ink-900 outline-none placeholder:text-ink-400 focus:border-gold-500"
          aria-label="Order number"
        />
        <input
          required
          value={contact}
          onChange={(e) => setContact(e.target.value)}
          placeholder="Email or phone used at checkout"
          className="rounded-xl border border-cream-300 bg-cream-50 px-4 py-3 text-ink-900 outline-none placeholder:text-ink-400 focus:border-gold-500"
          aria-label="Email or phone"
        />
        <button
          type="submit"
          disabled={loading}
          className="rounded-xl bg-ink-950 px-7 py-3 text-sm font-semibold text-cream-50 transition-colors hover:bg-gold-600 disabled:cursor-wait disabled:opacity-60"
        >
          {loading ? "Checking…" : "Track"}
        </button>
      </form>

      {error && (
        <p className="mt-5 rounded-lg bg-rose-accent/10 px-4 py-3 text-sm text-rose-accent">{error}</p>
      )}

      {order && (
        <div className="mt-8 rounded-2xl border border-cream-300 bg-cream-100 p-6 sm:p-8 animate-fade-up">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-ink-500">Order</p>
              <p className="font-display text-xl font-semibold text-ink-950">{order.orderNumber}</p>
            </div>
            <span
              className={`rounded-full px-4 py-1.5 text-sm font-semibold ${
                order.status === "CANCELLED"
                  ? "bg-rose-accent/10 text-rose-accent"
                  : "bg-gold-500/15 text-gold-700"
              }`}
            >
              {STATUS_LABELS[order.status] ?? order.status}
            </span>
          </div>

          {/* Progress */}
          {order.status !== "CANCELLED" && (
            <div className="mt-7 flex items-center">
              {STATUS_STEPS.map((s, i) => (
                <div key={s} className="flex flex-1 items-center last:flex-none">
                  <div className="flex flex-col items-center">
                    <span
                      className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold ${
                        i <= stepIndex
                          ? "bg-gold-500 text-ink-950"
                          : "bg-cream-300 text-ink-500"
                      }`}
                    >
                      {i + 1}
                    </span>
                    <span className="mt-1.5 hidden text-[11px] text-ink-600 sm:block">
                      {STATUS_LABELS[s]}
                    </span>
                  </div>
                  {i < STATUS_STEPS.length - 1 && (
                    <div
                      className={`mx-1 h-0.5 flex-1 self-start mt-4 ${
                        i < stepIndex ? "bg-gold-500" : "bg-cream-300"
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>
          )}

          <div className="mt-6 grid gap-1 text-sm text-ink-600">
            <p>
              Placed on{" "}
              {new Date(order.createdAt).toLocaleDateString("en-IN", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}{" "}
              · Shipping to {order.city}, {order.state}
            </p>
            <p>
              Payment: {order.paymentMethod === "COD" ? "Cash on Delivery" : "Online"} ·{" "}
              {order.paymentStatus === "PAID" ? "Paid" : order.paymentStatus.toLowerCase()}
            </p>
          </div>

          <ul className="mt-5 divide-y divide-cream-200 border-t border-cream-200">
            {order.items.map((i, idx) => (
              <li key={idx} className="flex items-center gap-3 py-3">
                {i.image && (
                  <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-lg bg-cream-200">
                    <Image src={i.image} alt={i.title} fill sizes="48px" className="object-cover" />
                  </div>
                )}
                <div className="min-w-0 flex-1">
                  <p className="line-clamp-1 text-sm font-medium text-ink-900">{i.title}</p>
                  {i.variantTitle && <p className="text-xs text-ink-500">{i.variantTitle}</p>}
                </div>
                <span className="text-sm text-ink-600">× {i.qty}</span>
                <span className="w-20 text-right text-sm font-semibold text-ink-950">
                  {formatINR(i.price * i.qty)}
                </span>
              </li>
            ))}
          </ul>
          <div className="mt-3 flex justify-between border-t border-cream-300 pt-3">
            <span className="font-semibold text-ink-950">Total</span>
            <span className="font-display text-xl font-semibold text-ink-950">
              {formatINR(order.total)}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
