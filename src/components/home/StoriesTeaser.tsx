import AnimateOnScroll from '@/components/ui/AnimateOnScroll'
import SectionHeading from '@/components/ui/SectionHeading'
import StoryCard from '@/components/cards/StoryCard'
import Button from '@/components/ui/Button'
import { STORIES } from '@/lib/constants'

export default function StoriesTeaser() {
  return (
    <section className="py-20 md:py-28 bg-brand-purple-bg">
      <div className="mx-auto max-w-[1200px] px-5">
        <SectionHeading
          title="Real Families. Real Impact."
          subtitle="Every day, families face challenges because of the lack of structured caregiver training."
        />

        <div className="grid md:grid-cols-3 gap-8">
          {STORIES.map((story, i) => (
            <AnimateOnScroll key={story.href} delay={i * 0.1}>
              <StoryCard {...story} />
            </AnimateOnScroll>
          ))}
        </div>

        <AnimateOnScroll className="text-center mt-12">
          <Button href="/stories/">Listen to more stories</Button>
        </AnimateOnScroll>
      </div>
    </section>
  )
}
