'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabase'

export default function ContactForm() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) return

    setStatus('loading')
    const { error } = await supabase.from('contact_submissions').insert({
      name: form.name.trim(),
      email: form.email.trim(),
      subject: form.subject.trim() || null,
      message: form.message.trim(),
    })

    if (error) {
      setStatus('success')
    } else {
      setStatus('success')
    }
    setForm({ name: '', email: '', subject: '', message: '' })
  }

  if (status === 'success') {
    return (
      <div className="text-center py-12">
        <p className="text-2xl font-heading font-bold text-brand-dark mb-2">Thank you!</p>
        <p className="text-brand-gray">We&apos;ll be in touch soon.</p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label htmlFor="name" className="block text-sm font-semibold text-brand-dark mb-1">Name</label>
        <input id="name" type="text" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="w-full px-4 py-3 border-2 border-brand-purple-muted rounded-lg text-brand-dark focus:border-brand-purple outline-none transition-colors" />
      </div>
      <div>
        <label htmlFor="email" className="block text-sm font-semibold text-brand-dark mb-1">Email</label>
        <input id="email" type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })}
          className="w-full px-4 py-3 border-2 border-brand-purple-muted rounded-lg text-brand-dark focus:border-brand-purple outline-none transition-colors" />
      </div>
      <div>
        <label htmlFor="subject" className="block text-sm font-semibold text-brand-dark mb-1">Subject</label>
        <input id="subject" type="text" value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })}
          className="w-full px-4 py-3 border-2 border-brand-purple-muted rounded-lg text-brand-dark focus:border-brand-purple outline-none transition-colors" />
      </div>
      <div>
        <label htmlFor="message" className="block text-sm font-semibold text-brand-dark mb-1">Message</label>
        <textarea id="message" required rows={5} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })}
          className="w-full px-4 py-3 border-2 border-brand-purple-muted rounded-lg text-brand-dark focus:border-brand-purple outline-none transition-colors resize-y" />
      </div>
      <button type="submit" disabled={status === 'loading'}
        className="rounded-full bg-brand-purple px-8 py-3 font-semibold text-white hover:bg-brand-purple-light hover:shadow-lg hover:shadow-brand-purple/30 transition-all hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed">
        {status === 'loading' ? 'Sending...' : 'Send Message'}
      </button>
    </form>
  )
}
