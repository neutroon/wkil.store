import { getContent } from '@/content';
import { MONTHLY_CAP, PER_ORDER } from '@/content/pricing';
import { BRAND_NAME } from '@/lib/brand';
import { LOCALES, otherLocale, type Locale } from '@/lib/locale';
import { absoluteUrl, pageUrl, SITE_URL } from '@/lib/site';

const ORGANIZATION_ID = `${SITE_URL}/#organization`;
const WEBSITE_ID = `${SITE_URL}/#website`;
const APP_ID = `${SITE_URL}/#app`;

/**
 * Structured data for search engines: the company, the site and the product with its price.
 * The price is what `src/content/pricing.ts` says: a fee per order placed, VAT included, with
 * a monthly ceiling on those fees. There is no subscription, so there is no monthly price.
 */
export function structuredData(locale: Locale) {
  const { meta } = getContent(locale);
  const name = BRAND_NAME[locale];
  const alternateName = BRAND_NAME[otherLocale(locale)];

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': ORGANIZATION_ID,
        name,
        alternateName,
        url: pageUrl(locale),
        logo: absoluteUrl('/apple-touch-icon.png'),
        areaServed: { '@type': 'Country', name: 'Egypt', identifier: 'EG' },
      },
      {
        '@type': 'WebSite',
        '@id': WEBSITE_ID,
        name,
        alternateName,
        url: pageUrl(locale),
        inLanguage: LOCALES.map((l) => (l === 'ar' ? 'ar-EG' : 'en')),
        publisher: { '@id': ORGANIZATION_ID },
      },
      {
        '@type': 'SoftwareApplication',
        '@id': APP_ID,
        name,
        alternateName,
        url: pageUrl(locale),
        description: meta.description,
        applicationCategory: 'BusinessApplication',
        applicationSubCategory: 'E-commerce store builder',
        operatingSystem: 'Web',
        inLanguage: locale === 'ar' ? 'ar-EG' : 'en',
        areaServed: { '@type': 'Country', name: 'Egypt', identifier: 'EG' },
        provider: { '@id': ORGANIZATION_ID },
        offers: {
          '@type': 'Offer',
          url: `${pageUrl(locale)}#pricing`,
          price: PER_ORDER,
          priceCurrency: 'EGP',
          areaServed: { '@type': 'Country', name: 'Egypt', identifier: 'EG' },
          priceSpecification: [
            {
              '@type': 'UnitPriceSpecification',
              name: locale === 'ar' ? 'رسوم كل طلب' : 'Fee per order placed',
              price: PER_ORDER,
              priceCurrency: 'EGP',
              valueAddedTaxIncluded: true,
              referenceQuantity: { '@type': 'QuantitativeValue', value: 1, unitText: 'order' },
            },
            {
              '@type': 'UnitPriceSpecification',
              name: locale === 'ar' ? 'أقصى رسوم في الشهر' : 'Monthly ceiling on order fees',
              maxPrice: MONTHLY_CAP,
              priceCurrency: 'EGP',
              valueAddedTaxIncluded: true,
              referenceQuantity: { '@type': 'QuantitativeValue', value: 1, unitCode: 'MON' },
            },
          ],
        },
      },
    ],
  };
}

/** Serialised for a <script> tag: `<` is escaped so no string can close the tag. */
export function serializeJsonLd(data: unknown): string {
  return JSON.stringify(data).replace(/</g, '\\u003c');
}

export function JsonLd({ locale }: { locale: Locale }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: serializeJsonLd(structuredData(locale)) }}
    />
  );
}
