import type { OrgConfig } from '../org-config'
import { ALL_FEATURE_KEYS, FEATURE_KEYS } from '../features'

/** Creates a features record with all keys set to false */
function allFeaturesOff() {
  return Object.fromEntries(ALL_FEATURE_KEYS.map(k => [k, false])) as OrgConfig['features']
}

const DEFAULT_THEME: OrgConfig['theme'] = {
  primaryColor: '#6B3FA0',
  secondaryColor: '#8B5FC7',
  darkColor: '#1A1A2E',
  fontHeading: 'Sora',
  fontBody: 'Inter',
  logoUrl: '/images/logo-full.png',
  logoIconUrl: '/images/logo-icon.png',
  faviconUrl: '/favicon.ico',
}

const DEFAULT_SETTINGS: OrgConfig['settings'] = {
  geofenceRadiusMeters: 200,
  checkInWindowMinutes: 15,
  noShowThresholdMinutes: 30,
  sessionTimeoutMinutes: 15,
  maxFileUploadMB: 500,
}

export const defaultOrgConfig: OrgConfig = {
  orgId: 'default',
  orgName: 'Meet Betsi',
  slug: 'meetbetsi',
  features: {
    ...allFeaturesOff(),
    [FEATURE_KEYS.MARKETING_SITE]: true,
    [FEATURE_KEYS.BLOG]: true,
    [FEATURE_KEYS.STORIES]: true,
  },
  theme: DEFAULT_THEME,
  settings: DEFAULT_SETTINGS,
}
