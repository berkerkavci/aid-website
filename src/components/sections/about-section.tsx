import Image from "next/image";

import { Reveal } from "@/components/ui/reveal";
import { SectionIntro } from "@/components/ui/section-intro";
import type { FeatureCard, SectionIntro as SectionIntroContent } from "@/content/types";

type AboutSectionProps = {
  intro: SectionIntroContent;
  features: FeatureCard[];
};

/** "Explore Us" — intro text and three feature cards with holographic shapes. */
export function AboutSection({ intro, features }: AboutSectionProps) {
  return (
    <section
      id="about"
      className="flex flex-col items-center gap-10 bg-white section-x pt-10 pb-15 tablet:gap-15 tablet:pt-15 tablet:pb-20"
    >
      <Reveal className="w-full">
        <SectionIntro {...intro} />
      </Reveal>

      <div className="flex w-full flex-col gap-10 desktop:flex-row">
        {features.map((feature, index) => (
          <Reveal key={feature.title} delay={index * 0.1} className="desktop:flex-1">
            <article className="flex h-full flex-col items-center gap-8 rounded-card border border-line bg-white p-8 text-center tablet:p-10">
              <Image
                src={feature.image}
                alt=""
                width={100}
                height={100}
                sizes="100px"
                className="size-[100px] object-cover"
              />
              <div className="flex flex-col gap-2.5">
                <h3 className="type-h3 text-black">{feature.title}</h3>
                <p className="type-body text-body">{feature.description}</p>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
