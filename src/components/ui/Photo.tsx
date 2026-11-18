import Image from "next/image";
import type { CSSProperties } from "react";
import { photos } from "@/content/photos";
import type { PhotoId } from "@/content/types";
import { cn } from "@/lib/utils";
import { Icon } from "./Icon";

const backdrops = {
  ice: "bg-photo-ice",
  lilac: "bg-photo-lilac",
  violet: "bg-brand",
  none: "",
} as const;

/**
 * Photo (PLAYBOOK §3.2, PHOTO-PIPELINE §5).
 *
 * Real file → next/image (blur placeholder when the entry has one).
 * Missing file (`src: null`) → placeholder frame at the same ratio: lilac
 * ground, camera icon, mono id and subject. Layouts are final either way.
 *
 * - Default: an aspect-ratio box from the entry's width/height (or `ratio`).
 * - `fill`: fills the positioned parent, which owns the size.
 * - `preload`: the LCP image (Home hero): preload link + fetchPriority high.
 *   Next 16 replaced `priority` with it.
 * - `sizes` is required: every image declares its layout width.
 */
export function Photo({
  id,
  sizes,
  ratio,
  fill = false,
  preload = false,
  fit,
  className,
  imageClassName,
  style,
}: {
  id: PhotoId;
  sizes: string;
  /** CSS aspect-ratio override, e.g. "4 / 3" for phone crops. */
  ratio?: string;
  fill?: boolean;
  preload?: boolean;
  fit?: "cover" | "contain";
  className?: string;
  imageClassName?: string;
  style?: CSSProperties;
}) {
  const entry = photos[id];
  const objectFit = fit ?? (entry.cutout ? "contain" : "cover");
  const frameStyle: CSSProperties = fill
    ? { ...style }
    : { aspectRatio: ratio ?? `${entry.width} / ${entry.height}`, ...style };

  return (
    <div
      className={cn(
        // Never both `relative` and `absolute`: whichever Tailwind emits last
        // wins, and a relative fill frame collapses to zero height.
        "overflow-hidden",
        fill ? "absolute inset-0" : "relative w-full",
        !entry.src && "bg-photo-lilac text-photo-ink",
        entry.src && backdrops[entry.cutout ? "none" : entry.backdrop],
        className,
      )}
      style={frameStyle}
    >
      {entry.src ? (
        <Image
          src={entry.src}
          alt={entry.alt}
          fill
          sizes={sizes}
          preload={preload}
          fetchPriority={preload ? "high" : undefined}
          loading={preload ? undefined : "lazy"}
          placeholder={entry.blurDataURL ? "blur" : "empty"}
          blurDataURL={entry.blurDataURL}
          className={cn(
            objectFit === "contain" ? "object-contain" : "object-cover",
            imageClassName,
          )}
        />
      ) : (
        <div
          role="img"
          aria-label={entry.alt}
          className="absolute inset-0 flex flex-col items-center justify-center gap-2 p-4 text-center"
        >
          <Icon name="camera" className="size-6 opacity-70" />
          <span className="type-eyebrow">P{id}</span>
          <span className="type-small max-w-[24ch] opacity-80">{entry.subject}</span>
        </div>
      )}
    </div>
  );
}
