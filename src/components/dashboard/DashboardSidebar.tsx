'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useOrg } from '@/config/org-provider'
import { useDashboardQuery } from '@/components/dashboard/DashboardContext'
import { FEATURE_KEYS } from '@/config/features'

interface NavItem {
  label: string
  href: string
  featureKey?: string
}

const NAV_ITEMS: NavItem[] = [
  { label: 'Home', href: '/dashboard' },
  { label: 'Training', href: '/dashboard/training', featureKey: FEATURE_KEYS.TRAINING_MODULES },
  { label: 'Schedule', href: '/dashboard/schedule', featureKey: FEATURE_KEYS.SHIFT_MANAGEMENT },
  { label: 'Messages', href: '/dashboard/messages', featureKey: FEATURE_KEYS.DIRECT_MESSAGES },
  { label: 'Documents', href: '/dashboard/documents', featureKey: FEATURE_KEYS.DOCUMENT_STORAGE },
  { label: 'AI Assistant', href: '/dashboard/ai', featureKey: FEATURE_KEYS.AI_CARE_ASSISTANT },
]

export default function DashboardSidebar({ previewMode }: { previewMode?: boolean }) {
  const pathname = usePathname()
  const org = useOrg()
  const qs = useDashboardQuery()

  const visibleItems = NAV_ITEMS.filter(item =>
    !item.featureKey || org.features[item.featureKey as keyof typeof org.features]
  )

  return (
    <aside className="w-56 bg-white border-r border-gray-200 flex flex-col min-h-screen">
      <div className="px-4 py-5 border-b border-gray-100">
        <p className="font-heading font-bold text-brand-dark text-sm">{org.orgName}</p>
        {previewMode && (
          <span className="inline-block mt-1 px-2 py-0.5 rounded-full text-[10px] font-medium bg-amber-100 text-amber-700">
            Admin Preview
          </span>
        )}
      </div>

      <nav className="flex-1 py-4">
        {visibleItems.map(item => {
          const isActive = item.href === '/dashboard'
            ? pathname === '/dashboard'
            : pathname.startsWith(item.href)
          return (
            <Link key={item.href} href={`${item.href}${qs}`}
              className={`flex items-center px-4 py-2.5 text-sm transition-colors ${
                isActive
                  ? 'text-brand-purple bg-brand-purple-bg font-medium'
                  : 'text-brand-gray hover:text-brand-dark hover:bg-gray-50'
              }`}>
              {item.label}
            </Link>
          )
        })}
      </nav>

      <div className="border-t border-gray-100 p-4">
        {previewMode ? (
          <Link href="/admin/organizations/"
            className="text-xs text-brand-purple hover:text-brand-purple-light">
            &larr; Back to Admin
          </Link>
        ) : (
          <Link href="/login"
            className="text-xs text-brand-gray hover:text-brand-dark">
            Sign Out
          </Link>
        )}
      </div>
    </aside>
  )
}
