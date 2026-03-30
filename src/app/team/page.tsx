import type { Metadata } from 'next'
import AnimateOnScroll from '@/components/ui/AnimateOnScroll'
import TeamCard from '@/components/cards/TeamCard'
import EmailSignup from '@/components/ui/EmailSignup'
import { TEAM_MEMBERS } from '@/lib/constants'

export const metadata: Metadata = {
  title: 'The Team',
  description: 'Meet the people behind Meet Betsi — healthcare professionals, technologists, and caregivers building the future of caregiver training.',
}

export default function TeamPage() {
  return (
    <>
      <section className="bg-brand-purple-bg py-16 text-center">
        <div className="mx-auto max-w-[1200px] px-5">
          <h1 className="text-4xl md:text-5xl font-bold mb-3">Meet the Team</h1>
          <p className="text-lg text-brand-gray max-w-xl mx-auto">The people behind the mission to transform caregiver training.</p>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-[1200px] px-5">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {TEAM_MEMBERS.map((member, i) => (
              <AnimateOnScroll key={member.name} delay={(i % 4) * 0.1}>
                <TeamCard {...member} />
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </section>

      <section className="relative py-20 bg-gradient-to-br from-brand-purple via-brand-purple-light to-brand-purple-muted text-white text-center">
        <div className="mx-auto max-w-[1200px] px-5">
          <h2 className="text-3xl font-bold text-white mb-2">Join Our Mission</h2>
          <p className="text-white/90 mb-8">A community transforming caregiver training.</p>
          <div className="max-w-md mx-auto">
            <EmailSignup source="team-page" variant="dark" />
          </div>
        </div>
      </section>
    </>
  )
}
