'use client'

import { useState } from 'react'
import { getFeaturesByDomain } from '@/config/feature-descriptions'
import { PLAN_PRESETS } from '@/config/plan-presets'
import { ALL_FEATURE_KEYS, type FeatureKey } from '@/config/features'
import { createClient } from '@/lib/supabase-client'

interface Props {
  orgId: string
  enabledFeatures: Set<string>
  onUpdate: () => void
}

export default function FeatureToggleGrid({ orgId, enabledFeatures, onUpdate }: Props) {
  const [saving, setSaving] = useState<string | null>(null)
  const [localEnabled, setLocalEnabled] = useState(enabledFeatures)
  const domains = getFeaturesByDomain()

  const toggle = async (key: FeatureKey) => {
    const wasEnabled = localEnabled.has(key)
    const next = new Set(localEnabled)
    wasEnabled ? next.delete(key) : next.add(key)
    setLocalEnabled(next)
    setSaving(key)

    const supabase = createClient()
    if (wasEnabled) {
      await supabase.from('org_features').delete().eq('org_id', orgId).eq('feature_key', key)
    } else {
      await supabase.from('org_features').upsert({ org_id: orgId, feature_key: key, enabled: true })
    }
    setSaving(null)
    onUpdate()
  }

  const applyPreset = async (plan: string) => {
    const keys = PLAN_PRESETS[plan] ?? []
    const supabase = createClient()
    await supabase.from('org_features').delete().eq('org_id', orgId)
    if (keys.length > 0) {
      await supabase.from('org_features').insert(keys.map(k => ({ org_id: orgId, feature_key: k, enabled: true })))
    }
    setLocalEnabled(new Set(keys))
    onUpdate()
  }

  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <span className="text-sm text-brand-gray">Apply preset:</span>
        {Object.keys(PLAN_PRESETS).map(plan => (
          <button key={plan} onClick={() => applyPreset(plan)}
            className="px-3 py-1 rounded-full text-xs font-medium border border-brand-purple-muted hover:bg-brand-purple-bg transition-colors capitalize">
            {plan}
          </button>
        ))}
      </div>

      <div className="space-y-8">
        {Object.entries(domains).map(([domain, features]) => (
          <div key={domain}>
            <h3 className="text-sm font-semibold text-brand-gray uppercase tracking-wider mb-3">{domain}</h3>
            <div className="bg-white rounded-xl border border-gray-100 divide-y divide-gray-50">
              {features.map(feat => (
                <div key={feat.key} className="flex items-center justify-between px-4 py-3">
                  <div>
                    <p className="text-sm font-medium text-brand-dark">{feat.label}</p>
                    <p className="text-xs text-brand-gray">{feat.description}</p>
                  </div>
                  <button onClick={() => toggle(feat.key)} disabled={saving === feat.key}
                    className={`relative w-11 h-6 rounded-full transition-colors ${localEnabled.has(feat.key) ? 'bg-brand-purple' : 'bg-gray-200'}`}
                    aria-label={`Toggle ${feat.label}`}>
                    <span className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform ${localEnabled.has(feat.key) ? 'translate-x-5' : ''}`} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
