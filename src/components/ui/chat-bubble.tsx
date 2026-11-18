import { CheckCheck } from 'lucide-react';
import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';

/**
 * One message in a depicted chat (the WhatsApp confirmation). `out` is the store's message,
 * `in` the shopper's. Stack them in a `flex flex-col gap-2` on `bg-chat-canvas`.
 */
export function ChatBubble({ side, time, read = false, className, children }: {
  side: 'in' | 'out';
  /** `10:24`. */
  time?: string;
  /** Blue ticks on an `out` message. */
  read?: boolean;
  className?: string;
  children: ReactNode;
}) {
  return (
    <div
      className={cn(
        'max-w-[85%] rounded-lg px-3 py-2 text-small text-chat-fg shadow-card',
        side === 'out' ? 'self-start rounded-ss-sm bg-chat-out' : 'self-end rounded-se-sm bg-chat-in',
        className,
      )}
    >
      {children}
      {time && (
        <span dir="ltr" className="nums ms-auto mt-1 flex w-fit items-center gap-1 text-micro text-chat-meta">
          {time}
          {side === 'out' && <CheckCheck className={cn('size-3.5', read && 'text-chat-tick')} />}
        </span>
      )}
    </div>
  );
}
