"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import ProductCard from "@/components/store/ProductCard";
import { discountPercent, formatINR, type Product } from "@/lib/catalog";
import { useStore } from "@/components/store/StoreProvider";
import { BagIcon, GridIcon, HeartIcon, ListIcon } from "@/components/ui/Icons";

const sorts = [
  { key: "featured", label: "Featured" },
  { key: "alpha-asc", label: "Alphabetically, A-Z" },
  { key: "alpha-desc", label: "Alphabetically, Z-A" },
  { key: "price-asc", label: "Price, low to high" },
  { key: "price-desc", label: "Price, high to low" },
  { key: "date-desc", label: "Date, new to old" },
  { key: "date-asc", label: "Date, old to new" },
] as const;

type SortKey = (typeof sorts)[number]["key"];

function excerpt(html: string, len = 150): string {
  const text = html.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
  return text.length > len ? text.slice(0, len).trimEnd() + "…" : text;
}

export default function CollectionBrowser({ products }: { products: Product[] }) {
  const [view, setView] = useState<"grid" | "list">("grid");
  const [sort, setSort] = useState<SortKey>("featured");
  const [inStock, setInStock] = useState(false);
  const [outStock, setOutStock] = useState(false);
  const [fromInput, setFromInput] = useState("");
  const [toInput, setToInput] = useState("");
  const [priceRange, setPriceRange] = useState<{ from: number | null; to: number | null }>({
    from: null,
    to: null,
  });

  const inStockCount = products.filter((p) => p.available).length;
  const outStockCount = products.length - inStockCount;
  const hasActiveFilters =
    inStock || outStock || priceRange.from !== null || priceRange.to !== null;

  const shown = useMemo(() => {
    let list = [...products];
    if (inStock !== outStock) {
      list = list.filter((p) => (inStock ? p.available : !p.available));
    }
    if (priceRange.from !== null) list = list.filter((p) => p.price >= priceRange.from!);
    if (priceRange.to !== null) list = list.filter((p) => p.price <= priceRange.to!);
    switch (sort) {
      case "alpha-asc":
        list.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case "alpha-desc":
        list.sort((a, b) => b.title.localeCompare(a.title));
        break;
      case "price-asc":
        list.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        list.sort((a, b) => b.price - a.price);
        break;
      case "date-desc":
        list.sort((a, b) => +new Date(b.createdAt) - +new Date(a.createdAt));
        break;
      case "date-asc":
        list.sort((a, b) => +new Date(a.createdAt) - +new Date(b.createdAt));
        break;
    }
    return list;
  }, [products, sort, inStock, outStock, priceRange]);

  function applyPrice(e: React.FormEvent) {
    e.preventDefault();
    setPriceRange({
      from: fromInput.trim() === "" ? null : Math.max(0, Number(fromInput)),
      to: toInput.trim() === "" ? null : Math.max(0, Number(toInput)),
    });
  }

  function clearAll() {
    setInStock(false);
    setOutStock(false);
    setFromInput("");
    setToInput("");
    setPriceRange({ from: null, to: null });
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[250px_1fr]">
      {/* Filter sidebar */}
      <aside className="h-fit rounded-md border border-cream-200 bg-cream-50">
        <div className="flex items-center justify-between border-b border-cream-200 px-5 py-4">
          <h2 className="font-semibold text-ink-950">Filter</h2>
          {hasActiveFilters && (
            <button
              onClick={clearAll}
              className="text-xs font-medium text-gold-600 underline underline-offset-2 hover:text-gold-700"
            >
              Clear all
            </button>
          )}
        </div>

        <div className="border-b border-cream-200 px-5 py-4">
          <h3 className="text-sm font-semibold uppercase tracking-wide text-ink-900">
            Availability
          </h3>
          <label className="mt-3 flex cursor-pointer items-center gap-2.5 text-sm text-ink-700">
            <input
              type="checkbox"
              checked={inStock}
              onChange={(e) => setInStock(e.target.checked)}
              className="h-4 w-4 accent-gold-500"
            />
            In stock <span className="text-ink-400">({inStockCount})</span>
          </label>
          <label className="mt-2 flex cursor-pointer items-center gap-2.5 text-sm text-ink-700">
            <input
              type="checkbox"
              checked={outStock}
              onChange={(e) => setOutStock(e.target.checked)}
              className="h-4 w-4 accent-gold-500"
            />
            Out of stock <span className="text-ink-400">({outStockCount})</span>
          </label>
        </div>

        <form onSubmit={applyPrice} className="px-5 py-4">
          <h3 className="text-sm font-semibold uppercase tracking-wide text-ink-900">Price</h3>
          <div className="mt-3 flex items-center gap-2">
            <label className="flex flex-1 items-center gap-1.5 rounded border border-cream-300 px-2.5 py-2 text-sm focus-within:border-gold-500">
              <span className="text-ink-400">₹</span>
              <input
                type="number"
                min="0"
                placeholder="From"
                value={fromInput}
                onChange={(e) => setFromInput(e.target.value)}
                className="w-full bg-transparent text-ink-900 outline-none placeholder:text-ink-400"
                aria-label="Price from"
              />
            </label>
            <label className="flex flex-1 items-center gap-1.5 rounded border border-cream-300 px-2.5 py-2 text-sm focus-within:border-gold-500">
              <span className="text-ink-400">₹</span>
              <input
                type="number"
                min="0"
                placeholder="To"
                value={toInput}
                onChange={(e) => setToInput(e.target.value)}
                className="w-full bg-transparent text-ink-900 outline-none placeholder:text-ink-400"
                aria-label="Price to"
              />
            </label>
          </div>
          <button
            type="submit"
            className="mt-3 w-full rounded bg-ink-950 px-4 py-2.5 text-sm font-semibold text-cream-50 transition-colors hover:bg-gold-600"
          >
            Filter
          </button>
        </form>
      </aside>

      {/* Products */}
      <div>
        {/* Toolbar */}
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3 rounded-md border border-cream-200 bg-cream-100 px-4 py-3">
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as SortKey)}
            aria-label="Sort products"
            className="rounded border border-cream-300 bg-cream-50 px-3 py-2 text-sm text-ink-800 outline-none focus:border-gold-500"
          >
            {sorts.map((s) => (
              <option key={s.key} value={s.key}>
                {s.label}
              </option>
            ))}
          </select>
          <p className="text-sm text-ink-500">
            Showing {shown.length === 0 ? 0 : 1} – {shown.length} of {shown.length}{" "}
            {shown.length === 1 ? "result" : "results"}
          </p>
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setView("grid")}
              aria-label="Grid view"
              aria-pressed={view === "grid"}
              className={`rounded p-2 transition-colors ${
                view === "grid"
                  ? "bg-gold-500 text-white"
                  : "border border-cream-300 text-ink-600 hover:border-gold-500 hover:text-gold-600"
              }`}
            >
              <GridIcon size={17} />
            </button>
            <button
              onClick={() => setView("list")}
              aria-label="List view"
              aria-pressed={view === "list"}
              className={`rounded p-2 transition-colors ${
                view === "list"
                  ? "bg-gold-500 text-white"
                  : "border border-cream-300 text-ink-600 hover:border-gold-500 hover:text-gold-600"
              }`}
            >
              <ListIcon size={17} />
            </button>
          </div>
        </div>

        {shown.length === 0 ? (
          <div className="rounded-md border border-dashed border-cream-300 py-20 text-center">
            <p className="font-display text-xl text-ink-700">No products match your filters</p>
            <button
              onClick={clearAll}
              className="mt-4 rounded bg-ink-950 px-6 py-2.5 text-sm font-semibold text-cream-50 hover:bg-gold-600 transition-colors"
            >
              Clear all filters
            </button>
          </div>
        ) : view === "grid" ? (
          <div className="grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-3">
            {shown.map((p, i) => (
              <ProductCard key={p.handle} product={p} priority={i < 3} />
            ))}
          </div>
        ) : (
          <div className="space-y-5">
            {shown.map((p) => (
              <ListRow key={p.handle} product={p} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function ListRow({ product }: { product: Product }) {
  const { addToCart, toggleWishlist, wishlist } = useStore();
  const off = discountPercent(product);
  const inWishlist = wishlist.includes(product.handle);
  const v = product.variants.find((x) => x.available) ?? product.variants[0];

  return (
    <div className="flex gap-5 rounded-md border border-cream-200 bg-cream-50 p-4 sm:gap-6 sm:p-5">
      <Link
        href={`/products/${product.handle}`}
        className="relative aspect-[2000/2548] w-32 shrink-0 overflow-hidden rounded bg-cream-200 sm:w-44"
      >
        <Image
          src={product.images[0] ?? "/images/logo.png"}
          alt={product.title}
          fill
          sizes="176px"
          className="object-cover"
        />
      </Link>
      <div className="flex min-w-0 flex-1 flex-col">
        <Link
          href={`/products/${product.handle}`}
          className="font-medium leading-snug text-ink-900 transition-colors hover:text-gold-600 sm:text-lg"
        >
          {product.title}
        </Link>
        <div className="mt-1.5 flex flex-wrap items-baseline gap-2">
          <span className="font-semibold text-ink-950">{formatINR(product.price)}</span>
          {product.compareAtPrice && product.compareAtPrice > product.price && (
            <span className="text-sm text-ink-400 line-through">
              {formatINR(product.compareAtPrice)}
            </span>
          )}
          {off && (
            <span className="rounded bg-rose-accent/10 px-1.5 py-0.5 text-xs font-bold text-rose-accent">
              −{off}%
            </span>
          )}
        </div>
        <p className="mt-2 hidden text-sm leading-relaxed text-ink-500 sm:line-clamp-3">
          {excerpt(product.descriptionHtml)}
        </p>
        <div className="mt-auto flex flex-wrap items-center gap-2 pt-3">
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
            disabled={!product.available}
            className="flex items-center gap-2 rounded bg-ink-950 px-5 py-2.5 text-sm font-semibold text-cream-50 transition-colors hover:bg-gold-600 disabled:cursor-not-allowed disabled:bg-cream-300 disabled:text-ink-400"
          >
            <BagIcon size={15} />
            {product.available ? "Add to Cart" : "Sold Out"}
          </button>
          <button
            onClick={() => toggleWishlist(product.handle)}
            aria-label={inWishlist ? "Remove from wishlist" : "Add to wishlist"}
            className={`rounded border p-2.5 transition-colors ${
              inWishlist
                ? "border-rose-accent bg-rose-accent/10 text-rose-accent"
                : "border-cream-300 text-ink-600 hover:border-rose-accent hover:text-rose-accent"
            }`}
          >
            <HeartIcon size={16} filled={inWishlist} />
          </button>
        </div>
      </div>
    </div>
  );
}
