import { Inter } from "next/font/google";
import localFont from "next/font/local";

/** Body copy — Satoshi by Indian Type Foundry (Fontshare, ITF Free Font License). */
export const satoshi = localFont({
  src: [
    { path: "../fonts/satoshi-400.woff2", weight: "400", style: "normal" },
    { path: "../fonts/satoshi-500.woff2", weight: "500", style: "normal" },
  ],
  variable: "--font-satoshi",
  display: "swap",
});

/** Headings — Switzer by Indian Type Foundry (Fontshare, ITF Free Font License). */
export const switzer = localFont({
  src: [
    { path: "../fonts/switzer-500.woff2", weight: "500", style: "normal" },
    { path: "../fonts/switzer-600.woff2", weight: "600", style: "normal" },
  ],
  variable: "--font-switzer",
  display: "swap",
});

/** Used for stat labels, form fields and bold text in articles. */
export const inter = Inter({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "700"],
  variable: "--font-inter-sans",
  display: "swap",
});

export const fontVariables = [satoshi.variable, switzer.variable, inter.variable].join(" ");
