# Landing design system

The contract for every section of the landing page. Tokens live in `src/app/globals.css`, primitives in `src/components/ui` (import from `@/components/ui`). If something you need is not here, add it to the system first, then use it.

## 1. Direction

The landing is the admin's public face: the same deep teal, the same ink, the same teal-grey neutrals, the same store icon in a soft teal tile. What marketing adds is voice. Headings are large, set in an Arabic face with real character, and always start at the start edge (right in Arabic), never centred by default. The page is white with one or two full-width ink sections for rhythm. Colour is quiet everywhere except inside product visuals, where the merchant's own shop appears in warm tones (saffron, sand, clay): the platform is cool and calm, the shop it carries is warm. One shape is ours alone, the **order slip** (`Ticket`): an order is what the merchant sells and what they pay for, so the order card and the price are both drawn as one.

What we don't do: gradients, glows, stock photos, illustrations of people, centred hero text, letter-spaced or upper-case labels, arrows on buttons, a shadow under every card, or a different corner radius per engineer.

## 2. Rules that hold everywhere

1. **Tokens only.** Tailwind's palette, type scale, radii, shadows, `tracking-*` and `leading-*` are switched off. `bg-blue-500`, `text-sm`, `rounded-3xl`, `shadow-lg`, `tracking-tight` produce nothing. No hex values and no arbitrary colours in components.
2. **Logical properties only.** `ps- pe- ms- me- start- end- text-start text-end border-s border-e rounded-s rounded-e`. Never `pl- pr- ml- mr- left- right- text-left text-right`. Icons that point somewhere (arrows, chevrons, a truck) are mirrored with the primitive's `flip`/`flipIcon`/`arrow` prop; logos, checks and clocks never are.
3. **Type comes from the scale** (section 4). One utility sets size, line height, tracking and weight for the language it is in. Don't add `leading-*` or `tracking-*` on top. Arabic is never letter-spaced.
4. **Numbers are Latin digits** (`0-9`) in both languages, drawn by the Latin face. Money goes through `Money`/`formatMoney`: `350 ج.م` in Arabic, `EGP 350` in English. Add `nums` wherever digits should line up.
5. **Tone, not colour.** A section sets `data-tone` (through `Section`); text, lines, tiles, focus rings and the secondary and ghost buttons read the tone on their own. Never write `text-white` to fix text on ink: use `text-fg`, `text-fg-muted`, `text-accent`.
6. **`className` adds, it does not override.** `cn` does not merge classes. Pick a primitive's look with its props; use `className` for layout (margins, grid placement, width). To hide a primitive at a breakpoint, wrap it: `<span className="hidden sm:block"><ButtonLink …/></span>`.
7. **Touch targets are 44px or more.** The primitives already are. Anything you make clickable needs `min-h-11`.
8. **Focus is the global ring** (2px, the tone's `ring` colour, 3px clear). Don't remove or restyle it.
9. **Motion**: only what section 7 lists.
10. **Wording**: in Arabic, "وكيل" never directly follows "متجر" or "متجرك" except in the brand name itself (`BRAND_NAME`, "متجر وكيل").

## 3. Colour tokens

Use as `bg-*`, `text-*`, `border-*`. Contrast ratios are WCAG 2.x; text needs 4.5:1, control edges 3:1.

### Surfaces and brand (fixed)

| Token | Value | Use | Checked pairings |
|---|---|---|---|
| `canvas` | `#ffffff` | The page, default sections, device screens | `fg` 16.7, `fg-muted` 5.3, `accent` 5.2 |
| `mist` | `#f3f6f5` | Muted sections, the default stage | `fg` 15.4, `fg-muted` 4.9, `accent` 4.8 |
| `ink` | `#0f1f1d` | Ink sections, footer, device bezels | ink `fg` 15.6, ink `fg-muted` 9.6, `mint` 9.3 |
| `ink-raised` | `#182c29` | A card on ink (this is `surface` on ink) | ink `fg` 13.4, ink `fg-muted` 8.2, `mint` 8.1 |
| `brand` / `brand-hover` | `#0b7a6e` / `#086358` | Primary button fill | `brand-on` (white) 5.2 / 7.2 |
| `brand-soft` / `brand-soft-fg` | `#eaf6f3` / `#086358` | Soft teal surface and the text on it | 6.5 (`fg` 15.1, `fg-muted` 4.8) |
| `mint` / `mint-hover` | `#5fd3bc` / `#7fe0cb` | The on-ink button fill | `mint-on` `#06201b` 9.4 / 10.9 |
| `white` | `#ffffff` | Only where a token above doesn't apply (the skip link) | |

### Tone-aware (what components should reach for)

| Token | Light (default, muted, light) | Ink | Use |
|---|---|---|---|
| `fg` | `#15201f` | `#f1f6f5` | Text |
| `fg-muted` | `#5f6e6b` | `#b4c6c2` | Secondary text. Not on `chat-canvas` (4.4): use `chat-meta` there |
| `accent` | `#0b7a6e` | `#5fd3bc` | Brand-coloured text and icons, eyebrows, links |
| `accent-soft` | `#eaf6f3` | mint at 12% | Icon tiles, brand badges, soft cards, hover fill |
| `surface` | `#ffffff` | `#182c29` | Cards |
| `line` | `#dfe5e4` | white at 12% | Hairlines and decorative borders |
| `line-strong` | `#7f918d` | `#6f8581` | A control's own edge (secondary button): 3.3 on canvas, 3.1 on mist, 4.3 on ink |
| `ring` | `#0b7a6e` | `#5fd3bc` | Focus ring: 5.2 on canvas, 9.3 on ink |

`data-tone` values: `default`, `muted`, `ink` (sections), `light` (resets to light inside an ink section; device screens, `Ticket` and raised cards set it themselves).

### Only inside product visuals

| Token | Value | Use | Checked pairings |
|---|---|---|---|
| `info-soft` / `info-fg` | `#e6f0fa` / `#1f5088` | Status "new" | 7.1 |
| `success-soft` / `success-fg` | `#e6f5ec` / `#166437` | Status "delivered" | 6.4 |
| `warning-soft` / `warning-fg` | `#fdf1d9` / `#8a5300` | Status "pending" | 5.7 |
| `shipped-soft` / `shipped-fg` | `#ece9fa` / `#4f3fa8` | Status "shipped" | 6.8 |
| `danger-soft` / `danger-fg` | `#fdeaea` / `#a82b2b` | Status "cancelled" | 6.0 |
| `neutral-soft` / `neutral-fg` | `#eceff1` / `#4c5a5f` | Neutral chip | 6.2 |
| `shop` / `shop-on` | `#f0b345` / `#15201f` | The depicted store's own brand colour: its buttons | 8.9 |
| `shop-fg` | `#7a5200` | Shop-coloured text (prices) | 6.9 on canvas, 6.3 on `shop-soft` |
| `shop-soft` | `#fdf3dc` | Soft shop surface | |
| `swatch-sand`, `-clay`, `-sage`, `-sky` | `#ecdcc3` `#e3b79b` `#c3cfb4` `#b9d3da` | Drawn "product photos". No text on them except `fg` (9.2 or more) | |
| `chat-canvas` | `#efe9e0` | Chat background | |
| `chat-out` / `chat-in` | `#d9fdd3` / `#ffffff` | The store's bubble / the shopper's | `chat-fg` `#111b21` 15.8; `chat-meta` `#54656f` 5.5 / 6.1 |
| `chat-tick` | `#53bdeb` | Read ticks (decorative) | |

Order statuses map to badge tones: new `info`, confirmed `brand`, shipped `shipped`, delivered `success`, pending `warning`, cancelled `danger`.

## 4. Type

**Arabic: Alyamama** (weights 300 to 900, variable). A modern naskh with tapered strokes: it has a voice at 72px and stays open and readable at 15px. **Latin and all digits: Instrument Sans** (400 to 700, variable), a crisp grotesque whose proportions match. The stack is Latin first, then Arabic, so digits and Latin words are always Instrument Sans. Both load through `next/font/google` in `src/lib/fonts.ts`; root layouts put `style={fontFamilies}` on `<html>` (see the comment there on why the stack holds only each family's own name).

Sizes are fluid between a 390px and a 1280px screen. Line height, tracking and weight switch with `lang`, including a `lang="en"` run inside the Arabic page.

| Utility | Use | Arabic size (390 → 1280) | Arabic line height / weight | English size | English line height / tracking / weight |
|---|---|---|---|---|---|
| `text-display` | The hero's `h1`, once | 40 → 72px | 1.25 / 800 | 42 → 76px | 1.02 / -0.03em / 700 |
| `text-title` | Section `h2` | 30 → 48px | 1.3 / 800 | 30 → 48px | 1.08 / -0.025em / 700 |
| `text-heading` | Feature-row `h3`, large values | 24 → 32px | 1.4 / 800 | 24 → 32px | 1.16 / -0.02em / 700 |
| `text-subheading` | Card and step titles, FAQ questions, large buttons | 19 → 21px | 1.5 / 700 | 18 → 20px | 1.3 / -0.01em / 600 |
| `text-lede` | The paragraph under a heading | 19 → 21px | 1.75 / 400 | 18 → 20px | 1.5 / 0 / 400 |
| `text-body` | Default (set on `body`) | 17px | 1.8 / 400 | 16px | 1.6 / 0 / 400 |
| `text-small` | Notes, footer, mock-UI text | 15px | 1.7 | 14px | 1.5 |
| `text-micro` | Badges, captions, mock-UI labels. Nothing smaller exists | 13px | 1.6 | 12px | 1.4 |
| `text-figure` | The price | 48 → 80px | 1 / 800 | 48 → 80px | 1 / -0.04em / 700 |

Weights: `font-normal` 400, `font-medium` 500 (links), `font-semibold` 600 (buttons, badges, labels), `font-bold` 700. Headings wrap with `text-wrap: balance`, paragraphs with `pretty`. Keep paragraphs to `max-w-[36rem]` (ledes) or `max-w-[40rem]` (body). Colour: headings `text-fg`, ledes and supporting text `text-fg-muted`.

## 5. Space, grid, shape, elevation

- **Container**: `page` 1200px, `prose` 720px. Gutter `px-gutter`: 20px at 390, 40px from about 1130.
- **Section rhythm**: `py-section` 64 → 128px; `py-section-compact` 48 → 80px. Header to content: `mt-header-gap` 40 → 64px (`Section` does it).
- **Grid**: one column below `lg` (1024px). From `lg`: `grid lg:grid-cols-12 gap-x-8`. Card grids: 1 column, 2 from `sm` (640px), 3 from `lg`, `gap-x-8`. Vertical gaps inside a block step in 4, 8, 12, 16, 24, 32, 40px.
- **Breakpoints**: Tailwind's `sm` 640, `md` 768, `lg` 1024, `xl` 1280. Design at 390 first.
- **Radius by rank**: `rounded-sm` 8px chips and fields in mock UI; `rounded-md` 12px buttons, icon tiles, swatches; `rounded-lg` 16px cards, tickets, browser frames; `rounded-xl` 24px stages; `rounded-2xl` 32px reserved for a full-width slab; `rounded-device` 44px and `rounded-screen` 34px phones.
- **Elevation**: content is flat (hairline `border-line`, no shadow). Shadows mean "this is an object from the product": `shadow-card` chat bubbles, `shadow-raised` mock-UI cards floating on a stage, `shadow-device` device frames, `drop-shadow-ticket` the ticket. All are ink-tinted.

## 6. Product visuals

No photographs. Every visual is HTML and CSS built from: `Stage` (the backdrop), `PhoneFrame` / `BrowserFrame` (always light inside), `Card variant="raised"`, `Ticket`, `ChatBubble`, `Badge`, `ProductSwatch`, `Money`, lucide icons.

- A visual always stands on a `Stage`. Stage tone: `mist` on white sections, `canvas` on muted sections, `soft` or `ink` when one visual should stand out.
- One device per stage, plus at most two floating objects (a ticket, a chat, a raised card) overlapping its edge by 16 to 64px. Float them with `absolute` and logical offsets; they may hang over the stage's edge from `sm`, never outside the page at 390.
- Inside a device: `text-small` and `text-micro` only, real words (no grey bars), 16px padding, `rounded-sm`/`rounded-md` shapes, `border-line` hairlines.
- The depicted shop is warm: its buttons are `bg-shop text-shop-on`, its prices `text-shop-fg`, its products `ProductSwatch`. Teal never appears inside the depicted storefront; that is how the reader tells the shop from the platform. Admin-side objects (the order card) use the admin's status badges.
- The same demo data everywhere: shop "بيت القطن" / "Cotton House", order `#1042`, a 350 product, 50 shipping, 400 total, Cairo.
- Frames are `role="img"` with a `label`: write one sentence saying what the picture shows.

## 7. Motion

CSS only, and all of it is off under `prefers-reduced-motion`.

- **One entrance**: the hero. `animate-rise` (fade and 12px rise, 640ms) with `stagger-0` to `stagger-4` (90ms steps) on heading, lede, actions, note, visual. Nothing else animates on load or on scroll.
- **Answers to actions**: buttons and links change colour in 150ms and sink 1px when pressed; `Disclosure` turns its plus 45° and, where the browser can, slides open in 260ms.
- No hover lift on cards, no parallax, no looping animation.

## 8. Primitives

```tsx
import { Section, ButtonLink /* … */ } from '@/components/ui';
```

All are server components. `className` is accepted everywhere (see rule 6).

### Container
`size?: 'page' | 'prose'` (default `page`), `as?`.
```tsx
<Container className="flex h-header items-center justify-between">…</Container>
```

### Section, SectionHeader
`Section`: `id?`, `tone?: 'default' | 'muted' | 'ink'`, `spacing?: 'default' | 'compact'`, `width?: 'page' | 'prose'`, `eyebrow?`, `title?`, `lede?`, `header?: 'stack' | 'split' | 'center'`, `aria-label?`. With `title` and `id` it wires `aria-labelledby`. Without `title`, give `aria-label`.
`SectionHeader` (for a header placed by hand, e.g. in a feature row): `title`, `eyebrow?`, `lede?`, `as?: 'h1' | 'h2' | 'h3'`, `size?: 'display' | 'title' | 'heading'`, `layout?`, `id?`.
```tsx
<Section id="pricing" tone="ink" eyebrow="الأسعار" title="…" lede="…" header="split">…</Section>
```
`stack` is the default. `split` (heading 7 columns, lede 5, from `lg`) when the lede is one or two sentences. `center` only where section 9 says so.

### ButtonLink
`href`, `variant?: 'primary' | 'secondary' | 'ghost' | 'on-ink'`, `size?: 'md' | 'lg'` (44px / 52px), `icon?: LucideIcon`, `iconPosition?: 'start' | 'end'`, `flipIcon?`, `external?`, `hrefLang?`, `lang?`, `aria-label?`.
```tsx
<ButtonLink href={SIGN_UP_URL} size="lg">ابدأ متجرك</ButtonLink>
<ButtonLink href="#pricing" size="lg" variant="secondary">شوف الأسعار</ButtonLink>
```
One `primary` per view on light, one `on-ink` per ink section; `secondary` and `ghost` work on every tone. Labels say what happens and carry no arrow.

### TextLink
`href`, `inline?` (inside a sentence), `arrow?` (points the way the text reads), `quiet?` (navigation and footer), `external?`, `hrefLang?`, `lang?`, `aria-current?`.
```tsx
<TextLink href="#faq" quiet>الأسئلة</TextLink>
<TextLink href="#landing-pages" arrow>اعرف أكتر</TextLink>
```

### Eyebrow, Badge
`Eyebrow`: children. Only when it says something the heading doesn't. `Badge`: `tone?: 'brand' | 'neutral' | 'info' | 'success' | 'warning' | 'shipped' | 'danger'`, `dot?`. Status tones belong on light surfaces.
```tsx
<Badge tone="info" dot>جديد</Badge>
```

### Card
`variant?: 'flat' | 'raised' | 'soft'`, `padding?: 'none' | 'sm' | 'md' | 'lg'`, `as?`. `flat` for content (follows the tone), `raised` for mock-UI objects (always light), `soft` for a quiet callout.
```tsx
<Card padding="lg">…</Card>
```

### IconTile
`icon?: LucideIcon` or `label?: string` (a step number), `size?: 'sm' | 'md' | 'lg'` (36 / 44 / 56px), `solid?`, `flip?`.
```tsx
<IconTile icon={Truck} flip />
<IconTile label="1" solid />
```

### BrandMark
`locale`, `size?: 'sm' | 'md'`, `link?` (to the locale's home). Name from `src/lib/brand.ts`.
```tsx
<BrandMark locale="ar" link />
```

### Stage
`tone?: 'mist' | 'soft' | 'canvas' | 'ink'`. Centres its child; `relative`, so floating objects position against it.

### PhoneFrame, BrowserFrame
`PhoneFrame`: `label`, `size?: 'md' | 'sm'` (296 / 248px wide, 9:19.5 screen, content cut at the bottom). `BrowserFrame`: `label`, `url?` (no scheme, always left to right).
```tsx
<Stage>
  <PhoneFrame label="متجر بيت القطن على الموبايل">…</PhoneFrame>
  <div className="absolute start-2 bottom-6 sm:-start-8"><Ticket stub={…}>…</Ticket></div>
</Stage>
```

### Ticket
`stub` (below the tear line), children (above). Only for an order or its price; at most twice on the page (the hero's order card and the price).
```tsx
<Ticket stub={<Money amount={400} locale={locale} />}>طلب #1042 …</Ticket>
```

### ChatBubble, ProductSwatch
`ChatBubble`: `side: 'in' | 'out'`, `time?`, `read?`; stack in `flex flex-col gap-2 rounded-lg bg-chat-canvas p-3`. `ProductSwatch`: `tone: 'sand' | 'clay' | 'sage' | 'sky'`, `icon?`; size it with `className` (`aspect-square`).

### CheckList, CheckItem
`CheckList`: `columns?: 1 | 2`. Works on every tone.
```tsx
<CheckList><CheckItem>نموذج الطلب في نفس الصفحة</CheckItem></CheckList>
```

### Stat
`value`, `unit?`, `unitFirst?` (English money), `label?`, `size?: 'lg' | 'md'`.
```tsx
<Stat value="5" unit={currencyLabel(locale)} unitFirst={locale === 'en'} label="على كل طلب" />
```

### Money, formatMoney, formatNumber, currencyLabel
`<Money amount={350} locale="ar" />` → `350 ج.م`; `locale="en"` → `EGP 350`. Amounts are pounds. `formatMoney(amount, locale)` is a pure function, safe in the calculator's client component.

### Disclosure
`summary`, `name?` (one open at a time within the same name), `open?`. Native `<details>`.

### SkipLink
First child of `<body>` content: `<SkipLink>انتقل للمحتوى</SkipLink>`, with `<main id="main">`.

## 9. Section layouts

Order and tone: header, hero (default), steps (muted), feature rows (default), feature grid (muted), pricing (ink), FAQ (default), closing band (ink), footer (ink). Two ink regions: pricing, and the ending.

**Header.** `<header className="sticky top-0 z-40 border-b border-line bg-canvas/90 backdrop-blur">` with a `Container` of `h-header` (64px), `flex items-center justify-between gap-6`. Start: `BrandMark link`. Middle, from `lg` only: `nav` of `TextLink quiet` with `gap-7` (how it works, features, pricing, questions). End: the language link (`ButtonLink variant="ghost"`, with `lang` and `hrefLang` of the other language, labelled in that language) and sign in (`ghost`), both wrapped in `hidden sm:block`, then the start button (`primary`, `md`). Below `sm` only the mark and the start button remain; the language link and sign in move to the footer. No menu button, no script.

**Hero.** A plain `<section data-tone="default">`, `pt-12 lg:pt-20 pb-section`, `Container` with `grid items-center gap-x-8 gap-y-14 lg:grid-cols-12`. Text in `lg:col-span-7`, start-aligned: `h1.text-display max-w-[13em]`, `p.text-lede.text-fg-muted max-w-[34rem] mt-6`, actions `mt-8 flex flex-wrap gap-3` (primary `lg` then secondary `lg`), one `text-small text-fg-muted` note `mt-5`. Visual in `lg:col-span-5`: a `Stage` (mist) holding a `PhoneFrame` of the storefront, with the order `Ticket` (`w-64`) overlapping its start-bottom corner. No eyebrow, no badge above the heading, no stats row. The entrance sequence of section 7 lives here. Below `lg` the visual follows the text.

**How it works.** `Section tone="muted" header="split"`, then `<ol className="grid gap-x-8 gap-y-10 md:grid-cols-3">`. Each `li`: `border-t-2 border-line pt-6` (the first `border-brand`), `IconTile label="1"` (the first `solid`), `h3.text-subheading mt-5`, `p.text-fg-muted mt-2`. Numbers are right here because it is a sequence; three steps, no connecting arrows.

**Feature rows.** One `Section` (default tone) per row, or one section with rows `gap-y-section` apart. Row: `grid items-center gap-x-8 gap-y-10 lg:grid-cols-12`. Text `lg:col-span-5`: `SectionHeader as="h3" size="heading"` (eyebrow allowed: it names the feature), `CheckList mt-6` of at most four items, optional `TextLink arrow`. Visual `lg:col-span-7`: a `Stage` (`min-h-[22rem] lg:min-h-[30rem]`). Alternate with `lg:order-first` on the visual of every second row; on small screens text always comes first. Vary the stage tone at most once (`soft` or `ink` for the row that matters most).

**Feature grid.** `Section tone="muted"` (stack header), then `<ul className="grid gap-x-8 sm:grid-cols-2 lg:grid-cols-3">`. Each `li`: `flex gap-4 border-t border-line py-6`, `IconTile` (md), `h3.text-subheading`, `p.text-fg-muted mt-1`. Open rows on hairlines, not boxes: no cards, no shadows, six or nine items.

**Pricing.** `Section id="pricing" tone="ink" header="split"`. Content `grid items-start gap-8 lg:grid-cols-12`. Start, `lg:col-span-5`: the price as a `Ticket`: body `Stat` (the per-order price, `text-figure`) and a `CheckList` of what is included; stub: the monthly cap (label at start, `Money` in `text-heading` at end). End, `lg:col-span-7`: the calculator in `Card padding="lg"` (flat; on ink it is `ink-raised`): an `h3.text-subheading`, a native `<input type="range">` (orders per month) with a visible label and the value beside it, then results in a `grid grid-cols-2 gap-6 border-t border-line pt-6` of `Stat size="md"` (orders, what you pay), with a line saying when the cap applies. The range: `accent-color: var(--color-mint)`, track height 44px hit area, `aria-valuetext` through `formatMoney`; results in an `aria-live="polite"` region. It is the page's only client component. One `on-ink` button under the calculator. Numbers come from `src/content`, never typed into the section.

**FAQ.** `Section width="prose"` (stack header), then a plain `div` of `Disclosure name="faq"`, the first `open`. Answers are `text-body text-fg-muted`, two to four sentences.

**Closing band.** `Section tone="ink" spacing="compact"`, no eyebrow. `grid items-center gap-8 lg:grid-cols-12`: `SectionHeader` (title only, or with a one-line lede) in `lg:col-span-8`, one `ButtonLink variant="on-ink" size="lg"` in `lg:col-span-4 lg:justify-end` (`flex`). Nothing else.

**Footer.** `<footer data-tone="ink" className="border-t border-line bg-ink py-10">`, directly after the band so the page ends in one ink block. `Container` with `flex flex-wrap items-center justify-between gap-x-8 gap-y-4`: `BrandMark size="sm"`, a `nav` of `TextLink quiet` (section anchors, sign in, the other language), and `p.text-small.text-fg-muted.nums` for the copyright line.

## 10. Before you open a pull request

- Arabic and English at 390 and 1440: no sideways scroll, nothing clipped, headings break well.
- Tab through: every link shows the ring, nothing hides under the sticky header.
- Search your diff for `left`, `right`, `pl-`, `pr-`, `ml-`, `mr-`, `#`, `text-white`, `leading-`, `tracking-`.
- `pnpm lint && pnpm typecheck && pnpm build`.
