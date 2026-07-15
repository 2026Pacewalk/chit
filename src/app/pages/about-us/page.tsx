import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import SectionHeading from "@/components/ui/SectionHeading";
import Testimonials from "@/components/home/Testimonials";
import USPStrip from "@/components/home/USPStrip";
import { aboutPage } from "@/data/pages";
import { site } from "@/data/site";
import { ArrowRight, GiftIcon, SparkleIcon, ShieldIcon } from "@/components/ui/Icons";

export const metadata: Metadata = {
  title: "About Us",
  description: aboutPage.paragraphs[0],
};

const values = [
  {
    icon: GiftIcon,
    title: "Every Gift Tells a Story",
    text: "We specialize in custom-made products that reflect the individuality of each recipient.",
  },
  {
    icon: SparkleIcon,
    title: "Creativity First",
    text: "From caricatures to bespoke print designs, we bring your ideas to life, one creative design at a time.",
  },
  {
    icon: ShieldIcon,
    title: "Quality & Precision",
    text: "Every product we offer is crafted with care, attention to detail, and a passion for design.",
  },
];

export default function AboutPage() {
  return (
    <div>
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12">
        <Breadcrumbs items={[{ label: "About Us" }]} />

        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-gold-600">
              Where Creativity Meets Personalization
            </p>
            <h1 className="mt-2 font-display text-3xl font-semibold text-ink-950 sm:text-4xl">
              About {site.name}
            </h1>
            <div className="gold-rule mt-5 w-24" />
            <div className="mt-6 space-y-4 leading-relaxed text-ink-700">
              {aboutPage.paragraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
            <Link
              href="/pages/contact"
              className="group mt-7 inline-flex items-center gap-2.5 rounded-full bg-ink-950 px-7 py-3.5 text-sm font-semibold text-cream-50 transition-colors hover:bg-gold-600"
            >
              Connect With Us
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
            <Image
              src="/images/banners/hero-1.jpg"
              alt="Chitrangi personalized gifts"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
        </div>

        {/* Values */}
        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {values.map((v) => (
            <div
              key={v.title}
              className="rounded-2xl border border-cream-300 bg-cream-100 p-7 transition-shadow hover:shadow-lg hover:shadow-ink-950/5"
            >
              <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-gold-500/10 text-gold-600 ring-1 ring-gold-500/30">
                <v.icon size={22} />
              </span>
              <h2 className="mt-4 font-display text-lg font-semibold text-ink-950">{v.title}</h2>
              <p className="mt-2 text-sm leading-relaxed text-ink-600">{v.text}</p>
            </div>
          ))}
        </div>
      </div>

      <section className="bg-cream-100 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <SectionHeading kicker="Client Feedback" title="The Valuable Opinion of Our Clients" />
          <Testimonials />
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <USPStrip />
      </section>
    </div>
  );
}
