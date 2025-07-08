import { useTranslations } from 'next-intl';
import { BILLING_CONFIG, estimateCost, formatEventCount } from '@/lib/config';
import { Badge } from '@/components/ui/badge';

interface SidebarUsageSummaryProps {
  eventsUsed: number;
  plan: string;
  className?: string;
}

export function SidebarUsageSummary({ eventsUsed, plan, className }: SidebarUsageSummaryProps) {
  const t = useTranslations('dashboard.organizations.billing');
  const safeEventsUsed = typeof eventsUsed === 'number' && !isNaN(eventsUsed) ? eventsUsed : 0;
  const isFree = plan === 'free';
  const estimatedCost = safeEventsUsed > BILLING_CONFIG.FREE_TIER_LIMIT ? Math.max(estimateCost(safeEventsUsed), BILLING_CONFIG.MIN_BILLING_AMOUNT) : estimateCost(safeEventsUsed);
  const usagePercent = Math.min((safeEventsUsed / BILLING_CONFIG.FREE_TIER_LIMIT) * 100, 100);

  return (
    <div className={`rounded-xl border bg-muted/60 p-4 flex flex-col items-center gap-2 shadow-sm ${className || ''}`}>  
      <div className="flex items-center gap-2 mb-1">
        <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
          {t('usage.title')}
        </span>
        {!isFree && <Badge variant="default" className="ml-2">Pro</Badge>}
      </div>
      <div className="text-2xl font-bold">
        {formatEventCount(safeEventsUsed)}
        <span className="text-base font-normal text-muted-foreground ml-1">events</span>
      </div>
      {isFree ? (
        <>
          <div className="w-full bg-muted rounded-full h-2 mt-1">
            <div 
              className="bg-primary h-2 rounded-full transition-all duration-300"
              style={{ width: `${usagePercent}%` }}
            />
          </div>
          <div className="text-xs text-muted-foreground text-center mt-1">
            {Math.round(usagePercent)}% {t('freeMode.ofFreeTier')}
          </div>
        </>
      ) : (
        <div className="text-sm text-muted-foreground mt-1">
          {t('usage.estimated')}: <span className="font-semibold text-foreground">{estimatedCost.toFixed(2)} $</span>
        </div>
      )}
    </div>
  );
} 