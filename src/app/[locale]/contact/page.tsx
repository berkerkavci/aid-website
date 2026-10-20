import type { Metadata } from "next";
import Image from "next/image";

import { ContactCards } from "@/components/contact/contact-cards";
import { ContactForm } from "@/components/contact/contact-form";
import { MapEmbed } from "@/components/contact/map-embed";
import { PageShell } from "@/components/layout/page-shell";
import { Icon } from "@/components/ui/icon";
import { Reveal } from "@/components/ui/reveal";
import { SectionIntro } from "@/components/ui/section-intro";
import { contactInfo } from "@/config/site";
import { getContactContent } from "@/content/pages/contact";
import { localeAlternates } from "@/i18n/config";
import { getLocale, getMessages } from "@/i18n/server";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const { contact } = await getMessages(locale);
  return {
    title: contact.meta.title,
    description: contact.meta.description,
    alternates: localeAlternates(locale, "/contact"),
  };
}

export default async function ContactPage() {
  const content = getContactContent((await getMessages()).contact);
  const [warsaw] = contactInfo.offices;

  return (
    <PageShell>
      <div className="h-[372px] bg-canvas pt-[72px] tablet:h-[560px] tablet:pt-20">
        <MapEmbed
          src={contactInfo.mapEmbedUrl}
          address={warsaw?.address ?? ""}
          texts={content.map}
        />
      </div>

      <section className="flex flex-col items-center gap-15 bg-contact section-x py-15 tablet:py-20 desktop:gap-20">
        {/*
          Phone: intro → form → photo (the heading and form stay near the top).
          Desktop: photo above the intro on the left, the form spans both rows on the
          right. The photo takes the free height, so it starts level with the top of the
          form and the intro ends level with its bottom.
        */}
        <div className="grid w-full gap-10 desktop:grid-cols-2 desktop:grid-rows-[1fr_auto] desktop:gap-y-8">
          <Reveal immediate className="flex flex-col gap-6 desktop:col-start-1 desktop:row-start-2">
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
            className="rounded-card border border-line bg-surface p-6 tablet:p-10 desktop:col-start-2 desktop:row-span-2 desktop:row-start-1"
          >
            <ContactForm texts={content.form} />
          </Reveal>

          <Reveal
            immediate
            delay={0.2}
            className="desktop:col-start-1 desktop:row-start-1 desktop:flex desktop:flex-col"
          >
            <figure className="relative aspect-[4/3] overflow-hidden rounded-card border border-line tablet:aspect-[16/9] desktop:aspect-auto desktop:min-h-72 desktop:flex-1">
              <Image
                src={content.photo.src}
                alt={content.photo.alt}
                fill
                sizes="(min-width: 1200px) 45vw, 100vw"
                // Keeps both faces in frame at every aspect ratio.
                className="object-cover object-[45%_22%]"
              />
              <figcaption className="absolute start-4 bottom-4 inline-flex items-center gap-1.5 rounded-full bg-black/45 px-3 py-1.5 text-sm font-medium text-white backdrop-blur-md">
                <Icon name="map-pin" weight="bold" className="size-4" />
                {content.photo.caption}
              </figcaption>
            </figure>
          </Reveal>
        </div>

        <ContactCards />
      </section>
    </PageShell>
  );
}
