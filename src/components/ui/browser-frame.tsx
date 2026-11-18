import { Lock } from 'lucide-react';
import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';

/**
 * A browser window, for a product visual (the admin, a landing page on a laptop). Always
 * light. One image to a screen reader: `label` says what it shows.
 */
export function BrowserFrame({ label, url, className, children }: {
  /** What the picture shows, for screen readers. */
  label: string;
  /** Shown in the address bar, without the scheme: `zoya.wkil.store`. */
  url?: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <div role="img" aria-label={label} data-tone="light" className={cn('overflow-hidden rounded-lg border border-line bg-canvas shadow-device', className)}>
      <div className="grid h-10 grid-cols-[1fr_auto_1fr] items-center gap-3 border-b border-line bg-mist px-4">
        <span className="flex gap-1.5">
          <span className="size-2.5 rounded-full bg-line-strong opacity-50" />
          <span className="size-2.5 rounded-full bg-line-strong opacity-50" />
          <span className="size-2.5 rounded-full bg-line-strong opacity-50" />
        </span>
        {url && (
          // An address always reads left to right.
          <span dir="ltr" className="flex h-6 max-w-64 items-center gap-1.5 rounded-sm bg-canvas px-3 text-micro text-fg-muted">
            <Lock className="size-3 shrink-0" />
            <span className="truncate">{url}</span>
          </span>
        )}
      </div>
      <div className="relative overflow-hidden">{children}</div>
    </div>
  );
}
