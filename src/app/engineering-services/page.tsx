import type { Metadata } from "next";

import { PageShell } from "@/components/layout/page-shell";
import { SectionNav } from "@/components/layout/section-nav";
import { AboutSection } from "@/components/sections/about-section";
import { CapabilitiesSection } from "@/components/sections/capabilities-section";
import { CtaSection } from "@/components/sections/cta-section";
import { ServiceHero } from "@/components/sections/service-hero";
import { ServicesGrid } from "@/components/sections/services-grid";
import { StatsSection } from "@/components/sections/stats-section";
import { engineeringServicesContent as content } from "@/content/pages/engineering-services";

export const metadata: Metadata = {
  title: content.meta.title,
  description: content.meta.description,
  alternates: { canonical: "/engineering-services" },
};

export default function EngineeringServicesPage() {
  return (
    <PageShell section="engineering" navVariant="transparent">
      <ServiceHero hero={content.hero} descriptionClassName="max-w-[750px]" />
      <SectionNav title={content.sectionNav.title} links={content.sectionNav.links} />
      <AboutSection intro={content.about.intro} features={content.about.features} />
      <StatsSection intro={content.stats.intro} items={content.stats.items} />
      <ServicesGrid intro={content.services.intro} items={content.services.items} columns={3} />
      <CapabilitiesSection
        intro={content.capabilities.intro}
        groups={content.capabilities.groups}
      />
      <CtaSection intro={content.cta.intro} button={content.cta.button} />
    </PageShell>
  );
}
