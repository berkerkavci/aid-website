import { Badge } from "@/components/ui/badge";
import { ButtonLink } from "@/components/ui/button";
import { HeroBackground } from "@/components/ui/hero-background";
import { Reveal } from "@/components/ui/reveal";
import { WordTicker } from "@/components/ui/word-ticker";
import type { HeroContent } from "@/content/types";
import { cn } from "@/lib/utils";

type ServiceHeroProps = {
  hero: HeroContent;
  descriptionClassName?: string;
};

/** Full-height dark hero: "Your <rotating word> Partner". */
export function ServiceHero({ hero, descriptionClassName }: ServiceHeroProps) {
  const [firstWord = ""] = hero.rotatingWords;

  return (
    <section className="relative isolate flex min-h-[max(100svh,640px)] items-end overflow-hidden bg-hero section-x pb-10 tablet:pb-20">
      <HeroBackground />

      <div className="relative flex w-full flex-col items-start gap-15">
        <div className="flex flex-col items-start gap-6">
          <div className="flex flex-col items-start gap-3">
            <Reveal immediate>
              <Badge variant="glass">{hero.badge}</Badge>
            </Reveal>
            <Reveal immediate delay={0.1}>
              <h1 className="type-display text-white">
                <span className="sr-only">{`Your ${firstWord} Partner`}</span>
                <span aria-hidden className="flex flex-col">
                  <span className="flex flex-wrap items-center gap-x-5">
                    <span>Your</span>
                    <WordTicker words={hero.rotatingWords} />
                  </span>
                  <span>Partner</span>
                </span>
              </h1>
            </Reveal>
          </div>
          <Reveal immediate delay={0.2}>
            <p className={cn("max-w-[520px] type-lead text-white", descriptionClassName)}>
              {hero.description}
            </p>
          </Reveal>
        </div>

        <Reveal immediate delay={0.3}>
          <ButtonLink href={hero.cta.href} icon="arrow-down">
            {hero.cta.label}
          </ButtonLink>
        </Reveal>
      </div>
    </section>
  );
}
