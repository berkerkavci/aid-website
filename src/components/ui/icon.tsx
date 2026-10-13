import type { IconProps } from "@phosphor-icons/react";
import {
  BellSimple,
  EnvelopeSimple,
  Gear,
  MapPin,
  Phone,
  Robot,
  UserSwitch,
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
};

export function Icon({ name, ...props }: IconProps & { name: IconName }) {
  const Component = icons[name];
  return <Component aria-hidden focusable="false" {...props} />;
}
