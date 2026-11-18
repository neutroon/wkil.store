import type { MetadataRoute } from 'next';
import { BRAND_NAME } from '@/lib/brand';
import { THEME_COLOR } from '@/lib/seo';

export const dynamic = 'force-static';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: BRAND_NAME.ar,
    short_name: BRAND_NAME.ar,
    lang: 'ar',
    dir: 'rtl',
    start_url: '/',
    display: 'browser',
    background_color: '#ffffff',
    theme_color: THEME_COLOR,
    icons: [
      { src: '/icon.svg', sizes: 'any', type: 'image/svg+xml' },
      { src: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  };
}
