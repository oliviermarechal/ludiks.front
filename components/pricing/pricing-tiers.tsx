import { Badge } from '@/components/ui/badge';
import { useTranslations } from 'next-intl';

const TIERS = [
  { from: 0, to: 5000, labelKey: 'tiers.tier1', price: 0, descKey: 'tiers.free' },
  { from: 5001, to: 100000, labelKey: 'tiers.tier2', price: 0.001, descKey: 'tiers.tier2Desc' },
  { from: 100001, to: 500000, labelKey: 'tiers.tier3', price: 0.0008, descKey: 'tiers.tier3Desc' },
  { from: 500001, to: Infinity, labelKey: 'tiers.tier4', price: 0.0006, descKey: 'tiers.tier4Desc' },
];

export function PricingTiers() {
  const t = useTranslations('dashboard.organizations.billing');
  return (
    <div className="overflow-x-auto w-full">
      <table className="w-full text-sm border-collapse bg-background rounded-xl shadow-sm">
        <thead>
          <tr className="border-b">
            <th className="text-left px-4 py-2 font-semibold text-muted-foreground">{t('tiers.range')}</th>
            <th className="text-right px-4 py-2 font-semibold text-muted-foreground">{t('tiers.price')}</th>
          </tr>
        </thead>
        <tbody>
          {TIERS.map((tier, idx) => (
            <tr key={idx} className="border-b last:border-0 hover:bg-muted/40 transition-colors">
              <td className="px-4 py-3 whitespace-nowrap">
                <span className="font-medium text-foreground">{t(tier.labelKey)}</span>
                {tier.price === 0 && (
                  <Badge variant="secondary" className="ml-2 align-middle">{t('tiers.free')}</Badge>
                )}
              </td>
              <td className="px-4 py-3 text-right font-mono">
                {tier.price === 0 ? <span className="text-muted-foreground">0 $</span> : `${tier.price.toFixed(4)} $ / event`}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
} 