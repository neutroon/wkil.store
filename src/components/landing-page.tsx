import { getContent } from '@/content';
import type { Locale } from '@/lib/locale';
import { Closing } from './sections/closing';
import { Faq } from './sections/faq';
import { FeatureGrid } from './sections/feature-grid';
import { Features } from './sections/features';
import { Hero } from './sections/hero';
import { Moving } from './sections/moving';
import { Pricing } from './sections/pricing';
import { SiteFooter } from './sections/site-footer';
import { SiteHeader } from './sections/site-header';
import { Steps } from './sections/steps';

/** The whole page in one locale. Section order: docs/positioning.md, adjusted in docs/page-plan.md. */
export function LandingPage({ locale }: { locale: Locale }) {
  const content = getContent(locale);
  const props = { content, locale };
  return (
    <>
      <SiteHeader {...props} />
      <main id="main">
        <Hero {...props} />
        <Steps {...props} />
        <Features {...props} />
        <FeatureGrid {...props} />
        <Pricing {...props} />
        <Moving {...props} />
        <Faq {...props} />
        <Closing {...props} />
      </main>
      <SiteFooter {...props} />
    </>
  );
}
