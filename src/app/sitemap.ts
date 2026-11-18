import type { MetadataRoute } from 'next';
import { LOCALES } from '@/lib/locale';
import { pageUrl } from '@/lib/site';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const languages = Object.fromEntries(LOCALES.map((locale) => [locale, pageUrl(locale)]));
  return LOCALES.map((locale) => ({
    url: pageUrl(locale),
    changeFrequency: 'weekly',
    priority: locale === 'ar' ? 1 : 0.8,
    alternates: { languages },
  }));
}
