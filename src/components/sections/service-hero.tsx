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

/**
 * Full-height dark hero. The headline is a template such as "Your {word} Partner":
 * the text before `{word}` and the rotating word share the first line, the text
 * after it goes on the second line (word order differs between languages).
 */
export function ServiceHero({ hero, descriptionClassName }: ServiceHeroProps) {
  const [firstWord = ""] = hero.rotatingWords;
  const [before = "", after = ""] = hero.headline.split("{word}").map((part) => part.trim());

  return (
    // Leaves room for the section bar so it is visible on the first screen.
    <section className="relative isolate flex min-h-[max(calc(100svh_-_var(--subnav-height)),640px)] items-end overflow-hidden bg-hero section-x pb-10 tablet:pb-20">
      <HeroBackground />

      <div className="relative flex w-full flex-col items-start gap-15">
        <div className="flex flex-col items-start gap-6">
          <div className="flex flex-col items-start gap-3">
            <Reveal immediate>
              <Badge variant="glass">{hero.badge}</Badge>
            </Reveal>
            <Reveal immediate delay={0.1}>
              <h1 className="type-display text-white">
                <span className="sr-only">{hero.headline.replace("{word}", firstWord)}</span>
                <span aria-hidden className="flex flex-col">
                  <span className="flex flex-wrap items-center gap-x-5">
                    {before && <span>{before}</span>}
                    <WordTicker words={hero.rotatingWords} />
                  </span>
                  {after && <span>{after}</span>}
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

        <Reveal immediate delay={0.3} className="flex flex-wrap items-center gap-3">
          <ButtonLink href={hero.primaryCta.href} icon="arrow-right">
            {hero.primaryCta.label}
          </ButtonLink>
          {hero.secondaryCta && (
            <ButtonLink href={hero.secondaryCta.href} variant="ghost" icon="arrow-down">
              {hero.secondaryCta.label}
            </ButtonLink>
          )}
        </Reveal>
      </div>
    </section>
  );
}
