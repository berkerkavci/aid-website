import type { Metadata } from "next";

import { Badge } from "@/components/ui/badge";
import { ButtonLink } from "@/components/ui/button";
import { HeroBackground } from "@/components/ui/hero-background";
import { Logo } from "@/components/ui/logo";
import { Reveal } from "@/components/ui/reveal";
import { homeContent } from "@/content/pages/home";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

/** Landing page: lets visitors choose between the two business lines. */
export default function HomePage() {
  const [software, engineering] = homeContent.columns;

  return (
    <main className="relative isolate flex min-h-svh items-center justify-center overflow-hidden bg-hero section-x py-20">
      <HeroBackground />

      <div className="relative flex w-full flex-col items-center gap-15">
        <Reveal immediate className="flex flex-col items-center gap-[22px] text-center text-white">
          <Logo tone="white" className="h-[42px] w-[120px]" />
          <h1 className="type-h1">{homeContent.title}</h1>
          <p className="type-lead">{homeContent.subtitle}</p>
        </Reveal>

        <div className="flex w-full flex-col items-center gap-10 desktop:flex-row desktop:items-start desktop:justify-center desktop:gap-3">
          {software && <ServiceColumn column={software} delay={0.15} />}
          <Reveal
            immediate
            delay={0.25}
            aria-hidden
            className="h-px w-full shrink-0 bg-white/50 desktop:h-[270px] desktop:w-px"
          />
          {engineering && <ServiceColumn column={engineering} delay={0.3} />}
        </div>
      </div>
    </main>
  );
}

function ServiceColumn({
  column,
  delay,
}: {
  column: (typeof homeContent.columns)[number];
  delay: number;
}) {
  return (
    <Reveal
      immediate
      delay={delay}
      className="flex w-full flex-1 flex-col items-center gap-10 text-center"
    >
      <Badge variant="glass">{column.badge}</Badge>
      <p className="max-w-[520px] type-lead text-white">{column.description}</p>
      <ButtonLink href={column.cta.href} icon="arrow-right">
        {column.cta.label}
      </ButtonLink>
    </Reveal>
  );
}
