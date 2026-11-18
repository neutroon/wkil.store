import { Plus } from 'lucide-react';
import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';

/**
 * A question that opens to its answer: a native <details>, so it works without script and
 * a browser's find-in-page can open it. Stack them in a list; each draws its own top rule.
 * `name` groups them so only one stays open.
 */
export function Disclosure({ summary, name, open = false, className, children }: {
  summary: ReactNode;
  name?: string;
  open?: boolean;
  className?: string;
  children: ReactNode;
}) {
  return (
    <details name={name} open={open} className={cn('group border-t border-line last:border-b', className)}>
      <summary className="flex min-h-16 items-center justify-between gap-6 py-4 text-subheading text-fg">
        <span>{summary}</span>
        <span aria-hidden="true" className="flex size-8 shrink-0 items-center justify-center rounded-full bg-accent-soft text-accent transition-transform duration-200 group-open:rotate-45">
          <Plus className="size-4" strokeWidth={2.5} />
        </span>
      </summary>
      <div className="max-w-[40rem] pb-6 text-fg-muted">{children}</div>
    </details>
  );
}
