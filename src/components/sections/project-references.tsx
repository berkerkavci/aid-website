"use client";

import { motion } from "motion/react";
import { useState } from "react";

import { SegmentedControl } from "@/components/ui/segmented-control";
import type { ProjectColumns, ProjectGroup, ProjectStatus } from "@/content/types";
import { cn } from "@/lib/utils";

const ID_PREFIX = "project-status";
const PANEL_ID = `${ID_PREFIX}-panel`;

/** Columns shared by the header and the project rows. Phones and tablets stack each row. */
const rowGrid =
  "desktop:grid desktop:grid-cols-[minmax(0,1fr)_10rem_minmax(0,24rem)] desktop:gap-x-8";

type ProjectReferencesProps = {
  groups: ProjectGroup[];
  columns: ProjectColumns;
  statusLabel: string;
};

/**
 * Projects of one status at a time, which keeps the list about one screen long.
 * Every group stays in the HTML (hidden when inactive) so all of them can be indexed.
 */
export function ProjectReferences({ groups, columns, statusLabel }: ProjectReferencesProps) {
  const [active, setActive] = useState<ProjectStatus | undefined>(groups[0]?.id);
  if (!active) return null;

  return (
    <div className="flex w-full flex-col items-center gap-8 tablet:gap-10">
      <SegmentedControl
        options={groups.map(({ id, label, projects }) => ({
          value: id,
          label: `${label} (${projects.length})`,
        }))}
        value={active}
        onChange={setActive}
        label={statusLabel}
        idPrefix={ID_PREFIX}
        controls={PANEL_ID}
        className="w-full tablet:w-auto tablet:min-w-[24rem]"
      />

      <div
        id={PANEL_ID}
        role="tabpanel"
        aria-labelledby={`${ID_PREFIX}-tab-${active}`}
        className="w-full rounded-card border border-line bg-surface px-6 py-2 desktop:px-8"
      >
        <div
          aria-hidden
          className={cn(
            "hidden border-b border-line py-3 text-sm/5 font-medium text-body",
            rowGrid,
          )}
        >
          <span>{columns.project}</span>
          <span>{columns.location}</span>
          <span>{columns.endUser}</span>
        </div>

        {groups.map((group) => {
          const isActive = group.id === active;
          return (
            <motion.ul
              key={group.id}
              hidden={!isActive}
              initial={false}
              animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            >
              {group.projects.map((project) => (
                <li
                  key={project.name}
                  className={cn(
                    "flex flex-col gap-1 border-t border-line py-4 first:border-t-0 short:py-3",
                    rowGrid,
                  )}
                >
                  {/* Project and client names stay in English, also on right-to-left pages. */}
                  <p className="text-base/6 font-medium text-ink">
                    <bdi>{project.name}</bdi>
                  </p>
                  <div className="text-sm/5 text-body desktop:contents desktop:text-base/6">
                    <span className="sr-only">{columns.location}: </span>
                    <span>{project.location}</span>
                    <span aria-hidden className="desktop:hidden">
                      {" · "}
                    </span>
                    <span className="sr-only">{columns.endUser}: </span>
                    <bdi>{project.endUser}</bdi>
                  </div>
                </li>
              ))}
            </motion.ul>
          );
        })}
      </div>
    </div>
  );
}
