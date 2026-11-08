import Image from "next/image";

import { LogoMark } from "@/components/ui/logo";
import { Reveal } from "@/components/ui/reveal";
import { SectionIntro } from "@/components/ui/section-intro";
import type { FeatureCard, SectionIntro as SectionIntroContent } from "@/content/types";
import { getMessages } from "@/i18n/server";

type AboutSectionProps = {
  intro: SectionIntroContent;
  features: FeatureCard[];
};

/** "Explore Us" — intro text, three feature cards with holographic shapes and the logo's meaning. */
export async function AboutSection({ intro, features }: AboutSectionProps) {
  const { site } = await getMessages();

  return (
    <section
      id="about"
      className="flex section-fit flex-col items-center section-y bg-canvas section-x"
    >
      <Reveal className="w-full">
        <SectionIntro {...intro} />
      </Reveal>

      <div className="grid w-full gap-6 desktop:grid-cols-3 desktop:gap-10">
        {features.map((feature, index) => (
          <Reveal key={feature.title} delay={index * 0.1} className="h-full">
            <article className="flex h-full flex-col items-center gap-5 rounded-card border border-line bg-surface p-8 text-center short:gap-4 short:p-6">
              <Image
                src={feature.image}
                alt=""
                width={100}
                height={100}
                sizes="100px"
                className="size-20 object-cover desktop:size-[clamp(4rem,8svh,6.25rem)]"
              />
              <div className="flex flex-col gap-2.5">
                <h3 className="type-h3 text-heading">{feature.title}</h3>
                <p className="type-body text-body">{feature.description}</p>
              </div>
            </article>
          </Reveal>
        ))}
      </div>

      <Reveal
        delay={0.2}
        className="flex flex-col items-center gap-4 text-center tablet:flex-row tablet:gap-6 tablet:text-start"
      >
        <LogoMark className="h-14 w-auto shrink-0" />
        <p className="max-w-[46rem] text-[0.9375rem]/6 text-body">{site.logoStory}</p>
      </Reveal>
    </section>
  );
}
