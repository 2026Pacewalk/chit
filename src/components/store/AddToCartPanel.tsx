"use client";

import { useMemo, useState } from "react";
import { formatINR, type Product, type Variant } from "@/lib/catalog";
import { useStore } from "@/components/store/StoreProvider";
import { site } from "@/data/site";
import {
  BagIcon,
  HeartIcon,
  MinusIcon,
  PlusIcon,
  WhatsAppIcon,
} from "@/components/ui/Icons";

export default function AddToCartPanel({ product }: { product: Product }) {
  const { addToCart, toggleWishlist, wishlist } = useStore();
  const [qty, setQty] = useState(1);
  const [selected, setSelected] = useState<string[]>(
    product.options.map((o) => o.values[0])
  );

  const variant: Variant = useMemo(() => {
    if (!product.options.length) return product.variants[0];
    return (
      product.variants.find((v) =>
        selected.every((s, i) => v.options[i] === s)
      ) ?? product.variants[0]
    );
  }, [product, selected]);

  const inWishlist = wishlist.includes(product.handle);
  const off =
    variant.compareAtPrice && variant.compareAtPrice > variant.price
      ? Math.round(((variant.compareAtPrice - variant.price) / variant.compareAtPrice) * 100)
      : null;

  const waText = encodeURIComponent(
    `Hi Chitrangi! I'm interested in "${product.title}"${
      variant.title !== "Default Title" ? ` (${variant.title})` : ""
    } × ${qty}. Please share details.`
  );

  return (
    <div>
      {/* Price */}
      <div className="flex items-baseline gap-3">
        <span className="font-display text-3xl font-semibold text-ink-950">
          {formatINR(variant.price)}
        </span>
        {variant.compareAtPrice && variant.compareAtPrice > variant.price && (
          <>
            <span className="text-lg text-ink-400 line-through">
              {formatINR(variant.compareAtPrice)}
            </span>
            <span className="rounded-full bg-rose-accent/10 px-2.5 py-1 text-xs font-semibold text-rose-accent">
              Save {off}%
            </span>
          </>
        )}
      </div>
      <p className="mt-1 text-xs text-ink-500">Inclusive of all applicable charges. GST calculated at checkout.</p>

      {/* Options */}
      {product.options.map((opt, oi) => (
        <div key={opt.name} className="mt-6">
          <p className="mb-2 text-sm font-semibold text-ink-900">
            {opt.name}: <span className="font-normal text-ink-600">{selected[oi]}</span>
          </p>
          <div className="flex flex-wrap gap-2">
            {opt.values.map((val) => (
              <button
                key={val}
                onClick={() =>
                  setSelected((prev) => prev.map((s, i) => (i === oi ? val : s)))
                }
                className={`rounded-full border px-4 py-2 text-sm transition-all ${
                  selected[oi] === val
                    ? "border-ink-950 bg-ink-950 text-cream-50"
                    : "border-cream-300 text-ink-700 hover:border-gold-500"
                }`}
              >
                {val}
              </button>
            ))}
          </div>
        </div>
      ))}

      {/* Qty + actions */}
      <div className="mt-7 flex flex-wrap items-center gap-3">
        <div className="flex items-center rounded-full border border-cream-300">
          <button
            onClick={() => setQty(Math.max(1, qty - 1))}
            className="p-3 text-ink-600 hover:text-ink-950"
            aria-label="Decrease quantity"
          >
            <MinusIcon size={16} />
          </button>
          <span className="w-10 text-center font-medium">{qty}</span>
          <button
            onClick={() => setQty(qty + 1)}
            className="p-3 text-ink-600 hover:text-ink-950"
            aria-label="Increase quantity"
          >
            <PlusIcon size={16} />
          </button>
        </div>

        <button
          onClick={() =>
            addToCart(
              {
                handle: product.handle,
                variantId: variant.id,
                title: product.title,
                variantTitle: variant.title === "Default Title" ? null : variant.title,
                price: variant.price,
                compareAtPrice: variant.compareAtPrice,
                image: product.images[0] ?? "/images/logo.png",
              },
              qty
            )
          }
          disabled={!variant.available}
          className="flex flex-1 items-center justify-center gap-2 rounded-full bg-ink-950 px-8 py-3.5 text-sm font-semibold text-cream-50 transition-colors hover:bg-gold-600 disabled:cursor-not-allowed disabled:bg-cream-300 disabled:text-ink-400"
        >
          <BagIcon size={17} />
          {variant.available ? "Add to Cart" : "Sold Out"}
        </button>

        <button
          onClick={() => toggleWishlist(product.handle)}
          aria-label={inWishlist ? "Remove from wishlist" : "Add to wishlist"}
          className={`rounded-full border p-3.5 transition-all ${
            inWishlist
              ? "border-rose-accent bg-rose-accent/10 text-rose-accent"
              : "border-cream-300 text-ink-600 hover:border-rose-accent hover:text-rose-accent"
          }`}
        >
          <HeartIcon size={18} filled={inWishlist} />
        </button>
      </div>

      <a
        href={`https://wa.me/${site.whatsapp}?text=${waText}`}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-3 flex items-center justify-center gap-2 rounded-full bg-[#25D366] px-8 py-3.5 text-sm font-semibold text-white transition hover:brightness-105"
      >
        <WhatsAppIcon size={18} /> Order on WhatsApp
      </a>
      <p className="mt-3 text-center text-xs text-ink-500">
        Have questions? We share real-time product photos & videos on WhatsApp — {site.phone}
      </p>
    </div>
  );
}
