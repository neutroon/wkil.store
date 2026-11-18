# Positioning research: what the alternatives say, and where we can stand

Research for the landing-page copywriter. Internal working file: re-check any competitor fact before it influences public copy.

**Date of all observations: 18 November 2026.**

## How to read this file

- **"Opened"** means I fetched the page myself and read its text. **"Search summary"** means a search engine summarised the page and I could not open it (host not reachable from this session, or the site blocked automated requests). Search-summary facts are weaker and are marked every time.
- Pages were read as raw HTML turned into text, from a US network location, without running JavaScript. Three consequences:
  1. **Section order is the order in the HTML.** Tabs, carousels and sticky bars may look different on screen.
  2. **Prices can depend on where the visitor is.** zVendo redirected its pricing page to a US version; ExpandCart showed US dollars. An Egyptian visitor may see other currencies.
  3. I cannot confirm videos or images that load by script. "Video" is listed only where the HTML shows one.
- Arabic quotes are copied from the page. ExpandCart's page uses Persian "ی" code points in places; I normalised them to "ي". Typos inside quotes are the page's own.
- **Our own facts** come from the brief (hosted store, subdomain or own domain, landing pages, cash-on-delivery checkout with a shipping price per governorate, abandoned-checkout capture, Meta Pixel and Conversions API, WhatsApp order confirmation through the sister product, a price per order placed) and from `docs/adr/0010-pricing-per-order.md` in the platform repo (EGP 1.50 per order placed, VAT included; at most EGP 2,500 a month; a shopper's cancellation through WhatsApp within 14 days is free; the merchant's own cancellations are free up to 10% of the month's orders; order fees free for 3 months for a store moved from another platform). **These numbers must be confirmed by the owner before any of them appears on the page.**
- **What is actually built is recorded in `docs/product-facts.md` (same folder, written by a teammate from the code). Where it and this file disagree, it wins.** On 18 November it says, among other things: the WhatsApp connection is built on our side but not yet open to merchants; own domains are included in the price but not yet open; shoppers pay cash on delivery only; there are no courier integrations, no export of orders or customers, no discount codes and no sales reports; the merchant's bill cannot yet be paid online; and no store is live on the new platform yet. Sections 4 to 6 are written with that in mind.

---

## 1. Competitor snapshots

### Who really competes for an Egyptian cash-on-delivery merchant

| Rank | Platform | Why it is (or is not) on the merchant's shortlist |
|---|---|---|
| 1 | **EasyOrders** | Egypt-first, built around ads and cash on delivery, already priced per order. The direct competitor. |
| 2 | **Sahl Cart** (added, not on the original list) | Egyptian, free store. EasyOrders publishes a comparison article against it, which shows merchants weigh the two. Its own site was not opened. |
| 3 | **Wuilt** | Egyptian, store is free for Egyptian merchants, own shipping and wallet service. |
| 4 | **Shopify** (seen from Egypt) | The default "serious" choice; billed in dollars, cash on delivery needs an app. |
| 5 | **YouCan** | Regional cash-on-delivery builder (Morocco-centred) with a "pay only when you sell" model. |
| 6 | **Lightfunnels** | Funnel and landing-page builder aimed at dropshipping and cash on delivery. |
| 7 | **ExpandCart** | Egyptian, classic tiered plans, broader and more corporate. |
| 8 | **zVendo** | Egyptian, aimed at brands and larger retailers (apps, point of sale). Least like our buyer. |
| 9 | **Zid** | Saudi-first; lists Egypt as a market. Reference for tone only. |

Dropped or not assessed:

- **Salla**: `salla.com` answered every request with a bot challenge (HTTP 403). No headline or price confirmed. A search summary of its help centre says the Basic plan is free. Saudi-first.
- **Taager**: not a store builder. Its page description reads «موقع تاجر طريقك للتسويق والربح من خلال الإنترنت بسهولة، نوفر لك المنتجات والتخزين والشحن والتحصيل، ابدأ تجارتك الإلكترونية الآن مجاناً بدون رأس مال.» (they supply products, storage, shipping and collection; start with no capital). A different business: reselling their catalogue. The rest of the page needs JavaScript and was not read.
- **Matjrah, Storeino**: not researched. My assumption that they are Saudi-first and Morocco-first is **unverified**.
- **Vondera**: could not identify its site through search. Not assessed.
- **Fincart, El-Dokan**: Egyptian names that appeared in search results. Not assessed.

---

### 1.1 EasyOrders (إيزي أوردرز)

Opened: <https://www.easyorders.eg/> (the old address `www.easy-orders.net` redirects here), <https://www.easyorders.eg/pricing/>, help pages on `dashboard-docs.easy-orders.net`.

- **Badge above the headline:** «#1 المنصة رقم 1 للتجارة الإلكترونية في مصر» (the number 1 e-commerce platform in Egypt).
- **Headline:** «أنشئ متجرك الإلكتروني مجانًا، وابدأ البيع خلال دقائق» (create your online store for free and start selling within minutes).
- **Sub-headline:** «إيزي أوردرز منصة متكاملة لإنشاء متجر إلكتروني بدون خبرة برمجية: المتجر والطلبات والشحن والدفع في لوحة تحكم واحدة، مع دعم عربي على مدار الساعة ودعم تسويقي لحملاتك.» (an all-in-one platform, no coding: store, orders, shipping and payment in one dashboard, Arabic support around the clock and marketing support for your campaigns).
- **Primary call to action:** «ابدأ متجرك مجانًا» (start your store for free). Secondary: «تصفّح القوالب الجاهزة» (browse ready templates). Under almost every button the same line repeats: «إنشاء المتجر مجاني · 4 سنتات فقط عن كل طلب · جاهز في أقل من 10 دقائق» (store is free, only 4 cents per order, ready in under 10 minutes).
- **Pricing (pricing page, 18 Nov 2026):** two plans. «الباقة العادية»: «$0.04 /4 سنت لكل طلب», no subscription, unlimited products, orders and visits. «الباقة الاحترافية»: «$100 / شهرياً», «عدد غير محدود من الطلبات بدون عمولة» (unlimited orders, no commission). Both list «متجرك يظل مفتوحًا حتى لو لم تجدّد الاشتراك» (your store stays open even if you do not renew), while the FAQ on the same page says «عند تأخير الدفع، سيتم إيقاف الخدمات مؤقتاً حتى يتم تجديد الاشتراك» (services pause on late payment). The domain is not included: «نحن لا نوفر دومين لك».
- **Price history, from their own pages:**
  - Help page "رصيدك" (footer says 2025): «يُخصم 2 سنت (أو 60 قرش) عن كل طلب» (2 cents, or 60 piastres, per order).
  - Their blog post dated 11 October 2025: «تأخذ فقط 0.02 على كل طلب، وتوفر خطة شهرية مقابل 50$».
  - Pricing page today: $0.04 per order and $100 a month. **Both prices are double what their own blog stated 13 months ago.** Either the older pages are stale or the price rose; I could not tell which.
- **How the fee is collected (help page "رصيدك"):** a prepaid wallet. When the balance runs out a debt builds up, and «إذا كانت المديونية تصل إلى 5 طلبات، فلن تتمكن من مشاهدة الطلبات التالية» (at a debt of 5 orders you cannot view the next orders). Top-up by card or Vodafone Cash; «هناك عمولة 14% تُضاف على المبالغ عند الدفع باستخدام فودافون كاش» (14% is added to Vodafone Cash payments, described as VAT). «يتم تحديد السعر بالجنيه المصري حسب سعر الصرف المُعتمد» (the pound price follows their exchange rate). Paid add-ons are named in the transactions help page ("Easy Catalog", "upsell"); their prices were not found.
- **Section order:** navigation → hero → number strip → scrolling feature ticker («خاصية الداون سيل», «كروس سيلينج», «حاجب الطلبات الوهمية», «Easy AI», «conversion Api», «خاصية التمويه», «صفحات هبوط جاهزة», «+15 بوابات دفع», «اعلي معدل تحويل») → "why merchants choose us" cards → 3 steps → shipping and payment logos → home-page builder → "our team is with you" (free marketing support, 24/7 support, shown as chat mock-ups) → customer receive-rate score → AI page builder → live themes by industry → Meta Ad Library proof → sales channels → shipping and payment integrations → mobile app → academy and merchant services → pricing → number strip again → a long 9-part written guide (including «لماذا يختار التجار إيزي أوردرز بديلًا لشوبيفاي؟») → FAQ → final call to action → footer.
- **Proof used:** «+150 ألف طلب يوميًا على متاجر إيزي أوردرز» (150 thousand orders a day), «+33% من شحنات التجارة الإلكترونية في مصر» (a third of Egypt's e-commerce shipments pass through their stores), «+20 ألف إعلان نشط على ميتا» with a link to Meta's Ad Library filtered on their store domain (proof the visitor can check), «عشرات الآلاف من التجار», 144 themes with live demo stores, logos (Bosta, J&T Express, DHL, FedEx, Paymob, Kashier, Stripe and more), app-store badges. No named merchant testimonial in the text I read. None of the numbers is sourced on the page.
- **Features they already claim that overlap ours:** ready landing pages and funnels, Meta and TikTok Conversions API (help page "التطبيقات"), a pixel per product, a shipping price per governorate (help page "اعدادات الشحن"), abandoned orders under the name «الطلبات المفقودة», a fake-order blocker, blocked phone numbers, and a per-customer receive-rate score: «اعرف نسبة استلام العميل قبل أن تشحن طلبه», built on «ملايين الطلبات» across their stores. The home page text **never mentions WhatsApp**; the only trace is a support link to a WhatsApp number.
- **Register and tone:** Modern Standard Arabic, direct second person, confident superlatives («المنصة الوحيدة التي…»), English loanwords for features. Reads like a market leader's page with a search-engine guide attached.
- **Merchant complaints:** none found with a source. Search summary of Google Play: 5.0 from 85 reviews for the seller app. A standard and an extended search returned no independent complaint threads.

### 1.2 Sahl Cart (سهل كارت) — added

Not opened (`sahlcart.com` is linked from the EasyOrders article below; the host was not reachable from this session). Everything here is **EasyOrders' description of a competitor** and should be treated as such.

- Source: <https://www.easyorders.eg/blog/%D8%B3%D9%87%D9%84-%D9%83%D8%A7%D8%B1%D8%AA-%D8%A3%D9%85-%D8%A7%D9%8A%D8%B2%D9%8A-%D8%A7%D9%88%D8%B1%D8%AF%D8%B1%D8%B2-%D8%A3%D9%81%D8%B6%D9%84-%D9%84%D8%A5%D9%86%D8%B4%D8%A7%D8%A1-%D9%85%D8%AA%D8%AC/> (opened, dated 11 October 2025).
- Described there as «حل مصري متكامل للتجارة الإلكترونية» with landing pages, several stores per account, own domains and shipping options, and «نفس خطط الدفع تقريبًأ» (roughly the same payment plans) as EasyOrders at the time («خطة مجانية + 0.02 لكل طلب أو 50$ شهريًا»).
- Headline, current price, section order, proof and register: **not verified.** Worth a direct look by someone in Egypt before launch.

### 1.3 Wuilt (ويلت)

Opened: <https://wuilt.com/>, <https://wuilt.com/e-commerce>, <https://wuilt.com/pricing>, <https://wuilt.com/en/pricing>, <https://wuilt.com/shipments>, <https://wuilt.com/faqs>.

- **Headline (home):** «أنشئ موقع أو متجر احترافي في 5 دقائق» (build a professional site or store in 5 minutes).
- **Sub-headline:** «✔️ لا حاجة لأي خبرة في البرمجة والتصميم ✔️ دعم فني مميز ✔️ ميزانية بسيطة» (no coding or design experience, great support, small budget).
- **Store card above the hero:** «أنشئ متجر إلكتروني مجانًا» with «ابدأ البيع أونلاين، بيع واشحن واستقبل المدفوعات — مجانًا بالكامل» (sell, ship and get paid, completely free).
- **Store page headline:** «أنشئ متجرك في خطوة وبيع من مكانك!» with «متاجر احترافية، فيها كل ما تحتاجه لتبيع أي شيء!».
- **Primary call to action:** «ابدأ تجربتك المجانية الان» (start your free trial now); on the store card «أنشئ متجرك المجاني». A WhatsApp button «اطلب تجربتك المجانية» sits beside most buttons.
- **Pricing:** the store is free for Egypt: «لعملاء ويلت في مصر، متاجر ويلت مجاناً ١٠٠٪ مدى الحياه!» (FAQ), «100% Free. Forever» (English pricing page), «دون عمولة على البيع» (store page). The listed annual plans are for company websites: from EGP 1,250 a year (US$ 50) up to EGP 17,500 (US$ 350). The same FAQ still mentions store plans «تبدأ من 200 دولار في السنة», which looks like older text for other countries. Trial length is stated as 14 days in the hero and 7 days in the FAQ.
- **Where the money is made:** not stated on the site. A search summary of an August 2025 funding article says Wuilt earns a commission on each order shipped through Wuilt Shipments (page not opened). The shipments page says cash-on-delivery money «بتنزل تلقائيًا في محفظتك» (lands in your Wuilt wallet) and «مفيش أي رسوم خفية، كل الأسعار واضحة ومحددة قبل ما تختار شركة الشحن».
- **Section order (home):** navigation → two offer cards (free store; company site «ابتداءاً من ١٥٠$ سنوياً») → hero → customer count and rating → website builder in 3 steps with features → three testimonials → store section → "everything your project needs" (search visibility, mobile, pixels, support) → showcase of live sites and stores → FAQ → footer.
- **Proof used:** «350+ ألف عميل حول العالم يثقون في ويلت» (the next line says "more than 200 thousand"), «4.9/5» with Capterra, G2 and Google logos, three named testimonials (website customers, not cash-on-delivery merchants), links to live stores.
- **Register and tone:** Modern Standard Arabic on the home and store pages; **Egyptian Arabic on the shipments page** («هتقدر تدير متجرك», «ليه شحنات ويلت؟», «إزاي تفعل شحنات ويلت؟»). Friendly, small-business, not ad-buyer language. Nothing on the pages I read about landing pages for ads, the Conversions API or abandoned checkouts; the Facebook Pixel is mentioned once.
- **Merchant complaints (search summary, small samples):** G2 (3 reviews): limited store templates and few integrations with outside payment and analytics services. Capterra: 4.8 out of 5 from 8 reviews.

### 1.4 ExpandCart (اكسباند كارت)

Opened: <https://expandcart.com/ar/>, pricing at <https://expandcart.com/ar/%d8%a7%d9%84%d8%a7%d8%b3%d8%b9%d8%a7%d8%b1/>.

- **Headline:** «انشيء متجرك الإلكتروني وابدأ نجاحك اليوم» (create your online store and start your success today).
- **Sub-headline:** «انضم إلى أكثر من 25,000 تاجر ناجح و انشيء متجرك الإلكتروني الاحترافي في خطوات بسيطة وبدون أي خبرة تقنية.»
- **Primary call to action:** an email field with «ابدأ التجربة المجانية الآن» (start the free trial now), then «احصل على 15 يوم مجانا لإنشاء موقعك الإلكتروني، بدون بيانات بنكية أو مصاريف خفية».
- **Pricing (shown in US dollars from my location):** ستاندرد $19 a month or $199 a year (up to 100 products, 1 user, 1 template); بروفيشنال $39 or $399 (1,000 products, 3 users, free domain on the yearly plan); ألتيميت $149 or $1,499 (unlimited products, 10 users, abandoned-cart app, warehouses); الأعمال on request. The comparison table shows 0% sales commission on every plan, and the page headline says «بدون عمولة على مبيعاتك». The FAQ mentions a free plan and a 14-day trial (the home page says 15).
- **Section order:** navigation → hero with email capture → template gallery by industry («أكثر من 50 قالب احترافي») → three pillars (integrations, multi-channel, dropshipping) → "sell everywhere" and "promote like a pro" → number band under «أول وأكبر منصة تجارة إلكترونية في العالم العربي» → two executive testimonials → dashboard, app market, support → closing email capture → footer.
- **Proof used:** 25,000+ stores, 10+ years, an "800+" figure labelled «مبيعات تجارنا بالدولار» whose unit I could not read, two named executives with photos, «أكثر من 6,000 ميزة».
- **Register and tone:** formal Modern Standard Arabic, long corporate sentences, speaks to "business owners" more than to page sellers.
- **Merchant complaints (search summary, small samples):** Capterra 3.5 out of 5 from 2 reviews, one from 2020 about a site that stopped working; Spotsaas 2.8 out of 5 from 15 reviews, including support being hard to reach and a cash-on-delivery feature that stopped working.

### 1.5 zVendo

Opened: <https://zvendo.com/> (English), <https://zvendo.com/ar/>, <https://zvendo.com/pricing-plans/> (redirected to the US price list), <https://zvendo.com/blog/docs/what-were-offering/>.

- **Headline (Arabic):** «احصل على كل ما تحتاجه لبدءالتجارة الالكترونية وتنميه مشروعك عبر الانترنت» (get everything you need to start e-commerce and grow your project online). English: "Empower your online growth".
- **Sub-headline (English page):** "Seamless Online Shopping Experience for your Customers with our Easy-To-Use Platform and Mobile Application. NOW you can PAY subscription in EGP."
- **Primary call to action:** «انشئ موقعك الآن» / "Start Free Trial".
- **Pricing:** **the Egyptian price list could not be confirmed** (redirected). US list: Silver $69 a month (0% commission up to $15,000 monthly sales, then 1%; many features "Extra fees"; mobile apps +$129), Gold $159. A help page last updated 30 December 2019 says: 30-day trial, then a monthly subscription "starting from EGP 499+ 2% transaction fees". Treat the pound figure as stale.
- **Section order (Arabic):** hero → design carousel → platform statement → feature list (including «الدفع بالجنية المصرى») → partner logos (banks and fintech, shipping, infrastructure) → three client testimonials → closing line «التجارة الإلكترونية هي المستقبل، ونحن مستعدون لذلك» → footer.
- **Proof used:** partner logos, named clients (a pharmaceutical company, a school-uniform distributor), "award-winning".
- **Register and tone:** formal Modern Standard Arabic with typos, English-first site, enterprise voice. Not speaking to ad-driven cash-on-delivery sellers.
- **Merchant complaints:** not searched.

### 1.6 Shopify, as seen from Egypt

Opened: <https://www.shopify.com/eg> (Arabic), <https://www.shopify.com/eg/pricing>, two app listings on `apps.shopify.com`.

- **Headline:** «كُن أنت» followed by a rotating phrase: «نجم الذكاء الاصطناعي», «الاسم الأشهر», «رائد الأعمال المستقل», «المتجر الذي يصطف الجميع أمامه» and others (be the AI star, the household name, the solo founder, the store everyone queues for).
- **Sub-headline:** «احلم بواقع أكبر وابنِ نشاطك أسرع على Shopify. منصة التجارة الأفضل في العالم.»
- **Primary call to action:** «ابدأ مجانًا» (start free).
- **Pricing (Egypt page, in US dollars):** «استمتع بفترة تجريبية مجانية لمدة 3 من الأيام، ثم ادفع ‏١ US$/شهر لمدة 3 من الأشهر». Basic US$ 19 a month billed yearly (US$ 27 monthly), Grow US$ 54, Advanced US$ 299, Plus from US$ 2,300. Basic adds «%2 لمزودي دفع من جهات خارجية» (2% when an outside payment provider is used). The page says Shopify Payments exists «في دول معينة» only; it does not say whether cash-on-delivery orders carry the 2% (**unverified**).
- **Cash on delivery needs an app.** Example opened: Releasit COD Form, free up to 60 orders a month, then $11.49 (420 orders), $29.99 (10,000 orders), $69.99 (unlimited) a month. Another, EasyOrder COD Form, is $10 a month.
- **Section order:** hero with rotating headline → strip of brand stores (American brands) → shopping inside AI chats → "be everywhere" → selling across borders → case studies → AI assistant → app store («أكثر من 21,000 تطبيق») → developer tools → checkout and reliability claims → 3 steps → footer with country picker.
- **Proof used:** global brand names, US case studies, «1.1 تريليون دولار» total sales, an outside study on checkout conversion.
- **Register and tone:** translated Modern Standard Arabic, global and aspirational, AI-led. No Egyptian example, price or payment method anywhere on the Egypt page.
- **Merchant complaints (search summaries of Shopify's own community forum):** an Egyptian merchant unable to pay a $95 subscription because of a per-transaction limit on local cards; a thread asking to pay in Egyptian pounds, answered that local-currency billing does not cover Egypt; merchants from Egypt told Shopify Payments is not available to them. Forum posts, so anecdotal.

### 1.7 YouCan

Opened: <https://youcan.shop/ar>, <https://youcan.shop/ar/pricing>.

- **Headline:** «ما تبيعه اليوم يمكن أن يصل إلى العالم» (what you sell today can reach the world).
- **Sub-headline:** «أطلق متجرك الإلكتروني، واعرض منتجاتك، وافتح أبواب تجارتك أمام عملاء من كل مكان» followed by «مجاني حتى تحقق مبيعات بقيمة 5,000 دولار» (free until you reach $5,000 in sales). Page description: «افتح متجرك في ظهيرة واحدة. بِع بالدفع عند الاستلام أو بالدفع الإلكتروني، ولا تدفع شيئاً حتى تبيع بقيمة 5,000 دولار.»
- **Primary call to action:** «ابدأ مجاناً» (start free).
- **Pricing:** two models, switchable. (a) «الدفع حسب المبيعات» under the heading «لا تدفع إلا عندما تبيع» (pay only when you sell): no subscription, nothing on the first $5,000 of sales, then cash on delivery 0.5% and online payment 1% on the next $5,000, then 0.25% and 0.5%. The page does not say whether the thresholds are lifetime or monthly. (b) Subscription: Solopreneur $29 a month (sales up to $50 thousand and 3,500 orders a month, 1 user), Starter $49, Entrepreneur $89, Premium $149, Unlimited $229 for up to 5 stores; cash-on-delivery and transaction fees $0; two months free on yearly billing.
- **Section order:** hero → [01] build («متجرك، كما تتخيّله تماماً», an interactive sentence, then the AI assistant "Mochi") → [02] sell (currencies, payment methods including cash on delivery, «صفحة لكل منتج»: «صفحات هبوط تحوّل نقرات الإعلانات إلى طلبيات») → [03] control (analytics, order source by ad platform, mobile app) → [04] scale (numbers, security, support chat) → [05] pricing → 3 steps and final call to action → footer.
- **Proof used:** «أكثر من 450 ألف متجر في أكثر من 166 دولة», 99.99% availability, polished product mock-ups. No named merchant in the text I read.
- **Register and tone:** clean, short Modern Standard Arabic. Examples are Moroccan (prices in MAD, Casablanca, «طلبية» for "order"); Egypt appears once as a sample order in EGP.
- **Merchant complaints (search summary):** one Trustpilot review, as quoted by the search summary, says the store "keeps getting down without notice". Small sample.

### 1.8 Lightfunnels

Opened: <https://www.lightfunnels.com/ar>, <https://www.lightfunnels.com/pricing>, <https://www.lightfunnels.com/ar/cod>.

- **Headline:** «مع Lightfunnels، ستجد كل ما تحتاجه لإدارة متجرك الإلكتروني بنجاح في مكان واحد!» (everything you need to run your store, in one place).
- **Sub-headline:** «سواء كنت تبحث عن مصمم فانل قوي أو متجر إلكتروني عالي التحويل، ⚡Lightfunnels هو الحل الذي لن يخذلك أبدًا.» Three bullets under it: «صفحات هبوط فائقة السرعة», «مثالي للدروبشيبينغ والدفع عند الاستلام», «يوفر الوقت والمال».
- **Primary call to action:** «ابدأ الآن - تجربة مجانية لمدة 30 يومًا» (start now, 30-day free trial), repeated after every section. A button «شاهده وهو يعمل — 3 دقائق» opens a demo video.
- **Pricing (English page):** Newbie $9.99 a month with a 1.5% transaction fee and a 0.20% cash-on-delivery fee; Standard $49.99 (0.50% and 0.10%); "COD" plan $99.99 (0.50% and 0% on cash on delivery). Extra domains $3, extra stores $5. 30-day trial, no card.
- **Section order:** hero → how it works (3 steps) → store, funnel and page builders → advanced features (bundles, order bumps, several domains, currencies, ad tracking) → use cases (stores, funnels, digital goods, dropshipping, cash on delivery) → integrations → growth features (one-click upsell, A/B tests, custom checkout, speed) → templates → testimonials → final call to action → footer.
- **Proof used:** named testimonials (in English, several comparing it to Shopify), demo video, a Facebook community.
- **Register and tone:** translated Modern Standard Arabic with English terms left in (Funnels, Upsells); testimonials untranslated. Media-buyer vocabulary.
- **Merchant complaints (search summaries):** Trustpilot 3.5 out of 5 from 79 reviews (Dutch-language Trustpilot page). Review-site cons: a buggy builder, missing mobile sale notifications, pricing.

### 1.9 Zid (زد) — reference for tone

Opened: <https://zid.sa/ar/>, <https://zid.sa/ar/pricing/>.

- **Hero text (which line is the headline is not marked in the HTML):** «ابدأ تجارتك مجانًا» and «المنصة الموثوقة والمتكاملة للتجارة الإلكترونية».
- **Sub-headline:** «نساعدك تبني، توسّع، وتنمّي متجرك الإلكتروني بكل سهولة مع حلول دفع آمنة، شحن عالمي، تمويل مرن، وتسويق فعّال، كل اللي تحتاجه عشان تصير العلامة التجارية الرائدة في السوق.»
- **Primary call to action:** «أنشئ متجرك مجاناً». Secondary: «اكتشف المتجر التجريبي» (explore the demo store).
- **Pricing (Saudi riyals):** البداية «مجاناً مدى الحياة»; الانطلاقة 99 ريال a month; النمو 299 ريال a month; الاحترافية on request. Egypt is listed under «زد متاحة في» with a link to `zid.eg`, which I could not open. Egyptian prices not seen.
- **Section order:** hero with background video → numbers → four audience cards by business stage → features → six merchant stories → "more than a store builder" → final call to action → footer.
- **Proof used:** «+13,500 تاجر», «+10 مليار ريال», «+15 مليون عميل», six short merchant stories with before and after, «تزيد احتمالية نجاح التجّار مع زد بنسبة 250%».
- **Register and tone:** warm **Saudi dialect** («كل اللي تحتاجه عشان تصير», «التجارة مو صعبة»). The only page in the set, besides Wuilt's shipments page, that writes the way its merchants talk.

---

## 2. Pricing landscape

All as seen on 18 November 2026. Currency is the page's own.

| Platform | Model | Entry price | What triggers extra cost | Source |
|---|---|---|---|---|
| EasyOrders | Flat fee per order, or flat monthly plan | Store free; **$0.04 per order**; or **$100 a month** with no per-order fee | Every order received; no ceiling unless you move to the $100 plan (cheaper above 2,500 orders a month); own domain; paid add-ons; 14% added on Vodafone Cash top-ups; pound price follows their exchange rate | [pricing](https://www.easyorders.eg/pricing/), [help](https://dashboard-docs.easy-orders.net/docs/money/top-up) |
| Sahl Cart | Per order or monthly (per EasyOrders' article, Oct 2025) | Free + $0.02 per order, or $50 a month — **unverified, competitor's description** | Not known | [article](https://www.easyorders.eg/blog/%D8%B3%D9%87%D9%84-%D9%83%D8%A7%D8%B1%D8%AA-%D8%A3%D9%85-%D8%A7%D9%8A%D8%B2%D9%8A-%D8%A7%D9%88%D8%B1%D8%AF%D8%B1%D8%B2-%D8%A3%D9%81%D8%B6%D9%84-%D9%84%D8%A5%D9%86%D8%B4%D8%A7%D8%A1-%D9%85%D8%AA%D8%AC/) |
| Wuilt | Free store for Egypt; yearly plans for websites | **EGP 0** for a store; websites from EGP 1,250 a year | Shipping through Wuilt Shipments (carrier price shown when chosen; a commission per shipped order is reported by a search summary only); business email $12 a year; 14% VAT on cash payments | [pricing](https://wuilt.com/pricing), [FAQ](https://wuilt.com/faqs) |
| ExpandCart | Tiered subscription, 0% commission | **$19 a month** or $199 a year; 15-day trial | More than 100 products, more than 1 user, abandoned-cart app (top tier, $149), templates, mobile app | [pricing](https://expandcart.com/ar/%d8%a7%d9%84%d8%a7%d8%b3%d8%b9%d8%a7%d8%b1/) |
| zVendo | Subscription, plus commission above a sales level | Egypt price **not confirmed**. US list from $69 a month; 2019 help page: from EGP 499 a month + 2% | Monthly sales above the threshold; many features marked "Extra fees"; mobile apps; point of sale | [US list](https://zvendo.com/us-pricing-plans/), [2019 help page](https://zvendo.com/blog/docs/what-were-offering/) |
| Shopify (Egypt) | Tiered subscription + payment-provider fee + apps | 3 days free, then US$ 1 a month for 3 months; then **US$ 19 a month** billed yearly (US$ 27 monthly) | 2% with an outside payment provider on Basic; a cash-on-delivery form app (free to 60 orders, then $11.49 to $69.99 a month); staff accounts; billed in dollars | [pricing](https://www.shopify.com/eg/pricing), [app](https://apps.shopify.com/releasit-cod-order-form?locale=ar) |
| YouCan | Percentage of sales, or subscription | **$0 until the first $5,000 of sales**, then 0.5% on cash-on-delivery orders (1% online); or **$29 a month** with no fees | Order value (percentage), monthly sales and order limits per plan, staff accounts | [pricing](https://youcan.shop/ar/pricing) |
| Lightfunnels | Subscription + percentage | **$9.99 a month** + 1.5% transaction fee + 0.20% on cash-on-delivery orders; 30-day trial | Sales volume, extra domains ($3) and stores ($5), $99.99 plan to remove the cash-on-delivery fee | [pricing](https://www.lightfunnels.com/pricing) |
| Zid | Free tier + subscription | Free; then **SAR 99 a month** | Features by plan. Egyptian prices not seen | [pricing](https://zid.sa/ar/pricing/) |
| Salla | Free tier + subscription | **Not confirmed** (site blocked; Basic free per a search summary) | Not confirmed | [help centre](https://help.salla.sa/ar/article/manage-your-store-package/rhzl2dh5f5f9uz0qo813nttb) |

What the table says:

1. **The entry price is "free" almost everywhere.** EasyOrders, Wuilt, YouCan, Zid and (reportedly) Salla and Sahl Cart all open with a free store. Only ExpandCart, Shopify, Lightfunnels and zVendo start with a subscription, and all four soften it with a trial.
2. **Paying per order already exists in Egypt.** EasyOrders charges a flat amount per order; YouCan and Lightfunnels charge a percentage of each order; EasyOrders tells Shopify users «تدفع عن الطلبات التي تصلك فقط، دون اشتراك شهري إلزامي». Our model is not new to this merchant. Its *terms* can be.
3. **Usage fees are quoted in US cents or percent, never in pounds.** Only Wuilt (website plans) and zVendo (a feature bullet) put the pound on the page.
4. **No usage-based fee has a monthly ceiling.** The only way out of a growing bill is to switch to a flat plan ($100 at EasyOrders, $29 at YouCan, $99.99 at Lightfunnels).
5. **No page says what happens to the fee when an order is cancelled, refused or returned.**
6. **Prices move.** EasyOrders' own blog said $0.02 and $50 in October 2025; the pricing page says $0.04 and $100 now.

**Where we sit (internal, from ADR 0010, to be confirmed):** EGP 1.50 per order placed, VAT included, at most EGP 2,500 a month (reached at 1,667 orders). Against EasyOrders' $0.04, our per-order fee is lower whenever one dollar costs more than EGP 37.50; I did not look up today's rate. Their flat plan pays off above 2,500 orders a month; our ceiling arrives earlier and in pounds. Wuilt's store is free, so **we cannot win on "cheapest"** and should not try. Do not publish a named price comparison.

---

## 3. What everyone says

These promises are on nearly every page. Leading with any of them makes us sound like the others.

| Shared promise | Who says it (verbatim) |
|---|---|
| A store in minutes | Wuilt «في 5 دقائق»; EasyOrders «خلال دقائق», «في أقل من 10 دقائق»; YouCan «في ظهيرة واحدة»; Zid «في 24 ساعة»; zVendo "in minutes" |
| Free | EasyOrders «ابدأ متجرك مجانًا»; Wuilt «مجانًا بالكامل»; YouCan «ابدأ مجاناً»; Shopify «ابدأ مجانًا»; Zid «ابدأ تجارتك مجانًا»; ExpandCart «انشاء متجر مجاني» |
| No coding, no developer | EasyOrders «بدون خبرة برمجية»; Wuilt «لا حاجة لأي خبرة في البرمجة والتصميم»; ExpandCart «بدون أي خبرة تقنية»; YouCan «بدون أي برمجة»; zVendo "No developer needed" |
| No hidden fees | Wuilt «بدون بطاقة بنكية أو مصاريف خفية»; ExpandCart «بدون بيانات بنكية أو مصاريف خفية»; EasyOrders «لا توجد رسوم خفية»; Lightfunnels "no hidden fees" |
| Everything in one place | EasyOrders «في لوحة تحكم واحدة»; Lightfunnels «في مكان واحد»; ExpandCart «من خلال لوحة تحكم واحدة»; Shopify «من مكان واحد»; Zid «المتكاملة» |
| Number one, first, biggest, best | EasyOrders «المنصة رقم 1 … في مصر»; ExpandCart «أول وأكبر منصة … في العالم العربي»; Shopify «منصة التجارة الأفضل في العالم»; Wuilt «أفضل منصة عربية» |
| Big merchant counts | YouCan 450 thousand stores; Wuilt 350 thousand customers; ExpandCart 25,000; Zid 13,500; EasyOrders 150 thousand orders a day |
| Highest conversion | EasyOrders «أعلى معدل تحويل»; Lightfunnels «عالي التحويل»; Shopify «صفحة الدفع الأفضل تحويلاً في العالم» |
| Fast landing pages for ads | Lightfunnels «صفحات هبوط فائقة السرعة»; YouCan «صفحات هبوط تحوّل نقرات الإعلانات إلى طلبيات»; EasyOrders «صفحات هبوط جاهزة», «أسرع متجر إلكتروني» |
| Arabic support around the clock | EasyOrders «دعم عربي 24/7»; ExpandCart «على مدار الساعة»; Shopify «على مدار الساعة طوال أيام الأسبوع» |
| AI builds it for you | Shopify, YouCan ("Mochi"), EasyOrders ("Easy AI"), Lightfunnels ("Free AI") |
| Pay only when you sell | YouCan «لا تدفع إلا عندما تبيع»; EasyOrders «تدفع عن الطلبات التي تصلك فقط» |
| No commission on sales | ExpandCart «بدون عمولة على مبيعاتك»; Wuilt «دون عمولة على البيع»; YouCan subscription plans |

Also shared: the main button contains the word "free" («مجانًا» or «المجانية») on seven of the eight Arabic pages opened (all except zVendo, whose English page says "Start Free Trial"), and the register is Modern Standard Arabic everywhere except Zid (Saudi dialect) and one Wuilt page (Egyptian).

**What nobody says** on the pages I read:

- That an order gets **confirmed with the customer before shipping**. EasyOrders comes closest with a receive-rate score and a suggestion to phone the customer; its home page text does not mention WhatsApp. (Shopify's cash-on-delivery apps do sell phone verification by WhatsApp or SMS, as an extra.)
- A **usage price in pounds with a monthly ceiling**.
- What the merchant pays when the **customer cancels**.
- A **measured** loading time. Speed is always an adjective.
- What happens to **your domain, products and customer list if you leave**.
- **Support hours** that sound real rather than "24/7".
- Anything in **Egyptian Arabic** aimed at a merchant who runs ads (Wuilt's Egyptian voice is on a shipping page).

---

## 4. Gaps and angles

Three different ways to stand. Each can be the hero; the other two then become sections.

### Angle A — The bill you can predict, in pounds

- **Promise:** «سعر واحد بالجنيه على كل طلب، وبحد أقصى معروف في الشهر — من غير باقات ولا اشتراك.» (One price in pounds for each order, with a known monthly ceiling. No plans, no subscription.)
- **Resonates with:** merchants whose orders swing with ad spend and season; anyone who has paid a dollar subscription through a quiet month, or had a card refused on a dollar bill; small pages that want to start without committing to a plan.
- **Proof it needs:** the exact price and ceiling on the page; a slider that turns "orders a month" into a bill; a picture of a real monthly bill; a written line on what is never charged (imported orders, the customer's own cancellation through WhatsApp, the merchant's cancellations up to the allowance); a statement of how much notice we give before a price change.
- **Risk:** per-order pricing is already the leader's line, in cents that look smaller than 1.50; Wuilt says "free forever". A price-led hero invites a price comparison we do not clearly win at every exchange rate. Our fee is on orders **placed**, not delivered, and a merchant who reads "pay per order" as "pay per delivered order" will feel misled. The price was decided a week ago (ADR dated 11 November, revised 14 November) and may still change.

### Angle B — Orders that are confirmed before you ship

- **Promise:** «متجرك بيأكّد الطلب مع العميل على واتساب قبل ما تشحن، والطلب اللي العميل يلغيه مش بتتحاسب عليه.» (Your store confirms each order with the customer on WhatsApp before you ship, and you are not billed for an order the customer cancels.)
- **Resonates with:** merchants already spending on Facebook, Instagram or TikTok ads whose real problem is refused parcels and paying shipping twice; teams that phone every customer by hand to confirm.
- **Proof it needs:** a short screen recording of the whole path (ad → landing page → order → WhatsApp message → "مؤكد" in the orders list); real figures for confirmation and refusal rates from stores using it (none exist on the new platform yet), published only when true and with the store's consent; the cost of the WhatsApp side stated on the same page; the billing rule in one plain sentence with its conditions (within 14 days, through the connected WhatsApp product).
- **Risk:** `docs/product-facts.md` marks the WhatsApp connection as only partly ready (our side built, not open to merchants yet), so **this angle cannot lead until it is open.** It depends on the sister product, which has its own setup and price; if that cost is hidden the page breaks its own honesty. A "fewer returns" claim without numbers is the same adjective everyone else uses. The leader has a network-wide receive-rate score we cannot match on data. Only the *shopper's* cancellation is free: writing "you pay only for confirmed orders" would be **false** (an order nobody answers is still charged).

### Angle C — Built for the path from ad to order

- **Promise:** «صفحة هبوط سريعة لكل إعلان، وكل طلب بيتسجّل صح عند ميتا.» (A fast landing page for every ad, and every order reported correctly to Meta.)
- **Resonates with:** media buyers and single-product sellers who judge a platform by cost per order; dropshippers who launch and kill products weekly.
- **Proof it needs:** loading times measured on a mid-range Android phone over mobile data, with the test link; a screenshot of Meta's event quality for a live store; a landing page the visitor can open and order from; the abandoned-checkout list with phone numbers shown in the admin.
- **Risk:** the most crowded ground. Lightfunnels, YouCan and EasyOrders all sell landing pages, conversion and tracking, and EasyOrders adds TikTok tracking and free help with campaigns. Without published measurements this is a claim of parity.

**Recommendation: lead with B, and let A be its proof in the pricing section.** B is the only promise no competitor makes in its first screen, it names the cost a cash-on-delivery merchant feels most, and it turns our price from "another per-order fee" into a fair one: the store confirms the order, and a customer's cancellation is not billed. A alone is contested (free stores, cents per order). C alone is what three others already say. Use C as the section that shows we cover the basics.

**Condition:** B needs the WhatsApp connection open to merchants on launch day. If it is not, lead with A (the predictable bill in pounds), keep WhatsApp confirmation as a section that states its real status, and move B into the hero the day it opens.

---

## 5. Merchant objections

Each row: the question as a merchant would ask it, an honest way to answer on the page, and what must be checked internally first. Arabic follows `docs/reference/arabic-glossary.md` in the platform repo (Egyptian, masculine singular).

| # | The question | Honest answer on the page | Check first |
|---|---|---|---|
| 1 | «هدفع كام بالظبط؟ وفيه مصاريف مستخبية؟» (What exactly will I pay?) | One small table: the price per order, the monthly ceiling, and every extra that exists (own domain bought elsewhere, WhatsApp messages, any add-on). Add a slider. Do not write "no hidden fees"; show the list instead. | Final price, ceiling, VAT wording, add-on prices |
| 2 | «الطلب اللي اتلغى أو رجع، هتحاسب عليه؟» (Am I charged for cancelled or returned orders?) | Say it straight: the fee is for every order placed. Free: an order the customer cancels through the WhatsApp confirmation within 14 days; your own cancellations up to 10% of the month's orders. A parcel refused at the door has no status of its own: the merchant cancels the order, which is free only inside the 14 days and the 10%. | ADR 0010 rules still current; which WhatsApp connection qualifies |
| 3 | «والطلبات الوهمية والمرتجعات؟» (Fake orders and returns?) | Describe what the store does: confirmation on WhatsApp before shipping, a valid Egyptian mobile number required at checkout. Say what it does not do: it cannot guarantee delivery. Give a return-rate figure only from our own stores. | Real figures; exact checkout validation |
| 4 | «المتجر سريع على الموبايل؟» (Is it fast on a phone?) | Publish the measured time for a real store page on a mid-range phone and link the test, so the merchant can run it. No "الأسرع". | Measurements on production |
| 5 | «البكسل و Conversions API هيتظبطوا إزاي؟» (How do tracking and the Conversions API get set up?) | Paste the pixel id and token, no code. State which events are sent, that a purchase is reported once per order from both browser and server, and which ad platforms are covered. If TikTok or Snapchat are not covered, say so. | Supported platforms and events |
| 6 | «عندي متجر على منصة تانية، هنقل إزاي؟» (I have a store elsewhere; how do I move?) | Say exactly what we move and what the merchant re-enters. Mention the months without order fees for a moved store, if confirmed. Do not name the platform they come from. | What the importer handles outside our old stores; the 3 free months |
| 7 | «الدومين والداتا بتوعي؟» (Are the domain and the data mine?) | The domain is registered in your name with your registrar; you point it at the store and can point it away. Say truthfully what a merchant can take out today: `product-facts.md` says export of orders and customers is not built and own domains are not open yet, so until they are, say so and give the date or the manual route. State what happens to the store if a bill goes unpaid. | Dates for export and own domains; the overdue rule (read-only after 14 days) |
| 8 | «الدعم بالعربي؟ ومين هيرد عليا؟» (Arabic support? Who answers?) | Name the channel (WhatsApp) and the real hours and reply time. Competitors promise 24/7; an honest "every day from X to Y, reply within Z" is more believable from a new product. | Real hours and staffing |
| 9 | «بتربطوني بشركة الشحن؟» (Do you connect me to a courier?) | Competitors lead with courier logos, so this will be asked. Answer with what exists today: a delivery price per governorate at checkout; the merchant ships with their own courier and updates the order status by hand. No courier integration yet (`product-facts.md`). | Whether a date can be given |
| 10 | «العميل يقدر يدفع فيزا أو محفظة؟» (Can the shopper pay online?) | Cash on delivery only, today. Say it plainly, and mention card payment only if there is a committed date. | Any committed date |
| 11 | «هدفع ليكم إزاي؟» (How do I pay you?) | A bill once a month in pounds, with nothing to top up in advance. Describe the way of paying that works on launch day: `product-facts.md` says paying the bill online is not open yet and bills are settled through support for now. | Whether online bill payment is open at launch |
| 12 | «لازم أشترك في خدمة الواتساب؟» (Must I subscribe to the WhatsApp product?) | No, the store works without it; with it, orders are confirmed on WhatsApp. Give its price or link to it. If the connection is not open yet, say so. | Sister product's price and setup steps |
| 13 | «أجرب قبل ما أدفع؟» (Can I try before paying?) | Opening a store costs nothing and you can preview it before publishing; the first charge is your first order. Do not call this a "free trial" or "free plan". | That store creation is free of any setup fee |
| 14 | «انتو لسه جداد، إيه اللي يضمن؟» (You are new; what is the guarantee?) | Do not hide it. `product-facts.md` says no store is live on the new platform yet, so show stores only once there are consenting ones; until then say who is behind it and repeat the answer from row 7. | Whether any store is live by launch and agrees to be shown |

Background for rows 2 and 3 (do not quote as fact): a vendor blog estimates cash on delivery at 70 to 85% of Egyptian online orders, and a search summary of an Egyptian Streets article mentions 25 to 30% of such orders failing in some markets. Neither was verified.

---

## 6. Recommended page structure

Built on Angle B with A as proof (if the WhatsApp connection is not open at launch, swap sections 5 and 9 and write the hero from Angle A). One purpose per section.

1. **Top bar** — logo, three links (المميزات، الأسعار، الأسئلة), the primary button. Purpose: let a returning visitor act at once.
2. **Hero** — the confirmed-order promise, one supporting sentence naming the store, landing pages and cash on delivery, the two buttons, one line of price truth under them. Visual: a phone showing the order form beside the WhatsApp confirmation. Purpose: say the one thing others do not.
3. **The order's path** — four steps: إعلان → صفحة هبوط → طلب بالدفع عند الاستلام → تأكيد على واتساب. Purpose: show the product as the merchant's own daily flow.
4. **Proof strip** — only what is true on launch day: a measured loading time, the 27 governorates with a delivery price each, live stores once there are any (with consent). Purpose: earn belief without vanity numbers.
5. **Confirmation on WhatsApp** — how it works, what it needs, what it costs, and whether it is open yet. Purpose: carry the hero's claim and its conditions.
6. **Checkout made for Egypt** — a shipping price per governorate, mobile number check, offers. Purpose: show it fits cash on delivery here.
7. **Landing pages for your ads** — one page per product or ad, with the speed figure. Purpose: answer the media buyer.
8. **Tracking and abandoned checkouts** — Pixel and Conversions API without code; the list of people who started an order and left. Purpose: show money is not lost between ad and order.
9. **Pricing** — one price, the ceiling, the slider, "what you never pay for", "what costs extra". Purpose: turn the price into evidence of fairness.
10. **Moving from another platform** — what we move, how long, the fee-free months if confirmed. Purpose: remove the switching fear.
11. **Your domain and your data** — own domain, what you can take with you, what happens if you leave, each stated as it really is on launch day. Purpose: answer the trust question nobody else answers.
12. **Support** — channel, hours, reply time. Purpose: a believable promise.
13. **Questions** — the objections in section 5, in the merchant's words. Purpose: catch what the sections missed.
14. **Final call to action** — the primary button again with the price line. Purpose: close.
15. **Footer** — legal pages, contact, the sister product.

**Calls to action**

| | Egyptian Arabic | English |
|---|---|---|
| Primary | «افتح متجرك دلوقتي» | Open your store now |
| Line under it | «من غير اشتراك شهري · بتدفع على الطلب بس» | No monthly subscription · you pay per order only |
| Secondary | «شوف متجر شغّال» | See a live store |
| Alternative secondary, near pricing | «احسب فاتورتك» | Work out your bill |
| In support and questions | «كلّمنا على واتساب» | Talk to us on WhatsApp |

Avoid «ابدأ مجانًا» and any form of "free": seven of the eight pages opened put it in the main button, and it would not be true of a store that pays per order.

---

## 7. Sources

Every date of access is **18 November 2026**.

### Opened and read

| Page | URL |
|---|---|
| EasyOrders home (redirect target of `www.easy-orders.net`) | <https://www.easyorders.eg/> |
| EasyOrders pricing | <https://www.easyorders.eg/pricing/> |
| EasyOrders blog: Sahl Cart comparison (11 Oct 2025) | <https://www.easyorders.eg/blog/%D8%B3%D9%87%D9%84-%D9%83%D8%A7%D8%B1%D8%AA-%D8%A3%D9%85-%D8%A7%D9%8A%D8%B2%D9%8A-%D8%A7%D9%88%D8%B1%D8%AF%D8%B1%D8%B2-%D8%A3%D9%81%D8%B6%D9%84-%D9%84%D8%A5%D9%86%D8%B4%D8%A7%D8%A1-%D9%85%D8%AA%D8%AC/> |
| EasyOrders help: introduction | <https://dashboard-docs.easy-orders.net/docs/intro> |
| EasyOrders help: wallet balance and per-order deduction | <https://dashboard-docs.easy-orders.net/docs/money/top-up> |
| EasyOrders help: transactions and add-ons | <https://dashboard-docs.easy-orders.net/docs/money/transactions> |
| EasyOrders help: missed (abandoned) orders | <https://dashboard-docs.easy-orders.net/docs/orders-management/missed-orders> |
| EasyOrders help: apps (Conversions API, pixels) | <https://dashboard-docs.easy-orders.net/docs/app-stores> |
| EasyOrders help: shipping per governorate | <https://dashboard-docs.easy-orders.net/docs/store-management/shipping> |
| EasyOrders help: pixel per product | <https://dashboard-docs.easy-orders.net/docs/products-management/Custom-Pixel> |
| Wuilt home | <https://wuilt.com/> |
| Wuilt stores | <https://wuilt.com/e-commerce> |
| Wuilt pricing (Arabic, English) | <https://wuilt.com/pricing>, <https://wuilt.com/en/pricing> |
| Wuilt Shipments | <https://wuilt.com/shipments> |
| Wuilt FAQ | <https://wuilt.com/faqs> |
| Wuilt help: wallet | <https://help.wuilt.com/en/updates/get-paid-safely-with-the-all-new-wuilt-wallet> |
| ExpandCart home (Arabic) | <https://expandcart.com/ar/> |
| ExpandCart pricing (Arabic) | <https://expandcart.com/ar/%d8%a7%d9%84%d8%a7%d8%b3%d8%b9%d8%a7%d8%b1/> |
| zVendo home (English, Arabic) | <https://zvendo.com/>, <https://zvendo.com/ar/> |
| zVendo pricing (served the US list) | <https://zvendo.com/pricing-plans/> → <https://zvendo.com/us-pricing-plans/> |
| zVendo help: pricing guide (updated 30 Dec 2019) | <https://zvendo.com/blog/docs/what-were-offering/> |
| Shopify Egypt home | <https://www.shopify.com/eg> |
| Shopify Egypt pricing | <https://www.shopify.com/eg/pricing> |
| Shopify app: Releasit COD Form | <https://apps.shopify.com/releasit-cod-order-form?locale=ar> |
| Shopify app: EasyOrder COD Form | <https://apps.shopify.com/easyorder?locale=ar> |
| YouCan home (Arabic) | <https://youcan.shop/ar> |
| YouCan pricing (Arabic) | <https://youcan.shop/ar/pricing> |
| Lightfunnels home (Arabic) | <https://www.lightfunnels.com/ar> |
| Lightfunnels pricing | <https://www.lightfunnels.com/pricing> |
| Lightfunnels cash-on-delivery plan | <https://www.lightfunnels.com/ar/cod> |
| Lightfunnels help: billing | <https://docs.lightfunnels.com/settings/billing/> |
| Zid home, pricing | <https://zid.sa/ar/>, <https://zid.sa/ar/pricing/> |
| Taager (page description only) | <https://taager.com/sa> |
| eGrow blog (vendor content, low confidence; used only for the cash-on-delivery share estimate) | <https://www.egrow.com/en/blog/easyorders-vs-shopify-egypt-cod-2026> |

### Search summaries only (page not opened)

| Used for | URL |
|---|---|
| Shopify: subscription payment refused on Egyptian cards | <https://community.shopify.com/t/cant-pay-shopify-subscription-95-one-payment/289554> |
| Shopify: paying in Egyptian pounds | <https://community.shopify.com/t/can-i-pay-for-my-website-plan-in-egyptian-pounds/266577> |
| Shopify Payments not available to Egyptian merchants | <https://community.shopify.com/t/can-non-us-residents-use-shopify-payments/285773> |
| Lightfunnels Trustpilot score | <https://nl.trustpilot.com/review/lightfunnels.com> |
| Lightfunnels review-site cons | <https://www.capterra.com/p/239907/Lightfunnels/> |
| ExpandCart reviews | <https://www.capterra.com/p/183564/ExpandCart/>, <https://www.spotsaas.com/product/expandcart> |
| Wuilt reviews | <https://www.g2.com/products/wuilt/reviews>, <https://www.capterra.com/p/188990/Wuilt/reviews/> |
| YouCan Trustpilot | <https://ca.trustpilot.com/review/youcan.shop> |
| EasyOrders seller app rating | <https://play.google.com/store/apps/details?id=com.myeasyorders.seller&hl=en_US> |
| Wuilt free in Egypt since April 2025; funding | <https://www.wamda.com/en/2025/08/wuilt-raises-2-million-expand-free-website-builder-mena> |
| Wuilt earns a commission on shipped orders | <https://en.incarabia.com/egyptwuilt-raises-us2-million-to-democratize-ecommerce-765835.html> |
| Salla Basic plan free | <https://help.salla.sa/ar/article/manage-your-store-package/rhzl2dh5f5f9uz0qo813nttb> |
| Share of cash-on-delivery orders failing | <https://egyptianstreets.com/2025/07/13/egyptian-startup-tackles-fake-cash-on-delivery-orders-new-shopify-app/> |

### Tried and failed

| URL | Result |
|---|---|
| <https://salla.com/> | HTTP 403, bot challenge |
| <https://www.trustpilot.com/review/wuilt.com> and the same path for `expandcart.com`, `youcan.shop`, `lightfunnels.com`, `easy-orders.net` | HTTP 403 |
| <https://youcan.shop/ar/help/invoices/due-amount> | HTTP 404 |
| `sahlcart.com`, `zid.eg` | Host not reachable from this session; not opened |

### Not verified — open items

- **Salla:** headline, price, everything.
- **Sahl Cart:** everything except what EasyOrders wrote about it in October 2025.
- **zVendo:** the current Egyptian price.
- **ExpandCart:** whether an Egyptian visitor sees pound prices; the free plan mentioned in its FAQ; the unit of the "800+" figure.
- **Zid:** Egyptian prices and whether its Egypt site differs.
- **Wuilt:** how the free store earns money (one search summary only); which trial length is current.
- **EasyOrders:** which of its stated prices applied when (2 cents in the help page and blog, 4 cents on the pricing page); add-on prices; every number in its proof strip is its own claim.
- **YouCan:** whether the $5,000 thresholds are lifetime or monthly; what is available to merchants in Egypt.
- **Shopify:** whether the 2% outside-provider fee applies to cash-on-delivery orders.
- **Lightfunnels, YouCan:** how many Egyptian merchants actually use them. I found no Egypt-specific claim on either site.
- **All review and forum evidence** in the "merchant complaints" lines: search summaries of small samples.
- **All section orders:** read from HTML, not from the rendered page.
- **Exchange rate:** none looked up; the comparison in section 2 is stated as a break-even rate instead.
- **Our own numbers and rules** (price, ceiling, cancellation rules, fee-free months): taken from the brief and ADR 0010; `docs/product-facts.md` is the authority on what is built. Still needing the owner's answer: support hours, the WhatsApp product's price, and the launch-day status of the WhatsApp connection, own domains and online bill payment.
- **Matjrah, Storeino, Vondera, Fincart, El-Dokan, Taager's product:** not researched.
