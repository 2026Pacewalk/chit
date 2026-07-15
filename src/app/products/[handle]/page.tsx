import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ProductGallery from "@/components/store/ProductGallery";
import AddToCartPanel from "@/components/store/AddToCartPanel";
import ProductCard from "@/components/store/ProductCard";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import SectionHeading from "@/components/ui/SectionHeading";
import USPStrip from "@/components/home/USPStrip";
import {
  allProducts,
  collectionsOf,
  getProduct,
  relatedProducts,
} from "@/lib/catalog";
import { site } from "@/data/site";

export function generateStaticParams() {
  return allProducts.map((p) => ({ handle: p.handle }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ handle: string }>;
}): Promise<Metadata> {
  const { handle } = await params;
  const product = getProduct(handle);
  if (!product) return {};
  const description = product.descriptionHtml.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim().slice(0, 160);
  return {
    title: product.title,
    description,
    openGraph: { title: product.title, description, images: product.images[0] ? [product.images[0]] : [] },
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ handle: string }>;
}) {
  const { handle } = await params;
  const product = getProduct(handle);
  if (!product) notFound();

  const collection = collectionsOf(product)[0];
  const related = relatedProducts(product, 4);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.title,
    image: product.images.map((i) => site.domain + i),
    description: product.descriptionHtml.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim(),
    brand: { "@type": "Brand", name: site.name },
    offers: {
      "@type": "Offer",
      priceCurrency: "INR",
      price: product.price,
      availability: product.available
        ? "https://schema.org/InStock"
        : "https://schema.org/OutOfStock",
      url: `${site.domain}/products/${product.handle}`,
    },
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Breadcrumbs
        items={[
          ...(collection
            ? [{ label: collection.title, href: `/collections/${collection.handle}` }]
            : []),
          { label: product.title },
        ]}
      />

      <div className="grid gap-10 lg:grid-cols-2 lg:gap-14">
        <ProductGallery images={product.images} title={product.title} />
        <div>
          <h1 className="font-display text-2xl font-semibold leading-snug text-ink-950 sm:text-3xl">
            {product.title}
          </h1>
          <div className="gold-rule my-5 w-20" />
          <AddToCartPanel product={product} />
        </div>
      </div>

      {/* Description */}
      {product.descriptionHtml && (
        <section className="mt-14 max-w-3xl">
          <h2 className="font-display text-2xl font-semibold text-ink-950">Product Details</h2>
          <div
            className="rte mt-4"
            dangerouslySetInnerHTML={{ __html: product.descriptionHtml }}
          />
        </section>
      )}

      {/* Related */}
      {related.length > 0 && (
        <section className="mt-20">
          <SectionHeading kicker="You May Also Like" title="Related Products" />
          <div className="grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-4">
            {related.map((p) => (
              <ProductCard key={p.handle} product={p} />
            ))}
          </div>
        </section>
      )}

      <section className="mt-20 border-t border-cream-200 pt-14">
        <USPStrip />
      </section>
    </div>
  );
}
