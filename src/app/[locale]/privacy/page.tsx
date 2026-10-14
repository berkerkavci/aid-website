import type { Metadata } from "next";
import type { MDXContent } from "mdx/types";

import { PageShell } from "@/components/layout/page-shell";
import { Badge } from "@/components/ui/badge";
import { localeAlternates, type Locale } from "@/i18n/config";
import { formatDate } from "@/i18n/format";
import { getLocale, getMessages } from "@/i18n/server";

/*
 * IMPORTANT: The policy texts (src/content/legal/privacy/<language>.mdx) are a solid
 * starting point written for the GDPR (EU) and KVKK (Türkiye), but they are not legal
 * advice. Have them reviewed by a lawyer and add the registered company names before
 * relying on them. The English text is the reference version.
 */

/** Change this date whenever the policy text changes (in any language). */
const privacyPolicyUpdatedAt = "2026-10-14";

/** Policy in the page language; falls back to English if a translation is missing. */
async function loadPolicy(locale: Locale) {
  try {
    return (await import(`@/content/legal/privacy/${locale}.mdx`)).default as MDXContent;
  } catch {
    return (await import("@/content/legal/privacy/en.mdx")).default as MDXContent;
  }
}

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const { privacy } = await getMessages(locale);
  return {
    title: privacy.meta.title,
    description: privacy.meta.description,
    alternates: localeAlternates(locale, "/privacy"),
  };
}

export default async function PrivacyPage() {
  const locale = await getLocale();
  const { privacy } = await getMessages(locale);
  const PrivacyPolicy = await loadPolicy(locale);

  return (
    <PageShell>
      <article className="flex flex-col items-center gap-12 section-x pt-[132px] pb-20 tablet:pt-[160px]">
        <header className="flex w-full max-w-[600px] flex-col items-center gap-[15px] text-center">
          <Badge>{privacy.badge}</Badge>
          <h1 className="type-h1 text-heading">{privacy.title}</h1>
          <p className="type-lead text-muted">
            {privacy.updated}{" "}
            <time dateTime={privacyPolicyUpdatedAt}>
              {formatDate(privacyPolicyUpdatedAt, locale)}
            </time>
          </p>
        </header>

        <div className="post-body w-full max-w-[800px]">
          <PrivacyPolicy />
        </div>
      </article>
    </PageShell>
  );
}
