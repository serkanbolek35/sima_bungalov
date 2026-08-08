"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import Lightbox from "yet-another-react-lightbox";
import { Play, X } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppFloatingButton from "@/components/WhatsAppFloatingButton";
import { allPhotosByCategory, allVideosByCategory } from "@/lib/full-media";

const photoCategoryLabels: Record<string, string> = {
  exterior: "Dış Cephe",
  pool: "Havuz",
  garden: "Bahçe",
  "living-room": "Oturma Alanı",
  kitchen: "Mutfak",
  bedroom: "Yatak Odası",
  night: "Gece",
  drone: "Kuş Bakışı",
  lifestyle: "Yaşam Tarzı",
};

const videoCategoryLabels: Record<string, string> = {
  "videos-hero": "Öne Çıkanlar",
  "videos-pool-garden": "Havuz & Bahçe",
  "videos-interior": "İç Mekan",
};

export default function GaleriPage() {
  const [tab, setTab] = useState<"foto" | "video">("foto");
  const [activeCat, setActiveCat] = useState<string>("all");
  const [index, setIndex] = useState(-1);
  const [playingVideo, setPlayingVideo] = useState<string | null>(null);

  const allPhotos = useMemo(
    () =>
      Object.entries(allPhotosByCategory).flatMap(([cat, imgs]) =>
        imgs.map((img) => ({ ...img, category: cat }))
      ),
    []
  );

  const filteredPhotos =
    activeCat === "all" ? allPhotos : allPhotos.filter((p) => p.category === activeCat);

  const allVideos = useMemo(
    () =>
      Object.entries(allVideosByCategory).flatMap(([cat, vids]) =>
        vids.map((v) => ({ ...v, category: cat }))
      ),
    []
  );

  return (
    <>
      <Header />
      <main className="bg-mist-cream pt-28">
        <section className="px-5 pb-8 text-center">
          <p className="eyebrow mb-4 text-pine-deep">Tüm Görseller</p>
          <h1 className="font-display text-3xl text-stone-ink sm:text-4xl">Galeri</h1>
          <p className="mx-auto mt-3 max-w-xl text-sm text-stone-ink/60">
            Sima Bungalov&apos;dan {allPhotos.length} fotoğraf ve {allVideos.length} video —
            havuzdan bahçeye, gece atmosferinden kuş bakışı görünümlere kadar.
          </p>

          <div className="mt-8 flex justify-center gap-2">
            <button
              onClick={() => { setTab("foto"); setActiveCat("all"); }}
              className={`rounded-full px-5 py-2 text-sm font-medium transition-colors ${
                tab === "foto" ? "bg-pine-deep text-white" : "bg-white text-stone-ink/60 ring-1 ring-stone-ink/10"
              }`}
            >
              Fotoğraflar ({allPhotos.length})
            </button>
            <button
              onClick={() => { setTab("video"); setActiveCat("all"); }}
              className={`rounded-full px-5 py-2 text-sm font-medium transition-colors ${
                tab === "video" ? "bg-pine-deep text-white" : "bg-white text-stone-ink/60 ring-1 ring-stone-ink/10"
              }`}
            >
              Videolar ({allVideos.length})
            </button>
          </div>

          <div className="mt-5 flex flex-wrap justify-center gap-2">
            <button
              onClick={() => setActiveCat("all")}
              className={`rounded-full px-3.5 py-1.5 text-xs font-medium transition-colors ${
                activeCat === "all" ? "bg-amber-ember text-white" : "bg-white text-stone-ink/50 ring-1 ring-stone-ink/10"
              }`}
            >
              Tümü
            </button>
            {Object.keys(tab === "foto" ? allPhotosByCategory : allVideosByCategory).map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCat(cat)}
                className={`rounded-full px-3.5 py-1.5 text-xs font-medium transition-colors ${
                  activeCat === cat ? "bg-amber-ember text-white" : "bg-white text-stone-ink/50 ring-1 ring-stone-ink/10"
                }`}
              >
                {(tab === "foto" ? photoCategoryLabels : videoCategoryLabels)[cat] ?? cat}
              </button>
            ))}
          </div>
        </section>

        {tab === "foto" ? (
          <section className="px-5 pb-24">
            <div className="mx-auto max-w-6xl columns-2 gap-3 sm:columns-3 md:columns-4 [column-fill:_balance]">
              {filteredPhotos.map((img, i) => (
                <motion.button
                  key={img.src}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.4, delay: (i % 12) * 0.03 }}
                  onClick={() => setIndex(i)}
                  className="mb-3 block w-full overflow-hidden rounded-lg break-inside-avoid"
                >
                  <Image
                    src={img.src}
                    alt={img.alt}
                    width={500}
                    height={500}
                    className="h-auto w-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                </motion.button>
              ))}
            </div>
            <Lightbox
              open={index >= 0}
              index={index}
              close={() => setIndex(-1)}
              slides={filteredPhotos.map((img) => ({ src: img.src, alt: img.alt }))}
            />
          </section>
        ) : (
          <section className="px-5 pb-24">
            <div className="mx-auto grid max-w-6xl grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
              {(activeCat === "all" ? allVideos : allVideos.filter((v) => v.category === activeCat)).map(
                (v, i) => (
                  <motion.div
                    key={v.src}
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.4, delay: (i % 12) * 0.04 }}
                    onClick={() => setPlayingVideo(v.src)}
                    className="group relative aspect-[9/16] cursor-pointer overflow-hidden rounded-xl bg-ink-night"
                  >
                    <Image src={v.poster} alt="Sima Bungalov video" fill className="object-cover opacity-90 transition-opacity group-hover:opacity-70" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="flex h-11 w-11 items-center justify-center rounded-full bg-white/90 text-pine-deep transition-transform group-hover:scale-110">
                        <Play size={18} fill="currentColor" />
                      </div>
                    </div>
                  </motion.div>
                )
              )}
            </div>
          </section>
        )}
      </main>

      <AnimatePresence>
        {playingVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 px-4"
            onClick={() => setPlayingVideo(null)}
          >
            <button
              onClick={() => setPlayingVideo(null)}
              className="absolute right-5 top-5 text-white/80 hover:text-white"
              aria-label="Kapat"
            >
              <X size={28} />
            </button>
            <video
              src={playingVideo}
              controls
              autoPlay
              className="max-h-[85vh] max-w-full rounded-lg"
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
      <WhatsAppFloatingButton />
    </>
  );
}
