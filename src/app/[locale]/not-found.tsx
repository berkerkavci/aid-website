import type { Metadata } from "next";

import { PageShell } from "@/components/layout/page-shell";
import { ButtonLink } from "@/components/ui/button";
import { getMessages } from "@/i18n/server";

export async function generateMetadata(): Promise<Metadata> {
  const { notFound } = await getMessages();
  return { title: notFound.metaTitle, robots: { index: false } };
}

export default async function NotFound() {
  const { notFound } = await getMessages();

  return (
    <PageShell>
      <section className="flex min-h-[70svh] flex-col items-center justify-center gap-6 bg-cta section-x pt-[132px] pb-20 text-center tablet:pt-40">
        <p className="rounded-button border border-line bg-surface px-4 py-2 type-badge">404</p>
        <h1 className="max-w-[520px] type-h2">{notFound.title}</h1>
        <p className="max-w-[520px] type-lead text-body">{notFound.description}</p>
        <ButtonLink href="/" variant="dark">
          {notFound.back}
        </ButtonLink>
      </section>
    </PageShell>
  );
}
