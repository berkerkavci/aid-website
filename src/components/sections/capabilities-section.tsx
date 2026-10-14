import { Icon } from "@/components/ui/icon";
import { Reveal } from "@/components/ui/reveal";
import { SectionIntro } from "@/components/ui/section-intro";
import type { ListGroup, SectionIntro as SectionIntroContent } from "@/content/types";

type CapabilitiesSectionProps = {
  intro: SectionIntroContent;
  groups: ListGroup[];
};

/** Reference lists (standards, specialisations) as side-by-side checklist cards. */
export function CapabilitiesSection({ intro, groups }: CapabilitiesSectionProps) {
  return (
    <section
      id="capabilities"
      className="flex section-fit flex-col items-center section-y bg-canvas section-x"
    >
      <Reveal className="w-full">
        <SectionIntro {...intro} />
      </Reveal>

      <div className="grid w-full items-stretch gap-6 desktop:grid-cols-2 desktop:gap-10">
        {groups.map((group, index) => (
          <Reveal key={group.title} delay={index * 0.1} className="h-full">
            <article className="flex h-full flex-col gap-5 rounded-card border border-line bg-surface p-7 tablet:p-8 short:gap-4 short:p-6">
              <div className="flex flex-col gap-2">
                <h3 className="type-h3 text-ink">{group.title}</h3>
                <p className="type-body text-body">{group.intro}</p>
              </div>
              <ul className="grid gap-x-6 gap-y-2.5 tablet:grid-cols-2 short:gap-y-2">
                {group.items.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2.5 text-base/6 text-ink short:text-[0.9375rem]/[1.35]"
                  >
                    <Icon
                      name="check-circle"
                      weight="fill"
                      className="mt-0.5 size-5 shrink-0 text-brand"
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
