import { ButtonLink } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { SectionIntro } from "@/components/ui/section-intro";
import type { Cta, SectionIntro as SectionIntroContent } from "@/content/types";

type CtaSectionProps = {
  intro: SectionIntroContent;
  button: Cta;
};

/** "Let's Work Together" call-to-action with a soft blue glow. */
export function CtaSection({ intro, button }: CtaSectionProps) {
  return (
    <section className="flex flex-col items-center gap-10 bg-cta section-x pt-10 pb-20 tablet:gap-15 tablet:pt-15 tablet:pb-30">
      <Reveal className="w-full">
        <SectionIntro {...intro} />
      </Reveal>
      <Reveal delay={0.1}>
        <ButtonLink href={button.href} variant="dark">
          {button.label}
        </ButtonLink>
      </Reveal>
    </section>
  );
}
