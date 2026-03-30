'use client'

import { createContext, useContext, type ReactNode } from 'react'
import type { OrgConfig } from './org-config'
import { defaultOrgConfig } from './orgs/default'

const OrgContext = createContext<OrgConfig>(defaultOrgConfig)

export function OrgProvider({ config, children }: { config: OrgConfig; children: ReactNode }) {
  return <OrgContext.Provider value={config}>{children}</OrgContext.Provider>
}

export function useOrg() {
  return useContext(OrgContext)
}
