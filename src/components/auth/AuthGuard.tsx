'use client'

import { useAuth } from '@/hooks/use-auth'

interface AuthGuardProps {
  children: React.ReactNode
}

export default function AuthGuard({ children }: AuthGuardProps) {
  const { loading } = useAuth()

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-8 w-8 border-2 border-brand-purple border-t-transparent" />
      </div>
    )
  }

  // Middleware handles redirect — if we get here, user is authenticated
  return <>{children}</>
}
