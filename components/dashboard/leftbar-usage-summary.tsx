import { useTranslations } from 'next-intl';
import { BILLING_CONFIG, estimateCost, formatEventCount } from '@/lib/config';
import { Badge } from '@/components/ui/badge';

interface LeftbarUsageSummaryProps {
  eventsUsed: number;
  plan: string;
  className?: string;
}

export function LeftbarUsageSummary({ eventsUsed, plan, className }: LeftbarUsageSummaryProps) {
  const t = useTranslations('dashboard.organizations.billing');
  const safeEventsUsed = typeof eventsUsed === 'number' && !isNaN(eventsUsed) ? eventsUsed : 0;
  const isFree = plan === "free";
  const estimatedCost = safeEventsUsed > BILLING_CONFIG.FREE_TIER_LIMIT ? Math.max(estimateCost(safeEventsUsed), BILLING_CONFIG.MIN_BILLING_AMOUNT) : estimateCost(safeEventsUsed);
  const usagePercent = Math.min((safeEventsUsed / BILLING_CONFIG.FREE_TIER_LIMIT) * 100, 100);
  const progressColor = usagePercent >= 90 ? 'bg-destructive' : usagePercent >= 70 ? 'bg-warning' : 'bg-primary';

  return (
    <div className={`rounded-lg border bg-muted/60 p-3 flex flex-col items-center gap-1 shadow-sm ${className || ''}`}>  
      <div className="flex items-center gap-2 mb-1">
        <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
          {t('usage.title')}
        </span>
        {!isFree && <Badge variant="default" className="ml-2">Pro</Badge>}
      </div>
      <div className="text-xl font-bold">
        {formatEventCount(safeEventsUsed)}
        <span className="text-xs font-normal text-muted-foreground ml-1">{t('usage.events')}</span>
      </div>
      {isFree ? (
        <>
          <div className="w-full bg-muted rounded-full h-2 mt-1">
            <div 
              className={`h-2 rounded-full transition-all duration-300 ${progressColor}`}
              style={{ width: `${usagePercent}%` }}
            />
          </div>
          <div className="text-[11px] text-muted-foreground text-center mt-1">
            {Math.round(usagePercent)}% {t('freeMode.ofFreeTier')}
          </div>
        </>
      ) : (
        <div className="text-xs text-muted-foreground mt-1">
          {t('usage.estimated')}: <span className="font-semibold text-foreground">{estimatedCost.toFixed(2)} $</span>
        </div>
      )}
    </div>
  );
} 