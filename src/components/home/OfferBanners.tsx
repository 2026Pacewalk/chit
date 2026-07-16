import Image from "next/image";
import Link from "next/link";

/**
 * Festive two-banner advertisement section (Diwali sale style):
 * decorative arch panel, sale text, CTA and a product shot on a podium.
 */
export default function OfferBanners() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20" aria-label="Festive offers">
      <div className="grid gap-6 md:grid-cols-2">
        {/* Banner 1 — amber / temple arch */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-b from-[#f9b70a] to-[#f39c00] px-5 pt-7">
          <Decor items={["🪔", "✨", "🪔"]} tone="dark" />
          <div className="relative mx-auto flex w-[88%] max-w-sm flex-col items-center px-5 pt-12 text-center [border-radius:50%_50%_0_0/24%_24%_0_0] bg-[#a2470f]">
            <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-white">
              Diwali Biggest Sale
            </p>
            <p className="mt-1 font-display text-4xl font-bold tracking-wide text-amber-300">
              OFFERS
            </p>
            <Link
              href="/collections"
              className="mt-3 rounded bg-indigo-950 px-5 py-2 text-[11px] font-bold uppercase tracking-[0.2em] text-white transition-colors hover:bg-indigo-900"
            >
              Shop Now
            </Link>
            <div className="relative mt-6 aspect-square w-56 sm:w-64">
              <Image
                src="/images/banners/offer-calendar.png"
                alt="Personalized corporate calendar with wooden base"
                fill
                sizes="256px"
                className="object-contain drop-shadow-[0_14px_18px_rgba(0,0,0,0.35)]"
              />
            </div>
          </div>
          {/* podium */}
          <div className="relative mx-auto -mt-5 mb-7 h-11 w-[70%] max-w-xs rounded-[50%] bg-gradient-to-b from-[#c1272d] to-[#8f1d22] shadow-[0_14px_24px_rgba(0,0,0,0.3)]" />
        </div>

        {/* Banner 2 — pink / navy arch with garland border */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-b from-[#ea4b62] to-[#d83a52] px-5 pt-7">
          <Decor items={["🎆", "🪔", "✨"]} tone="light" />
          <div className="relative mx-auto flex w-[88%] max-w-sm flex-col items-center border-4 border-dotted border-amber-400 px-5 pt-12 text-center [border-radius:50%_50%_0_0/24%_24%_0_0] bg-[#131b4b]">
            <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-white">
              Diwali Biggest Sale
            </p>
            <p className="mt-1 font-display text-4xl font-bold tracking-wide text-white">
              OFFERS
            </p>
            <Link
              href="/collections/personalized-corporate-gifts"
              className="mt-3 rounded bg-[#e8465e] px-5 py-2 text-[11px] font-bold uppercase tracking-[0.2em] text-white transition-colors hover:bg-[#f25b71]"
            >
              Shop Now
            </Link>
            <div className="relative mt-6 aspect-square w-56 sm:w-64">
              <Image
                src="/images/banners/offer-card.png"
                alt="Personalized business and NFC cards"
                fill
                sizes="256px"
                className="object-contain drop-shadow-[0_14px_18px_rgba(0,0,0,0.45)]"
              />
            </div>
          </div>
          {/* glowing podium */}
          <div className="relative mx-auto -mt-5 mb-7 h-11 w-[70%] max-w-xs rounded-[50%] bg-gradient-to-b from-[#1b2666] to-[#0d1338] shadow-[0_0_28px_rgba(96,165,250,0.75),0_14px_24px_rgba(0,0,0,0.4)] ring-2 ring-blue-400/70" />
        </div>
      </div>
    </section>
  );
}

function Decor({ items, tone }: { items: string[]; tone: "dark" | "light" }) {
  return (
    <>
      <span aria-hidden className="absolute left-4 top-4 text-2xl sm:text-3xl">
        {items[0]}
      </span>
      <span aria-hidden className="absolute right-4 top-4 text-2xl sm:text-3xl">
        {items[1]}
      </span>
      <span aria-hidden className="absolute bottom-4 left-5 text-2xl sm:text-3xl">
        {items[2]}
      </span>
      <span aria-hidden className="absolute bottom-4 right-5 text-2xl sm:text-3xl">
        🪔
      </span>
      <span
        aria-hidden
        className={`absolute left-1/2 top-0 h-10 w-px -translate-x-24 ${
          tone === "dark" ? "bg-amber-900/40" : "bg-amber-200/50"
        }`}
      />
      <span
        aria-hidden
        className={`absolute left-1/2 top-0 h-10 w-px translate-x-24 ${
          tone === "dark" ? "bg-amber-900/40" : "bg-amber-200/50"
        }`}
      />
    </>
  );
}
