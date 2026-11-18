"use client";

import { usePathname } from "next/navigation";
import { useRef, useState } from "react";
import { motion, useMotionValueEvent, useScroll } from "motion/react";
import { site } from "@/content/site";
import { useHeaderTheme } from "@/hooks/useHeaderTheme";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { EASE } from "@/lib/motion";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { Logo } from "@/components/ui/Logo";
import { SmartLink } from "@/components/ui/SmartLink";
import { MobileMenu } from "./MobileMenu";

function isActive(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(`${href}/`);
}

/**
 * Header (PLAYBOOK §6). Fixed, 76px (64 under 1024). Vector logo left (violet
 * on light sections, white on brand and dark), six links centre, "Sell
 * equipment" right; under 1024 a 44px round button that morphs between burger
 * and close. Theme follows the section under it (T6). Transparent at the top,
 * solid + float shadow after 80px; hides on scroll down past 240px and returns
 * on scroll up.
 *
 * The header sits above the mobile menu (z-50 over z-40), so the logo and the
 * button stay put while the panel opens and closes underneath them.
 */
export function Header() {
  const pathname = usePathname();
  const headerRef = useRef<HTMLElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const theme = useHeaderTheme(headerRef, pathname);
  const reduced = useReducedMotion();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    setScrolled(latest > 80);
    if (latest > 240 && latest > previous) setHidden(true);
    else if (latest < previous || latest <= 240) setHidden(false);
  });

  // Close the menu whenever the route changes (state adjusted during render).
  const [lastPath, setLastPath] = useState(pathname);
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setMenuOpen(false);
  }

  const closeMenu = () => {
    setMenuOpen(false);
    menuButtonRef.current?.focus();
  };

  const shownTheme = menuOpen ? "brand" : theme;
  const solid = scrolled && !menuOpen;

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[110] focus:rounded-full focus:bg-brand focus:px-5 focus:py-3 focus:text-on-brand"
      >
        {site.skipLink}
      </a>

      <motion.header
        ref={headerRef}
        data-theme={shownTheme}
        onFocusCapture={() => setHidden(false)}
        className={cn(
          "fixed inset-x-0 top-0 z-50 text-ink",
          "transition-[background-color,color,box-shadow] duration-300 ease-heal",
          solid ? "bg-canvas shadow-floating" : "bg-transparent",
        )}
        initial={false}
        animate={{ y: hidden && !menuOpen ? "-100%" : "0%" }}
        transition={{ duration: reduced ? 0 : 0.6, ease: EASE }}
      >
        <div className="flex h-header items-center justify-between gap-6 px-margin-edge">
          <SmartLink
            href="/"
            aria-label={site.logo.alt}
            onClick={() => setMenuOpen(false)}
            className="flex shrink-0 items-center"
          >
            <Logo
              className={cn(
                "h-9 w-auto transition-colors duration-300 ease-heal lg:h-10",
                shownTheme === "light" ? "text-brand" : "text-ink",
              )}
            />
          </SmartLink>

          <nav aria-label="Main" className="hidden lg:block">
            <ul className="flex items-center gap-[calc(28*var(--multiplier))]">
              {site.nav.map((link) => {
                const active = isActive(pathname, link.href);
                return (
                  <li key={link.href}>
                    <SmartLink
                      href={link.href}
                      aria-current={active ? "page" : undefined}
                      className="group/nav relative inline-flex min-h-11 items-center type-small"
                    >
                      {link.label}
                      <span
                        aria-hidden="true"
                        className={cn(
                          "absolute inset-x-0 bottom-2.5 h-px origin-left bg-current",
                          "transition-transform duration-500 ease-heal",
                          active ? "scale-x-100" : "scale-x-0 group-hover/nav:scale-x-100",
                        )}
                      />
                    </SmartLink>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="hidden lg:block">
            <Button href={site.headerCta.href} className="min-h-11">
              {site.headerCta.label}
            </Button>
          </div>

          <button
            ref={menuButtonRef}
            type="button"
            className="relative grid size-11 place-items-center rounded-full border border-current transition-colors duration-300 ease-heal active:scale-95 lg:hidden"
            aria-label={menuOpen ? site.menu.close : site.menu.open}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            onClick={() => (menuOpen ? closeMenu() : setMenuOpen(true))}
          >
            {/* Two lines that rotate into an X. */}
            <span aria-hidden="true" className="relative block h-3 w-5">
              <span
                className={cn(
                  "absolute left-0 h-[1.5px] w-full rounded-full bg-current transition-[top,transform] duration-500 ease-heal",
                  menuOpen ? "top-[5px] rotate-45" : "top-0 rotate-0",
                )}
              />
              <span
                className={cn(
                  "absolute left-0 h-[1.5px] w-full rounded-full bg-current transition-[top,transform] duration-500 ease-heal",
                  menuOpen ? "top-[5px] -rotate-45" : "top-[10px] rotate-0",
                )}
              />
            </span>
          </button>
        </div>
      </motion.header>

      <MobileMenu
        open={menuOpen}
        onClose={closeMenu}
        pathname={pathname}
        toggleRef={menuButtonRef}
      />
    </>
  );
}
