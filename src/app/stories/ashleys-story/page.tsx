import type { Metadata } from 'next'
import Button from '@/components/ui/Button'
import Link from 'next/link'

export const metadata: Metadata = {
  title: "Ashley's Story",
  description: "A mother shares the daily challenges of raising her son with SYNGAP1 and the constant struggle to train new caregivers.",
}

export default function AshleysStoryPage() {
  return (
    <>
      <section className="bg-brand-purple-bg py-16 text-center">
        <div className="mx-auto max-w-[1200px] px-5">
          <p className="mb-4"><Link href="/stories/" className="text-brand-purple hover:text-brand-purple-light">&larr; Back to Stories</Link></p>
          <h1 className="text-4xl md:text-5xl font-bold mb-3">Ashley&apos;s Story</h1>
          <p className="text-lg text-brand-gray max-w-2xl mx-auto">A mother shares the daily challenges of raising her son with SYNGAP1 and the constant struggle to train new caregivers who truly understand his needs.</p>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-3xl px-5">
          <div className="relative w-full rounded-xl overflow-hidden shadow-xl mb-12" style={{ paddingBottom: '56.25%' }}>
            <iframe
              src="https://www.youtube-nocookie.com/embed/dlH7-_sNMkM?rel=0"
              title="Real Life as a Special Needs Parent: Ashley & Nathan's Story"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              loading="lazy"
              className="absolute inset-0 w-full h-full border-0"
            />
          </div>

          <div className="prose prose-lg max-w-none text-brand-gray space-y-6">
            <p>Ashley is a mother navigating the daily complexities of raising her son, who was diagnosed with SYNGAP1 — a rare genetic condition that affects brain development and can cause seizures, intellectual disability, and behavioral challenges.</p>
            <p>Every new caregiver who enters their home faces a steep learning curve. The care her son needs isn&apos;t something that can be learned from a textbook or a generic training video. It requires understanding <em>him</em> — his specific triggers, his routines, the subtle signs that something is wrong before it becomes an emergency.</p>
            <p>Ashley has experienced firsthand what happens when caregivers aren&apos;t properly prepared. The constant worry. The phone calls. The preventable incidents that could have been avoided with the right training.</p>
            <p>Her story is a powerful reminder of why personalized caregiver training isn&apos;t a luxury — it&apos;s a necessity.</p>
          </div>

          <div className="text-center mt-12">
            <Button href="/contact/">Share Your Story</Button>
          </div>
        </div>
      </section>
    </>
  )
}
