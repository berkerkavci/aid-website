"use client";

import { CheckCircle, WarningCircle } from "@phosphor-icons/react/ssr";
import Link from "next/link";
import {
  useActionState,
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
  type ComponentProps,
} from "react";

import { sendContactMessage } from "@/app/contact/actions";
import { Icon, iconTintClass } from "@/components/ui/icon";
import { Select } from "@/components/ui/select";
import { contactContent } from "@/content/pages/contact";
import type { ContactDepartment } from "@/content/types";
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

const departmentOptions = contactContent.department.options.map((option) => ({
  value: option.value,
  label: option.label,
  description: option.description,
  icon: (
    <span
      className={cn(
        "flex size-6 items-center justify-center rounded-md in-[li]:size-10 in-[li]:rounded-field",
        iconTintClass[option.tint],
      )}
    >
      <Icon name={option.icon} className="size-4 text-ink in-[li]:size-5" />
    </span>
  ),
}));

function isDepartment(value: unknown): value is ContactDepartment {
  return departmentOptions.some((option) => option.value === value);
}

/** Team preselected by a link such as /contact?department=engineering. */
function readDepartmentFromUrl() {
  const value = new URLSearchParams(window.location.search).get("department");
  return isDepartment(value) ? value : null;
}

const subscribeToNothing = () => () => {};

/** "Service" dropdown — routes the message to the IT or the Engineering team. */
function DepartmentSelect({ state }: { state: ContactFormState }) {
  const fromUrl = useSyncExternalStore(subscribeToNothing, readDepartmentFromUrl, () => null);
  const submitted = state.values?.department;
  const [chosen, setChosen] = useState<ContactDepartment | null>(null);
  const value = chosen ?? (isDepartment(submitted) ? submitted : fromUrl);

  return (
    <Select
      id="contact-department"
      name="department"
      label={contactContent.department.label}
      placeholder={contactContent.department.placeholder}
      options={departmentOptions}
      value={value}
      onChange={setChosen}
      required
      error={state.fieldErrors?.department?.[0]}
      triggerClassName={fieldClass}
    />
  );
}

/** GDPR / KVKK information notice with a required acknowledgement. */
function PrivacyConsent({ state }: { state: ContactFormState }) {
  const error = state.fieldErrors?.privacy?.[0];

  return (
    <div className="flex flex-col gap-1.5">
      <label className="flex cursor-pointer items-start gap-3 text-sm/[1.5] text-body">
        <input
          type="checkbox"
          name="privacy"
          required
          defaultChecked={state.values?.privacy === "on"}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? "contact-privacy-error" : undefined}
          className="mt-0.5 size-4 shrink-0 cursor-pointer accent-ink"
        />
        <span>
          I have read the{" "}
          <Link href="/privacy" className="font-medium text-ink underline underline-offset-2">
            Privacy Policy
          </Link>{" "}
          and agree that AID processes my details to respond to my enquiry.
        </span>
      </label>
      {error && (
        <p id="contact-privacy-error" className="text-sm text-red-600">
          {error}
        </p>
      )}
    </div>
  );
}

/** Replaces the form after a successful submission so the confirmation can't be missed. */
function SuccessMessage({ message, onReset }: { message?: string; onReset: () => void }) {
  const panelRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);

  // Bring the confirmation into view and move focus to it (screen readers announce it).
  useEffect(() => {
    panelRef.current?.scrollIntoView({ block: "center", behavior: "smooth" });
    headingRef.current?.focus({ preventScroll: true });
  }, []);

  return (
    <div
      ref={panelRef}
      role="status"
      className="flex min-h-[22rem] flex-col items-center justify-center gap-5 py-6 text-center"
    >
      <span className="flex size-16 items-center justify-center rounded-full bg-tint-green">
        <CheckCircle weight="fill" className="size-9 text-green-700" aria-hidden />
      </span>
      <div className="flex flex-col gap-2">
        <h2 ref={headingRef} tabIndex={-1} className="type-h3 text-ink outline-none">
          Thank you!
        </h2>
        <p className="max-w-[420px] type-body text-body">{message}</p>
      </div>
      <button
        type="button"
        onClick={onReset}
        className="rounded-field border border-ink px-5 py-3 type-button text-ink outline-ink transition-transform hover:scale-[1.03]"
      >
        Send another message
      </button>
    </div>
  );
}

/**
 * The form is remounted (new `key`) for "Send another message", which also
 * resets the server action state.
 */
export function ContactForm() {
  const [formKey, setFormKey] = useState(0);
  return <ContactFormInner key={formKey} onReset={() => setFormKey((key) => key + 1)} />;
}

function ContactFormInner({ onReset }: { onReset: () => void }) {
  const [state, formAction, pending] = useActionState(sendContactMessage, initialContactFormState);
  const formRef = useRef<HTMLFormElement>(null);

  // After a failed validation, move focus to the first field that needs attention.
  useEffect(() => {
    if (state.status !== "error") return;
    formRef.current?.querySelector<HTMLElement>('[aria-invalid="true"]')?.focus();
  }, [state]);

  if (state.status === "success") {
    return <SuccessMessage message={state.message} onReset={onReset} />;
  }

  return (
    <form ref={formRef} action={formAction} className="flex flex-col gap-5" noValidate>
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

      <DepartmentSelect state={state} />

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

      <PrivacyConsent state={state} />

      {state.status === "error" && state.message && (
        <div
          role="alert"
          className="flex items-start gap-3 rounded-field border border-red-200 bg-red-50 p-4 text-sm/[1.5] text-red-800"
        >
          <WarningCircle weight="fill" className="mt-px size-5 shrink-0 text-red-600" aria-hidden />
          <p>{state.message}</p>
        </div>
      )}

      <button
        type="submit"
        disabled={pending}
        className="w-full rounded-field bg-ink px-6 py-3.5 type-button text-white outline-ink transition-opacity hover:opacity-90 disabled:cursor-wait disabled:opacity-60"
      >
        {pending ? "Sending…" : "Send message"}
      </button>
    </form>
  );
}
