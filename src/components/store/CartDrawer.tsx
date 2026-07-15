"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import { useStore } from "@/components/store/StoreProvider";
import { formatINR } from "@/lib/catalog";
import { site } from "@/data/site";
import {
  BagIcon,
  CloseIcon,
  MinusIcon,
  PlusIcon,
  TrashIcon,
  WhatsAppIcon,
} from "@/components/ui/Icons";

export default function CartDrawer() {
  const { cart, cartOpen, setCartOpen, setQty, removeFromCart, cartTotal } = useStore();

  useEffect(() => {
    document.body.style.overflow = cartOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [cartOpen]);

  if (!cartOpen) return null;

  const waText = encodeURIComponent(
    `Hi Chitrangi! I'd like to place an order:\n\n${cart
      .map((i) => `• ${i.title}${i.variantTitle ? ` (${i.variantTitle})` : ""} × ${i.qty} — ${formatINR(i.price * i.qty)}`)
      .join("\n")}\n\nTotal: ${formatINR(cartTotal)}`
  );

  return (
    <div className="fixed inset-0 z-50">
      <div
        className="absolute inset-0 bg-ink-950/50 backdrop-blur-sm animate-fade-in"
        onClick={() => setCartOpen(false)}
      />
      <aside className="absolute inset-y-0 right-0 flex w-full max-w-md flex-col bg-cream-50 shadow-2xl animate-fade-in">
        <div className="flex items-center justify-between border-b border-cream-300 px-5 py-4">
          <h2 className="font-display text-xl text-ink-950">
            Your Cart{" "}
            <span className="font-body text-sm text-ink-500">
              ({cart.reduce((s, i) => s + i.qty, 0)} items)
            </span>
          </h2>
          <button onClick={() => setCartOpen(false)} aria-label="Close cart" className="p-2 text-ink-700 hover:text-ink-950">
            <CloseIcon size={22} />
          </button>
        </div>

        {cart.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 px-6 text-center">
            <BagIcon size={48} className="text-cream-300" />
            <p className="text-ink-500">Your cart is empty.</p>
            <button
              onClick={() => setCartOpen(false)}
              className="rounded-full bg-ink-950 px-6 py-3 text-sm font-semibold text-cream-50 hover:bg-ink-800 transition-colors"
            >
              Continue Shopping
            </button>
          </div>
        ) : (
          <>
            <ul className="flex-1 divide-y divide-cream-200 overflow-y-auto px-5">
              {cart.map((item) => (
                <li key={item.variantId} className="flex gap-4 py-4">
                  <Link
                    href={`/products/${item.handle}`}
                    onClick={() => setCartOpen(false)}
                    className="relative h-20 w-20 shrink-0 overflow-hidden rounded-lg bg-cream-200"
                  >
                    <Image src={item.image} alt={item.title} fill className="object-cover" sizes="80px" />
                  </Link>
                  <div className="flex min-w-0 flex-1 flex-col">
                    <Link
                      href={`/products/${item.handle}`}
                      onClick={() => setCartOpen(false)}
                      className="line-clamp-2 text-sm font-medium text-ink-900 hover:text-gold-600"
                    >
                      {item.title}
                    </Link>
                    {item.variantTitle && item.variantTitle !== "Default Title" && (
                      <p className="mt-0.5 text-xs text-ink-500">{item.variantTitle}</p>
                    )}
                    <div className="mt-auto flex items-center justify-between pt-2">
                      <div className="flex items-center rounded-full border border-cream-300">
                        <button
                          onClick={() => setQty(item.variantId, item.qty - 1)}
                          className="p-1.5 text-ink-600 hover:text-ink-950"
                          aria-label="Decrease quantity"
                        >
                          <MinusIcon size={14} />
                        </button>
                        <span className="w-7 text-center text-sm font-medium">{item.qty}</span>
                        <button
                          onClick={() => setQty(item.variantId, item.qty + 1)}
                          className="p-1.5 text-ink-600 hover:text-ink-950"
                          aria-label="Increase quantity"
                        >
                          <PlusIcon size={14} />
                        </button>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-sm font-semibold text-ink-950">
                          {formatINR(item.price * item.qty)}
                        </span>
                        <button
                          onClick={() => removeFromCart(item.variantId)}
                          className="text-ink-400 hover:text-rose-accent"
                          aria-label="Remove item"
                        >
                          <TrashIcon size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            <div className="border-t border-cream-300 px-5 py-4">
              <div className="flex items-center justify-between text-ink-900">
                <span className="text-sm text-ink-600">Subtotal</span>
                <span className="font-display text-xl font-semibold">{formatINR(cartTotal)}</span>
              </div>
              <p className="mt-1 text-xs text-ink-500">
                {cartTotal >= 2999 ? "You've unlocked free shipping! 🎉" : "Free shipping on prepaid orders. GST calculated at checkout."}
              </p>
              <div className="mt-4 grid gap-2.5">
                <Link
                  href="/checkout"
                  onClick={() => setCartOpen(false)}
                  className="flex items-center justify-center rounded-full bg-ink-950 px-6 py-3.5 text-sm font-semibold text-cream-50 hover:bg-gold-600 transition-colors"
                >
                  Proceed to Checkout
                </Link>
                <a
                  href={`https://wa.me/${site.whatsapp}?text=${waText}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 rounded-full bg-[#25D366] px-6 py-3.5 text-sm font-semibold text-white hover:brightness-105 transition"
                >
                  <WhatsAppIcon size={18} /> Order via WhatsApp
                </a>
                <Link
                  href="/cart"
                  onClick={() => setCartOpen(false)}
                  className="flex items-center justify-center rounded-full border border-ink-950 px-6 py-3.5 text-sm font-semibold text-ink-950 hover:bg-ink-950 hover:text-cream-50 transition-colors"
                >
                  View Cart
                </Link>
              </div>
            </div>
          </>
        )}
      </aside>
    </div>
  );
}
