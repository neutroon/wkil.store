import { describe, expect, it } from 'vitest';
import { visualArabic } from './arabic-visual';

const cp = (...codes: number[]) => String.fromCodePoint(...codes);

describe('visualArabic', () => {
  it('joins a word and puts it in drawing order', () => {
    // مفيش: initial meem, medial feh, medial yeh, final sheen; drawn right to left.
    expect(visualArabic('مفيش')).toBe(cp(0xfeb6, 0xfef4, 0xfed4, 0xfee3));
  });

  it('breaks the join after a right-joining letter', () => {
    // دار: dal and alef never join forward, so all three letters stand alone.
    expect(visualArabic('دار')).toBe(cp(0xfead, 0xfe8d, 0xfea9));
    // باب: initial beh, final alef, isolated beh.
    expect(visualArabic('باب')).toBe(cp(0xfe8f, 0xfe8e, 0xfe91));
  });

  it('puts the words of a line in reverse order', () => {
    expect(visualArabic('على كل')).toBe(`${visualArabic('كل')} ${visualArabic('على')}`);
  });

  it('keeps numbers left to right and puts them in their place in the line', () => {
    expect(visualArabic('1.50 ج.م')).toBe(`${cp(0xfee1)}.${cp(0xfe9d)} 1.50`);
    expect(visualArabic('أقصى 2,500')).toBe(`2,500 ${visualArabic('أقصى')}`);
  });

  it('forms lam-alef ligatures', () => {
    // لا alone: the isolated ligature. سلام: initial seen, final lam-alef, isolated meem.
    expect(visualArabic('لا')).toBe(cp(0xfefb));
    expect(visualArabic('سلام')).toBe(cp(0xfee1, 0xfefc, 0xfeb3));
  });

  it('puts trailing punctuation at the left end', () => {
    expect(visualArabic('بس.')).toBe(`.${visualArabic('بس')}`);
    expect(visualArabic('شهري،')).toBe(`،${visualArabic('شهري')}`);
  });

  it('keeps a mark after its letter', () => {
    // كمّل: the shadda stays right after meem.
    expect(visualArabic('كمّل')).toBe(cp(0xfede, 0xfee4) + 'ّ' + cp(0xfedb));
  });
});
