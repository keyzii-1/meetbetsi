export type UserRole = 'super_admin' | 'org_admin' | 'manager' | 'caregiver' | 'family_member'

export interface Profile {
  id: string
  email: string
  full_name: string | null
  avatar_url: string | null
  phone: string | null
}

export interface OrgMembership {
  id: string
  user_id: string
  org_id: string
  role: UserRole
  is_active: boolean
  invited_at: string
  accepted_at: string | null
}
