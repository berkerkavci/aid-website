import { Reveal } from "@/components/ui/reveal";
import { SectionIntro } from "@/components/ui/section-intro";
import type { SectionIntro as SectionIntroContent, Stat } from "@/content/types";

type StatsSectionProps = {
  intro: SectionIntroContent;
  items: Stat[];
};

/** Dark "Solutions Without Borders" band with key figures. */
export function StatsSection({ intro, items }: StatsSectionProps) {
  return (
    <section className="flex flex-col items-center section-y bg-stats section-x">
      <Reveal className="w-full">
        <SectionIntro {...intro} tone="dark" />
      </Reveal>

      <Reveal className="w-full">
        <dl className="flex w-full flex-col items-center tablet:flex-row tablet:items-stretch tablet:justify-center">
          {items.map((stat) => (
            <div
              key={stat.label}
              className="flex w-full flex-1 flex-col items-center gap-2.5 border-line-stat text-center text-white not-first:border-t not-first:pt-10 not-last:pb-10 tablet:py-0! tablet:not-first:border-s tablet:not-first:border-t-0"
            >
              <dt className="order-2 max-w-60 font-inter text-lg/7">{stat.label}</dt>
              <dd className="order-1 type-stat">{stat.value}</dd>
            </div>
          ))}
        </dl>
      </Reveal>
    </section>
  );
}
