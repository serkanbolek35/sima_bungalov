"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import Lightbox from "yet-another-react-lightbox";
import { Users, MessageCircle, Waves, Trees, Wifi, Car } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppFloatingButton from "@/components/WhatsAppFloatingButton";
import Faq from "@/components/Faq";
import { useBungalows, useSettings } from "@/lib/public-data";
import { gallerySections, nightSection, bungalowUnits } from "@/lib/content";
import { whatsappLink, bungalowWhatsappMessage } from "@/lib/whatsapp";

const houseRules = [
  "Giriş saati 14:00, çıkış saati 11:00'dir.",
  "Bungalov içinde ve havuz alanında sigara içilmesi rica edilmez.",
  "Sessizlik saatleri 23:00–08:00 arasıdır, komşu bungalovlara saygı rica olunur.",
  "Evcil hayvan durumu için lütfen rezervasyon öncesi WhatsApp'tan bilgi alın.",
  "Havuz kullanımı kendi sorumluluğunuzdadır, küçük çocuklar refakatsiz bırakılmamalıdır.",
];

export default function BungalowDetailClient({ id }: { id: string }) {
  const bungalows = useBungalows();
  const settings = useSettings();
  const [index, setIndex] = useState(-1);

  const bungalow = bungalows.find((b) => b.id === id) ?? {
    id,
    number: Number(id.split("-")[1] ?? 1),
    name: `Bungalov ${id.split("-")[1] ?? ""}`,
    price: 0,
    maxGuests: 4,
    description:
      "Isıtmalı özel havuzu ve modern A-frame mimarisiyle Sima Bungalov deneyimi.",
    active: true,
    order: 1,
  };

  const unit = bungalowUnits[(bungalow.number - 1) % bungalowUnits.length];

  const allImages = [
    ...gallerySections.flatMap((s) => s.images),
    ...nightSection.images,
  ];

  return (
    <>
      <Header />
      <main className="bg-mist-cream pt-24">
        {/* Hero image */}
        <section className="relative h-[52vh] min-h-[380px] w-full overflow-hidden">
          <Image src={unit.image} alt={bungalow.name} fill priority className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-ink-night/70 via-ink-night/10 to-transparent" />
          <div className="absolute bottom-8 left-0 w-full px-5">
            <div className="mx-auto max-w-6xl">
              <p className="eyebrow mb-2 text-amber-soft">Sima Bungalov</p>
              <h1 className="font-display text-3xl text-mist-cream sm:text-4xl">{bungalow.name}</h1>
              <p className="mt-1 text-sm text-mist-cream/70">{unit.tagline}</p>
            </div>
          </div>
        </section>

        {/* Quick facts + CTA */}
        <section className="border-b border-stone-ink/10 bg-white px-5 py-6">
          <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-6 text-sm text-stone-ink/70">
              <span className="flex items-center gap-1.5"><Users size={15} /> {bungalow.maxGuests} misafire kadar</span>
              <span className="font-medium text-pine-deep">
                {bungalow.price > 0 ? `${bungalow.price.toLocaleString("tr-TR")} ₺ / gece` : "Fiyat için WhatsApp"}
              </span>
            </div>
            <a
              href={whatsappLink(settings.whatsapp, bungalowWhatsappMessage(bungalow.name))}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-full bg-amber-ember px-5 py-2.5 text-sm font-medium text-white hover:bg-amber-soft"
            >
              <MessageCircle size={16} /> WhatsApp&apos;tan Rezervasyon
            </a>
          </div>
        </section>

        {/* Description */}
        <section className="px-5 py-14">
          <div className="mx-auto max-w-3xl">
            <h2 className="font-display text-2xl text-stone-ink">Bungalov Hakkında</h2>
            <p className="mt-4 text-base leading-relaxed text-stone-ink/70">
              {bungalow.description ||
                `${bungalow.name}, Sima Bungalov'un imza deneyimini sunar: ısıtmalı özel havuz, kapalı özel bahçe, modern A-frame mimarisi ve sıcak iç mekanlar. Sapanca'nın doğasına adım attığınız andan itibaren, mahremiyetiniz ve konforunuz ön planda.`}
            </p>
          </div>
        </section>

        {/* Amenities grid */}
        <section className="bg-mist-cream-dim px-5 py-14">
          <div className="mx-auto max-w-3xl">
            <h2 className="font-display text-2xl text-stone-ink">Olanaklar</h2>
            <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
              {[
                { icon: Waves, label: "Isıtmalı Havuz" },
                { icon: Trees, label: "Özel Bahçe" },
                { icon: Wifi, label: "Ücretsiz Wi-Fi" },
                { icon: Car, label: "Ücretsiz Otopark" },
              ].map((a) => (
                <div key={a.label} className="flex flex-col items-center gap-2 rounded-xl bg-white p-4 text-center">
                  <a.icon size={20} className="text-pine-deep" />
                  <span className="text-xs font-medium text-stone-ink">{a.label}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Gallery */}
        <section className="px-5 py-14">
          <div className="mx-auto max-w-6xl">
            <h2 className="font-display text-2xl text-stone-ink">Galeri</h2>
            <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {allImages.slice(0, 16).map((img, i) => (
                <motion.button
                  key={img.src}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: (i % 8) * 0.04 }}
                  onClick={() => setIndex(i)}
                  className="relative aspect-square overflow-hidden rounded-lg"
                >
                  <Image src={img.src} alt={img.alt} fill className="object-cover hover:scale-105 transition-transform duration-500" sizes="25vw" />
                </motion.button>
              ))}
            </div>
          </div>
          <Lightbox
            open={index >= 0}
            index={index}
            close={() => setIndex(-1)}
            slides={allImages.slice(0, 16).map((img) => ({ src: img.src, alt: img.alt }))}
          />
        </section>

        {/* House rules */}
        <section className="bg-mist-cream-dim px-5 py-14">
          <div className="mx-auto max-w-3xl">
            <h2 className="font-display text-2xl text-stone-ink">Ev Kuralları</h2>
            <ul className="mt-6 space-y-3">
              {houseRules.map((rule) => (
                <li key={rule} className="flex gap-3 text-sm leading-relaxed text-stone-ink/70">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-ember" />
                  {rule}
                </li>
              ))}
            </ul>
          </div>
        </section>

        <Faq />

        {/* Bottom CTA */}
        <section className="bg-ink-night px-5 py-16 text-center">
          <h2 className="font-display text-2xl text-mist-cream">
            {bungalow.name} için müsaitlik sorun
          </h2>
          <a
            href={whatsappLink(settings.whatsapp, bungalowWhatsappMessage(bungalow.name))}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-amber-ember px-6 py-3.5 text-sm font-medium text-white hover:bg-amber-soft"
          >
            <MessageCircle size={17} /> WhatsApp&apos;tan Yaz
          </a>
        </section>
      </main>
      <Footer />
      <WhatsAppFloatingButton />
    </>
  );
}
