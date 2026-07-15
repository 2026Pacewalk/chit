import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import CollectionGrid from "@/components/store/CollectionGrid";
import {
  allCollections,
  getCollection,
  getCollectionProducts,
} from "@/lib/catalog";

export function generateStaticParams() {
  return allCollections.map((c) => ({ handle: c.handle }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ handle: string }>;
}): Promise<Metadata> {
  const { handle } = await params;
  const collection = getCollection(handle);
  if (!collection) return {};
  return {
    title: collection.title,
    description:
      collection.description ||
      `Shop ${collection.title} — personalized gifts from Chitrangi.`,
  };
}

export default async function CollectionPage({
  params,
}: {
  params: Promise<{ handle: string }>;
}) {
  const { handle } = await params;
  const collection = getCollection(handle);
  if (!collection) notFound();

  const products = getCollectionProducts(handle);
  const others = allCollections.filter((c) => c.handle !== handle && c.products.length > 0);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12">
      <Breadcrumbs
        items={[{ label: "Collections", href: "/collections" }, { label: collection.title }]}
      />

      <header className="mb-8 max-w-2xl">
        <h1 className="font-display text-3xl font-semibold text-ink-950 sm:text-4xl">
          {collection.title}
        </h1>
        {collection.description && (
          <p className="mt-3 leading-relaxed text-ink-500">{collection.description}</p>
        )}
        <div className="gold-rule mt-5 w-24" />
      </header>

      {/* Collection quick nav */}
      <div className="no-scrollbar mb-8 flex gap-2 overflow-x-auto pb-1">
        {others.map((c) => (
          <Link
            key={c.handle}
            href={`/collections/${c.handle}`}
            className="shrink-0 rounded-full border border-cream-300 px-4 py-2 text-sm text-ink-600 transition-colors hover:border-gold-500 hover:text-gold-600"
          >
            {c.title}
          </Link>
        ))}
      </div>

      {products.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-cream-300 py-24 text-center">
          <p className="font-display text-xl text-ink-700">Coming Soon</p>
          <p className="mt-2 text-sm text-ink-500">
            We&apos;re crafting new pieces for this collection. Check back shortly!
          </p>
          <Link
            href="/collections"
            className="mt-6 inline-block rounded-full bg-ink-950 px-7 py-3 text-sm font-semibold text-cream-50 hover:bg-ink-800 transition-colors"
          >
            Browse Other Collections
          </Link>
        </div>
      ) : (
        <CollectionGrid products={products} />
      )}
    </div>
  );
}
