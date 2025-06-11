'use client'

import { useProjectOverview } from '@/lib/hooks/use-project-overview.hook'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Users, Target, PlusCircle, CheckCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { CircuitCard } from './circuit-card'

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

  if (isLoading) {
    return <div>Chargement...</div>
  }

  if (!overview) {
    return <div>Veuillez sélectionner un projet</div>
  }

  return (
    <div className="container mx-auto py-12">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">
              Vue d&apos;ensemble
            </h1>
            <p className="text-muted-foreground mt-2">
              Suivez l&apos;activité de vos parcours et identifiez les points d&apos;attention
            </p>
          </div>
          <Link href="/dashboard/circuits/new">
            <Button className="bg-secondary hover:bg-secondary/90 text-secondary-foreground">
              <PlusCircle className="mr-2 h-5 w-5" />
              Nouveau parcours
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="p-6 border border-border hover:border-secondary transition-colors bg-background">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <div className="space-y-1">
                <CardTitle className="text-sm font-medium text-foreground">Parcours</CardTitle>
                <p className="text-xs text-muted-foreground">Nombre total de parcours dans le projet</p>
              </div>
              <Target className="h-5 w-5 text-secondary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{overview.KPIs.total}</div>
              <div className="flex items-center gap-4 mt-2">
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 rounded-full bg-emerald-500" />
                  <span className="text-sm text-muted-foreground">{overview.KPIs.active} actifs</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 rounded-full bg-muted-foreground" />
                  <span className="text-sm text-muted-foreground">{overview.KPIs.inactive} inactifs</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="p-6 border border-border hover:border-secondary transition-colors bg-background">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <div className="space-y-1">
                <CardTitle className="text-sm font-medium text-foreground">Taux de complétion moyen</CardTitle>
                <p className="text-xs text-muted-foreground">Moyenne de complétion sur tous les parcours</p>
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
                <CardTitle className="text-sm font-medium text-foreground">Utilisateurs totaux</CardTitle>
                <p className="text-xs text-muted-foreground">Nombre total d&apos;utilisateurs enregistrés</p>
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
                <CardTitle className="text-sm font-medium text-foreground">Utilisateurs actifs</CardTitle>
                <p className="text-xs text-muted-foreground">Connectés dans les 7 derniers jours</p>
              </div>
              <Users className="h-5 w-5 text-secondary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{overview.users.activeLastWeek}</div>
              <p className="text-xs text-muted-foreground mt-1">
                {overview.users.total === 0 ? 0 : formatPercentage((overview.users.activeLastWeek / overview.users.total) * 100)}% des utilisateurs
              </p>
            </CardContent>
          </Card>

          <Card className="p-6 border border-border hover:border-secondary transition-colors bg-background">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <div className="space-y-1">
                <CardTitle className="text-sm font-medium text-foreground">Parcours complétés</CardTitle>
                <p className="text-xs text-muted-foreground">Utilisateurs ayant terminé au moins un parcours</p>
              </div>
              <CheckCircle className="h-5 w-5 text-secondary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{overview.users.completedAtLeastOne}</div>
              <p className="text-xs text-muted-foreground mt-1">
                {overview.users.total === 0 ? 0 : formatPercentage((overview.users.completedAtLeastOne / overview.users.total) * 100)}% des utilisateurs
              </p>
            </CardContent>
          </Card>
        </div>

        <div>
          <h2 className="text-2xl font-bold text-foreground mb-6">Parcours actifs</h2>

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