import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://nasahunch.no",
      lastModified: new Date(),
    },
  ];
}
