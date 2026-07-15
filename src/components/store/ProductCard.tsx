"use client";

import Image from "next/image";
import Link from "next/link";
import { discountPercent, formatINR, type Product } from "@/lib/catalog";
import { useStore } from "@/components/store/StoreProvider";
import { BagIcon, HeartIcon } from "@/components/ui/Icons";

export default function ProductCard({ product, priority = false }: { product: Product; priority?: boolean }) {
  const { addToCart, toggleWishlist, wishlist } = useStore();
  const off = discountPercent(product);
  const inWishlist = wishlist.includes(product.handle);
  const v = product.variants.find((x) => x.available) ?? product.variants[0];

  return (
    <div className="group relative flex flex-col">
      <div className="relative aspect-square overflow-hidden rounded-xl bg-cream-200">
        <Link href={`/products/${product.handle}`} aria-label={product.title}>
          <Image
            src={product.images[0] ?? "/images/logo.png"}
            alt={product.title}
            fill
            priority={priority}
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />
          {product.images[1] && (
            <Image
              src={product.images[1]}
              alt=""
              fill
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              className="object-cover opacity-0 transition-opacity duration-500 group-hover:opacity-100"
            />
          )}
        </Link>

        {off && (
          <span className="absolute left-3 top-3 rounded-full bg-rose-accent px-2.5 py-1 text-xs font-semibold text-white">
            −{off}%
          </span>
        )}
        {!product.available && (
          <span className="absolute left-3 top-3 rounded-full bg-ink-800 px-2.5 py-1 text-xs font-semibold text-cream-100">
            Sold Out
          </span>
        )}

        <button
          onClick={() => toggleWishlist(product.handle)}
          aria-label={inWishlist ? "Remove from wishlist" : "Add to wishlist"}
          className={`absolute right-3 top-3 rounded-full bg-cream-50/90 p-2 shadow-sm backdrop-blur transition-all hover:scale-110 ${
            inWishlist ? "text-rose-accent" : "text-ink-600"
          }`}
        >
          <HeartIcon size={17} filled={inWishlist} />
        </button>

        {product.available && (
          <button
            onClick={() =>
              addToCart({
                handle: product.handle,
                variantId: v.id,
                title: product.title,
                variantTitle: v.title === "Default Title" ? null : v.title,
                price: v.price,
                compareAtPrice: v.compareAtPrice,
                image: product.images[0] ?? "/images/logo.png",
              })
            }
            className="absolute inset-x-3 bottom-3 flex translate-y-14 items-center justify-center gap-2 rounded-full bg-ink-950/90 py-2.5 text-sm font-medium text-cream-50 opacity-0 backdrop-blur transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 hover:bg-gold-600"
          >
            <BagIcon size={16} /> Quick Add
          </button>
        )}
      </div>

      <div className="flex flex-1 flex-col px-1 pt-3">
        <Link
          href={`/products/${product.handle}`}
          className="line-clamp-2 text-[15px] font-medium leading-snug text-ink-900 transition-colors hover:text-gold-600"
        >
          {product.title}
        </Link>
        <div className="mt-1.5 flex items-baseline gap-2">
          <span className="font-semibold text-ink-950">{formatINR(product.price)}</span>
          {product.compareAtPrice && product.compareAtPrice > product.price && (
            <span className="text-sm text-ink-400 line-through">{formatINR(product.compareAtPrice)}</span>
          )}
        </div>
      </div>
    </div>
  );
}
