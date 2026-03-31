'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase-client'
import type { UserRole } from '@/types/auth'
import type { Organization } from '@/types/org'

interface Props {
  onDone: () => void
}

const ROLES: { value: UserRole; label: string }[] = [
  { value: 'super_admin', label: 'Super Admin' },
  { value: 'org_admin', label: 'Org Admin' },
  { value: 'manager', label: 'Manager' },
  { value: 'caregiver', label: 'Caregiver' },
  { value: 'family_member', label: 'Family Member' },
]

export default function CreateUserForm({ onDone }: Props) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [orgId, setOrgId] = useState('')
  const [role, setRole] = useState<UserRole>('caregiver')
  const [orgs, setOrgs] = useState<Organization[]>([])
  const [loading, setLoading] = useState(false)
  const [msg, setMsg] = useState('')
  const [msgType, setMsgType] = useState<'success' | 'error'>('success')

  useEffect(() => {
    const supabase = createClient()
    supabase.from('organizations').select('id, name').order('name').then(({ data }) => {
      if (data) setOrgs(data as Organization[])
    })
  }, [])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!email.trim() || !orgId) return
    setLoading(true)
    setMsg('')

    const supabase = createClient()

    // Check if user already exists
    const { data: existing } = await supabase
      .from('profiles').select('id').eq('email', email.trim()).single()

    let userId: string | null = null

    if (existing) {
      userId = existing.id
    } else {
      // Create new auth user
      const { data: authRes, error: authErr } = await supabase.auth.signUp({
        email: email.trim(),
        password: crypto.randomUUID(),
        options: { data: { full_name: name.trim() } },
      })
      if (authErr) {
        setMsg('Error: ' + authErr.message)
        setMsgType('error')
        setLoading(false)
        return
      }
      userId = authRes.user?.id ?? null
      if (userId) {
        await supabase.from('profiles').update({ full_name: name.trim() }).eq('id', userId)
      }
    }

    if (!userId) {
      setMsg('Failed to create user.')
      setMsgType('error')
      setLoading(false)
      return
    }

    // Add org membership
    const { error: memErr } = await supabase.from('org_memberships').upsert({
      user_id: userId,
      org_id: orgId,
      role,
      is_active: true,
    })

    if (memErr) {
      setMsg('User created but failed to assign org: ' + memErr.message)
      setMsgType('error')
    } else {
      // Send password reset email so user can set their own password
      if (!existing) {
        await supabase.auth.resetPasswordForEmail(email.trim(), {
          redirectTo: `${window.location.origin}/auth/callback?next=/reset-password`,
        })
      }
      const orgName = orgs.find(o => o.id === orgId)?.name
      setMsg(`${existing ? 'Added' : 'Created'} ${email.trim()} as ${role.replace('_', ' ')} in ${orgName}${!existing ? ' — invite email sent' : ''}`)
      setMsgType('success')
      setName('')
      setEmail('')
    }

    setLoading(false)
    onDone()
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-xl border p-5 mb-6">
      <h2 className="text-sm font-semibold text-brand-dark mb-3">Add User</h2>
      <div className="flex flex-wrap items-end gap-3">
        <div>
          <label className="block text-xs font-medium mb-1">Name</label>
          <input value={name} onChange={e => setName(e.target.value)} placeholder="Full name"
            className="px-3 py-2 border rounded-lg text-sm focus:border-brand-purple outline-none w-40" />
        </div>
        <div>
          <label className="block text-xs font-medium mb-1">Email</label>
          <input type="email" value={email} onChange={e => setEmail(e.target.value)} required placeholder="user@example.com"
            className="px-3 py-2 border rounded-lg text-sm focus:border-brand-purple outline-none w-52" />
        </div>
        <div>
          <label className="block text-xs font-medium mb-1">Organization</label>
          <select value={orgId} onChange={e => setOrgId(e.target.value)} required
            className="px-3 py-2 border rounded-lg text-sm focus:border-brand-purple outline-none w-44">
            <option value="">Select org...</option>
            {orgs.map(o => <option key={o.id} value={o.id}>{o.name}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-xs font-medium mb-1">Role</label>
          <select value={role} onChange={e => setRole(e.target.value as UserRole)}
            className="px-3 py-2 border rounded-lg text-sm focus:border-brand-purple outline-none w-36">
            {ROLES.map(r => <option key={r.value} value={r.value}>{r.label}</option>)}
          </select>
        </div>
        <button type="submit" disabled={loading}
          className="px-5 py-2 rounded-lg bg-brand-purple text-white text-sm font-medium hover:bg-brand-purple-light disabled:opacity-50">
          {loading ? 'Creating...' : 'Add User'}
        </button>
      </div>
      {msg && <p className={`text-xs mt-2 ${msgType === 'error' ? 'text-red-600' : 'text-green-600'}`}>{msg}</p>}
    </form>
  )
}
