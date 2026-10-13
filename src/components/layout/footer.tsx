import Link from "next/link";

import { Icon } from "@/components/ui/icon";
import { Logo } from "@/components/ui/logo";
import {
  contactInfo,
  footerNavigation,
  getContactEmail,
  legalNavigation,
  siteConfig,
  type SiteSection,
} from "@/config/site";
import type { IconName } from "@/content/types";

type ContactItem = { icon: IconName; label: string; href: string; external?: boolean };

function Divider() {
  return <div aria-hidden className="h-px shrink-0 bg-line-dark tablet:h-auto tablet:w-px" />;
}

export function Footer({ section = "general" }: { section?: SiteSection }) {
  const email = getContactEmail(section);
  const contactItems: ContactItem[] = [
    { icon: "envelope", label: email, href: `mailto:${email}` },
    ...contactInfo.phones.map((phone) => ({
      icon: "phone" as const,
      label: phone,
      href: `tel:${phone}`,
    })),
    ...contactInfo.offices.map((office) => ({
      icon: "map-pin" as const,
      label: office.city,
      href: office.mapUrl,
      external: true,
    })),
  ];

  return (
    <footer className="bg-footer section-x text-white">
      <div className="flex flex-col gap-10 pt-15 pb-10 tablet:pt-25">
        <div className="flex flex-col gap-10 tablet:flex-row">
          <div className="flex flex-1 flex-col items-start gap-6">
            <Link href="/" aria-label={`${siteConfig.name} — home`}>
              <Logo tone="white" />
            </Link>
            <p className="max-w-[394px] type-body">{siteConfig.footerTagline}</p>
          </div>

          <Divider />

          <nav aria-label="Footer" className="flex-1">
            <ul className="flex flex-col items-start gap-2.5">
              {footerNavigation.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="block py-[3px] type-button transition-opacity hover:opacity-70"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <Divider />

          <address className="flex-1 not-italic">
            <ul className="flex flex-col items-start gap-4">
              {contactItems.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="flex items-center gap-2.5 py-[3px] type-button transition-opacity hover:opacity-70"
                    {...(item.external && { target: "_blank", rel: "noopener noreferrer" })}
                  >
                    <Icon name={item.icon} className="size-6 shrink-0" />
                    <span className="min-w-0 [overflow-wrap:anywhere]">{item.label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </address>
        </div>

        <div aria-hidden className="h-px bg-line-dark" />

        <div className="flex flex-col items-center justify-center gap-x-6 gap-y-2 text-sm/[21px] tablet:flex-row">
          <p>
            © {new Date().getFullYear()} {siteConfig.legalName}. All rights reserved.
          </p>
          {legalNavigation.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="underline-offset-4 transition-opacity hover:underline hover:opacity-80"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
}
