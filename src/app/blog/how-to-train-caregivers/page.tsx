import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import HowToTrainArticle from '@/components/blog/HowToTrainArticle'
import EmailSignup from '@/components/ui/EmailSignup'

export const metadata: Metadata = {
  title: 'How to Train Caregivers',
  description: 'Learn why proper caregiver training matters and how Meet Betsi is changing the game.',
}

export default function HowToTrainCaregiversPage() {
  return (
    <article className="py-16 md:py-24">
      <div className="mx-auto max-w-3xl px-5">
        <p className="mb-6">
          <Link href="/blog/" className="text-brand-purple hover:text-brand-purple-light">&larr; Back to Blog</Link>
        </p>
        <div className="rounded-xl overflow-hidden mb-8">
          <Image src="/images/blog/caregiver-training-hero.png" alt="How to Train Caregivers" width={760} height={400} className="w-full h-auto" />
        </div>
        <h1 className="text-3xl md:text-4xl font-bold mb-2">How to Train Caregivers — And why it matters.</h1>
        <p className="text-sm text-brand-gray mb-10">By Aaron Lyndon &middot; March 12, 2019</p>

        <HowToTrainArticle />

        <div className="mt-16 bg-brand-purple-bg rounded-xl p-8 text-center">
          <h3 className="text-xl font-bold mb-2">Want to know when Meet Betsi launches?</h3>
          <p className="text-brand-gray mb-6">Join our waitlist.</p>
          <div className="max-w-md mx-auto">
            <EmailSignup source="blog-how-to-train" />
          </div>
        </div>
      </div>
    </article>
  )
}
