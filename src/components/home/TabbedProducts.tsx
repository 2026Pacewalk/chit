"use client";

import { useState } from "react";
import ProductCard from "@/components/store/ProductCard";
import type { Product } from "@/lib/catalog";

export default function TabbedProducts({
  tabs,
}: {
  tabs: { label: string; products: Product[] }[];
}) {
  const [active, setActive] = useState(0);

  return (
    <div>
      <div className="mb-8 flex flex-wrap justify-center gap-2">
        {tabs.map((t, i) => (
          <button
            key={t.label}
            onClick={() => setActive(i)}
            className={`rounded-full px-5 py-2.5 text-sm font-medium transition-all ${
              i === active
                ? "bg-ink-950 text-cream-50 shadow-md"
                : "border border-cream-300 text-ink-600 hover:border-gold-500 hover:text-gold-600"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>
      <div key={active} className="grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-3 lg:grid-cols-4 animate-fade-in">
        {tabs[active].products.map((p) => (
          <ProductCard key={p.handle} product={p} />
        ))}
      </div>
    </div>
  );
}
