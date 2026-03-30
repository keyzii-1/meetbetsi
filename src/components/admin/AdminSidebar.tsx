'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { LayoutDashboard, Building2, Users, ToggleRight, LogOut } from 'lucide-react'
import { createClient } from '@/lib/supabase-client'
import { useRouter } from 'next/navigation'

const NAV_ITEMS = [
  { label: 'Dashboard', href: '/admin/', icon: LayoutDashboard },
  { label: 'Organizations', href: '/admin/organizations/', icon: Building2 },
  { label: 'Users', href: '/admin/users/', icon: Users },
  { label: 'Features', href: '/admin/features/', icon: ToggleRight },
]

export default function AdminSidebar() {
  const pathname = usePathname()
  const router = useRouter()

  const handleSignOut = async () => {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push('/login/')
  }

  return (
    <aside className="w-64 bg-brand-dark text-white min-h-screen flex flex-col shrink-0">
      <div className="p-6 border-b border-white/10">
        <Link href="/admin/" className="text-lg font-heading font-bold">
          Meet Betsi <span className="text-brand-purple-light text-sm font-normal">Admin</span>
        </Link>
      </div>

      <nav className="flex-1 p-4 space-y-1">
        {NAV_ITEMS.map(item => {
          const active = pathname === item.href || (item.href !== '/admin/' && pathname.startsWith(item.href))
          return (
            <Link key={item.href} href={item.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${
                active ? 'bg-brand-purple text-white' : 'text-white/70 hover:text-white hover:bg-white/5'
              }`}>
              <item.icon size={18} />
              {item.label}
            </Link>
          )
        })}
      </nav>

      <div className="p-4 border-t border-white/10">
        <button onClick={handleSignOut}
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-white/70 hover:text-white hover:bg-white/5 w-full transition-colors">
          <LogOut size={18} />
          Sign Out
        </button>
        <Link href="/" className="block mt-2 px-3 py-2 text-xs text-white/40 hover:text-white/70">
          &larr; Back to site
        </Link>
      </div>
    </aside>
  )
}
