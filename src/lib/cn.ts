type ClassValue = string | false | null | undefined;

/**
 * Joins class names, skipping falsy ones. It does not merge conflicting Tailwind
 * utilities: a primitive's variants are props, and `className` only adds to them.
 */
export function cn(...parts: ClassValue[]): string {
  return parts.filter(Boolean).join(' ');
}
