import { Banknote, MapPin, Shirt, ShoppingBag } from 'lucide-react';
import { Badge, Money, PhoneFrame, ProductSwatch, Stage, Ticket } from '@/components/ui';
import type { Locale } from '@/lib/locale';
import type { DemoShop } from './strings';

/**
 * The hero's picture: the demo shop on a phone, and the order it just received as a slip
 * hanging over the phone's start-bottom corner. Decorative: the heading says it in words.
 */
export function HeroVisual({ shop, locale, className }: { shop: DemoShop; locale: Locale; className?: string }) {
  return (
    <div aria-hidden="true" className={className}>
      <Stage>
        {/* At 360px the stage is narrower than the phone: let it use the stage's padding. */}
        <div className="max-sm:-mx-3">
          <PhoneFrame label={shop.shopName}>
            <ShopScreen shop={shop} locale={locale} />
          </PhoneFrame>
        </div>
        <div className="absolute start-2 bottom-6 w-64 sm:-start-8">
          <OrderTicket shop={shop} locale={locale} />
        </div>
      </Stage>
    </div>
  );
}

function ShopScreen({ shop, locale }: { shop: DemoShop; locale: Locale }) {
  return (
    <div className="flex h-full flex-col">
      <div className="flex h-12 shrink-0 items-center justify-between border-b border-line px-4">
        <span className="truncate text-small font-bold">{shop.shopName}</span>
        <ShoppingBag className="size-4 shrink-0" />
      </div>
      <div className="flex flex-col gap-3 p-4">
        <ProductSwatch tone="sand" icon={Shirt} className="aspect-[8/5] w-full" />
        <div>
          <p className="truncate text-small">{shop.productName}</p>
          <Money amount={shop.productPrice} locale={locale} className="text-small font-bold text-shop-fg" />
        </div>
        <span className="flex h-10 items-center justify-center rounded-md bg-shop px-3 text-small font-semibold text-shop-on">
          {shop.orderButton}
        </span>
        <div className="grid grid-cols-2 gap-3">
          <ProductSwatch tone="clay" icon={ShoppingBag} className="aspect-square" />
          <ProductSwatch tone="sage" className="aspect-square" />
          <ProductSwatch tone="sky" className="aspect-square" />
          <ProductSwatch tone="sand" className="aspect-square" />
        </div>
      </div>
    </div>
  );
}

function OrderTicket({ shop, locale }: { shop: DemoShop; locale: Locale }) {
  return (
    <Ticket
      stub={
        <div className="flex items-center justify-between gap-3">
          <span className="flex min-w-0 items-center gap-2 text-small text-fg-muted">
            <Banknote className="size-4 shrink-0" />
            <span>{shop.cashOnDelivery}</span>
          </span>
          <Money amount={shop.productPrice + shop.deliveryPrice} locale={locale} className="shrink-0 text-subheading font-bold" />
        </div>
      }
    >
      <div className="flex items-center justify-between gap-3">
        <span className="nums truncate text-small font-bold">{shop.orderLabel}</span>
        <Badge tone="info" dot>{shop.newOrder}</Badge>
      </div>
      <div className="mt-4 flex flex-col gap-2 text-small">
        <p className="flex items-center justify-between gap-3">
          <span className="truncate text-fg-muted">{shop.productName}</span>
          <Money amount={shop.productPrice} locale={locale} />
        </p>
        <p className="flex items-center gap-2">
          <MapPin className="size-4 shrink-0 text-fg-muted" />
          <span className="truncate">{shop.governorate}</span>
        </p>
      </div>
    </Ticket>
  );
}
