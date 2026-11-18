import { ButtonLink, Section, SectionHeader } from '@/components/ui';
import type { Content } from '@/content/types';
import type { Locale } from '@/lib/locale';
import { SIGN_UP_URL } from '@/lib/site';

/**
 * The closing band: one ink block with the footer that follows. Heading and lede at the
 * start, the one on-ink button (and its short note) at the end.
 */
export function Closing({ content, locale }: { content: Content; locale: Locale }) {
  void locale;
  const { closing } = content;
  return (
    <Section id="start" tone="ink" spacing="compact" aria-label={closing.title}>
      <div className="grid grid-cols-[minmax(0,1fr)] items-center gap-8 lg:grid-cols-12">
        <SectionHeader id="start-title" title={closing.title} lede={closing.lede} className="lg:col-span-8" />
        <div className="flex flex-col items-start gap-3 lg:col-span-4 lg:items-end">
          <ButtonLink href={SIGN_UP_URL} variant="on-ink" size="lg">
            {closing.cta}
          </ButtonLink>
          {closing.note && <p className="text-small text-fg-muted lg:text-end">{closing.note}</p>}
        </div>
      </div>
    </Section>
  );
}
