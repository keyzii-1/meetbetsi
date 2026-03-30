'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase-client'
import type { Organization } from '@/types/org'

interface Props {
  org: Organization
  onUpdate: () => void
}

export default function OrgGeneralTab({ org, onUpdate }: Props) {
  const [saving, setSaving] = useState(false)

  const updateOrg = async (updates: Partial<Organization>) => {
    setSaving(true)
    const supabase = createClient()
    await supabase.from('organizations').update(updates).eq('id', org.id)
    setSaving(false)
    onUpdate()
  }

  return (
    <div className="bg-white rounded-xl border p-6 space-y-4 max-w-lg">
      <div>
        <label className="block text-xs font-medium mb-1">Name</label>
        <input defaultValue={org.name} onBlur={e => updateOrg({ name: e.target.value })}
          className="w-full px-3 py-2 border rounded-lg text-sm focus:border-brand-purple outline-none" />
      </div>
      <div>
        <label className="block text-xs font-medium mb-1">Slug</label>
        <input defaultValue={org.slug} onBlur={e => updateOrg({ slug: e.target.value })}
          className="w-full px-3 py-2 border rounded-lg text-sm font-mono focus:border-brand-purple outline-none" />
      </div>
      <div>
        <label className="block text-xs font-medium mb-1">Plan</label>
        <select defaultValue={org.plan} onChange={e => updateOrg({ plan: e.target.value })}
          className="w-full px-3 py-2 border rounded-lg text-sm focus:border-brand-purple outline-none">
          <option value="free">Free</option>
          <option value="starter">Starter</option>
          <option value="professional">Professional</option>
          <option value="enterprise">Enterprise</option>
        </select>
      </div>
      <div className="flex items-center gap-3 pt-2">
        <button onClick={() => updateOrg({ is_active: !org.is_active })}
          className="px-4 py-2 rounded-lg border text-sm hover:bg-gray-50">
          {org.is_active ? 'Deactivate' : 'Activate'}
        </button>
      </div>
      {saving && <p className="text-xs text-brand-gray">Saving...</p>}
    </div>
  )
}
