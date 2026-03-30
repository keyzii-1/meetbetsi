'use client'

import { createContext, useContext } from 'react'

interface DashboardCtx {
  previewOrgId?: string
}

const Ctx = createContext<DashboardCtx>({})

export function DashboardContextProvider({ previewOrgId, children }: { previewOrgId?: string; children: React.ReactNode }) {
  return <Ctx.Provider value={{ previewOrgId }}>{children}</Ctx.Provider>
}

/** Returns the query string suffix to append to dashboard links (e.g. "?preview_org=abc") */
export function useDashboardQuery() {
  const { previewOrgId } = useContext(Ctx)
  return previewOrgId ? `?preview_org=${previewOrgId}` : ''
}

export function useDashboardContext() {
  return useContext(Ctx)
}
