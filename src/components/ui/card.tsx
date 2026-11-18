import type { ElementType, ReactNode } from 'react';
import { cn } from '@/lib/cn';

export type CardVariant = 'flat' | 'raised' | 'soft';
export type CardPadding = 'none' | 'sm' | 'md' | 'lg';

const variants: Record<CardVariant, string> = {
  // Content: a hairline, no shadow. Follows the section's tone.
  flat: 'border border-line bg-surface',
  // A mock-UI object in a product visual: always light, lifted off the stage.
  raised: 'border border-line bg-surface shadow-raised',
  // A quiet callout on the tone's soft teal.
  soft: 'bg-accent-soft',
};

const paddings: Record<CardPadding, string> = {
  none: '',
  sm: 'p-4',
  md: 'p-6',
  lg: 'p-6 sm:p-8 lg:p-10',
};

export function Card({ variant = 'flat', padding = 'md', as: Tag = 'div', className, children }: {
  variant?: CardVariant;
  padding?: CardPadding;
  as?: ElementType;
  className?: string;
  children: ReactNode;
}) {
  return (
    <Tag
      // A raised card is a piece of the product, so it keeps the light colours on any tone.
      {...(variant === 'raised' ? { 'data-tone': 'light' } : {})}
      className={cn('rounded-lg', variants[variant], paddings[padding], className)}
    >
      {children}
    </Tag>
  );
}
