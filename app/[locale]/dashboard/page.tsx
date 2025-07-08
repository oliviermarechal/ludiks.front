'use client'

import { useProjectOverview } from '@/lib/hooks/use-project-overview.hook'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Users, Target, PlusCircle, CheckCircle, Zap, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Link } from '@/lib/navigation'
import { CircuitCard } from './circuit-card'
import { useTranslations } from 'next-intl'
import { useOrganizations } from '@/lib/hooks/use-organizations.hook'
import { useRouter } from '@/lib/navigation'
import { useEffect } from 'react'

export interface CircuitOverview {
  id: string
  name: string
  type: string
  active: boolean
  completionRate: number
  averageCompletionTime: number
  hasFrictionPoints?: boolean
  frictionPoints?: Array<{
    stepId: string
    stepName: string
    dropoffRate: number
    averageTime: number
  }>
}

const formatPercentage = (value: number): string => {
  return value.toFixed(1)
}

export default function DashboardPage() {
  const { overview, isLoading } = useProjectOverview()
  const t = useTranslations('dashboard.common')

  // Redirige vers l'onboarding si aucune organization
  const { organizations, isLoading: isOrgLoading } = useOrganizations()
  const router = useRouter()
  useEffect(() => {
    if (!isOrgLoading && organizations.length === 0) {
      router.replace('/onboarding')
    }
  }, [isOrgLoading, organizations, router])

  if (isLoading) {
    return <div>{t('loading')}</div>
  }

  if (!overview) {
    return <div>{t('noProject')}</div>
  }

  // Check if there are any circuits
  const hasCircuits = overview.circuits && overview.circuits.length > 0
  const activeCircuits = overview.circuits.filter((circuit: CircuitOverview) => !!circuit.active)

  // Empty state when no circuits exist
  if (!hasCircuits) {
    return (
      <div className="container mx-auto py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center space-y-8">
            {/* Header */}
            <div className="space-y-4">
              <h1 className="text-3xl font-bold text-foreground">
                {t('sidebar.overview')}
              </h1>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                {t('emptyState.description')}
              </p>
            </div>

            {/* Empty state illustration */}
            <div className="relative">
              <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-secondary/20 to-secondary/10 rounded-full flex items-center justify-center">
                <Zap className="h-12 w-12 text-secondary" />
              </div>
            </div>

            {/* CTA Section */}
            <div className="space-y-6">
              <div className="space-y-4">
                <h2 className="text-2xl font-semibold text-foreground">
                  {t('emptyState.title')}
                </h2>
                <p className="text-muted-foreground max-w-xl mx-auto">
                  {t('emptyState.subtitle')}
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/dashboard/circuits/new">
                  <Button size="lg" className="bg-secondary hover:bg-secondary/90 text-secondary-foreground">
                    <PlusCircle className="mr-2 h-5 w-5" />
                    {t('newCircuit')}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <div className="relative">
                  <Button variant="outline" size="lg" disabled className="opacity-60 cursor-not-allowed">
                    {t('emptyState.browseTemplates')}
                  </Button>
                  <div className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs px-2 py-1 rounded-full font-medium">
                    {t('emptyState.comingSoon')}
                  </div>
                </div>
              </div>
            </div>

            {/* Quick tips */}
            <div className="mt-12 pt-8 border-t border-border">
              <h3 className="text-lg font-medium text-foreground mb-4">
                {t('emptyState.quickStart')}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-2xl mx-auto">
                <div className="text-center space-y-2">
                  <div className="w-8 h-8 mx-auto bg-secondary/20 rounded-full flex items-center justify-center">
                    <span className="text-sm font-semibold text-secondary">1</span>
                  </div>
                  <p className="text-sm text-muted-foreground">{t('emptyState.step1')}</p>
                </div>
                <div className="text-center space-y-2">
                  <div className="w-8 h-8 mx-auto bg-secondary/20 rounded-full flex items-center justify-center">
                    <span className="text-sm font-semibold text-secondary">2</span>
                  </div>
                  <p className="text-sm text-muted-foreground">{t('emptyState.step2')}</p>
                </div>
                <div className="text-center space-y-2">
                  <div className="w-8 h-8 mx-auto bg-secondary/20 rounded-full flex items-center justify-center">
                    <span className="text-sm font-semibold text-secondary">3</span>
                  </div>
                  <p className="text-sm text-muted-foreground">{t('emptyState.step3')}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Regular dashboard when circuits exist
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
            {activeCircuits.map((circuit: CircuitOverview) => (
              <CircuitCard key={circuit.id} circuit={circuit} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}  