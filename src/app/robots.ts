import type { MetadataRoute } from "next";

import { getSiteUrl } from "@/lib/utils";

export default function robots(): MetadataRoute.Robots {
  const siteUrl = getSiteUrl();
  // Only the production deployment should be indexed — not Vercel preview URLs.
  const isProduction = process.env.VERCEL_ENV ? process.env.VERCEL_ENV === "production" : true;

  return {
    rules: isProduction ? { userAgent: "*", allow: "/" } : { userAgent: "*", disallow: "/" },
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
