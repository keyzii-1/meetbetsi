'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase-client'
import OrgTable from '@/components/admin/OrgTable'
import OrgForm from '@/components/admin/OrgForm'
import type { Organization } from '@/types/org'

export default function OrganizationsPage() {
  const [orgs, setOrgs] = useState<Organization[]>([])
  const [showForm, setShowForm] = useState(false)
  const [search, setSearch] = useState('')

  useEffect(() => { loadOrgs() }, [])

  async function loadOrgs() {
    const supabase = createClient()
    const { data } = await supabase.from('organizations').select('*').order('created_at', { ascending: false })
    if (data) setOrgs(data)
  }

  const filtered = orgs.filter(o =>
    o.name.toLowerCase().includes(search.toLowerCase()) ||
    o.slug.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-heading font-bold text-brand-dark">Organizations</h1>
        <button onClick={() => setShowForm(true)}
          className="px-4 py-2 rounded-lg bg-brand-purple text-white text-sm font-medium hover:bg-brand-purple-light transition-colors">
          + Create Organization
        </button>
      </div>
      <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search orgs..."
        className="w-full max-w-sm px-4 py-2 border rounded-lg text-sm mb-6 focus:border-brand-purple outline-none" />
      <OrgTable orgs={filtered} />
      {showForm && <OrgForm onClose={() => { setShowForm(false); loadOrgs() }} />}
    </div>
  )
}
