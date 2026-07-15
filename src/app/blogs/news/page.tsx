import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import { blogArticle } from "@/data/pages";
import { ArrowRight } from "@/components/ui/Icons";

export const metadata: Metadata = {
  title: "News & Gift Ideas",
  description:
    "Gift guides, festive inspiration and news from Chitrangi — your destination for personalized gifts.",
};

export default function BlogIndexPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12">
      <Breadcrumbs items={[{ label: "Blog" }]} />
      <header className="max-w-2xl">
        <h1 className="font-display text-3xl font-semibold text-ink-950 sm:text-4xl">
          News & Gift Ideas
        </h1>
        <p className="mt-3 text-ink-500">
          Festive inspiration, gifting guides and stories from the Chitrangi studio.
        </p>
        <div className="gold-rule mt-5 w-24" />
      </header>

      <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Link
          href={`/blogs/${blogArticle.blog}/${blogArticle.slug}`}
          className="group overflow-hidden rounded-2xl border border-cream-300 bg-cream-100 transition-shadow hover:shadow-xl hover:shadow-ink-950/10"
        >
          <div className="relative aspect-[16/10] overflow-hidden">
            <Image
              src={blogArticle.image}
              alt={blogArticle.title}
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
          </div>
          <div className="p-6">
            <p className="text-xs font-semibold uppercase tracking-widest text-gold-600">
              {blogArticle.date} · {blogArticle.author}
            </p>
            <h2 className="mt-2 font-display text-xl font-semibold leading-snug text-ink-950 group-hover:text-gold-600 transition-colors">
              {blogArticle.title}
            </h2>
            <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-ink-600">
              {blogArticle.excerpt}
            </p>
            <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-gold-600">
              Read Article
              <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
            </span>
          </div>
        </Link>
      </div>
    </div>
  );
}
