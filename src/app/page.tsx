import type { Metadata } from 'next'
import HeroSection from '@/components/home/HeroSection'
import BetsyStory from '@/components/home/BetsyStory'
import CaregiverGap from '@/components/home/CaregiverGap'
import SolutionSection from '@/components/home/SolutionSection'
import StoriesTeaser from '@/components/home/StoriesTeaser'
import MovementSection from '@/components/home/MovementSection'
import CTASection from '@/components/home/CTASection'

export const metadata: Metadata = {
  title: 'Meet Betsi | Personalized Caregiver Training Platform',
  description: 'A new way to train caregivers — with love, clarity, and care. Patient-specific training reviewed by doctors, supported by real-time tools.',
  openGraph: {
    title: 'Meet Betsi | Care That Feels Like Home',
    description: 'Personalized caregiver training platform — care that feels like home.',
    url: 'https://meetbetsi.com',
  },
}

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'Organization',
          name: 'Meet Betsi',
          url: 'https://meetbetsi.com',
          description: 'Personalized caregiver training platform',
          foundingDate: '2025',
        })}}
      />
      <HeroSection />
      <BetsyStory />
      <CaregiverGap />
      <SolutionSection />
      <StoriesTeaser />
      <MovementSection />
      <CTASection />
    </>
  )
}
