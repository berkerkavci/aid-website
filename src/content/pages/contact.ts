import type { Messages } from "@/content/messages/en";
import type { ContactDepartment, ContactDepartmentOption, SectionIntro } from "@/content/types";

/**
 * "Service" dropdown in the contact form. The choice decides which team receives
 * the message (see `getContactEmail` in `src/config/site.ts`). Links can preselect
 * a team with `/contact?department=it` or `/contact?department=engineering`.
 */
const departments: Pick<ContactDepartmentOption, "value" | "icon" | "tint">[] = [
  { value: "it", icon: "cpu", tint: "blue" },
  { value: "engineering", icon: "buildings", tint: "green" },
];

export const contactDepartments: ContactDepartment[] = departments.map(({ value }) => value);

export function getContactContent(t: Messages["contact"]) {
  return {
    meta: t.meta,
    intro: t.intro satisfies SectionIntro,
    responseTime: t.responseTime,
    map: t.map,
    cards: t.cards,
    form: {
      ...t.form,
      department: {
        label: t.form.department.label,
        placeholder: t.form.department.placeholder,
        options: departments.map((option) => ({
          ...option,
          label: t.form.department[option.value].label,
          description: t.form.department[option.value].description,
        })) satisfies ContactDepartmentOption[],
      },
    },
  };
}

export type ContactFormTexts = ReturnType<typeof getContactContent>["form"];
