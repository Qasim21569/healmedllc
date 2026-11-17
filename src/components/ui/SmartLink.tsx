"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { AnchorHTMLAttributes, ReactNode } from "react";
import { useScrollToHash } from "@/components/providers/SmoothScrollProvider";
import { isExternalHref, isProtocolHref } from "@/lib/utils";

type SmartLinkProps = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> & {
  href: string;
  children: ReactNode;
  /** Force a new tab (stores). External http(s) links always open one. */
  external?: boolean;
};

/**
 * One link for every kind of href:
 * - "#id" and "/same-page#id": scroll on the click through Lenis (repeatable).
 * - "/route": next/link.
 * - http(s): new tab, rel="noopener noreferrer".
 * - mailto:/tel: plain anchor.
 */
export function SmartLink({ href, children, external, onClick, ...rest }: SmartLinkProps) {
  const pathname = usePathname();
  const scrollToHash = useScrollToHash();

  if (external || isExternalHref(href)) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" onClick={onClick} {...rest}>
        {children}
      </a>
    );
  }

  if (isProtocolHref(href)) {
    return (
      <a href={href} onClick={onClick} {...rest}>
        {children}
      </a>
    );
  }

  const hashIndex = href.indexOf("#");
  const path = hashIndex === -1 ? href : href.slice(0, hashIndex);
  const hash = hashIndex === -1 ? "" : href.slice(hashIndex);
  const samePage = hash && (path === "" || path === pathname);

  if (samePage) {
    return (
      <a
        href={href}
        onClick={(e) => {
          onClick?.(e);
          if (e.defaultPrevented || e.metaKey || e.ctrlKey || e.shiftKey) return;
          if (scrollToHash(hash)) e.preventDefault();
        }}
        {...rest}
      >
        {children}
      </a>
    );
  }

  return (
    <Link href={href} onClick={onClick} {...rest}>
      {children}
    </Link>
  );
}
