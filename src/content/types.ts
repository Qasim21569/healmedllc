/**
 * Shared content types. Every headline and paragraph on the site is a `Lines`
 * object: hand-set line breaks, each line under ~45 characters (vitest checks).
 * `mobile` is only present where the desktop breaks read badly at 375px.
 */
export type Lines = {
  desktop: readonly string[];
  mobile?: readonly string[];
};

export type Cta = {
  label: string;
  href: string;
  /** Opens in a new tab with rel="noopener noreferrer". */
  external?: boolean;
};

/** A `[confirm]` / `[need]` value: `null` until Ahmed supplies it, renders nothing. */
export type Pending<T> = T | null;

export type PhotoId =
  | "01"
  | "03"
  | "04"
  | "05"
  | "06"
  | "07"
  | "08"
  | "09"
  | "10"
  | "11"
  | "12"
  | "13"
  | "14"
  | "15"
  | "16"
  | "17"
  | "18"
  | "19"
  | "20"
  | "21"
  | "22"
  | "23"
  | "24"
  | "25"
  | "26"
  | "27"
  | "28"
  | "29"
  | "30"
  | "31"
  | "32"
  | "33"
  | "34"
  | "35"
  | "36"
  | "37"
  | "38"
  | "39"
  | "40"
  | "41"
  | "map";

export type PhotoBackdrop = "ice" | "lilac" | "violet" | "none";

export type PhotoEntry = {
  /** Path under /public, e.g. "/photos/p01.webp". `null` renders the placeholder frame. */
  src: string | null;
  alt: string;
  /** Short subject shown on the placeholder frame. */
  subject: string;
  width: number;
  height: number;
  backdrop: PhotoBackdrop;
  /** Transparent product cut-out (I5). */
  cutout: boolean;
  /** Optional tiny base64 image for placeholder="blur". */
  blurDataURL?: string;
};

/** A titled item with a short body, e.g. statement points, steps, cards. */
export type Point = {
  index?: string;
  title: string;
  body: Lines;
};

export type Tile = {
  title: string;
  photo: PhotoId;
  href: string;
};

export type PageHeroContent = {
  breadcrumb: { index: string; label: string };
  h1: Lines;
  lead?: Lines;
  ctas?: readonly Cta[];
  photo?: PhotoId;
};
