import type { MetadataRoute } from "next";

import { berita } from "@/lib/content/berita";
import { site } from "@/lib/site";

/** Peta rute untuk sitemap.xml. */
export default function sitemap(): MetadataRoute.Sitemap {
  const base = site.url;
  const tanggalTerbaru = berita[0]?.tanggalIso;

  return [
    {
      url: base,
      lastModified: tanggalTerbaru,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${base}/berita`,
      lastModified: tanggalTerbaru,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    ...berita.map((item) => ({
      url: `${base}/berita/${item.slug}`,
      lastModified: item.tanggalIso,
      changeFrequency: "yearly" as const,
      priority: 0.6,
    })),
  ];
}