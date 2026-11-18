import { Languages } from 'lucide-react';
import { BrandMark, Container, TextLink } from '@/components/ui';
import type { Content } from '@/content/types';
import { otherLocale, pathOf, type Locale } from '@/lib/locale';
import { SIGN_IN_URL } from '@/lib/site';

/**
 * The ink footer, straight after the closing band so the page ends in one ink block. It
 * also carries sign-in and the other language, which leave the header below 640px.
 */
export function SiteFooter({ content, locale }: { content: Content; locale: Locale }) {
  const { footer, nav } = content;
  const other = otherLocale(locale);
  const { columns } = footer;
  // Sign-in must be reachable below 640px, where the header drops it: add it to the bottom
  // row unless a column already links to it.
  const hasSignIn = columns.some((column) => column.links.some((link) => link.href === SIGN_IN_URL));

  return (
    <footer data-tone="ink" className="border-t border-line bg-ink py-10">
      <Container>
        <div className="grid gap-x-8 gap-y-10 lg:grid-cols-12">
          <div className="flex flex-col items-start gap-3 lg:col-span-4">
            <BrandMark locale={locale} size="sm" link />
            {footer.tagline && <p className="max-w-[24rem] text-small text-fg-muted">{footer.tagline}</p>}
          </div>

          {columns.length > 0 && (
            <div className="grid gap-x-8 gap-y-8 sm:grid-cols-2 lg:col-span-8">
              {columns.map((column, i) => (
                <nav key={column.title + i} aria-labelledby={`footer-col-${i}`}>
                  <h2 id={`footer-col-${i}`} className="text-small font-semibold text-fg">
                    {column.title}
                  </h2>
                  <ul className="mt-2">
                    {column.links.map((link) => (
                      <li key={link.href + link.label}>
                        <TextLink href={link.href} quiet className="text-small">
                          {link.label}
                        </TextLink>
                      </li>
                    ))}
                  </ul>
                </nav>
              ))}
            </div>
          )}
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-between gap-x-8 gap-y-2 border-t border-line pt-6">
          <p className="text-small text-fg-muted nums">{footer.copyright}</p>
          <ul className="flex flex-wrap items-center gap-x-6">
            {!hasSignIn && (
              <li>
                <TextLink href={SIGN_IN_URL} quiet className="text-small">
                  {nav.signIn}
                </TextLink>
              </li>
            )}
            <li>
              <TextLink href={pathOf(other)} quiet lang={other} hrefLang={other} className="text-small">
                <Languages aria-hidden="true" className="size-[1.1em] shrink-0" />
                {nav.otherLanguage}
              </TextLink>
            </li>
          </ul>
        </div>
      </Container>
    </footer>
  );
}
