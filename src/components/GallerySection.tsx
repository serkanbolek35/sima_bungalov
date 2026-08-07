"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Lightbox from "yet-another-react-lightbox";
import type { GalleryImage } from "@/lib/content";

export default function GallerySection({
  id,
  eyebrow,
  title,
  subtitle,
  description,
  images,
  dark = false,
}: {
  id: string;
  eyebrow: string;
  title: string;
  subtitle: string;
  description: string;
  images: GalleryImage[];
  dark?: boolean;
}) {
  const [index, setIndex] = useState(-1);

  return (
    <section
      id={id}
      className={`px-5 py-24 ${dark ? "bg-ink-night" : "bg-mist-cream"}`}
    >
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7 }}
          className="mx-auto max-w-2xl text-center"
        >
          <p className={`eyebrow mb-4 ${dark ? "text-amber-soft" : "text-pine-deep"}`}>{eyebrow}</p>
          <h2 className={`font-display text-3xl leading-tight sm:text-4xl ${dark ? "text-mist-cream" : "text-stone-ink"}`}>
            {title}
          </h2>
          <p className={`mt-2 text-sm italic ${dark ? "text-mist-cream/60" : "text-stone-ink/50"}`}>{subtitle}</p>
          <p className={`mt-4 text-base leading-relaxed ${dark ? "text-mist-cream/70" : "text-stone-ink/70"}`}>
            {description}
          </p>
        </motion.div>

        <div className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-3 md:gap-4">
          {images.map((img, i) => (
            <motion.button
              key={img.src}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: (i % 6) * 0.06 }}
              onClick={() => setIndex(i)}
              className={`relative aspect-square overflow-hidden rounded-xl ${i === 0 ? "col-span-2 row-span-2 aspect-square sm:aspect-auto" : ""}`}
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                className="object-cover transition-transform duration-500 hover:scale-105"
                sizes="(min-width: 768px) 30vw, 45vw"
              />
            </motion.button>
          ))}
        </div>
      </div>

      <Lightbox
        open={index >= 0}
        index={index}
        close={() => setIndex(-1)}
        slides={images.map((img) => ({ src: img.src, alt: img.alt }))}
      />
    </section>
  );
}
