export const LOCALES = ['ar', 'en'] as const;
export type Locale = (typeof LOCALES)[number];

/** Arabic is the default and lives at the root; English is under /en. */
export const DEFAULT_LOCALE: Locale = 'ar';

export function dirOf(locale: Locale): 'rtl' | 'ltr' {
  return locale === 'ar' ? 'rtl' : 'ltr';
}

/** The page's path in a locale, with the trailing slash the static export serves. */
export function pathOf(locale: Locale): string {
  return locale === 'ar' ? '/' : '/en/';
}

export function otherLocale(locale: Locale): Locale {
  return locale === 'ar' ? 'en' : 'ar';
}
