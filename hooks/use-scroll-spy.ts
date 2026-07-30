"use client";

import { useEffect, useState } from "react";

/**
 * Reports which of the given section ids is currently in view.
 *
 * Used only to highlight the active nav link. One shared IntersectionObserver
 * rather than a scroll listener, so it costs nothing on the main thread.
 */
export function useScrollSpy(ids: string[], offset = 96): string | null {
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter((element): element is HTMLElement => element !== null);

    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);

        if (visible[0]) setActiveId(visible[0].target.id);
      },
      {
        rootMargin: `-${offset}px 0px -55% 0px`,
        threshold: 0,
      },
    );

    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, [ids, offset]);

  return activeId;
}
