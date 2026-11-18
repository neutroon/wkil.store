import { Languages } from 'lucide-react';
import { BrandMark, ButtonLink, Container, SkipLink, TextLink } from '@/components/ui';
import type { Content } from '@/content/types';
import { otherLocale, pathOf, type Locale } from '@/lib/locale';
import { SIGN_IN_URL, SIGN_UP_URL } from '@/lib/site';

/**
 * The sticky header (docs/design-system.md, section 9). The in-page links show from 1024px;
 * the language link and sign-in from 640px. Below that only the logo and the start button
 * remain, and the footer carries the language link and sign-in. No menu button; the only
 * script is the logo's eyes (BrandLogo).
 */
export function SiteHeader({ content, locale }: { content: Content; locale: Locale }) {
  const { nav } = content;
  const other = otherLocale(locale);
  return (
    <>
      <SkipLink>{nav.skipToContent}</SkipLink>
      <header data-tone="default" className="sticky top-0 z-40 border-b border-line bg-canvas/90 backdrop-blur">
        <Container className="flex h-header items-center justify-between gap-6">
          <BrandMark locale={locale} link />

          <nav aria-label={nav.navLabel} className="hidden lg:block">
            <ul className="flex items-center gap-7">
              {nav.links.map((link) => (
                <li key={link.href}>
                  <TextLink href={link.href} quiet>
                    {link.label}
                  </TextLink>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-2">
            <span className="hidden sm:block">
              <ButtonLink href={pathOf(other)} variant="ghost" icon={Languages} lang={other} hrefLang={other}>
                {nav.otherLanguage}
              </ButtonLink>
            </span>
            <span className="hidden sm:block">
              <ButtonLink href={SIGN_IN_URL} variant="ghost">
                {nav.signIn}
              </ButtonLink>
            </span>
            <ButtonLink href={SIGN_UP_URL}>{nav.cta}</ButtonLink>
          </div>
        </Container>
      </header>
    </>
  );
}
