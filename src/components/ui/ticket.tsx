import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';

/**
 * An order slip: a body, a perforated tear line with a notch at each edge, and a stub.
 * The page's one signature shape. Use it only for things that are an order or its price
 * (the order card, the price per order), at most twice on the page. Always light.
 */
export function Ticket({ stub, className, children }: {
  /** Below the tear line: the total, or the monthly cap. */
  stub: ReactNode;
  className?: string;
  children: ReactNode;
}) {
  return (
    <div data-tone="light" className={cn('drop-shadow-ticket', className)}>
      <div className="ticket-top rounded-t-lg bg-surface p-6">{children}</div>
      <div className="ticket-bottom rounded-b-lg bg-surface px-6 pb-6">
        <div aria-hidden="true" className="mx-2.5 border-t-2 border-dashed border-line" />
        <div className="pt-5">{stub}</div>
      </div>
    </div>
  );
}
