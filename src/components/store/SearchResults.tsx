"use client";

import { useMemo, useState } from "react";
import ProductCard from "@/components/store/ProductCard";
import { searchProducts, allProducts } from "@/lib/catalog";
import { SearchIcon } from "@/components/ui/Icons";

export default function SearchResults({ initialQuery }: { initialQuery: string }) {
  const [query, setQuery] = useState(initialQuery);
  const results = useMemo(
    () => (query.trim() ? searchProducts(query) : allProducts),
    [query]
  );

  return (
    <div>
      <header className="mb-8 max-w-2xl">
        <h1 className="font-display text-3xl font-semibold text-ink-950 sm:text-4xl">
          {query.trim() ? "Search Results" : "All Products"}
        </h1>
        <div className="mt-5 flex items-center gap-3 rounded-full border border-cream-300 bg-cream-100 px-5 py-3 focus-within:border-gold-500">
          <SearchIcon size={19} className="shrink-0 text-ink-500" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search personalized gifts, NFC cards, sign boards…"
            className="w-full bg-transparent text-ink-900 placeholder:text-ink-400 outline-none"
            aria-label="Search products"
          />
        </div>
        <p className="mt-3 text-sm text-ink-500">
          {results.length} {results.length === 1 ? "product" : "products"}
          {query.trim() ? ` for “${query.trim()}”` : ""}
        </p>
      </header>

      {results.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-cream-300 py-24 text-center">
          <p className="font-display text-xl text-ink-700">No products found</p>
          <p className="mt-2 text-sm text-ink-500">
            Try different keywords like “caricature”, “NFC” or “welcome board”.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-3 lg:grid-cols-4">
          {results.map((p) => (
            <ProductCard key={p.handle} product={p} />
          ))}
        </div>
      )}
    </div>
  );
}
