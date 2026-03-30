'use client'

import { useOrg } from '@/config/org-provider'
import type { FeatureKey } from '@/config/features'

interface FeatureGateProps {
  feature: FeatureKey
  children: React.ReactNode
  fallback?: React.ReactNode
}

/** Renders children only if the feature is enabled for the current org */
export function FeatureGate({ feature, children, fallback = null }: FeatureGateProps) {
  const org = useOrg()
  return org.features[feature] ? <>{children}</> : <>{fallback}</>
}
