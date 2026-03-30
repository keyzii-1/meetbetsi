'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase-client'
import type { User, Session } from '@supabase/supabase-js'
import type { UserRole } from '@/types/auth'

interface AuthState {
  user: User | null
  session: Session | null
  loading: boolean
  role: UserRole | null
  orgId: string | null
}

export function useAuth() {
  const [state, setState] = useState<AuthState>({
    user: null, session: null, loading: true, role: null, orgId: null,
  })

  useEffect(() => {
    const supabase = createClient()

    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        loadMembership(supabase, session.user.id, session)
      } else {
        setState(s => ({ ...s, loading: false }))
      }
    })

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        if (session?.user) {
          loadMembership(supabase, session.user.id, session)
        } else {
          setState({ user: null, session: null, loading: false, role: null, orgId: null })
        }
      }
    )

    return () => subscription.unsubscribe()
  }, [])

  async function loadMembership(supabase: ReturnType<typeof createClient>, userId: string, session: Session) {
    const { data } = await supabase
      .from('org_memberships')
      .select('role, org_id')
      .eq('user_id', userId)
      .eq('is_active', true)
      .limit(1)
      .single()

    setState({
      user: session.user,
      session,
      loading: false,
      role: (data?.role as UserRole) ?? null,
      orgId: data?.org_id ?? null,
    })
  }

  return state
}
