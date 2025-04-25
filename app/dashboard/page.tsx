'use client'

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import {
    Users,
    CircuitBoard,
    Target,
    ArrowUpRight,
    AlertTriangle,
    Trophy,
    Clock,
} from "lucide-react"
import { redirect } from "next/navigation"
import { useAuth } from "@/lib/hooks/use-auth.hook"
import { useEffect } from "react"
import Link from "next/link"

// Mock data
const projectStats = {
    totalUsers: 2451,
    activeUsers: 1890,
    completionRate: 67,
    circuits: [
        {
            id: 1,
            name: "Onboarding",
            type: "objective",
            status: "active",
            users: 450,
            completionRate: 72,
            steps: 5,
            frictionPoints: [
                {
                    step: 3,
                    name: "Configuration API",
                    dropRate: 35,
                    previousStepRate: 85
                }
            ]
        },
        {
            id: 2,
            name: "Découverte Features",
            type: "points",
            status: "active",
            users: 890,
            completionRate: 45,
            steps: 8,
            frictionPoints: []
        },
        {
            id: 3,
            name: "Programme fidélité",
            type: "points",
            status: "draft",
            users: 0,
            completionRate: 0,
            steps: 3,
            frictionPoints: []
        }
    ]
}

function getCompletionColor(rate: number) {
    if (rate >= 75) return "text-emerald-500";
    if (rate >= 50) return "text-blue-500";
    if (rate >= 25) return "text-secondary";
    return "text-red-500";
}

export default function DashboardPage() {
    const { isAuthenticated, isLoading } = useAuth()

    useEffect(() => {
        if (!isLoading && !isAuthenticated) {
            redirect('/login')
        }
    }, [isAuthenticated, isLoading])

    if (isLoading) {
        return <div>Loading...</div>
    }

    const activeCircuits = projectStats.circuits.filter(c => c.status === 'active')
    const hasFrictionPoints = activeCircuits.some(c => c.frictionPoints.length > 0)

    return (
        <main className="flex-1 overflow-y-auto p-8">
            <div className="max-w-7xl mx-auto space-y-8">
                {/* Welcome Section */}
                <div className="space-y-1">
                    <h1 className="text-3xl font-bold landing-title">
                        Vue d&apos;ensemble
                    </h1>
                    <p className="text-muted-foreground">Voici un aperçu de l&apos;activité de votre projet</p>
                </div>

                {/* Quick Stats */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <Card className="stats-card">
                        <div className="flex items-start gap-4">
                            <div className="icon-container">
                                <Users className="h-6 w-6 text-secondary" />
                            </div>
                            <div className="space-y-1">
                                <p className="metric-label">Utilisateurs actifs</p>
                                <h3 className="metric-value">{projectStats.activeUsers}</h3>
                                <p className="text-xs text-accent">sur {projectStats.totalUsers} inscrits</p>
                            </div>
                        </div>
                    </Card>

                    <Card className="stats-card">
                        <div className="flex items-start gap-4">
                            <div className="icon-container">
                                <CircuitBoard className="h-6 w-6 text-secondary" />
                            </div>
                            <div className="space-y-1">
                                <p className="metric-label">Circuits actifs</p>
                                <h3 className="metric-value">{activeCircuits.length}</h3>
                                <p className="text-xs text-accent">{projectStats.circuits.length - activeCircuits.length} en brouillon</p>
                            </div>
                        </div>
                    </Card>

                    <Card className="stats-card">
                        <div className="flex items-start gap-4">
                            <div className="icon-container">
                                <Trophy className="h-6 w-6 text-secondary" />
                            </div>
                            <div className="space-y-1">
                                <p className="metric-label">Taux complétion</p>
                                <h3 className="metric-value">{projectStats.completionRate}%</h3>
                                <p className="text-xs text-accent">moyenne globale</p>
                            </div>
                        </div>
                    </Card>

                    <Card className="stats-card">
                        <div className="flex items-start gap-4">
                            <div className="icon-container">
                                <Clock className="h-6 w-6 text-secondary" />
                            </div>
                            <div className="space-y-1">
                                <p className="metric-label">Point de friction</p>
                                <h3 className="metric-value">{hasFrictionPoints ? "Détecté" : "Aucun"}</h3>
                                <p className="text-xs text-accent">sur vos parcours</p>
                            </div>
                        </div>
                    </Card>
                </div>

                {/* Friction Points Alert */}
                {hasFrictionPoints && (
                    <Card className="alert-card">
                        <div className="flex items-start gap-4">
                            <div className="icon-container">
                                <AlertTriangle className="h-6 w-6 text-primary" />
                            </div>
                            <div className="flex-1 space-y-4">
                                <div>
                                    <h3 className="text-lg font-semibold text-primary">Point de friction détecté</h3>
                                </div>
                                <div className="space-y-3">
                                    {activeCircuits.map(circuit => {
                                        if (circuit.frictionPoints.length > 0) {
                                            const frictionPoint = circuit.frictionPoints[0];
                                            return (
                                                <Link 
                                                    href={`/dashboard/analytics/${circuit.id}`}
                                                    key={circuit.id}
                                                    className="block p-4 rounded-lg bg-surface-1 hover:bg-surface-2 transition-colors"
                                                >
                                                    <div className="flex items-center justify-between mb-2">
                                                        <span className="font-medium">{circuit.name}</span>
                                                        <span className="text-primary font-bold">
                                                            -{frictionPoint.previousStepRate - frictionPoint.dropRate}%
                                                        </span>
                                                    </div>
                                                    <p className="text-sm text-muted-foreground">
                                                        Chute du taux de complétion à l&apos;étape &quot;{frictionPoint.name}&quot;
                                                    </p>
                                                    <div className="flex items-center gap-2 mt-2 text-xs text-primary/60">
                                                        <span>Voir les détails</span>
                                                        <ArrowUpRight className="h-3 w-3" />
                                                    </div>
                                                </Link>
                                            );
                                        }
                                        return null;
                                    })}
                                </div>
                            </div>
                        </div>
                    </Card>
                )}

                {/* Circuits Overview */}
                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <h2 className="text-xl font-bold">Circuits actifs</h2>
                        </div>
                        <Link href="/dashboard/circuits">
                            <Button variant="outline" size="sm" className="text-accent border-secondary/20 hover:bg-secondary/5">
                                Voir tout
                                <ArrowUpRight className="h-4 w-4 ml-2" />
                            </Button>
                        </Link>
                    </div>
                    <div className="grid gap-3">
                        {activeCircuits.map(circuit => (
                            <Link key={circuit.id} href={`/dashboard/analytics/${circuit.id}`}>
                                <Card className="circuit-card">
                                    <div className="flex items-center gap-6">
                                        <div className="h-12 w-12 rounded-lg bg-secondary/10 flex items-center justify-center">
                                            {circuit.type === 'objective' ? (
                                                <Target className="h-6 w-6 text-secondary" />
                                            ) : (
                                                <Trophy className="h-6 w-6 text-secondary" />
                                            )}
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex items-center justify-between mb-2">
                                                <h3 className="text-lg font-semibold">{circuit.name}</h3>
                                                <span className={`text-lg font-bold ${getCompletionColor(circuit.completionRate)}`}>
                                                    {circuit.completionRate}%
                                                </span>
                                            </div>
                                            <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                                <span>{circuit.users} utilisateurs</span>
                                                <span>•</span>
                                                <span>{circuit.steps} étapes</span>
                                                {circuit.frictionPoints.length > 0 && (
                                                    <>
                                                        <span>•</span>
                                                        <span className="text-primary flex items-center gap-2">
                                                            <AlertTriangle className="h-4 w-4" />
                                                        </span>
                                                    </>
                                                )}
                                            </div>
                                        </div>
                                        <ArrowUpRight className="h-5 w-5 text-muted-foreground" />
                                    </div>
                                </Card>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </main>
    )
}  