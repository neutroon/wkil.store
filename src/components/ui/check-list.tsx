import { Check } from 'lucide-react';
import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';

/** A list of things the merchant gets. Put `CheckItem`s inside. */
export function CheckList({ columns = 1, className, children }: {
  /** Two columns from 640px. */
  columns?: 1 | 2;
  className?: string;
  children: ReactNode;
}) {
  return <ul className={cn('grid gap-x-8 gap-y-3', columns === 2 && 'sm:grid-cols-2', className)}>{children}</ul>;
}

export function CheckItem({ className, children }: { className?: string; children: ReactNode }) {
  return (
    <li className={cn('flex gap-3', className)}>
      {/* The tick's box is one line tall, so it sits on the first line in either language. */}
      <span aria-hidden="true" className="flex h-[1lh] shrink-0 items-center">
        <span className="flex size-5 items-center justify-center rounded-full bg-accent-soft text-accent">
          <Check className="size-3.5" strokeWidth={3} />
        </span>
      </span>
      <span>{children}</span>
    </li>
  );
}
