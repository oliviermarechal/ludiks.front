'use client'

import { useAuth } from "@/lib/hooks/use-auth.hook"
import { useEffect } from "react"
import { redirect } from "next/navigation"
import LeftBar from "./left-bar"

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isLoading } = useAuth()

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      redirect('/auth/login')
    }
  }, [isAuthenticated, isLoading])

  return (
    <div className="flex h-screen bg-background">
      <LeftBar />
      <div className="flex-1 flex flex-col min-h-screen">
        <main className="flex-1 overflow-y-auto gradient-section">
          {children}
        </main>
      </div>
    </div>
  )
}
