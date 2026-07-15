"use client";

import { useState } from "react";

export default function ContactForm() {
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [sending, setSending] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });

  if (sent) {
    return (
      <div className="mt-6 rounded-2xl border border-gold-500/40 bg-gold-500/10 p-8 text-center">
        <p className="font-display text-xl font-semibold text-ink-950">Thank you, {form.name}!</p>
        <p className="mt-2 text-sm text-ink-600">
          Your message has been received. We&apos;ll get back to you within one working day.
        </p>
      </div>
    );
  }

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  return (
    <form
      className="mt-6 space-y-4"
      onSubmit={async (e) => {
        e.preventDefault();
        setError(null);
        setSending(true);
        try {
          const res = await fetch("/api/contact", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(form),
          });
          const data = await res.json();
          if (!res.ok) throw new Error(data.error || "Could not send message");
          setSent(true);
        } catch (err) {
          setError(err instanceof Error ? err.message : "Could not send message");
        } finally {
          setSending(false);
        }
      }}
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Your Name" required value={form.name} onChange={set("name")} />
        <Field label="Email Address" type="email" required value={form.email} onChange={set("email")} />
      </div>
      <Field label="Phone Number" type="tel" value={form.phone} onChange={set("phone")} />
      <div>
        <label className="mb-1.5 block text-sm font-medium text-ink-800">
          Message <span className="text-rose-accent">*</span>
        </label>
        <textarea
          required
          rows={5}
          value={form.message}
          onChange={set("message")}
          className="w-full rounded-xl border border-cream-300 bg-cream-50 px-4 py-3 text-ink-900 outline-none transition-colors placeholder:text-ink-400 focus:border-gold-500"
          placeholder="Tell us about your gift idea…"
        />
      </div>
      {error && (
        <p className="rounded-lg bg-rose-accent/10 px-4 py-3 text-sm text-rose-accent">{error}</p>
      )}
      <button
        type="submit"
        disabled={sending}
        className="rounded-full bg-ink-950 px-9 py-3.5 text-sm font-semibold text-cream-50 transition-colors hover:bg-gold-600 disabled:cursor-wait disabled:opacity-60"
      >
        {sending ? "Sending…" : "Submit"}
      </button>
    </form>
  );
}

function Field({
  label,
  required,
  type = "text",
  value,
  onChange,
}: {
  label: string;
  required?: boolean;
  type?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
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
        className="w-full rounded-xl border border-cream-300 bg-cream-50 px-4 py-3 text-ink-900 outline-none transition-colors placeholder:text-ink-400 focus:border-gold-500"
      />
    </div>
  );
}
