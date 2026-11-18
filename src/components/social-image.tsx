import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { ImageResponse } from 'next/og';
import { BRAND_NAME } from '@/lib/brand';
import type { Locale } from '@/lib/locale';
import { SITE_URL } from '@/lib/site';
import { OG_SIZE, SOCIAL_COPY } from '@/lib/social';

/*
 * The social preview (Open Graph and Twitter) and the touch icon, drawn with next/og at build
 * time. Colours are the design tokens' values (docs/design-system.md, section 3); next/og
 * cannot read CSS variables.
 *
 * Fonts (SIL Open Font License, from Google Fonts, in assets/og/): Instrument Sans for Latin
 * and digits, as on the page. Arabic is Cairo, not the page's Alyamama: Satori's shaper
 * crashes on Alyamama's contextual lookups, and Cairo shapes correctly. Satori also has no
 * bidi, so Arabic lines are laid out word by word from the right (see `Line`).
 */

const C = {
  ink: '#0f1f1d',
  inkRaised: '#182c29',
  fg: '#f1f6f5',
  fgMuted: '#b4c6c2',
  mint: '#5fd3bc',
  mintSoft: 'rgba(95, 211, 188, 0.12)',
  line: 'rgba(255, 255, 255, 0.12)',
  brand: '#0b7a6e',
  white: '#ffffff',
};

const fontFile = (name: string) => readFile(join(process.cwd(), 'assets/og', name));
const fonts = Promise.all([
  fontFile('instrument-sans-600.ttf'),
  fontFile('instrument-sans-700.ttf'),
  fontFile('cairo-800.ttf'),
]).then(([latin600, latin700, arabic800]) => [
  { name: 'Instrument Sans', data: latin600, weight: 600 as const, style: 'normal' as const },
  { name: 'Instrument Sans', data: latin700, weight: 700 as const, style: 'normal' as const },
  { name: 'Cairo', data: arabic800, weight: 800 as const, style: 'normal' as const },
]);

const FONT_STACK = "'Instrument Sans', 'Cairo'";

/** Lucide's "store" glyph, the one BrandMark draws. */
function StoreGlyph({ size, color, strokeWidth = 2 }: { size: number; color: string; strokeWidth?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
      <path d="M15 21v-5a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v5" />
      <path d="M17.774 10.31a1.12 1.12 0 0 0-1.549 0 2.5 2.5 0 0 1-3.451 0 1.12 1.12 0 0 0-1.548 0 2.5 2.5 0 0 1-3.452 0 1.12 1.12 0 0 0-1.549 0 2.5 2.5 0 0 1-3.77-3.248l2.889-4.184A2 2 0 0 1 7 2h10a2 2 0 0 1 1.653.873l2.895 4.192a2.5 2.5 0 0 1-3.774 3.244" />
      <path d="M4 10.95V19a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8.05" />
    </svg>
  );
}

const ARABIC = /[؀-ۿݐ-ݿ]/;

/**
 * One line of text in the reading direction. Satori lays text out left to right, so an
 * Arabic line is split into words, and each word into Arabic and non-Arabic runs ("ج.م"
 * is ج, ., م), placed from the right. Each Arabic run is shaped on its own.
 */
function Line({ text, locale, style }: { text: string; locale: Locale; style: Record<string, string | number> }) {
  if (locale === 'en') return <div style={{ display: 'flex', ...style }}>{text}</div>;
  const words = text.split(/\s+/).filter(Boolean);
  return (
    <div style={{ display: 'flex', flexDirection: 'row-reverse', flexWrap: 'wrap', columnGap: '0.26em', ...style }}>
      {words.map((word, i) => {
        const runs = word.match(/[؀-ۿݐ-ݿ]+|[^؀-ۿݐ-ݿ]+/g) ?? [word];
        const reversed = runs.length > 1 && runs.some((r) => ARABIC.test(r));
        return (
          <div key={i} style={{ display: 'flex', flexDirection: reversed ? 'row-reverse' : 'row' }}>
            {runs.map((run, j) => (
              <span key={j}>{run}</span>
            ))}
          </div>
        );
      })}
    </div>
  );
}

/** The 1200×630 preview for a locale. */
export async function socialImage(locale: Locale): Promise<ImageResponse> {
  const copy = SOCIAL_COPY[locale];
  const rtl = locale === 'ar';
  const row = rtl ? 'row-reverse' : 'row';
  const align = rtl ? 'flex-end' : 'flex-start';

  return new ImageResponse(
    (
      <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: '64px 72px', background: C.ink, color: C.fg, fontFamily: FONT_STACK }}>
        {/* Brand mark */}
        <div style={{ display: 'flex', flexDirection: row, alignItems: 'center', gap: 20 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 72, height: 72, borderRadius: 18, background: C.mintSoft }}>
            <StoreGlyph size={38} color={C.mint} />
          </div>
          <Line text={BRAND_NAME[locale]} locale={locale} style={{ fontSize: 40, fontWeight: rtl ? 800 : 700 }} />
        </div>

        {/* Headline */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: align, gap: rtl ? 4 : 0 }}>
          {copy.headline.map((line, i) => (
            <Line key={i} text={line} locale={locale} style={{ fontSize: rtl ? 76 : 80, fontWeight: rtl ? 800 : 700, lineHeight: rtl ? 1.35 : 1.05, letterSpacing: rtl ? 0 : '-0.03em', color: i === 0 ? C.fg : C.mint }} />
          ))}
        </div>

        {/* The price, as on the page */}
        <div style={{ display: 'flex', flexDirection: row, alignItems: 'flex-end', justifyContent: 'space-between', borderTop: `2px solid ${C.line}`, paddingTop: 32 }}>
          <div style={{ display: 'flex', flexDirection: row, alignItems: 'baseline', gap: 20 }}>
            <Line text={copy.price} locale={locale} style={{ fontSize: 56, fontWeight: 700, color: C.fg, letterSpacing: rtl ? 0 : '-0.03em' }} />
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: align }}>
              <Line text={copy.per} locale={locale} style={{ fontSize: 28, fontWeight: rtl ? 800 : 600, color: C.fg }} />
              <Line text={copy.cap} locale={locale} style={{ fontSize: 26, fontWeight: rtl ? 800 : 600, color: C.fgMuted }} />
            </div>
          </div>
          <div style={{ display: 'flex', fontSize: 28, fontWeight: 600, color: C.fgMuted }}>{new URL(SITE_URL).host}</div>
        </div>
      </div>
    ),
    { ...OG_SIZE, fonts: await fonts },
  );
}

/** The 180×180 touch icon: the store glyph on the brand teal, as in src/app/icon.svg. */
export function touchIcon(): ImageResponse {
  return new ImageResponse(
    (
      <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: C.brand }}>
        <StoreGlyph size={112} color={C.white} strokeWidth={2} />
      </div>
    ),
    { width: 180, height: 180 },
  );
}
