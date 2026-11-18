import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { ImageResponse } from 'next/og';
import { BRAND_NAME } from '@/lib/brand';
import { MARK_BAG, MARK_BAG_HANDLE, MARK_BAG_HANDLE_WIDTH, MARK_BUBBLE, MARK_EYES, MARK_VIEW_BOX, MARK_WINK, MARK_WINK_WIDTH } from '@/lib/logo';
import type { Locale } from '@/lib/locale';
import { visualArabic } from '@/lib/arabic-visual';
import { SITE_URL } from '@/lib/site';
import { OG_SIZE, SOCIAL_COPY } from '@/lib/social';

/*
 * The social preview (Open Graph and Twitter) and the touch icon, drawn with next/og at build
 * time. Colours are the design tokens' values (docs/design-system.md, section 3); next/og
 * cannot read CSS variables.
 *
 * Fonts (SIL Open Font License, from Google Fonts, in assets/og/): Instrument Sans for Latin
 * and digits, as on the page. Arabic is Noto Sans Arabic ExtraBold, not the page's Alyamama:
 * Satori's shaper crashes on Alyamama's contextual lookups, and Alyamama has no presentation
 * forms, which src/lib/arabic-visual.ts draws with. The Noto file is subset to the Arabic
 * block and presentation forms, with no OpenType features (none are needed).
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
  fontFile('noto-sans-arabic-800.ttf'),
]).then(([latin600, latin700, arabic800]) => [
  { name: 'Instrument Sans', data: latin600, weight: 600 as const, style: 'normal' as const },
  { name: 'Instrument Sans', data: latin700, weight: 700 as const, style: 'normal' as const },
  { name: 'Noto Sans Arabic', data: arabic800, weight: 800 as const, style: 'normal' as const },
]);

const FONT_STACK = "'Instrument Sans', 'Noto Sans Arabic'";

/** The mark (src/lib/logo.ts) as a still: the bubble, the bag in `bag`, one eye and a wink. */
function StoreMark({ size, bubble, bag }: { size: number; bubble: string; bag: string }) {
  const eye = MARK_EYES[0];
  return (
    <svg width={size} height={size} viewBox={MARK_VIEW_BOX}>
      <path d={MARK_BUBBLE} fill={bubble} />
      <path d={MARK_BAG} fill={bag} />
      <path d={MARK_BAG_HANDLE} fill="none" stroke={bag} strokeWidth={MARK_BAG_HANDLE_WIDTH} strokeLinecap="round" />
      <circle cx={eye.cx} cy={eye.cy} r={eye.r} fill={bubble} />
      <path d={MARK_WINK} fill="none" stroke={bubble} strokeWidth={MARK_WINK_WIDTH} strokeLinecap="round" />
    </svg>
  );
}

/**
 * One line of text. Arabic goes in already joined and in drawing order (see
 * src/lib/arabic-visual.ts), because Satori has no bidi and mis-measures shaped Arabic.
 */
function Line({ text, locale, style }: { text: string; locale: Locale; style: Record<string, string | number> }) {
  return <div style={{ display: 'flex', whiteSpace: 'nowrap', ...style }}>{locale === 'ar' ? visualArabic(text) : text}</div>;
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
          <StoreMark size={80} bubble={C.mint} bag={C.ink} />
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

/** The 180×180 touch icon: the mark of src/app/icon.svg, in white on the brand teal. */
export function touchIcon(): ImageResponse {
  return new ImageResponse(
    (
      <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: C.brand }}>
        <StoreMark size={140} bubble={C.white} bag={C.brand} />
      </div>
    ),
    { width: 180, height: 180 },
  );
}
