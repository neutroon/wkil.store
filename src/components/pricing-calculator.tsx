'use client';

import { useEffect, useId, useRef, useState, type KeyboardEvent } from 'react';
import { currencyLabel, formatNumber } from '@/components/ui/money';
import { Stat } from '@/components/ui/stat';
import { monthlyFee } from '@/content/pricing';
import { CALCULATOR, averagePerOrder, formatAmount, formatPrice, isCapped, nextStop, parseOrders } from '@/lib/calculator';
import type { Locale } from '@/lib/locale';

export type CalculatorLabels = {
  ordersLabel: string;
  ordersUnit: string;
  resultLabel: string;
  averageLabel: string;
  cappedNote: string;
};

/** Screen readers hear the result once the value has settled, not on every slider step. */
const ANNOUNCE_AFTER_MS = 700;

/**
 * Orders a month in, the month's order fees out. The page's only client component: the
 * server renders it with the default, so the static HTML already shows a correct result.
 */
export function PricingCalculator({ locale, labels }: { locale: Locale; labels: CalculatorLabels }) {
  const id = useId();
  const [orders, setOrders] = useState<number>(CALCULATOR.defaultOrders);
  const [text, setText] = useState(formatNumber(CALCULATOR.defaultOrders));
  const [announcement, setAnnouncement] = useState('');
  const touched = useRef(false);

  const fee = monthlyFee(orders);
  const average = averagePerOrder(orders);
  const capped = isCapped(orders);
  const comma = locale === 'ar' ? '، ' : ', ';
  const ordersText = `${formatNumber(orders)} ${labels.ordersUnit}`;

  useEffect(() => {
    if (!touched.current) return;
    const timer = setTimeout(() => {
      const parts = [
        ordersText,
        `${labels.resultLabel}: ${formatPrice(fee, locale)}`,
        `${labels.averageLabel}: ${formatPrice(average, locale)}`,
      ];
      setAnnouncement(parts.join(comma) + (capped ? `. ${labels.cappedNote}` : ''));
    }, ANNOUNCE_AFTER_MS);
    return () => clearTimeout(timer);
  }, [ordersText, fee, average, capped, comma, labels, locale]);

  function update(value: number, fromBox = false) {
    touched.current = true;
    setOrders(value);
    if (!fromBox) setText(formatNumber(value));
  }

  function onRangeKey(event: KeyboardEvent<HTMLInputElement>) {
    // PageUp and PageDown jump between the labelled stops; arrows, Home and End stay native.
    if (event.key !== 'PageUp' && event.key !== 'PageDown') return;
    event.preventDefault();
    update(nextStop(Math.min(orders, CALCULATOR.max), event.key === 'PageUp' ? 1 : -1));
  }

  const unit = currencyLabel(locale);
  const unitFirst = locale === 'en';

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-3">
        <label id={`${id}-label`} htmlFor={`${id}-range`} className="font-semibold text-fg">
          {labels.ordersLabel}
        </label>
        <div className="flex items-center gap-3">
          <input
            id={`${id}-box`}
            type="text"
            inputMode="numeric"
            autoComplete="off"
            aria-labelledby={`${id}-label`}
            value={text}
            onChange={(e) => {
              setText(e.target.value);
              const parsed = parseOrders(e.target.value);
              if (parsed !== null) update(parsed, true);
            }}
            onBlur={() => setText(formatNumber(orders))}
            className="nums h-11 w-28 rounded-md border border-line-strong bg-transparent px-3 text-center text-subheading text-fg"
          />
          <span id={`${id}-unit`} className="text-small text-fg-muted">
            {labels.ordersUnit}
          </span>
        </div>
      </div>

      <input
        id={`${id}-range`}
        type="range"
        min={CALCULATOR.min}
        max={CALCULATOR.max}
        step={1}
        value={Math.min(orders, CALCULATOR.max)}
        aria-valuetext={ordersText}
        onChange={(e) => update(Number(e.target.value))}
        onKeyDown={onRangeKey}
        className="mt-4 block h-11 w-full cursor-pointer accent-mint"
      />
      {/* The stops, placed where the thumb's centre sits (the thumb is about 16px wide). */}
      <div aria-hidden="true" className="relative mx-2 h-6 text-micro text-fg-muted">
        {CALCULATOR.stops.map((stop) => (
          <span
            key={stop}
            className="nums absolute top-0 -translate-x-1/2 rtl:translate-x-1/2"
            style={{ insetInlineStart: `${(stop / CALCULATOR.max) * 100}%` }}
          >
            {formatNumber(stop)}
          </span>
        ))}
      </div>

      <div className="mt-6 grid grid-cols-2 gap-6 border-t border-line pt-6">
        <Stat size="md" value={formatAmount(fee)} unit={unit} unitFirst={unitFirst} label={labels.resultLabel} />
        <Stat size="md" value={formatAmount(average)} unit={unit} unitFirst={unitFirst} label={labels.averageLabel} />
      </div>
      {capped && <p className="mt-5 text-small text-accent">{labels.cappedNote}</p>}

      <p aria-live="polite" className="sr-only">
        {announcement}
      </p>
    </div>
  );
}
