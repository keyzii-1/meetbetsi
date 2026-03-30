import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import EmailSignup from '@/components/ui/EmailSignup'

export const metadata: Metadata = {
  title: 'Sign In',
  description: 'Meet Betsi platform — launching soon.',
}

export default function LoginPage() {
  {/* TODO: Replace with Supabase Auth UI when platform launches */}
  return (
    <section className="min-h-[70vh] flex items-center justify-center py-20">
      <div className="text-center max-w-md px-5">
        <Image src="/images/logo-icon.png" alt="Meet Betsi" width={80} height={80} className="mx-auto mb-8 w-20 h-20" />
        <h1 className="text-3xl font-bold mb-3">Platform launching soon.</h1>
        <p className="text-brand-gray mb-8">We&apos;re building something special. Sign up to be the first to know when we launch.</p>
        <EmailSignup source="login-page" />
        <p className="mt-8">
          <Link href="/" className="text-brand-purple hover:text-brand-purple-light text-sm">&larr; Back to homepage</Link>
        </p>
      </div>
    </section>
  )
}
