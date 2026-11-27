# Product facts — the single source of truth for the landing page

Read from `/home/user/store-platform` on 18 November 2026 (last commit `b8a9f73`, "Merge pull request #64 from neutroon/deploy/production"). Nothing in that repository was changed, run or installed.

**How to read this file**

- Every path is relative to `/home/user/store-platform/` unless it starts with `/`.
- Every fact carries a source (`path:line`, or path + heading) and one of three marks:
  - **[code]** verified in code (the behaviour is in the source, a migration or a deploy file);
  - **[docs]** stated in a document only (an ADR, a runbook, `docs/architecture.md`), not checked against running code;
  - **[inferred]** my reading of several sources; treat as a claim to confirm.
- Where a document and the code disagree, both are named and the code is trusted. The disagreements are collected in section 9.
- Rule for copy: if a claim is not in sections 1 to 6, or is listed in section 7, do not write it.

---

## 1. One-paragraph truth

A merchant in Egypt signs in with their mobile number and a 6-digit code sent on WhatsApp (no password, no card, no email), types a store name and a link, and gets a store at `<handle>.wkil.store` in Arabic and RTL, created with a delivery price for each of the 27 governorates and four standard pages, as a draft they publish once it has a product. Shoppers order with cash on delivery only: product pages with options and quantity offers, a cart, a checkout that charges the governorate's delivery price, and one-product landing pages for ads with their own order form. The merchant runs orders (statuses, batches, A4 printing), customers, abandoned checkouts, Meta Pixel and Conversions API, and can connect an AI assistant (through MCP) and the separate WhatsApp product Wkil for order confirmation. There is no monthly fee and no trial: the store pays EGP 1.50 for each order a shopper places, at most EGP 5,000 a month (EGP 2,500 until 27 November 2026), billed monthly. As of this reading the platform is built and runs on staging, but production has not been run for real, no store is live on it, and three things a merchant would expect are not open yet: paying bills online (Paymob), custom domains (Cloudflare) and the Wkil connection (needs Wkil's side and a production switch).

Sources: `apps/admin/app/login/page.tsx:76`, `apps/admin/app/start/start-form.tsx:75-83`, `packages/core/src/provisioning/create-store.ts:43-58`, `packages/core/src/billing/pricing.ts:24-33`, `packages/db/prisma/schema.prisma:801`, `docs/adr/0021-production-digitalocean-cloudflare.md:3`, `docs/adr/0010-pricing-per-order.md:133` ("No store is live on this platform"), `apps/api/src/server.ts:74-75` and `:86-90`.

---

## 2. Naming

### 2.1 The product has a public name — but the repository mostly does not use it

| What | Value | Source | Mark |
|---|---|---|---|
| Public name, English | **Wkil Store** | `docs/adr/0020-oauth-connections.md:3` ("the platform's public name is "Wkil Store", "متجر وكيل"", owner's answer of 14 November 2026), `:153`, `:806`; `docs/integrations/wkil-connect.md:38`, `:49` ("settled by the owner"), `:63` | [docs] |
| Public name, Arabic | **متجر وكيل** | same; also the code comments `apps/admin/src/lib/billing-messages.ts:7` and `apps/admin/src/lib/wkil-connect-messages.ts:4`, and the tests `apps/admin/test/billing-messages.test.ts:145`, `apps/admin/test/wkil-connect-pages.test.ts:32` | [code] (as a rule the wording is tested against) |
| Working name | "Store platform" (repo `store-platform`, packages `@platform/*`) | `CLAUDE.md:1`, `README.md:1` | [code] |
| Stale statement | `README.md:3` still says "Working name until the product has one." This is older than the owner's decision; **the product does have a public name.** | `README.md:3` vs `docs/adr/0020-oauth-connections.md:3` | docs disagree; ADR 0020 and the code comments are later and win |
| How the admin brands itself | It shows **no product name at all.** The browser title is `لوحة التحكم`; the sign-in card has a generic shop icon and the title `تسجيل الدخول`; the sidebar header is the merchant's own store name. | `apps/admin/app/layout.tsx:13`; `apps/admin/src/components/layout/auth-layout.tsx:20-22`; `apps/admin/app/login/page.tsx:76`; `apps/admin/src/components/layout/app-sidebar.tsx:51` | [code] |
| Glossary's name for the admin | `لوحة التحكم` in Arabic, "Admin Panel" in English ("One product name") | `docs/reference/arabic-glossary.md:34`, `:222` | [docs] |
| Platform branding on a merchant's storefront | None. The footer shows the store's own name, contact and pages; a landing page's footer is "© year, store name". No "powered by". | `apps/storefront/src/components/store/site-footer.tsx:32-70`; `apps/storefront/app/~funnel/[host]/[slug]/page.tsx:331-335` | [code] |
| Logo, wordmark, brand colour of the platform itself | **Not found** in the repository. The admin's colour is "one deep-teal brand colour" inherited from the legacy admin. | `apps/admin/app/globals.css:6` | not found |

"متجر وكيل" appears in **no merchant-facing string** of the platform today — only in comments, tests and documents, and it is the name Wkil's own screens are told to use for the platform (`docs/integrations/wkil-connect.md:147`). [code: grep over `apps/` and `packages/`]

### 2.2 Domains

| Address | What | Source | Mark |
|---|---|---|---|
| `wkil.store` | the platform's domain | `docs/adr/0021-production-digitalocean-cloudflare.md:10` | [docs] |
| `https://<handle>.wkil.store` | every store's storefront | same; `docs/runbooks/deploy-production.md:14`; `deploy/production/Caddyfile` (block `{$PLATFORM_DOMAIN}, *.{$PLATFORM_DOMAIN}` → storefront) | [code] for the routing |
| `https://admin.wkil.store` | the merchant admin (sign-in, sign-up, store management) | `docs/runbooks/deploy-production.md:13`; `deploy/production/Caddyfile` (block `admin.{$PLATFORM_DOMAIN}`) | [code] |
| `https://api.wkil.store` | the API (Wkil's callbacks) | `docs/runbooks/deploy-production.md:15` | [docs] |
| `https://media.wkil.store` | product images | `.env.example:120` | [docs] |
| `stores.wkil.store` | the CNAME target merchants point their own domain at | `.env.example:94`; `docs/runbooks/deploy-production.md:315` | [docs] |
| `staging.wkil.store` | staging | `docs/adr/0021-production-digitalocean-cloudflare.md:10` | [docs] |

- `docs/architecture.md:40-49` writes the admin as `app.<domain>`. That is stale: the deploy files and ADR 0021 say `admin.<domain>`. Trust `admin.wkil.store`. [code: `deploy/production/Caddyfile`]
- The bare domain `wkil.store` is routed to the **storefront app** in production (`deploy/production/Caddyfile`, block `{$PLATFORM_DOMAIN}, *.{$PLATFORM_DOMAIN}`), where it is not a store and would show "الصفحة مش موجودة" (`apps/storefront/app/not-found.tsx:11-12`). `www`, `app`, `admin`, `api`, `blog`, `docs`, `help`, `support`, `status`, `store`, `stores`, `shop`, `login`, `signup` and others are reserved and cannot be a store's handle (`packages/shared/src/handles.ts:2-6`). **Where the landing page itself is served from is not decided in the repository** (section 9). [code]

### 2.3 How "Wkil / وكيل" relates

- **Wkil ("وكيل") is a separate product**, a WhatsApp product, with its own site and dashboard (`api.wkil.app`, `go.wkil.app`): `docs/integrations/wkil-connect.md:38`, `:107-108`. In this platform's screens it is always introduced as **"وكيل (تأكيد الطلبات على واتساب)"** — order confirmation on WhatsApp (`apps/admin/src/lib/wkil-connect-messages.ts:69`). [code]
- **What it does for a store here:** every new order is sent to the merchant's Wkil account; Wkil confirms it with the shopper on WhatsApp and can call back to confirm or cancel the order in the store; it is also how the merchant hears about a new order. Screen title: `تأكيد الطلبات مع وكيل`, description: `وكيل بيأكد كل طلب جديد مع العميل على واتساب، وبيبلّغك بيه.` (`apps/admin/app/s/[handle]/settings/wkil/page.tsx:26-27`; `docs/architecture.md:157`; `docs/migration-plan.md:53`, `:136`). [code + docs]
- **The platform also depends on Wkil itself:** merchants' sign-in codes and the owners' notices are WhatsApp messages sent from the platform's own Wkil business account through Wkil's API, and production refuses to start without it (`.env.example:78-88`; `docs/adr/0006-merchant-sign-in.md:11`). [code: `apps/api/src/config.ts` per ADR; docs]
- **Two names that must never be mixed** (the rule, tested): the platform is "Wkil Store / متجر وكيل"; the WhatsApp product is "Wkil / وكيل". Never write "متجر وكيل" in a sentence that also names the product; never call the merchant's shop "متجر وكيل بتاعك" / "your Wkil store" (it reads as the platform's name) — call the shop by its own name; the word "وكيل" for the product never directly follows "متجر" or "متجرك". (`docs/adr/0020-oauth-connections.md:153`; `docs/integrations/wkil-connect.md:147`; `apps/admin/test/billing-messages.test.ts:145-146`.) [code]
- The Wkil repositories on this machine (`/home/user/wkil-main-service`, `/home/user/wkil-app`, `/home/user/wkil-landing`) contain no mention of "Wkil Store", `WKIL_STORE` or the platform-messages endpoint. Wkil's own landing copy positions Wkil more broadly (an AI team: replies, WhatsApp messages, order confirmation) at `wkil.app` (`/home/user/wkil-landing/messages/ar/landing.json:3-13`). [inferred: Wkil's side of the connection is specified in `docs/integrations/wkil-connect.md` but not found built in the local copies]

---

## 3. Pricing, exactly

### 3.1 Every number

Source of the rule: `docs/adr/0010-pricing-per-order.md` (accepted 11 November 2026, revised 14 November 2026). Source of the numbers in code: `packages/core/src/billing/pricing.ts:24-33` and the plan row in `packages/db/prisma/migrations/20261112090000_order_billing/migration.sql:56-58` plus `packages/db/prisma/migrations/20261117090000_order_fee_placed/migration.sql` (the `UPDATE "plans"` that adds the 14 days and the 10%).

| What | Number | Source | Mark |
|---|---|---|---|
| Fee per order placed | **EGP 1.50** (`perOrderMinor: 150` piastres) | `packages/core/src/billing/pricing.ts:25`; ADR 0010 `:21` | [code] |
| Most a store pays in order fees in a month | **EGP 5,000** (`monthlyCapMinor: 500_000`; EGP 2,500 until 27 November 2026) | `pricing.ts:26`, `:47-49`; ADR 0010, "Revised 27 November 2026"; migration `20261202090000_monthly_cap_5000` | [code] |
| Monthly subscription fee | **None.** The `standard` plan's `price_minor` is 0 and a bill has one line, the order fees. | `migration.sql:57` (20261112090000); ADR 0010 `:144` | [code] |
| Trial | **None, and none needed**: "No trial: a store pays per order placed, so it costs nothing until it sells" | `packages/core/src/provisioning/create-store.ts:54` | [code] |
| Free order allowance (first N orders free) | **None.** Not in the pricing object. | `pricing.ts:5-22` | [code] |
| Minimum charge | **None.** A month with no orders has no ledger entries and gets no bill; a bill of EGP 0 is issued as paid. | `packages/core/src/jobs/billing.ts:30-36`, `:84`; ADR 0010 `:149` | [code] |
| Tiers | **None.** One plan, `standard`, for every store; "there are no plan limits to buy". Old `trial`/`basic`/`pro` plans are switched off. | `migration.sql:54-65` (20261112090000); ADR 0010 `:31` | [code] |
| VAT | The prices **include VAT** | `pricing.ts:3`; ADR 0010 `:19` (table header "Price (VAT included)") | [docs + code comment]; tax invoices are an open item, `docs/adr/0003-paymob-billing.md:25` |
| Free cancellations, the store's own | Free **up to 10% of the month's orders, rounded up** (`cancelAllowanceBps: 1000`), only for a cancellation **within 14 days** of the order (`cancelWindowDays: 14`) | `pricing.ts:31-32`, `:55-57`, `:60-62`; ADR 0010 `:23` | [code] |
| Free cancellations, the shopper's own through Wkil | **Free, without using the 10%**, within 14 days, only when Wkil is connected with the "ربط وكيل" flow and Wkil's callback says the shopper decided | `packages/core/src/billing/order-fees.ts:64-66`, `:96-99`; ADR 0010 `:22` | [code] — but the Wkil connection is not open yet (section 5) |
| Stores moved over from another platform | Order fees **free for the first 3 months** (`migrationFreeMonths: 3`), granted by platform staff, once per store; the merchant cannot grant it | `pricing.ts:29`; `packages/core/src/jobs/billing.ts:188-205`; ADR 0010 `:28`, `:151` | [code] |
| Enterprise | A store that passes **5,000 orders in a month** triggers an internal alert so staff can offer "prices agreed per store". Nothing changes automatically. | `pricing.ts:30`; `packages/core/src/jobs/billing.ts:134-149`; ADR 0010 `:29`, `:152` | [code] |
| AI add-on | EGP 299 a month, "billed once the feature exists" — **the feature does not exist** | `pricing.ts:10`, `:27`; ADR 0010 `:26`; `docs/migration-plan.md:180` | [code: a number only] |
| WhatsApp API messages | cost plus 10%, "billed once the feature exists" — **not built** | `pricing.ts:12-13`, `:28`; ADR 0010 `:27` | [code: a number only] |
| Custom domain | Included in the plan at no extra fee (`"customDomain": true` on `standard`) | `migration.sql:57` (20261112090000); `docs/adr/0011-custom-domains.md:15` | [code] — the feature is not open yet (section 5) |

Quoted source lines:

- `docs/adr/0010-pricing-per-order.md:9` — "**Every order a shopper places is charged, when it is placed.** The merchant confirms nothing. An order the merchant makes from an abandoned checkout is placed the same way and is charged. An imported order is never charged."
- `docs/adr/0010-pricing-per-order.md:11` — "**The merchant's own cancellations are free only up to 10% of the month's orders.** Above that they are charged. An order must be cancelled before it can be deleted, so deleting is never a second way to a credit."
- `docs/adr/0010-pricing-per-order.md:42` — "The cap applies last, to what is left after the credits."
- `packages/core/src/billing/pricing.ts:47-49` — `return Math.min(Math.max(orders, 0) * pricing.perOrderMinor, pricing.monthlyCapMinor);`
- `packages/core/src/billing/pricing.ts:55-57` — `return Math.ceil((Math.max(placed, 0) * pricing.cancelAllowanceBps) / 10_000);`
- The merchant's own billing page says it this way: `بتدفع على كل طلب يتطلب من متجرك.` and `كل طلب العميل بيعمله من متجرك بيتحسب أول ما يتطلب، سواء أكدته أو لأ` and `الحد الأقصى في الشهر 5,000 ج.م: مهما زادت طلباتك، مش هتدفع أكتر من كده.` (`apps/admin/src/lib/billing-messages.ts:170`, `:72`, `:174`). [code]

### 3.2 What counts as a billable order

| Case | Charged? | Source | Mark |
|---|---|---|---|
| A shopper places an order on the storefront checkout or a landing page | **Yes, at once**, whatever status it later gets (new, confirmed, shipped, delivered) | `packages/core/src/orders/orders.ts:432` (`recordOrderPlaced`, called for every placed order); `packages/core/src/billing/order-fees.ts:172-180` | [code] |
| The merchant turns an abandoned checkout into an order | **Yes** | ADR 0010 `:9`, `:50` | [code: same `placeOrder`] |
| An order left unconfirmed ("جديد") forever | **Yes** — confirmation plays no part | ADR 0010 `:7-9` | [code] |
| The merchant cancels it within 14 days | **Free while inside the month's 10% allowance** (earliest cancellations get it); charged above it | ADR 0010 `:23`, `:84`; `order-fees.ts:475-481` | [code] |
| The merchant cancels it more than 14 days after it was placed | **Charged** | ADR 0010 `:24`; `order-fees.ts:96-99` | [code] |
| The shopper **refuses the parcel at the door** / a return | There is **no "refused" or "returned" status** (statuses: pending, confirmed, processing, shipped, delivered, cancelled). The merchant can only cancel the order, so it is one of the store's own cancellations: free only within 14 days and inside the 10%. | `packages/shared/src/orders.ts:4`; ADR 0010 `:61` | [inferred from code] |
| The shopper cancels on WhatsApp through Wkil within 14 days | **Free**, only on a connection made by the "ربط وكيل" flow with `decidedBy: shopper`; a cancellation the merchant, an automation or support decided in Wkil counts as the store's own | `order-fees.ts:53-66`; ADR 0010 `:10` | [code] |
| A fake or duplicate order | **Charged like any other**; "No duplicate-order detection" | ADR 0010 `:13` | [docs] |
| A cancelled order that is deleted | No second credit; only a cancelled order can be deleted | ADR 0010 `:68` | [docs] |
| A cancelled order reopened | Charged again if its cancellation had lowered an issued bill | ADR 0010 `:69`, `:97` | [docs + code `order-fees.ts:334`] |
| An imported order (a store moved over) | **Never charged** | ADR 0010 `:9`, `:71`; `order-fees.ts:165-169` | [code] |
| An order placed in a moved store's free months | **Free**, and so is everything later written for it | ADR 0010 `:89` | [docs + code `order-fees.ts:177`] |
| The merchant's own test order on a live store | **Charged** — there is no test-order exemption; before publishing, a draft store cannot take orders at all (`store_not_live`) | `apps/api/src/routes/storefront.ts:211`; `orders.ts:432` | [inferred from code] |

Which month: an order belongs to the month it is placed in; a cancellation belongs to the month it is made in and uses that month's allowance (Cairo time). A month with cancellations but no orders has no allowance. (ADR 0010 `:75-77`; `pricing.ts:64-70`.) [code]

### 3.3 When and how the merchant is billed

| Fact | Source | Mark |
|---|---|---|
| One bill per store per calendar month (Cairo time), issued by an hourly job about an hour after the month ends | `packages/core/src/jobs/billing.ts:19`, `:30-36`; `apps/api/src/jobs/billing.ts:6`; ADR 0010 `:144` | [code] |
| The admin's `الفواتير` page shows the month so far, number by number (orders placed, the store's cancellations against the allowance, orders charged, the amount, how far from the cap), and the last 12 bills. Owners and admins only. | `apps/admin/app/s/[handle]/billing/billing-details.tsx:35-110`; `apps/admin/src/lib/billing-messages.ts:65-124`; ADR 0010 `:160-167` | [code] |
| Intended payment: Paymob. A saved card is charged when the bill is issued and again 3 and 7 days later if it fails; any bill can be paid by link with card, mobile wallet or Fawry. | `docs/adr/0003-paymob-billing.md:11`; `packages/core/src/billing/payments.ts:15`; `apps/admin/app/s/[handle]/billing/page.tsx:54-55` | [docs; the charge schedule is in code] |
| **Today: paying online is not open.** The Paymob adapter is a stub that throws ("waits for the Paymob test account"), and the API is started with no payment provider: "bills are issued but not charged". The admin then shows `الدفع أونلاين هيفتح قريب` and "talk to support on WhatsApp and we'll help you pay". | `packages/core/src/billing/paymob.ts:14-40`; `apps/api/src/server.ts:74-75`; `apps/admin/app/s/[handle]/billing/billing-details.tsx:193-201` | [code] |
| Late bill, step 1: a banner in the admin (from the first failed payment; at once for a store without a saved card) | `docs/adr/0003-paymob-billing.md:13`; `packages/core/src/billing/payments.ts:47-53`; `apps/admin/src/components/billing-banner.tsx:19-22` | [code] |
| Late bill, step 2: **from day 14 the admin is read-only** (every write answers 402 except paying) | `packages/core/src/billing/payments.ts:16`; `apps/api/src/routes/admin.ts:177-179` | [code] |
| Late bill, step 3: **from day 21 the storefront is closed to shoppers** (a closed page that says nothing about the bill) | `packages/core/src/billing/payments.ts:17`; `packages/core/src/tenancy/db-lookup.ts:14`; `apps/api/src/routes/storefront.ts:106-109` | [code] |
| Paying lifts all of it at once | `docs/adr/0003-paymob-billing.md:16` | [docs] |
| Data is never deleted automatically for an unpaid bill | `docs/adr/0003-paymob-billing.md:17` | [docs] |
| The merchant's own page says: `لو الفاتورة فضلت متدفعتش 14 يوم، لوحة التحكم بتبقى للقراءة بس، وبعد 21 يوم المتجر بيتقفل للعملاء لحد ما تتدفع.` | `apps/admin/app/s/[handle]/billing/page.tsx:60` | [code] |

Note the gap: the 14-day and 21-day steps are enforced in code whether or not a payment provider exists, while online payment is not open. Until Paymob is connected, an unpaid bill can only be settled through support. [inferred from `apps/api/src/server.ts:75` + `apps/api/src/routes/admin.ts:177`]

### 3.4 Worked examples (computable from the rules above)

Assumptions: a normal paying month (no free months), no credits carried from earlier months, cancellations made in the same month and within 14 days, no Wkil shopper cancellations.

| Orders placed in the month | Cancelled by the store | Free cancellations (10%, rounded up) | Orders charged | Bill |
|---|---|---|---|---|
| 50 | 0 | 5 available, 0 used | 50 | 50 × 1.50 = **75 ج.م** |
| 50 | 8 | 5 | 45 | 45 × 1.50 = **67.50 ج.م** (3 of the 8 are still charged) |
| 300 | 0 | 30 available, 0 used | 300 | 300 × 1.50 = **450 ج.م** |
| 300 | 40 | 30 | 270 | 270 × 1.50 = **405 ج.م** |
| 2,000 | 0 | 200 available, 0 used | 2,000 | 2,000 × 1.50 = **3,000 ج.م** |
| 4,000 | 0 | 400 available, 0 used | 4,000 | 6,000 → capped at **5,000 ج.م** |
| 4,000 | 400 | 400 | 3,600 | 5,400 → still capped at **5,000 ج.م** (credits above the cap save nothing: ADR 0010, "Credits and the cap") |

- The cap is reached at **3,334 charged orders** (3,333 orders cost EGP 4,999.50): ADR 0010, "Credits and the cap". [docs; follows from `pricing.ts:47-49`]
- At 2,000 orders the effective fee is EGP 1.25 an order; at 4,000 it is about EGP 0.63. [arithmetic]
- A store with 0 orders in a month pays 0 and gets no bill. [code: `jobs/billing.ts:30-36`]

---

## 4. Sign-up path

### 4.1 Steps, with the real paths

| # | What the merchant does | Path | What happens | Source | Mark |
|---|---|---|---|---|---|
| 1 | Presses the landing page's button | `https://admin.wkil.store/login` (the admin's `/` redirects there) | — | `apps/admin/app/page.tsx:3-5` | [code] |
| 2 | Types their mobile number | `/login` | Card title `تسجيل الدخول`; text: `هنبعتلك كود على واتساب. لو أول مرة، هنعملك حساب جديد.` Field `رقم الموبايل`, placeholder `01012345678`, button `ابعت الكود`. The same screen is sign-in and sign-up. | `apps/admin/app/login/page.tsx:76-99` | [code] |
| 3 | Types the 6-digit code from WhatsApp | `/login` (second step) | `بعتنا كود من 6 أرقام على واتساب…`. Code lives 5 minutes, 5 tries, one use; one code a minute and 5 an hour per phone. Session cookie lasts 30 days. No password exists. | `apps/admin/app/login/page.tsx:104-133`; `packages/core/src/identity/sign-in.ts:13-18`; `packages/core/src/identity/sessions.ts:7`; `docs/adr/0006-merchant-sign-in.md:7-12` | [code] |
| 4 | Is sent to "create your store" (only if the account has no store yet) | `/start` | Title `أنشئ متجرك`, text `اختار اسم المتجر والرابط اللي عملاءك هيدخلوا منه. تقدر تربط دومين خاص بيك بعدين.` | `apps/admin/app/login/page.tsx:72`; `apps/admin/app/start/page.tsx:9-23` | [code] |
| 5 | Types the store name and the link | `/start` | `اسم المتجر` (2 to 60 characters) and `رابط المتجر` (3 to 30 characters: lower-case English letters, digits, hyphens; shown as `<link>.wkil.store`). The link is checked live (`الرابط متاح`), with suggestions when taken. Button `أنشئ المتجر`. | `apps/admin/app/start/start-form.tsx:21-35`, `:93-146`; `packages/shared/src/handles.ts:15-22` | [code] |
| 6 | (automatic) The store is created as a **draft** | — | In one transaction: the store, the owner's membership, the order counter (orders start at #1001), the subscription to the `standard` plan (active, no trial), **a delivery price for each of the 27 governorates**, **four standard pages**, and a preview password. | `packages/core/src/provisioning/create-store.ts:43-58`; `packages/core/src/provisioning/launch.ts:53` | [code] |
| 7 | Lands on the store's home with a checklist | `/s/<handle>` | `جهّز متجرك`, 3 steps: `ضيف أول منتج` (a quick form: name and price), `راجع أسعار الشحن`, `انشر المتجر`. | `apps/admin/app/s/[handle]/onboarding.tsx:17-21`, `:49-50`, `:90-127` | [code] |
| 8 | Looks at the draft storefront | `https://<handle>.wkil.store` | A draft asks for the preview password shown in the admin; the merchant can share it. | `apps/admin/app/s/[handle]/onboarding.tsx:144-150`; `packages/core/src/provisioning/launch.ts:86-105` | [code] |
| 9 | Publishes | `/s/<handle>` (`POST …/publish`) | Owner only; needs at least one active product. The store becomes live and shoppers can order. | `apps/api/src/routes/admin.ts:234`; `packages/core/src/provisioning/launch.ts:74-83`; `apps/api/src/routes/storefront.ts:211` | [code] |

### 4.2 What is asked, and what is not

- **Asked:** an Egyptian mobile number, the WhatsApp code, a store name, a store link. Then, to publish: one product (a name and a price are enough). [code: rows 2 to 9 above]
- **Not asked:** email, password, card or payment details, ID or commercial papers, a plan choice. [code: `apps/admin/app/login/page.tsx`, `apps/admin/app/start/start-form.tsx`, `apps/api/src/routes/platform.ts:18-41`]
- **The number must be on WhatsApp.** A number without WhatsApp cannot sign in: `مقدرناش نبعت الكود، لأن الرقم ده مش عليه واتساب.` SMS as a second channel is "Not yet". (`docs/adr/0006-merchant-sign-in.md:23`, `:55`.) [docs]
- **Egyptian mobiles only** (`normalizeEgyptianMobile`; phones stored as `+20…`). (`apps/admin/app/login/page.tsx:37`; `docs/adr/0005-egypt-first.md:11`.) [code]
- One account can own up to **3 stores** (`/start?new=1` adds another). (`packages/core/src/provisioning/create-store.ts:12`, `:47-48`; `apps/admin/app/start/page.tsx:13`.) [code]

### 4.3 What is created automatically

| Created | Detail | Source | Mark |
|---|---|---|---|
| Delivery prices, 27 governorates | Defaults in EGP: Cairo and Giza 50; Alexandria, the Delta governorates 55 to 60; the Canal cities 65; Fayoum and Beni Suef 70; Minya 75; Assiut and Sohag 80; Qena and Luxor 85; Aswan 90; Red Sea and Matrouh 100; New Valley and the two Sinais 110. The merchant edits each and can switch a governorate off. | `packages/core/src/shipping/rates.ts:8-18`; `packages/core/src/egypt/governorates.ts` (27 entries) | [code] |
| Four standard pages | `مين إحنا` (`/pages/about`), `الشحن والتوصيل` (`/pages/shipping`), `الاسترجاع والاستبدال` (`/pages/returns`), `تواصل معانا` (`/pages/contact`), each with starter text the merchant edits | `packages/core/src/provisioning/default-pages.ts:4-26` | [code] |
| Order numbering | starts at #1001 | `packages/core/src/provisioning/launch.ts:53`; `docs/architecture.md:140` | [code] |
| Plan | `standard`, active, no trial end | `packages/core/src/provisioning/create-store.ts:54-55` | [code] |
| Preview password | 8 easy-to-read characters, for the draft storefront | `packages/core/src/provisioning/create-store.ts:14-21`, `:50` | [code] |

### 4.4 Is sign-up open to the public today?

- **In the code, sign-up has no gate**: no invite code, no allowlist, no waiting list, no approval. Any Egyptian mobile on WhatsApp that reaches the admin can create up to 3 stores. (`apps/api/src/routes/platform.ts:8-41`; grep for beta/invite/allowlist/waitlist over `apps/` and `packages/` finds nothing.) [code]
- **But production has not been run for real.** ADR 0021 is still "proposed": "Nothing here has run against a real DigitalOcean or Cloudflare account yet" (`docs/adr/0021-production-digitalocean-cloudflare.md:3`); `docs/migration-plan.md:146` says production is "Not tried yet … the API starts in production only once the WhatsApp sender for sign-in codes has merged"; ADR 0010 `:133` says "No store is live on this platform". Staging runs (`docs/adr/0021…:7`). [docs]
- The launch plan names "closed beta, public signup" as the last two steps (`docs/architecture.md:133`), but **no closed-beta mechanism exists in code**. [docs vs code]
- So: whether `https://admin.wkil.store/login` answers today, and whether the launch is a closed beta or public, **cannot be settled from the repository** (section 9).

---

## 5. Feature inventory

Status words: **built** (in code, usable by a merchant once production is up), **partly** (in code but closed, incomplete or waiting on something outside), **planned** (decided or scheduled, not in code or not run), **not built**.

The "Arabic term" column gives the glossary's mandated word (`docs/reference/arabic-glossary.md`, line in brackets) and, where the glossary is silent, the word the admin's own screens use (marked "admin").

| Feature | What the merchant can do with it (plain words) | Arabic term | Status | Source |
|---|---|---|---|---|
| **Storefront and look** | Gets a ready shop in Arabic that works on phones: a home page with the store's name, a category strip and the newest products; a shop page with sorting; a search by product name; a product page with photos, options and related products; a cart; a checkout. Sets the logo, one brand colour, the description, phone, WhatsApp, email, address and social links. No platform logo on it. | المتجر (glossary 33); المظهر for "theme" (41); شعار المتجر, never لوجو (67) | **built** — one theme only, light only, Arabic only; no banners or slider | `docs/architecture.md:153-154` [docs]; `apps/storefront/app/[host]/` (routes) [code]; `docs/adr/0009-storefront-theme.md:13-22`, `:78-82` [docs]; `apps/storefront/app/layout.tsx:16` (`lang="ar"`) [code] |
| **Products** | Adds products with a price, a "before discount" price, stock, SKU, a description, up to 100 photos; keeps a product as draft, active or archived; filters low stock; can keep selling after stock runs out (backorder). | المنتجات / منتج (20, 51); السعر / السعر قبل الخصم (62); المخزون (63); السماح بالطلب بعد نفاد المخزون (111) | **built** | `packages/core/src/catalog/products.ts:35`, `:326` [code]; `packages/shared/src/images.ts:12` [code]; `docs/architecture.md:146` [docs] |
| **Options and variants** | Sells a product in sizes and colours: up to 3 options, each sellable combination with its own price, stock and SKU. | خاصية / خصائص, never خيار (57); قيمة (58); نوع (56) | **built** | `packages/shared/src/variants.ts:100` [code]; `packages/core/src/catalog/variants.ts` [code] |
| **Option pictures and variant photos** | Shows a choice as a picture (a colour as its photo) and shows a variant's own photos when the shopper picks it. | صورة (67); admin: `القيمة من غير صورة بتظهر باسمها` | **built** | `docs/adr/0018-option-pictures.md:11-19` [docs]; `apps/admin/app/s/[handle]/products/choice-photos.tsx` [code] |
| **Offers (buy N for a price)** | Sets "2 pieces for 500" style offers on a product, up to 10 per product, with a label and a savings badge; the shopper picks the type of each piece. | عرض (60); admin section title: `عروض الكمية` | **built** | `packages/shared/src/offers.ts:23` [code]; `apps/admin/app/s/[handle]/products/product-offers.tsx:77` [code]; `docs/adr/0013-offers.md:13`, `:32` [docs] |
| **Categories** | Groups products into categories, orders and hides them; a product can be in several; shoppers get a page per category. | الأقسام / قسم, never التصنيفات (21, 54) | **built** — no category image | `packages/core/src/catalog/categories.ts:11-12` [code]; `apps/admin/app/s/[handle]/categories/` [code]; `docs/porting.md:161-162` [docs] |
| **Landing pages for ads** | Builds a page for one product to point ads at, with its own order form on the page, a countdown, a YouTube or Vimeo video, photos, features, FAQ, customer quotes, its own delivery price or free shipping, "offers only", and its own Meta Pixel. Orders from it are marked with the page. Up to 200 pages. | صفحات الهبوط / صفحة هبوط, never صفحات البيع or الفانل (23); English "Landing page", never "Funnel" (225) | **built** — no visitor counter, no TikTok pixel, no reviews section | `apps/admin/app/s/[handle]/funnels/page.tsx:42` [code]; `apps/storefront/app/~funnel/[host]/[slug]/` [code]; `packages/shared/src/funnels.ts:28-58` [code]; `docs/adr/0015-landing-pages.md` [docs]; `docs/porting.md:493` [docs] |
| **Checkout and cash on delivery** | Shoppers order without an account: name, mobile, governorate, address, optional notes. They pay when the order arrives. A retried order is never placed twice. | نموذج الطلب, never الـ Checkout or فورم (44); الدفع عند الاستلام (98); رقم الموبايل (68) | **built** — cash on delivery is the only payment method | `apps/storefront/app/[host]/checkout/checkout-form.tsx:161-201` [code]; `packages/db/prisma/schema.prisma:801` [code]; `docs/adr/0003-paymob-billing.md:29` [docs] |
| **Shipping by governorate** | Sets a delivery price for each of the 27 governorates and switches off the ones it does not deliver to. | الشحن (45); المحافظة (70); مصاريف الشحن (65); admin page title: `أسعار الشحن` | **built** | `apps/admin/app/s/[handle]/shipping/page.tsx:21` [code]; `packages/core/src/shipping/rates.ts:70-112` [code] |
| **Free shipping above an amount** | Sets an order amount above which delivery is free, for the whole store or per landing page. | admin: `شحن مجاني` (glossary has no entry) | **built** | `apps/admin/app/s/[handle]/shipping/free-shipping-form.tsx:49` [code]; `packages/core/src/shipping/rates.ts:119-133` [code]; `docs/architecture.md:163` [docs] |
| **Orders management** | Sees orders in tabs by status, searches by name, mobile or order number, moves one order to its next step with one button, changes up to 100 orders at once, marks paid or unpaid, cancels (stock goes back) and reopens. | الطلبات / طلب / رقم الطلب (25, 52); statuses: جديد، مؤكد، جاري التجهيز، تم الشحن، تم التوصيل، ملغي (84-89) | **built** — the admin screen changes status and payment only; no screen to edit an order's lines or address, none to add an order by hand, no export | `apps/admin/app/s/[handle]/orders/[orderId]/order-actions.tsx:47-58` [code]; `packages/shared/src/orders.ts:4`, `:21-31` [code]; `docs/porting.md:68`, `:249` [docs] |
| **Order printing** | Prints selected orders on A4 in Arabic, 1, 2, 4 or 9 orders a sheet, with the store's name and logo; orders are marked printed, and the list filters printed and not printed. | طباعة (131); فاتورة for the A4 sheet (77); مطبوع / مش مطبوع (113) | **built** — no thermal receipt | `packages/shared/src/printing.ts:19`, `:71` [code]; `apps/admin/app/print/[handle]/orders/page.tsx` [code]; `docs/architecture.md:162` [docs] |
| **Customers** | Sees every customer (one per mobile number) with order count, total spent, addresses, most common governorate; searches; keeps private notes. | العملاء / عميل, never الزبون (27, 53) | **built** — no export, tags or segments; shoppers have no accounts | `apps/admin/app/s/[handle]/customers/page.tsx:66` [code]; `docs/porting.md:176` [docs] |
| **Abandoned checkouts** | Sees who typed a mobile number in the order form and did not finish, with what was in the cart; calls or messages them on WhatsApp in one tap; turns the cart into an order. Kept 90 days. Owners and admins only. | السلات المتروكة / سلة متروكة (26); تحويل لطلب (141) | **built** | `apps/admin/app/s/[handle]/abandoned-checkouts/` [code]; `packages/core/src/abandoned/rules.ts:43`, `:48` [code]; `docs/adr/0017-abandoned-checkouts.md` [docs] |
| **Meta Pixel and Conversions API** | Switches on the browser pixel and the server events for Facebook and Instagram ads, saves the access token once (stored encrypted, never shown again), sends a test event. Each purchase is counted once (browser and server share one event id). A landing page can have its own pixel. | البكسل (73); رمز وصول (72); admin screen: `تتبّع إعلانات Meta` | **built** — Meta only: no TikTok, Snapchat or Google tags; only Purchase (and a landing page's Lead) is also sent from the server | `apps/admin/app/s/[handle]/settings/meta/page.tsx:16-17` [code]; `apps/storefront/src/lib/meta-pixel.ts:31` [code]; `docs/architecture.md:156` [docs]; `docs/porting.md:605` [docs] |
| **Custom domains and SSL** | Connects up to 5 of their own domains (two DNS records to copy), picks the main one; the other addresses redirect to it; the security certificate is issued automatically. Included in the plan. | admin: `الدومين` (glossary has no entry); `شهادة الأمان`; DNS, CNAME, TXT stay Latin | **partly** — fully coded, but **closed**: the admin says `الدومين الخاص هيفتح قريب` until Cloudflare is set up, and "The Cloudflare adapter has never run against a real account" | `apps/admin/app/s/[handle]/domains/domains-manager.tsx:107` [code]; `apps/api/src/server.ts:86-90` [code]; `packages/shared/src/domains.ts:5` [code]; `docs/adr/0011-custom-domains.md:30-31` [docs] |
| **Wkil: order confirmation on WhatsApp** | Presses "ربط وكيل", approves once, and every new order goes to Wkil, which confirms it with the shopper on WhatsApp and confirms or cancels it in the store; nothing to copy or paste. A shopper's own cancellation there is not charged. | وكيل; English "Wkil", not WKIL (222); واتساب in Arabic script (69); admin screen: `تأكيد الطلبات مع وكيل` | **partly** — the platform's side is built and tested against a fake Wkil; it needs a Wkil account (a separate product), Wkil's side of the flow, and the production switch ("Nothing of it reaches a merchant until the owner's script writes Wkil's row in production") | `apps/admin/app/s/[handle]/settings/wkil/page.tsx:26-27` [code]; `apps/admin/src/lib/wkil-connect-messages.ts:67-70` [code]; `docs/architecture.md:111`, `:157` [docs]; `docs/integrations/wkil-connect.md:57` [docs] |
| **AI assistant connection (MCP)** | Gives an assistant such as Claude or ChatGPT the store's address, approves it in the admin choosing what it may do and for how long (30 days, 90 days, 1 year, no end date), and asks it to build landing pages, add or edit products and categories, and read or update orders. Sees every call it made; disconnects in one press. | الربط والتطبيقات, never التكاملات (24); MCP stays Latin (155); admin: `رابط الـ MCP لمتجرك` | **built** — up to 10 connected apps per store; the assistant cannot change settings, billing, domains or Meta, cannot delete orders | `apps/admin/app/s/[handle]/settings/connections/page.tsx:25` [code]; `packages/shared/src/mcp.ts:13-59` [code]; `apps/api/src/mcp/` [code]; `docs/connect-an-assistant.md` [docs]; `docs/adr/0020-oauth-connections.md:3` ("Claude and ChatGPT had connected on staging") [docs] |
| **Staff and roles** | Three roles exist — owner, admin, staff — and the admin hides the sensitive screens from staff (bills, abandoned checkouts, Meta, Wkil, connected apps). | admin: `المالك` / `مدير` / `موظف` (glossary has no entry) | **partly** — the roles are enforced, but there is **no way for a merchant to add a team member** (staff invitations are "Not yet"); the plan allows 20 | `apps/admin/src/components/layout/app-sidebar.tsx:23`, `:34`, `:42` [code]; `packages/db/prisma/schema.prisma:170` [code]; `docs/adr/0006-merchant-sign-in.md:25` [docs]; no member route in `apps/api/src/routes/` [code] |
| **Static pages** | Edits the four ready pages (about, shipping, returns, contact): title, text with simple formatting, visible or hidden. They show in the storefront's footer. | admin: `الصفحات`; أسفل الصفحة for "footer" (37) | **built** — cannot add or delete pages | `apps/admin/app/s/[handle]/pages/page.tsx:20` [code]; `packages/core/src/settings/store-pages.ts:1-4` [code] |
| **Search engines (SEO)** | Each store gets its own `sitemap.xml` and `robots.txt`, canonical addresses, share previews (Open Graph) and product structured data, with no setup. Landing pages are kept out of search by default and have their own search title and description. | الظهور في البحث (SEO) (42); never الميتا (43) | **built** (technical part) — no fields to edit a product's or the store's search title and description | `apps/storefront/app/[host]/sitemap.xml/route.ts`, `…/robots.txt/route.ts` [code]; `apps/storefront/src/lib/seo.ts:63-104` [code]; `docs/migration-plan.md:39` [docs] |
| **Speed and caching** | Store pages are served from a cache and refresh at once when the merchant changes something; photos are stored as WebP in three sizes so phones load small ones; pages carry little script (a CI check holds every page to a budget). | (no glossary term) | **built** — no measured public speed figure exists | `apps/storefront/cache-handler.mjs` [code]; `docs/adr/0009-storefront-theme.md:38-48`, `:69-76` [docs]; `docs/architecture.md:150` [docs] |
| **Data isolation and security** | Each store's data is separated from every other store's inside the database itself, not only in the app; the Meta token is stored encrypted; sign-in has no password to steal; staff of the platform can enter a store only with a written reason, for 30 minutes, and every change is logged. | (no glossary term) | **built** | `CLAUDE.md:16-23` [docs]; `packages/db/prisma/migrations/*/migration.sql` (`SELECT enable_store_rls(...)`) [code]; `apps/api/test/*isolation*.test.ts` [code]; `docs/adr/0012-secrets-at-rest.md` [docs]; `packages/shared/src/staff-rules.ts:27` [code] |
| **Backups** | Production's database is planned on a managed service with a daily backup and restore to any moment of the last 7 days. | (no glossary term) | **planned** — designed, never run for real; the restore drill is "still to be done"; **product photos are not backed up yet** | `docs/adr/0021-production-digitalocean-cloudflare.md:75-84` [docs]; `docs/architecture.md:56` ("R2 objects are not backed up yet") [docs]; `docs/migration-plan.md:147` [docs] |
| **Moving an existing store over** | The platform's team can import a store from the company's own older platform (products, variants, photos, customers, orders with their numbers, offers, landing pages, Meta settings) and keep old links working with redirects; such a store gets 3 free months. | (no glossary term) | **not built for outside merchants** — the importer reads only the old in-house platform's database and is run by staff; nothing imports from Shopify, Salla, Zid, WooCommerce, EasyOrders or a file. Redirects: API only, "there is no admin screen yet". | `docs/runbooks/move-a-store.md:1-3` [docs]; `packages/core/src/jobs/import-legacy/` [code]; `docs/architecture.md:159` [docs]; `docs/porting.md:540` [docs] |
| **Bills page** | Sees this month's count and amount so far, how each number was reached, and past bills. | الفواتير; فاتورة (77) | **built**; paying online **not built** (section 3.3) | `apps/admin/app/s/[handle]/billing/` [code]; `packages/core/src/billing/paymob.ts:14-40` [code] |
| **Sign-in by WhatsApp code** | No password to remember. | واتساب (69); رقم الموبايل (68) | **built**; depends on Wkil's message endpoint in production | `apps/admin/app/login/page.tsx` [code]; `docs/adr/0006-merchant-sign-in.md:93` ("Not verified") [docs] |
| **Draft and preview** | Builds the store in private and shares a preview password before going live. | مسودة (109); نشر (139) | **built** | `packages/core/src/provisioning/launch.ts:74-105` [code] |
| **Several stores on one account** | Opens up to 3 stores with one mobile number. | — | **built** | `packages/core/src/provisioning/create-store.ts:12` [code] |
| **Admin on phone, dark mode** | The admin is Arabic and RTL, with light, dark or device theme; tables become cards on phones. | لوحة التحكم (34) | **built** | `apps/admin/app/layout.tsx:18` [code]; `docs/architecture.md:149` [docs] |

Features the launch plan names that are **not in the code**: a second storefront theme, WhatsApp and email notifications of the platform's own, courier integrations (`docs/architecture.md:132`; `docs/adr/0005-egypt-first.md:13`). [docs vs code]

---

## 6. Limits a merchant would care about

There are no plan tiers: every store has the same limits. (`migration.sql:54-58`, 20261112090000.) [code]

| Limit | Value | Source | Mark |
|---|---|---|---|
| Products per store | **Unlimited** (`"products": null` on the `standard` plan) | `packages/db/prisma/migrations/20261112090000_order_billing/migration.sql:57`; enforced through `packages/core/src/catalog/products.ts:324-326` | [code] |
| — careful | `packages/core/src/entitlements/index.ts:10` shows `{ products: 50, staff: 1, customDomain: false }`. Those are only fallbacks for a plan row with missing values, **not** the plan merchants get. | `packages/core/src/entitlements/index.ts:10-19` | [code] |
| Stores per account | 3 | `packages/core/src/provisioning/create-store.ts:12` | [code] |
| Team members | 20 in the plan's data — but members cannot be added yet (section 5) | `migration.sql:57` (20261112090000) | [code] |
| Photos per product | 100; each file up to 25 MB; JPEG, PNG, WebP or AVIF; at least 200×200 | `packages/shared/src/images.ts:7-12` | [code] (ADR 0008's older "10 MB" line is superseded by its own "Limits (changed Nov 2026)") |
| Storage per store | An internal guard of 5 GB that "merchants never see"; past it, uploads are refused with a message to contact support | `packages/core/src/media/storage-guard.ts:8`; `apps/admin/src/lib/product-images.ts:56`; `docs/porting.md:128` | [code] |
| Options per product | 3 options, 30 values per option, 100 variants, 8 photos per variant | `packages/shared/src/variants.ts:100` | [code] |
| Offers per product | 10; 1 to 50 pieces each; label 80 characters, badge 120 | `packages/shared/src/offers.ts:23` | [code] |
| Categories | 200 per store; 20 per product | `packages/core/src/catalog/categories.ts:11-12` | [code] |
| Landing pages | 200 per store; per page: 20 slideshow photos, 30 gallery photos, 20 customer quotes, 30 FAQ entries, 12 features, 8 trust badges, 12 related products | `packages/shared/src/funnels.ts:28-61` | [code] |
| Product description | 5,000 characters, plain text with simple formatting | `packages/shared/src/product-description.ts:10` | [code] |
| Standard pages | 4 fixed pages; body up to 10,000 characters | `packages/core/src/settings/store-pages.ts:1-4`; `packages/shared/src/page-body.ts:19` | [code] |
| Custom domains | 5 per store (`www` and the bare domain count separately) | `packages/shared/src/domains.ts:5` | [code] |
| Connected apps (assistants, Wkil) | 10 per store; an assistant may make 60 requests a minute (120 per store) | `packages/core/src/connections/rules.ts:57`; `packages/core/src/connections/requests.ts:34-35` | [code] |
| Batch status change, printing | 100 orders at a time | `packages/shared/src/printing.ts:71`; `docs/porting.md:68` | [code] |
| Shopper's cart | 50 lines; up to 100 of one item | `packages/shared/src/storefront.ts:104-105` | [code] |
| Delivery price | up to 10,000 EGP per governorate | `packages/core/src/shipping/rates.ts:58` | [code] |
| Abandoned checkouts | kept 90 days after the shopper last touched them | `packages/core/src/abandoned/rules.ts:43` | [code] |
| Products in the sitemap | 5,000 | `packages/core/src/catalog/storefront-catalog.ts:123` | [code] |
| Redirects (old links of a moved store) | 10,000 per store | `packages/core/src/redirects/rules.ts:17` | [code] |
| Store link | 3 to 30 characters, `a-z`, `0-9`, hyphens; some names reserved | `packages/shared/src/handles.ts:2-22` | [code] |
| Store name | 2 to 60 characters | `apps/admin/app/start/start-form.tsx:32`; `packages/shared/src/store-settings.ts:25` | [code] |
| Orders | No limit on the number of orders; fees are capped at EGP 5,000 a month (section 3) | `packages/core/src/billing/pricing.ts:26` | [code] |

---

## 7. Do NOT claim

Each line was checked against the code and documents, not assumed.

| Tempting claim | Truth | Source | Mark |
|---|---|---|---|
| "Accept cards / Visa / wallets / Fawry / instalments from your customers" | **False.** Cash on delivery is the only payment method. Shoppers paying by card "comes after launch". (Card, wallet and Fawry are how the *merchant* will pay the *platform's* bill — and even that is not open yet.) | `packages/db/prisma/schema.prisma:801`; `docs/adr/0003-paymob-billing.md:11`, `:29`; `docs/migration-plan.md:179` | [code] |
| "Discount codes / coupons" | **Not built.** No coupon table or screen; "Coupons | No". A "before discount" price and quantity offers exist. | `packages/db/prisma/schema.prisma` (no such model); `docs/migration-plan.md:21`; `packages/core/src/orders/orders.ts:11` | [code] |
| "Customer accounts / login / saved addresses / order history for shoppers" | **Not built, by decision.** | `docs/migration-plan.md:32`; `docs/porting.md:176` | [docs + code] |
| "Wishlist / favourites" | **Not built.** | `docs/migration-plan.md:64`; no route in `apps/storefront/app/[host]/` | [code] |
| "Product reviews and ratings" | **Not built.** (A landing page can show quotes the merchant types; that is not a review system.) | `docs/migration-plan.md:29`; `packages/shared/src/funnels.ts:49` | [code] |
| "Theme store / many themes / drag-and-drop page builder" | **False.** One theme; the merchant sets a logo and one colour. Theme 2 is planned and first to be cut. No banner slider, no menu editor, no announcement bar. | `docs/adr/0009-storefront-theme.md:78-82`; `docs/architecture.md:135`; `docs/porting.md:218` | [docs] |
| "App store / plugins / integrations marketplace" | **False.** The only outside connections are an AI assistant over MCP and Wkil. | `docs/architecture.md:101-103` | [docs + code] |
| "Free trial" / "14 days free" | **False.** There is no trial; there is also no monthly fee, so nothing is paid until an order is placed. Say that instead. | `packages/core/src/provisioning/create-store.ts:54` | [code] |
| "Free plan" / "free forever" / "first N orders free" | **False.** Every placed order costs EGP 1.50. | `packages/core/src/billing/pricing.ts:25` | [code] |
| "Pay only for confirmed / delivered / successful orders" | **False** (it was the first rule, replaced on 14 November 2026). Every order placed is charged, confirmed or not, delivered or not. | `docs/adr/0010-pricing-per-order.md:7-9`, `:171-183` | [code] |
| "Cancelled, refused or returned orders are free" | **Only partly.** Free up to 10% of the month's orders and only within 14 days; above that, charged. | `docs/adr/0010-pricing-per-order.md:23-24` | [code] |
| "No commission on sales" | True as worded (the fee is a fixed amount per order, not a percentage) — but never imply the platform is free. | `packages/core/src/billing/pricing.ts:25` | [inferred] |
| "Multi-currency / sell outside Egypt / international shipping" | **False.** EGP only, Egyptian mobiles only, 27 Egyptian governorates only. | `docs/adr/0005-egypt-first.md:9-12`; `packages/db/prisma/schema.prisma:101` | [code] |
| "English storefront / bilingual store" | **False today.** Storefront and admin are Arabic only; English pages are "Not yet". | `apps/storefront/app/layout.tsx:16`; `apps/admin/app/layout.tsx:18`; `docs/adr/0009-storefront-theme.md:82` | [code] |
| "Integrated with Bosta / Mylerz / Aramex / shipping companies, waybills, tracking" | **Not built.** "Couriers … come after launch." The merchant ships by their own means and updates the status by hand. | `docs/adr/0005-egypt-first.md:13`; grep for courier names over `apps/` and `packages/` finds nothing | [code] |
| "Sales dashboard / analytics / reports / charts" | **Not built.** The home page shows the product count, the 7-day abandoned-checkout count and the next order number. Customer pages show totals per customer. No sales chart, no revenue report. | `apps/admin/app/s/[handle]/page.tsx:39-76` | [code] |
| "Export orders or customers to Excel / CSV" | **Not built.** | grep for csv/xlsx/تصدير over `apps/` and `packages/core` finds nothing; `docs/porting.md:176` | [code] |
| "Add your team / staff accounts with permissions" | **Not usable yet.** Roles exist; inviting a member does not. | `docs/adr/0006-merchant-sign-in.md:25` | [docs + code] |
| "Connect your own domain today" | **Not open yet.** Built, closed until Cloudflare is set up. | `apps/admin/app/s/[handle]/domains/domains-manager.tsx:107` | [code] |
| "WhatsApp order confirmation included / built in" | **False as worded.** It needs Wkil, a separate product with its own account, and the connection is not switched on yet. The platform sends no WhatsApp to shoppers by itself. | `docs/architecture.md:111`; `docs/migration-plan.md:24` | [docs] |
| "Email / SMS notifications for new orders" | **Not built.** No email or SMS sender exists; the merchant hears of a new order through Wkil only. | grep for mail/SMS providers finds nothing; `docs/migration-plan.md:136` | [code] |
| "Built-in AI" / "AI writes your products" | **False as worded.** The merchant brings their own assistant (Claude, ChatGPT) and connects it. The "AI add-on" is a price for a feature that does not exist. | `docs/connect-an-assistant.md:3`; `docs/adr/0010-pricing-per-order.md:26` | [docs] |
| "TikTok pixel / Snapchat pixel / Google Analytics" | **Not built.** Meta only. | `docs/porting.md:493`; no such code in `apps/storefront/src` | [code] |
| "Import your store from Shopify / Salla / Zid / WooCommerce" | **Not built.** | `docs/runbooks/move-a-store.md:3` | [docs] |
| "Daily backups of everything" | **Do not claim yet.** Planned for the database (7 days), not run for real; photos are not backed up. | `docs/architecture.md:56` | [docs] |
| "Live visitor counter / only X left / fake urgency" | **Deliberately not built** ("invented numbers"). A real countdown to a date the merchant sets exists. | `docs/migration-plan.md:51`, `:111` | [docs] |
| "Used by thousands of stores" / any customer count, uptime or speed number | **No such fact exists.** No store is live on the platform; the company runs five stores on its older software. | `docs/adr/0010-pricing-per-order.md:133`; `docs/porting.md:3` | [docs] |
| "Pay your subscription by card / Fawry / wallet" (as available now) | **Not open.** `الدفع أونلاين هيفتح قريب`. | `apps/admin/app/s/[handle]/billing/billing-details.tsx:195` | [code] |
| "Blog", "pop-ups", "newsletter", "mobile app", "POS", "digital products", "order tracking page for shoppers", "invoices with tax number" | **None found** in code or documents. | `apps/storefront/app/[host]/` (route list); `docs/migration-plan.md:31` | [code] |
| "Sign up with email / Google / Facebook" | **False.** Mobile number and WhatsApp code only. | `docs/adr/0006-merchant-sign-in.md:7` | [code] |

---

## 8. Copy rules from the glossary

Source: `docs/reference/arabic-glossary.md` (line numbers in brackets), mandated by `CLAUDE.md:29`. The glossary was written for the older admin (it names `src/i18n/ar.ts`), so it also lists words for features this platform does not have — coupons (29), banners (22), reviews (30), newsletter (31), announcement bar (38), hero slider (39). **A word being in the glossary does not mean the feature exists**; section 5 decides that.

**Dialect and voice**

- Simple, professional **Egyptian Arabic** — "what a merchant would say on the phone" (4).
- No formal-Arabic islands. Never: `تعذّر، لا توجد، لا يوجد، يرجى، هل أنت متأكد، اختر، اتركه فارغًا، أدخل، ثم`. Use: `مقدرناش، مفيش، لسه مفيش، كمّل، متأكد إنك عايز…؟، اختار، سيبه فاضي، اكتب، وبعدين` (149-150).
- "There is" is `فيه`, never `في` (165). "Now" is `دلوقتي`, not `الآن` (204). Server is `السيرفر`, never `الخادم` (154).
- Success is `تم + مصدر` with **no** `بنجاح` (173).

**Person and gender**

- To the merchant: **masculine singular** — `اكتب، اختار، راجع، حدّث`. Never feminine forms (`اعملي، اطلبي`) (5, 151). A landing page for merchants follows this.
- To shoppers (anything shown as a storefront example): neutral masculine — `اطلب دلوقتي، أكّد طلبك` (6, 152).
- Buttons are verbal nouns (`إضافة، حفظ، نشر`); inside a sentence, the Egyptian imperative (`ضيف، احفظ`) (115-143).

**Money, digits, dates**

- **Western digits 0-9 everywhere**, in both languages; never `٠-٩` (199). Thousands with a comma: `1,250`.
- Money is `350 ج.م`: the number, then `ج.م`. `جنيه` only inside a prose sentence. Never write `EGP` in Arabic text (201). So: `1.50 ج.م`, `2,500 ج.م`.
- Avoid a minus sign or a range next to Arabic; say it in words (`خصم 350 ج.م`) (202).
- Dates: `4 نوفمبر 2026، 3:40 م` — Egyptian month names, 12-hour clock with ص/م (203).
- Counts: do not put a bare noun after a number (`12 طلب` is only right from 11 up). Write `عدد الطلبات: 12` (188-193).

**Terms: use / never use**

| Use | Never | Line |
|---|---|---|
| الأقسام (قسم) | التصنيفات | 21 |
| صفحات الهبوط (صفحة هبوط) | صفحات البيع، الفانل | 23 |
| الربط والتطبيقات | التكاملات | 24 |
| العملاء (عميل) | الزبون | 27 |
| السلات المتروكة | — | 26 |
| الرئيسية | نظرة عامة | 19 |
| نموذج الطلب | الـ Checkout، فورم | 44 |
| الشحن (التوصيل only in the status تم التوصيل) | — | 45 |
| خاصية / خصائص (product options) | خيار | 57 |
| نوع (a sellable variant), قيمة (an option's value) | — | 56, 58 |
| عرض (a quantity offer) | — | 60 |
| السعر قبل الخصم | — | 62 |
| المخزون | المخزون المتاح | 63 |
| المبيعات | إيرادات | 66 |
| شعار المتجر | لوجو | 67 |
| رقم الموبايل | الهاتف، التليفون | 68 |
| كود خصم | كوبون | 29 |
| الظهور في البحث (SEO) — the acronym once, in brackets | الميتا | 42-43 |
| أعلى الصفحة / أسفل الصفحة | الـ Header، الترويسة / الـ Footer، التذييل | 36-37 |
| الدفع عند الاستلام | — | 98 |
| تم رد المبلغ | مسترجع | 97 |
| البكسل، رمز وصول | — | 72-73 |

The admin's own screens sometimes stray from line 45 (`سعر التوصيل لكل محافظة` in `apps/admin/app/s/[handle]/shipping/page.tsx:21`; the default page `الشحن والتوصيل`). For new copy, follow the glossary: `الشحن`.

**Brand spellings**

- **Wkil**, not WKIL (222). Arabic: `وكيل`.
- **واتساب** in Arabic script in all Arabic text (69).
- The platform: **Wkil Store** / **متجر وكيل**, always in full (`docs/adr/0020-oauth-connections.md:153`).
- The WhatsApp product is introduced with what it is the first time: `وكيل (تأكيد الطلبات على واتساب)` (`apps/admin/src/lib/wkil-connect-messages.ts:69`).
- Never let `وكيل` (the product) directly follow `متجر` or `متجرك`, with or without `و` — it reads as the platform's name. Never call the merchant's shop `متجر وكيل بتاعك`. (`apps/admin/test/billing-messages.test.ts:145-146`; `docs/integrations/wkil-connect.md:147`.)
- `Meta` stays Latin (`تتبّع إعلانات Meta`); `MCP`, `DNS`, `OAuth`, `Pixel ID` stay Latin; do not glue `الـ` to a Latin word that has an Arabic equivalent (155).
- English: "Landing page", never "Funnel" (225); "Admin Panel" (222); sentence case; American spelling; `…` not `...` (221-226).

**Orthography and RTL**

- Hamza always written (`إضافة، أكواد، إلغاء`); taa marbuta (`سلة، خاصية`); tanween before the alif (`شكرًا`, not `شكراً`) (160-162).
- Arabic comma `،` and question mark `؟`; one-character ellipsis `…` (163).
- No tashkeel except a disambiguating shadda (`حدّث، عدّل، جرّب، كمّل`) and `جارٍ` (164).
- Wrap phone numbers, links, codes and store handles in `<bdi dir="ltr">`; local phone format `010 1234 5678` (210-211).
- Start an Arabic sentence with an Arabic word; put Latin tokens after a colon or inside `<bdi>` (213). Use `›` as a separator, not an arrow (214).

---

## 9. Open questions

Things the repository does not settle. Each needs the owner or the team.

1. **Is production up?** ADR 0021 is "proposed" and says nothing has run on real accounts (`docs/adr/0021-production-digitalocean-cloudflare.md:3`); `docs/migration-plan.md:146` says "Not tried yet". Does `https://admin.wkil.store/login` work on the day the landing page goes out?
2. **Closed beta or public?** The plan says "closed beta, public signup" (`docs/architecture.md:133`); the code has no gate. Should the button say "start now", or collect a number for a waiting list?
3. **Where does the landing page live, and what is the button's address?** `wkil.store` and `*.wkil.store` go to the storefront app in production (`deploy/production/Caddyfile`); `www` is a reserved handle. The landing project is at `/home/user/wkil.store` (also reachable as `/home/user/wkil-store-landing`), which suggests the bare domain, but no routing for it exists in `store-platform`.
4. **The name on the page.** "Wkil Store / متجر وكيل" is the owner's decision (`docs/adr/0020-oauth-connections.md:3`), yet `README.md:3` still says there is no name and the product shows none. Confirm the name, and supply a logo and brand colour — none is in the repository.
5. **Paying the bill.** Paymob is a stub (`packages/core/src/billing/paymob.ts:14-40`). What does a merchant with a first bill do, and are the 14-day read-only and 21-day closure steps really applied while online payment is closed (`apps/api/src/server.ts:75`, `apps/api/src/routes/admin.ts:177`)? May the page name card, wallet and Fawry?
6. **The 14 days** are "the lead's decision, to be confirmed by the owner" (`docs/adr/0010-pricing-per-order.md:12`; `docs/migration-plan.md:78`). Safe to print?
7. **VAT and tax invoices.** Prices are VAT-inclusive (`packages/core/src/billing/pricing.ts:3`), but how tax invoices are issued is an open item (`docs/adr/0003-paymob-billing.md:25`). May the page say "شامل الضريبة"?
8. **Refused parcels.** There is no "refused" or "returned" status, so a refusal is a merchant's cancellation under the 10% and 14-day rule (section 3.2). Is that the intended answer for cash-on-delivery merchants, who will ask first?
9. **Wkil.** Is Wkil's side of "ربط وكيل" built (not found in `/home/user/wkil-main-service` or `/home/user/wkil-app`)? When is it switched on in production? What does Wkil cost the merchant, and may the page describe it only as "order confirmation on WhatsApp" when Wkil's own site sells more (`/home/user/wkil-landing/messages/ar/landing.json:3-13`)?
10. **Custom domains.** When does Cloudflare open them (`docs/adr/0011-custom-domains.md:31`, `:67`)? Until then the page must not promise them as available.
11. **The 3 free months** are for "a store we move over from another platform" (`docs/adr/0010-pricing-per-order.md:28`), granted by staff. Is this an offer to any merchant leaving another platform, given that no importer for other platforms exists, or only for the company's own five stores?
12. **Enterprise.** "Prices agreed per store" from 5,000 orders a month, while the cap already holds every store to EGP 5,000. What is offered above that?
13. **AI add-on (EGP 299 a month) and WhatsApp messages (cost plus 10%)**: what are they and when (`docs/adr/0010-pricing-per-order.md:26-27`)? Not to be advertised until answered.
14. **Support channel.** The code's support WhatsApp is `+201515277663` (`packages/shared/src/platform.ts:4`). Is that the public number for the page? Hours?
15. **Team members.** When can a merchant add staff (`docs/adr/0006-merchant-sign-in.md:25`)?
16. **Merchants without WhatsApp on their number** cannot sign up (`docs/adr/0006-merchant-sign-in.md:23`). Should the page say "رقم عليه واتساب"?
17. **Terms of service and privacy policy for the platform:** none found in the repository. The abandoned-checkout notice to shoppers is also an undecided legal question (`docs/adr/0017-abandoned-checkouts.md`, "Not decided here").
18. **Which assistants to name.** Claude's steps were read first-hand; ChatGPT's were not (`docs/connect-an-assistant.md:11`), though both "had connected on staging" (`docs/adr/0020-oauth-connections.md:3`). Name both, or only Claude?
19. **Backups.** May the page mention them once the restore drill is done (`docs/migration-plan.md:147`)? Photos are not backed up (`docs/architecture.md:56`).
20. **Roadmap wording.** Theme 2, banners, courier integrations, shoppers paying by card, English pages, SMS codes: are any dated, so the page can say "قريب" truthfully? The billing page's own test forbids promising words (`قريب`, `هيبقى`) in one place (`apps/admin/test/billing-messages.test.ts:138`), which suggests the team's preference is to state conditions, not promises.

### Documents that disagree with the code (trust the code)

| Document says | Code or later record says | Trust |
|---|---|---|
| `README.md:3`: "Working name until the product has one" | Public name "Wkil Store / متجر وكيل" (`docs/adr/0020-oauth-connections.md:3`; `apps/admin/src/lib/billing-messages.ts:7`) | the later record |
| `docs/architecture.md:8` and `CLAUDE.md:3`: merchants "pay us a monthly plan" / "pay us monthly" | No plan fee; EGP 1.50 per order placed, billed monthly (`packages/core/src/billing/pricing.ts:24-33`) | code |
| `docs/architecture.md:40-49`: admin at `app.<domain>` | `admin.<domain>` (`deploy/production/Caddyfile`; `docs/runbooks/deploy-production.md:13`) | deploy files |
| `packages/core/src/entitlements/index.ts:10`: 50 products, 1 staff, no custom domain | Fallbacks only; the plan row is unlimited products, 20 staff, custom domain included (`migration.sql:57`, 20261112090000) | the plan row |
| `docs/adr/0008-object-storage.md` image rules: "up to 10 MB" | 25 MB per file (`packages/shared/src/images.ts:7`; the ADR's own "Limits (changed Nov 2026)") | code |
| `docs/migration-plan.md:23`: Meta Pixel "Being built" | Built (`apps/admin/app/s/[handle]/settings/meta/`; `docs/migration-plan.md:55`) | code |
| `CLAUDE.md:29`: "Arabic first and RTL, English second" | Arabic only in both apps today (`apps/admin/app/layout.tsx:18`; `apps/storefront/app/layout.tsx:16`) | code |
| `docs/architecture.md:132`: weeks 9–10 include "WhatsApp and email notifications" and "theme 2" | Neither is in the code | code |
| `docs/adr/0015-landing-pages.md:3`: status "proposed" | Landing pages are built (`apps/admin/app/s/[handle]/funnels/`, `apps/storefront/app/~funnel/`) | code |
