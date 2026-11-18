/**
 * Arabic for the social image. Satori (next/og) has no bidi and measures Arabic words with
 * their unjoined widths, so Arabic text comes out with words in the wrong order and uneven
 * gaps. This turns a line into its visual form instead: each letter replaced by its joined
 * presentation form (U+FE70–U+FEFF, which needs no OpenType shaping) and everything put in
 * left-to-right display order. Only for drawing images; never for the page.
 *
 * Scope: one line of Arabic with Latin numbers and punctuation in it. A Latin phrase of
 * several words inside Arabic would come out with its words reversed.
 */

// [isolated, final, initial, medial]; right-joining letters have only the first two.
const FORMS: Record<string, number[]> = {
  'ء': [0xfe80],
  'آ': [0xfe81, 0xfe82],
  'أ': [0xfe83, 0xfe84],
  'ؤ': [0xfe85, 0xfe86],
  'إ': [0xfe87, 0xfe88],
  'ئ': [0xfe89, 0xfe8a, 0xfe8b, 0xfe8c],
  'ا': [0xfe8d, 0xfe8e],
  'ب': [0xfe8f, 0xfe90, 0xfe91, 0xfe92],
  'ة': [0xfe93, 0xfe94],
  'ت': [0xfe95, 0xfe96, 0xfe97, 0xfe98],
  'ث': [0xfe99, 0xfe9a, 0xfe9b, 0xfe9c],
  'ج': [0xfe9d, 0xfe9e, 0xfe9f, 0xfea0],
  'ح': [0xfea1, 0xfea2, 0xfea3, 0xfea4],
  'خ': [0xfea5, 0xfea6, 0xfea7, 0xfea8],
  'د': [0xfea9, 0xfeaa],
  'ذ': [0xfeab, 0xfeac],
  'ر': [0xfead, 0xfeae],
  'ز': [0xfeaf, 0xfeb0],
  'س': [0xfeb1, 0xfeb2, 0xfeb3, 0xfeb4],
  'ش': [0xfeb5, 0xfeb6, 0xfeb7, 0xfeb8],
  'ص': [0xfeb9, 0xfeba, 0xfebb, 0xfebc],
  'ض': [0xfebd, 0xfebe, 0xfebf, 0xfec0],
  'ط': [0xfec1, 0xfec2, 0xfec3, 0xfec4],
  'ظ': [0xfec5, 0xfec6, 0xfec7, 0xfec8],
  'ع': [0xfec9, 0xfeca, 0xfecb, 0xfecc],
  'غ': [0xfecd, 0xfece, 0xfecf, 0xfed0],
  'ف': [0xfed1, 0xfed2, 0xfed3, 0xfed4],
  'ق': [0xfed5, 0xfed6, 0xfed7, 0xfed8],
  'ك': [0xfed9, 0xfeda, 0xfedb, 0xfedc],
  'ل': [0xfedd, 0xfede, 0xfedf, 0xfee0],
  'م': [0xfee1, 0xfee2, 0xfee3, 0xfee4],
  'ن': [0xfee5, 0xfee6, 0xfee7, 0xfee8],
  'ه': [0xfee9, 0xfeea, 0xfeeb, 0xfeec],
  'و': [0xfeed, 0xfeee],
  'ى': [0xfeef, 0xfef0, 0xfbe8, 0xfbe9],
  'ي': [0xfef1, 0xfef2, 0xfef3, 0xfef4],
};

// Lam followed by one of these alefs becomes one ligature: [isolated, final].
const LAM = 'ل';
const LAM_ALEF: Record<string, number[]> = {
  'آ': [0xfef5, 0xfef6],
  'أ': [0xfef7, 0xfef8],
  'إ': [0xfef9, 0xfefa],
  'ا': [0xfefb, 0xfefc],
};

const TATWEEL = 'ـ';
const MARK = /[ً-ٰٟ]/;
const ARABIC = /[؀-ۿ]/;
const ARABIC_RUNS = /[؀-ۿ]+|[^؀-ۿ]+/g;

type Cluster = { base: string; marks: string };

function clusters(run: string): Cluster[] {
  const out: Cluster[] = [];
  for (const ch of run) {
    if (MARK.test(ch) && out.length > 0) out[out.length - 1]!.marks += ch;
    else out.push({ base: ch, marks: '' });
  }
  return out;
}

const joinsBefore = (ch: string | undefined) => ch === TATWEEL || (ch !== undefined && (FORMS[ch]?.length ?? 0) === 4);
const joinsAfter = (ch: string | undefined) => ch === TATWEEL || (ch !== undefined && (FORMS[ch]?.length ?? 0) >= 2);

/** One run of Arabic letters, joined and in display (left-to-right) order. */
function shapeRun(run: string): string {
  const cs = clusters(run);
  const shaped: string[] = [];
  for (let i = 0; i < cs.length; i++) {
    const { base, marks } = cs[i]!;
    const prev = cs[i - 1]?.base;
    const next = cs[i + 1]?.base;
    const forms = FORMS[base];
    const linksPrev = joinsAfter(base) && joinsBefore(prev);

    if (base === LAM && next && LAM_ALEF[next]) {
      const lig = LAM_ALEF[next]!;
      shaped.push(String.fromCodePoint(linksPrev ? lig[1]! : lig[0]!) + marks + cs[i + 1]!.marks);
      i++;
      continue;
    }
    if (!forms) {
      shaped.push(base + marks);
      continue;
    }
    const linksNext = forms.length === 4 && joinsAfter(next);
    const form = linksPrev && linksNext ? 3 : linksPrev ? 1 : linksNext ? 2 : 0;
    shaped.push(String.fromCodePoint(forms[form] ?? forms[0]!) + marks);
  }
  return shaped.reverse().join('');
}

/** A line of Arabic text in the form and order it is drawn, for a left-to-right renderer. */
export function visualArabic(line: string): string {
  // Words and the spaces between them (a no-break space stays one), last word first.
  return line
    .split(/(\s+)/)
    .reverse()
    .map((word) =>
      (word.match(ARABIC_RUNS) ?? [])
        .reverse()
        .map((run) => (ARABIC.test(run) ? shapeRun(run) : run))
        .join(''),
    )
    .join('');
}
