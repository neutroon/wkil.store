import { pathOf, type Locale } from './locale';

function origin(value: string | undefined, fallback: string): string {
  const raw = value?.trim() || fallback;
  return raw.replace(/\/+$/, '');
}

/** Where this site is served. Used for canonical links, the sitemap and social previews. */
export const SITE_URL = origin(process.env.NEXT_PUBLIC_SITE_URL, 'https://wkil.store');

/** The merchants' admin, where sign-in (and so sign-up) happens. */
export const ADMIN_URL = origin(process.env.NEXT_PUBLIC_ADMIN_URL, 'https://admin.wkil.store');

/** Every "start" button leads here: signing in with a phone creates the account on first use. */
export const SIGN_UP_URL = `${ADMIN_URL}/login`;

/** Merchants who already have a store. */
export const SIGN_IN_URL = `${ADMIN_URL}/login`;

/** Support on WhatsApp (the same number the admin shows merchants: store-platform packages/shared/src/platform.ts). */
export const SUPPORT_PHONE_E164 = '+201515277663';
/** As Egyptians write it: 01515277663. */
export const SUPPORT_PHONE_LOCAL = `0${SUPPORT_PHONE_E164.slice(3)}`;
export const SUPPORT_WHATSAPP_URL = `https://wa.me/${SUPPORT_PHONE_E164.slice(1)}`;

export function absoluteUrl(path: string): string {
  return `${SITE_URL}${path.startsWith('/') ? path : `/${path}`}`;
}

export function pageUrl(locale: Locale): string {
  return absoluteUrl(pathOf(locale));
}
