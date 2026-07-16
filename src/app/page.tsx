import Image from "next/image";
import Link from "next/link";
import HeroSlider from "@/components/home/HeroSlider";
import CategorySidebar from "@/components/home/CategorySidebar";
import OfferBanners from "@/components/home/OfferBanners";
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
      {/* Hero: category sidebar + slider */}
      <div className="mx-auto max-w-7xl px-4 pt-5 sm:px-6">
        <div className="grid gap-5 lg:grid-cols-[270px_1fr]">
          <CategorySidebar />
          <HeroSlider />
        </div>
      </div>

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

      {/* Festive offer advertisement banners */}
      <OfferBanners />

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
