import { describe, expect, test } from 'vitest';
import { monthlyFee } from '@/content/pricing';
import { CALCULATOR, averagePerOrder, clampOrders, formatAmount, formatPrice, isCapped, nextStop, parseOrders } from './calculator';

describe('pricing calculator', () => {
  test('the default and the stops', () => {
    expect(CALCULATOR.defaultOrders).toBe(300);
    expect(monthlyFee(CALCULATOR.defaultOrders)).toBe(450);
    expect(CALCULATOR.stops).toContain(1667);
    expect(CALCULATOR.stops[0]).toBe(CALCULATOR.min);
    expect(CALCULATOR.stops.at(-1)).toBe(CALCULATOR.max);
  });

  test('clamps to whole orders', () => {
    expect(clampOrders(-3)).toBe(0);
    expect(clampOrders(Number.NaN)).toBe(0);
    expect(clampOrders(12.7)).toBe(12);
    expect(clampOrders(5000, CALCULATOR.max)).toBe(3000);
    expect(clampOrders(1e9)).toBe(CALCULATOR.maxTyped);
  });

  test('reads typed numbers in any digits', () => {
    expect(parseOrders('300')).toBe(300);
    expect(parseOrders('1,667')).toBe(1667);
    expect(parseOrders('٣٠٠')).toBe(300);
    expect(parseOrders('۱۲۰')).toBe(120);
    expect(parseOrders('')).toBeNull();
    expect(parseOrders('abc')).toBeNull();
    expect(parseOrders('-20')).toBe(20);
  });

  test('average per order', () => {
    expect(averagePerOrder(0)).toBe(1.5);
    expect(averagePerOrder(300)).toBe(1.5);
    expect(averagePerOrder(1666)).toBe(1.5);
    expect(averagePerOrder(2000)).toBe(1.25);
    expect(averagePerOrder(3000)).toBe(0.83);
  });

  test('the cap starts at 1,667 orders', () => {
    expect(isCapped(1666)).toBe(false);
    expect(isCapped(1667)).toBe(true);
    expect(isCapped(0)).toBe(false);
  });

  test('PageUp and PageDown move between stops', () => {
    expect(nextStop(300, 1)).toBe(500);
    expect(nextStop(1000, 1)).toBe(1667);
    expect(nextStop(3000, 1)).toBe(3000);
    expect(nextStop(1666, -1)).toBe(1000);
    expect(nextStop(1667, -1)).toBe(1000);
    expect(nextStop(0, -1)).toBe(0);
  });

  test('money keeps two places when it has piastres', () => {
    expect(formatAmount(1.5)).toBe('1.50');
    expect(formatAmount(0.83)).toBe('0.83');
    expect(formatAmount(2500)).toBe('2,500');
    expect(formatAmount(2499)).toBe('2,499');
    expect(formatAmount(0)).toBe('0');
  });

  test('prices in each language', () => {
    expect(formatPrice(1.5, 'ar')).toBe('1.50 ج.م');
    expect(formatPrice(2500, 'en')).toBe('EGP 2,500');
  });
});
