import { Icon } from "@/components/ui/icon";
import { Reveal } from "@/components/ui/reveal";
import { contactInfo } from "@/config/site";
import type { IconName } from "@/content/types";
import { getMessages } from "@/i18n/server";

type ContactCard = {
  icon: IconName;
  title: string;
  links: { label: string; href: string; external?: boolean; ltr?: boolean }[];
};

export async function ContactCards() {
  const { contact } = await getMessages();
  const cards: ContactCard[] = [
    {
      icon: "map-pin",
      title: contact.cards.office,
      links: contactInfo.offices.map((office) => ({
        label: office.address,
        href: office.mapUrl,
        external: true,
      })),
    },
    {
      icon: "phone",
      title: contact.cards.phone,
      links: contactInfo.phones.map((phone) => ({
        label: phone,
        href: `tel:${phone}`,
        ltr: true,
      })),
    },
    {
      icon: "envelope",
      title: contact.cards.mail,
      links: [
        { label: contactInfo.emails.it, href: `mailto:${contactInfo.emails.it}`, ltr: true },
        {
          label: contactInfo.emails.engineering,
          href: `mailto:${contactInfo.emails.engineering}`,
          ltr: true,
        },
      ],
    },
  ];

  return (
    <div className="grid w-full gap-10 desktop:grid-cols-3">
      {cards.map((card, index) => (
        <Reveal key={card.title} delay={index * 0.1} className="h-full min-w-0">
          <div className="flex h-full flex-col items-start gap-8 rounded-card border border-line bg-surface p-8 tablet:p-10">
            <Icon name={card.icon} className="size-7 text-icon" />
            <div className="flex min-w-0 flex-col gap-3 [overflow-wrap:anywhere]">
              <h2 className="font-display text-lg/[1.4] font-semibold text-heading">
                {card.title}
              </h2>
              {card.links.map((link) => (
                <p key={link.href}>
                  <a
                    href={link.href}
                    dir={link.ltr ? "ltr" : undefined}
                    className="font-inter text-lg/7 text-ink transition-opacity hover:opacity-70"
                    {...(link.external && { target: "_blank", rel: "noopener noreferrer" })}
                  >
                    {link.label}
                  </a>
                </p>
              ))}
            </div>
          </div>
        </Reveal>
      ))}
    </div>
  );
}
