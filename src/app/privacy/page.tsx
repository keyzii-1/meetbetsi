import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Meet Betsi privacy policy — how we collect, use, and protect your information.',
}

export default function PrivacyPage() {
  return (
    <>
      <section className="bg-brand-purple-bg py-16 text-center">
        <div className="mx-auto max-w-[1200px] px-5">
          <h1 className="text-4xl md:text-5xl font-bold mb-3">Privacy Policy</h1>
          <p className="text-lg text-brand-gray">Last updated: March 2026</p>
        </div>
      </section>

      {/* TODO: Replace with attorney-reviewed privacy policy */}
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-3xl px-5 space-y-8 text-brand-gray">
          <div>
            <h2 className="text-2xl font-bold text-brand-dark mb-3">Introduction</h2>
            <p>Meet Betsi (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;) is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website meetbetsi.com.</p>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-brand-dark mb-3">Information We Collect</h2>
            <p className="mb-2"><strong>Information you provide:</strong> When you sign up for our waitlist, contact us, or submit a form, we may collect your name, email address, and any message content you provide.</p>
            <p><strong>Automatically collected information:</strong> We do not currently use analytics or tracking cookies on this website.</p>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-brand-dark mb-3">How We Use Your Information</h2>
            <ul className="list-disc pl-6 space-y-1">
              <li>Respond to your inquiries and contact requests</li>
              <li>Send you updates about Meet Betsi (if you&apos;ve opted in)</li>
              <li>Improve our website and services</li>
            </ul>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-brand-dark mb-3">Data Sharing</h2>
            <p>We do not sell, trade, or otherwise transfer your personal information to third parties.</p>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-brand-dark mb-3">Data Security</h2>
            <p>We implement reasonable security measures to protect your personal information. However, no method of transmission over the Internet is 100% secure.</p>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-brand-dark mb-3">Your Rights</h2>
            <p>You may request access to, correction of, or deletion of your personal information at any time by contacting us at <a href="mailto:hello@meetbetsi.com" className="text-brand-purple hover:text-brand-purple-light">hello@meetbetsi.com</a>.</p>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-brand-dark mb-3">Contact Us</h2>
            <p>If you have questions about this Privacy Policy, please contact us at <a href="mailto:hello@meetbetsi.com" className="text-brand-purple hover:text-brand-purple-light">hello@meetbetsi.com</a>.</p>
          </div>
        </div>
      </section>
    </>
  )
}
