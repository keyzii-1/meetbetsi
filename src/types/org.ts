export interface Organization {
  id: string
  name: string
  slug: string
  domain: string | null
  logo_url: string | null
  logo_icon_url: string | null
  favicon_url: string | null
  primary_color: string
  secondary_color: string
  dark_color: string
  font_heading: string
  font_body: string
  geofence_radius_meters: number
  check_in_window_minutes: number
  no_show_threshold_minutes: number
  session_timeout_minutes: number
  max_file_upload_mb: number
  stripe_customer_id: string | null
  stripe_subscription_id: string | null
  plan: string
  is_active: boolean
  created_at: string
  updated_at: string
}

export interface OrgFeature {
  id: string
  org_id: string
  feature_key: string
  enabled: boolean
}
