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
import { itServicesContent as content } from "@/content/pages/it-services";

export const metadata: Metadata = {
  title: content.meta.title,
  description: content.meta.description,
  alternates: { canonical: "/it-services" },
};

export default function ItServicesPage() {
  return (
    <PageShell section="it" navVariant="transparent">
      <ServiceHero hero={content.hero} />
      <SectionNav title={content.sectionNav.title} links={content.sectionNav.links} />
      <PartnerMarquee title={content.partnersTitle} logos={content.partners} />
      <AboutSection intro={content.about.intro} features={content.about.features} />
      <StatsSection intro={content.stats.intro} items={content.stats.items} />
      <ServicesGrid intro={content.services.intro} items={content.services.items} />
      <BlogPreview intro={content.blog.intro} division="it" limit={content.blog.limit} />
      <CtaSection intro={content.cta.intro} button={content.cta.button} />
    </PageShell>
  );
}
