"use server";

import { z } from "zod";

import { getContactEmail } from "@/config/site";
import { contactContent } from "@/content/pages/contact";
import {
  contactFormSchema,
  HONEYPOT_FIELD,
  type ContactField,
  type ContactFormState,
  type ContactFormValues,
} from "@/lib/contact";

const SUCCESS_MESSAGE = "Your message has been sent. We typically reply within one business day.";

const CONTACT_FIELDS = [
  "department",
  "fullName",
  "company",
  "email",
  "phone",
  "message",
  "privacy",
] as const satisfies readonly ContactField[];

function departmentLabel(data: ContactFormValues) {
  return (
    contactContent.department.options.find((option) => option.value === data.department)?.label ??
    data.department
  );
}

function formatEmail(data: ContactFormValues) {
  return [
    `Service: ${departmentLabel(data)}`,
    `Name: ${data.fullName}`,
    `Company: ${data.company || "-"}`,
    `E-mail: ${data.email}`,
    `Phone: ${data.phone || "-"}`,
    "",
    data.message,
  ].join("\n");
}

/**
 * Sends the contact form via the Resend API (https://resend.com/docs/api-reference).
 * The chosen service decides the recipient: IT → contactInfo.emails.it,
 * Engineering → contactInfo.emails.engineering (both set in src/config/site.ts).
 */
async function deliver(data: ContactFormValues) {
  const apiKey = process.env.RESEND_API_KEY;
  const to = getContactEmail(data.department);

  if (!apiKey) {
    if (process.env.NODE_ENV !== "production") {
      console.info(
        `[contact] RESEND_API_KEY is not set — message for ${to} logged instead of sent:\n`,
        data,
      );
      return true;
    }
    console.error("[contact] RESEND_API_KEY is not configured.");
    return false;
  }

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: process.env.CONTACT_FROM_EMAIL ?? "AID Website <onboarding@resend.dev>",
      to: [to],
      reply_to: data.email,
      subject: `[${departmentLabel(data)}] New enquiry from ${data.fullName}${data.company ? ` (${data.company})` : ""}`,
      text: formatEmail(data),
    }),
  });

  if (!response.ok) {
    console.error("[contact] Resend error:", response.status, await response.text());
    return false;
  }
  return true;
}

export async function sendContactMessage(
  _previousState: ContactFormState,
  formData: FormData,
): Promise<ContactFormState> {
  // Bots fill every field; pretend everything went fine and drop the message.
  if (formData.get(HONEYPOT_FIELD)) return { status: "success", message: SUCCESS_MESSAGE };

  const values = Object.fromEntries(
    CONTACT_FIELDS.map((field) => [field, String(formData.get(field) ?? "")]),
  ) as Record<ContactField, string>;

  const parsed = contactFormSchema.safeParse(values);
  if (!parsed.success) {
    return {
      status: "error",
      message: "Please check the highlighted fields.",
      fieldErrors: z.flattenError(parsed.error).fieldErrors,
      values,
    };
  }

  const sent = await deliver(parsed.data);
  if (!sent) {
    return {
      status: "error",
      message: `Sorry, your message could not be sent. Please e-mail us at ${getContactEmail(parsed.data.department)}.`,
      values,
    };
  }

  return { status: "success", message: SUCCESS_MESSAGE };
}
