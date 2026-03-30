import Image from 'next/image'
import AnimateOnScroll from '@/components/ui/AnimateOnScroll'
import SectionHeading from '@/components/ui/SectionHeading'

const GAP_CARDS = [
  { emoji: '😰', text: 'Small mistakes can have life-threatening consequences.', color: 'border-t-red-400' },
  { emoji: '😓', text: "Caregivers burn out when they don't feel prepared.", color: 'border-t-orange-400' },
  { emoji: '💔', text: "Patients suffer when care isn't tailored to them.", color: 'border-t-brand-purple-muted' },
  { emoji: '😞', text: "Families feel helpless when they can't trust the training.", color: 'border-t-brand-purple' },
]

export default function CaregiverGap() {
  return (
    <section className="relative py-20 md:py-28 bg-brand-purple-bg overflow-hidden">
      <div className="mx-auto max-w-[1200px] px-5">
        <AnimateOnScroll className="text-center mb-4">
          <Image src="/images/home/caregiver-gap.png" alt="" width={120} height={120} className="mx-auto mb-4 w-28 h-28" aria-hidden="true" />
        </AnimateOnScroll>

        <SectionHeading
          title="Caregivers want to do a good job."
          subtitle="But most training is too basic, too general, or doesn't prepare them for real-world care — especially for individuals with unique needs."
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {GAP_CARDS.map((card, i) => (
            <AnimateOnScroll key={i} delay={i * 0.1}>
              <div className={`bg-white rounded-xl p-7 text-center border-t-3 ${card.color} shadow-sm hover:shadow-md transition-shadow`}>
                <span className="text-4xl block mb-3" aria-hidden="true">{card.emoji}</span>
                <p className="text-brand-dark font-medium">{card.text}</p>
              </div>
            </AnimateOnScroll>
          ))}
        </div>

        <AnimateOnScroll className="text-center mt-12">
          <p className="text-xl md:text-2xl font-heading font-bold text-brand-dark">
            This isn&apos;t okay. And it&apos;s preventable.
          </p>
        </AnimateOnScroll>
      </div>
    </section>
  )
}
