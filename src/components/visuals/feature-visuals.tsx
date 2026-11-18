import {
  Banknote,
  Bot,
  ChevronDown,
  Megaphone,
  MessageCircle,
  Phone,
  Shirt,
  ShoppingBag,
  ShoppingCart,
  Target,
  Timer,
  Wrench,
} from 'lucide-react';
import type { ReactNode } from 'react';
import { BrowserFrame, Card, ChatBubble, IconTile, Money, PhoneFrame, ProductSwatch } from '@/components/ui';
import type { Locale } from '@/lib/locale';
import { visualAmount, visualText, type DemoShop, type FeatureRow } from './strings';

type VisualProps = { row: FeatureRow; shop: DemoShop; locale: Locale };

/** The landing page's timer, frozen: hours, minutes, seconds left. */
const COUNTDOWN = ['02', '14', '36'];

/**
 * One picture per feature row, keyed by the row's `key`. Every string comes from the row's
 * `visual` (the copywriter's keys are listed on each component) or from the hero's demo shop,
 * so the same shop and product appear everywhere. Decorative: the row's text says it in words.
 */
export function FeatureVisual(props: VisualProps) {
  switch (props.row.key) {
    case 'checkout':
      return <CheckoutVisual {...props} />;
    case 'landing':
      return <LandingVisual {...props} />;
    case 'recover':
      return <RecoverVisual {...props} />;
    case 'assistant':
      return <AssistantVisual {...props} />;
  }
}

function Field({ label, children, trailing }: { label?: string; children: ReactNode; trailing?: ReactNode }) {
  return (
    <span className="flex flex-col gap-1">
      {label && <span className="text-micro text-fg-muted">{label}</span>}
      <span className="flex h-9 items-center justify-between gap-2 rounded-sm border border-line px-3 text-small">
        {children}
        {trailing}
      </span>
    </span>
  );
}

/**
 * Keys: `name`, `phone`, `total` (labels), `nameValue`, `phoneValue` (what the shopper typed),
 * `governorate`, `deliveryPrice` (pounds, a plain number), `cod`, `placeOrder`. The total is
 * the demo product's price plus the delivery price, so it always adds up.
 */
function CheckoutVisual({ row, shop, locale }: VisualProps) {
  const t = (key: string) => visualText(row, key);
  const delivery = visualAmount(row, 'deliveryPrice');
  return (
    <div className="max-sm:-mx-3">
      <PhoneFrame label={shop.shopName}>
        <div className="flex h-full flex-col">
          <div className="flex h-11 shrink-0 items-center justify-between border-b border-line px-4">
            <span className="truncate text-small font-bold">{shop.shopName}</span>
            <ShoppingBag className="size-4 shrink-0" />
          </div>
          <div className="flex flex-col gap-3 p-4">
            <div className="flex items-center gap-3">
              <ProductSwatch tone="sand" icon={Shirt} className="size-11 shrink-0 rounded-sm" />
              <div className="min-w-0">
                <p className="truncate text-small">{shop.productName}</p>
                <Money amount={shop.productPrice} locale={locale} className="text-small font-bold text-shop-fg" />
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <Field label={t('name')}>
                <span className="truncate">{t('nameValue')}</span>
              </Field>
              <Field label={t('phone')}>
                {/* A phone number reads left to right in either language. */}
                <span dir="ltr" className="nums truncate">{t('phoneValue')}</span>
              </Field>
              <Field trailing={<ChevronDown className="size-4 shrink-0 text-fg-muted" />}>
                <span className="truncate">{t('governorate')}</span>
                {delivery !== null && <Money amount={delivery} locale={locale} className="ms-auto text-fg-muted" />}
              </Field>
            </div>
            <p className="flex items-center justify-between gap-3 border-t border-line pt-3 text-small font-bold">
              <span className="truncate">{t('total')}</span>
              <Money amount={shop.productPrice + (delivery ?? 0)} locale={locale} />
            </p>
            {t('cod') && (
              <p className="flex items-center gap-2 rounded-sm bg-shop-soft px-3 py-1.5 text-micro font-semibold text-shop-fg">
                <Banknote className="size-4 shrink-0" />
                <span>{t('cod')}</span>
              </p>
            )}
            <span className="flex h-10 items-center justify-center rounded-md bg-shop px-3 text-small font-semibold text-shop-on">
              {t('placeOrder')}
            </span>
          </div>
        </div>
      </PhoneFrame>
    </div>
  );
}

/**
 * Keys: `adLabel`, `pageTitle`, `offerLabel`, `offerPrice` (pounds, a plain number),
 * `countdown` (the label beside the timer).
 */
function LandingVisual({ row, shop, locale }: VisualProps) {
  const t = (key: string) => visualText(row, key);
  const offerPrice = visualAmount(row, 'offerPrice');
  return (
    <div className="relative w-full max-w-[34rem]">
      <BrowserFrame label={t('pageTitle')} url="cottonhouse.wkil.store">
        <div className="grid gap-4 p-4 sm:grid-cols-2 sm:p-5">
          <ProductSwatch tone="clay" icon={Shirt} className="aspect-[16/9] sm:aspect-square" />
          <div className="flex min-w-0 flex-col gap-3">
            <p className="text-small font-bold">{t('pageTitle')}</p>
            {t('offerLabel') && (
              <p className="flex items-center justify-between gap-3 rounded-sm border border-shop bg-shop-soft px-3 py-2 text-small">
                <span className="truncate">{t('offerLabel')}</span>
                {offerPrice !== null && <Money amount={offerPrice} locale={locale} className="font-bold text-shop-fg" />}
              </p>
            )}
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="flex items-center gap-1.5 text-micro text-fg-muted">
                <Timer className="size-4 shrink-0" />
                {t('countdown')}
              </span>
              {/* Hours, minutes, seconds: a clock reads left to right in either language. */}
              <span dir="ltr" className="nums flex gap-1 text-small font-bold">
                {COUNTDOWN.map((part, i) => (
                  <span key={i} className="rounded-sm bg-mist px-1.5">{part}</span>
                ))}
              </span>
            </div>
            <span className="hidden grid-cols-3 gap-2 sm:grid">
              <ProductSwatch tone="sand" className="aspect-square rounded-sm" />
              <ProductSwatch tone="sage" className="aspect-square rounded-sm" />
              <ProductSwatch tone="sky" className="aspect-square rounded-sm" />
            </span>
            <span className="mt-auto flex h-10 items-center justify-center rounded-md bg-shop px-3 text-small font-semibold text-shop-on">
              {shop.orderButton}
            </span>
          </div>
        </div>
      </BrowserFrame>
      {t('adLabel') && (
        // Where the shopper came from: a chip off the frame's top corner.
        <Card variant="raised" padding="none" className="absolute -top-4 end-3 flex items-center gap-2 px-3 py-1.5 text-micro font-semibold sm:-end-6">
          <Megaphone className="size-4 shrink-0 text-fg-muted rtl:-scale-x-100" />
          <span>{t('adLabel')}</span>
        </Card>
      )}
    </div>
  );
}

/** Keys: `title`, `customerName`, `whatsapp`, `call`, `makeOrder`, `pixelEvent`. */
function RecoverVisual({ row, shop, locale }: VisualProps) {
  const t = (key: string) => visualText(row, key);
  const initial = Array.from(t('customerName'))[0] ?? '';
  return (
    <div className="relative w-full max-w-[24rem]">
      <Card variant="raised" padding="sm" className="flex flex-col gap-4">
        <div className="flex items-center gap-3">
          <IconTile icon={ShoppingCart} size="sm" flip />
          <span className="truncate text-small font-bold">{t('title')}</span>
        </div>
        <div className="flex items-center gap-3 border-t border-line pt-4">
          <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-neutral-soft text-small font-bold text-neutral-fg">
            {initial}
          </span>
          <span className="min-w-0 flex-1 truncate text-small font-semibold">{t('customerName')}</span>
        </div>
        <div className="flex items-center gap-3 rounded-sm bg-mist p-2">
          <ProductSwatch tone="sand" icon={Shirt} className="size-10 shrink-0 rounded-sm" />
          <span className="min-w-0 flex-1 truncate text-small">{shop.productName}</span>
          <Money amount={shop.productPrice} locale={locale} className="text-small font-semibold" />
        </div>
        <div className="grid grid-cols-2 gap-2 text-small font-semibold">
          <span className="flex h-10 items-center justify-center gap-2 rounded-md border border-line px-2">
            <MessageCircle className="size-4 shrink-0 text-success-fg" />
            <span className="truncate">{t('whatsapp')}</span>
          </span>
          <span className="flex h-10 items-center justify-center gap-2 rounded-md border border-line px-2">
            <Phone className="size-4 shrink-0 text-fg-muted" />
            <span className="truncate">{t('call')}</span>
          </span>
          <span className="col-span-2 flex h-10 items-center justify-center rounded-md bg-brand px-3 text-brand-on">
            {t('makeOrder')}
          </span>
        </div>
      </Card>
      {t('pixelEvent') && (
        // The purchase reaching the ad account: a small event chip off the card's corner.
        <Card variant="raised" padding="none" className="absolute -top-4 end-3 flex items-center gap-2 px-3 py-1.5 text-micro font-semibold sm:-end-8">
          <Target className="size-4 shrink-0 text-accent" />
          <bdi>{t('pixelEvent')}</bdi>
          <span className="size-1.5 rounded-full bg-success-fg" />
        </Card>
      )}
    </div>
  );
}

/** Keys: `prompt`, `reply`, `toolLabel`. */
function AssistantVisual({ row, shop }: VisualProps) {
  const t = (key: string) => visualText(row, key);
  return (
    <Card variant="raised" padding="none" className="w-full max-w-[26rem] overflow-hidden">
      <div className="flex items-center gap-3 border-b border-line px-4 py-3">
        <IconTile icon={Bot} size="sm" />
        <span className="truncate text-small font-semibold">{shop.shopName}</span>
        <span className="ms-auto size-2 shrink-0 rounded-full bg-success-fg" />
      </div>
      <div className="flex min-h-64 flex-col gap-3 bg-chat-canvas p-3 sm:p-4">
        {t('prompt') && <ChatBubble side="out" time="10:24" read>{t('prompt')}</ChatBubble>}
        {t('toolLabel') && (
          <p className="flex max-w-full items-center gap-1.5 self-center rounded-sm bg-chat-in px-2.5 py-1 text-micro text-chat-meta shadow-card">
            <Wrench className="size-3.5 shrink-0" />
            <bdi className="truncate">{t('toolLabel')}</bdi>
          </p>
        )}
        {t('reply') && <ChatBubble side="in" time="10:25">{t('reply')}</ChatBubble>}
      </div>
    </Card>
  );
}
