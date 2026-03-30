'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Menu, X } from 'lucide-react'
import { NAV_LINKS } from '@/config/navigation'

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 bg-white transition-shadow h-[72px] ${
          scrolled ? 'shadow-md' : ''
        }`}
      >
        <div className="mx-auto max-w-[1200px] px-5 h-full flex items-center justify-between">
          <Link href="/" aria-label="Meet Betsi — Home">
            <Image src="/images/logo-full.png" alt="Meet Betsi" width={180} height={64} className="h-10 w-auto" />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8" aria-label="Main navigation">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-[15px] font-medium text-brand-dark hover:text-brand-purple relative after:absolute after:bottom-[-2px] after:left-0 after:h-[2px] after:w-0 after:bg-brand-purple after:transition-all hover:after:w-full"
              >
                {link.label}
              </Link>
            ))}
            {/* TODO: link to /app/login when platform launches */}
            <Link href="/login/" className="rounded-full bg-brand-purple px-5 py-2 text-sm font-semibold text-white hover:bg-brand-purple-light transition-colors">
              Sign In
            </Link>
          </nav>

          {/* Mobile toggle */}
          <button
            className="md:hidden p-1"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </header>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 top-[72px] z-40 bg-black/30" onClick={() => setMobileOpen(false)} />
      )}

      {/* Mobile drawer */}
      <nav
        className={`fixed top-[72px] right-0 z-50 w-[280px] h-[calc(100vh-72px)] bg-white shadow-xl p-8 flex flex-col gap-6 transition-transform md:hidden ${
          mobileOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        aria-label="Mobile navigation"
      >
        {NAV_LINKS.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            onClick={() => setMobileOpen(false)}
            className="text-lg font-medium text-brand-dark border-b border-gray-100 pb-3 hover:text-brand-purple"
          >
            {link.label}
          </Link>
        ))}
        <Link
          href="/login/"
          onClick={() => setMobileOpen(false)}
          className="rounded-full bg-brand-purple px-5 py-3 text-center font-semibold text-white hover:bg-brand-purple-light transition-colors"
        >
          Sign In
        </Link>
      </nav>
    </>
  )
}
