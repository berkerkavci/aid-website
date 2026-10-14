import { Icon } from "@/components/ui/icon";
import { Logo } from "@/components/ui/logo";
import {
  contactInfo,
  footerNavigation,
  getContactEmail,
  siteConfig,
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
};

function Divider() {
  return <div aria-hidden className="h-px shrink-0 bg-line-dark tablet:h-auto tablet:w-px" />;
}

export async function Footer({ section = "general" }: { section?: SiteSection }) {
  const { site, common } = await getMessages();
  const email = getContactEmail(section);
  const contactItems: ContactItem[] = [
    { icon: "envelope", label: email, href: `mailto:${email}`, ltr: true },
    ...contactInfo.phones.map((phone) => ({
      icon: "phone" as const,
      label: phone,
      href: `tel:${phone}`,
      ltr: true,
    })),
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
            <Link href="/" aria-label={common.homeLabel}>
              <Logo tone="white" />
            </Link>
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
                    <span
                      dir={item.ltr ? "ltr" : undefined}
                      className="min-w-0 [overflow-wrap:anywhere]"
                    >
                      {item.label}
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
