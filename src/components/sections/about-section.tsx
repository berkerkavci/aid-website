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
      className="flex section-fit flex-col items-center section-y bg-white section-x"
    >
      <Reveal className="w-full">
        <SectionIntro {...intro} />
      </Reveal>

      <div className="grid w-full gap-6 desktop:grid-cols-3 desktop:gap-10">
        {features.map((feature, index) => (
          <Reveal key={feature.title} delay={index * 0.1} className="h-full">
            <article className="flex h-full flex-col items-center gap-5 rounded-card border border-line bg-white p-8 text-center short:gap-4 short:p-6">
              <Image
                src={feature.image}
                alt=""
                width={100}
                height={100}
                sizes="100px"
                className="size-20 object-cover desktop:size-[clamp(4rem,8svh,6.25rem)]"
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
