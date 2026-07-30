/** First focusable element on the page. Visible only when focused. */
export function SkipLink({ label }: { label: string }) {
  return (
    <a
      href="#main"
      className="bg-ink text-cream-100 sr-only rounded-md px-5 py-3 text-sm font-medium focus-visible:not-sr-only focus-visible:fixed focus-visible:top-4 focus-visible:left-4 focus-visible:z-[100]"
    >
      {label}
    </a>
  );
}
