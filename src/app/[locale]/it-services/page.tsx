import type { Metadata } from "next";

import { PageShell } from "@/components/layout/page-shell";
import { SectionNav } from "@/components/layout/section-nav";
import { AboutSection } from "@/components/sections/about-section";
import { BlogPreview } from "@/components/sections/blog-preview";
import { CtaSection } from "@/components/sections/cta-section";
import { PartnerMarquee } from "@/components/sections/partner-marquee";
import { ServiceHero } from "@/components/sections/service-hero";
import { ServicesGrid } from "@/components/sections/services-grid";
import { StatsSection } from "@/components/sections/stats-section";
import { getItServicesContent } from "@/content/pages/it-services";
import { localeAlternates } from "@/i18n/config";
import { getLocale, getMessages } from "@/i18n/server";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const { itServices } = await getMessages(locale);
  return {
    title: itServices.meta.title,
    description: itServices.meta.description,
    alternates: localeAlternates(locale, "/it-services"),
  };
}

export default async function ItServicesPage() {
  const { itServices, common } = await getMessages();
  const content = getItServicesContent(itServices);

  return (
    <PageShell section="it" navVariant="transparent">
      <ServiceHero hero={content.hero} />
      <SectionNav
        title={content.sectionNav.title}
        links={content.sectionNav.links}
        label={common.nav.onThisPage}
      />
      <PartnerMarquee title={content.partnersTitle} logos={content.partners} />
      <AboutSection intro={content.about.intro} features={content.about.features} />
      <StatsSection intro={content.stats.intro} items={content.stats.items} />
      <ServicesGrid intro={content.services.intro} items={content.services.items} />
      <BlogPreview intro={content.blog.intro} division="it" limit={content.blog.limit} />
      <CtaSection intro={content.cta.intro} button={content.cta.button} />
    </PageShell>
  );
}
