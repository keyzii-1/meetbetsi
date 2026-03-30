import AnimateOnScroll from '@/components/ui/AnimateOnScroll'
import EmailSignup from '@/components/ui/EmailSignup'

export default function CTASection() {
  return (
    <section className="relative py-20 md:py-28 bg-gradient-to-br from-brand-purple via-brand-purple-light to-brand-purple-muted text-white overflow-hidden">
      {/* Decorative orbs */}
      <div className="absolute -top-[200px] -right-[200px] w-[600px] h-[600px] rounded-full bg-radial-[at_center] from-white/8 to-transparent" aria-hidden="true" />
      <div className="absolute -bottom-[150px] -left-[100px] w-[400px] h-[400px] rounded-full bg-radial-[at_center] from-white/5 to-transparent" aria-hidden="true" />

      <div className="relative z-10 mx-auto max-w-[1200px] px-5 text-center">
        <AnimateOnScroll>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">Join Our Mission</h2>
        </AnimateOnScroll>
        <AnimateOnScroll delay={0.1}>
          <p className="text-lg text-white/90 mb-10">A community transforming caregiver training.</p>
        </AnimateOnScroll>
        <AnimateOnScroll delay={0.2} className="max-w-md mx-auto">
          <EmailSignup source="homepage-cta" variant="dark" />
        </AnimateOnScroll>
        <AnimateOnScroll delay={0.3}>
          <p className="text-sm text-white/60 mt-4">We respect your privacy.</p>
        </AnimateOnScroll>
      </div>
    </section>
  )
}
