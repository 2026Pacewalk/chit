"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useStore } from "@/components/store/StoreProvider";
import { formatINR } from "@/lib/catalog";
import { BagIcon } from "@/components/ui/Icons";

declare global {
  interface Window {
    Razorpay?: new (options: Record<string, unknown>) => { open: () => void };
  }
}

type FormState = {
  customerName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  notes: string;
};

const empty: FormState = {
  customerName: "",
  email: "",
  phone: "",
  address: "",
  city: "",
  state: "",
  pincode: "",
  notes: "",
};

export default function CheckoutContent({ onlineEnabled }: { onlineEnabled: boolean }) {
  const { cart, cartTotal, clearCart } = useStore();
  const router = useRouter();
  const [form, setForm] = useState<FormState>(empty);
  const [payment, setPayment] = useState<"COD" | "ONLINE">("COD");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (cart.length === 0) {
    return (
      <div className="flex flex-col items-center gap-5 py-24 text-center">
        <BagIcon size={56} className="text-cream-300" />
        <h1 className="font-display text-2xl font-semibold text-ink-950">
          Nothing to check out yet
        </h1>
        <p className="max-w-sm text-sm text-ink-500">Add some products to your cart first.</p>
        <Link
          href="/collections"
          className="rounded-full bg-ink-950 px-8 py-3.5 text-sm font-semibold text-cream-50 hover:bg-ink-800 transition-colors"
        >
          Browse Products
        </Link>
      </div>
    );
  }

  const set = (k: keyof FormState) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  async function loadRazorpay(): Promise<boolean> {
    if (window.Razorpay) return true;
    return new Promise((resolve) => {
      const s = document.createElement("script");
      s.src = "https://checkout.razorpay.com/v1/checkout.js";
      s.onload = () => resolve(true);
      s.onerror = () => resolve(false);
      document.body.appendChild(s);
    });
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customer: form,
          items: cart.map((i) => ({ variantId: i.variantId, qty: i.qty })),
          paymentMethod: payment,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Could not place order");

      if (payment === "ONLINE" && data.razorpay) {
        const ok = await loadRazorpay();
        if (!ok || !window.Razorpay) throw new Error("Could not load payment gateway");
        const rzp = new window.Razorpay({
          key: data.razorpay.keyId,
          amount: data.razorpay.amount,
          currency: "INR",
          name: "Chitrangi",
          description: `Order ${data.orderNumber}`,
          order_id: data.razorpay.orderId,
          prefill: { name: form.customerName, email: form.email, contact: form.phone },
          theme: { color: "#c19a3d" },
          handler: async (resp: Record<string, string>) => {
            await fetch("/api/payments/verify", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(resp),
            });
            finish(data.orderNumber, data.email);
          },
        });
        rzp.open();
        setSubmitting(false);
        return;
      }

      finish(data.orderNumber, data.email);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
      setSubmitting(false);
    }
  }

  function finish(orderNumber: string, email: string) {
    try {
      sessionStorage.setItem(
        "chitrangi:lastOrder",
        JSON.stringify({ orderNumber, contact: email })
      );
    } catch {}
    clearCart();
    router.push(`/order-confirmation?number=${encodeURIComponent(orderNumber)}`);
  }

  return (
    <div>
      <h1 className="font-display text-3xl font-semibold text-ink-950 sm:text-4xl">Checkout</h1>
      <div className="gold-rule mt-5 w-24" />

      <form onSubmit={submit} className="mt-8 grid gap-10 lg:grid-cols-[1fr_380px]">
        {/* Shipping form */}
        <div className="space-y-4">
          <h2 className="font-display text-xl font-semibold text-ink-950">Shipping Details</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Full Name" required value={form.customerName} onChange={set("customerName")} />
            <Field label="Email" type="email" required value={form.email} onChange={set("email")} />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Phone Number" type="tel" required value={form.phone} onChange={set("phone")} placeholder="+91…" />
            <Field label="Pincode" required value={form.pincode} onChange={set("pincode")} pattern="\d{6}" title="6-digit pincode" />
          </div>
          <Field label="Address" required value={form.address} onChange={set("address")} placeholder="House no., street, area" />
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="City" required value={form.city} onChange={set("city")} />
            <Field label="State" required value={form.state} onChange={set("state")} />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-ink-800">
              Order Notes <span className="text-ink-400">(personalization details, optional)</span>
            </label>
            <textarea
              rows={3}
              value={form.notes}
              onChange={set("notes")}
              placeholder="Names, dates, photo instructions — anything we should know for your personalized item"
              className="w-full rounded-xl border border-cream-300 bg-cream-50 px-4 py-3 text-ink-900 outline-none transition-colors placeholder:text-ink-400 focus:border-gold-500"
            />
          </div>

          <h2 className="pt-4 font-display text-xl font-semibold text-ink-950">Payment Method</h2>
          <div className="space-y-3">
            <PayOption
              checked={payment === "COD"}
              onChange={() => setPayment("COD")}
              title="Cash on Delivery"
              text="Pay when your order arrives. Our team will call to confirm your order before dispatch."
            />
            <PayOption
              checked={payment === "ONLINE"}
              onChange={() => setPayment("ONLINE")}
              disabled={!onlineEnabled}
              title="Pay Online (UPI / Cards / Netbanking)"
              badge={onlineEnabled ? undefined : "Coming Soon"}
              text={
                onlineEnabled
                  ? "Secure payment via Razorpay. Free shipping on all prepaid orders."
                  : "Online payment is launching soon — please use Cash on Delivery for now."
              }
            />
          </div>
        </div>

        {/* Summary */}
        <aside className="h-fit rounded-2xl border border-cream-300 bg-cream-100 p-6">
          <h2 className="font-display text-xl font-semibold text-ink-950">Order Summary</h2>
          <ul className="mt-4 divide-y divide-cream-200">
            {cart.map((i) => (
              <li key={i.variantId} className="flex items-center gap-3 py-3">
                <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-lg bg-cream-200">
                  <Image src={i.image} alt={i.title} fill sizes="56px" className="object-cover" />
                  <span className="absolute -right-0 -top-0 flex h-5 min-w-5 items-center justify-center rounded-full bg-ink-950 px-1 text-[10px] font-semibold text-cream-50">
                    {i.qty}
                  </span>
                </div>
                <div className="min-w-0 flex-1">
                  <p className="line-clamp-1 text-sm font-medium text-ink-900">{i.title}</p>
                  {i.variantTitle && <p className="text-xs text-ink-500">{i.variantTitle}</p>}
                </div>
                <span className="text-sm font-semibold text-ink-950">
                  {formatINR(i.price * i.qty)}
                </span>
              </li>
            ))}
          </ul>
          <div className="gold-rule my-4" />
          <dl className="space-y-2 text-sm">
            <div className="flex justify-between">
              <dt className="text-ink-600">Subtotal</dt>
              <dd className="font-medium">{formatINR(cartTotal)}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-ink-600">Shipping</dt>
              <dd className="font-medium text-gold-700">Free</dd>
            </div>
          </dl>
          <div className="mt-3 flex justify-between border-t border-cream-300 pt-3">
            <span className="font-semibold text-ink-950">Total</span>
            <span className="font-display text-2xl font-semibold text-ink-950">
              {formatINR(cartTotal)}
            </span>
          </div>

          {error && (
            <p className="mt-4 rounded-lg bg-rose-accent/10 px-4 py-3 text-sm text-rose-accent">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={submitting}
            className="mt-5 w-full rounded-full bg-ink-950 px-6 py-4 text-sm font-semibold text-cream-50 transition-colors hover:bg-gold-600 disabled:cursor-wait disabled:opacity-60"
          >
            {submitting ? "Placing Order…" : payment === "ONLINE" ? "Pay & Place Order" : "Place Order"}
          </button>
          <p className="mt-3 text-center text-xs text-ink-500">
            By placing an order you agree to our{" "}
            <Link href="/pages/terms-and-conditions" className="underline">
              Terms & Conditions
            </Link>
            .
          </p>
        </aside>
      </form>
    </div>
  );
}

function Field({
  label,
  required,
  type = "text",
  value,
  onChange,
  placeholder,
  pattern,
  title,
}: {
  label: string;
  required?: boolean;
  type?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  pattern?: string;
  title?: string;
}) {
  return (
    <div>
      <label className="mb-1.5 block text-sm font-medium text-ink-800">
        {label} {required && <span className="text-rose-accent">*</span>}
      </label>
      <input
        type={type}
        required={required}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        pattern={pattern}
        title={title}
        className="w-full rounded-xl border border-cream-300 bg-cream-50 px-4 py-3 text-ink-900 outline-none transition-colors placeholder:text-ink-400 focus:border-gold-500"
      />
    </div>
  );
}

function PayOption({
  checked,
  onChange,
  disabled,
  title,
  text,
  badge,
}: {
  checked: boolean;
  onChange: () => void;
  disabled?: boolean;
  title: string;
  text: string;
  badge?: string;
}) {
  return (
    <label
      className={`flex cursor-pointer items-start gap-3 rounded-xl border p-4 transition-colors ${
        checked ? "border-gold-500 bg-gold-500/5" : "border-cream-300"
      } ${disabled ? "cursor-not-allowed opacity-60" : "hover:border-gold-400"}`}
    >
      <input
        type="radio"
        name="payment"
        checked={checked}
        onChange={onChange}
        disabled={disabled}
        className="mt-1 h-4 w-4 accent-gold-600"
      />
      <span>
        <span className="flex flex-wrap items-center gap-2 font-medium text-ink-950">
          {title}
          {badge && (
            <span className="rounded-full bg-gold-500/15 px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wide text-gold-700">
              {badge}
            </span>
          )}
        </span>
        <span className="mt-0.5 block text-sm text-ink-500">{text}</span>
      </span>
    </label>
  );
}
