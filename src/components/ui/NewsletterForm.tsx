"use client";

import { useState } from "react";

export default function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);
  const [sending, setSending] = useState(false);

  if (done) {
    return (
      <p className="mt-4 rounded-lg bg-gold-500/15 px-4 py-3 text-sm text-gold-300">
        Thank you for subscribing! We&apos;ll keep you posted.
      </p>
    );
  }

  return (
    <form
      className="mt-4 flex overflow-hidden rounded-lg border border-cream-200/20 focus-within:border-gold-400"
      onSubmit={async (e) => {
        e.preventDefault();
        setSending(true);
        try {
          const res = await fetch("/api/newsletter", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email }),
          });
          if (res.ok) setDone(true);
        } finally {
          setSending(false);
        }
      }}
    >
      <input
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Your email address"
        className="w-full bg-transparent px-4 py-3 text-sm text-cream-50 placeholder:text-cream-200/40 outline-none"
      />
      <button
        type="submit"
        className="shrink-0 bg-gold-500 px-5 text-sm font-semibold text-ink-950 hover:bg-gold-400 transition-colors"
      >
        Subscribe
      </button>
    </form>
  );
}
