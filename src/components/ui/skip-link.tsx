/** The first thing in <body>: lets a keyboard user jump past the header. */
export function SkipLink({ href = '#main', children }: { href?: string; children: string }) {
  return (
    <a
      href={href}
      className="fixed start-4 top-3 z-50 -translate-y-24 rounded-md bg-ink px-4 py-3 text-small font-semibold text-white focus-visible:translate-y-0"
    >
      {children}
    </a>
  );
}
