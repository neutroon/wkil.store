import Link from 'next/link';
import { fontFamilies } from '@/lib/fonts';
import './globals.css';

export const metadata = { title: 'الصفحة غير موجودة' };

export default function GlobalNotFound() {
  return (
    <html lang="ar" dir="rtl" style={fontFamilies}>
      <body>
        <main className="p-8">
          <h1>الصفحة غير موجودة</h1>
          <Link href="/">الرئيسية</Link>
        </main>
      </body>
    </html>
  );
}
