import { THEME_STORAGE_KEY } from "./theme";

/**
 * Applies the visitor's saved theme before the first paint, so returning
 * dark-mode visitors never see a white flash. Without a saved choice the site
 * starts in the light theme. Rendered inside <head>.
 */
const script = `(function(){try{var d=localStorage.getItem("${THEME_STORAGE_KEY}")==="dark";var r=document.documentElement;r.dataset.theme=d?"dark":"light";r.style.colorScheme=d?"dark":"light"}catch(e){}})()`;

export function ThemeScript() {
  return <script dangerouslySetInnerHTML={{ __html: script }} />;
}
