import Link from 'next/link'
import Image from 'next/image'
import EmailSignup from '@/components/ui/EmailSignup'
import { SOCIAL_LINKS } from '@/config/social'

export default function Footer() {
  return (
    <footer className="bg-brand-dark text-white/75 pt-16 pb-8">
      <div className="mx-auto max-w-[1200px] px-5">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div>
            <Image src="/images/footer-logo.png" alt="Meet Betsi" width={160} height={57} className="h-9 w-auto brightness-[10] mb-4" />
            <p className="text-sm text-white/60 mb-4">Care that feels like home.</p>
            <div className="flex gap-3">
              {SOCIAL_LINKS.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={link.label}
                  className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-brand-purple transition-colors"
                >
                  <svg viewBox="0 0 24 24" className="w-4 h-4 fill-white"><path d={link.svgPath} /></svg>
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-heading font-semibold text-white text-sm mb-4">Quick Links</h4>
            <div className="flex flex-col gap-2">
              <Link href="/stories/" className="text-sm hover:text-white transition-colors">Stories</Link>
              <Link href="/blog/" className="text-sm hover:text-white transition-colors">Blog</Link>
              <Link href="/team/" className="text-sm hover:text-white transition-colors">The Team</Link>
              <Link href="/contact/" className="text-sm hover:text-white transition-colors">Contact</Link>
              <Link href="/privacy/" className="text-sm hover:text-white transition-colors">Privacy Policy</Link>
            </div>
          </div>

          {/* Connect */}
          <div>
            <h4 className="font-heading font-semibold text-white text-sm mb-4">Connect</h4>
            <div className="flex flex-col gap-2">
              <a href="https://call.keyzii.com/meetbetsi" target="_blank" rel="noopener noreferrer" className="text-sm hover:text-white transition-colors">Call Now</a>
              <a href="mailto:hello@meetbetsi.com" className="text-sm hover:text-white transition-colors">hello@meetbetsi.com</a>
            </div>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-heading font-semibold text-white text-sm mb-4">Stay Connected</h4>
            <EmailSignup source="footer" variant="dark" />
          </div>
        </div>

        <div className="border-t border-white/10 pt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
          <p className="text-xs text-white/50">&copy; {new Date().getFullYear()} Meet Betsi. All rights reserved.</p>
          <p className="text-xs text-white/40 max-w-xl leading-relaxed">
            A personalized caregiver training platform that empowers caregivers with patient-specific guidance, ensuring safer, more confident care.
          </p>
        </div>
      </div>
    </footer>
  )
}
