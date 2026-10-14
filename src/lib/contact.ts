import { z } from "zod";

import type { ContactDepartment } from "@/content/types";

/** Validation rules for the contact form — shared by the client form and the server action. */
export const contactFormSchema = z.object({
  /** Team the enquiry is for; also decides which mailbox receives it. */
  department: z.enum(["it", "engineering"], {
    error: "Please choose IT Services or Engineering.",
  }) satisfies z.ZodType<ContactDepartment>,
  fullName: z.string().trim().min(2, "Please enter your full name.").max(100),
  company: z.string().trim().max(100).optional().default(""),
  email: z.string().trim().max(200).pipe(z.email("Please enter a valid e-mail address.")),
  phone: z
    .string()
    .trim()
    .max(30)
    .regex(/^[+()\d\s-]*$/, "Please enter a valid phone number.")
    .optional()
    .default(""),
  message: z
    .string()
    .trim()
    .min(10, "Please tell us a bit more (at least 10 characters).")
    .max(5000),
  /** Checkbox: the visitor confirms they have read the Privacy Policy (GDPR / KVKK notice). */
  privacy: z.literal("on", { error: "Please confirm that you have read the Privacy Policy." }),
});

export type ContactFormValues = z.infer<typeof contactFormSchema>;
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
