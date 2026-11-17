"use client";

import { useEffect, useRef } from "react";
import { motion } from "motion/react";
import { site } from "@/content/site";
import { useLenis } from "@/components/providers/SmoothScrollProvider";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { EASE } from "@/lib/motion";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { SmartLink } from "@/components/ui/SmartLink";
import { HeaderLogo } from "./Header";

/**
 * MobileMenu (PLAYBOOK §6). Brand full screen under 1024px. Links with mono
 * index 01 to 06 rise in a T2 stagger; phone, email and "Sell equipment" at the
 * bottom. Focus is trapped inside, Esc closes, page scroll is locked (Lenis
 * stopped, root overflow clipped for the no-Lenis case).
 *
 * Always mounted (renders server-side, never returns null); closed it is
 * `inert` and invisible.
 */
export function MobileMenu({
  open,
  onClose,
  pathname,
}: {
  open: boolean;
  onClose: () => void;
  pathname: string;
}) {
  const lenis = useLenis();
  const reduced = useReducedMotion();
  const panelRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  // Scroll lock + initial focus.
  useEffect(() => {
    if (!open) return;
    const root = document.documentElement;
    lenis?.current?.stop();
    root.style.overflow = "hidden";
    closeRef.current?.focus();
    return () => {
      lenis?.current?.start();
      root.style.overflow = "";
    };
  }, [open, lenis]);

  // Esc closes; Tab stays inside the panel.
  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
        return;
      }
      if (e.key !== "Tab" || !panelRef.current) return;
      const focusables = panelRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
      );
      if (focusables.length === 0) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);

  const item = {
    open: { opacity: 1, y: 0, transition: { duration: reduced ? 0 : 0.6, ease: EASE } },
    closed: { opacity: 0, y: 24, transition: { duration: reduced ? 0 : 0.25, ease: EASE } },
  };

  return (
    <div
      ref={panelRef}
      id="mobile-menu"
      data-theme="brand"
      role="dialog"
      aria-modal="true"
      aria-label="Menu"
      inert={!open}
      className={cn(
        "fixed inset-0 z-[60] flex flex-col bg-canvas text-ink lg:hidden",
        "transition-[opacity,visibility] duration-300 ease-heal",
        open ? "visible opacity-100" : "invisible opacity-0",
      )}
    >
      <div className="flex h-header shrink-0 items-center justify-between px-margin-edge">
        <SmartLink
          href="/"
          aria-label={site.logo.alt}
          onClick={onClose}
          className="flex items-center"
        >
          <HeaderLogo theme="brand" />
        </SmartLink>
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          aria-label={site.menu.close}
          className="grid size-11 place-items-center rounded-full border border-current"
        >
          <Icon name="close" />
        </button>
      </div>

      <motion.nav
        aria-label="Main"
        className="flex flex-1 flex-col justify-center overflow-y-auto px-margin-edge"
        initial={false}
        animate={open ? "open" : "closed"}
        variants={{
          open: {
            transition: { staggerChildren: reduced ? 0 : 0.06, delayChildren: reduced ? 0 : 0.1 },
          },
          closed: { transition: { staggerChildren: 0.02, staggerDirection: -1 } },
        }}
      >
        <ul>
          {site.nav.map((link) => {
            const active = pathname === link.href;
            return (
              <motion.li
                key={link.href}
                variants={item}
                className="border-t border-hairline first:border-t-0"
              >
                <SmartLink
                  href={link.href}
                  onClick={onClose}
                  aria-current={active ? "page" : undefined}
                  className="flex min-h-11 items-baseline gap-4 py-3"
                >
                  <span aria-hidden="true" className="type-eyebrow w-6 text-muted">
                    {link.index}
                  </span>
                  <span
                    className={cn("type-h2", active && "underline decoration-1 underline-offset-8")}
                    style={{ fontSize: "var(--t-menu)" }}
                  >
                    {link.label}
                  </span>
                </SmartLink>
              </motion.li>
            );
          })}
        </ul>
      </motion.nav>

      <motion.div
        className="flex shrink-0 flex-col gap-4 px-margin-edge pt-4 pb-8"
        initial={false}
        animate={open ? "open" : "closed"}
        variants={{
          open: {
            opacity: 1,
            y: 0,
            transition: { duration: reduced ? 0 : 0.6, ease: EASE, delay: reduced ? 0 : 0.35 },
          },
          closed: { opacity: 0, y: 12, transition: { duration: reduced ? 0 : 0.2, ease: EASE } },
        }}
      >
        <div className="flex flex-col gap-1 type-small">
          <a href={site.contact.phoneHref} className="inline-flex min-h-11 items-center gap-3">
            <Icon name="phone" />
            {site.contact.phone}
          </a>
          <a href={site.contact.emailHref} className="inline-flex min-h-11 items-center gap-3">
            <Icon name="mail" />
            {site.contact.email}
          </a>
        </div>
        <Button href={site.headerCta.href} block className="w-full">
          {site.headerCta.label}
        </Button>
      </motion.div>
    </div>
  );
}
