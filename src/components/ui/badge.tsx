import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';

export type BadgeTone = 'brand' | 'neutral' | 'info' | 'success' | 'warning' | 'shipped' | 'danger';

const tones: Record<BadgeTone, string> = {
  brand: 'bg-accent-soft text-accent',
  neutral: 'bg-neutral-soft text-neutral-fg',
  info: 'bg-info-soft text-info-fg',
  success: 'bg-success-soft text-success-fg',
  warning: 'bg-warning-soft text-warning-fg',
  shipped: 'bg-shipped-soft text-shipped-fg',
  danger: 'bg-danger-soft text-danger-fg',
};

/**
 * A chip. `brand` follows the section's tone; the status tones are the admin's own and
 * belong on light surfaces (inside product visuals).
 */
export function Badge({ tone = 'brand', dot = false, className, children }: {
  tone?: BadgeTone;
  /** A leading dot, for an order status. */
  dot?: boolean;
  className?: string;
  children: ReactNode;
}) {
  return (
    <span className={cn('inline-flex items-center gap-1.5 rounded-sm px-2 py-0.5 text-micro font-semibold whitespace-nowrap', tones[tone], className)}>
      {dot && <span aria-hidden="true" className="size-1.5 rounded-full bg-current" />}
      {children}
    </span>
  );
}
