/**
 * Theme selection. Two states, plus the device default we start from: until
 * someone touches the toggle there is no data-theme attribute at all and the
 * CSS follows `prefers-color-scheme` on its own.
 *
 * Nothing here holds state — the DOM is the state, so the toggle cannot drift
 * out of sync with what is actually painted. Keep the attribute logic in step
 * with the pre-paint script in app.html.
 */

export type Theme = "light" | "dark";

const KEY = "theme";

/** What the page is painting right now: a remembered choice, else the device. */
export function current(): Theme {
  const attr = document.documentElement.getAttribute("data-theme");
  if (attr === "light" || attr === "dark") return attr;
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

export function apply(theme: Theme): void {
  document.documentElement.setAttribute("data-theme", theme);

  // Private browsing and blocked site data both throw here; the theme still
  // applies for this page, it just will not be remembered.
  try {
    localStorage.setItem(KEY, theme);
  } catch {
    /* not remembered */
  }
}
