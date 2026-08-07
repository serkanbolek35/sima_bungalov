"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Users, MessageCircle } from "lucide-react";
import { useBungalows, useSettings } from "@/lib/public-data";
import { bungalowUnits } from "@/lib/content";
import { whatsappLink, bungalowWhatsappMessage } from "@/lib/whatsapp";

export default function BungalowsOverview() {
  const bungalows = useBungalows();
  const settings = useSettings();

  return (
    <section id="bungalovlar" className="bg-mist-cream-dim px-5 py-24">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7 }}
          className="mx-auto max-w-2xl text-center"
        >
          <p className="eyebrow mb-4 text-pine-deep">4 Bağımsız Bungalov</p>
          <h2 className="font-display text-3xl leading-tight text-stone-ink sm:text-4xl">
            Aynı Konfor, Kendi Mahremiyetiniz
          </h2>
          <p className="mt-4 text-base leading-relaxed text-stone-ink/70">
            Sima Bungalov, birbirinin eşi dört bağımsız üniteden oluşur — her biri
            kendi ısıtmalı havuzu, bahçesi ve modern iç mekanıyla size özel bir
            deneyim sunar. Uygun tarihleri öğrenmek için doğrudan WhatsApp&apos;tan
            yazabilirsiniz.
          </p>
        </motion.div>

        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {bungalows.map((b, i) => {
            const image = bungalowUnits[i % bungalowUnits.length].image;
            return (
              <motion.div
                key={b.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, delay: i * 0.08 }}
                className="group flex flex-col overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-stone-ink/5"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={image}
                    alt={`${b.name} dış görünüm`}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                  />
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <h3 className="font-display text-lg text-stone-ink">{b.name}</h3>
                  <p className="mt-1.5 flex items-center gap-1.5 text-xs text-stone-ink/50">
                    <Users size={13} /> {b.maxGuests} misafire kadar
                  </p>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-stone-ink/60">
                    Isıtmalı özel havuz, özel bahçe ve modern iç mekan.
                  </p>
                  <div className="mt-4 flex items-center justify-between border-t border-stone-ink/10 pt-4">
                    <span className="text-sm font-medium text-pine-deep">
                      {b.price > 0 ? `${b.price.toLocaleString("tr-TR")} ₺ / gece` : "Fiyat için sor"}
                    </span>
                    <Link
                      href={`/bungalovlar/${b.id}`}
                      className="text-xs font-medium text-stone-ink/60 hover:text-pine-deep"
                    >
                      Detaylar →
                    </Link>
                  </div>
                  <a
                    href={whatsappLink(settings.whatsapp, bungalowWhatsappMessage(b.name))}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 flex items-center justify-center gap-2 rounded-full bg-pine-deep py-2.5 text-xs font-medium text-white transition-colors hover:bg-pine-mid"
                  >
                    <MessageCircle size={14} /> WhatsApp&apos;tan Sor
                  </a>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
