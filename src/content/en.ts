import type { Content } from './types';

// Placeholder copy so the page builds; the copywriter replaces all of it.
const t = 'TODO';

export const en: Content = {
  meta: { title: t, description: t, ogTitle: t, ogDescription: t },
  nav: {
    links: [
      { label: t, href: '#how' },
      { label: t, href: '#features' },
      { label: t, href: '#pricing' },
      { label: t, href: '#faq' },
    ],
    signIn: t, cta: t, otherLanguage: t, skipToContent: t, navLabel: t,
  },
  hero: {
    eyebrow: t, title: t, lede: t, primaryCta: t, secondaryCta: t, note: t,
    visual: { shopName: t, productName: t, productPrice: 350, orderButton: t, orderLabel: t, governorate: t, cashOnDelivery: t, newOrder: t },
  },
  steps: { id: 'how', eyebrow: t, title: t, lede: t, items: [{ title: t, body: t }, { title: t, body: t }, { title: t, body: t }] },
  features: {
    id: 'features', eyebrow: t, title: t, lede: t,
    rows: (['checkout', 'landing', 'recover', 'assistant'] as const).map((key) => ({ key, eyebrow: t, title: t, body: t, points: [t, t], visual: {} })),
  },
  grid: { title: t, lede: t, soonLabel: t, items: [{ icon: 'globe', title: t, body: t }, { icon: 'whatsapp', title: t, body: t, soon: true }] },
  pricing: {
    id: 'pricing', eyebrow: t, title: t, lede: t, perOrderLabel: t, capLabel: '{cap}', points: [t],
    calculator: { title: t, ordersLabel: t, ordersUnit: t, resultLabel: t, cappedNote: '{capOrders}', averageLabel: t },
    cancellationNote: t, finePrint: t, cta: t,
  },
  moving: { eyebrow: t, title: t, body: t, points: [t] },
  faq: { id: 'faq', eyebrow: t, title: t, items: [{ q: t, a: t }] },
  closing: { title: t, lede: t, cta: t, note: t },
  footer: { tagline: t, columns: [{ title: t, links: [{ label: t, href: '#pricing' }] }], copyright: '© {year}' },
};
