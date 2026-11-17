import type { ReactNode } from "react";
import { photos } from "@/content/photos";
import type { PhotoId } from "@/content/types";
import { cn } from "@/lib/utils";
import { Icon } from "./Icon";
import { Photo } from "./Photo";
import { Reveal } from "./Reveal";
import { RevealImage } from "./RevealImage";
import { SmartLink } from "./SmartLink";

const panels = {
  ice: "bg-photo-ice",
  lilac: "bg-photo-lilac",
  violet: "bg-brand",
  none: "bg-photo-lilac",
};

/**
 * BreakoutTile (I5). A rounded ice or lilac panel (radius 20) with a
 * transparent device cut-out anchored bottom-centre at 118% of the panel
 * height (108% on phones), so its top rises out of the panel. Label row
 * underneath; the whole tile is a link.
 *
 * Entry: panel I3, device Reveal 0.1s later. Hover (fine pointers): device
 * lifts 8px, panel scales to 0.98, arrow nudges. Missing cut-out: the photo
 * placeholder sits inside the panel, no breakout.
 *
 * `children` renders under the title (service card copy and spec line).
 * `scan` adds the T10 scan line (service cards).
 */
export function BreakoutTile({
  title,
  photo,
  href,
  sizes,
  delay = 0,
  scan = false,
  titleAs: TitleTag = "h3",
  titleClassName = "type-lead",
  children,
  className,
}: {
  title: string;
  photo: PhotoId;
  href?: string;
  sizes: string;
  delay?: number;
  scan?: boolean;
  titleAs?: "h3" | "span";
  titleClassName?: string;
  children?: ReactNode;
  className?: string;
}) {
  const entry = photos[photo];
  const hasCutout = Boolean(entry.src) && entry.cutout;

  const body = (
    <>
      {/* Room for the device rising out of the panel. */}
      <div className="relative mt-[18%] aspect-[4/5]">
        <RevealImage
          delay={delay}
          className="absolute inset-0 rounded-card [contain:paint] [@media(pointer:fine)]:group-hover/tile:scale-[0.98]"
          style={{ transition: "scale 0.5s var(--ease-heal)" }}
        >
          <div className={cn("relative size-full overflow-hidden", panels[entry.backdrop])}>
            {scan && (
              <span
                aria-hidden="true"
                className="tile-scan pointer-events-none absolute inset-x-0 -top-1/3 h-1/3 bg-linear-to-b from-transparent via-white/45 to-transparent"
              />
            )}
            {!hasCutout && (
              <div className="absolute inset-[8%]">
                <Photo id={photo} fill sizes={sizes} className="rounded-image" />
              </div>
            )}
          </div>
        </RevealImage>

        {hasCutout && (
          <Reveal
            delay={delay + 0.1}
            className="pointer-events-none absolute bottom-0 left-1/2 h-[108%] w-[86%] -translate-x-1/2 transition-[translate] duration-500 ease-heal md:h-[118%] [@media(pointer:fine)]:group-hover/tile:-translate-y-2"
          >
            <Photo id={photo} fill fit="contain" sizes={sizes} className="bg-transparent" />
          </Reveal>
        )}
      </div>

      <div className="mt-4 flex items-start justify-between gap-4">
        <div className="flex flex-col gap-2">
          <TitleTag className={cn("text-ink", titleClassName)}>{title}</TitleTag>
          {children}
        </div>
        {href && (
          <Icon
            name="arrow"
            className="mt-1.5 text-brand transition-transform duration-300 ease-heal group-hover/tile:translate-x-1 group-hover/tile:-translate-y-1"
          />
        )}
      </div>
    </>
  );

  if (!href) return <div className={cn("group/tile block", className)}>{body}</div>;

  return (
    <SmartLink href={href} className={cn("group/tile block", className)}>
      {body}
    </SmartLink>
  );
}
