"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

const links = [
  { label: "Dashboard", href: "/admin" },
  { label: "Orders", href: "/admin/orders" },
  { label: "Messages", href: "/admin/messages" },
  { label: "Subscribers", href: "/admin/subscribers" },
  { label: "Settings", href: "/admin/settings" },
];

export default function AdminNav() {
  const pathname = usePathname();
  const router = useRouter();

  if (pathname === "/admin/login") return null;

  return (
    <div className="mb-8 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-cream-300 bg-cream-100 px-5 py-3">
      <div className="flex flex-wrap items-center gap-1">
        <span className="mr-3 font-display text-lg font-semibold text-ink-950">
          Chitrangi Admin
        </span>
        {links.map((l) => {
          const active =
            l.href === "/admin" ? pathname === "/admin" : pathname.startsWith(l.href);
          return (
            <Link
              key={l.href}
              href={l.href}
              className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                active
                  ? "bg-ink-950 text-cream-50"
                  : "text-ink-600 hover:bg-cream-200 hover:text-ink-950"
              }`}
            >
              {l.label}
            </Link>
          );
        })}
      </div>
      <button
        onClick={async () => {
          await fetch("/api/admin/logout", { method: "POST" });
          router.push("/admin/login");
          router.refresh();
        }}
        className="rounded-full border border-cream-300 px-4 py-2 text-sm text-ink-600 hover:border-rose-accent hover:text-rose-accent transition-colors"
      >
        Log out
      </button>
    </div>
  );
}
