"use client";

import { motion } from "framer-motion";
import { MapPin, Phone, Mail, MessageCircle, AtSign, Clock } from "lucide-react";
import { useSettings } from "@/lib/public-data";
import { whatsappLink, defaultWhatsappMessage } from "@/lib/whatsapp";
import { droneSection } from "@/lib/content";

export default function LocationContact() {
  const settings = useSettings();

  return (
    <section id="konum" className="bg-ink-night px-5 py-24">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7 }}
          className="mx-auto max-w-2xl text-center"
        >
          <p className="eyebrow mb-4 text-amber-soft">{droneSection.eyebrow}</p>
          <h2 className="font-display text-3xl leading-tight text-mist-cream sm:text-4xl">
            {droneSection.title}
          </h2>
          <p className="mt-4 text-base leading-relaxed text-mist-cream/70">{droneSection.description}</p>
        </motion.div>

        <div id="iletisim" className="mt-16 grid grid-cols-1 gap-10 md:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className="overflow-hidden rounded-2xl"
          >
            {settings.mapEmbedUrl ? (
              <iframe
                src={settings.mapEmbedUrl}
                className="h-80 w-full border-0 md:h-full"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Sima Bungalov Konum"
              />
            ) : (
              <div className="flex h-80 w-full flex-col items-center justify-center gap-2 bg-pine-deep/30 text-center md:h-full">
                <MapPin className="text-amber-soft" size={28} />
                <p className="text-sm text-mist-cream/70">{settings.address || "Sapanca, Sakarya"}</p>
                <p className="text-xs text-mist-cream/40">Harita bağlantısı admin panelden eklenebilir</p>
              </div>
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex flex-col justify-center rounded-2xl bg-white/5 p-8"
          >
            <h3 className="font-display text-xl text-mist-cream">Bize Ulaşın</h3>
            <p className="mt-2 text-sm text-mist-cream/60">
              Sorularınız ve rezervasyon talepleriniz için WhatsApp en hızlı iletişim yolu.
            </p>

            <ul className="mt-6 space-y-4 text-sm text-mist-cream/80">
              <li className="flex items-center gap-3">
                <Phone size={16} className="text-amber-soft" /> {settings.phone || "05xx xxx xx xx"}
              </li>
              <li className="flex items-center gap-3">
                <Mail size={16} className="text-amber-soft" /> {settings.email || "info@simabungalov.com"}
              </li>
              <li className="flex items-center gap-3">
                <MapPin size={16} className="text-amber-soft" /> {settings.address || "Sapanca, Sakarya"}
              </li>
              <li className="flex items-center gap-3">
                <Clock size={16} className="text-amber-soft" /> {settings.workingHours}
              </li>
              {settings.instagram && (
                <li className="flex items-center gap-3">
                  <AtSign size={16} className="text-amber-soft" />
                  <a href={settings.instagram} target="_blank" rel="noopener noreferrer" className="hover:underline">
                    Instagram&apos;da Takip Et
                  </a>
                </li>
              )}
            </ul>

            <a
              href={whatsappLink(settings.whatsapp, defaultWhatsappMessage)}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 flex items-center justify-center gap-2 rounded-full bg-amber-ember py-3.5 text-sm font-medium text-white transition-colors hover:bg-amber-soft"
            >
              <MessageCircle size={17} /> WhatsApp&apos;tan Yaz
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
