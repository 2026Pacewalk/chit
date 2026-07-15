import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import { policyPages } from "@/data/pages";

export function generateStaticParams() {
  return policyPages.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const page = policyPages.find((p) => p.slug === slug);
  if (!page) return {};
  return { title: page.title, description: page.intro?.slice(0, 160) };
}

export default async function PolicyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const page = policyPages.find((p) => p.slug === slug);
  if (!page) notFound();

  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 sm:py-12">
      <Breadcrumbs items={[{ label: page.title }]} />
      <h1 className="font-display text-3xl font-semibold text-ink-950 sm:text-4xl">
        {page.title}
      </h1>
      <div className="gold-rule mt-5 w-24" />

      {page.intro && <p className="mt-7 leading-relaxed text-ink-700">{page.intro}</p>}

      <div className="mt-8 space-y-8">
        {page.sections.map((s, i) => (
          <section key={i}>
            {s.heading && (
              <h2 className="font-display text-xl font-semibold text-ink-950">{s.heading}</h2>
            )}
            {s.paragraphs?.map((p, j) => (
              <p key={j} className="mt-3 leading-relaxed text-ink-700">
                {p}
              </p>
            ))}
            {s.bullets && (
              <ul className="mt-3 list-disc space-y-2 pl-6 text-ink-700">
                {s.bullets.map((b, j) => (
                  <li key={j} className="leading-relaxed">
                    {b}
                  </li>
                ))}
              </ul>
            )}
          </section>
        ))}
      </div>
    </div>
  );
}
