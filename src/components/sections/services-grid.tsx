import { Icon, iconTintClass } from "@/components/ui/icon";
import { Reveal } from "@/components/ui/reveal";
import { SectionIntro } from "@/components/ui/section-intro";
import type { SectionIntro as SectionIntroContent, ServiceCard } from "@/content/types";
import { cn } from "@/lib/utils";

type ServicesGridProps = {
  intro: SectionIntroContent;
  items: ServiceCard[];
  /** Number of columns on desktop. */
  columns?: 2 | 3;
};

/**
 * Grid of service cards with tinted icons. Cards with a description put the
 * icon beside the text (tablet and up); cards without one render compactly.
 */
export function ServicesGrid({ intro, items, columns = 2 }: ServicesGridProps) {
  return (
    <section
      id="services"
      className="flex section-fit flex-col items-center section-y bg-glow-bottom section-x"
    >
      <Reveal className="w-full">
        <SectionIntro {...intro} />
      </Reveal>

      <div
        className={cn(
          "grid w-full gap-6 tablet:grid-cols-2",
          columns === 3 && "desktop:grid-cols-3",
        )}
      >
        {items.map((service, index) => (
          <Reveal key={service.title} delay={(index % columns) * 0.1} className="h-full">
            <article
              className={cn(
                "flex h-full rounded-card border border-line bg-surface",
                service.description
                  ? "flex-col items-start gap-5 p-7 tablet:flex-row tablet:gap-6 short:p-6"
                  : "items-center gap-5 p-5 short:gap-4 short:p-4",
              )}
            >
              <span
                className={cn(
                  "flex size-14 shrink-0 items-center justify-center rounded-field short:size-12",
                  iconTintClass[service.tint],
                )}
              >
                <Icon name={service.icon} weight="light" className="size-8 text-ink" />
              </span>
              <div className="flex flex-col gap-2">
                <h3 className="type-h3 text-ink">{service.title}</h3>
                {service.description && (
                  <p className="type-body font-medium text-body opacity-80">
                    {service.description}
                  </p>
                )}
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
