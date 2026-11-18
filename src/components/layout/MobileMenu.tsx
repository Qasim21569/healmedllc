"use client";

import { useEffect, useRef, type RefObject } from "react";
import { motion } from "motion/react";
import { site } from "@/content/site";
import { useLenis } from "@/components/providers/SmoothScrollProvider";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { EASE } from "@/lib/motion";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { SmartLink } from "@/components/ui/SmartLink";

/**
 * MobileMenu (under 1024px). A brand panel that slides down from the top
 * under the header (which stays on top with the logo and the morphing
 * button). Links rise in a stagger once the panel lands; on close they fade
 * first, then the panel slides back up.
 *
 * Layout: the link list scrolls on its own and centres when there is room
 * (`my-auto` inside an overflow container, so the first and last links are
 * never clipped). One line per link. Contact links and "Sell equipment" sit at
 * the bottom, clear of the home indicator (safe-area inset).
 *
 * Esc closes; Tab cycles through the header button and the panel; page scroll
 * is locked while open. Always mounted (renders server-side); closed it is
 * `inert` and hidden.
 */
export function MobileMenu({
  open,
  onClose,
  pathname,
  toggleRef,
}: {
  open: boolean;
  onClose: () => void;
  pathname: string;
  toggleRef: RefObject<HTMLButtonElement | null>;
}) {
  const lenis = useLenis();
  const reduced = useReducedMotion();
  const panelRef = useRef<HTMLDivElement>(null);

  // Scroll lock.
  useEffect(() => {
    if (!open) return;
    const root = document.documentElement;
    const instance = lenis?.current;
    instance?.stop();
    root.style.overflow = "hidden";
    return () => {
      instance?.start();
      root.style.overflow = "";
    };
  }, [open, lenis]);

  // Esc closes; Tab stays within the header button + panel.
  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
        return;
      }
      if (e.key !== "Tab" || !panelRef.current) return;
      const focusables = [
        toggleRef.current,
        ...panelRef.current.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
        ),
      ].filter((el): el is HTMLElement => Boolean(el));
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
  }, [open, onClose, toggleRef]);

  const d = (s: number) => (reduced ? 0 : s);

  return (
    <motion.div
      ref={panelRef}
      id="mobile-menu"
      data-theme="brand"
      role="dialog"
      aria-modal="true"
      aria-label="Menu"
      inert={!open}
      initial={false}
      animate={open ? "open" : "closed"}
      variants={{
        open: { y: "0%", transition: { duration: d(0.6), ease: EASE } },
        closed: { y: "-100%", transition: { duration: d(0.5), ease: EASE, delay: d(0.15) } },
      }}
      className={cn(
        "fixed inset-0 z-40 flex flex-col bg-canvas pt-header text-ink lg:hidden",
        // Hidden only after the slide-up has finished; visible at once on open.
        open
          ? "visible transition-[visibility] delay-0 duration-0"
          : "invisible transition-[visibility] delay-[700ms] duration-0",
      )}
    >
      <nav
        aria-label="Main"
        className="flex min-h-0 flex-1 flex-col overflow-y-auto overscroll-contain px-margin-edge"
      >
        <motion.ul
          className="my-auto py-6"
          initial={false}
          animate={open ? "open" : "closed"}
          variants={{
            open: { transition: { staggerChildren: d(0.05), delayChildren: d(0.25) } },
            closed: { transition: { staggerChildren: d(0.02), staggerDirection: -1 } },
          }}
        >
          {site.nav.map((link) => {
            const active = pathname === link.href || pathname.startsWith(`${link.href}/`);
            return (
              <motion.li
                key={link.href}
                className="border-b border-hairline last:border-b-0"
                variants={{
                  open: { opacity: 1, y: 0, transition: { duration: d(0.5), ease: EASE } },
                  closed: { opacity: 0, y: -10, transition: { duration: d(0.18), ease: EASE } },
                }}
              >
                <SmartLink
                  href={link.href}
                  onClick={onClose}
                  aria-current={active ? "page" : undefined}
                  className="flex min-h-14 items-center gap-4 py-2 transition-opacity active:opacity-60"
                >
                  <span aria-hidden="true" className="type-eyebrow w-6 shrink-0 text-muted">
                    {link.index}
                  </span>
                  <span className="type-h2 whitespace-nowrap" style={{ fontSize: "var(--t-menu)" }}>
                    {link.label}
                  </span>
                  {active && (
                    <span
                      aria-hidden="true"
                      className="ml-auto size-2 shrink-0 rounded-full bg-ink"
                    />
                  )}
                </SmartLink>
              </motion.li>
            );
          })}
        </motion.ul>
      </nav>

      <motion.div
        className="flex shrink-0 flex-col gap-4 border-t border-hairline px-margin-edge pt-5 pb-[max(1.5rem,env(safe-area-inset-bottom))]"
        initial={false}
        animate={open ? "open" : "closed"}
        variants={{
          open: { opacity: 1, y: 0, transition: { duration: d(0.5), ease: EASE, delay: d(0.45) } },
          closed: { opacity: 0, y: 8, transition: { duration: d(0.15), ease: EASE } },
        }}
      >
        <div className="flex flex-wrap items-center gap-x-6 gap-y-1 type-small">
          <a href={site.contact.phoneHref} className="inline-flex min-h-11 items-center gap-2">
            <Icon name="phone" />
            {site.contact.phone}
          </a>
          <a href={site.contact.emailHref} className="inline-flex min-h-11 items-center gap-2">
            <Icon name="mail" />
            {site.contact.email}
          </a>
        </div>
        <Button href={site.headerCta.href} block className="w-full">
          {site.headerCta.label}
        </Button>
      </motion.div>
    </motion.div>
  );
}
