"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useFaq } from "@/lib/public-data";

const fallbackFaq = [
  {
    id: "f1",
    question: "Rezervasyon nasıl yapılır?",
    answer:
      "Rezervasyon işlemleri WhatsApp üzerinden yürütülüyor. Sitedeki WhatsApp butonuna tıklayarak tarih ve misafir sayınızı iletmeniz yeterli.",
  },
  {
    id: "f2",
    question: "Evcil hayvan kabul ediyor musunuz?",
    answer: "Bungalov bazında değişebilir, lütfen WhatsApp üzerinden önceden bilgi alın.",
  },
  {
    id: "f3",
    question: "Havuz yılın her döneminde kullanılabiliyor mu?",
    answer: "Evet, havuzlarımız ısıtmalıdır ve kış aylarında da keyifle kullanılabilir.",
  },
];

export default function Faq() {
  const items = useFaq();
  const list = items.length ? items : fallbackFaq;
  const [open, setOpen] = useState<string | null>(list[0]?.id ?? null);

  return (
    <section className="bg-mist-cream-dim px-5 py-24">
      <div className="mx-auto max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <p className="eyebrow mb-4 text-pine-deep">Merak Edilenler</p>
          <h2 className="font-display text-3xl text-stone-ink sm:text-4xl">Sık Sorulan Sorular</h2>
        </motion.div>

        <div className="divide-y divide-stone-ink/10 rounded-2xl bg-white ring-1 ring-stone-ink/5">
          {list.map((item) => {
            const isOpen = open === item.id;
            return (
              <div key={item.id}>
                <button
                  onClick={() => setOpen(isOpen ? null : item.id)}
                  className="flex w-full items-center justify-between px-6 py-5 text-left"
                >
                  <span className="font-medium text-stone-ink">{item.question}</span>
                  <ChevronDown
                    size={18}
                    className={`shrink-0 text-stone-ink/40 transition-transform ${isOpen ? "rotate-180" : ""}`}
                  />
                </button>
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className="overflow-hidden"
                    >
                      <p className="px-6 pb-5 text-sm leading-relaxed text-stone-ink/65">{item.answer}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
