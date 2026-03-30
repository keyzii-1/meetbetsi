'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase-client'
import { useRouter } from 'next/navigation'

interface OrgFormProps {
  onClose: () => void
}

export default function OrgForm({ onClose }: OrgFormProps) {
  const [name, setName] = useState('')
  const [slug, setSlug] = useState('')
  const [plan, setPlan] = useState('free')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()

  const handleNameChange = (v: string) => {
    setName(v)
    setSlug(v.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, ''))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!name.trim() || !slug.trim()) return
    setLoading(true)
    setError('')

    const supabase = createClient()
    const { error: dbError } = await supabase.from('organizations').insert({ name: name.trim(), slug: slug.trim(), plan })

    if (dbError) {
      setError(dbError.message)
      setLoading(false)
      return
    }

    router.refresh()
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40" onClick={onClose}>
      <div className="bg-white rounded-xl p-6 w-full max-w-md shadow-xl" onClick={e => e.stopPropagation()}>
        <h2 className="text-lg font-heading font-bold mb-4">Create Organization</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Name</label>
            <input value={name} onChange={e => handleNameChange(e.target.value)} required
              className="w-full px-3 py-2 border rounded-lg text-sm focus:border-brand-purple outline-none" placeholder="Sunrise Care" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Slug</label>
            <input value={slug} onChange={e => setSlug(e.target.value)} required
              className="w-full px-3 py-2 border rounded-lg text-sm focus:border-brand-purple outline-none font-mono" placeholder="sunrise-care" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Plan</label>
            <select value={plan} onChange={e => setPlan(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg text-sm focus:border-brand-purple outline-none">
              <option value="free">Free</option>
              <option value="starter">Starter</option>
              <option value="professional">Professional</option>
              <option value="enterprise">Enterprise</option>
            </select>
          </div>
          {error && <p className="text-sm text-red-600">{error}</p>}
          <div className="flex gap-3 pt-2">
            <button type="button" onClick={onClose} className="flex-1 px-4 py-2 rounded-lg border text-sm hover:bg-gray-50">Cancel</button>
            <button type="submit" disabled={loading}
              className="flex-1 px-4 py-2 rounded-lg bg-brand-purple text-white text-sm font-medium hover:bg-brand-purple-light disabled:opacity-50">
              {loading ? 'Creating...' : 'Create'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
