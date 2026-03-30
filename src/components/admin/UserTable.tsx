'use client'

import { createClient } from '@/lib/supabase-client'
import type { UserRole } from '@/types/auth'

interface Member {
  id: string
  user_id: string
  role: UserRole
  is_active: boolean
  profiles: { email: string; full_name: string | null } | null
}

interface Props {
  members: Member[]
  orgId: string
  onUpdate: () => void
}

const ROLES: UserRole[] = ['org_admin', 'manager', 'caregiver', 'family_member']

export default function UserTable({ members, orgId, onUpdate }: Props) {
  const changeRole = async (membershipId: string, role: UserRole) => {
    const supabase = createClient()
    await supabase.from('org_memberships').update({ role }).eq('id', membershipId)
    onUpdate()
  }

  const removeMember = async (membershipId: string) => {
    if (!confirm('Remove this user from the organization?')) return
    const supabase = createClient()
    await supabase.from('org_memberships').delete().eq('id', membershipId)
    onUpdate()
  }

  if (members.length === 0) {
    return <p className="text-brand-gray text-center py-8">No members yet.</p>
  }

  return (
    <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-gray-50 text-left text-brand-gray">
            <th className="px-4 py-3 font-medium">Name</th>
            <th className="px-4 py-3 font-medium">Email</th>
            <th className="px-4 py-3 font-medium">Role</th>
            <th className="px-4 py-3 font-medium">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {members.map(m => (
            <tr key={m.id} className="hover:bg-gray-50">
              <td className="px-4 py-3 text-brand-dark">{m.profiles?.full_name || '—'}</td>
              <td className="px-4 py-3 text-brand-gray">{m.profiles?.email}</td>
              <td className="px-4 py-3">
                <select value={m.role} onChange={e => changeRole(m.id, e.target.value as UserRole)}
                  className="text-xs border rounded px-2 py-1 focus:border-brand-purple outline-none">
                  {ROLES.map(r => <option key={r} value={r}>{r.replace('_', ' ')}</option>)}
                </select>
              </td>
              <td className="px-4 py-3">
                <button onClick={() => removeMember(m.id)} className="text-xs text-red-500 hover:text-red-700">Remove</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
