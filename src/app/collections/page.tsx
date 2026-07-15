import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import { allCollections, getCollectionProducts } from "@/lib/catalog";
import { ArrowRight } from "@/components/ui/Icons";

export const metadata: Metadata = {
  title: "All Collections",
  description:
    "Browse all Chitrangi collections — personalized caricatures, corporate gifts, NFC cards, sign boards and more.",
};

export default function CollectionsPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12">
      <Breadcrumbs items={[{ label: "Collections" }]} />
      <header className="mb-10 max-w-2xl">
        <h1 className="font-display text-3xl font-semibold text-ink-950 sm:text-4xl">
          Our Collections
        </h1>
        <p className="mt-3 text-ink-500">
          Thoughtful, personalized gifts for every occasion — hand-crafted and made to order.
        </p>
        <div className="gold-rule mt-5 w-24" />
      </header>

      <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
        {allCollections.map((c) => {
          const products = getCollectionProducts(c.handle);
          const cover = products[0]?.images[0];
          return (
            <Link
              key={c.handle}
              href={`/collections/${c.handle}`}
              className="group relative aspect-[4/5] overflow-hidden rounded-2xl bg-cream-200"
            >
              {cover ? (
                <Image
                  src={cover}
                  alt={c.title}
                  fill
                  sizes="(max-width: 640px) 50vw, 25vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-cream-200 to-cream-300">
                  <span className="font-display text-4xl text-gold-500/40">✦</span>
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-ink-950/80 via-ink-950/10 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-5">
                <h2 className="font-display text-xl font-semibold text-cream-50">{c.title}</h2>
                <p className="mt-1 flex items-center gap-1.5 text-xs text-gold-300">
                  {products.length > 0 ? `${products.length} products` : "Coming soon"}
                  <ArrowRight size={13} className="transition-transform group-hover:translate-x-1" />
                </p>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
