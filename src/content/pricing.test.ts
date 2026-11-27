import { describe, expect, test } from 'vitest';
import { CAP_REACHED_AT_ORDERS, monthlyFee, monthlyFeeMinor } from './pricing';

describe('monthly order fees (ADR 0010)', () => {
  test('EGP 1.50 an order', () => {
    expect(monthlyFee(0)).toBe(0);
    expect(monthlyFee(1)).toBe(1.5);
    expect(monthlyFee(50)).toBe(75);
    expect(monthlyFee(300)).toBe(450);
  });

  test('capped at EGP 5,000 a month, reached at 3,334 orders', () => {
    expect(CAP_REACHED_AT_ORDERS).toBe(3334);
    expect(monthlyFee(3333)).toBe(4999.5);
    expect(monthlyFee(3334)).toBe(5000);
    expect(monthlyFee(4000)).toBe(5000);
    expect(monthlyFee(1_000_000)).toBe(5000);
  });

  test('bad input counts as whole orders from zero', () => {
    expect(monthlyFeeMinor(-5)).toBe(0);
    expect(monthlyFeeMinor(Number.NaN)).toBe(0);
    expect(monthlyFeeMinor(10.9)).toBe(1500);
  });
});
