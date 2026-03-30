'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase-client'
import CreateUserForm from '@/components/admin/CreateUserForm'

interface UserRow {
  id: string
  email: string
  full_name: string | null
  orgName: string | null
  role: string | null
}

export default function UsersPage() {
  const [users, setUsers] = useState<UserRow[]>([])
  const [search, setSearch] = useState('')

  useEffect(() => { loadUsers() }, [])

  async function loadUsers() {
    const supabase = createClient()
    const { data: profiles } = await supabase.from('profiles').select('*').order('created_at', { ascending: false })
    if (!profiles) return

    const { data: memberships } = await supabase.from('org_memberships').select('user_id, role, org_id')
    const { data: orgs } = await supabase.from('organizations').select('id, name')
    const orgMap = new Map((orgs || []).map(o => [o.id, o.name]))

    setUsers(profiles.map(p => {
      const mem = (memberships || []).find(m => m.user_id === p.id)
      return { id: p.id, email: p.email, full_name: p.full_name, orgName: mem ? orgMap.get(mem.org_id) || null : null, role: mem?.role || null }
    }))
  }

  const filtered = users.filter(u =>
    (u.full_name || '').toLowerCase().includes(search.toLowerCase()) ||
    u.email.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div>
      <h1 className="text-2xl font-heading font-bold text-brand-dark mb-6">Users</h1>
      <CreateUserForm onDone={loadUsers} />
      <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search by name or email..."
        className="w-full max-w-sm px-4 py-2 border rounded-lg text-sm mb-6 focus:border-brand-purple outline-none" />
      <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-50 text-left text-brand-gray">
              <th className="px-4 py-3 font-medium">Name</th>
              <th className="px-4 py-3 font-medium">Email</th>
              <th className="px-4 py-3 font-medium">Org</th>
              <th className="px-4 py-3 font-medium">Role</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {filtered.map(u => (
              <tr key={u.id} className="hover:bg-gray-50">
                <td className="px-4 py-3 text-brand-dark">{u.full_name || '—'}</td>
                <td className="px-4 py-3 text-brand-gray">{u.email}</td>
                <td className="px-4 py-3 text-brand-gray">{u.orgName || '—'}</td>
                <td className="px-4 py-3">
                  {u.role && <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-brand-purple-bg text-brand-purple">{u.role.replace('_', ' ')}</span>}
                  {!u.role && '—'}
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
