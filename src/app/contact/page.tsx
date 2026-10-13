import type { Metadata } from "next";

import { ContactCards } from "@/components/contact/contact-cards";
import { ContactForm } from "@/components/contact/contact-form";
import { PageShell } from "@/components/layout/page-shell";
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
  return (
    <PageShell>
      <div className="h-[300px] bg-white pt-[72px] tablet:h-[560px] tablet:pt-20">
        <iframe
          title="Map — AID office in Warsaw"
          src={contactInfo.mapEmbedUrl}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="size-full border-0"
        />
      </div>

      <section className="flex flex-col items-center gap-15 bg-contact section-x py-15 tablet:py-20 desktop:gap-20">
        <div className="flex w-full flex-col gap-10 desktop:flex-row desktop:items-start">
          <Reveal immediate className="desktop:flex-1">
            <SectionIntro {...content.intro} as="h1" align="left" />
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
