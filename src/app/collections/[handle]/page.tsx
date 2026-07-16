import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import CollectionBrowser from "@/components/store/CollectionBrowser";
import SectionHeading from "@/components/ui/SectionHeading";
import { ChevronRight } from "@/components/ui/Icons";
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
  const featured = allCollections
    .filter((c) => c.handle !== handle && c.products.length > 0)
    .slice(0, 4);

  return (
    <div>
      {/* Title banner */}
      <div className="bg-cream-100">
        <div className="mx-auto flex max-w-7xl flex-col items-center px-4 py-10 text-center sm:px-6 sm:py-12">
          <h1 className="font-display text-3xl font-semibold text-ink-950 sm:text-4xl">
            {collection.title}
          </h1>
          <nav aria-label="Breadcrumb" className="mt-3">
            <ol className="flex items-center gap-1.5 text-sm text-ink-500">
              <li>
                <Link href="/" className="hover:text-gold-600 transition-colors">
                  Home
                </Link>
              </li>
              <li className="flex items-center gap-1.5">
                <ChevronRight size={13} className="text-ink-400" />
                <span className="text-gold-600">{collection.title}</span>
              </li>
            </ol>
          </nav>
          {collection.description && (
            <p className="mt-4 max-w-2xl text-sm leading-relaxed text-ink-500">
              {collection.description}
            </p>
          )}
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
        {products.length === 0 ? (
          <div className="rounded-md border border-dashed border-cream-300 py-24 text-center">
            <p className="font-display text-xl text-ink-700">Coming Soon</p>
            <p className="mt-2 text-sm text-ink-500">
              We&apos;re crafting new pieces for this collection. Check back shortly!
            </p>
            <Link
              href="/collections"
              className="mt-6 inline-block rounded bg-ink-950 px-7 py-3 text-sm font-semibold text-cream-50 hover:bg-gold-600 transition-colors"
            >
              Browse Other Collections
            </Link>
          </div>
        ) : (
          <CollectionBrowser products={products} />
        )}

        {/* Featured collections */}
        {featured.length > 0 && (
          <section className="mt-20">
            <SectionHeading
              kicker="Featured Collection"
              title="Your Memories, Our Craft."
            />
            <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
              {featured.map((c) => {
                const cover = getCollectionProducts(c.handle)[0]?.images[0];
                const count = c.products.length;
                return (
                  <Link
                    key={c.handle}
                    href={`/collections/${c.handle}`}
                    className="group overflow-hidden rounded-md border border-cream-200 bg-cream-50 transition-shadow hover:shadow-lg hover:shadow-ink-950/10"
                  >
                    <div className="relative aspect-[2000/2548] overflow-hidden bg-cream-200">
                      {cover && (
                        <Image
                          src={cover}
                          alt={c.title}
                          fill
                          sizes="(max-width: 640px) 50vw, 25vw"
                          className="object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                      )}
                    </div>
                    <div className="px-4 py-3.5 text-center">
                      <h3 className="font-medium text-ink-950 transition-colors group-hover:text-gold-600">
                        {c.title}
                      </h3>
                      <p className="mt-0.5 text-xs text-ink-500">
                        ({count} {count === 1 ? "item" : "items"})
                      </p>
                    </div>
                  </Link>
                );
              })}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
