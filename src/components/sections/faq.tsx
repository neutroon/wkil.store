import { Disclosure, Section } from '@/components/ui';
import type { Content } from '@/content/types';
import type { Locale } from '@/lib/locale';

/** The questions as schema.org FAQPage data. `<` is escaped so no answer can close the script. */
function faqJsonLd(items: Content['faq']['items'], locale: Locale): string {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    inLanguage: locale === 'ar' ? 'ar-EG' : 'en',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: { '@type': 'Answer', text: item.a },
    })),
  };
  return JSON.stringify(data).replace(/</g, '\\u003c');
}

export function Faq({ content, locale }: { content: Content; locale: Locale }) {
  const f = content.faq;
  return (
    <Section id={f.id} tone="muted" width="prose" eyebrow={f.eyebrow} title={f.title}>
      <div>
        {f.items.map((item, i) => (
          <Disclosure key={item.q} name="faq" open={i === 0} summary={item.q}>
            <p>{item.a}</p>
          </Disclosure>
        ))}
      </div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: faqJsonLd(f.items, locale) }} />
    </Section>
  );
}
