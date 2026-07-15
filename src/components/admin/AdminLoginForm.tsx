"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function AdminLoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  return (
    <form
      className="mt-8 space-y-4 rounded-2xl border border-cream-300 bg-cream-100 p-7"
      onSubmit={async (e) => {
        e.preventDefault();
        setError(null);
        setLoading(true);
        try {
          const res = await fetch("/api/admin/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password }),
          });
          const data = await res.json();
          if (!res.ok) throw new Error(data.error || "Login failed");
          router.push("/admin");
          router.refresh();
        } catch (err) {
          setError(err instanceof Error ? err.message : "Login failed");
          setLoading(false);
        }
      }}
    >
      <div>
        <label className="mb-1.5 block text-sm font-medium text-ink-800">Email</label>
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full rounded-xl border border-cream-300 bg-cream-50 px-4 py-3 text-ink-900 outline-none focus:border-gold-500"
          autoComplete="username"
        />
      </div>
      <div>
        <label className="mb-1.5 block text-sm font-medium text-ink-800">Password</label>
        <input
          type="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full rounded-xl border border-cream-300 bg-cream-50 px-4 py-3 text-ink-900 outline-none focus:border-gold-500"
          autoComplete="current-password"
        />
      </div>
      {error && (
        <p className="rounded-lg bg-rose-accent/10 px-4 py-3 text-sm text-rose-accent">{error}</p>
      )}
      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-full bg-ink-950 px-6 py-3.5 text-sm font-semibold text-cream-50 transition-colors hover:bg-gold-600 disabled:cursor-wait disabled:opacity-60"
      >
        {loading ? "Signing in…" : "Sign In"}
      </button>
    </form>
  );
}
