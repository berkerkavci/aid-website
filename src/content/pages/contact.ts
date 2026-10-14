import type { ContactDepartmentOption, SectionIntro } from "@/content/types";

export const contactContent = {
  meta: {
    title: "Contact",
    description:
      "Get in touch with AID. Offices in Warsaw, Poland and Ankara, Turkey — let's turn your challenges into strategic advantages.",
  },
  intro: {
    badge: "Contact Us",
    title: "Let's Work Together",
    description:
      "Let’s turn your IT and engineering challenges into strategic advantages. Connect with us to start building smarter solutions.",
  } satisfies SectionIntro,
  responseTime: "We typically reply within one business day.",
  /**
   * "Service" dropdown in the contact form. The choice decides which team receives
   * the message (see `getContactEmail` in `src/config/site.ts`). Links can preselect
   * a team with `/contact?department=it` or `/contact?department=engineering`.
   */
  department: {
    label: "Service",
    placeholder: "Select a service",
    options: [
      {
        value: "it",
        label: "IT Services",
        description: "Automation, monitoring & DevOps",
        icon: "cpu",
        tint: "blue",
      },
      {
        value: "engineering",
        label: "Engineering",
        description: "MEP design, coordination & commissioning",
        icon: "buildings",
        tint: "green",
      },
    ] satisfies ContactDepartmentOption[],
  },
};
