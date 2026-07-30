"use client";

import { useCallback, useSyncExternalStore } from "react";

/**
 * Subscribe to a CSS media query.
 *
 * `useSyncExternalStore` rather than `useState` + `useEffect`: the match state
 * lives in the browser, not in React, and this avoids the cascading render that
 * a synchronous `setState` inside an effect would cause. The server snapshot is
 * `false`, so markup matches the SSR output on first paint.
 */
export function useMediaQuery(query: string): boolean {
  const subscribe = useCallback(
    (onStoreChange: () => void) => {
      const list = window.matchMedia(query);
      list.addEventListener("change", onStoreChange);
      return () => list.removeEventListener("change", onStoreChange);
    },
    [query],
  );

  const getSnapshot = useCallback(() => window.matchMedia(query).matches, [query]);
  const getServerSnapshot = useCallback(() => false, []);

  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

/** Matches Tailwind's `lg` breakpoint — the desktop/mobile split for rails. */
export function useIsDesktop() {
  return useMediaQuery("(min-width: 1024px)");
}
