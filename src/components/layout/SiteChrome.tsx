import type { ReactNode } from "react";
import { SmoothScrollProvider } from "@/components/providers/SmoothScrollProvider";
import { TransitionProvider } from "@/components/providers/TransitionProvider";
import { Footer } from "./Footer";
import { Header } from "./Header";
import { Intro } from "./Intro";

/**
 * Providers + header + main + footer. Used by the (site) layout and by the
 * root 404, which renders outside the (site) group.
 */
export function SiteChrome({ children, footer = true }: { children: ReactNode; footer?: boolean }) {
  return (
    <SmoothScrollProvider>
      <TransitionProvider>
        <Header />
        <main id="main" tabIndex={-1} className="outline-none">
          {children}
        </main>
        {footer && <Footer />}
        <Intro />
      </TransitionProvider>
    </SmoothScrollProvider>
  );
}
