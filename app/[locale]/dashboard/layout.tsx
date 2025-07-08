'use client'

import { useAuth } from "@/lib/hooks/use-auth.hook"
import { useEffect } from "react"
import LeftBar from "./left-bar"
import { QuotaWarningBanner } from "@/components/dashboard/quota-warning-banner"
import { useProjectStore } from "@/lib/stores/project-store"
import { ReactNode } from "react"

interface DashboardLayoutProps {
  children: ReactNode
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const { isAuthenticated, isLoading, requireAuth } = useAuth()
  const { selectedOrganization } = useProjectStore()

  useEffect(() => {
    if (!isLoading) {
      requireAuth()
    }
  }, [isLoading, requireAuth])

  if (isLoading) {
    return (
      <div className="flex h-screen bg-background items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return null
  }

  return (
    <div className="flex h-screen bg-background">
      <LeftBar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <QuotaWarningBanner eventsUsed={selectedOrganization?.eventsUsed ?? 0} />
        <main className="flex-1 overflow-y-auto gradient-section px-4 md:px-6 lg:px-8">
          {children}
        </main>
      </div>
    </div>
  )
}
