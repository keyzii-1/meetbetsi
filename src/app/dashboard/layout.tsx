'use client'

import { useSearchParams } from 'next/navigation'
import { Suspense } from 'react'
import AuthGuard from '@/components/auth/AuthGuard'
import DashboardSidebar from '@/components/dashboard/DashboardSidebar'
import { DashboardContextProvider } from '@/components/dashboard/DashboardContext'
import { OrgProvider } from '@/config/org-provider'
import { defaultOrgConfig } from '@/config/orgs/default'
import { useOrgConfig } from '@/hooks/use-org-config'

function DashboardInner({ children }: { children: React.ReactNode }) {
  const searchParams = useSearchParams()
  const previewOrgId = searchParams.get('preview_org') || undefined
  const { config, loading } = useOrgConfig(previewOrgId)

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-2 border-brand-purple border-t-transparent" />
      </div>
    )
  }

  const orgConfig = config || defaultOrgConfig

  return (
    <DashboardContextProvider previewOrgId={previewOrgId}>
      <OrgProvider config={orgConfig}>
        <div className="flex min-h-screen">
          <DashboardSidebar previewMode={!!previewOrgId} />
          <div className="flex-1 bg-gray-50 p-8 overflow-auto">
            {children}
          </div>
        </div>
      </OrgProvider>
    </DashboardContextProvider>
  )
}

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthGuard>
      <Suspense fallback={
        <div className="flex items-center justify-center min-h-screen">
          <div className="animate-spin rounded-full h-8 w-8 border-2 border-brand-purple border-t-transparent" />
        </div>
      }>
        <DashboardInner>{children}</DashboardInner>
      </Suspense>
    </AuthGuard>
  )
}
