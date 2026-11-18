import { BRAND_NAME } from '@/lib/brand';
import { cn } from '@/lib/cn';
import { pathOf, type Locale } from '@/lib/locale';
import { BrandLogo } from './brand-logo';

/**
 * The product's logo: «متجر وكيل» drawn as outlines, with the Wkil bubble carrying a shopping
 * bag (src/lib/logo.ts). The logo is the same in both languages, as on wkil.app; the name
 * from `src/lib/brand.ts` is there for screen readers. With `link`, it leads to the locale's
 * home page.
 */
export function BrandMark({ locale, size = 'md', link = false, className }: {
  locale: Locale;
  size?: 'sm' | 'md';
  link?: boolean;
  className?: string;
}) {
  const mark = (
    <>
      <BrandLogo className={size === 'md' ? 'h-10' : 'h-9'} />
      <span className="sr-only">{BRAND_NAME[locale]}</span>
    </>
  );
  const classes = cn('inline-flex min-h-11 shrink-0 items-center', className);
  return link ? <a href={pathOf(locale)} className={classes}>{mark}</a> : <span className={classes}>{mark}</span>;
}
