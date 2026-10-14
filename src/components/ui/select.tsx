"use client";

import { CaretDown, Check } from "@phosphor-icons/react/ssr";
import { useEffect, useRef, useState, type KeyboardEvent, type ReactNode } from "react";

import { cn } from "@/lib/utils";

export type SelectOption<T extends string> = {
  value: T;
  label: string;
  /** Secondary line shown in the open list. */
  description?: string;
  /** Leading visual (e.g. a tinted icon), shown in the list and in the closed field. */
  icon?: ReactNode;
};

type SelectProps<T extends string> = {
  id: string;
  /** Form field name — the value is submitted through a hidden input. */
  name: string;
  label: string;
  placeholder: string;
  options: readonly SelectOption<T>[];
  value: T | null;
  onChange: (value: T) => void;
  required?: boolean;
  error?: string;
  /** Classes for the closed field, so it matches the surrounding inputs. */
  triggerClassName?: string;
};

/**
 * Styled dropdown that follows the WAI-ARIA "select-only combobox" pattern
 * (https://www.w3.org/WAI/ARIA/apg/patterns/combobox/examples/combobox-select-only/):
 * focus stays on the field, arrow keys move through the options, Enter / Space
 * picks one, Escape closes and typing a letter jumps to the matching option.
 */
export function Select<T extends string>({
  id,
  name,
  label,
  placeholder,
  options,
  value,
  onChange,
  required,
  error,
  triggerClassName,
}: SelectProps<T>) {
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const rootRef = useRef<HTMLDivElement>(null);
  const comboboxRef = useRef<HTMLDivElement>(null);
  const search = useRef({ text: "", time: 0 });

  const labelId = `${id}-label`;
  const listboxId = `${id}-listbox`;
  const errorId = `${id}-error`;
  const optionId = (index: number) => `${id}-option-${index}`;
  const selectedIndex = options.findIndex((option) => option.value === value);
  const selected = options[selectedIndex];
  const lastIndex = options.length - 1;

  // Close when the visitor clicks or taps anywhere outside the field.
  useEffect(() => {
    if (!open) return;
    function onPointerDown(event: PointerEvent) {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    }
    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, [open]);

  function show(index = Math.max(selectedIndex, 0)) {
    setActiveIndex(index);
    setOpen(true);
  }

  function choose(index: number) {
    const option = options[index];
    if (option) onChange(option.value);
    setOpen(false);
  }

  /** Index of the next option whose label starts with the typed text. */
  function matchTyped(key: string) {
    const now = Date.now();
    search.current.text = (now - search.current.time > 600 ? "" : search.current.text) + key;
    search.current.time = now;
    const text = search.current.text.toLowerCase();
    const start = open ? activeIndex : Math.max(selectedIndex, 0);
    const ordered = [...options.slice(start + 1), ...options.slice(0, start + 1)];
    const match = ordered.find((option) => option.label.toLowerCase().startsWith(text));
    return match ? options.indexOf(match) : -1;
  }

  function onKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    const { key, altKey, ctrlKey, metaKey } = event;

    if (!open) {
      if (["ArrowDown", "ArrowUp", "Enter", " "].includes(key)) {
        event.preventDefault();
        show();
      } else if (key === "Home" || key === "End") {
        event.preventDefault();
        show(key === "Home" ? 0 : lastIndex);
      }
    } else if (key === "ArrowDown" || key === "ArrowUp") {
      event.preventDefault();
      if (altKey) choose(activeIndex);
      else if (key === "ArrowDown") setActiveIndex((index) => Math.min(index + 1, lastIndex));
      else setActiveIndex((index) => Math.max(index - 1, 0));
    } else if (key === "Home" || key === "End") {
      event.preventDefault();
      setActiveIndex(key === "Home" ? 0 : lastIndex);
    } else if (key === "Enter" || key === " ") {
      event.preventDefault();
      choose(activeIndex);
    } else if (key === "Escape") {
      event.preventDefault();
      setOpen(false);
    } else if (key === "Tab") {
      choose(activeIndex);
    }

    if (key.length === 1 && key !== " " && !altKey && !ctrlKey && !metaKey) {
      const match = matchTyped(key);
      if (match >= 0) show(match);
    }
  }

  return (
    <div ref={rootRef} className="relative flex flex-col gap-2.5">
      {/* A <label> can't point at a non-form element, so focus the field on click instead. */}
      <span
        id={labelId}
        className="type-badge text-label"
        onClick={() => comboboxRef.current?.focus()}
      >
        {label}
      </span>

      <div
        ref={comboboxRef}
        id={id}
        role="combobox"
        tabIndex={0}
        aria-labelledby={labelId}
        aria-haspopup="listbox"
        aria-controls={listboxId}
        aria-expanded={open}
        aria-activedescendant={open ? optionId(activeIndex) : undefined}
        aria-required={required || undefined}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? errorId : undefined}
        onClick={() => (open ? setOpen(false) : show())}
        onKeyDown={onKeyDown}
        onBlur={() => setOpen(false)}
        className={cn(
          triggerClassName,
          "flex cursor-pointer items-center gap-3 select-none",
          open && "border-brand/40 ring-3 ring-brand/10",
        )}
      >
        {selected ? (
          <>
            {selected.icon && <span className="-my-1 flex shrink-0">{selected.icon}</span>}
            <span className="min-w-0 truncate">{selected.label}</span>
          </>
        ) : (
          <span className="min-w-0 truncate text-placeholder">{placeholder}</span>
        )}
        <CaretDown
          weight="bold"
          aria-hidden
          className={cn(
            "ml-auto size-4 shrink-0 text-body transition-transform duration-200 motion-reduce:transition-none",
            open && "rotate-180",
          )}
        />
      </div>

      <ul
        id={listboxId}
        role="listbox"
        aria-labelledby={labelId}
        tabIndex={-1}
        // Keep focus on the combobox while an option is clicked.
        onMouseDown={(event) => event.preventDefault()}
        className={cn(
          "absolute inset-x-0 top-full z-20 mt-2 flex-col gap-1 rounded-field border border-line bg-white p-1.5 shadow-dropdown",
          "origin-top animate-dropdown-in motion-reduce:animate-none",
          open ? "flex" : "hidden",
        )}
      >
        {options.map((option, index) => {
          const isSelected = index === selectedIndex;
          return (
            <li
              key={option.value}
              id={optionId(index)}
              role="option"
              aria-selected={isSelected}
              onMouseMove={() => setActiveIndex(index)}
              onClick={() => choose(index)}
              className={cn(
                "flex cursor-pointer items-center gap-3 rounded-[0.5rem] p-2.5 transition-colors",
                index === activeIndex && "bg-brand/[0.06]",
              )}
            >
              {option.icon && <span className="flex shrink-0">{option.icon}</span>}
              <span className="flex min-w-0 flex-col gap-0.5">
                <span className="font-inter text-sm/[1.2] font-medium text-ink">
                  {option.label}
                </span>
                {option.description && (
                  <span className="font-inter text-xs/[1.3] text-body">{option.description}</span>
                )}
              </span>
              <Check
                weight="bold"
                aria-hidden
                className={cn("ml-auto size-4 shrink-0 text-brand", !isSelected && "invisible")}
              />
            </li>
          );
        })}
      </ul>

      <input type="hidden" name={name} value={value ?? ""} />

      {error && (
        <p id={errorId} className="text-sm text-red-600">
          {error}
        </p>
      )}
    </div>
  );
}
