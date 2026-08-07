"use client";

import { motion } from "framer-motion";
import { Waves, Trees, Car, Wifi, Bath, Coffee } from "lucide-react";
import { amenities } from "@/lib/content";

const icons = [Waves, Trees, Car, Wifi, Bath, Coffee];

export default function Amenities() {
  return (
    <section className="bg-mist-cream px-5 py-20">
      <div className="mx-auto max-w-6xl">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6 }}
          className="eyebrow mb-10 text-center text-pine-deep"
        >
          Her Bungalovda Standart
        </motion.p>
        <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-6">
          {amenities.map((a, i) => {
            const Icon = icons[i % icons.length];
            return (
              <motion.div
                key={a.label}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
                className="flex flex-col items-center text-center"
              >
                <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-pine-deep/10 text-pine-deep">
                  <Icon size={20} />
                </div>
                <p className="text-sm font-medium text-stone-ink">{a.label}</p>
                <p className="mt-1 text-xs text-stone-ink/50">{a.note}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
