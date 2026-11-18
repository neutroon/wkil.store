import type { Metadata, Viewport } from 'next';
import { getContent } from '@/content';
import { BRAND_NAME } from './brand';
import { DEFAULT_LOCALE, LOCALES, type Locale } from './locale';
import { pageUrl, SITE_URL } from './site';
import { OG_SIZE, SOCIAL_COPY, socialImagePath } from './social';

const OG_LOCALE: Record<Locale, string> = { ar: 'ar_EG', en: 'en_US' };

/** The brand teal (`--color-brand`), for the browser's toolbar. */
export const THEME_COLOR = '#0b7a6e';

/** Shared by both root layouts. */
export const viewport: Viewport = {
  themeColor: THEME_COLOR,
  colorScheme: 'light',
};

/**
 * The page's metadata in a locale: title, description, canonical, hreflang alternates
 * (x-default is Arabic, the site's default), Open Graph and the Twitter card. The social
 * image is drawn at build time by src/app/social/<locale>.png/route.tsx.
 */
export function pageMetadata(locale: Locale): Metadata {
  const { meta } = getContent(locale);
  const url = pageUrl(locale);
  const image = { url: socialImagePath(locale), ...OG_SIZE, alt: SOCIAL_COPY[locale].alt, type: 'image/png' };
  const languages: Record<string, string> = Object.fromEntries(LOCALES.map((l) => [l, pageUrl(l)]));
  languages['x-default'] = pageUrl(DEFAULT_LOCALE);

  return {
    metadataBase: new URL(SITE_URL),
    title: meta.title,
    description: meta.description,
    applicationName: BRAND_NAME[locale],
    alternates: { canonical: url, languages },
    openGraph: {
      type: 'website',
      url,
      siteName: BRAND_NAME[locale],
      locale: OG_LOCALE[locale],
      alternateLocale: LOCALES.filter((l) => l !== locale).map((l) => OG_LOCALE[l]),
      title: meta.ogTitle,
      description: meta.ogDescription,
      images: [image],
    },
    twitter: {
      card: 'summary_large_image',
      title: meta.ogTitle,
      description: meta.ogDescription,
      images: [image],
    },
    icons: { apple: { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' } },
    formatDetection: { telephone: false },
  };
}
