import type { Locale } from './locale';

/**
 * The platform's public name, settled by the owner
 * (store-platform docs/adr/0020-oauth-connections.md, status line: "Wkil Store", "متجر وكيل").
 * In Arabic copy, "وكيل" never directly follows "متجر" or "متجرك" except in this name.
 */
export const BRAND_NAME: Record<Locale, string> = {
  ar: 'متجر وكيل',
  en: 'Wkil Store',
};
