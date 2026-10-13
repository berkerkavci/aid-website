import { Reveal } from "@/components/ui/reveal";
import { SectionIntro } from "@/components/ui/section-intro";
import type { SectionIntro as SectionIntroContent } from "@/content/types";

type ServicesListProps = {
  intro: SectionIntroContent;
  items: string[];
};

/** Centered intro followed by a plain, centered list of services. */
export function ServicesList({ intro, items }: ServicesListProps) {
  return (
    <section
      id="services"
      className="flex flex-col items-center bg-glow-bottom section-x py-15 tablet:py-20"
    >
      <Reveal className="flex w-full flex-col items-center gap-6">
        <SectionIntro {...intro} />
        <ul className="mt-[0.5em] max-w-[720px] text-center type-lead text-ink">
          {items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </Reveal>
    </section>
  );
}
