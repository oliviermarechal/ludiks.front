import { Alert, AlertDescription } from "@/components/ui/alert";
import { Bell } from "lucide-react";
import { BILLING_CONFIG } from '@/lib/config';

interface QuotaWarningBannerProps {
  eventsUsed: number;
  className?: string;
}

export function QuotaWarningBanner({ eventsUsed, className }: QuotaWarningBannerProps) {
  const safeEventsUsed = typeof eventsUsed === 'number' && !isNaN(eventsUsed) ? eventsUsed : 0;
  const usagePercentage = (safeEventsUsed / BILLING_CONFIG.FREE_TIER_LIMIT) * 100;
  
  if (usagePercentage < 80) {
    return null;
  }

  const isOverLimit = safeEventsUsed > BILLING_CONFIG.FREE_TIER_LIMIT;
  
  return (
    <div className={`fixed top-0 left-0 w-full z-50 flex justify-center pointer-events-none`}>
      <div className={`pointer-events-auto w-full max-w-2xl mx-auto mt-4`}> 
        <Alert className={`shadow-lg border-2 ${isOverLimit ? 'border-destructive bg-destructive/10' : 'border-warning bg-warning/10'} ${className || ''}`}> 
          <div className="flex items-center gap-2">
            <Bell className="h-5 w-5 text-yellow-500" />
            <AlertDescription className="font-medium">
              {isOverLimit 
                ? `Vous avez dépassé la limite gratuite de ${BILLING_CONFIG.FREE_TIER_LIMIT.toLocaleString()} events. Vous serez facturé pour les événements supplémentaires.`
                : `Vous approchez de la limite gratuite de ${BILLING_CONFIG.FREE_TIER_LIMIT.toLocaleString()} events (${Math.round(usagePercentage)}% utilisés).`
              }
            </AlertDescription>
          </div>
        </Alert>
      </div>
    </div>
  );
} 