import type { Metadata } from 'next'
import { Inter, Sora } from 'next/font/google'
import { OrgProvider } from '@/config/org-provider'
import { defaultOrgConfig } from '@/config/orgs/default'
import './globals.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const sora = Sora({ subsets: ['latin'], variable: '--font-sora' })

export const metadata: Metadata = {
  title: {
    default: 'Meet Betsi | Personalized Caregiver Training Platform',
    template: '%s | Meet Betsi',
  },
  description: 'A new way to train caregivers — with love, clarity, and care.',
  metadataBase: new URL('https://meetbetsi.com'),
  openGraph: { siteName: 'Meet Betsi', type: 'website', locale: 'en_US' },
  icons: { icon: '/images/logo-icon.png' },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${sora.variable} antialiased`}>
      <body className="min-h-screen flex flex-col">
        <OrgProvider config={defaultOrgConfig}>
          {children}
        </OrgProvider>
      </body>
    </html>
  )
}
