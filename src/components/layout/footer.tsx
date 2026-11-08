import { BrandTagline } from "@/components/ui/brand-tagline";
import { Icon } from "@/components/ui/icon";
import { Logo } from "@/components/ui/logo";
import {
  contactInfo,
  footerNavigation,
  getContactEmail,
  siteConfig,
  telHref,
  type SiteSection,
} from "@/config/site";
import type { IconName } from "@/content/types";
import { Link } from "@/i18n/link";
import { getMessages } from "@/i18n/server";

type ContactItem = {
  icon: IconName;
  label: string;
  href: string;
  external?: boolean;
  /** Phone numbers and e-mail addresses always read left-to-right (also on Arabic pages). */
  ltr?: boolean;
  /** Small text after the label, e.g. the business line a phone number belongs to. */
  note?: string;
};

function Divider() {
  return <div aria-hidden className="h-px shrink-0 bg-line-dark tablet:h-auto tablet:w-px" />;
}

export async function Footer({ section = "general" }: { section?: SiteSection }) {
  const { site, common, home } = await getMessages();
  const email = getContactEmail(section);
  // Service pages list only their own numbers; everywhere else each number shows its team.
  const phoneGroups = [
    ...(section === "it"
      ? []
      : [{ team: home.engineering.badge, phones: contactInfo.phones.engineering }]),
    ...(section === "engineering"
      ? []
      : [{ team: home.software.badge, phones: contactInfo.phones.it }]),
  ];
  const contactItems: ContactItem[] = [
    { icon: "envelope", label: email, href: `mailto:${email}`, ltr: true },
    ...phoneGroups.flatMap(({ team, phones }) =>
      phones.map((phone) => ({
        icon: "phone" as const,
        label: phone,
        href: telHref(phone),
        ltr: true,
        note: section === "general" ? team : undefined,
      })),
    ),
    ...contactInfo.offices.map((office) => ({
      icon: "map-pin" as const,
      label: site.offices[office.key],
      href: office.mapUrl,
      external: true,
    })),
  ];

  return (
    <footer className="bg-footer section-x text-white">
      <div className="flex flex-col gap-10 pt-15 pb-10 tablet:pt-25">
        <div className="flex flex-col gap-10 tablet:flex-row">
          <div className="flex flex-1 flex-col items-start gap-6">
            <div className="flex flex-col items-start gap-2.5">
              <Link href="/" aria-label={common.homeLabel}>
                <Logo tone="white" />
              </Link>
              <BrandTagline className="text-[0.6875rem] tracking-[0.16em] text-white/50 uppercase" />
            </div>
            <p className="max-w-[394px] type-body">{site.footerTagline}</p>
          </div>

          <Divider />

          <nav aria-label={common.nav.footer} className="flex-1">
            <ul className="flex flex-col items-start gap-2.5">
              {footerNavigation.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="block py-[3px] type-button transition-opacity hover:opacity-70"
                  >
                    {common.nav[link.labelKey]}
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
                    <span className="flex min-w-0 flex-wrap items-baseline gap-x-2">
                      <span
                        dir={item.ltr ? "ltr" : undefined}
                        className="min-w-0 [overflow-wrap:anywhere]"
                      >
                        {item.label}
                      </span>
                      {item.note && <span className="text-sm text-white/60">{item.note}</span>}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </address>
        </div>

        <div aria-hidden className="h-px bg-line-dark" />

        <div className="flex flex-col items-center justify-center gap-x-6 gap-y-2 text-sm/[21px] tablet:flex-row">
          <p>
            © {new Date().getFullYear()} {siteConfig.legalName}. {common.footer.rights}
          </p>
          <Link
            href="/privacy"
            className="underline-offset-4 transition-opacity hover:underline hover:opacity-80"
          >
            {common.footer.privacy}
          </Link>
        </div>
      </div>
    </footer>
  );
}
