"use client";

import Image from "next/image";
import { useState } from "react";

export default function ProductGallery({ images, title }: { images: string[]; title: string }) {
  const [active, setActive] = useState(0);
  const list = images.length ? images : ["/images/logo.png"];

  return (
    <div>
      <div className="relative aspect-[2000/2548] overflow-hidden rounded-2xl bg-cream-200">
        <Image
          key={active}
          src={list[active]}
          alt={`${title} — image ${active + 1}`}
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="object-cover animate-fade-in"
        />
      </div>
      {list.length > 1 && (
        <div className="mt-3 grid grid-cols-5 gap-3">
          {list.map((img, i) => (
            <button
              key={img}
              onClick={() => setActive(i)}
              aria-label={`View image ${i + 1}`}
              className={`relative aspect-square overflow-hidden rounded-lg bg-cream-200 ring-2 ring-offset-2 ring-offset-cream-50 transition ${
                i === active ? "ring-gold-500" : "ring-transparent hover:ring-cream-300"
              }`}
            >
              <Image src={img} alt="" fill sizes="120px" className="object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
