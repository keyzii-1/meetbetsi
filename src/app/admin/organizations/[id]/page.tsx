'use client'

import { useState, useEffect, useCallback, use } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase-client'
import OrgTabs from '@/components/admin/OrgTabs'
import OrgGeneralTab from '@/components/admin/OrgGeneralTab'
import FeatureToggleGrid from '@/components/admin/FeatureToggleGrid'
import UserTable from '@/components/admin/UserTable'
import InviteUserForm from '@/components/admin/InviteUserForm'
import ThemeEditor from '@/components/admin/ThemeEditor'
import type { Organization, OrgFeature } from '@/types/org'

export default function OrgDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const [org, setOrg] = useState<Organization | null>(null)
  const [features, setFeatures] = useState<OrgFeature[]>([])
  const [members, setMembers] = useState<any[]>([])
  const [tab, setTab] = useState('General')
  const router = useRouter()

  const load = useCallback(async () => {
    const supabase = createClient()
    const [orgRes, featRes, memRes] = await Promise.all([
      supabase.from('organizations').select('*').eq('id', id).single(),
      supabase.from('org_features').select('*').eq('org_id', id),
      supabase.from('org_memberships').select('*, profiles(email, full_name)').eq('org_id', id),
    ])
    if (orgRes.data) setOrg(orgRes.data)
    if (featRes.data) setFeatures(featRes.data)
    if (memRes.data) setMembers(memRes.data)
  }, [id])

  useEffect(() => { load() }, [load])

  if (!org) {
    return <div className="flex items-center justify-center py-20">
      <div className="animate-spin rounded-full h-8 w-8 border-2 border-brand-purple border-t-transparent" />
    </div>
  }

  const enabledSet = new Set(features.filter(f => f.enabled).map(f => f.feature_key))

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <div>
          <button onClick={() => router.push('/admin/organizations/')} className="text-sm text-brand-purple mb-1">
            &larr; All Organizations
          </button>
          <h1 className="text-2xl font-heading font-bold text-brand-dark">{org.name}</h1>
        </div>
        <div className="flex items-center gap-3">
          <Link href={`/dashboard?preview_org=${id}`}
            className="px-4 py-1.5 rounded-lg bg-brand-purple text-white text-xs font-medium hover:bg-brand-purple-light transition-colors">
            Preview as Client
          </Link>
          <span className={`px-3 py-1 rounded-full text-xs font-medium ${
            org.is_active ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'
          }`}>
            {org.is_active ? 'Active' : 'Inactive'}
          </span>
        </div>
      </div>

      <OrgTabs active={tab} onChange={setTab} />

      {tab === 'General' && <OrgGeneralTab org={org} onUpdate={load} />}
      {tab === 'Features' && <FeatureToggleGrid orgId={id} enabledFeatures={enabledSet} onUpdate={load} />}
      {tab === 'Users' && (
        <div className="space-y-6">
          <InviteUserForm orgId={id} onDone={load} />
          <UserTable members={members} orgId={id} onUpdate={load} />
        </div>
      )}
      {tab === 'Theme' && <ThemeEditor org={org} onUpdate={load} />}
    </div>
  )
}
