import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import ProductCard from "@/components/store/ProductCard";
import SectionHeading from "@/components/ui/SectionHeading";
import { blogArticle } from "@/data/pages";
import { getCollectionProducts } from "@/lib/catalog";
import { ArrowRight } from "@/components/ui/Icons";

export function generateStaticParams() {
  return [{ blog: blogArticle.blog, article: blogArticle.slug }];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ blog: string; article: string }>;
}): Promise<Metadata> {
  const { blog, article } = await params;
  if (blog !== blogArticle.blog || article !== blogArticle.slug) return {};
  return {
    title: blogArticle.title,
    description: blogArticle.excerpt,
    openGraph: { title: blogArticle.title, description: blogArticle.excerpt, images: [blogArticle.image] },
  };
}

export default async function BlogArticlePage({
  params,
}: {
  params: Promise<{ blog: string; article: string }>;
}) {
  const { blog, article } = await params;
  if (blog !== blogArticle.blog || article !== blogArticle.slug) notFound();

  const picks = getCollectionProducts("personalized-carricature").slice(0, 4);

  return (
    <article className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12">
      <Breadcrumbs
        items={[{ label: "Blog", href: "/blogs/news" }, { label: blogArticle.title }]}
      />

      <header className="mx-auto max-w-3xl text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-gold-600">
          {blogArticle.date} · by {blogArticle.author}
        </p>
        <h1 className="mt-3 font-display text-3xl font-semibold leading-tight text-ink-950 sm:text-4xl">
          {blogArticle.title}
        </h1>
        <div className="gold-rule mx-auto mt-6 w-24" />
      </header>

      <div className="relative mx-auto mt-10 aspect-[21/9] max-w-5xl overflow-hidden rounded-2xl">
        <Image
          src={blogArticle.image}
          alt={blogArticle.title}
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 1024px"
          className="object-cover"
        />
      </div>

      <div className="mx-auto mt-10 max-w-3xl space-y-8">
        {blogArticle.sections.map((s, i) => (
          <section key={i}>
            {s.heading && (
              <h2 className="font-display text-2xl font-semibold text-ink-950">{s.heading}</h2>
            )}
            {s.paragraphs.map((p, j) => (
              <p key={j} className="mt-3 leading-relaxed text-ink-700">
                {p}
              </p>
            ))}
          </section>
        ))}

        <div className="rounded-2xl bg-ink-950 p-8 text-center">
          <h2 className="font-display text-2xl font-semibold text-cream-50">
            Ready to Gift Something Unforgettable?
          </h2>
          <p className="mx-auto mt-2 max-w-md text-sm text-cream-100/75">
            Explore our personalized caricatures, frames and corporate hampers — crafted with care,
            delivered across India.
          </p>
          <Link
            href="/collections"
            className="group mt-5 inline-flex items-center gap-2 rounded-full bg-gold-500 px-7 py-3.5 text-sm font-semibold text-ink-950 hover:bg-gold-400 transition-colors"
          >
            Shop Personalized Gifts
            <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>

      {picks.length > 0 && (
        <section className="mt-20">
          <SectionHeading kicker="Editor's Picks" title="Gifts Featured in This Story" />
          <div className="grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-4">
            {picks.map((p) => (
              <ProductCard key={p.handle} product={p} />
            ))}
          </div>
        </section>
      )}
    </article>
  );
}
