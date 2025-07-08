import { useTranslations } from 'next-intl';
import { BILLING_CONFIG, estimateCost, formatEventCount } from '@/lib/config';

interface UsageSummaryPageProps {
  eventsUsed: number;
  plan: string;
  className?: string;
}

export function UsageSummaryPage({ eventsUsed, plan, className }: UsageSummaryPageProps) {
  const t = useTranslations('dashboard.organizations.billing');
  const safeEventsUsed = typeof eventsUsed === 'number' && !isNaN(eventsUsed) ? eventsUsed : 0;
  const isFree = plan === 'free';
  const estimatedCost = safeEventsUsed > BILLING_CONFIG.FREE_TIER_LIMIT ? Math.max(estimateCost(safeEventsUsed), BILLING_CONFIG.MIN_BILLING_AMOUNT) : estimateCost(safeEventsUsed);

  return (
    <div className={`w-full rounded-xl border bg-background p-8 flex flex-col gap-6 shadow-sm ${className || ''}`}>  
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
        <div>
          <div className="text-4xl font-bold">
            {formatEventCount(safeEventsUsed)}
            <span className="text-lg font-normal text-muted-foreground ml-2">{t('usage.events')}</span>
          </div>
          <div className="text-muted-foreground text-base mt-1">
            {isFree
              ? t('usage.freeDescription', { limit: formatEventCount(BILLING_CONFIG.FREE_TIER_LIMIT) })
              : t('usage.proDescription')}
          </div>
        </div>
        {!isFree && (
          <div className="text-2xl font-semibold text-primary">
            {t('usage.estimated')}: {estimatedCost.toFixed(2)} $
          </div>
        )}
      </div>
    </div>
  );
} 