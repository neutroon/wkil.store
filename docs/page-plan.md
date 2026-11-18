# Page plan

The lead's brief for wave 2. Sources: `docs/product-facts.md` (what is true), `docs/positioning.md` (the market), `docs/design-system.md` (how it looks).

## Angle

Lead with the price model, because it is true today and nobody else in Egypt states it in pounds with a cap: **no subscription; you pay {perOrder} only when an order comes in, and never more than {cap} a month.** Second: everything an Egyptian cash-on-delivery seller needs is already set up on day one (27 governorates' delivery prices, landing pages for ads, offers, abandoned checkouts, Pixel and Conversions API).

WhatsApp order confirmation with Wkil is not open to merchants yet: it appears only as a grid item marked soon, never in the hero. Same for custom domains (built but closed) and staff accounts.

Never say "free", "free trial", "cancelled orders are free", or anything on the "Do NOT claim" list of `docs/product-facts.md`. No customer counts, no speed figures, no testimonials.

## Sections and owners

| # | Section | Component (`src/components/sections/`) | Tone | Owner |
|---|---|---|---|---|
| – | Header | `site-header.tsx` | default, sticky | shell engineer |
| 1 | Hero: promise, two buttons, phone with demo shop + order slip | `hero.tsx` | default | story engineer |
| 2 | How it works: 3 steps (sign up with phone + WhatsApp code → store created with delivery prices and pages → add products and share the link / run ads) | `steps.tsx` | muted | story engineer |
| 3 | Feature rows: checkout made for Egypt; landing pages for ads + offers; abandoned checkouts + Pixel/CAPI; connect an AI assistant | `features.tsx` | default | story engineer |
| 4 | Grid of the rest (orders and printing, categories, no platform branding, fast cached store, SEO, store isolation; soon: own domain, WhatsApp confirmation with Wkil) | `feature-grid.tsx` | muted | story engineer |
| 5 | Pricing: big per-order price, cap, calculator, cancellation rule, fine print | `pricing.tsx` (+ a client calculator) | ink | pricing engineer |
| 6 | Moving from another platform | `moving.tsx` | default | story engineer |
| 7 | FAQ (native `<details>`) | `faq.tsx` | muted | pricing engineer |
| 8 | Closing call to action | `closing.tsx` | ink | shell engineer |
| – | Footer | `site-footer.tsx` | ink | shell engineer |

Every section receives `{ content, locale }` and renders `content.<section>` (`src/content/types.ts`). The "start" buttons go to `SIGN_UP_URL`, sign-in to `SIGN_IN_URL` (`src/lib/site.ts`). Prices come only from `src/content/pricing.ts`.
