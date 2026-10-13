import type { IconProps } from "@phosphor-icons/react";
import {
  BellSimple,
  Calculator,
  CheckCircle,
  ClipboardText,
  Clock,
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

import type { IconName } from "@/content/types";

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
};

export function Icon({ name, ...props }: IconProps & { name: IconName }) {
  const Component = icons[name];
  return <Component aria-hidden focusable="false" {...props} />;
}
