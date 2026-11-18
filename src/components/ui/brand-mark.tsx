import { Store } from 'lucide-react';
import { BRAND_NAME } from '@/lib/brand';
import { cn } from '@/lib/cn';
import { pathOf, type Locale } from '@/lib/locale';

/**
 * The product's mark as the admin shows it today (a store icon in a soft teal tile) beside
 * the name from `src/lib/brand.ts`. With `link`, it leads to the locale's home page.
 */
export function BrandMark({ locale, size = 'md', link = false, className }: {
  locale: Locale;
  size?: 'sm' | 'md';
  link?: boolean;
  className?: string;
}) {
  const mark = (
    <>
      <span aria-hidden="true" className={cn('inline-flex shrink-0 items-center justify-center rounded-md bg-accent-soft text-accent', size === 'md' ? 'size-10' : 'size-9')}>
        <Store className="size-5" />
      </span>
      <span className={cn('font-bold whitespace-nowrap text-fg', size === 'md' ? 'text-subheading' : 'text-body')}>{BRAND_NAME[locale]}</span>
    </>
  );
  const classes = cn('inline-flex min-h-11 items-center gap-2.5', className);
  return link ? <a href={pathOf(locale)} className={classes}>{mark}</a> : <span className={classes}>{mark}</span>;
}
