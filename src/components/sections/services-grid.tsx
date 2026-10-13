import { Icon } from "@/components/ui/icon";
import { Reveal } from "@/components/ui/reveal";
import { SectionIntro } from "@/components/ui/section-intro";
import type { IconTint, SectionIntro as SectionIntroContent, ServiceCard } from "@/content/types";
import { cn } from "@/lib/utils";

const tints: Record<IconTint, string> = {
  blue: "bg-tint-blue",
  pink: "bg-tint-pink",
  yellow: "bg-tint-yellow",
  green: "bg-tint-green",
};

type ServicesGridProps = {
  intro: SectionIntroContent;
  items: ServiceCard[];
};

/** Two-column grid of service cards with tinted icons. */
export function ServicesGrid({ intro, items }: ServicesGridProps) {
  return (
    <section
      id="services"
      className="flex flex-col items-center gap-10 bg-glow-bottom section-x py-15 tablet:gap-15 tablet:py-20"
    >
      <Reveal className="w-full">
        <SectionIntro {...intro} />
      </Reveal>

      <div className="grid w-full gap-10 tablet:grid-cols-2">
        {items.map((service, index) => (
          <Reveal key={service.title} delay={(index % 2) * 0.1} className="h-full">
            <article className="flex h-full flex-col items-start gap-8 rounded-card border border-line bg-white p-8 tablet:p-10">
              <span
                className={cn(
                  "flex size-14 shrink-0 items-center justify-center rounded-field",
                  tints[service.tint],
                )}
              >
                <Icon name={service.icon} weight="light" className="size-8 text-black" />
              </span>
              <div className="flex flex-col gap-2.5">
                <h3 className="type-h3 text-ink">{service.title}</h3>
                <p className="type-body font-medium text-body opacity-80">{service.description}</p>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
