import { PricingCalculator } from '@/components/pricing-calculator';
import { ButtonLink, Card, CheckItem, CheckList, Section, Stat, Ticket, currencyLabel, formatMoney } from '@/components/ui';
import { MONTHLY_CAP, PER_ORDER } from '@/content/pricing';
import type { Content } from '@/content/types';
import { formatAmount } from '@/lib/calculator';
import type { Locale } from '@/lib/locale';
import { SIGN_UP_URL } from '@/lib/site';

/**
 * The cap line, with the amount drawn large wherever the copy puts it. The copy fills {cap}
 * with formatMoney, so that is the text to look for; without it the line is plain.
 */
function CapLine({ text, locale }: { text: string; locale: Locale }) {
  const amount = formatMoney(MONTHLY_CAP, locale);
  const at = text.indexOf(amount);
  if (at === -1) return <p className="text-subheading text-fg">{text}</p>;
  return (
    <p className="text-small text-fg-muted">
      {text.slice(0, at)}
      <span className="nums whitespace-nowrap text-heading text-fg">{amount}</span>
      {text.slice(at + amount.length)}
    </p>
  );
}

export function Pricing({ content, locale }: { content: Content; locale: Locale }) {
  const p = content.pricing;
  const { title: calculatorTitle, ...labels } = p.calculator;
  return (
    <Section id={p.id} tone="ink" header="split" eyebrow={p.eyebrow} title={p.title} lede={p.lede}>
      <div className="grid items-start gap-8 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <Ticket stub={<CapLine text={p.capLabel} locale={locale} />}>
            <Stat
              value={formatAmount(PER_ORDER)}
              unit={currencyLabel(locale)}
              unitFirst={locale === 'en'}
              label={p.perOrderLabel}
            />
            <CheckList className="mt-6">
              {p.points.map((point) => (
                <CheckItem key={point}>{point}</CheckItem>
              ))}
            </CheckList>
          </Ticket>
          <p className="mt-8 max-w-[40rem] text-fg-muted">{p.cancellationNote}</p>
          <p className="mt-4 max-w-[40rem] text-small text-fg-muted">{p.finePrint}</p>
        </div>

        <div className="lg:col-span-7">
          <Card padding="lg">
            <h3 className="text-subheading">{calculatorTitle}</h3>
            <div className="mt-6">
              <PricingCalculator locale={locale} labels={labels} />
            </div>
          </Card>
          <ButtonLink href={SIGN_UP_URL} variant="on-ink" size="lg" className="mt-8">
            {p.cta}
          </ButtonLink>
        </div>
      </div>
    </Section>
  );
}
