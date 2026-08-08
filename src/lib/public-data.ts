"use client";

import { useEffect, useState } from "react";
import { collection, onSnapshot, doc, query, orderBy } from "firebase/firestore";
import { db } from "./firebase";
import type { Bungalow, SiteSettings, FaqItem } from "./types";
import { site } from "./content";

const fallbackSettings: SiteSettings = {
  phone: site.phone,
  whatsapp: site.whatsapp,
  instagram: site.instagram,
  email: site.email,
  address: "Sapanca, Sakarya",
  workingHours: "7/24 WhatsApp üzerinden ulaşılabilir",
  mapEmbedUrl: "",
};

const fallbackBungalows: Bungalow[] = [1, 2, 3, 4].map((n) => ({
  id: `bungalow-${n}`,
  number: n,
  name: `Bungalov ${n}`,
  price: 0,
  maxGuests: 4,
  description: "Isıtmalı özel havuzu ve modern A-frame mimarisiyle Sima Bungalov deneyimi.",
  active: true,
  order: n,
}));

export function useSettings(): SiteSettings {
  const [settings, setSettings] = useState<SiteSettings>(fallbackSettings);
  useEffect(() => {
    const unsub = onSnapshot(doc(db, "settings", "general"), (snap) => {
      if (snap.exists()) setSettings(snap.data() as SiteSettings);
    });
    return unsub;
  }, []);
  return settings;
}

export function useBungalows(): Bungalow[] {
  const [bungalows, setBungalows] = useState<Bungalow[]>(fallbackBungalows);
  useEffect(() => {
    const unsub = onSnapshot(collection(db, "bungalows"), (snap) => {
      const saved = snap.docs.reduce<Record<string, Bungalow>>((acc, d) => {
        acc[d.id] = { id: d.id, ...d.data() } as Bungalow;
        return acc;
      }, {});
      // Kaydedilmemiş bungalovlar için varsayılanı kullan, böylece
      // admin henüz hepsini doldurmasa bile sitede 4 ünite görünür.
      const merged = fallbackBungalows
        .map((d) => saved[d.id] ?? d)
        .filter((b) => b.active)
        .sort((a, b) => a.order - b.order);
      setBungalows(merged);
    });
    return unsub;
  }, []);
  return bungalows;
}

export function useFaq(): FaqItem[] {
  const [items, setItems] = useState<FaqItem[]>([]);
  useEffect(() => {
    const unsub = onSnapshot(query(collection(db, "faq"), orderBy("order", "asc")), (snap) => {
      setItems(snap.docs.map((d) => ({ id: d.id, ...d.data() } as FaqItem)));
    });
    return unsub;
  }, []);
  return items;
}
