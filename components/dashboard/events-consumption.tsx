import { Infinity, Activity } from "lucide-react"
import { Organization } from "@/lib/stores/project-store"
import { useTranslations } from "next-intl"
import { Progress } from "@/components/ui/progress"

interface EventsConsumptionProps {
    organization: Organization | null
}

// Helper function to check if quota warning should be shown as floating banner
export function shouldShowQuotaBanner(organization: Organization | null): boolean {
    if (!organization) return false
    
    const { eventsQuota, eventsUsed } = organization
    const safeEventsQuota = eventsQuota || 0
    const safeEventsUsed = eventsUsed || 0
    const isUnlimited = safeEventsQuota === 0
    
    if (isUnlimited) return false
    
    const percentage = (safeEventsUsed / safeEventsQuota) * 100
    return percentage >= 80
}

export function getQuotaPercentage(organization: Organization | null): number {
    if (!organization) return 0
    
    const { eventsQuota, eventsUsed } = organization
    const safeEventsQuota = eventsQuota || 0
    const safeEventsUsed = eventsUsed || 0
    const isUnlimited = safeEventsQuota === 0
    
    if (isUnlimited) return 0
    
    return (safeEventsUsed / safeEventsQuota) * 100
}

export function EventsConsumption({ organization }: EventsConsumptionProps) {
    const t = useTranslations('dashboard.common')

    if (!organization) return null

    const { eventsQuota, eventsUsed } = organization
    const safeEventsQuota = eventsQuota || 0
    const safeEventsUsed = eventsUsed || 0
    const isUnlimited = safeEventsQuota === 0
    const percentage = isUnlimited ? 0 : (safeEventsUsed / safeEventsQuota) * 100

    return (
        <div className="space-y-3">
            {/* Consumption Display */}
            <div className="p-3 rounded-lg bg-surface-1/50 backdrop-blur-sm border border-primary/10 space-y-2">
                <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-lg bg-secondary/10 flex items-center justify-center">
                        <Activity className="h-4 w-4 text-secondary" />
                    </div>
                    <p className="text-sm font-medium text-foreground">
                        {t('eventsConsumption.title')}
                    </p>
                </div>

                {isUnlimited ? (
                    <div className="flex items-center gap-2">
                        <Infinity className="h-4 w-4 text-emerald-500" />
                        <span className="text-xs text-muted-foreground">
                            {t('eventsConsumption.unlimited')}
                        </span>
                    </div>
                ) : (
                    <>
                        <div className="flex items-center justify-between text-xs">
                            <span className="text-muted-foreground">
                                {safeEventsUsed.toLocaleString()} / {safeEventsQuota.toLocaleString()} {t('eventsConsumption.events')}
                            </span>
                            <span className={`font-medium ${percentage >= 80 ? 'text-destructive' : 'text-muted-foreground'}`}>
                                {Math.round(percentage)}%
                            </span>
                        </div>
                        <Progress 
                            value={percentage} 
                            className="h-2"
                            style={{
                                '--progress-background': 'hsl(var(--muted))',
                                '--progress-foreground': percentage >= 80 ? 'hsl(var(--destructive))' : 'hsl(var(--secondary))'
                            } as React.CSSProperties}
                        />
                    </>
                )}
            </div>
        </div>
    )
} 