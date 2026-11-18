import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';

/**
 * A short label above a heading. Use it only when it tells the reader something the heading
 * doesn't (which part of the page this is). Sentence case in English, never letter-spaced.
 */
export function Eyebrow({ className, children }: { className?: string; children: ReactNode }) {
  return (
    <p className={cn('flex items-center gap-2 text-small font-semibold text-accent', className)}>
      <span aria-hidden="true" className="size-2 rounded-[2px] bg-accent" />
      {children}
    </p>
  );
}
