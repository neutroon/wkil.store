import { formatMoney } from '@/components/ui/money';
import { MONTHLY_CAP, PER_ORDER } from '@/content/pricing';
import { BRAND_NAME } from './brand';
import type { Locale } from './locale';

/** The social preview's size and words, shared by the metadata and the image route. */
export const OG_SIZE = { width: 1200, height: 630 };

export type SocialCopy = { headline: string[]; price: string; per: string; cap: string; alt: string };

export const SOCIAL_COPY: Record<Locale, SocialCopy> = {
  ar: {
    headline: ['مفيش اشتراك شهري', 'بتدفع على الطلب بس'],
    price: formatMoney(PER_ORDER, 'ar'),
    per: 'على كل طلب',
    cap: `وبحد أقصى ${formatMoney(MONTHLY_CAP, 'ar')} في الشهر`,
    alt: `${BRAND_NAME.ar}: مفيش اشتراك شهري، بتدفع ${formatMoney(PER_ORDER, 'ar')} على كل طلب وبحد أقصى ${formatMoney(MONTHLY_CAP, 'ar')} في الشهر`,
  },
  en: {
    headline: ['No subscription.', 'You pay per order.'],
    price: formatMoney(PER_ORDER, 'en'),
    per: 'per order',
    cap: `never more than ${formatMoney(MONTHLY_CAP, 'en')} a month`,
    alt: `${BRAND_NAME.en}: no subscription. You pay ${formatMoney(PER_ORDER, 'en')} per order, never more than ${formatMoney(MONTHLY_CAP, 'en')} a month.`,
  },
};

/** Where the build writes each locale's preview (src/app/social/<locale>.png/route.tsx). */
export function socialImagePath(locale: Locale): string {
  return `/social/${locale}.png`;
}
