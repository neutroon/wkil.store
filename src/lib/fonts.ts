import { Alyamama, Instrument_Sans } from 'next/font/google';
import type { CSSProperties } from 'react';

// Latin text and every digit, in both languages. It comes first in the font stack
// (globals.css), so numbers are always Latin digits drawn by this face.
const latin = Instrument_Sans({ subsets: ['latin'], display: 'swap' });

// Arabic text.
const arabic = Alyamama({ subsets: ['arabic'], display: 'swap', adjustFontFallback: false });

// next/font follows a family with a generated fallback ("Instrument Sans Fallback"), which is
// the visitor's local Arial under another name. Arial has Arabic letters, so with the Latin
// family first it would draw all the Arabic text before the Arabic face got a turn. Only the
// family's own name goes into the stack.
function ownFamily(fontFamily: string): string {
  return fontFamily.split(',')[0]!.trim();
}

/** Put on <html> in every root layout: `<html style={fontFamilies}>`. */
export const fontFamilies = {
  '--font-latin': ownFamily(latin.style.fontFamily),
  '--font-arabic': ownFamily(arabic.style.fontFamily),
} as CSSProperties;
