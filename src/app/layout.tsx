import type { Metadata } from 'next'
import { Inter, Sora } from 'next/font/google'
import { OrgProvider } from '@/config/org-provider'
import { defaultOrgConfig } from '@/config/orgs/default'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import './globals.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const sora = Sora({ subsets: ['latin'], variable: '--font-sora' })

export const metadata: Metadata = {
  title: {
    default: 'Meet Betsi | Personalized Caregiver Training Platform',
    template: '%s | Meet Betsi',
  },
  description: 'A new way to train caregivers — with love, clarity, and care. Patient-specific training reviewed by doctors, supported by real-time tools.',
  metadataBase: new URL('https://meetbetsi.com'),
  openGraph: {
    siteName: 'Meet Betsi',
    type: 'website',
    locale: 'en_US',
  },
  icons: {
    icon: '/images/logo-icon.png',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${sora.variable} antialiased`}>
      <body className="min-h-screen flex flex-col">
        {/* Phase 1: hardcoded default config. Phase 2: fetched from Supabase on login */}
        <OrgProvider config={defaultOrgConfig}>
          <Header />
          <main className="flex-1 pt-[72px]">
            {children}
          </main>
          <Footer />
        </OrgProvider>
      </body>
    </html>
  )
}
