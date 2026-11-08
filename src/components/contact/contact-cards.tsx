import { Icon } from "@/components/ui/icon";
import { Reveal } from "@/components/ui/reveal";
import { contactInfo, telHref } from "@/config/site";
import type { IconName } from "@/content/types";
import { getMessages } from "@/i18n/server";

type CardLink = { label: string; href: string; external?: boolean; ltr?: boolean };

/** Links under an optional heading, e.g. the phone numbers of one business line. */
type CardGroup = { label?: string; links: CardLink[] };

type ContactCard = {
  icon: IconName;
  title: string;
  groups: CardGroup[];
};

const phoneLink = (phone: string): CardLink => ({
  label: phone,
  href: telHref(phone),
  ltr: true,
});

const emailLink = (email: string): CardLink => ({
  label: email,
  href: `mailto:${email}`,
  ltr: true,
});

export async function ContactCards() {
  const { contact, home } = await getMessages();
  const mep = home.engineering.badge;
  const software = home.software.badge;
  const cards: ContactCard[] = [
    {
      icon: "map-pin",
      title: contact.cards.office,
      groups: contactInfo.offices.map((office) => ({
        links: [{ label: office.address, href: office.mapUrl, external: true }],
      })),
    },
    {
      icon: "phone",
      title: contact.cards.phone,
      groups: [
        { label: mep, links: contactInfo.phones.engineering.map(phoneLink) },
        { label: software, links: contactInfo.phones.it.map(phoneLink) },
      ],
    },
    {
      icon: "envelope",
      title: contact.cards.mail,
      groups: [
        { label: mep, links: [emailLink(contactInfo.emails.engineering)] },
        { label: software, links: [emailLink(contactInfo.emails.it)] },
      ],
    },
  ];

  return (
    <div className="grid w-full gap-10 desktop:grid-cols-3">
      {cards.map((card, index) => (
        <Reveal key={card.title} delay={index * 0.1} className="h-full min-w-0">
          <div className="flex h-full flex-col items-start gap-8 rounded-card border border-line bg-surface p-8 tablet:p-10">
            <Icon name={card.icon} className="size-7 text-icon" />
            <div className="flex min-w-0 flex-col gap-4 [overflow-wrap:anywhere]">
              <h2 className="font-display text-lg/[1.4] font-semibold text-heading">
                {card.title}
              </h2>
              {card.groups.map((group) => (
                <div key={group.links[0]?.href} className="flex flex-col gap-1">
                  {group.label && <p className="text-sm/5 font-medium text-body">{group.label}</p>}
                  {group.links.map((link) => (
                    <p key={link.href}>
                      <a
                        href={link.href}
                        dir={link.ltr ? "ltr" : undefined}
                        // The smaller size keeps e-mail addresses on one line in narrow cards.
                        className="font-inter text-base/7 text-ink transition-opacity hover:opacity-70 min-[80rem]:text-lg/7"
                        {...(link.external && { target: "_blank", rel: "noopener noreferrer" })}
                      >
                        {link.label}
                      </a>
                    </p>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      ))}
    </div>
  );
}
