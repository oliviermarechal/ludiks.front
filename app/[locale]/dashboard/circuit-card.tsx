import { Card } from '@/components/ui/card'
import { ChevronRight, AlertTriangle } from 'lucide-react'
import { formatDuration } from '@/lib/utils'
import Link from 'next/link'
import { CircuitOverview } from './page'
import { useTranslations } from 'next-intl'

interface CircuitCardProps {
  circuit: CircuitOverview
}

const formatPercentage = (value: number): string => {
  return value.toFixed(1)
}

export function CircuitCard({ circuit }: CircuitCardProps) {
  const t = useTranslations('dashboard.common')

  return (
    <Link href={`/dashboard/circuits/${circuit.id}`}>
      <Card 
        className="group relative overflow-hidden border border-border hover:border-secondary transition-all duration-300 bg-background cursor-pointer"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-secondary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        
        <div className="relative p-6">
          <div className="flex items-start justify-between mb-6">
            <div className="space-y-1">
              <h3 className="text-xl font-semibold text-foreground group-hover:text-secondary transition-colors">
                {circuit.name}
              </h3>
            </div>
            <ChevronRight className="h-5 w-5 text-muted-foreground group-hover:text-secondary transition-colors" />
          </div>

          <div className="grid grid-cols-2 gap-6 mb-6">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-foreground">{t('circuitCard.completionRate')}</span>
                <span className="text-sm font-bold text-foreground">{formatPercentage(circuit.completionRate)}%</span>
              </div>
              <div className="relative h-1.5 bg-muted rounded-full overflow-hidden">
                <div 
                  className="absolute inset-y-0 left-0 bg-secondary transition-all duration-500"
                  style={{ width: `${circuit.completionRate}%` }}
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-foreground">{t('circuitCard.averageTime')}</span>
                <span className="text-sm font-bold text-foreground">{formatDuration(circuit.averageCompletionTime)}</span>
              </div>
              <div className="relative h-1.5 bg-muted rounded-full overflow-hidden">
                <div 
                  className="absolute inset-y-0 left-0 bg-secondary transition-all duration-500"
                  style={{ width: `${(circuit.averageCompletionTime / 3600) * 100}%` }}
                />
              </div>
            </div>
          </div>

          {circuit.hasFrictionPoints && circuit.frictionPoints && circuit.frictionPoints.length > 0 && (
            <div className="pt-4 border-t border-border">
              <div className="flex items-center gap-2 mb-3">
                <AlertTriangle className="h-4 w-4 text-amber-500" />
                <span className="text-sm font-medium text-foreground">{t('circuitCard.attentionPoints')}</span>
              </div>
              <div className="space-y-2">
                {circuit.frictionPoints.map((point) => (
                  <div 
                    key={point.stepId} 
                    className="p-3 bg-muted/50 rounded-lg hover:bg-muted transition-colors"
                  >
                    <p className="text-sm font-medium text-foreground">
                      {t('circuitCard.conversionDrop', { rate: formatPercentage(point.dropoffRate) })}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {t('circuitCard.betweenSteps', { step: point.stepName })}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {t('circuitCard.averageTimeLabel')} : {formatDuration(point.averageTime)}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </Card>
    </Link>
  )
} 