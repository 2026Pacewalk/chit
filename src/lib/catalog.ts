import catalog from "@/data/catalog.json";

export type Variant = {
  id: number;
  title: string;
  price: number;
  compareAtPrice: number | null;
  available: boolean;
  options: string[];
};

export type Product = {
  id: number;
  handle: string;
  title: string;
  descriptionHtml: string;
  vendor: string;
  productType: string;
  tags: string[];
  createdAt: string;
  publishedAt: string;
  price: number;
  compareAtPrice: number | null;
  available: boolean;
  options: { name: string; values: string[] }[];
  variants: Variant[];
  images: string[];
};

export type Collection = {
  handle: string;
  title: string;
  description: string;
  products: string[];
};

const data = catalog as { products: Product[]; collections: Collection[] };

export const allProducts: Product[] = data.products;
export const allCollections: Collection[] = data.collections;

export function getProduct(handle: string): Product | undefined {
  return allProducts.find((p) => p.handle === handle);
}

export function getCollection(handle: string): Collection | undefined {
  return allCollections.find((c) => c.handle === handle);
}

export function getCollectionProducts(handle: string): Product[] {
  const c = getCollection(handle);
  if (!c) return [];
  return c.products
    .map((h) => getProduct(h))
    .filter((p): p is Product => Boolean(p));
}

export function collectionsOf(product: Product): Collection[] {
  return allCollections.filter((c) => c.products.includes(product.handle));
}

export function relatedProducts(product: Product, limit = 4): Product[] {
  const colls = collectionsOf(product);
  const pool = new Map<string, Product>();
  for (const c of colls) {
    for (const p of getCollectionProducts(c.handle)) {
      if (p.handle !== product.handle) pool.set(p.handle, p);
    }
  }
  if (pool.size < limit) {
    for (const p of allProducts) {
      if (p.handle !== product.handle) pool.set(p.handle, p);
      if (pool.size >= limit * 2) break;
    }
  }
  return [...pool.values()].slice(0, limit);
}

export function discountPercent(p: { price: number; compareAtPrice: number | null }): number | null {
  if (!p.compareAtPrice || p.compareAtPrice <= p.price) return null;
  return Math.round(((p.compareAtPrice - p.price) / p.compareAtPrice) * 100);
}

export function searchProducts(query: string): Product[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  const terms = q.split(/\s+/);
  return allProducts
    .map((p) => {
      const hay = (p.title + " " + p.tags.join(" ") + " " + p.productType).toLowerCase();
      const score = terms.reduce((s, t) => s + (hay.includes(t) ? 1 : 0), 0);
      return { p, score };
    })
    .filter((x) => x.score > 0)
    .sort((a, b) => b.score - a.score)
    .map((x) => x.p);
}

export function formatINR(n: number): string {
  return "₹" + n.toLocaleString("en-IN", { minimumFractionDigits: 0, maximumFractionDigits: 0 });
}
