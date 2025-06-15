'use client'

import { useProjectOverview } from '@/lib/hooks/use-project-overview.hook'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Users, Target, PlusCircle, CheckCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { CircuitCard } from './circuit-card'
import { useTranslations } from 'next-intl'

export interface CircuitOverview {
  id: string
  name: string
  type: string
  active: boolean
  completionRate: number
  averageCompletionTime: number
}

// Fonction utilitaire pour formater les pourcentages
const formatPercentage = (value: number): string => {
  return value.toFixed(1)
}

export default function DashboardPage() {
  const { overview, isLoading } = useProjectOverview()
  const t = useTranslations('dashboard.common')

  if (isLoading) {
    return <div>{t('loading')}</div>
  }

  if (!overview) {
    return <div>{t('noProject')}</div>
  }

  return (
    <div className="container mx-auto py-12">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">
              {t('sidebar.overview')}
            </h1>
            <p className="text-muted-foreground mt-2">
              {t('description')}
            </p>
          </div>
          <Link href="/dashboard/circuits/new">
            <Button className="bg-secondary hover:bg-secondary/90 text-secondary-foreground">
              <PlusCircle className="mr-2 h-5 w-5" />
              {t('newCircuit')}
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="p-6 border border-border hover:border-secondary transition-colors bg-background">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <div className="space-y-1">
                <CardTitle className="text-sm font-medium text-foreground">{t('stats.totalCircuits')}</CardTitle>
                <p className="text-xs text-muted-foreground">{t('stats.totalCircuitsDescription')}</p>
              </div>
              <Target className="h-5 w-5 text-secondary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{overview.KPIs.total}</div>
              <div className="flex items-center gap-4 mt-2">
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 rounded-full bg-emerald-500" />
                  <span className="text-sm text-muted-foreground">{overview.KPIs.active} {t('stats.activeCircuits')}</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 rounded-full bg-muted-foreground" />
                  <span className="text-sm text-muted-foreground">{overview.KPIs.inactive} {t('stats.inactiveCircuits')}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="p-6 border border-border hover:border-secondary transition-colors bg-background">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <div className="space-y-1">
                <CardTitle className="text-sm font-medium text-foreground">{t('stats.winRate')}</CardTitle>
                <p className="text-xs text-muted-foreground">{t('stats.winRateDescription')}</p>
              </div>
              <CheckCircle className="h-5 w-5 text-secondary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{formatPercentage(overview.KPIs.averageCompletionRate)}%</div>
              <Progress value={overview.KPIs.averageCompletionRate} className="mt-2" />
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="p-6 border border-border hover:border-secondary transition-colors bg-background">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <div className="space-y-1">
                <CardTitle className="text-sm font-medium text-foreground">{t('stats.totalUsers')}</CardTitle>
                <p className="text-xs text-muted-foreground">{t('stats.totalUsersDescription')}</p>
              </div>
              <Users className="h-5 w-5 text-secondary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{overview.users.total}</div>
            </CardContent>
          </Card>

          <Card className="p-6 border border-border hover:border-secondary transition-colors bg-background">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <div className="space-y-1">
                <CardTitle className="text-sm font-medium text-foreground">{t('stats.activeUsers')}</CardTitle>
                <p className="text-xs text-muted-foreground">{t('stats.activeUsersDescription')}</p>
              </div>
              <Users className="h-5 w-5 text-secondary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{overview.users.activeLastWeek}</div>
              <p className="text-xs text-muted-foreground mt-1">
                {overview.users.total === 0 ? 0 : formatPercentage((overview.users.activeLastWeek / overview.users.total) * 100)}% {t('stats.ofUsers')}
              </p>
            </CardContent>
          </Card>

          <Card className="p-6 border border-border hover:border-secondary transition-colors bg-background">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <div className="space-y-1">
                <CardTitle className="text-sm font-medium text-foreground">{t('stats.completedCircuits')}</CardTitle>
                <p className="text-xs text-muted-foreground">{t('stats.completedCircuitsDescription')}</p>
              </div>
              <CheckCircle className="h-5 w-5 text-secondary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{overview.users.completedAtLeastOne}</div>
              <p className="text-xs text-muted-foreground mt-1">
                {overview.users.total === 0 ? 0 : formatPercentage((overview.users.completedAtLeastOne / overview.users.total) * 100)}% {t('stats.ofUsers')}
              </p>
            </CardContent>
          </Card>
        </div>

        <div>
          <h2 className="text-2xl font-bold text-foreground mb-6">{t('activeCircuits')}</h2>

          <div className="grid grid-cols-1 gap-4">
            {overview.circuits.filter((circuit: CircuitOverview) => !!circuit.active).map((circuit: CircuitOverview) => (
              <CircuitCard key={circuit.id} circuit={circuit} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}  