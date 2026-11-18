import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';

export type StageTone = 'mist' | 'soft' | 'canvas' | 'ink';

const tones: Record<StageTone, { tone: string; className: string }> = {
  mist: { tone: 'muted', className: 'bg-mist' },
  soft: { tone: 'light', className: 'bg-brand-soft' },
  canvas: { tone: 'light', className: 'border border-line bg-canvas' },
  ink: { tone: 'ink', className: 'bg-ink' },
};

/**
 * The backdrop every product visual stands on: one flat tone, large corners, the visual
 * centred. Parts of the visual may hang over its edge (`overflow` is visible) but never
 * outside the page.
 */
export function Stage({ tone = 'mist', className, children }: {
  /** `mist` on white sections, `canvas` on muted ones, `soft` or `ink` for emphasis. */
  tone?: StageTone;
  className?: string;
  children: ReactNode;
}) {
  const t = tones[tone];
  return (
    <div data-tone={t.tone} className={cn('relative grid place-items-center rounded-xl px-6 py-10 sm:px-10 sm:py-14', t.className, className)}>
      {children}
    </div>
  );
}
