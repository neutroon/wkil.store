import { currencyLabel } from '@/components/ui/money';
import { CAP_REACHED_AT_ORDERS, PER_ORDER, monthlyFeeMinor } from '@/content/pricing';
import type { Locale } from './locale';

/** The pricing calculator's range and stops. Fees themselves come from src/content/pricing.ts. */
export const CALCULATOR = {
  min: 0,
  /** The slider's end. A larger number can still be typed into the box. */
  max: 5000,
  /** What the page shows before anyone touches it, in the static HTML too. */
  defaultOrders: 300,
  /** The most the number box accepts. */
  maxTyped: 99_999,
  /** Labelled under the slider; PageUp and PageDown jump between them. One is where the cap starts. */
  stops: [0, 1000, 2000, CAP_REACHED_AT_ORDERS, 5000] as readonly number[],
} as const;

/** Whole orders between 0 and `max`. Anything that isn't a number counts as 0. */
export function clampOrders(value: number, max: number = CALCULATOR.maxTyped): number {
  if (!Number.isFinite(value)) return 0;
  return Math.min(Math.max(Math.floor(value), 0), max);
}

/**
 * What someone typed into the orders box, as a number of orders. Accepts Arabic-Indic and
 * Persian digits (an Arabic keyboard types those) and ignores separators like "1,667".
 * Returns null when there are no digits at all, so the box can be empty while typing.
 */
export function parseOrders(text: string): number | null {
  const latin = text
    .replace(/[٠-٩]/g, (d) => String(d.charCodeAt(0) - 0x0660))
    .replace(/[۰-۹]/g, (d) => String(d.charCodeAt(0) - 0x06f0))
    .replace(/[^0-9]/g, '');
  if (latin === '') return null;
  return clampOrders(Number(latin));
}

/** The average fee per order in pounds, to the piastre. With no orders, it is the per-order price. */
export function averagePerOrder(orders: number): number {
  const n = clampOrders(orders, Number.MAX_SAFE_INTEGER);
  if (n === 0) return PER_ORDER;
  return Math.round(monthlyFeeMinor(n) / n) / 100;
}

/** True once the month's fee has reached the cap. */
export function isCapped(orders: number): boolean {
  return clampOrders(orders, Number.MAX_SAFE_INTEGER) >= CAP_REACHED_AT_ORDERS;
}

/** The next labelled stop above (`1`) or below (`-1`) a value, for PageUp and PageDown. */
export function nextStop(value: number, direction: 1 | -1): number {
  const { stops, min, max } = CALCULATOR;
  if (direction === 1) return stops.find((s) => s > value) ?? max;
  return stops.findLast((s) => s < value) ?? min;
}

/**
 * An amount in pounds as Latin digits: whole pounds plain ("2,500"), anything with piastres
 * to two places ("1.50", "0.83"), so a price never reads "1.5".
 */
export function formatAmount(amount: number): string {
  const whole = Number.isInteger(amount);
  return new Intl.NumberFormat('en-US', {
    minimumFractionDigits: whole ? 0 : 2,
    maximumFractionDigits: whole ? 0 : 2,
  }).format(amount);
}

/** `formatMoney` with `formatAmount`'s digits: `1.50 ج.م`, `EGP 1.50`. */
export function formatPrice(amount: number, locale: Locale): string {
  const n = formatAmount(amount);
  return locale === 'ar' ? `${n} ${currencyLabel(locale)}` : `${currencyLabel(locale)} ${n}`;
}
