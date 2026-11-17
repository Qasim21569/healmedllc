"use client";

import { useEffect, useRef } from "react";
import { usePageTransition } from "@/components/providers/TransitionProvider";

/**
 * Page transition enter step (T9, port of otis-valen `app/template.tsx`).
 * Templates remount on every route change inside (site); once the new page
 * has mounted, the covering panel is told to leave.
 *
 * Lives in (site)/ rather than app/: a root template is keyed by the route
 * group segment, which is the same for every page, so it would never remount.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  const transition = usePageTransition();
  const ref = useRef(transition);

  useEffect(() => {
    ref.current = transition;
  }, [transition]);

  // Mount only: this instance is the new page.
  useEffect(() => {
    ref.current?.pageMounted();
  }, []);

  return <>{children}</>;
}
