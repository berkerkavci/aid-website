"use client";

import { LayoutGroup, motion } from "motion/react";
import { useRef, type KeyboardEvent } from "react";

import { cn } from "@/lib/utils";

export type SegmentedOption<T extends string> = { value: T; label: string };

type SegmentedControlProps<T extends string> = {
  options: SegmentedOption<T>[];
  value: T;
  /** Omit to render a non-interactive placeholder (e.g. before hydration). */
  onChange?: (value: T) => void;
  /** Accessible name of the control, e.g. "Blog category". */
  label: string;
  /** Unique prefix for element ids. */
  idPrefix: string;
  /** Id of the panel whose content the segments switch. */
  controls: string;
  className?: string;
};

/**
 * Pill-shaped segmented control following the WAI-ARIA "tabs" pattern:
 * arrow keys / Home / End move between segments and the selected thumb
 * slides into place.
 */
export function SegmentedControl<T extends string>({
  options,
  value,
  onChange,
  label,
  idPrefix,
  controls,
  className,
}: SegmentedControlProps<T>) {
  const buttons = useRef<(HTMLButtonElement | null)[]>([]);

  const onKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    const last = options.length - 1;
    const keyTargets: Record<string, number> = {
      ArrowRight: index === last ? 0 : index + 1,
      ArrowLeft: index === 0 ? last : index - 1,
      Home: 0,
      End: last,
    };
    const target = keyTargets[event.key];
    const option = target === undefined ? undefined : options[target];
    if (target === undefined || !option) return;
    event.preventDefault();
    onChange?.(option.value);
    buttons.current[target]?.focus();
  };

  return (
    <LayoutGroup id={idPrefix}>
      <div
        role="tablist"
        aria-label={label}
        className={cn(
          "grid auto-cols-fr grid-flow-col rounded-full border border-line bg-[#f2f3f8] p-1",
          className,
        )}
      >
        {options.map((option, index) => {
          const selected = option.value === value;
          return (
            <button
              key={option.value}
              ref={(element) => {
                buttons.current[index] = element;
              }}
              type="button"
              role="tab"
              id={`${idPrefix}-tab-${option.value}`}
              aria-selected={selected}
              aria-controls={controls}
              tabIndex={selected ? 0 : -1}
              onClick={() => onChange?.(option.value)}
              onKeyDown={(event) => onKeyDown(event, index)}
              className={cn(
                "relative h-11 rounded-full px-6 text-base font-medium whitespace-nowrap outline-offset-2 transition-colors duration-200",
                selected ? "text-ink" : "text-body hover:text-ink",
              )}
            >
              {selected && (
                <motion.span
                  layoutId="segmented-thumb"
                  aria-hidden
                  className="absolute inset-0 rounded-full bg-white shadow-[0_1px_2px_rgb(18_18_18/0.08),0_4px_12px_-2px_rgb(23_40_150/0.14)]"
                  transition={{ type: "spring", bounce: 0.15, duration: 0.45 }}
                />
              )}
              <span className="relative">{option.label}</span>
            </button>
          );
        })}
      </div>
    </LayoutGroup>
  );
}
