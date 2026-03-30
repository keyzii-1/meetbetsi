'use client'

import { useOrg } from '@/config/org-provider'
import type { FeatureKey } from '@/config/features'

/** Returns whether a feature is enabled for the current org */
export function useFeature(feature: FeatureKey): boolean {
  const org = useOrg()
  return org.features[feature] ?? false
}
