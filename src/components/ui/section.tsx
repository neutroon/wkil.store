import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';
import { Container, type ContainerSize } from './container';
import { Eyebrow } from './eyebrow';

export type Tone = 'default' | 'muted' | 'ink';
export type HeaderLayout = 'stack' | 'split' | 'center';

const toneClass: Record<Tone, string> = {
  default: 'bg-canvas',
  muted: 'bg-mist',
  ink: 'bg-ink',
};

const titleSize = {
  display: 'text-display',
  title: 'text-title',
  heading: 'text-heading',
} as const;

/**
 * Eyebrow, heading and lede. `stack` is the default: everything at the start edge.
 * `split` puts the lede beside the heading from 1024px. `center` is for the pricing
 * section and the closing band only.
 */
export function SectionHeader({ eyebrow, title, lede, as: Heading = 'h2', size = 'title', layout = 'stack', id, className }: {
  eyebrow?: ReactNode;
  title: ReactNode;
  lede?: ReactNode;
  as?: 'h1' | 'h2' | 'h3';
  size?: keyof typeof titleSize;
  layout?: HeaderLayout;
  /** The heading's id, for the section's aria-labelledby. */
  id?: string;
  className?: string;
}) {
  const heading = (
    <div className={cn(layout === 'center' && 'flex flex-col items-center')}>
      {eyebrow && <Eyebrow className="mb-4">{eyebrow}</Eyebrow>}
      <Heading id={id} className={cn(titleSize[size], size === 'display' ? 'max-w-[14em]' : 'max-w-[18em]')}>
        {title}
      </Heading>
    </div>
  );
  const text = lede && <p className="max-w-[36rem] text-lede text-fg-muted">{lede}</p>;

  if (layout === 'split') {
    return (
      <div className={cn('grid gap-x-8 gap-y-5 lg:grid-cols-12 lg:items-end', className)}>
        <div className="lg:col-span-7">{heading}</div>
        {text && <div className="lg:col-span-5 lg:pb-1">{text}</div>}
      </div>
    );
  }
  return (
    <div className={cn('flex flex-col gap-5', layout === 'center' && 'items-center text-center', className)}>
      {heading}
      {text}
    </div>
  );
}

/**
 * A band of the page: sets the tone, the vertical rhythm and the content column, and can
 * draw the section's header. Everything inside reads the tone's colours on its own.
 */
export function Section({ id, tone = 'default', spacing = 'default', width = 'page', eyebrow, title, lede, header = 'stack', className, children, ...rest }: {
  /** Also the anchor the header's links point to. Required when `title` is set. */
  id?: string;
  tone?: Tone;
  /** `compact` for a band that only carries a short message. */
  spacing?: 'default' | 'compact';
  width?: ContainerSize;
  eyebrow?: ReactNode;
  title?: ReactNode;
  lede?: ReactNode;
  header?: HeaderLayout;
  className?: string;
  children?: ReactNode;
  'aria-label'?: string;
}) {
  const titleId = title && id ? `${id}-title` : undefined;
  return (
    <section
      id={id}
      data-tone={tone}
      aria-labelledby={titleId}
      aria-label={rest['aria-label']}
      className={cn(toneClass[tone], spacing === 'default' ? 'py-section' : 'py-section-compact', className)}
    >
      <Container size={width}>
        {title && <SectionHeader id={titleId} eyebrow={eyebrow} title={title} lede={lede} layout={header} />}
        {title && children ? <div className="mt-header-gap">{children}</div> : children}
      </Container>
    </section>
  );
}
