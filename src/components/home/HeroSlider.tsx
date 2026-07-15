"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { heroSlides } from "@/data/site";
import { ArrowRight, ChevronLeft, ChevronRight } from "@/components/ui/Icons";

const AUTOPLAY_MS = 6000;

export default function HeroSlider() {
  const [index, setIndex] = useState(0);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  const go = useCallback((i: number) => {
    setIndex((i + heroSlides.length) % heroSlides.length);
  }, []);

  useEffect(() => {
    timer.current = setInterval(() => go(index + 1), AUTOPLAY_MS);
    return () => {
      if (timer.current) clearInterval(timer.current);
    };
  }, [index, go]);

  return (
    <section className="relative overflow-hidden bg-ink-950" aria-label="Featured collections">
      <div className="relative h-[62vw] max-h-[620px] min-h-[400px] w-full sm:h-[46vw]">
        {heroSlides.map((s, i) => (
          <div
            key={s.title}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              i === index ? "opacity-100" : "opacity-0 pointer-events-none"
            }`}
          >
            <Image
              src={s.image}
              alt={s.title}
              fill
              priority={i === 0}
              sizes="100vw"
              className={`object-cover object-center transition-transform duration-[7000ms] ease-out ${
                i === index ? "scale-105" : "scale-100"
              }`}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-ink-950/75 via-ink-950/35 to-transparent" />
            <div className="absolute inset-0 flex items-center">
              <div className="mx-auto w-full max-w-7xl px-4 sm:px-6">
                <div className={`max-w-xl ${i === index ? "animate-fade-up" : "opacity-0"}`}>
                  <p className="mb-3 inline-block rounded-full border border-gold-400/60 bg-ink-950/30 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.2em] text-gold-300 backdrop-blur">
                    {s.kicker}
                  </p>
                  <h1 className="font-display text-4xl font-semibold leading-tight text-cream-50 sm:text-5xl lg:text-6xl">
                    {s.title}
                  </h1>
                  <p className="mt-4 max-w-md text-sm leading-relaxed text-cream-100/85 sm:text-base">
                    {s.text}
                  </p>
                  <Link
                    href={s.href}
                    className="group mt-7 inline-flex items-center gap-2.5 rounded-full bg-gold-500 px-7 py-3.5 text-sm font-semibold text-ink-950 shadow-lg shadow-gold-500/25 transition-all hover:bg-gold-400 hover:shadow-gold-400/40"
                  >
                    {s.cta}
                    <ArrowRight size={17} className="transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Controls */}
      <button
        onClick={() => go(index - 1)}
        aria-label="Previous slide"
        className="absolute left-3 top-1/2 hidden -translate-y-1/2 rounded-full border border-cream-50/25 bg-ink-950/25 p-2.5 text-cream-50 backdrop-blur transition hover:bg-ink-950/50 sm:block"
      >
        <ChevronLeft size={20} />
      </button>
      <button
        onClick={() => go(index + 1)}
        aria-label="Next slide"
        className="absolute right-3 top-1/2 hidden -translate-y-1/2 rounded-full border border-cream-50/25 bg-ink-950/25 p-2.5 text-cream-50 backdrop-blur transition hover:bg-ink-950/50 sm:block"
      >
        <ChevronRight size={20} />
      </button>
      <div className="absolute bottom-5 left-1/2 flex -translate-x-1/2 gap-2">
        {heroSlides.map((_, i) => (
          <button
            key={i}
            onClick={() => go(i)}
            aria-label={`Go to slide ${i + 1}`}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              i === index ? "w-8 bg-gold-400" : "w-3 bg-cream-50/50 hover:bg-cream-50/80"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
