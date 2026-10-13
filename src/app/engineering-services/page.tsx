import type { Metadata } from "next";

import { PageShell } from "@/components/layout/page-shell";
import { AboutSection } from "@/components/sections/about-section";
import { CapabilitiesSection } from "@/components/sections/capabilities-section";
import { CtaSection } from "@/components/sections/cta-section";
import { ServiceHero } from "@/components/sections/service-hero";
import { ServicesList } from "@/components/sections/services-list";
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
      <AboutSection intro={content.about.intro} features={content.about.features} />
      <StatsSection intro={content.stats.intro} items={content.stats.items} />
      <ServicesList intro={content.services.intro} items={content.services.items} />
      <CapabilitiesSection
        intro={content.capabilities.intro}
        groups={content.capabilities.groups}
        cta={content.capabilities.cta}
      />
      <CtaSection intro={content.cta.intro} button={content.cta.button} />
    </PageShell>
  );
}
