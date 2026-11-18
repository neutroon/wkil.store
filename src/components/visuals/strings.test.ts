import { describe, expect, it } from 'vitest';
import { visualAmount, visualText, type FeatureRow } from './strings';

const row = {
  key: 'checkout',
  eyebrow: '',
  title: '',
  body: '',
  points: [],
  visual: { total: ' Total ', deliveryPrice: '50', big: '1,250', odd: '50 ج.م', half: '1.50' },
} satisfies FeatureRow;

describe('visualText', () => {
  it('reads a key, trimmed', () => {
    expect(visualText(row, 'total')).toBe('Total');
  });

  it('falls back to empty for a missing key', () => {
    expect(visualText(row, 'cod')).toBe('');
  });
});

describe('visualAmount', () => {
  it('reads plain amounts, with thousands separators and decimals', () => {
    expect(visualAmount(row, 'deliveryPrice')).toBe(50);
    expect(visualAmount(row, 'big')).toBe(1250);
    expect(visualAmount(row, 'half')).toBe(1.5);
  });

  it('is null for a missing key or a string that is not a plain number', () => {
    expect(visualAmount(row, 'missing')).toBeNull();
    expect(visualAmount(row, 'odd')).toBeNull();
    expect(visualAmount(row, 'total')).toBeNull();
  });
});
