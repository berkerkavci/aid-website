import type { Metadata } from "next";

import { PageShell } from "@/components/layout/page-shell";
import { Badge } from "@/components/ui/badge";
import PrivacyPolicy from "@/content/legal/privacy.mdx";
import { formatDate } from "@/lib/utils";

/*
 * IMPORTANT: The policy text (src/content/legal/privacy.mdx) is a solid starting point
 * written for the GDPR (EU) and KVKK (Türkiye), but it is not legal advice. Have it
 * reviewed by a lawyer and add the registered company names before relying on it.
 */

/** Change this date whenever the policy text in src/content/legal/privacy.mdx changes. */
const privacyPolicyUpdatedAt = "2026-10-13";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How AID processes personal data under the GDPR and the Turkish data protection law (KVKK).",
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <PageShell>
      <article className="flex flex-col items-center gap-12 section-x pt-[132px] pb-20 tablet:pt-[160px]">
        <header className="flex w-full max-w-[600px] flex-col items-center gap-[15px] text-center">
          <Badge>Legal</Badge>
          <h1 className="type-h1 text-black">Privacy Policy</h1>
          <p className="type-lead text-muted">
            Last updated{" "}
            <time dateTime={privacyPolicyUpdatedAt}>{formatDate(privacyPolicyUpdatedAt)}</time>
          </p>
        </header>

        <div className="post-body w-full max-w-[800px]">
          <PrivacyPolicy />
        </div>
      </article>
    </PageShell>
  );
}
