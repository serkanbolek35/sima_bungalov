import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://simabungalov.com";
  const bungalows = [1, 2, 3, 4].map((n) => ({
    url: `${base}/bungalovlar/bungalow-${n}`,
    lastModified: new Date(),
  }));
  return [{ url: base, lastModified: new Date() }, ...bungalows];
}
