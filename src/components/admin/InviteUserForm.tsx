'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase-client'
import type { UserRole } from '@/types/auth'

interface Props {
  orgId: string
  onDone: () => void
}

export default function InviteUserForm({ orgId, onDone }: Props) {
  const [email, setEmail] = useState('')
  const [role, setRole] = useState<UserRole>('caregiver')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email.trim()) return
    setLoading(true)
    setMessage('')

    const supabase = createClient()

    // Check if user already exists in profiles
    const { data: existing } = await supabase.from('profiles').select('id').eq('email', email.trim()).single()

    if (existing) {
      // User exists — add membership
      await supabase.from('org_memberships').upsert({
        user_id: existing.id, org_id: orgId, role, is_active: true,
      })
      setMessage('User added to organization.')
    } else {
      setMessage('User not found. They need to sign up first, then you can add them.')
    }

    setLoading(false)
    setEmail('')
    onDone()
  }

  return (
    <form onSubmit={handleSubmit} className="flex items-end gap-3">
      <div className="flex-1">
        <label className="block text-xs font-medium mb-1">Email</label>
        <input type="email" value={email} onChange={e => setEmail(e.target.value)} required placeholder="user@example.com"
          className="w-full px-3 py-2 border rounded-lg text-sm focus:border-brand-purple outline-none" />
      </div>
      <div>
        <label className="block text-xs font-medium mb-1">Role</label>
        <select value={role} onChange={e => setRole(e.target.value as UserRole)}
          className="px-3 py-2 border rounded-lg text-sm focus:border-brand-purple outline-none">
          <option value="org_admin">Org Admin</option>
          <option value="manager">Manager</option>
          <option value="caregiver">Caregiver</option>
          <option value="family_member">Family Member</option>
        </select>
      </div>
      <button type="submit" disabled={loading}
        className="px-4 py-2 rounded-lg bg-brand-purple text-white text-sm font-medium hover:bg-brand-purple-light disabled:opacity-50">
        {loading ? 'Adding...' : 'Add User'}
      </button>
      {message && <span className="text-xs text-green-600">{message}</span>}
    </form>
  )
}
