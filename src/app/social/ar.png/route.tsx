import { socialImage } from '@/components/social-image';

// A route handler rather than opengraph-image.tsx: the static export then writes
// out/social/ar.png with its extension, so any static host serves it as image/png.
export const dynamic = 'force-static';

export function GET() {
  return socialImage('ar');
}
