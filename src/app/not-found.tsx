import type { Metadata } from "next";

import { PageShell } from "@/components/layout/page-shell";
import { ButtonLink } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false },
};

export default function NotFound() {
  return (
    <PageShell>
      <section className="flex min-h-[70svh] flex-col items-center justify-center gap-6 bg-cta section-x pt-[132px] pb-20 text-center tablet:pt-40">
        <p className="rounded-button border border-line bg-white px-4 py-2 type-badge">404</p>
        <h1 className="max-w-[520px] type-h2">This page could not be found</h1>
        <p className="max-w-[520px] type-lead text-body">
          The page you are looking for may have been moved or no longer exists.
        </p>
        <ButtonLink href="/" variant="dark">
          Back to home
        </ButtonLink>
      </section>
    </PageShell>
  );
}
