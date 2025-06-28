import { AlertTriangle, X, CreditCard } from "lucide-react"
import { Organization } from "@/lib/stores/project-store"
import { useTranslations } from "next-intl"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { shouldShowQuotaBanner, getQuotaPercentage } from "./events-consumption"
import Link from "next/link"

// Add this to your global CSS or Tailwind config if not present
// .animate-fade-in { animation: fadeIn 0.4s ease; }
// @keyframes fadeIn { from { opacity: 0; transform: translateY(20px);} to { opacity: 1; transform: translateY(0);} }

interface QuotaWarningBannerProps {
    organization: Organization | null
}

export function QuotaWarningBanner({ organization }: QuotaWarningBannerProps) {
    const t = useTranslations('dashboard.common')
    const [isDismissed, setIsDismissed] = useState(false)

    if (!organization || isDismissed || !shouldShowQuotaBanner(organization)) {
        return null
    }

    const percentage = getQuotaPercentage(organization)
    const isExceeded = percentage >= 100
    const message = isExceeded
        ? t('eventsConsumption.quotaExceeded')
        : t('eventsConsumption.quotaWarning')

    return (
        <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50 w-full max-w-md px-4 animate-fade-in">
            <div className="flex items-center gap-3 bg-background/90 border border-primary/20 shadow-xl rounded-2xl px-5 py-3 backdrop-blur-md">
                <AlertTriangle className="h-5 w-5 text-primary flex-shrink-0" />
                <div className="flex-1 text-sm text-foreground font-medium">
                    {message}
                </div>
                <Link href="/dashboard/organization/billing">
                    <Button
                        size="sm"
                        variant="ghost"
                        className="border-primary/40 text-primary hover:bg-primary/10"
                    >
                        <CreditCard className="h-4 w-4 mr-1" />
                        {t('billing.upgrade')}
                    </Button>
                </Link>
                <button
                    onClick={() => setIsDismissed(true)}
                    className="ml-2 text-muted-foreground hover:text-primary transition-colors rounded-full p-1"
                >
                    <X className="h-4 w-4" />
                </button>
            </div>
        </div>
    )
} 