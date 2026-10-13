"use client";

import { useActionState, type ComponentProps } from "react";

import { sendContactMessage } from "@/app/contact/actions";
import {
  HONEYPOT_FIELD,
  initialContactFormState,
  type ContactField,
  type ContactFormState,
} from "@/lib/contact";
import { cn } from "@/lib/utils";

const fieldClass =
  "w-full rounded-field border border-line bg-field p-3.5 font-inter text-sm/[1.2] text-ink backdrop-blur-[5px] transition-[border-color,box-shadow] outline-none placeholder:text-placeholder focus:border-brand/40 focus:ring-3 focus:ring-brand/10 aria-invalid:border-red-500/60";

type FieldProps = {
  name: ContactField;
  label: string;
  state: ContactFormState;
  className?: string;
} & (
  | ({ multiline?: false } & ComponentProps<"input">)
  | ({ multiline: true } & ComponentProps<"textarea">)
);

function Field({ name, label, state, className, multiline, ...props }: FieldProps) {
  const id = `contact-${name}`;
  const error = state.fieldErrors?.[name]?.[0];
  const shared = {
    id,
    name,
    defaultValue: state.values?.[name],
    "aria-invalid": error ? true : undefined,
    "aria-describedby": error ? `${id}-error` : undefined,
  };

  return (
    <div className={cn("flex flex-col gap-2.5", className)}>
      <label htmlFor={id} className="type-badge text-label">
        {label}
      </label>
      {multiline ? (
        <textarea
          {...shared}
          {...(props as ComponentProps<"textarea">)}
          className={cn(fieldClass, "h-40 resize-y")}
        />
      ) : (
        <input {...shared} {...(props as ComponentProps<"input">)} className={fieldClass} />
      )}
      {error && (
        <p id={`${id}-error`} className="text-sm text-red-600">
          {error}
        </p>
      )}
    </div>
  );
}

export function ContactForm() {
  const [state, formAction, pending] = useActionState(sendContactMessage, initialContactFormState);

  return (
    <form action={formAction} className="flex flex-col gap-5" noValidate>
      <div className="grid gap-5 tablet:grid-cols-2">
        <Field
          name="fullName"
          label="Full name"
          placeholder="Jane Smith"
          autoComplete="name"
          required
          state={state}
        />
        <Field
          name="company"
          label="Company name"
          placeholder="Smith"
          autoComplete="organization"
          state={state}
        />
        <Field
          name="email"
          label="Email"
          type="email"
          placeholder="jane@company.com"
          autoComplete="email"
          required
          state={state}
        />
        <Field
          name="phone"
          label="Phone"
          type="tel"
          placeholder="+0123456789"
          autoComplete="tel"
          state={state}
        />
      </div>

      <Field
        multiline
        name="message"
        label="How can we help?"
        placeholder="Describe your problem"
        required
        state={state}
      />

      {/* Honeypot: hidden from people, irresistible to bots. */}
      <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label htmlFor={HONEYPOT_FIELD}>Website</label>
        <input
          id={HONEYPOT_FIELD}
          name={HONEYPOT_FIELD}
          type="text"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <button
        type="submit"
        disabled={pending}
        className="w-full rounded-field bg-ink px-6 py-3.5 type-button text-white transition-opacity hover:opacity-90 disabled:cursor-wait disabled:opacity-60"
      >
        {pending ? "Sending…" : "Send message"}
      </button>

      <p
        role="status"
        aria-live="polite"
        className={cn(
          "text-sm empty:hidden",
          state.status === "success" ? "text-green-700" : "text-red-600",
        )}
      >
        {state.status !== "idle" ? state.message : ""}
      </p>
    </form>
  );
}
