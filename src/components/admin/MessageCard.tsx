"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function MessageCard({
  id,
  name,
  email,
  phone,
  message,
  read,
  createdAt,
}: {
  id: number;
  name: string;
  email: string;
  phone: string | null;
  message: string;
  read: boolean;
  createdAt: string;
}) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);

  async function toggleRead() {
    setBusy(true);
    try {
      await fetch(`/api/admin/messages/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ read: !read }),
      });
      router.refresh();
    } finally {
      setBusy(false);
    }
  }

  return (
    <div
      className={`rounded-2xl border p-5 ${
        read ? "border-cream-300 bg-cream-50" : "border-gold-500/50 bg-gold-500/5"
      }`}
    >
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2.5">
          {!read && <span className="h-2 w-2 rounded-full bg-gold-500" aria-label="Unread" />}
          <p className="font-semibold text-ink-950">{name}</p>
          <a href={`mailto:${email}`} className="text-sm text-gold-700 hover:underline">
            {email}
          </a>
          {phone && (
            <a href={`tel:${phone}`} className="text-sm text-ink-500 hover:text-gold-600">
              {phone}
            </a>
          )}
        </div>
        <div className="flex items-center gap-3">
          <span className="text-xs text-ink-500">
            {new Date(createdAt).toLocaleString("en-IN", {
              day: "numeric",
              month: "short",
              hour: "2-digit",
              minute: "2-digit",
            })}
          </span>
          <button
            onClick={toggleRead}
            disabled={busy}
            className="rounded-full border border-cream-300 px-3.5 py-1.5 text-xs font-semibold text-ink-600 hover:border-gold-500 hover:text-gold-600 transition-colors disabled:opacity-50"
          >
            {read ? "Mark unread" : "Mark read"}
          </button>
        </div>
      </div>
      <p className="mt-3 whitespace-pre-wrap text-sm leading-relaxed text-ink-700">{message}</p>
    </div>
  );
}
