{/* TODO: Replace with attorney-reviewed privacy policy */}

const SECTIONS = [
  { title: 'Introduction', content: 'Meet Betsi ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website meetbetsi.com.' },
  { title: 'Information We Collect', content: null },
  { title: 'How We Use Your Information', content: null },
  { title: 'Data Sharing', content: 'We do not sell, trade, or otherwise transfer your personal information to third parties.' },
  { title: 'Data Security', content: 'We implement reasonable security measures to protect your personal information. However, no method of transmission over the Internet is 100% secure.' },
  { title: 'Your Rights', content: null },
  { title: 'Contact Us', content: null },
]

export default function PrivacyContent() {
  return (
    <div className="mx-auto max-w-3xl px-5 space-y-8 text-brand-gray">
      <div>
        <h2 className="text-2xl font-bold text-brand-dark mb-3">Introduction</h2>
        <p>{SECTIONS[0].content}</p>
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
        <p>{SECTIONS[3].content}</p>
      </div>
      <div>
        <h2 className="text-2xl font-bold text-brand-dark mb-3">Data Security</h2>
        <p>{SECTIONS[4].content}</p>
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
  )
}
