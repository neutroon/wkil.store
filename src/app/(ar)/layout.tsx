import type { ReactNode } from 'react';
import { fontFamilies } from '@/lib/fonts';
import '../globals.css';

export default function ArabicLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ar" dir="rtl" style={fontFamilies}>
      <body>{children}</body>
    </html>
  );
}
