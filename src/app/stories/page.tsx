import type { Metadata } from 'next'
import AnimateOnScroll from '@/components/ui/AnimateOnScroll'
import StoryCard from '@/components/cards/StoryCard'
import Button from '@/components/ui/Button'
import { STORIES } from '@/config/content/stories'

export const metadata: Metadata = {
  title: 'Stories',
  description: 'Real families share their experiences with caregiver training. Hear from parents and caregivers who understand the challenges firsthand.',
}

export default function StoriesPage() {
  return (
    <>
      <section className="bg-brand-purple-bg py-16 text-center">
        <div className="mx-auto max-w-[1200px] px-5">
          <h1 className="text-4xl md:text-5xl font-bold mb-3">Stories</h1>
          <p className="text-lg text-brand-gray max-w-xl mx-auto">Real families share their experiences — and why better caregiver training matters.</p>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-[1200px] px-5">
          <div className="grid md:grid-cols-3 gap-8">
            {STORIES.map((story, i) => (
              <AnimateOnScroll key={story.href} delay={i * 0.1}>
                <StoryCard {...story} />
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </section>

      <section className="relative py-20 bg-gradient-to-br from-brand-purple via-brand-purple-light to-brand-purple-muted text-white text-center">
        <div className="mx-auto max-w-[1200px] px-5">
          <h2 className="text-3xl font-bold text-white mb-2">Have a story to share?</h2>
          <p className="text-white/90 mb-8">We&apos;d love to hear from you. Your experience could help other families.</p>
          <Button href="/contact/" variant="white">Get in Touch</Button>
        </div>
      </section>
    </>
  )
}
