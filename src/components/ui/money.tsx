import type { Locale } from '@/lib/locale';
import { cn } from '@/lib/cn';

const CURRENCY: Record<Locale, string> = { ar: 'ج.م', en: 'EGP' };

/** 1250 → "1,250": Latin digits in both languages. */
export function formatNumber(value: number): string {
  return new Intl.NumberFormat('en-US', { maximumFractionDigits: 2 }).format(value);
}

/**
 * An amount in pounds: `350 ج.م` in Arabic (currency after the number), `EGP 350` in
 * English. The space doesn't break, so the two never part at a line end.
 */
export function formatMoney(amount: number, locale: Locale): string {
  const n = formatNumber(amount);
  return locale === 'ar' ? `${n} ${CURRENCY.ar}` : `${CURRENCY.en} ${n}`;
}

/** Money in running text or a mock UI. For a large price, use `Stat` with `unit`. */
export function Money({ amount, locale, className }: { amount: number; locale: Locale; className?: string }) {
  return <span className={cn('nums whitespace-nowrap', className)}>{formatMoney(amount, locale)}</span>;
}

export function currencyLabel(locale: Locale): string {
  return CURRENCY[locale];
}
