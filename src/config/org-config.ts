import type { FeatureKey } from './features'

export interface OrgTheme {
  primaryColor: string
  secondaryColor: string
  darkColor: string
  fontHeading: string
  fontBody: string
  logoUrl: string
  logoIconUrl: string
  faviconUrl: string
}

export interface OrgSettings {
  geofenceRadiusMeters: number
  checkInWindowMinutes: number
  noShowThresholdMinutes: number
  sessionTimeoutMinutes: number
  maxFileUploadMB: number
}

export interface OrgConfig {
  orgId: string
  orgName: string
  slug: string
  domain?: string
  features: Record<FeatureKey, boolean>
  theme: OrgTheme
  settings: OrgSettings
}
