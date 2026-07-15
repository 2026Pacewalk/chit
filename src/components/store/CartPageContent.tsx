"use client";

import Image from "next/image";
import Link from "next/link";
import { useStore } from "@/components/store/StoreProvider";
import { formatINR } from "@/lib/catalog";
import { site } from "@/data/site";
import {
  BagIcon,
  MinusIcon,
  PlusIcon,
  TrashIcon,
  WhatsAppIcon,
} from "@/components/ui/Icons";

export default function CartPageContent() {
  const { cart, setQty, removeFromCart, clearCart, cartTotal } = useStore();

  if (cart.length === 0) {
    return (
      <div className="flex flex-col items-center gap-5 py-24 text-center">
        <BagIcon size={56} className="text-cream-300" />
        <h1 className="font-display text-2xl font-semibold text-ink-950">Your cart is empty</h1>
        <p className="max-w-sm text-sm text-ink-500">
          Discover personalized gifts crafted with care — from custom caricatures to smart NFC cards.
        </p>
        <Link
          href="/collections"
          className="rounded-full bg-ink-950 px-8 py-3.5 text-sm font-semibold text-cream-50 hover:bg-ink-800 transition-colors"
        >
          Start Shopping
        </Link>
      </div>
    );
  }

  const waText = encodeURIComponent(
    `Hi Chitrangi! I'd like to place an order:\n\n${cart
      .map((i) => `• ${i.title}${i.variantTitle ? ` (${i.variantTitle})` : ""} × ${i.qty} — ${formatINR(i.price * i.qty)}`)
      .join("\n")}\n\nTotal: ${formatINR(cartTotal)}`
  );

  return (
    <div>
      <h1 className="font-display text-3xl font-semibold text-ink-950 sm:text-4xl">Your Cart</h1>
      <div className="gold-rule mt-5 w-24" />

      <div className="mt-8 grid gap-10 lg:grid-cols-[1fr_360px]">
        <ul className="divide-y divide-cream-200">
          {cart.map((item) => (
            <li key={item.variantId} className="flex gap-5 py-5">
              <Link
                href={`/products/${item.handle}`}
                className="relative h-28 w-28 shrink-0 overflow-hidden rounded-xl bg-cream-200"
              >
                <Image src={item.image} alt={item.title} fill sizes="112px" className="object-cover" />
              </Link>
              <div className="flex min-w-0 flex-1 flex-col">
                <Link
                  href={`/products/${item.handle}`}
                  className="font-medium text-ink-900 hover:text-gold-600 transition-colors"
                >
                  {item.title}
                </Link>
                {item.variantTitle && (
                  <p className="mt-0.5 text-sm text-ink-500">{item.variantTitle}</p>
                )}
                <p className="mt-1 text-sm text-ink-500">{formatINR(item.price)} each</p>
                <div className="mt-auto flex flex-wrap items-center justify-between gap-3 pt-3">
                  <div className="flex items-center rounded-full border border-cream-300">
                    <button
                      onClick={() => setQty(item.variantId, item.qty - 1)}
                      className="p-2 text-ink-600 hover:text-ink-950"
                      aria-label="Decrease quantity"
                    >
                      <MinusIcon size={15} />
                    </button>
                    <span className="w-8 text-center text-sm font-medium">{item.qty}</span>
                    <button
                      onClick={() => setQty(item.variantId, item.qty + 1)}
                      className="p-2 text-ink-600 hover:text-ink-950"
                      aria-label="Increase quantity"
                    >
                      <PlusIcon size={15} />
                    </button>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="font-semibold text-ink-950">
                      {formatINR(item.price * item.qty)}
                    </span>
                    <button
                      onClick={() => removeFromCart(item.variantId)}
                      className="text-ink-400 hover:text-rose-accent transition-colors"
                      aria-label={`Remove ${item.title}`}
                    >
                      <TrashIcon size={17} />
                    </button>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>

        <aside className="h-fit rounded-2xl border border-cream-300 bg-cream-100 p-6">
          <h2 className="font-display text-xl font-semibold text-ink-950">Order Summary</h2>
          <dl className="mt-4 space-y-2.5 text-sm">
            <div className="flex justify-between">
              <dt className="text-ink-600">Subtotal</dt>
              <dd className="font-medium text-ink-950">{formatINR(cartTotal)}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-ink-600">Shipping</dt>
              <dd className="font-medium text-ink-950">Free on prepaid orders</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-ink-600">GST</dt>
              <dd className="text-ink-500">Calculated at checkout</dd>
            </div>
          </dl>
          <div className="gold-rule my-4" />
          <div className="flex justify-between">
            <span className="font-semibold text-ink-950">Total</span>
            <span className="font-display text-2xl font-semibold text-ink-950">
              {formatINR(cartTotal)}
            </span>
          </div>
          <Link
            href="/checkout"
            className="mt-5 flex items-center justify-center rounded-full bg-ink-950 px-6 py-3.5 text-sm font-semibold text-cream-50 transition-colors hover:bg-gold-600"
          >
            Proceed to Checkout
          </Link>
          <a
            href={`https://wa.me/${site.whatsapp}?text=${waText}`}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2.5 flex items-center justify-center gap-2 rounded-full bg-[#25D366] px-6 py-3.5 text-sm font-semibold text-white transition hover:brightness-105"
          >
            <WhatsAppIcon size={18} /> Order via WhatsApp
          </a>
          <p className="mt-3 text-center text-xs text-ink-500">
            Our team confirms every order personally and shares live product previews before dispatch.
          </p>
          <button
            onClick={clearCart}
            className="mt-4 w-full text-center text-xs text-ink-400 underline underline-offset-2 hover:text-rose-accent"
          >
            Clear cart
          </button>
        </aside>
      </div>
    </div>
  );
}
