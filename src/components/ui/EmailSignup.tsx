'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabase'

interface EmailSignupProps {
  source: string
  variant?: 'default' | 'dark'
}

export default function EmailSignup({ source, variant = 'default' }: EmailSignupProps) {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const trimmed = email.trim()
    if (!trimmed || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
      setStatus('error')
      setMessage('Please enter a valid email address.')
      return
    }

    setStatus('loading')
    const { error } = await supabase.from('subscribers').insert({ email: trimmed, source_page: source })

    if (error) {
      if (error.code === '23505') {
        setStatus('success')
        setMessage("You're already on the list!")
      } else {
        setStatus('success')
        setMessage('Thank you! We\'ll keep you posted.')
      }
    } else {
      setStatus('success')
      setMessage('Thank you! We\'ll keep you posted.')
    }
    setEmail('')
    setTimeout(() => setStatus('idle'), 5000)
  }

  const isDark = variant === 'dark'
  const inputCls = isDark
    ? 'border-white/30 bg-white/15 text-white placeholder:text-white/60 focus:border-white focus:bg-white/20'
    : 'border-brand-purple-muted bg-white text-brand-dark focus:border-brand-purple'

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="flex flex-col sm:flex-row gap-2">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email Address"
          aria-label="Email address"
          required
          className={`flex-1 px-4 py-3 rounded-full border-2 text-sm outline-none transition-colors ${inputCls}`}
        />
        <button
          type="submit"
          disabled={status === 'loading'}
          className={`rounded-full px-6 py-3 text-sm font-semibold transition-all hover:-translate-y-0.5 ${
            isDark
              ? 'bg-white text-brand-purple hover:bg-brand-purple-bg'
              : 'bg-brand-purple text-white hover:bg-brand-purple-light hover:shadow-lg hover:shadow-brand-purple/30'
          } ${status === 'loading' ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          {status === 'loading' ? 'Sending...' : 'Stay Connected'}
        </button>
      </div>
      {status === 'success' && (
        <p className={`mt-2 text-sm ${isDark ? 'text-green-300' : 'text-green-600'}`}>{message}</p>
      )}
      {status === 'error' && (
        <p className={`mt-2 text-sm ${isDark ? 'text-red-300' : 'text-red-600'}`}>{message}</p>
      )}
    </form>
  )
}
