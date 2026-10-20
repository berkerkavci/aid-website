import { Fragment } from "react";

const WORDS = ["Alternative", "Innovative", "Design"] as const;

/**
 * "Alternative · Innovative · Design" — where the name AID comes from. It explains
 * the brand name, so it stays in English in every language (marked lang="en",
 * always left-to-right). Styling (size, colour) comes from the parent.
 */
export function BrandTagline({ className }: { className?: string }) {
  return (
    <span lang="en" dir="ltr" className={className}>
      {WORDS.map((word, index) => (
        <Fragment key={word}>
          {index > 0 && <span aria-hidden> · </span>}
          {word}
        </Fragment>
      ))}
    </span>
  );
}
