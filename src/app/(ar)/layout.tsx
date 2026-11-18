import type { ReactNode } from 'react';
import { JsonLd } from '@/components/json-ld';
import { fontFamilies } from '@/lib/fonts';
import { pageMetadata, viewport as siteViewport } from '@/lib/seo';
import '../globals.css';

export const metadata = pageMetadata('ar');
export const viewport = siteViewport;

export default function ArabicLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ar" dir="rtl" style={fontFamilies}>
      <body>
        {children}
        <JsonLd locale="ar" />
      </body>
    </html>
  );
}
