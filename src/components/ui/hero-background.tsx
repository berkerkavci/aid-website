import { cn } from "@/lib/utils";

/**
 * Slowly rotating, heavily blurred conic gradients behind the hero content
 * (recreates the Framer "Loop" effect). Pure CSS — no JavaScript.
 */
export function HeroBackground({ className }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}
    >
      <div
        className={cn(
          "absolute h-[900px] w-[1200px] opacity-40 blur-[20px] saturate-[1.2]",
          "top-[calc(66%-600px)] left-[calc(76%-905px)] origin-[905px_600px]",
          "scale-[0.6] tablet:scale-[0.85] desktop:scale-100",
        )}
      >
        <div className="absolute top-[567px] left-[905px] size-[736px] -translate-1/2 rounded-full bg-[conic-gradient(#080d33_0deg,#3964b3_141.8deg,#00b7ff_360deg)] blur-[80px] will-change-transform motion-safe:animate-blob-a" />
        <div className="absolute top-[649px] left-[928px] size-[374px] -translate-1/2 rounded-full bg-[conic-gradient(#4eddfc_0deg,#82deff_180deg,#303385_360deg)] opacity-90 mix-blend-overlay blur-[20px] will-change-transform motion-safe:animate-blob-b" />
        <div className="absolute top-[717px] left-[896px] h-[462px] w-[446px] -translate-1/2 rounded-full bg-[conic-gradient(#ff61b0_0deg,#b0e3ff_148.7deg,#ff2ed5_359deg)] opacity-90 blur-[40px] will-change-transform motion-safe:animate-blob-c" />
      </div>
    </div>
  );
}
