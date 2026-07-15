"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { site } from "@/data/site";
import { WhatsAppIcon } from "@/components/ui/Icons";

export default function OrderConfirmationContent() {
  const params = useSearchParams();
  const number = params.get("number") || "";
  const [copied, setCopied] = useState(false);

  return (
    <div className="text-center">
      <span className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-gold-500/15 ring-1 ring-gold-500/40">
        <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gold-600" aria-hidden="true">
          <path d="m5 12 5 5L20 7" />
        </svg>
      </span>
      <h1 className="mt-6 font-display text-3xl font-semibold text-ink-950 sm:text-4xl">
        Thank You! Order Placed
      </h1>
      <p className="mx-auto mt-3 max-w-md text-ink-600">
        Our team will call you to confirm your order and personalization details before dispatch.
        Paid orders are dispatched the next working day.
      </p>

      {number && (
        <div className="mx-auto mt-8 max-w-sm rounded-2xl border border-cream-300 bg-cream-100 p-6">
          <p className="text-xs font-semibold uppercase tracking-widest text-ink-500">
            Your Order Number
          </p>
          <p className="mt-2 font-display text-2xl font-semibold tracking-wide text-ink-950">
            {number}
          </p>
          <button
            onClick={() => {
              navigator.clipboard?.writeText(number).then(() => {
                setCopied(true);
                setTimeout(() => setCopied(false), 2000);
              });
            }}
            className="mt-3 text-xs text-gold-700 underline underline-offset-2 hover:text-gold-600"
          >
            {copied ? "Copied!" : "Copy order number"}
          </button>
          <p className="mt-3 text-xs text-ink-500">
            Save this number — you can check your order status anytime on the{" "}
            <Link href="/track" className="underline">
              Track Order
            </Link>{" "}
            page.
          </p>
        </div>
      )}

      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link
          href="/track"
          className="rounded-full bg-ink-950 px-7 py-3.5 text-sm font-semibold text-cream-50 hover:bg-ink-800 transition-colors"
        >
          Track Order
        </Link>
        <Link
          href="/collections"
          className="rounded-full border border-ink-950 px-7 py-3.5 text-sm font-semibold text-ink-950 hover:bg-ink-950 hover:text-cream-50 transition-colors"
        >
          Continue Shopping
        </Link>
      </div>

      <a
        href={`https://wa.me/${site.whatsapp}?text=${encodeURIComponent(
          `Hi Chitrangi! I just placed order ${number}. I'd like to share my personalization details.`
        )}`}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[#1da851] hover:underline"
      >
        <WhatsAppIcon size={18} /> Share personalization photos on WhatsApp
      </a>
    </div>
  );
}
