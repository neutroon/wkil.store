/**
 * The landing page's content contract. src/content/ar.ts and en.ts fill it (owned by the
 * copywriter); the section components in src/components/sections render it (owned by the
 * engineers). Prices are never written in copy as literals: they come from ./pricing.ts, and
 * copy that needs one uses the placeholders {perOrder}, {cap}, {capOrders}, {freeMonths},
 * {cancelDays}, {cancelPercent}, filled by `fill()` in ./index.ts.
 */

export type Link = { label: string; href: string };

/** Icons available to copy, mapped to lucide icons in the sections. */
export type IconKey =
  | 'cash'
  | 'truck'
  | 'map'
  | 'megaphone'
  | 'layers'
  | 'cart'
  | 'target'
  | 'bot'
  | 'whatsapp'
  | 'globe'
  | 'phone'
  | 'zap'
  | 'shield'
  | 'printer'
  | 'list'
  | 'move';

export type Content = {
  meta: {
    /** <title>, about 60 characters. */
    title: string;
    /** Meta description, 140–160 characters. */
    description: string;
    /** Social preview title and description, may be shorter. */
    ogTitle: string;
    ogDescription: string;
  };

  nav: {
    /** In-page links in the header, in order: how it works, features, pricing, questions. */
    links: Link[];
    signIn: string;
    cta: string;
    /** The link to the other language, written in that language ("English" / "العربية"). */
    otherLanguage: string;
    skipToContent: string;
    /** Accessible name of the header's navigation. */
    navLabel: string;
  };

  hero: {
    eyebrow: string;
    title: string;
    lede: string;
    primaryCta: string;
    /** Scrolls to pricing. */
    secondaryCta: string;
    /** Small line under the buttons (e.g. "no card, no subscription"). */
    note: string;
    /** Strings drawn inside the product visual (a phone showing a demo shop and an order). */
    visual: {
      shopName: string;
      productName: string;
      /** Price in pounds of the demo product. */
      productPrice: number;
      /** Delivery to `governorate`, in pounds: the slip's cash-on-delivery total is the two added. */
      deliveryPrice: number;
      orderButton: string;
      orderLabel: string;
      governorate: string;
      cashOnDelivery: string;
      newOrder: string;
    };
  };

  steps: {
    id: 'how';
    eyebrow: string;
    title: string;
    lede: string;
    /** Exactly three. */
    items: { title: string; body: string }[];
  };

  /** Alternating rows, each with a product visual. Three to four rows. */
  features: {
    id: 'features';
    eyebrow: string;
    title: string;
    lede: string;
    rows: {
      key: 'checkout' | 'landing' | 'recover' | 'assistant';
      eyebrow: string;
      title: string;
      body: string;
      points: string[];
      /** Strings drawn inside the row's visual. */
      visual: Record<string, string>;
    }[];
  };

  /** The rest of what a merchant gets, as a grid. Six to nine items. */
  grid: {
    title: string;
    lede: string;
    items: { icon: IconKey; title: string; body: string; soon?: boolean }[];
    /** Label on items marked soon. */
    soonLabel: string;
  };

  pricing: {
    id: 'pricing';
    eyebrow: string;
    title: string;
    lede: string;
    /** Under the big per-order price, e.g. "per order placed". */
    perOrderLabel: string;
    /** E.g. "never more than {cap} a month". */
    capLabel: string;
    /** What's included / what's not charged. */
    points: string[];
    calculator: {
      title: string;
      ordersLabel: string;
      /** E.g. "orders a month". */
      ordersUnit: string;
      resultLabel: string;
      /** Shown when the cap applies, e.g. "You've reached the cap: every order after {capOrders} is on us." */
      cappedNote: string;
      /** Average per order at this volume. */
      averageLabel: string;
    };
    /** The cancellation rule, in plain words, with its limits. */
    cancellationNote: string;
    /** VAT included, billed monthly, etc. */
    finePrint: string;
    cta: string;
  };

  moving: {
    eyebrow: string;
    title: string;
    body: string;
    points: string[];
  };

  faq: {
    id: 'faq';
    eyebrow: string;
    title: string;
    items: { q: string; a: string }[];
  };

  closing: {
    title: string;
    lede: string;
    cta: string;
    note: string;
  };

  footer: {
    tagline: string;
    /** Footer columns. Links may be in-page (#pricing) or the admin. */
    columns: { title: string; links: Link[] }[];
    /** "{year}" is replaced with the current year. */
    copyright: string;
  };
};
