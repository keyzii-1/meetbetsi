'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { createClient } from '@/lib/supabase-client'

export default function ResetPasswordPage() {
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [ready, setReady] = useState(false)
  const [checking, setChecking] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const supabase = createClient()

    // Try all possible flows Supabase might use:

    // 1. PKCE flow: ?code= in query string
    const url = new URL(window.location.href)
    const code = url.searchParams.get('code')

    if (code) {
      supabase.auth.exchangeCodeForSession(code).then(({ error: err }) => {
        if (err) {
          setError('Invalid or expired reset link. Please request a new one.')
        } else {
          setReady(true)
        }
        setChecking(false)
      })
      return
    }

    // 2. Implicit flow: #access_token= in hash
    const hash = window.location.hash
    if (hash && hash.includes('access_token')) {
      // Supabase client auto-detects hash fragments
      // Just wait for the auth state to update
    }

    // 3. Listen for auth events (handles hash fragments)
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event) => {
      if (event === 'PASSWORD_RECOVERY' || event === 'SIGNED_IN') {
        setReady(true)
        setChecking(false)
      }
    })

    // 4. Fallback: check if already have a session (e.g. came from callback route)
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (user) {
        setReady(true)
        setChecking(false)
      } else {
        // Give hash detection a moment, then give up
        setTimeout(() => {
          setChecking(current => {
            if (current) {
              setError('Invalid or expired reset link. Please request a new one.')
              return false
            }
            return current
          })
        }, 3000)
      }
    })

    return () => subscription.unsubscribe()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (password.length < 8) {
      setError('Password must be at least 8 characters.')
      return
    }
    if (password !== confirm) {
      setError('Passwords do not match.')
      return
    }

    setLoading(true)
    const supabase = createClient()
    const { error: updateError } = await supabase.auth.updateUser({ password })

    if (updateError) {
      setError(updateError.message)
      setLoading(false)
      return
    }

    router.push('/admin/')
  }

  return (
    <section className="min-h-screen flex items-center justify-center py-20">
      <div className="flex flex-col items-center max-w-sm px-5">
        <Image src="/images/logo-icon.png" alt="Meet Betsi" width={64} height={64} className="mb-6" />
        <h1 className="text-2xl font-bold mb-1">Set Your Password</h1>
        <p className="text-brand-gray text-sm mb-8">Choose a secure password for your account.</p>

        {checking ? (
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-2 border-brand-purple border-t-transparent mx-auto mb-4" />
            <p className="text-sm text-brand-gray">Verifying your reset link...</p>
          </div>
        ) : !ready ? (
          <div className="text-center">
            <p className="text-sm text-red-600 mb-4">{error}</p>
            <a href="/login" className="text-sm text-brand-purple hover:text-brand-purple-light">
              Back to login
            </a>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5 w-full">
            <div>
              <label htmlFor="password" className="block text-sm font-semibold text-brand-dark mb-1">New Password</label>
              <input id="password" type="password" required value={password} onChange={e => setPassword(e.target.value)}
                className="w-full px-4 py-3 border-2 border-brand-purple-muted rounded-lg text-brand-dark focus:border-brand-purple outline-none"
                placeholder="At least 8 characters" />
            </div>
            <div>
              <label htmlFor="confirm" className="block text-sm font-semibold text-brand-dark mb-1">Confirm Password</label>
              <input id="confirm" type="password" required value={confirm} onChange={e => setConfirm(e.target.value)}
                className="w-full px-4 py-3 border-2 border-brand-purple-muted rounded-lg text-brand-dark focus:border-brand-purple outline-none" />
            </div>
            {error && <p className="text-sm text-red-600">{error}</p>}
            <button type="submit" disabled={loading}
              className="w-full rounded-full bg-brand-purple px-6 py-3 font-semibold text-white hover:bg-brand-purple-light transition-colors disabled:opacity-50">
              {loading ? 'Saving...' : 'Set Password'}
            </button>
          </form>
        )}
      </div>
    </section>
  )
}
