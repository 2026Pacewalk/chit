import type { MetadataRoute } from "next";
import { allCollections, allProducts } from "@/lib/catalog";
import { policyPages, blogArticle } from "@/data/pages";
import { site } from "@/data/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = site.domain;
  return [
    { url: base, priority: 1 },
    { url: `${base}/collections`, priority: 0.8 },
    ...allCollections.map((c) => ({
      url: `${base}/collections/${c.handle}`,
      priority: 0.7,
    })),
    ...allProducts.map((p) => ({
      url: `${base}/products/${p.handle}`,
      priority: 0.6,
    })),
    { url: `${base}/pages/about-us`, priority: 0.5 },
    { url: `${base}/pages/contact`, priority: 0.5 },
    ...policyPages.map((p) => ({
      url: `${base}/pages/${p.slug}`,
      priority: 0.3,
    })),
    { url: `${base}/blogs/news`, priority: 0.5 },
    { url: `${base}/blogs/${blogArticle.blog}/${blogArticle.slug}`, priority: 0.5 },
  ];
}
