'use client'

import { useOrg } from '@/config/org-provider'
import { useDashboardQuery } from '@/components/dashboard/DashboardContext'
import { FEATURE_KEYS } from '@/config/features'
import { FEATURE_DESCRIPTIONS } from '@/config/feature-descriptions'
import Link from 'next/link'

const MODULE_CARDS = [
  { key: FEATURE_KEYS.TRAINING_MODULES, href: '/dashboard/training', icon: '📚', color: 'bg-purple-50 text-purple-700' },
  { key: FEATURE_KEYS.SHIFT_MANAGEMENT, href: '/dashboard/schedule', icon: '📅', color: 'bg-blue-50 text-blue-700' },
  { key: FEATURE_KEYS.DIRECT_MESSAGES, href: '/dashboard/messages', icon: '💬', color: 'bg-green-50 text-green-700' },
  { key: FEATURE_KEYS.DOCUMENT_STORAGE, href: '/dashboard/documents', icon: '📁', color: 'bg-amber-50 text-amber-700' },
  { key: FEATURE_KEYS.AI_CARE_ASSISTANT, href: '/dashboard/ai', icon: '🤖', color: 'bg-pink-50 text-pink-700' },
]

export default function DashboardHome() {
  const org = useOrg()
  const qs = useDashboardQuery()

  const enabledModules = MODULE_CARDS.filter(m => org.features[m.key as keyof typeof org.features])

  return (
    <div>
      <h1 className="text-2xl font-heading font-bold text-brand-dark mb-1">Welcome to {org.orgName}</h1>
      <p className="text-brand-gray text-sm mb-8">Your care management dashboard</p>

      {enabledModules.length === 0 ? (
        <div className="bg-white rounded-xl border border-gray-100 p-12 text-center">
          <p className="text-brand-gray">No modules are enabled for this organization yet.</p>
          <p className="text-xs text-brand-gray mt-1">An admin can enable features from the admin panel.</p>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {enabledModules.map(m => {
            const meta = FEATURE_DESCRIPTIONS[m.key as keyof typeof FEATURE_DESCRIPTIONS]
            return (
              <Link key={m.key} href={`${m.href}${qs}`}
                className="bg-white rounded-xl border border-gray-100 p-6 hover:shadow-md transition-shadow group">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center text-lg mb-3 ${m.color}`}>
                  {m.icon}
                </div>
                <h3 className="font-semibold text-brand-dark group-hover:text-brand-purple transition-colors">
                  {meta.label}
                </h3>
                <p className="text-xs text-brand-gray mt-1">{meta.description}</p>
              </Link>
            )
          })}
        </div>
      )}
    </div>
  )
}
