import type { Content } from '@/content/types';

export type FeatureRow = Content['features']['rows'][number];
export type DemoShop = Content['hero']['visual'];

/** A string drawn inside a row's visual; empty when the copy doesn't have the key yet. */
export function visualText(row: FeatureRow, key: string): string {
  return row.visual[key]?.trim() ?? '';
}

/**
 * An amount in pounds that the copy writes as a string ("50", "1,250"), for `Money`.
 * `null` when the string is empty or not a plain number, so the visual can leave it out.
 */
export function visualAmount(row: FeatureRow, key: string): number | null {
  const text = visualText(row, key).replace(/,/g, '');
  if (!/^\d+(\.\d+)?$/.test(text)) return null;
  return Number(text);
}
