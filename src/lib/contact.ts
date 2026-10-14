import { z } from "zod";

import type { Messages } from "@/content/messages/en";
import type { ContactDepartment } from "@/content/types";

type ErrorTexts = Messages["contact"]["form"]["errors"];

/**
 * Validation rules for the contact form. Error messages are passed in so the
 * server answers in the visitor's language.
 */
export function createContactFormSchema(errors: ErrorTexts) {
  return z.object({
    /** Team the enquiry is for; also decides which mailbox receives it. */
    department: z.enum(["it", "engineering"], {
      error: errors.department,
    }) satisfies z.ZodType<ContactDepartment>,
    fullName: z.string().trim().min(2, errors.fullName).max(100),
    company: z.string().trim().max(100).optional().default(""),
    email: z.string().trim().max(200).pipe(z.email(errors.email)),
    phone: z
      .string()
      .trim()
      .max(30)
      .regex(/^[+()\d\s-]*$/, errors.phone)
      .optional()
      .default(""),
    message: z.string().trim().min(10, errors.message).max(5000),
    /** Checkbox: the visitor confirms they have read the Privacy Policy (GDPR / KVKK notice). */
    privacy: z.literal("on", { error: errors.privacy }),
  });
}

export type ContactFormValues = z.infer<ReturnType<typeof createContactFormSchema>>;
export type ContactField = keyof ContactFormValues;

export type ContactFormState = {
  status: "idle" | "success" | "error";
  message?: string;
  fieldErrors?: Partial<Record<ContactField, string[]>>;
  /** Submitted values, so the form keeps the user's input after a failed submit. */
  values?: Partial<Record<ContactField, string>>;
};

export const initialContactFormState: ContactFormState = { status: "idle" };

/** Name of the hidden anti-spam field. Real users never fill it in. */
export const HONEYPOT_FIELD = "website";
