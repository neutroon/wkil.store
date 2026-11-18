/**
 * The platform's prices, from store-platform docs/adr/0010-pricing-per-order.md (see
 * docs/product-facts.md, "Pricing, exactly"). Money is in piastres, as on the platform:
 * 1 EGP = 100. Change them here only, and only when the ADR changes.
 */
export const PRICING = {
  /** Each order a shopper places, VAT included. */
  perOrderMinor: 150,
  /** The most a store pays in order fees in a month. */
  monthlyCapMinor: 250_000,
  /** The store's own cancellations within this many days of the order can be free... */
  cancelWindowDays: 14,
  /** ...up to this share of the month's orders, in percent (rounded up). */
  cancelAllowancePercent: 10,
  /** A store moved over from another platform pays no order fees for this many months. */
  movedStoreFreeMonths: 3,
} as const;

/** Orders in a month at which the cap is reached: 1,667. */
export const CAP_REACHED_AT_ORDERS = Math.ceil(PRICING.monthlyCapMinor / PRICING.perOrderMinor);

/**
 * A month's order fees, in piastres, for a number of orders placed (no cancellations).
 * Non-integer or negative input counts as whole orders from zero.
 */
export function monthlyFeeMinor(orders: number): number {
  const n = Number.isFinite(orders) ? Math.max(0, Math.floor(orders)) : 0;
  return Math.min(n * PRICING.perOrderMinor, PRICING.monthlyCapMinor);
}

/** The same in pounds, for display. */
export function monthlyFee(orders: number): number {
  return monthlyFeeMinor(orders) / 100;
}

/** What one order costs, in pounds. */
export const PER_ORDER = PRICING.perOrderMinor / 100;
/** The monthly cap, in pounds. */
export const MONTHLY_CAP = PRICING.monthlyCapMinor / 100;
