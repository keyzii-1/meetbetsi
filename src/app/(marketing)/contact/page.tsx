import type { Metadata } from 'next'
import AnimateOnScroll from '@/components/ui/AnimateOnScroll'
import ContactForm from '@/components/ui/ContactForm'
import Button from '@/components/ui/Button'

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Get in touch with Meet Betsi. Whether you\'re a caregiver, a parent, or someone who believes in better care — we\'re here to talk.',
}

export default function ContactPage() {
  return (
    <>
      <section className="bg-brand-purple-bg py-16 text-center">
        <div className="mx-auto max-w-[1200px] px-5">
          <h1 className="text-4xl md:text-5xl font-bold mb-3">Let&apos;s Connect.</h1>
          <p className="text-lg text-brand-gray max-w-xl mx-auto">Whether you&apos;re a caregiver, a parent, or someone who believes in better care — we&apos;re here to talk.</p>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-2xl px-5">
          <AnimateOnScroll className="mb-10">
            <p className="text-lg text-brand-gray">
              Have questions about Meet Betsi? Curious about our launch? Want to share your own story or explore how we can support your community? We&apos;d love to hear from you.
            </p>
          </AnimateOnScroll>

          <AnimateOnScroll>
            <ContactForm />
          </AnimateOnScroll>

          <AnimateOnScroll className="text-center mt-16 pt-12 border-t border-brand-purple-muted">
            <p className="text-brand-gray mb-4">Prefer to talk live?</p>
            <Button href="https://call.keyzii.com/meetbetsi" variant="outline" external>Call Now</Button>
          </AnimateOnScroll>
        </div>
      </section>
    </>
  )
}
