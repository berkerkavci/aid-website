import { notFound } from "next/navigation";

/** Unknown URLs inside a language (e.g. /tr/xyz) show the translated 404 page. */
export default function CatchAllPage() {
  notFound();
}
