import type { OrgConfig } from '../org-config'
import { ALL_FEATURE_KEYS } from '../features'
import { defaultOrgConfig } from './default'

/** Meet Betsi internal org — all features enabled */
export const meetbetsiOrgConfig: OrgConfig = {
  ...defaultOrgConfig,
  orgId: 'mb-internal',
  orgName: 'Meet Betsi',
  slug: 'meetbetsi',
  features: Object.fromEntries(
    ALL_FEATURE_KEYS.map(key => [key, true])
  ) as OrgConfig['features'],
}
