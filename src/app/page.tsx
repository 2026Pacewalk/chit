import Image from "next/image";
import Link from "next/link";
import HeroSlider from "@/components/home/HeroSlider";
import SectionHeading from "@/components/ui/SectionHeading";
import ProductCard from "@/components/store/ProductCard";
import TabbedProducts from "@/components/home/TabbedProducts";
import Testimonials from "@/components/home/Testimonials";
import USPStrip from "@/components/home/USPStrip";
import { ArrowRight } from "@/components/ui/Icons";
import {
  allCollections,
  getCollectionProducts,
  allProducts,
} from "@/lib/catalog";

export default function HomePage() {
  const nfc = getCollectionProducts("nfc-card");
  const miniatures = getCollectionProducts("personalized-carricature");
  const corporate = getCollectionProducts("personalized-corporate-gifts");
  const signBoards = getCollectionProducts("sign-board");
  const stationary = getCollectionProducts("stationary");
  const newArrivals = [...allProducts]
    .sort((a, b) => +new Date(b.createdAt) - +new Date(a.createdAt))
    .slice(0, 8);
  const shopCollections = allCollections.filter((c) => c.products.length > 0);

  return (
    <>
      <HeroSlider />

      {/* Categories */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20">
        <SectionHeading
          kicker="Browse by Category"
          title="Shop Our Collections"
          text="From custom caricatures to smart NFC cards — thoughtful, personalized gifts for every occasion."
        />
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {shopCollections.map((c) => {
            const cover = getCollectionProducts(c.handle)[0]?.images[0];
            return (
              <Link
                key={c.handle}
                href={`/collections/${c.handle}`}
                className="group relative aspect-[4/5] overflow-hidden rounded-2xl bg-cream-200"
              >
                {cover && (
                  <Image
                    src={cover}
                    alt={c.title}
                    fill
                    sizes="(max-width: 640px) 50vw, 20vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-ink-950/80 via-ink-950/10 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-4">
                  <h3 className="font-display text-lg font-semibold text-cream-50">{c.title}</h3>
                  <p className="mt-0.5 flex items-center gap-1.5 text-xs text-gold-300 opacity-0 -translate-x-2 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100">
                    Shop now <ArrowRight size={13} />
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Promo split banners */}
      <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 sm:pb-20">
        <div className="grid gap-5 md:grid-cols-2">
          <PromoCard
            image="/images/banners/promo-miniature.jpg"
            kicker="Personalized Gifts"
            title="Custom Miniature"
            text="Custom-made artworks that playfully capture a person's likeness — highlighting unique features, hobbies and special moments."
            href="/collections/personalized-carricature"
          />
          <PromoCard
            image="/images/banners/promo-corporate.jpg"
            kicker="Personalized"
            title="Corporate Gifts"
            text="Custom-branded items that express appreciation and strengthen business relationships — a lasting, professional impression."
            href="/collections/personalized-corporate-gifts"
          />
        </div>
      </section>

      {/* NFC cards */}
      <section className="bg-cream-100 py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <SectionHeading
            kicker="NFC Smart Cards"
            title="Personalized NFC Cards"
            text="Tap or scan — pre-configured PVC cards that boost your Google reviews, Instagram, WhatsApp and more. Zero hassle setup."
          />
          <div className="grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-3 lg:grid-cols-5">
            {nfc.map((p, i) => (
              <ProductCard key={p.handle} product={p} priority={i < 2} />
            ))}
          </div>
        </div>
      </section>

      {/* Trending tabs */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20">
        <SectionHeading
          kicker="Personalized Gift Items"
          title="All-Time Favourites & Trending Gifts"
        />
        <TabbedProducts
          tabs={[
            { label: "Acrylic Miniature", products: miniatures },
            { label: "Corporate Gifts", products: corporate },
            { label: "Sign Board", products: signBoards },
            { label: "Stationary", products: stationary },
          ]}
        />
      </section>

      {/* Sale banner */}
      <section className="relative overflow-hidden bg-ink-950">
        <Image
          src="/images/banners/banner-nfc.jpg"
          alt="NFC smart card offer"
          fill
          sizes="100vw"
          className="object-cover opacity-40"
        />
        <div className="relative mx-auto flex max-w-7xl flex-col items-start gap-5 px-4 py-20 sm:px-6 sm:py-28">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-gold-300">
            Limited Time Offer
          </p>
          <h2 className="font-display text-4xl font-semibold text-cream-50 sm:text-5xl">
            Sale Up To <span className="text-gold-400">50% Off</span>
          </h2>
          <p className="max-w-lg text-cream-100/85">
            Upgrade your networking game with our sleek NFC/QR cards! Just tap to instantly share
            your contact info, social profiles, and more. Perfect for modern professionals on the go.
          </p>
          <Link
            href="/collections/nfc-card"
            className="group inline-flex items-center gap-2.5 rounded-full bg-gold-500 px-8 py-4 text-sm font-semibold text-ink-950 shadow-lg shadow-gold-500/30 transition-all hover:bg-gold-400"
          >
            Order Now
            <ArrowRight size={17} className="transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </section>

      {/* New arrivals */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20">
        <SectionHeading kicker="Just In" title="New Arrivals" />
        <div className="grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-3 lg:grid-cols-4">
          {newArrivals.map((p) => (
            <ProductCard key={p.handle} product={p} />
          ))}
        </div>
        <div className="mt-10 text-center">
          <Link
            href="/collections"
            className="inline-flex items-center gap-2 rounded-full border border-ink-950 px-8 py-3.5 text-sm font-semibold text-ink-950 transition-colors hover:bg-ink-950 hover:text-cream-50"
          >
            View All Collections <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-cream-100 py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <SectionHeading kicker="Client Feedback" title="The Valuable Opinion of Our Clients" />
          <Testimonials />
        </div>
      </section>

      {/* USP */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <USPStrip />
      </section>
    </>
  );
}

function PromoCard({
  image,
  kicker,
  title,
  text,
  href,
}: {
  image: string;
  kicker: string;
  title: string;
  text: string;
  href: string;
}) {
  return (
    <Link
      href={href}
      className="group relative flex min-h-72 items-end overflow-hidden rounded-2xl bg-ink-900 sm:min-h-80"
    >
      <Image
        src={image}
        alt={title}
        fill
        sizes="(max-width: 768px) 100vw, 50vw"
        className="object-cover transition-transform duration-700 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-ink-950/85 via-ink-950/25 to-transparent" />
      <div className="relative p-7">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-gold-300">{kicker}</p>
        <h3 className="mt-1.5 font-display text-2xl font-semibold text-cream-50 sm:text-3xl">
          {title}
        </h3>
        <p className="mt-2 max-w-md text-sm leading-relaxed text-cream-100/80">{text}</p>
        <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-gold-300">
          Shop Now
          <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
        </span>
      </div>
    </Link>
  );
}
