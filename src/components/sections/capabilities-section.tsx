import { ButtonLink } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { SectionIntro } from "@/components/ui/section-intro";
import type { Cta, ListGroup, SectionIntro as SectionIntroContent } from "@/content/types";

type CapabilitiesSectionProps = {
  intro: SectionIntroContent;
  groups: ListGroup[];
  cta?: Cta;
};

/** Long-form reference lists (standards, specialisations). */
export function CapabilitiesSection({ intro, groups, cta }: CapabilitiesSectionProps) {
  return (
    <section className="flex flex-col items-center gap-10 bg-white section-x pt-10 pb-15 tablet:gap-15 tablet:pt-15 tablet:pb-20">
      <Reveal className="flex w-full flex-col items-center gap-6">
        <SectionIntro {...intro} />
        <div className="w-full max-w-[720px] type-lead text-ink">
          {groups.map((group) => (
            <div key={group.intro}>
              <p>{group.intro}</p>
              <ul>
                {group.items.map((item) => (
                  <li key={item} className="grid grid-cols-[2.2em_1fr]">
                    <span aria-hidden>•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Reveal>

      {cta && (
        <Reveal>
          <ButtonLink href={cta.href} variant="outline" icon="arrow-right">
            {cta.label}
          </ButtonLink>
        </Reveal>
      )}
    </section>
  );
}
