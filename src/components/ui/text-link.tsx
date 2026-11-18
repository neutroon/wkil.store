import { ArrowLeft } from 'lucide-react';
import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';

/**
 * A text link. On its own (navigation, footer, "read more") it is 44px tall; `inline` is
 * for a link inside a sentence. `arrow` adds an arrow that points the way the text reads.
 */
export function TextLink({ href, inline = false, arrow = false, quiet = false, external = false, className, children, ...rest }: {
  href: string;
  inline?: boolean;
  arrow?: boolean;
  /** Body-coloured until hovered: for navigation and footer lists. */
  quiet?: boolean;
  external?: boolean;
  className?: string;
  children: ReactNode;
  hrefLang?: string;
  lang?: string;
  'aria-current'?: 'page' | 'location';
}) {
  return (
    <a
      href={href}
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      {...rest}
      className={cn(
        'font-medium underline-offset-4 transition-colors duration-150 hover:underline',
        quiet ? 'text-fg-muted hover:text-fg' : 'text-accent',
        inline ? 'underline' : 'inline-flex min-h-11 items-center gap-1.5',
        className,
      )}
    >
      {children}
      {/* ArrowLeft points forward in Arabic; mirrored, it points forward in English. */}
      {arrow && <ArrowLeft aria-hidden="true" className="size-[1.1em] shrink-0 ltr:-scale-x-100" />}
    </a>
  );
}
