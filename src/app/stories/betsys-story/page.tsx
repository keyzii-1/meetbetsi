import type { Metadata } from 'next'
import Button from '@/components/ui/Button'
import Link from 'next/link'

export const metadata: Metadata = {
  title: "Betsy's Story",
  description: "Meet Betsy — the little girl whose need for specialized care inspired her family to build a better way to train caregivers.",
}

export default function BetsysStoryPage() {
  return (
    <>
      <section className="bg-brand-purple-bg py-16 text-center">
        <div className="mx-auto max-w-[1200px] px-5">
          <p className="mb-4"><Link href="/stories/" className="text-brand-purple hover:text-brand-purple-light">&larr; Back to Stories</Link></p>
          <h1 className="text-4xl md:text-5xl font-bold mb-3">Betsy&apos;s Story 💜</h1>
          <p className="text-lg text-brand-gray max-w-2xl mx-auto">The story that started it all. Meet Betsy — the little girl who inspired a movement.</p>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-3xl px-5">
          <div className="relative w-full rounded-xl overflow-hidden shadow-xl mb-12" style={{ paddingBottom: '56.25%' }}>
            <iframe
              src="https://www.youtube-nocookie.com/embed/S0fjls8OHeU?rel=0"
              title="Betsy's Story — Meet Betsi"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              loading="lazy"
              className="absolute inset-0 w-full h-full border-0"
            />
          </div>

          <div className="prose prose-lg max-w-none text-brand-gray space-y-6">
            <p>Betsy needed special care from the very beginning. Her parents — like so many families — did everything they could to ensure she was safe, comfortable, and cared for in the way she needed.</p>
            <p>They carefully selected caregivers. They wrote detailed instructions. They checked in constantly. But no matter how much they prepared, every new caregiver made the same mistakes.</p>
            <p>Not because they didn&apos;t care. But because they didn&apos;t know what they were missing.</p>
            <p>Betsy&apos;s care is nuanced. Small, preventable mistakes — missing a subtle sign, or mishandling a routine task — can lead to serious consequences. Hospital visits. ICU stays. Moments that could have been avoided with the right training.</p>
            <p>So her parents built the solution. Not only for Betsy — but for every family like theirs.</p>
            <p>That&apos;s how <strong>Meet Betsi</strong> was born. A platform where families create personalized training videos, reviewed by doctors, so every caregiver knows exactly how to care for their loved one.</p>
          </div>

          <div className="text-center mt-12">
            <Button href="/contact/">Share Your Story</Button>
          </div>
        </div>
      </section>
    </>
  )
}
