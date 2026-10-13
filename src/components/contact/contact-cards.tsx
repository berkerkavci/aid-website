import { Icon } from "@/components/ui/icon";
import { Reveal } from "@/components/ui/reveal";
import { contactInfo } from "@/config/site";
import type { IconName } from "@/content/types";

type ContactCard = {
  icon: IconName;
  title: string;
  links: { label: string; href: string; external?: boolean }[];
};

const cards: ContactCard[] = [
  {
    icon: "map-pin",
    title: "Office",
    links: contactInfo.offices.map((office) => ({
      label: office.address,
      href: office.mapUrl,
      external: true,
    })),
  },
  {
    icon: "phone",
    title: "Phone",
    links: contactInfo.phones.map((phone) => ({ label: phone, href: `tel:${phone}` })),
  },
  {
    icon: "envelope",
    title: "Mail",
    links: [{ label: contactInfo.emails.it, href: `mailto:${contactInfo.emails.it}` }],
  },
];

export function ContactCards() {
  return (
    <div className="grid w-full gap-10 desktop:grid-cols-3">
      {cards.map((card, index) => (
        <Reveal key={card.title} delay={index * 0.1} className="h-full min-w-0">
          <div className="flex h-full flex-col items-start gap-8 rounded-card border border-line bg-white p-8 tablet:p-10">
            <Icon name={card.icon} className="size-7 text-icon" />
            <div className="flex min-w-0 flex-col gap-3 [overflow-wrap:anywhere]">
              <h2 className="font-display text-lg/[1.4] font-semibold text-black">{card.title}</h2>
              {card.links.map((link) => (
                <p key={link.href}>
                  <a
                    href={link.href}
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
