import type { Metadata } from 'next'
import Button from '@/components/ui/Button'
import Link from 'next/link'

export const metadata: Metadata = {
  title: "Lauren's Story",
  description: "A full-time caregiver to both her nonverbal son and aging father, Lauren opens up about the emotional and physical toll of care.",
}

export default function LaurensStoryPage() {
  return (
    <>
      <section className="bg-brand-purple-bg py-16 text-center">
        <div className="mx-auto max-w-[1200px] px-5">
          <p className="mb-4"><Link href="/stories/" className="text-brand-purple hover:text-brand-purple-light">&larr; Back to Stories</Link></p>
          <h1 className="text-4xl md:text-5xl font-bold mb-3">Lauren&apos;s Story</h1>
          <p className="text-lg text-brand-gray max-w-2xl mx-auto">A full-time caregiver to both her nonverbal son and aging father, Lauren opens up about the emotional and physical toll of care — and the gap that untrained support leaves behind.</p>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-3xl px-5">
          <div className="relative w-full rounded-xl overflow-hidden shadow-xl mb-12" style={{ paddingBottom: '56.25%' }}>
            <iframe
              src="https://www.youtube-nocookie.com/embed/0UeBLj2AGxo?rel=0"
              title="Lauren's Story: Caring for a Nonverbal Teen and Aging Parents Without Support"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              loading="lazy"
              className="absolute inset-0 w-full h-full border-0"
            />
          </div>

          <div className="prose prose-lg max-w-none text-brand-gray space-y-6">
            <p>Lauren is a full-time caregiver — not just to one family member, but to two. Her son is nonverbal and requires constant, specialized attention. Her aging father needs increasing support as his health declines.</p>
            <p>Every day is a balancing act. Lauren manages medications, appointments, therapies, meals, and the countless small moments that make up a life of care. When she&apos;s needed in two places at once, she relies on outside help — but finding caregivers who are truly prepared is a challenge she faces over and over again.</p>
            <p>The emotional toll is real. The physical exhaustion is constant. And the gap that untrained support leaves behind can turn a manageable day into a crisis.</p>
            <p>Lauren&apos;s story speaks to the millions of family caregivers who carry this weight — and why giving every professional caregiver the right training isn&apos;t just helpful. It&apos;s essential.</p>
          </div>

          <div className="text-center mt-12">
            <Button href="/contact/">Share Your Story</Button>
          </div>
        </div>
      </section>
    </>
  )
}
