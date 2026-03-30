import Image from 'next/image'
import AnimateOnScroll from '@/components/ui/AnimateOnScroll'
import SectionHeading from '@/components/ui/SectionHeading'

const SOLUTIONS = [
  { emoji: '🎯', title: 'Personalized to your loved one', text: 'Every caregiver is trained specifically for your loved one — not with generic checklists.' },
  { emoji: '🩺', title: 'Reviewed by doctors', text: 'Every training is reviewed by medical professionals to ensure accuracy and safety.' },
  { emoji: '🤝', title: 'Real-time support', text: 'Every moment of care is supported — with tools and real-time help when it matters most.' },
]

export default function SolutionSection() {
  return (
    <section className="py-20 md:py-28">
      <div className="mx-auto max-w-[1200px] px-5">
        <SectionHeading
          title="Care the way families would give it."
          subtitle="Meet Betsi trains caregivers the way families would — personally, thoughtfully, and clearly."
        />

        <AnimateOnScroll className="text-center mb-12">
          <Image src="/images/home/solution.png" alt="" width={200} height={200} className="mx-auto w-36 h-36" aria-hidden="true" />
        </AnimateOnScroll>

        <div className="grid md:grid-cols-3 gap-8">
          {SOLUTIONS.map((sol, i) => (
            <AnimateOnScroll key={i} delay={i * 0.1}>
              <div className="text-center p-8 rounded-2xl bg-white shadow-sm hover:shadow-md hover:-translate-y-1.5 hover:-rotate-[0.5deg] transition-all">
                <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-brand-purple-bg flex items-center justify-center text-3xl" aria-hidden="true">
                  {sol.emoji}
                </div>
                <h4 className="font-heading font-bold text-lg text-brand-dark mb-2">{sol.title}</h4>
                <p className="text-brand-gray">{sol.text}</p>
              </div>
            </AnimateOnScroll>
          ))}
        </div>

        <AnimateOnScroll className="text-center mt-12">
          <p className="text-xl font-heading font-semibold text-brand-purple">
            No guessing. No winging it. Just care done right.
          </p>
        </AnimateOnScroll>
      </div>
    </section>
  )
}
