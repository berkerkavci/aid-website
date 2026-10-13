import { ButtonLink } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { SectionIntro } from "@/components/ui/section-intro";
import type { Cta, SectionIntro as SectionIntroContent } from "@/content/types";

type CtaSectionProps = {
  intro: SectionIntroContent;
  button: Cta;
  /** Anchor id used by the section bar. */
  id?: string;
};

/** "Let's Work Together" call-to-action with a soft blue glow. */
export function CtaSection({ intro, button, id = "contact" }: CtaSectionProps) {
  return (
    <section id={id} className="flex section-fit flex-col items-center section-y bg-cta section-x">
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
