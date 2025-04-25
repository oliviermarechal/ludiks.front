'use client'

import { useAuth } from "@/lib/hooks/use-auth.hook"
import { useEffect } from "react"
import { redirect } from "next/navigation"
export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isLoading } = useAuth()

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      redirect('/auth/login')
    }
  }, [isAuthenticated, isLoading])

  return <div>{children}</div>
}
