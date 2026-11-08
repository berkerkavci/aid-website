import { ProjectReferences } from "@/components/sections/project-references";
import { Reveal } from "@/components/ui/reveal";
import { SectionIntro } from "@/components/ui/section-intro";
import type {
  ProjectColumns,
  ProjectGroup,
  SectionIntro as SectionIntroContent,
} from "@/content/types";

type ReferencesSectionProps = {
  intro: SectionIntroContent;
  groups: ProjectGroup[];
  columns: ProjectColumns;
  /** Accessible name of the status switch, e.g. "Project status". */
  statusLabel: string;
};

/** Project reference list: proof of the systems and standards listed above it. */
export function ReferencesSection({ intro, groups, columns, statusLabel }: ReferencesSectionProps) {
  return (
    <section
      id="references"
      className="flex section-fit flex-col items-center section-y bg-surface-muted section-x"
    >
      <Reveal className="w-full">
        <SectionIntro {...intro} />
      </Reveal>

      {/* A low threshold: on phones the list is taller than the screen. */}
      <Reveal delay={0.1} viewport={{ once: true, amount: 0.05 }} className="w-full">
        <ProjectReferences groups={groups} columns={columns} statusLabel={statusLabel} />
      </Reveal>
    </section>
  );
}
