import {
  ArrowLeftRight,
  Banknote,
  Bot,
  Globe,
  Layers,
  ListChecks,
  MapPin,
  Megaphone,
  MessageCircle,
  Printer,
  ShieldCheck,
  ShoppingCart,
  Smartphone,
  Target,
  Truck,
  Zap,
  type LucideIcon,
} from 'lucide-react';
import { Badge, IconTile, Section } from '@/components/ui';
import type { Content, IconKey } from '@/content/types';
import type { Locale } from '@/lib/locale';

/** Copy names an icon; this picks it. `flip` mirrors the ones that point somewhere in Arabic. */
const ICONS: Record<IconKey, { icon: LucideIcon; flip?: boolean }> = {
  cash: { icon: Banknote },
  truck: { icon: Truck, flip: true },
  map: { icon: MapPin },
  megaphone: { icon: Megaphone, flip: true },
  layers: { icon: Layers },
  cart: { icon: ShoppingCart, flip: true },
  target: { icon: Target },
  bot: { icon: Bot },
  whatsapp: { icon: MessageCircle },
  globe: { icon: Globe },
  phone: { icon: Smartphone },
  zap: { icon: Zap },
  shield: { icon: ShieldCheck },
  printer: { icon: Printer },
  list: { icon: ListChecks, flip: true },
  move: { icon: ArrowLeftRight },
};

/** Everything else a merchant gets, as open rows on hairlines. */
export function FeatureGrid({ content, locale }: { content: Content; locale: Locale }) {
  const grid = content.grid;
  return (
    <Section id="more" tone="muted" title={grid.title} lede={grid.lede}>
      <ul className="grid gap-x-8 sm:grid-cols-2 lg:grid-cols-3">
        {grid.items.map((item, i) => {
          const { icon, flip } = ICONS[item.icon];
          return (
            <li key={i} className="flex gap-4 border-t border-line py-6">
              <IconTile icon={icon} flip={flip} />
              <div className="min-w-0">
                <h3 className="flex flex-wrap items-center gap-x-2 gap-y-1 text-subheading">
                  <span>{item.title}</span>
                  {item.soon && (
                    <>
                      <span className="sr-only">{locale === 'ar' ? '، ' : ', '}</span>
                      <Badge>{grid.soonLabel}</Badge>
                    </>
                  )}
                </h3>
                <p className="mt-1 text-fg-muted">{item.body}</p>
              </div>
            </li>
          );
        })}
      </ul>
    </Section>
  );
}
