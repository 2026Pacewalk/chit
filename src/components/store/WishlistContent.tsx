"use client";

import Link from "next/link";
import { useStore } from "@/components/store/StoreProvider";
import ProductCard from "@/components/store/ProductCard";
import { getProduct } from "@/lib/catalog";
import { HeartIcon } from "@/components/ui/Icons";

export default function WishlistContent() {
  const { wishlist } = useStore();
  const products = wishlist
    .map((h) => getProduct(h))
    .filter((p): p is NonNullable<typeof p> => Boolean(p));

  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center gap-5 py-24 text-center">
        <HeartIcon size={56} className="text-cream-300" />
        <h1 className="font-display text-2xl font-semibold text-ink-950">
          Your wishlist is empty
        </h1>
        <p className="max-w-sm text-sm text-ink-500">
          Tap the heart on any product to save it here for later.
        </p>
        <Link
          href="/collections"
          className="rounded-full bg-ink-950 px-8 py-3.5 text-sm font-semibold text-cream-50 hover:bg-ink-800 transition-colors"
        >
          Explore Products
        </Link>
      </div>
    );
  }

  return (
    <div>
      <h1 className="font-display text-3xl font-semibold text-ink-950 sm:text-4xl">My Wishlist</h1>
      <div className="gold-rule mt-5 w-24" />
      <div className="mt-8 grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-3 lg:grid-cols-4">
        {products.map((p) => (
          <ProductCard key={p.handle} product={p} />
        ))}
      </div>
    </div>
  );
}
