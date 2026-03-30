import type { Metadata } from 'next'
import { Suspense } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import LoginForm from '@/components/auth/LoginForm'

export const metadata: Metadata = {
  title: 'Sign In',
  description: 'Sign in to the Meet Betsi platform.',
}

export default function LoginPage() {
  return (
    <section className="min-h-screen flex items-center justify-center py-20">
      <div className="flex flex-col items-center max-w-sm px-5">
        <Image src="/images/logo-icon.png" alt="Meet Betsi" width={64} height={64} className="mb-6" />
        <h1 className="text-2xl font-bold mb-1">Sign in to Meet Betsi</h1>
        <p className="text-brand-gray text-sm mb-8">Admin &amp; platform access</p>
        <Suspense>
          <LoginForm />
        </Suspense>
        <p className="mt-8">
          <Link href="/" className="text-brand-purple hover:text-brand-purple-light text-sm">&larr; Back to homepage</Link>
        </p>
      </div>
    </section>
  )
}
