import { describe, expect, test } from 'vitest';
import { ar } from './ar';
import { en } from './en';
import { getContent } from './index';
import type { Content } from './types';

/** Every string in a value, with its path, for error messages. */
function strings(value: unknown, path = ''): { path: string; text: string }[] {
  if (typeof value === 'string') return [{ path, text: value }];
  if (Array.isArray(value)) return value.flatMap((item, i) => strings(item, `${path}[${i}]`));
  if (value && typeof value === 'object') {
    return Object.entries(value).flatMap(([k, v]) => strings(v, path ? `${path}.${k}` : k));
  }
  return [];
}

const LOCALES: [string, Content][] = [
  ['ar', ar],
  ['en', en],
];

describe('Arabic and English have the same shape', () => {
  test('nav links, in the same order with the same targets', () => {
    expect(ar.nav.links.map((l) => l.href)).toEqual(en.nav.links.map((l) => l.href));
    expect(ar.nav.links.map((l) => l.href)).toEqual(['#how', '#features', '#pricing', '#faq']);
  });

  test('section ids', () => {
    for (const [, c] of LOCALES) {
      expect([c.steps.id, c.features.id, c.pricing.id, c.faq.id]).toEqual(['how', 'features', 'pricing', 'faq']);
    }
  });

  test('steps: exactly three in each', () => {
    expect(ar.steps.items).toHaveLength(3);
    expect(en.steps.items).toHaveLength(3);
  });

  test('feature rows, their points and their visual keys', () => {
    expect(ar.features.rows.map((r) => r.key)).toEqual(en.features.rows.map((r) => r.key));
    ar.features.rows.forEach((row, i) => {
      const other = en.features.rows[i]!;
      expect(row.points.length, `points of ${row.key}`).toBe(other.points.length);
      expect(Object.keys(row.visual).sort(), `visual of ${row.key}`).toEqual(Object.keys(other.visual).sort());
    });
  });

  test('feature rows carry the visual keys the engineers rely on', () => {
    const required: Record<string, string[]> = {
      checkout: ['governorate', 'deliveryPrice', 'total', 'cod', 'placeOrder', 'name', 'phone'],
      landing: ['adLabel', 'pageTitle', 'offerLabel', 'offerPrice', 'countdown'],
      recover: ['title', 'customerName', 'whatsapp', 'call', 'makeOrder', 'pixelEvent'],
      assistant: ['prompt', 'reply', 'toolLabel'],
    };
    for (const [, c] of LOCALES) {
      for (const row of c.features.rows) {
        for (const key of required[row.key]!) expect(row.visual[key], `${row.key}.${key}`).toBeTruthy();
      }
    }
  });

  test('grid items: same icons and the same soon flags, in order', () => {
    const shape = (c: Content) => c.grid.items.map((item) => [item.icon, Boolean(item.soon)]);
    expect(shape(ar)).toEqual(shape(en));
  });

  test('pricing points, moving points, FAQ and footer', () => {
    expect(ar.pricing.points.length).toBe(en.pricing.points.length);
    expect(ar.moving.points.length).toBe(en.moving.points.length);
    expect(ar.faq.items.length).toBe(en.faq.items.length);
    expect(ar.footer.columns.map((c) => c.links.map((l) => l.href))).toEqual(
      en.footer.columns.map((c) => c.links.map((l) => l.href)),
    );
  });

  test('the hero demo product costs the same in both', () => {
    expect(ar.hero.visual.productPrice).toBe(en.hero.visual.productPrice);
  });
});

describe('copy rules', () => {
  test('every "start" button says the same thing within a language', () => {
    for (const [, c] of LOCALES) {
      const starts = [c.nav.cta, c.hero.primaryCta, c.pricing.cta, c.closing.cta];
      expect(new Set(starts).size).toBe(1);
    }
  });

  test('no empty strings and no leftover TODO', () => {
    for (const [locale, c] of LOCALES) {
      for (const { path, text } of strings(c)) {
        expect(text.trim(), `${locale}.${path}`).not.toBe('');
        expect(text, `${locale}.${path}`).not.toMatch(/TODO/);
      }
    }
  });

  test('prices appear only through placeholders, never as digits', () => {
    const literals = ['1.50', '1٫50', '2,500', '2500', '1,667', '1667'];
    for (const [locale, c] of LOCALES) {
      for (const { path, text } of strings(c)) {
        for (const literal of literals) expect(text, `${locale}.${path}`).not.toContain(literal);
      }
    }
  });

  test('only known placeholders are used', () => {
    const known = new Set(['perOrder', 'cap', 'capOrders', 'freeMonths', 'cancelDays', 'cancelPercent', 'year', 'supportPhone']);
    for (const [locale, c] of LOCALES) {
      for (const { path, text } of strings(c)) {
        for (const [, key] of text.matchAll(/\{(\w+)\}/g)) expect(known.has(key!), `${locale}.${path}: {${key}}`).toBe(true);
      }
    }
  });

  test('every placeholder is filled by getContent()', () => {
    for (const locale of ['ar', 'en'] as const) {
      for (const { path, text } of strings(getContent(locale))) expect(text, `${locale}.${path}`).not.toMatch(/\{\w+\}/);
    }
  });

  test('Arabic: no "free" (مجان…), no فانل, no free trial', () => {
    for (const { path, text } of strings(ar)) {
      expect(text, path).not.toMatch(/مجان/);
      expect(text, path).not.toMatch(/فانل/);
      expect(text, path).not.toMatch(/تجربة\s+مجانية/);
    }
  });

  test('English: no "free" as a word', () => {
    // Exact strings allowed to say "free" because they are true as written. Empty on purpose:
    // the moved-store months are worded as "no order fees" instead, so nothing needs listing.
    // Add a string here only with a comment saying why it is true (docs/product-facts.md).
    const allowed = new Set<string>([]);
    for (const { path, text } of strings(en)) {
      if (allowed.has(text)) continue;
      expect(text, path).not.toMatch(/\bfree\b/i);
      expect(text, path).not.toMatch(/\bfunnels?\b/i);
    }
  });

  test('Arabic: Arabic digits are never used', () => {
    for (const { path, text } of strings(ar)) expect(text, path).not.toMatch(/[٠-٩]/);
  });

  test('product name: "وكيل" never directly follows "متجر" or "متجرك", except in the brand name', () => {
    for (const { path, text } of strings(ar)) {
      expect(text, path).not.toMatch(/متجرك\s+و?وكيل/);
      // Take out the exact brand name, then nothing may be left of the pattern.
      const withoutBrand = text.replace(/(^|[^\p{L}])متجر وكيل(?![\p{L}])/gu, '$1');
      expect(withoutBrand, path).not.toMatch(/متجر\S*\s+و?وكيل/);
    }
  });

  test('English: the WhatsApp product is "Wkil", never "WKIL" or "your Wkil store"', () => {
    for (const { path, text } of strings(en)) {
      expect(text, path).not.toMatch(/WKIL/);
      expect(text, path).not.toMatch(/your Wkil store/i);
    }
  });

  test('FAQ has 7 to 9 questions', () => {
    for (const [, c] of LOCALES) {
      expect(c.faq.items.length).toBeGreaterThanOrEqual(7);
      expect(c.faq.items.length).toBeLessThanOrEqual(9);
    }
  });
});
