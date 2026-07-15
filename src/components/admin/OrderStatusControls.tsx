"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { ORDER_STATUSES, PAYMENT_STATUSES } from "@/lib/orders";

export default function OrderStatusControls({
  orderId,
  status,
  paymentStatus,
}: {
  orderId: number;
  status: string;
  paymentStatus: string;
}) {
  const router = useRouter();
  const [s, setS] = useState(status);
  const [ps, setPs] = useState(paymentStatus);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  async function save() {
    setSaving(true);
    setMessage(null);
    try {
      const res = await fetch(`/api/admin/orders/${orderId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: s, paymentStatus: ps }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Update failed");
      setMessage("Saved ✓");
      router.refresh();
    } catch (err) {
      setMessage(err instanceof Error ? err.message : "Update failed");
    } finally {
      setSaving(false);
    }
  }

  return (
    <aside className="h-fit rounded-2xl border border-cream-300 bg-cream-100 p-5">
      <h2 className="font-display text-lg font-semibold text-ink-950">Update Order</h2>

      <label className="mt-4 block text-xs font-semibold uppercase tracking-wider text-ink-500">
        Order Status
      </label>
      <select
        value={s}
        onChange={(e) => setS(e.target.value)}
        className="mt-1.5 w-full rounded-xl border border-cream-300 bg-cream-50 px-4 py-3 text-sm text-ink-900 outline-none focus:border-gold-500"
      >
        {ORDER_STATUSES.map((x) => (
          <option key={x} value={x}>
            {x.charAt(0) + x.slice(1).toLowerCase()}
          </option>
        ))}
      </select>

      <label className="mt-4 block text-xs font-semibold uppercase tracking-wider text-ink-500">
        Payment Status
      </label>
      <select
        value={ps}
        onChange={(e) => setPs(e.target.value)}
        className="mt-1.5 w-full rounded-xl border border-cream-300 bg-cream-50 px-4 py-3 text-sm text-ink-900 outline-none focus:border-gold-500"
      >
        {PAYMENT_STATUSES.map((x) => (
          <option key={x} value={x}>
            {x.charAt(0) + x.slice(1).toLowerCase()}
          </option>
        ))}
      </select>

      <button
        onClick={save}
        disabled={saving}
        className="mt-5 w-full rounded-full bg-ink-950 px-6 py-3 text-sm font-semibold text-cream-50 transition-colors hover:bg-gold-600 disabled:cursor-wait disabled:opacity-60"
      >
        {saving ? "Saving…" : "Save Changes"}
      </button>
      {message && <p className="mt-3 text-center text-sm text-ink-600">{message}</p>}
    </aside>
  );
}
