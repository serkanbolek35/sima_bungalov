"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { heroImages } from "@/lib/content";

export default function Intro() {
  return (
    <section id="hakkimizda" className="bg-mist-cream px-5 py-24">
      <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-14 md:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7 }}
        >
          <p className="eyebrow mb-4 text-pine-deep">Sima Bungalov Hikayesi</p>
          <h2 className="font-display text-3xl leading-tight text-stone-ink sm:text-4xl">
            Modern Mimari, Sapanca&apos;nın Sakin Doğasıyla Buluşuyor
          </h2>
          <p className="mt-6 text-base leading-relaxed text-stone-ink/70">
            Sima Bungalov, İstanbul&apos;un gürültüsünden uzaklaşmak isteyenler için
            Sapanca&apos;nın yeşil dokusunda hayata geçirildi. Üçgen çatılı A-frame
            mimarisi, geniş cam yüzeyleri ve doğal ahşap dokularıyla her bungalov,
            doğayla iç içe modern bir sığınak sunuyor.
          </p>
          <p className="mt-4 text-base leading-relaxed text-stone-ink/70">
            Her bungalova özel ısıtmalı havuz, kapalı bahçe ve konforlu iç mekanlar
            eşlik ediyor — ister arkadaşlarınızla, ister ailenizle huzurlu bir
            tatil planlıyor olun, Sima Bungalov yılın her döneminde sizi bekliyor.
          </p>
          <div className="mt-8 grid grid-cols-3 gap-6 border-t border-stone-ink/10 pt-6">
            <div>
              <p className="font-display text-2xl text-pine-deep">4</p>
              <p className="text-xs text-stone-ink/50">Bağımsız Bungalov</p>
            </div>
            <div>
              <p className="font-display text-2xl text-pine-deep">365</p>
              <p className="text-xs text-stone-ink/50">Gün Isıtmalı Havuz</p>
            </div>
            <div>
              <p className="font-display text-2xl text-pine-deep">~1sa</p>
              <p className="text-xs text-stone-ink/50">İstanbul&apos;a Mesafe</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.8 }}
          className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl"
        >
          <Image
            src={heroImages[1].src}
            alt={heroImages[1].alt}
            fill
            className="object-cover"
            sizes="(min-width: 768px) 40vw, 90vw"
          />
        </motion.div>
      </div>
    </section>
  );
}
