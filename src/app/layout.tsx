import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";

import { JsonLd } from "@/components/json-ld";
import { Providers } from "@/components/providers";
import { contactInfo, siteConfig } from "@/config/site";
import { fontVariables } from "@/lib/fonts";
import { getSiteUrl } from "@/lib/utils";

import "./globals.css";

const siteUrl = getSiteUrl();

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: siteConfig.title, template: `%s | ${siteConfig.name}` },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  openGraph: {
    type: "website",
    siteName: siteConfig.name,
    locale: siteConfig.locale,
    title: siteConfig.title,
    description: siteConfig.description,
    images: [{ url: siteConfig.ogImage, width: 1200, height: 630, alt: siteConfig.title }],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.title,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
  },
  icons: {
    icon: [
      { url: "/images/favicon-light.png", media: "(prefers-color-scheme: light)" },
      { url: "/images/favicon-dark.png", media: "(prefers-color-scheme: dark)" },
    ],
  },
  robots: { index: true, follow: true, "max-image-preview": "large" },
};

export const viewport: Viewport = {
  themeColor: "#02071a",
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: siteConfig.legalName,
  alternateName: siteConfig.name,
  url: siteUrl,
  logo: `${siteUrl}/images/favicon-light.png`,
  email: contactInfo.emails.it,
  telephone: contactInfo.phones[0],
  address: contactInfo.offices.map((office) => ({
    "@type": "PostalAddress",
    streetAddress: office.address,
    addressLocality: office.city.split(",")[0],
  })),
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={fontVariables} data-scroll-behavior="smooth">
      <body>
        <Providers>{children}</Providers>
        <JsonLd data={organizationJsonLd} />
      </body>
    </html>
  );
}
