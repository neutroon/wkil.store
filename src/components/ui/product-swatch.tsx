import type { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/cn';

export type SwatchTone = 'sand' | 'clay' | 'sage' | 'sky';

const tones: Record<SwatchTone, string> = {
  sand: 'bg-swatch-sand',
  clay: 'bg-swatch-clay',
  sage: 'bg-swatch-sage',
  sky: 'bg-swatch-sky',
};

/**
 * A drawn "product photo" for the depicted shop: a flat warm tile with an outline icon.
 * The page has no photographs. Give it a size or an aspect ratio with `className`.
 */
export function ProductSwatch({ tone, icon: Icon, className }: {
  tone: SwatchTone;
  icon?: LucideIcon;
  className?: string;
}) {
  return (
    <span aria-hidden="true" className={cn('flex items-center justify-center rounded-md text-fg/60', tones[tone], className)}>
      {Icon && <Icon className="size-2/5" strokeWidth={1.25} />}
    </span>
  );
}
