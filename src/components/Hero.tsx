"use client";

import { motion } from "framer-motion";
import { ChevronDown, MessageCircle } from "lucide-react";
import { heroVideo } from "@/lib/content";
import { useSettings } from "@/lib/public-data";
import { whatsappLink, defaultWhatsappMessage } from "@/lib/whatsapp";

export default function Hero() {
  const settings = useSettings();

  return (
    <section id="hero" className="relative flex h-[100svh] min-h-[640px] w-full items-end overflow-hidden bg-ink-night">
      <video
        className="absolute inset-0 h-full w-full object-cover opacity-80"
        autoPlay
        muted
        loop
        playsInline
        poster={heroVideo.poster}
      >
        <source src={heroVideo.src} type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-gradient-to-t from-ink-night via-ink-night/40 to-ink-night/10" />
      <div className="absolute inset-0 bg-gradient-to-r from-ink-night/60 via-transparent to-ink-night/30" />

      <div className="relative z-10 mx-auto w-full max-w-6xl px-5 pb-20 pt-40">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="eyebrow mb-5 text-amber-soft"
        >
          Sapanca · Isıtmalı Özel Havuzlu Bungalov
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="font-display max-w-3xl text-4xl font-medium leading-[1.08] text-mist-cream sm:text-5xl md:text-6xl"
        >
          Sapanca&apos;da Hayalinizdeki Kaçamak
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-5 max-w-xl text-base leading-relaxed text-mist-cream/80 sm:text-lg"
        >
          Isıtmalı özel havuzu ve modern A-frame mimarisiyle, doğayla iç içe dört
          bağımsız bungalov. Mahremiyet ve konfor bir arada.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.35 }}
          className="mt-9 flex flex-wrap items-center gap-4"
        >
          <a
            href={whatsappLink(settings.whatsapp, defaultWhatsappMessage)}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 rounded-full bg-amber-ember px-6 py-3.5 text-sm font-medium text-white transition-colors hover:bg-amber-soft"
          >
            <MessageCircle size={17} />
            WhatsApp&apos;tan Rezervasyon
          </a>
          <a
            href="#bungalovlar"
            className="rounded-full border border-mist-cream/30 px-6 py-3.5 text-sm font-medium text-mist-cream transition-colors hover:border-mist-cream/70"
          >
            Bungalovları Gör
          </a>
        </motion.div>
      </div>

      <motion.a
        href="#hakkimizda"
        aria-label="Aşağı kaydır"
        className="absolute bottom-6 left-1/2 z-10 -translate-x-1/2 text-mist-cream/60"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
      >
        <ChevronDown size={26} />
      </motion.a>
    </section>
  );
}
