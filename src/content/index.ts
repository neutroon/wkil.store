import type { Locale } from '@/lib/locale';
import { formatMoney, formatNumber } from '@/components/ui/money';
import { SUPPORT_PHONE_LOCAL } from '@/lib/site';
import { CAP_REACHED_AT_ORDERS, MONTHLY_CAP, PER_ORDER, PRICING } from './pricing';
import type { Content } from './types';
import { ar } from './ar';
import { en } from './en';

const CONTENT: Record<Locale, Content> = { ar, en };

/** Replaces the pricing placeholders in a copy string (see ./types.ts). */
export function fill(text: string, locale: Locale): string {
  const values: Record<string, string> = {
    perOrder: formatMoney(PER_ORDER, locale),
    cap: formatMoney(MONTHLY_CAP, locale),
    capOrders: formatNumber(CAP_REACHED_AT_ORDERS),
    freeMonths: formatNumber(PRICING.movedStoreFreeMonths),
    cancelDays: formatNumber(PRICING.cancelWindowDays),
    cancelPercent: `${PRICING.cancelAllowancePercent}%`,
    year: String(new Date().getFullYear()),
    // Isolated left to right, so the digits keep their order inside Arabic text.
    supportPhone: `\u2066${SUPPORT_PHONE_LOCAL}\u2069`,
  };
  return text.replace(/\{(\w+)\}/g, (match, key: string) => values[key] ?? match);
}

function fillAll<T>(value: T, locale: Locale): T {
  if (typeof value === 'string') return fill(value, locale) as T;
  if (Array.isArray(value)) return value.map((item) => fillAll(item, locale)) as T;
  if (value && typeof value === 'object') {
    return Object.fromEntries(Object.entries(value).map(([k, v]) => [k, fillAll(v, locale)])) as T;
  }
  return value;
}

/** The page's copy in a locale, with every placeholder filled. */
export function getContent(locale: Locale): Content {
  return fillAll(CONTENT[locale], locale);
}
