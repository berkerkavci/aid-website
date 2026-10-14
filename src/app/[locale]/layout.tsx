import type { Metadata, Viewport } from "next";

import { JsonLd } from "@/components/json-ld";
import { Providers } from "@/components/providers";
import { ThemeScript } from "@/components/theme/theme-script";
import { contactInfo, siteConfig } from "@/config/site";
import { localeAlternates, localeInfo, locales } from "@/i18n/config";
import { LocaleProvider } from "@/i18n/locale-provider";
import { getLocale, getMessages } from "@/i18n/server";
import { fontVariables } from "@/lib/fonts";
import { getSiteUrl } from "@/lib/utils";

import "../globals.css";

const siteUrl = getSiteUrl();

/** Every language is generated at build time; other first segments are handled by the proxy. */
export const dynamicParams = false;

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const { site } = await getMessages(locale);

  return {
    metadataBase: new URL(siteUrl),
    title: { default: siteConfig.title, template: `%s | ${siteConfig.name}` },
    description: site.description,
    applicationName: siteConfig.name,
    alternates: localeAlternates(locale, "/"),
    openGraph: {
      type: "website",
      siteName: siteConfig.name,
      locale: localeInfo[locale].ogLocale,
      alternateLocale: locales
        .filter((code) => code !== locale)
        .map((code) => localeInfo[code].ogLocale),
      title: siteConfig.title,
      description: site.description,
      images: [{ url: siteConfig.ogImage, width: 1200, height: 630, alt: siteConfig.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: siteConfig.title,
      description: site.description,
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
}

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
  })),
};

export default async function LocaleLayout({ children }: LayoutProps<"/[locale]">) {
  const locale = await getLocale();

  return (
    // The theme script sets data-theme before React loads, hence suppressHydrationWarning.
    <html
      lang={locale}
      dir={localeInfo[locale].dir}
      className={fontVariables}
      data-scroll-behavior="smooth"
      suppressHydrationWarning
    >
      <head>
        <ThemeScript />
      </head>
      <body>
        <LocaleProvider locale={locale}>
          <Providers>{children}</Providers>
        </LocaleProvider>
        <JsonLd data={organizationJsonLd} />
      </body>
    </html>
  );
}
