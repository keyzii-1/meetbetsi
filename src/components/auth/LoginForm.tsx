'use client'

import { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { createClient } from '@/lib/supabase-client'

export default function LoginForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const searchParams = useSearchParams()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    const supabase = createClient()
    const { error: authError } = await supabase.auth.signInWithPassword({ email, password })

    if (authError) {
      setError(authError.message)
      setLoading(false)
      return
    }

    const redirect = searchParams.get('redirect') || '/admin/'
    router.push(redirect)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5 w-full max-w-sm">
      <div>
        <label htmlFor="email" className="block text-sm font-semibold text-brand-dark mb-1">Email</label>
        <input id="email" type="email" required value={email} onChange={e => setEmail(e.target.value)}
          className="w-full px-4 py-3 border-2 border-brand-purple-muted rounded-lg text-brand-dark focus:border-brand-purple outline-none" />
      </div>
      <div>
        <label htmlFor="password" className="block text-sm font-semibold text-brand-dark mb-1">Password</label>
        <input id="password" type="password" required value={password} onChange={e => setPassword(e.target.value)}
          className="w-full px-4 py-3 border-2 border-brand-purple-muted rounded-lg text-brand-dark focus:border-brand-purple outline-none" />
      </div>
      {error && <p className="text-sm text-red-600">{error}</p>}
      <button type="submit" disabled={loading}
        className="w-full rounded-full bg-brand-purple px-6 py-3 font-semibold text-white hover:bg-brand-purple-light transition-colors disabled:opacity-50">
        {loading ? 'Signing in...' : 'Sign In'}
      </button>
    </form>
  )
}
