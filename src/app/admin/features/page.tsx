'use client'

import { getFeaturesByDomain } from '@/config/feature-descriptions'

export default function FeaturesReferencePage() {
  const domains = getFeaturesByDomain()

  return (
    <div>
      <h1 className="text-2xl font-heading font-bold text-brand-dark mb-2">Feature Registry</h1>
      <p className="text-sm text-brand-gray mb-8">Reference of all platform features. Toggle features per-org on the organization detail page.</p>

      <div className="space-y-8">
        {Object.entries(domains).map(([domain, features]) => (
          <div key={domain}>
            <h2 className="text-sm font-semibold text-brand-gray uppercase tracking-wider mb-3">{domain}</h2>
            <div className="bg-white rounded-xl border border-gray-100 divide-y divide-gray-50">
              {features.map(feat => (
                <div key={feat.key} className="px-4 py-3">
                  <p className="text-sm font-medium text-brand-dark">{feat.label}</p>
                  <p className="text-xs text-brand-gray">{feat.description}</p>
                  <p className="text-xs text-brand-gray mt-1 font-mono">{feat.key}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
