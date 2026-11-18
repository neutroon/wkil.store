import { BatteryFull, Signal, Wifi } from 'lucide-react';
import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';

/**
 * A phone, for a product visual. The screen is always light and 19.5:9; what doesn't fit is
 * cut off at the bottom, like a real screen. The whole frame is one image to a screen
 * reader: `label` says what it shows.
 */
export function PhoneFrame({ label, size = 'md', className, children }: {
  /** What the picture shows, for screen readers. */
  label: string;
  /** `md` is 296px wide, `sm` 248px. */
  size?: 'sm' | 'md';
  className?: string;
  children: ReactNode;
}) {
  return (
    <div
      role="img"
      aria-label={label}
      className={cn('relative shrink-0 rounded-device border border-line-strong bg-ink p-2.5 shadow-device', size === 'md' ? 'w-[18.5rem]' : 'w-[15.5rem]', className)}
    >
      <div data-tone="light" className="relative flex aspect-[9/19.5] flex-col overflow-hidden rounded-screen bg-canvas">
        {/* The status bar is not mirrored on a real phone, so it stays left-to-right. */}
        <div dir="ltr" className="nums flex h-9 shrink-0 items-center justify-between px-6 text-micro font-semibold text-fg">
          <span>9:41</span>
          <span className="flex items-center gap-1">
            <Signal className="size-3.5" />
            <Wifi className="size-3.5" />
            <BatteryFull className="size-4" />
          </span>
        </div>
        <span className="absolute inset-x-0 top-2 mx-auto h-5 w-20 rounded-full bg-ink" />
        <div className="relative min-h-0 flex-1 overflow-hidden">{children}</div>
      </div>
    </div>
  );
}
