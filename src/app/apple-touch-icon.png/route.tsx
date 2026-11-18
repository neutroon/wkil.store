import { touchIcon } from '@/components/social-image';

// A route handler rather than apple-icon.tsx, so the export keeps the .png extension.
export const dynamic = 'force-static';

export function GET() {
  return touchIcon();
}
