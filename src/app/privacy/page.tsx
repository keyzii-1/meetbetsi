import type { Metadata } from 'next'
import PrivacyContent from '@/components/privacy/PrivacyContent'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Meet Betsi privacy policy — how we collect, use, and protect your information.',
}

export default function PrivacyPage() {
  return (
    <>
      <section className="bg-brand-purple-bg py-16 text-center">
        <div className="mx-auto max-w-[1200px] px-5">
          <h1 className="text-4xl md:text-5xl font-bold mb-3">Privacy Policy</h1>
          <p className="text-lg text-brand-gray">Last updated: March 2026</p>
        </div>
      </section>
      <section className="py-16 md:py-24">
        <PrivacyContent />
      </section>
    </>
  )
}
