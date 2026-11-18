import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';

/**
 * A number that matters, with what it counts. `unit` sits beside the number at a smaller
 * size, on the side its language puts it: `5` + `ج.م` reads "5 ج.م", `EGP` + `5` reads
 * "EGP 5" (pass `unitFirst`).
 */
export function Stat({ value, unit, unitFirst = false, label, size = 'lg', className }: {
  value: ReactNode;
  unit?: ReactNode;
  /** English money: the currency comes before the number. */
  unitFirst?: boolean;
  label?: ReactNode;
  /** `lg` is the figure size (the price); `md` is the title size (a row of stats). */
  size?: 'md' | 'lg';
  className?: string;
}) {
  const unitEl = unit && <span className={cn('font-semibold text-fg-muted', size === 'lg' ? 'text-heading' : 'text-subheading')}>{unit}</span>;
  return (
    <div className={cn('flex flex-col gap-2', className)}>
      <p className="flex items-baseline gap-2 whitespace-nowrap">
        {unitFirst && unitEl}
        <span className={cn('nums', size === 'lg' ? 'text-figure' : 'text-title')}>{value}</span>
        {!unitFirst && unitEl}
      </p>
      {label && <p className="text-small text-fg-muted">{label}</p>}
    </div>
  );
}
