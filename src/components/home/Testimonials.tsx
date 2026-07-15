"use client";

import { useEffect, useState } from "react";
import { testimonials } from "@/data/site";
import { ChevronLeft, ChevronRight, QuoteIcon, StarIcon } from "@/components/ui/Icons";

export default function Testimonials() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setIndex((i) => (i + 1) % testimonials.length), 7000);
    return () => clearInterval(t);
  }, []);

  const item = testimonials[index];

  return (
    <div className="relative mx-auto max-w-3xl text-center">
      <QuoteIcon size={44} className="mx-auto text-gold-400" />
      <div key={index} className="animate-fade-in">
        <p className="mt-5 min-h-28 text-lg leading-relaxed text-ink-700 sm:text-xl">
          &ldquo;{item.quote}&rdquo;
        </p>
        <div className="mt-6 flex justify-center gap-1 text-gold-500">
          {Array.from({ length: 5 }).map((_, i) => (
            <StarIcon key={i} size={16} />
          ))}
        </div>
        <p className="mt-2 font-display text-lg font-semibold text-ink-950">{item.name}</p>
      </div>

      <button
        onClick={() => setIndex((index - 1 + testimonials.length) % testimonials.length)}
        aria-label="Previous testimonial"
        className="absolute -left-2 top-1/2 -translate-y-1/2 rounded-full border border-cream-300 p-2.5 text-ink-600 transition hover:border-gold-500 hover:text-gold-600 sm:-left-14"
      >
        <ChevronLeft size={18} />
      </button>
      <button
        onClick={() => setIndex((index + 1) % testimonials.length)}
        aria-label="Next testimonial"
        className="absolute -right-2 top-1/2 -translate-y-1/2 rounded-full border border-cream-300 p-2.5 text-ink-600 transition hover:border-gold-500 hover:text-gold-600 sm:-right-14"
      >
        <ChevronRight size={18} />
      </button>

      <div className="mt-6 flex justify-center gap-2">
        {testimonials.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            aria-label={`Testimonial ${i + 1}`}
            className={`h-1.5 rounded-full transition-all ${
              i === index ? "w-6 bg-gold-500" : "w-2.5 bg-cream-300"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
