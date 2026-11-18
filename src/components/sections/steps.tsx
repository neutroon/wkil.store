import { IconTile, Section } from '@/components/ui';
import type { Content } from '@/content/types';
import type { Locale } from '@/lib/locale';
import { cn } from '@/lib/cn';

/** How it works: three numbered steps, the first marked as where you start. */
export function Steps({ content }: { content: Content; locale: Locale }) {
  const steps = content.steps;
  return (
    <Section id={steps.id} tone="muted" header="split" eyebrow={steps.eyebrow} title={steps.title} lede={steps.lede}>
      <ol className="grid grid-cols-[minmax(0,1fr)] gap-x-8 gap-y-10 md:grid-cols-3">
        {steps.items.map((step, i) => (
          <li key={i} className={cn('border-t-2 pt-6', i === 0 ? 'border-brand' : 'border-line')}>
            <IconTile label={String(i + 1)} solid={i === 0} />
            <h3 className="mt-5 text-subheading">{step.title}</h3>
            <p className="mt-2 text-fg-muted">{step.body}</p>
          </li>
        ))}
      </ol>
    </Section>
  );
}
