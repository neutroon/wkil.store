import type { LucideIcon } from 'lucide-react';
import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'on-ink';
export type ButtonSize = 'md' | 'lg';

const variants: Record<ButtonVariant, string> = {
  primary: 'bg-brand text-brand-on hover:bg-brand-hover',
  // Mint on ink: the one solid button inside an ink section.
  'on-ink': 'bg-mint text-mint-on hover:bg-mint-hover',
  // These two follow the section's tone, so they work on white, mist and ink.
  secondary: 'border border-line-strong text-fg hover:bg-accent-soft',
  ghost: 'text-fg hover:bg-accent-soft',
};

const sizes: Record<ButtonSize, string> = {
  md: 'min-h-11 px-5 text-body',
  lg: 'min-h-13 px-7 text-subheading',
};

/**
 * A link that looks like a button. The page has no forms, so every action is one of these.
 * The label says what happens; it carries no arrow. An icon is for meaning (WhatsApp, a
 * language), and `flipIcon` mirrors one that points somewhere.
 */
export function ButtonLink({ href, variant = 'primary', size = 'md', icon: Icon, iconPosition = 'start', flipIcon = false, external = false, className, children, ...rest }: {
  href: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  icon?: LucideIcon;
  iconPosition?: 'start' | 'end';
  /** Mirror the icon in right-to-left: for arrows and chevrons, never for logos or checks. */
  flipIcon?: boolean;
  /** Opens in a new tab. */
  external?: boolean;
  className?: string;
  children: ReactNode;
  hrefLang?: string;
  lang?: string;
  'aria-label'?: string;
}) {
  const icon = Icon && <Icon aria-hidden="true" className={cn('size-[1.2em] shrink-0', flipIcon && 'rtl:-scale-x-100')} />;
  return (
    <a
      href={href}
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      {...rest}
      className={cn(
        'inline-flex items-center justify-center gap-2 rounded-md text-center font-semibold whitespace-nowrap',
        'transition-colors duration-150 active:translate-y-px',
        variants[variant],
        sizes[size],
        className,
      )}
    >
      {iconPosition === 'start' && icon}
      {children}
      {iconPosition === 'end' && icon}
    </a>
  );
}
