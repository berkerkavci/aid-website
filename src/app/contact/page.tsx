import type { Metadata } from "next";

import { ContactCards } from "@/components/contact/contact-cards";
import { ContactForm } from "@/components/contact/contact-form";
import { MapEmbed } from "@/components/contact/map-embed";
import { PageShell } from "@/components/layout/page-shell";
import { Icon } from "@/components/ui/icon";
import { Reveal } from "@/components/ui/reveal";
import { SectionIntro } from "@/components/ui/section-intro";
import { contactInfo } from "@/config/site";
import { contactContent as content } from "@/content/pages/contact";

export const metadata: Metadata = {
  title: content.meta.title,
  description: content.meta.description,
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  const [warsaw] = contactInfo.offices;

  return (
    <PageShell>
      <div className="h-[372px] bg-white pt-[72px] tablet:h-[560px] tablet:pt-20">
        <MapEmbed
          src={contactInfo.mapEmbedUrl}
          title="Map — AID office in Warsaw"
          address={warsaw.address}
        />
      </div>

      <section className="flex flex-col items-center gap-15 bg-contact section-x py-15 tablet:py-20 desktop:gap-20">
        <div className="flex w-full flex-col gap-10 desktop:flex-row desktop:items-start">
          <Reveal immediate className="flex flex-col gap-6 desktop:flex-1">
            <SectionIntro {...content.intro} as="h1" align="left" />
            <p className="flex items-center gap-2.5 type-body font-medium text-ink">
              <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-tint-green">
                <Icon name="clock" weight="bold" className="size-4" />
              </span>
              {content.responseTime}
            </p>
          </Reveal>
          <Reveal
            immediate
            delay={0.1}
            className="rounded-card border border-line bg-white p-6 tablet:p-10 desktop:flex-1"
          >
            <ContactForm />
          </Reveal>
        </div>

        <ContactCards />
      </section>
    </PageShell>
  );
}
