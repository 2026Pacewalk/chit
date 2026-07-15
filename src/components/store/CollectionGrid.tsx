"use client";

import { useMemo, useState } from "react";
import ProductCard from "@/components/store/ProductCard";
import type { Product } from "@/lib/catalog";

const sorts = [
  { key: "featured", label: "Featured" },
  { key: "price-asc", label: "Price: Low to High" },
  { key: "price-desc", label: "Price: High to Low" },
  { key: "newest", label: "Newest First" },
  { key: "alpha", label: "Alphabetical (A–Z)" },
] as const;

type SortKey = (typeof sorts)[number]["key"];

export default function CollectionGrid({ products }: { products: Product[] }) {
  const [sort, setSort] = useState<SortKey>("featured");
  const [onSale, setOnSale] = useState(false);

  const shown = useMemo(() => {
    let list = [...products];
    if (onSale) list = list.filter((p) => p.compareAtPrice && p.compareAtPrice > p.price);
    switch (sort) {
      case "price-asc":
        list.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        list.sort((a, b) => b.price - a.price);
        break;
      case "newest":
        list.sort((a, b) => +new Date(b.createdAt) - +new Date(a.createdAt));
        break;
      case "alpha":
        list.sort((a, b) => a.title.localeCompare(b.title));
        break;
    }
    return list;
  }, [products, sort, onSale]);

  return (
    <div>
      <div className="mb-7 flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm text-ink-500">
          {shown.length} {shown.length === 1 ? "product" : "products"}
        </p>
        <div className="flex items-center gap-3">
          <label className="flex cursor-pointer items-center gap-2 text-sm text-ink-700">
            <input
              type="checkbox"
              checked={onSale}
              onChange={(e) => setOnSale(e.target.checked)}
              className="h-4 w-4 accent-gold-600"
            />
            On sale
          </label>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as SortKey)}
            aria-label="Sort products"
            className="rounded-full border border-cream-300 bg-cream-50 px-4 py-2 text-sm text-ink-800 outline-none focus:border-gold-500"
          >
            {sorts.map((s) => (
              <option key={s.key} value={s.key}>
                {s.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {shown.length === 0 ? (
        <p className="py-20 text-center text-ink-500">No products match your filters.</p>
      ) : (
        <div className="grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-3 lg:grid-cols-4">
          {shown.map((p, i) => (
            <ProductCard key={p.handle} product={p} priority={i < 4} />
          ))}
        </div>
      )}
    </div>
  );
}
