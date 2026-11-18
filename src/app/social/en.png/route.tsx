import { socialImage } from '@/components/social-image';

// See ../ar.png/route.tsx.
export const dynamic = 'force-static';

export function GET() {
  return socialImage('en');
}
