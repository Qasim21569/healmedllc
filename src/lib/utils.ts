/** Joins class names, dropping falsy values. */
export function cn(...classes: (string | false | null | undefined)[]): string {
  return classes.filter(Boolean).join(" ");
}

/** True for links that leave the site. */
export function isExternalHref(href: string): boolean {
  return /^(https?:)?\/\//.test(href);
}

/** True for mailto: and tel: links. */
export function isProtocolHref(href: string): boolean {
  return /^(mailto|tel):/.test(href);
}
