"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { nav, site } from "@/data/site";
import { useStore } from "@/components/store/StoreProvider";
import {
  BagIcon,
  ChevronDown,
  CloseIcon,
  FacebookIcon,
  HeartIcon,
  InstagramIcon,
  MailIcon,
  MenuIcon,
  PhoneIcon,
  SearchIcon,
  YoutubeIcon,
} from "@/components/ui/Icons";

export default function Header() {
  const { cartCount, wishlist, setCartOpen } = useStore();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setSearchOpen(false);
  }, [pathname]);

  return (
    <>
      {/* Utility bar: email + socials */}
      <div className="border-b border-cream-200 bg-cream-50">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-2 sm:px-6">
          <a
            href={`mailto:${site.orderEmail}`}
            className="flex items-center gap-2 text-[13px] text-ink-700 hover:text-gold-600 transition-colors"
          >
            <MailIcon size={15} className="text-gold-500" />
            {site.orderEmail}
          </a>
          <div className="flex items-center gap-4 text-ink-700">
            <a href={site.social.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="hover:text-gold-600 transition-colors">
              <FacebookIcon size={16} />
            </a>
            <a href={site.social.youtube} target="_blank" rel="noopener noreferrer" aria-label="YouTube" className="hover:text-gold-600 transition-colors">
              <YoutubeIcon size={16} />
            </a>
            <a href={site.social.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="hover:text-gold-600 transition-colors">
              <InstagramIcon size={16} />
            </a>
          </div>
        </div>
      </div>

      {/* Main header */}
      <header
        className={`sticky top-0 z-40 bg-cream-50/95 backdrop-blur-md transition-shadow ${
          scrolled
            ? "shadow-[0_1px_0_0_var(--color-cream-200),0_8px_30px_-18px_rgba(22,22,26,0.35)]"
            : "shadow-[0_1px_0_0_var(--color-cream-200)]"
        }`}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="flex h-18 items-center gap-4 md:h-22 md:gap-6">
            {/* Mobile menu button */}
            <button
              className="md:hidden -ml-2 p-2 text-ink-800"
              onClick={() => setMobileOpen(true)}
              aria-label="Open menu"
            >
              <MenuIcon size={24} />
            </button>

            {/* Logo */}
            <Link href="/" className="shrink-0" aria-label="Chitrangi home">
              <Image
                src="/images/logo.png"
                alt="Chitrangi"
                width={170}
                height={59}
                priority
                className="h-11 w-auto md:h-14"
              />
            </Link>

            {/* Phone block */}
            <a
              href={`tel:${site.phoneHref}`}
              className="hidden shrink-0 items-center gap-3 border-l border-cream-200 pl-5 lg:flex"
            >
              <PhoneIcon size={30} className="text-gold-500" />
              <span className="leading-tight">
                <span className="block text-[13px] text-ink-700">Order Now</span>
                <span className="block text-lg font-semibold tracking-wide text-ink-950">
                  95177-22444
                </span>
              </span>
            </a>

            {/* Desktop nav */}
            <nav className="ml-auto hidden items-center gap-7 text-[15px] font-medium text-ink-900 md:flex">
              {nav.map((item) =>
                item.children ? (
                  <div key={item.label} className="group relative">
                    <Link
                      href={item.href}
                      className="flex items-center gap-1 py-7 hover:text-gold-600 transition-colors"
                    >
                      {item.label}
                      <ChevronDown size={14} className="transition-transform group-hover:rotate-180" />
                    </Link>
                    <div className="invisible absolute left-1/2 top-full z-50 w-60 -translate-x-1/2 translate-y-2 rounded-lg border border-cream-200 bg-cream-50 p-2 opacity-0 shadow-xl shadow-ink-950/10 transition-all duration-200 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
                      {item.children.map((c) => (
                        <Link
                          key={c.href}
                          href={c.href}
                          className="block rounded-md px-4 py-2.5 text-sm text-ink-700 hover:bg-cream-100 hover:text-gold-600 transition-colors"
                        >
                          {c.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                ) : (
                  <Link
                    key={item.label}
                    href={item.href}
                    className="py-7 hover:text-gold-600 transition-colors"
                  >
                    {item.label}
                  </Link>
                )
              )}
            </nav>

            {/* Actions */}
            <div className="ml-auto flex items-center gap-2 md:ml-6">
              <button
                onClick={() => setSearchOpen(true)}
                className="flex h-11 w-11 items-center justify-center rounded border border-cream-200 bg-cream-100 text-ink-800 transition-colors hover:border-gold-500 hover:text-gold-600"
                aria-label="Search"
              >
                <SearchIcon size={19} />
              </button>
              <Link
                href="/wishlist"
                className="relative hidden h-11 w-11 items-center justify-center rounded border border-cream-200 bg-cream-100 text-ink-800 transition-colors hover:border-gold-500 hover:text-gold-600 sm:flex"
                aria-label="Wishlist"
              >
                <HeartIcon size={19} />
                {wishlist.length > 0 && (
                  <span className="absolute -right-1.5 -top-1.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-ink-950 px-1 text-[10px] font-semibold text-white">
                    {wishlist.length}
                  </span>
                )}
              </Link>
              <button
                onClick={() => setCartOpen(true)}
                className="relative flex h-11 w-11 items-center justify-center rounded border border-cream-200 bg-cream-100 text-ink-800 transition-colors hover:border-gold-500 hover:text-gold-600"
                aria-label="Open cart"
              >
                <BagIcon size={19} />
                <span className="absolute -right-1.5 -top-1.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-gold-500 px-1 text-[10px] font-semibold text-white">
                  {cartCount}
                </span>
              </button>
            </div>
          </div>
        </div>

        {searchOpen && <SearchOverlay onClose={() => setSearchOpen(false)} />}
        {mobileOpen && <MobileMenu onClose={() => setMobileOpen(false)} />}
      </header>
    </>
  );
}

function SearchOverlay({ onClose }: { onClose: () => void }) {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const [q, setQ] = useState("");

  useEffect(() => {
    inputRef.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50 bg-ink-950/50 backdrop-blur-sm animate-fade-in" onClick={onClose}>
      <div
        className="mx-auto mt-24 w-[92%] max-w-2xl rounded-xl bg-cream-50 p-6 shadow-2xl animate-fade-up"
        onClick={(e) => e.stopPropagation()}
      >
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (q.trim()) {
              router.push(`/search?q=${encodeURIComponent(q.trim())}`);
              onClose();
            }
          }}
          className="flex items-center gap-3 border-b-2 border-gold-500 pb-3"
        >
          <SearchIcon size={22} className="text-gold-500 shrink-0" />
          <input
            ref={inputRef}
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search personalized gifts, NFC cards, sign boards…"
            className="w-full bg-transparent text-lg text-ink-900 placeholder:text-ink-400 outline-none"
          />
          <button type="button" onClick={onClose} aria-label="Close search" className="text-ink-500 hover:text-ink-900">
            <CloseIcon size={22} />
          </button>
        </form>
        <div className="mt-4 flex flex-wrap gap-2 text-sm">
          {["Caricature", "NFC Card", "Welcome Board", "Corporate", "Calendar"].map((t) => (
            <button
              key={t}
              onClick={() => {
                router.push(`/search?q=${encodeURIComponent(t)}`);
                onClose();
              }}
              className="rounded-full border border-cream-300 px-4 py-1.5 text-ink-700 hover:border-gold-500 hover:text-gold-600 transition-colors"
            >
              {t}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function MobileMenu({ onClose }: { onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 md:hidden">
      <div className="absolute inset-0 bg-ink-950/50 backdrop-blur-sm animate-fade-in" onClick={onClose} />
      <div className="absolute inset-y-0 left-0 flex w-[85%] max-w-sm flex-col bg-cream-50 shadow-2xl animate-fade-in">
        <div className="flex items-center justify-between border-b border-cream-200 px-5 py-4">
          <Image src="/images/logo.png" alt="Chitrangi" width={120} height={41} className="h-9 w-auto" />
          <button onClick={onClose} aria-label="Close menu" className="p-2 text-ink-700">
            <CloseIcon size={24} />
          </button>
        </div>
        <nav className="flex-1 overflow-y-auto px-5 py-4">
          {nav.map((item) => (
            <div key={item.label} className="border-b border-cream-200 last:border-0">
              <Link href={item.href} className="block py-3.5 text-[17px] font-medium text-ink-900">
                {item.label}
              </Link>
              {item.children && (
                <div className="pb-3 pl-4">
                  {item.children.map((c) => (
                    <Link key={c.href} href={c.href} className="block py-2 text-[15px] text-ink-600 hover:text-gold-600">
                      {c.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>
        <div className="border-t border-cream-200 px-5 py-4 text-sm text-ink-600">
          <p className="font-semibold text-ink-900">Order Now: {site.phone}</p>
          <p className="mt-1">{site.orderEmail}</p>
        </div>
      </div>
    </div>
  );
}
