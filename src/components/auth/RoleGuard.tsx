'use client'

import { useAuth } from '@/hooks/use-auth'
import type { UserRole } from '@/types/auth'

const ROLE_HIERARCHY: UserRole[] = ['super_admin', 'org_admin', 'manager', 'caregiver', 'family_member']

interface RoleGuardProps {
  requiredRole: UserRole
  children: React.ReactNode
  fallback?: React.ReactNode
}

export default function RoleGuard({ requiredRole, children, fallback }: RoleGuardProps) {
  const { role } = useAuth()
  const requiredLevel = ROLE_HIERARCHY.indexOf(requiredRole)
  const userLevel = role ? ROLE_HIERARCHY.indexOf(role) : -1

  if (userLevel === -1 || userLevel > requiredLevel) {
    return <>{fallback ?? (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold text-brand-dark mb-2">Access Denied</h2>
        <p className="text-brand-gray">You don&apos;t have permission to view this page.</p>
      </div>
    )}</>
  }

  return <>{children}</>
}
