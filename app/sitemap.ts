import type { MetadataRoute } from "next";
import { projects } from "@/lib/content";
export default function sitemap(): MetadataRoute.Sitemap {
  return ["", ...projects.map((p) => `/work/${p.slug}`)].map((path) => ({
    url: `https://sambhavcodes.in${path}`,
    lastModified: new Date("2026-10-18"),
    changeFrequency: "monthly",
    priority: path ? 0.7 : 1,
  }));
}
