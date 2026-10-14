import type { Metadata } from "next";

import { PageShell } from "@/components/layout/page-shell";
import { SectionNav } from "@/components/layout/section-nav";
import { AboutSection } from "@/components/sections/about-section";
import { BlogPreview } from "@/components/sections/blog-preview";
import { CapabilitiesSection } from "@/components/sections/capabilities-section";
import { CtaSection } from "@/components/sections/cta-section";
import { ServiceHero } from "@/components/sections/service-hero";
import { ServicesGrid } from "@/components/sections/services-grid";
import { StatsSection } from "@/components/sections/stats-section";
import { getEngineeringServicesContent } from "@/content/pages/engineering-services";
import { localeAlternates } from "@/i18n/config";
import { getLocale, getMessages } from "@/i18n/server";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const { engineeringServices } = await getMessages(locale);
  return {
    title: engineeringServices.meta.title,
    description: engineeringServices.meta.description,
    alternates: localeAlternates(locale, "/engineering-services"),
  };
}

export default async function EngineeringServicesPage() {
  const { engineeringServices, common } = await getMessages();
  const content = getEngineeringServicesContent(engineeringServices);

  return (
    <PageShell section="engineering" navVariant="transparent">
      <ServiceHero hero={content.hero} descriptionClassName="max-w-[750px]" />
      <SectionNav
        title={content.sectionNav.title}
        links={content.sectionNav.links}
        label={common.nav.onThisPage}
      />
      <AboutSection intro={content.about.intro} features={content.about.features} />
      <StatsSection intro={content.stats.intro} items={content.stats.items} />
      <ServicesGrid intro={content.services.intro} items={content.services.items} columns={3} />
      <CapabilitiesSection
        intro={content.capabilities.intro}
        groups={content.capabilities.groups}
      />
      <BlogPreview
        intro={content.blog.intro}
        division="engineering"
        limit={content.blog.limit}
        background="glow"
      />
      <CtaSection intro={content.cta.intro} button={content.cta.button} />
    </PageShell>
  );
}
