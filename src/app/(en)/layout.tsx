import type { ReactNode } from 'react';
import { JsonLd } from '@/components/json-ld';
import { fontFamilies } from '@/lib/fonts';
import { pageMetadata, viewport as siteViewport } from '@/lib/seo';
import '../globals.css';

export const metadata = pageMetadata('en');
export const viewport = siteViewport;

export default function EnglishLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" dir="ltr" style={fontFamilies}>
      <body>
        {children}
        <JsonLd locale="en" />
      </body>
    </html>
  );
}
