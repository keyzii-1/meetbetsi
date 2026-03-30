'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { createClient } from '@/lib/supabase-client'

interface UserRow {
  id: string
  email: string
  full_name: string | null
  memberships: Array<{ role: string; organizations: { name: string } | null }>
}

export default function UsersPage() {
  const [users, setUsers] = useState<UserRow[]>([])
  const [search, setSearch] = useState('')

  useEffect(() => {
    const supabase = createClient()
    supabase.from('profiles').select('id, email, full_name, org_memberships(role, organizations(name))')
      .order('created_at', { ascending: false })
      .then(({ data }) => {
        if (data) setUsers(data.map((u: any) => ({ ...u, memberships: u.org_memberships || [] })))
      })
  }, [])

  const filtered = users.filter(u =>
    (u.full_name || '').toLowerCase().includes(search.toLowerCase()) ||
    u.email.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div>
      <h1 className="text-2xl font-heading font-bold text-brand-dark mb-6">Users</h1>
      <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search by name or email..."
        className="w-full max-w-sm px-4 py-2 border rounded-lg text-sm mb-6 focus:border-brand-purple outline-none" />

      <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-50 text-left text-brand-gray">
              <th className="px-4 py-3 font-medium">Name</th>
              <th className="px-4 py-3 font-medium">Email</th>
              <th className="px-4 py-3 font-medium">Org(s)</th>
              <th className="px-4 py-3 font-medium">Role(s)</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {filtered.map(u => (
              <tr key={u.id} className="hover:bg-gray-50">
                <td className="px-4 py-3 text-brand-dark">{u.full_name || '—'}</td>
                <td className="px-4 py-3 text-brand-gray">{u.email}</td>
                <td className="px-4 py-3 text-brand-gray">{u.memberships.map(m => m.organizations?.name).join(', ') || '—'}</td>
                <td className="px-4 py-3">
                  {u.memberships.map(m => (
                    <span key={m.role} className="px-2 py-0.5 rounded-full text-xs font-medium bg-brand-purple-bg text-brand-purple mr-1">
                      {m.role.replace('_', ' ')}
                    </span>
                  ))}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filtered.length === 0 && <p className="text-center text-brand-gray py-8">No users found.</p>}
      </div>
    </div>
  )
}
