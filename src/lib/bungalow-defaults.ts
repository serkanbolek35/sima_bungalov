import type { Bungalow } from "./types";

export const defaultBungalows: Bungalow[] = [1, 2, 3, 4].map((n) => ({
  id: `bungalow-${n}`,
  number: n,
  name: `Bungalov ${n}`,
  price: 0,
  maxGuests: 4,
  description: "",
  active: true,
  order: n,
}));

/**
 * Firestore'da henüz kaydedilmemiş bungalovlar için varsayılanı kullanır,
 * böylece admin henüz hepsini doldurmasa bile her yerde 4 ünite görünür.
 */
export function mergeBungalows(saved: Bungalow[]): Bungalow[] {
  const byId = saved.reduce<Record<string, Bungalow>>((acc, b) => {
    acc[b.id] = b;
    return acc;
  }, {});
  return defaultBungalows
    .map((d) => byId[d.id] ?? d)
    .sort((a, b) => a.order - b.order);
}
