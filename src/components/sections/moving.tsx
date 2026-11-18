import { Card, CheckItem, CheckList, Container, SectionHeader } from '@/components/ui';
import type { Content } from '@/content/types';
import type { Locale } from '@/lib/locale';

/** For merchants who already sell elsewhere: what moving over involves. */
export function Moving({ content }: { content: Content; locale: Locale }) {
  const moving = content.moving;
  return (
    <section id="moving" data-tone="default" aria-labelledby="moving-title" className="bg-canvas py-section">
      <Container className="grid items-center gap-x-8 gap-y-10 lg:grid-cols-12">
        <SectionHeader id="moving-title" eyebrow={moving.eyebrow} title={moving.title} lede={moving.body} className="lg:col-span-6" />
        {moving.points.length > 0 && (
          <Card variant="soft" padding="lg" className="lg:col-span-5 lg:col-start-8">
            <CheckList>
              {moving.points.map((point, i) => (
                <CheckItem key={i}>{point}</CheckItem>
              ))}
            </CheckList>
          </Card>
        )}
      </Container>
    </section>
  );
}
