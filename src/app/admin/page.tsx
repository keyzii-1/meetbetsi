'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase-client'
import StatsCard from '@/components/admin/StatsCard'

export default function AdminDashboard() {
  const [stats, setStats] = useState({ orgs: 0, users: 0, subs: 0, contacts: 0 })

  useEffect(() => {
    const supabase = createClient()
    Promise.all([
      supabase.from('organizations').select('id', { count: 'exact', head: true }),
      supabase.from('profiles').select('id', { count: 'exact', head: true }),
      supabase.from('subscribers').select('id', { count: 'exact', head: true }),
      supabase.from('contact_submissions').select('id', { count: 'exact', head: true }),
    ]).then(([orgs, users, subs, contacts]) => {
      setStats({
        orgs: orgs.count ?? 0,
        users: users.count ?? 0,
        subs: subs.count ?? 0,
        contacts: contacts.count ?? 0,
      })
    })
  }, [])

  return (
    <div>
      <h1 className="text-2xl font-heading font-bold text-brand-dark mb-6">Dashboard</h1>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard label="Organizations" value={stats.orgs} />
        <StatsCard label="Users" value={stats.users} />
        <StatsCard label="Subscribers" value={stats.subs} subtitle="Email waitlist" />
        <StatsCard label="Contact Forms" value={stats.contacts} />
      </div>
    </div>
  )
}
