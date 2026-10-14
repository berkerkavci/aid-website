"use server";

import { z } from "zod";

import { getContactEmail } from "@/config/site";
import { getContactContent } from "@/content/pages/contact";
import { defaultLocale, isLocale, localeInfo, type Locale } from "@/i18n/config";
import { format } from "@/i18n/format";
import { getMessagesFor } from "@/i18n/server";
import {
  createContactFormSchema,
  HONEYPOT_FIELD,
  type ContactField,
  type ContactFormState,
  type ContactFormValues,
} from "@/lib/contact";

const CONTACT_FIELDS = [
  "department",
  "fullName",
  "company",
  "email",
  "phone",
  "message",
  "privacy",
] as const satisfies readonly ContactField[];

/** The team reads enquiries in English, whatever language the visitor used. */
function departmentLabel(data: ContactFormValues) {
  const { options } = getContactContent(getMessagesFor(defaultLocale).contact).form.department;
  return options.find((option) => option.value === data.department)?.label ?? data.department;
}

function formatEmail(data: ContactFormValues, locale: Locale) {
  return [
    `Service: ${departmentLabel(data)}`,
    `Name: ${data.fullName}`,
    `Company: ${data.company || "-"}`,
    `E-mail: ${data.email}`,
    `Phone: ${data.phone || "-"}`,
    `Language: ${localeInfo[locale].nativeName}`,
    "",
    data.message,
  ].join("\n");
}

/**
 * Sends the contact form via the Resend API (https://resend.com/docs/api-reference).
 * The chosen service decides the recipient: IT → contactInfo.emails.it,
 * Engineering → contactInfo.emails.engineering (both set in src/config/site.ts).
 */
async function deliver(data: ContactFormValues, locale: Locale) {
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
      text: formatEmail(data, locale),
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
  const requestedLocale = formData.get("locale");
  const locale = isLocale(requestedLocale) ? requestedLocale : defaultLocale;
  const texts = getMessagesFor(locale).contact.form;

  // Bots fill every field; pretend everything went fine and drop the message.
  if (formData.get(HONEYPOT_FIELD)) return { status: "success", message: texts.success.message };

  const values = Object.fromEntries(
    CONTACT_FIELDS.map((field) => [field, String(formData.get(field) ?? "")]),
  ) as Record<ContactField, string>;

  const parsed = createContactFormSchema(texts.errors).safeParse(values);
  if (!parsed.success) {
    return {
      status: "error",
      message: texts.errors.summary,
      fieldErrors: z.flattenError(parsed.error).fieldErrors,
      values,
    };
  }

  const sent = await deliver(parsed.data, locale);
  if (!sent) {
    return {
      status: "error",
      message: format(texts.errors.failed, { email: getContactEmail(parsed.data.department) }),
      values,
    };
  }

  return { status: "success", message: texts.success.message };
}
