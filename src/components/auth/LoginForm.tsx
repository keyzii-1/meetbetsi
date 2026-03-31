'use client'

import { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { createClient } from '@/lib/supabase-client'

export default function LoginForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [loading, setLoading] = useState(false)
  const [mode, setMode] = useState<'login' | 'forgot'>('login')
  const router = useRouter()
  const searchParams = useSearchParams()

  const handleLogin = async (e: React.FormEvent) => {
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

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setSuccess('')
    setLoading(true)

    const supabase = createClient()
    const { error: resetError } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: 'https://meetbetsi.com/reset-password',
    })

    if (resetError) {
      setError(resetError.message)
    } else {
      setSuccess('Check your email for a password reset link.')
    }
    setLoading(false)
  }

  if (mode === 'forgot') {
    return (
      <form onSubmit={handleForgotPassword} className="space-y-5 w-full max-w-sm">
        <p className="text-sm text-brand-gray">Enter your email and we&apos;ll send you a link to reset your password.</p>
        <div>
          <label htmlFor="email" className="block text-sm font-semibold text-brand-dark mb-1">Email</label>
          <input id="email" type="email" required value={email} onChange={e => setEmail(e.target.value)}
            className="w-full px-4 py-3 border-2 border-brand-purple-muted rounded-lg text-brand-dark focus:border-brand-purple outline-none" />
        </div>
        {error && <p className="text-sm text-red-600">{error}</p>}
        {success && <p className="text-sm text-green-600">{success}</p>}
        <button type="submit" disabled={loading}
          className="w-full rounded-full bg-brand-purple px-6 py-3 font-semibold text-white hover:bg-brand-purple-light transition-colors disabled:opacity-50">
          {loading ? 'Sending...' : 'Send Reset Link'}
        </button>
        <button type="button" onClick={() => { setMode('login'); setError(''); setSuccess('') }}
          className="w-full text-sm text-brand-purple hover:text-brand-purple-light">
          Back to sign in
        </button>
      </form>
    )
  }

  return (
    <form onSubmit={handleLogin} className="space-y-5 w-full max-w-sm">
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
      <button type="button" onClick={() => { setMode('forgot'); setError('') }}
        className="w-full text-sm text-brand-purple hover:text-brand-purple-light">
        Forgot your password?
      </button>
    </form>
  )
}
