'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase-client'
import { ALL_FEATURE_KEYS, type FeatureKey } from '@/config/features'
import type { OrgConfig } from '@/config/org-config'

/**
 * Loads an org's full config from the database.
 * If orgId is provided, loads that org (admin preview).
 * Otherwise loads the current user's org.
 */
export function useOrgConfig(orgId?: string) {
  const [config, setConfig] = useState<OrgConfig | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    load()
  }, [orgId])

  async function load() {
    const supabase = createClient()

    // Determine which org to load
    let targetOrgId = orgId
    if (!targetOrgId) {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) { setLoading(false); return }

      const { data: membership } = await supabase
        .from('org_memberships')
        .select('org_id')
        .eq('user_id', user.id)
        .eq('is_active', true)
        .limit(1)
        .single()

      if (!membership) { setLoading(false); return }
      targetOrgId = membership.org_id
    }

    // Load org + features in parallel
    const [orgRes, featRes] = await Promise.all([
      supabase.from('organizations').select('*').eq('id', targetOrgId).single(),
      supabase.from('org_features').select('feature_key, enabled').eq('org_id', targetOrgId),
    ])

    if (!orgRes.data) { setLoading(false); return }

    const org = orgRes.data
    const enabledSet = new Set(
      (featRes.data || []).filter(f => f.enabled).map(f => f.feature_key)
    )

    const features = Object.fromEntries(
      ALL_FEATURE_KEYS.map(k => [k, enabledSet.has(k)])
    ) as Record<FeatureKey, boolean>

    setConfig({
      orgId: org.id,
      orgName: org.name,
      slug: org.slug,
      domain: org.custom_domain || undefined,
      features,
      theme: {
        primaryColor: org.theme_primary || '#6B3FA0',
        secondaryColor: org.theme_secondary || '#8B5FC7',
        darkColor: org.theme_dark || '#1A1A2E',
        fontHeading: org.theme_font_heading || 'Sora',
        fontBody: org.theme_font_body || 'Inter',
        logoUrl: org.logo_url || '/images/logo-full.png',
        logoIconUrl: org.logo_icon_url || '/images/logo-icon.png',
        faviconUrl: '/favicon.ico',
      },
      settings: {
        geofenceRadiusMeters: 200,
        checkInWindowMinutes: 15,
        noShowThresholdMinutes: 30,
        sessionTimeoutMinutes: 15,
        maxFileUploadMB: 500,
      },
    })
    setLoading(false)
  }

  return { config, loading }
}
