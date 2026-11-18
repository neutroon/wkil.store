import type { ReactNode } from 'react';
import { fontFamilies } from '@/lib/fonts';
import '../globals.css';

export default function EnglishLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" dir="ltr" style={fontFamilies}>
      <body>{children}</body>
    </html>
  );
}
