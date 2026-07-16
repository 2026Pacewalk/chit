"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { heroSlides } from "@/data/site";

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
    <section
      className="relative overflow-hidden rounded-md bg-cream-100"
      aria-label="Featured collections"
    >
      {heroSlides.map((s, i) => (
        <div
          key={s.title}
          className={`grid items-center gap-6 px-6 py-10 sm:px-10 lg:grid-cols-[1fr_minmax(0,460px)] lg:gap-10 lg:py-12 ${
            i === index ? "" : "hidden"
          }`}
        >
          {/* Text */}
          <div className={i === index ? "animate-fade-up" : ""}>
            <p className="text-lg font-medium text-gold-500">{s.kicker}</p>
            <h1 className="mt-1 font-body text-4xl font-bold uppercase leading-[1.05] tracking-tight text-ink-950 sm:text-5xl lg:text-6xl">
              {s.title}
            </h1>
            <p className="mt-5 max-w-md text-[15px] leading-relaxed text-ink-700 sm:text-base">
              {s.text}
            </p>
            <Link
              href={s.href}
              className="mt-8 inline-block rounded bg-gold-500 px-9 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-gold-600"
            >
              {s.cta}
            </Link>
          </div>

          {/* Image */}
          <div className={`relative mx-auto aspect-square w-full max-w-md ${i === index ? "animate-fade-in" : ""}`}>
            <Image
              src={s.image}
              alt={s.title}
              fill
              priority={i === 0}
              sizes="(max-width: 1024px) 90vw, 460px"
              className="object-contain"
            />
          </div>
        </div>
      ))}

      {/* Dots */}
      <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2 lg:left-auto lg:right-1/4 lg:translate-x-1/2">
        {heroSlides.map((_, i) => (
          <button
            key={i}
            onClick={() => go(i)}
            aria-label={`Go to slide ${i + 1}`}
            className={`h-2.5 w-2.5 rounded-full transition-colors ${
              i === index ? "bg-gold-500" : "bg-ink-400/40 hover:bg-ink-400"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
