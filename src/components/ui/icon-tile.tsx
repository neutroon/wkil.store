import type { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/cn';

export type IconTileSize = 'sm' | 'md' | 'lg';

const sizes: Record<IconTileSize, { tile: string; icon: string; text: string }> = {
  sm: { tile: 'size-9 rounded-sm', icon: 'size-[1.125rem]', text: 'text-small' },
  md: { tile: 'size-11 rounded-md', icon: 'size-5', text: 'text-body' },
  lg: { tile: 'size-14 rounded-md', icon: 'size-6', text: 'text-subheading' },
};

/**
 * An icon (or a step's number) in a soft teal tile: the admin's own motif. Decorative, so
 * hidden from screen readers; the text beside it carries the meaning.
 */
export function IconTile({ icon: Icon, label, size = 'md', solid = false, flip = false, className }: {
  icon?: LucideIcon;
  /** Shown instead of an icon: a step's number. */
  label?: string;
  size?: IconTileSize;
  /** Brand fill instead of the soft one: at most one per group, for the current step. */
  solid?: boolean;
  /** Mirror the icon in right-to-left: for icons that point somewhere (a truck, an arrow). */
  flip?: boolean;
  className?: string;
}) {
  const s = sizes[size];
  return (
    <span
      aria-hidden="true"
      className={cn('inline-flex shrink-0 items-center justify-center', s.tile, solid ? 'bg-brand text-brand-on' : 'bg-accent-soft text-accent', className)}
    >
      {Icon ? <Icon className={cn(s.icon, flip && 'rtl:-scale-x-100')} /> : <span className={cn('nums font-bold', s.text)}>{label}</span>}
    </span>
  );
}
