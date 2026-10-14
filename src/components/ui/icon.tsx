import type { IconProps } from "@phosphor-icons/react";
import {
  BellSimple,
  Buildings,
  Calculator,
  CheckCircle,
  ClipboardText,
  Clock,
  Cpu,
  Cube,
  EnvelopeSimple,
  FileText,
  Files,
  FireExtinguisher,
  Gear,
  MagnifyingGlass,
  MapPin,
  Phone,
  Robot,
  Ruler,
  UserSwitch,
  Wrench,
} from "@phosphor-icons/react/ssr";
import type { ComponentType } from "react";

import type { IconName, IconTint } from "@/content/types";

/** Background classes for the soft colored tile behind an icon. */
export const iconTintClass: Record<IconTint, string> = {
  blue: "bg-tint-blue",
  pink: "bg-tint-pink",
  yellow: "bg-tint-yellow",
  green: "bg-tint-green",
};

/**
 * Maps the icon names used in content files to Phosphor icons
 * (https://phosphoricons.com). Add a new entry here to make an icon
 * available to content files.
 */
const icons: Record<IconName, ComponentType<IconProps>> = {
  robot: Robot,
  bell: BellSimple,
  gear: Gear,
  "user-switch": UserSwitch,
  envelope: EnvelopeSimple,
  phone: Phone,
  "map-pin": MapPin,
  clock: Clock,
  "check-circle": CheckCircle,
  clipboard: ClipboardText,
  cube: Cube,
  ruler: Ruler,
  calculator: Calculator,
  "file-text": FileText,
  files: Files,
  "magnifying-glass": MagnifyingGlass,
  wrench: Wrench,
  "fire-extinguisher": FireExtinguisher,
  cpu: Cpu,
  buildings: Buildings,
};

export function Icon({ name, ...props }: IconProps & { name: IconName }) {
  const Component = icons[name];
  return <Component aria-hidden focusable="false" {...props} />;
}
