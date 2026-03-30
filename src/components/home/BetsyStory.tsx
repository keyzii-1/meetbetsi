import Image from 'next/image'
import AnimateOnScroll from '@/components/ui/AnimateOnScroll'

const STORY_LINES = [
  { text: 'And one little girl named Betsy. 👧', type: 'normal' },
  { text: 'Betsy needed special care.', type: 'normal' },
  { text: 'Her parents tried everything — carefully selecting caregivers, giving detailed instructions, and checking in constantly.', type: 'normal' },
  { text: 'But no matter how much they prepared, every new caregiver made the same mistakes.', type: 'normal' },
  { text: "Not because they didn't care. But because they didn't know what they were missing.", type: 'emphasis' },
  { text: "Betsy's care is nuanced. Small, preventable mistakes — missing a subtle sign, or mishandling a routine task — can lead to serious consequences.", type: 'normal' },
  { text: 'Hospital visits. ICU stays. 🏥', type: 'impact' },
  { text: 'Moments that could have been avoided with the right training.', type: 'normal' },
  { text: 'So, her parents built the solution. Not only for Betsy — but for every family like theirs. 💜', type: 'emphasis' },
]

export default function BetsyStory() {
  return (
    <section className="py-20 md:py-28">
      <div className="mx-auto max-w-[1200px] px-5">
        <AnimateOnScroll className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold">It began with one family.</h2>
        </AnimateOnScroll>

        {/* Video */}
        <AnimateOnScroll className="mb-16">
          <div className="relative w-full max-w-4xl mx-auto rounded-xl overflow-hidden shadow-xl" style={{ paddingBottom: '56.25%' }}>
            <iframe
              src="https://www.youtube-nocookie.com/embed/S0fjls8OHeU?rel=0"
              title="Betsy's Story — Meet Betsi"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              loading="lazy"
              className="absolute inset-0 w-full h-full border-0"
            />
          </div>
        </AnimateOnScroll>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            {STORY_LINES.map((line, i) => (
              <AnimateOnScroll key={i} delay={i * 0.05}>
                <p className={
                  line.type === 'emphasis'
                    ? 'text-xl md:text-2xl font-heading font-bold text-brand-purple border-l-3 border-brand-purple-light pl-4'
                    : line.type === 'impact'
                    ? 'text-2xl md:text-3xl font-heading font-bold text-brand-dark text-center py-4'
                    : 'text-lg text-brand-dark leading-relaxed'
                }>
                  {line.text}
                </p>
              </AnimateOnScroll>
            ))}
          </div>
          <AnimateOnScroll animation="slide-right" className="rounded-2xl overflow-hidden shadow-lg shadow-brand-purple/10">
            <Image src="/images/home/betsy-story.png" alt="A family's journey to better caregiver training" width={600} height={400} className="w-full h-auto" />
          </AnimateOnScroll>
        </div>
      </div>
    </section>
  )
}
