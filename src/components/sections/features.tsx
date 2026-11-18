import { CheckItem, CheckList, Section, SectionHeader, Stage, type StageTone } from '@/components/ui';
import { FeatureVisual } from '@/components/visuals/feature-visuals';
import type { Content } from '@/content/types';
import type { Locale } from '@/lib/locale';
import { cn } from '@/lib/cn';

type Row = Content['features']['rows'][number];

/** The one row whose stage stands out (the design system allows one change of stage tone). */
const STAGE_TONE: Partial<Record<Row['key'], StageTone>> = { landing: 'soft' };

/** Feature rows: text beside a product picture, the picture switching sides every row. */
export function Features({ content, locale }: { content: Content; locale: Locale }) {
  const features = content.features;
  return (
    <Section id={features.id} eyebrow={features.eyebrow} title={features.title} lede={features.lede}>
      <div className="flex flex-col gap-y-section">
        {features.rows.map((row, i) => (
          <div key={row.key} className="grid grid-cols-[minmax(0,1fr)] items-center gap-x-8 gap-y-10 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <SectionHeader as="h3" size="heading" eyebrow={row.eyebrow} title={row.title} lede={row.body} />
              {row.points.length > 0 && (
                <CheckList className="mt-6">
                  {row.points.slice(0, 4).map((point, j) => (
                    <CheckItem key={j}>{point}</CheckItem>
                  ))}
                </CheckList>
              )}
            </div>
            {/* The picture repeats what the text says, so screen readers skip it. */}
            <div aria-hidden="true" className={cn('lg:col-span-7', i % 2 === 1 && 'lg:order-first')}>
              <Stage tone={STAGE_TONE[row.key] ?? 'mist'} className="min-h-[22rem] lg:min-h-[30rem]">
                <FeatureVisual row={row} shop={content.hero.visual} locale={locale} />
              </Stage>
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}
