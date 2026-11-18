import type { Metadata } from 'next';
import { BrandMark, ButtonLink, Container } from '@/components/ui';
import { BRAND_NAME } from '@/lib/brand';
import { fontFamilies } from '@/lib/fonts';
import { pathOf } from '@/lib/locale';
import { viewport as siteViewport } from '@/lib/seo';
import './globals.css';

// Served for every address that matches no page, in both languages: Arabic first (the
// site's default), English below it in its own direction.
export const metadata: Metadata = {
  title: `الصفحة مش موجودة · Page not found | ${BRAND_NAME.ar}`,
};
export const viewport = siteViewport;

export default function GlobalNotFound() {
  return (
    <html lang="ar" dir="rtl" style={fontFamilies}>
      <body>
        <header data-tone="default" className="border-b border-line">
          <Container className="flex h-header items-center">
            <BrandMark locale="ar" link />
          </Container>
        </header>

        <main data-tone="default" className="py-section">
          <Container className="grid gap-x-8 gap-y-14 lg:grid-cols-12">
            <p aria-hidden="true" className="text-figure text-accent nums lg:col-span-12">
              404
            </p>

            <section aria-labelledby="nf-ar" className="lg:col-span-6 lg:border-e lg:border-line lg:pe-8">
              <h1 id="nf-ar" className="text-title">
                الصفحة دي مش موجودة
              </h1>
              <p className="mt-5 max-w-[34rem] text-lede text-fg-muted">
                يمكن الرابط اتكتب غلط أو الصفحة اتنقلت. ارجع للصفحة الرئيسية وكمّل من هناك.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <ButtonLink href={pathOf('ar')} size="lg">
                  الصفحة الرئيسية
                </ButtonLink>
              </div>
            </section>

            <section lang="en" dir="ltr" aria-labelledby="nf-en" className="border-t border-line pt-10 lg:col-span-6 lg:border-t-0 lg:pt-0">
              <h2 id="nf-en" className="text-title">
                This page doesn’t exist
              </h2>
              <p className="mt-5 max-w-[34rem] text-lede text-fg-muted">
                The link may be mistyped, or the page has moved. Head to the home page and carry on from there.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <ButtonLink href={pathOf('en')} size="lg" variant="secondary" hrefLang="en">
                  English home page
                </ButtonLink>
              </div>
            </section>
          </Container>
        </main>
      </body>
    </html>
  );
}
