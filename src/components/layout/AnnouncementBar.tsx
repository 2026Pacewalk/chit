"use client";

import Link from "next/link";
import { useState } from "react";
import { CloseIcon } from "@/components/ui/Icons";

export default function AnnouncementBar() {
  const [open, setOpen] = useState(true);
  if (!open) return null;

  return (
    <div className="relative bg-cream-100 text-ink-900">
      <div className="mx-auto flex max-w-7xl items-center justify-center gap-3 px-10 py-2.5 text-sm">
        <p>
          Free shipping on orders over <strong>₹999</strong>!
        </p>
        <Link
          href="/collections"
          className="rounded bg-gold-500 px-4 py-1.5 text-[13px] font-semibold text-white transition-colors hover:bg-gold-600"
        >
          Shop Now
        </Link>
      </div>
      <button
        onClick={() => setOpen(false)}
        aria-label="Dismiss announcement"
        className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 text-gold-500 hover:text-gold-700 transition-colors"
      >
        <CloseIcon size={18} />
      </button>
    </div>
  );
}
