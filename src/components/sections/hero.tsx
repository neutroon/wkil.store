import { ButtonLink, Container } from '@/components/ui';
import { HeroVisual } from '@/components/visuals/hero-visual';
import type { Content } from '@/content/types';
import type { Locale } from '@/lib/locale';
import { SIGN_UP_URL } from '@/lib/site';

/**
 * The promise, two actions and the product in one picture. Holds the page's only h1 and its
 * one entrance sequence. `hero.eyebrow` is not drawn: the design system keeps the heading
 * alone at the top (docs/design-system.md, section 9).
 */
export function Hero({ content, locale }: { content: Content; locale: Locale }) {
  const hero = content.hero;
  return (
    <section data-tone="default" aria-labelledby="hero-title" className="bg-canvas pt-12 pb-section lg:pt-20">
      <Container className="grid items-center gap-x-8 gap-y-14 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <h1 id="hero-title" className="max-w-[13em] text-display animate-rise stagger-0">
            {hero.title}
          </h1>
          <p className="mt-6 max-w-[34rem] text-lede text-fg-muted animate-rise stagger-1">{hero.lede}</p>
          <div className="mt-8 flex flex-wrap gap-3 animate-rise stagger-2">
            <ButtonLink href={SIGN_UP_URL} size="lg">{hero.primaryCta}</ButtonLink>
            <ButtonLink href="#pricing" size="lg" variant="secondary">{hero.secondaryCta}</ButtonLink>
          </div>
          {hero.note && <p className="mt-5 text-small text-fg-muted animate-rise stagger-3">{hero.note}</p>}
        </div>
        <HeroVisual shop={hero.visual} locale={locale} className="lg:col-span-5 animate-rise stagger-4" />
      </Container>
    </section>
  );
}
