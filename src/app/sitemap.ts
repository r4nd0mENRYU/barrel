import type { MetadataRoute } from "next";
import { posts } from "@/lib/posts";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_SITE_URL || "https://barrel-energy.vercel.app";
  return [
    { url: base, lastModified: new Date(), priority: 1.0 },
    { url: `${base}/about`, lastModified: new Date(), priority: 0.7 },
    ...posts.map((p) => ({
      url: `${base}/posts/${p.slug}`,
      lastModified: new Date(p.publishedAt),
      priority: 0.9,
    })),
  ];
}
