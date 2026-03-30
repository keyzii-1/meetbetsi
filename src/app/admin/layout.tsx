import type { Metadata } from 'next'
import AuthGuard from '@/components/auth/AuthGuard'
import AdminSidebar from '@/components/admin/AdminSidebar'

export const metadata: Metadata = {
  title: { default: 'Admin', template: '%s | Admin | Meet Betsi' },
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthGuard>
      <div className="flex min-h-screen">
        <AdminSidebar />
        <div className="flex-1 bg-gray-50 p-8 overflow-auto">
          {children}
        </div>
      </div>
    </AuthGuard>
  )
}
