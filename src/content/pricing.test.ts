import { describe, expect, test } from 'vitest';
import { CAP_REACHED_AT_ORDERS, monthlyFee, monthlyFeeMinor } from './pricing';

describe('monthly order fees (ADR 0010)', () => {
  test('EGP 1.50 an order', () => {
    expect(monthlyFee(0)).toBe(0);
    expect(monthlyFee(1)).toBe(1.5);
    expect(monthlyFee(50)).toBe(75);
    expect(monthlyFee(300)).toBe(450);
  });

  test('capped at EGP 2,500 a month, reached at 1,667 orders', () => {
    expect(CAP_REACHED_AT_ORDERS).toBe(1667);
    expect(monthlyFee(1666)).toBe(2499);
    expect(monthlyFee(1667)).toBe(2500);
    expect(monthlyFee(2000)).toBe(2500);
    expect(monthlyFee(1_000_000)).toBe(2500);
  });

  test('bad input counts as whole orders from zero', () => {
    expect(monthlyFeeMinor(-5)).toBe(0);
    expect(monthlyFeeMinor(Number.NaN)).toBe(0);
    expect(monthlyFeeMinor(10.9)).toBe(1500);
  });
});
