"use client";

import type { ReactNode } from "react";
import { motion, MotionConfig } from "motion/react";
import { EASE } from "@/lib/motion";
import { cn, isExternalHref } from "@/lib/utils";
import { Icon } from "./Icon";
import { SmartLink } from "./SmartLink";

/**
 * StyledLink (T11), port of brahma-web (Elementis list link). Full-width row,
 * label left and arrow right, on a faint rule; on hover a solid rule sweeps in.
 * Colour comes from the section theme (currentColor), so no tone prop.
 */
export function StyledLink({
  href,
  children,
  className = "",
  external,
}: {
  href: string;
  children: ReactNode;
  className?: string;
  external?: boolean;
}) {
  const isExternal = external || isExternalHref(href);

  return (
    <SmartLink href={href} external={isExternal} className="block">
      <motion.span
        initial="initial"
        whileHover="hover"
        className={cn(
          "relative flex w-full items-center justify-between gap-6 overflow-hidden py-4 pr-2 text-ink",
          className,
        )}
      >
        <span className="type-body">{children}</span>
        <Icon name={isExternal ? "arrow-up-right" : "arrow"} />
        <MotionConfig transition={{ duration: 0.45, ease: EASE }}>
          <span className="absolute inset-x-0 bottom-0 h-px bg-current opacity-30" />
          <motion.span
            className="absolute inset-x-0 bottom-0 h-px bg-current"
            variants={{ initial: { x: "100%" }, hover: { x: ["-100%", "0%"] } }}
          />
        </MotionConfig>
      </motion.span>
    </SmartLink>
  );
}
