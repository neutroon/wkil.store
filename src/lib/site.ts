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

export function absoluteUrl(path: string): string {
  return `${SITE_URL}${path.startsWith('/') ? path : `/${path}`}`;
}

export function pageUrl(locale: Locale): string {
  return absoluteUrl(pathOf(locale));
}
