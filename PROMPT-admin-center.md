# CLAUDE CODE PROMPT — Meet Betsi Admin Center & Database-Driven Multi-Tenancy

## CONTEXT

The meetbetsi.com marketing site is live on DigitalOcean App Platform (Next.js 16, Tailwind v4, Supabase, TypeScript). We just finished a refactor that added a modular config system with feature keys, OrgConfig interfaces, OrgProvider, and FeatureGate components. Currently the org configs are hardcoded in static TypeScript files (`config/orgs/default.ts`, `config/orgs/meetbetsi.ts`).

**This prompt builds Phase 2**: Move org/feature config into Supabase, add authentication, and build an admin dashboard where a Meet Betsi team member can manage all client organizations, toggle features, manage users, and onboard new customers — all without writing code or deploying.

**Key constraint**: The person onboarding new customers is NOT a developer. They need a clean, simple UI with toggle switches, dropdowns, and forms. The technical developer's job is building new platform features, not customer setup.

---

## WHAT THIS PHASE DELIVERS

1. **Supabase Auth** — email/password login for all users (admins, org admins, caregivers)
2. **Database-driven org configs** — organizations, features, themes, and settings stored in Supabase, not code files
3. **Admin dashboard at `/admin`** — Meet Betsi super-admin UI for managing everything
4. **Role-based access** — super_admin (Meet Betsi team), org_admin (client org managers), member (regular users)
5. **OrgProvider upgrade** — loads config from Supabase at runtime instead of static files
6. **SSR migration** — remove `output: 'export'`, upgrade DO App Platform to support auth/API routes

---

## INFRASTRUCTURE CHANGES

### Remove Static Export

The site currently uses `output: 'export'` for free static hosting. Auth requires server-side rendering. Make these changes:

1. Remove `output: 'export'` from `next.config.ts`
2. Remove `images: { unoptimized: true }` (Next.js image optimization now works)
3. Update DigitalOcean App Platform:
   - Change component type from **Static Site** to **Web Service**
   - Build command stays: `npm run build`
   - Run command: `npm start`
   - This moves from free tier to Starter tier ($5/mo)
4. Split Supabase client:
   - `src/lib/supabase-client.ts` — browser client (used in `'use client'` components)
   - `src/lib/supabase-server.ts` — server client (used in Server Components and API routes, reads cookies for auth)

### New Dependencies

```bash
npm install @supabase/ssr          # Server-side Supabase auth helpers for Next.js
```

---

## SUPABASE SCHEMA

### Tables

Run these in Supabase SQL Editor. This is the complete schema for multi-tenancy.

```sql
-- ============================================
-- ORGANIZATIONS
-- ============================================
CREATE TABLE organizations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,           -- URL-safe identifier (e.g., "sunrise-care")
  domain TEXT UNIQUE,                   -- Custom domain for white-label (e.g., "app.sunrisecare.com")
  logo_url TEXT,
  logo_icon_url TEXT,
  favicon_url TEXT,

  -- Theme
  primary_color TEXT DEFAULT '#6B3FA0',
  secondary_color TEXT DEFAULT '#8B5FC7',
  dark_color TEXT DEFAULT '#1A1A2E',
  font_heading TEXT DEFAULT 'Sora',
  font_body TEXT DEFAULT 'Inter',

  -- Settings
  geofence_radius_meters INT DEFAULT 200,
  check_in_window_minutes INT DEFAULT 15,
  no_show_threshold_minutes INT DEFAULT 30,
  session_timeout_minutes INT DEFAULT 15,
  max_file_upload_mb INT DEFAULT 500,

  -- Billing (future — Stripe integration)
  stripe_customer_id TEXT,
  stripe_subscription_id TEXT,
  plan TEXT DEFAULT 'free',            -- free, starter, professional, enterprise

  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- ============================================
-- ORGANIZATION FEATURES (join table)
-- ============================================
-- Each row = one feature toggle for one org.
-- If a row doesn't exist for a feature, it's OFF.
CREATE TABLE org_features (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  org_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  feature_key TEXT NOT NULL,           -- matches FEATURE_KEYS values
  enabled BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(org_id, feature_key)
);

-- ============================================
-- USER PROFILES (extends Supabase auth.users)
-- ============================================
CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  full_name TEXT,
  avatar_url TEXT,
  phone TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- ============================================
-- ORG MEMBERSHIPS (which users belong to which orgs, with what role)
-- ============================================
CREATE TYPE user_role AS ENUM ('super_admin', 'org_admin', 'manager', 'caregiver', 'family_member');

CREATE TABLE org_memberships (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  org_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  role user_role NOT NULL DEFAULT 'caregiver',
  is_active BOOLEAN DEFAULT true,
  invited_by UUID REFERENCES profiles(id),
  invited_at TIMESTAMPTZ DEFAULT now(),
  accepted_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(user_id, org_id)
);

-- ============================================
-- INDEXES
-- ============================================
CREATE INDEX idx_org_features_org_id ON org_features(org_id);
CREATE INDEX idx_org_memberships_user_id ON org_memberships(user_id);
CREATE INDEX idx_org_memberships_org_id ON org_memberships(org_id);
CREATE INDEX idx_organizations_slug ON organizations(slug);
CREATE INDEX idx_organizations_domain ON organizations(domain);

-- ============================================
-- AUTO-CREATE PROFILE ON SIGNUP
-- ============================================
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO profiles (id, email, full_name)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', '')
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();

-- ============================================
-- AUTO-UPDATE updated_at
-- ============================================
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER organizations_updated_at
  BEFORE UPDATE ON organizations
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER profiles_updated_at
  BEFORE UPDATE ON profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- ============================================
-- ROW LEVEL SECURITY
-- ============================================

-- Organizations: super_admins see all, org members see their own
ALTER TABLE organizations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Super admins see all orgs" ON organizations
  FOR ALL TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM org_memberships
      WHERE user_id = auth.uid() AND role = 'super_admin'
    )
  );

CREATE POLICY "Org members can read their org" ON organizations
  FOR SELECT TO authenticated
  USING (
    id IN (
      SELECT org_id FROM org_memberships
      WHERE user_id = auth.uid() AND is_active = true
    )
  );

-- Org Features: same pattern
ALTER TABLE org_features ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Super admins manage all features" ON org_features
  FOR ALL TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM org_memberships
      WHERE user_id = auth.uid() AND role = 'super_admin'
    )
  );

CREATE POLICY "Org members can read their features" ON org_features
  FOR SELECT TO authenticated
  USING (
    org_id IN (
      SELECT org_id FROM org_memberships
      WHERE user_id = auth.uid() AND is_active = true
    )
  );

-- Profiles: users see their own, super_admins see all
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read own profile" ON profiles
  FOR SELECT TO authenticated
  USING (id = auth.uid());

CREATE POLICY "Users can update own profile" ON profiles
  FOR UPDATE TO authenticated
  USING (id = auth.uid());

CREATE POLICY "Super admins see all profiles" ON profiles
  FOR ALL TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM org_memberships
      WHERE user_id = auth.uid() AND role = 'super_admin'
    )
  );

-- Org Memberships: super_admins manage all, org_admins manage their org, users see their own
ALTER TABLE org_memberships ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Super admins manage all memberships" ON org_memberships
  FOR ALL TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM org_memberships om
      WHERE om.user_id = auth.uid() AND om.role = 'super_admin'
    )
  );

CREATE POLICY "Org admins manage their org memberships" ON org_memberships
  FOR ALL TO authenticated
  USING (
    org_id IN (
      SELECT om.org_id FROM org_memberships om
      WHERE om.user_id = auth.uid() AND om.role IN ('org_admin', 'manager')
    )
  );

CREATE POLICY "Users can read own memberships" ON org_memberships
  FOR SELECT TO authenticated
  USING (user_id = auth.uid());

-- Keep existing public tables accessible
-- subscribers and contact_submissions policies remain unchanged (anon INSERT)
```

### Seed Data — Meet Betsi Internal Org

After creating the schema, seed the first org and the first super_admin user:

```sql
-- Create Meet Betsi internal org
INSERT INTO organizations (id, name, slug, plan)
VALUES ('00000000-0000-0000-0000-000000000001', 'Meet Betsi', 'meetbetsi', 'enterprise');

-- After you sign up the first admin user via the auth UI, get their UUID from auth.users and run:
-- INSERT INTO org_memberships (user_id, org_id, role)
-- VALUES ('<admin-user-uuid>', '00000000-0000-0000-0000-000000000001', 'super_admin');

-- Enable all features for Meet Betsi internal org
-- (Run this after the feature keys are synced — see sync function below)
```

---

## FILE STRUCTURE (new/modified files only)

```
src/
├── app/
│   ├── layout.tsx                    # MODIFIED — add auth session provider
│   ├── login/
│   │   └── page.tsx                  # MODIFIED — real login form (email + password)
│   ├── admin/                        # NEW — entire admin dashboard
│   │   ├── layout.tsx                # Admin layout with sidebar nav, auth guard
│   │   ├── page.tsx                  # Dashboard overview (org count, user count, etc.)
│   │   ├── organizations/
│   │   │   ├── page.tsx              # Org list table (search, filter, create)
│   │   │   └── [id]/
│   │   │       └── page.tsx          # Single org detail — tabs: General, Features, Users, Theme
│   │   ├── users/
│   │   │   ├── page.tsx              # All users across all orgs
│   │   │   └── [id]/
│   │   │       └── page.tsx          # Single user detail — profile, memberships
│   │   └── features/
│   │       └── page.tsx              # Global feature registry view (read-only reference)
│   │
│   └── (marketing)/                  # Route group — existing marketing pages
│       ├── layout.tsx                # Marketing layout (no auth required)
│       ├── page.tsx                  # Homepage (moved from app/page.tsx)
│       ├── stories/...
│       ├── blog/...
│       ├── team/...
│       ├── contact/...
│       └── privacy/...
│
├── components/
│   ├── admin/                        # NEW — admin-specific components
│   │   ├── AdminSidebar.tsx          # Left sidebar nav for admin
│   │   ├── OrgForm.tsx               # Create/edit org form
│   │   ├── OrgTable.tsx              # Sortable org list table
│   │   ├── FeatureToggleGrid.tsx     # Grid of toggle switches for features
│   │   ├── ThemeEditor.tsx           # Color pickers + logo upload
│   │   ├── UserTable.tsx             # User list with role badges
│   │   ├── InviteUserForm.tsx        # Invite user to org (email + role)
│   │   ├── StatsCard.tsx             # Dashboard metric card
│   │   └── OrgTabs.tsx              # Tab navigation for org detail page
│   ├── auth/                         # NEW — auth components
│   │   ├── LoginForm.tsx             # Email/password login form
│   │   ├── AuthGuard.tsx             # Redirects to /login if not authenticated
│   │   └── RoleGuard.tsx             # Shows 403 if user lacks required role
│   └── ...existing components...
│
├── hooks/                            # NEW hooks
│   ├── use-auth.ts                   # Current user + session
│   ├── use-org-config.ts             # Fetch org config from Supabase (replaces static config)
│   ├── use-org-members.ts            # CRUD for org memberships
│   └── ...existing hooks...
│
├── lib/
│   ├── supabase-client.ts            # NEW — browser Supabase client
│   ├── supabase-server.ts            # NEW — server Supabase client (reads cookies)
│   ├── supabase.ts                   # DELETED — replaced by client/server split
│   └── ...existing utils...
│
├── config/
│   ├── org-provider.tsx              # MODIFIED — fetches from Supabase when authenticated
│   ├── orgs/
│   │   └── default.ts               # KEPT — fallback for unauthenticated/marketing pages
│   └── ...existing config...
│
├── middleware.ts                      # NEW — auth middleware (protects /admin routes)
│
└── types/
    ├── auth.ts                       # NEW — User, Session, Role types
    ├── org.ts                        # NEW — Organization, OrgFeature, OrgMembership DB types
    └── ...existing types...
```

---

## ADMIN DASHBOARD PAGES

### Admin Layout (`app/admin/layout.tsx`)

- Left sidebar with nav: Dashboard, Organizations, Users, Features
- Top bar showing current admin's name and a logout button
- Wrapped in `AuthGuard` (redirects to `/login` if not logged in) and `RoleGuard` requiring `super_admin` role
- Responsive: sidebar collapses to hamburger on mobile

### Dashboard (`app/admin/page.tsx`)

Simple overview with `StatsCard` components showing:
- Total organizations (active / inactive)
- Total users across all orgs
- New signups this week (from `subscribers` table)
- New contact submissions this week

### Organizations List (`app/admin/organizations/page.tsx`)

- Table with columns: Name, Slug, Plan, Status (active/inactive), Users, Created
- Search bar that filters by name or slug
- "Create Organization" button → opens `OrgForm` in a modal or new page
- Click a row → navigates to `/admin/organizations/[id]`

### Organization Detail (`app/admin/organizations/[id]/page.tsx`)

Tabbed interface with 4 tabs:

**Tab 1: General**
- Edit org name, slug
- Status toggle (active/inactive)
- Plan dropdown (free, starter, professional, enterprise)
- Delete org (with confirmation)

**Tab 2: Features** (this is the key UI)
- `FeatureToggleGrid` component
- Features grouped by domain (Training, Scheduling, Communications, Documents, AI, White-Label)
- Each feature is a row: feature name + description + toggle switch
- Toggling a switch immediately upserts the `org_features` table
- Visual grouping with section headers matching the `FEATURE_KEYS` domains
- A "Select Plan Preset" dropdown that bulk-toggles features:
  - **Free**: Marketing only
  - **Starter**: Marketing + Training + Documents
  - **Professional**: Everything except White-Label
  - **Enterprise**: Everything
- The presets are convenience shortcuts — individual toggles still override

**Tab 3: Users**
- `UserTable` showing all members of this org
- Columns: Name, Email, Role, Status (active/invited), Joined
- Role dropdown to change a user's role (org_admin, manager, caregiver, family_member)
- "Invite User" button → `InviteUserForm` (enter email + select role → creates auth user + membership)
- Remove user button (with confirmation)

**Tab 4: Theme**
- `ThemeEditor` component
- Color pickers for: primary, secondary, dark
- Font dropdowns for heading and body fonts
- Logo upload (uses Supabase Storage)
- Live preview panel showing how the theme looks

### Users List (`app/admin/users/page.tsx`)

- Cross-org view of all users in the system
- Table: Name, Email, Org(s), Role(s), Last Login, Created
- Search by name or email
- Click row → `/admin/users/[id]`

### User Detail (`app/admin/users/[id]/page.tsx`)

- Profile info (name, email, avatar)
- List of org memberships with role for each
- "Add to Organization" button
- Password reset button (triggers Supabase password reset email)

### Features Reference (`app/admin/features/page.tsx`)

- Read-only reference page listing all features in the `FEATURE_KEYS` registry
- Grouped by domain with descriptions
- Shows how many orgs have each feature enabled
- This is informational — actual toggling happens on the org detail page

---

## AUTH FLOW

### Login Page (`app/login/page.tsx`)

Replace the current "Platform launching soon" placeholder with a real login form:

- Email + password fields
- "Sign In" button → Supabase `signInWithPassword`
- Error handling (wrong password, user not found)
- After successful login:
  - Fetch user's org_memberships
  - If user has `super_admin` role → redirect to `/admin`
  - If user has `org_admin` or lower → redirect to `/dashboard` (future — for now show "Platform coming soon" with their org info)
- "Forgot password" link → Supabase password reset flow
- Keep the "Back to homepage" link

### Middleware (`src/middleware.ts`)

```typescript
// Protect /admin routes — require authentication
// Protect /dashboard routes — require authentication
// Marketing routes (/, /stories, /blog, etc.) — no auth required
```

Use `@supabase/ssr` middleware helper to refresh auth tokens on each request.

### Auth State Management

- `hooks/use-auth.ts` exposes: `user`, `session`, `loading`, `signIn()`, `signOut()`, `isAuthenticated`
- The root layout wraps everything in a `SessionProvider` that makes auth state available
- Marketing pages don't need auth — they use the static `defaultOrgConfig`
- Admin/dashboard pages require auth — they load org config from Supabase

---

## OrgProvider Upgrade

Currently `OrgProvider` wraps the app with a hardcoded `defaultOrgConfig`. Upgrade it:

```typescript
// For unauthenticated users (marketing site):
// → Use defaultOrgConfig from static file (no DB call)

// For authenticated users:
// → Fetch their org's config from Supabase (organizations + org_features tables)
// → Convert DB rows into OrgConfig shape
// → Pass to OrgProvider

// The FeatureGate component and useFeature hook don't change at all —
// they just read from OrgProvider regardless of where the data came from
```

### Config Resolution Logic (in layout or middleware):

1. Check if user is authenticated
2. If NO → use `defaultOrgConfig` (marketing features only)
3. If YES → fetch user's primary org membership → fetch org + features from Supabase → build `OrgConfig` → pass to `OrgProvider`
4. Cache the org config in React context (don't re-fetch on every page navigation)

---

## MARKETING PAGES — Route Group

Move existing marketing pages into a `(marketing)` route group so they share a separate layout from the admin:

```
app/
├── (marketing)/           # No auth required, public pages
│   ├── layout.tsx         # Header + Footer (existing)
│   ├── page.tsx           # Homepage
│   ├── stories/...
│   ├── blog/...
│   ├── team/...
│   ├── contact/...
│   └── privacy/...
├── admin/                 # Auth required, admin layout
│   └── ...
└── login/                 # Auth page
```

The existing `layout.tsx` (with Header/Footer) moves into `(marketing)/layout.tsx`. The root `layout.tsx` becomes minimal — just fonts, OrgProvider, and SessionProvider.

---

## COMPONENT SPECIFICATIONS

### `FeatureToggleGrid.tsx`

This is the most important admin component. It must be dead simple for a non-technical person.

```typescript
interface FeatureToggleGridProps {
  orgId: string
  features: Array<{ feature_key: string; enabled: boolean }>
  onToggle: (featureKey: string, enabled: boolean) => Promise<void>
}
```

- Renders features grouped by domain (Training, Scheduling, etc.)
- Each group has a collapsible header
- Each feature row: icon + name + description + toggle switch
- Toggle is optimistic — UI updates immediately, reverts on error
- Shows a small "saving..." indicator on the toggled row
- Feature descriptions are defined in a `FEATURE_DESCRIPTIONS` map in `config/features.ts`

### `ThemeEditor.tsx`

```typescript
interface ThemeEditorProps {
  orgId: string
  theme: OrgTheme
  onSave: (theme: Partial<OrgTheme>) => Promise<void>
}
```

- Color pickers for primary, secondary, dark colors
- Font selection dropdowns (curated list of Google Fonts)
- Logo upload area (drag & drop → Supabase Storage)
- "Preview" panel that live-renders a mini version of the org's branded UI
- "Save Theme" button (not auto-save — explicit save for theme changes)

### `InviteUserForm.tsx`

- Email input
- Role dropdown (org_admin, manager, caregiver, family_member)
- "Send Invite" button
- Creates the user in Supabase Auth (via `supabase.auth.admin.createUser` or invite link)
- Creates org_membership record
- Shows success/error state

### `AuthGuard.tsx`

```typescript
// Wraps admin pages
// If not authenticated → redirect to /login?redirect=/admin
// If authenticated but loading → show loading spinner
// If authenticated → render children
```

### `RoleGuard.tsx`

```typescript
interface RoleGuardProps {
  requiredRole: 'super_admin' | 'org_admin' | 'manager'
  children: React.ReactNode
  fallback?: React.ReactNode  // Default: "Access denied" message
}
```

---

## FEATURE DESCRIPTIONS

Add descriptions to `config/features.ts` so the admin UI can display helpful text:

```typescript
export const FEATURE_DESCRIPTIONS: Record<FeatureKey, { label: string; description: string; domain: string }> = {
  [FEATURE_KEYS.MARKETING_SITE]: {
    label: 'Marketing Site',
    description: 'Public-facing marketing pages',
    domain: 'Marketing',
  },
  [FEATURE_KEYS.TRAINING_MODULES]: {
    label: 'Training Modules',
    description: 'Create and assign caregiver training with video content',
    domain: 'Training',
  },
  [FEATURE_KEYS.VIDEO_UPLOAD]: {
    label: 'Video Upload',
    description: 'Upload training videos to the platform',
    domain: 'Training',
  },
  // ... all 27 features with labels, descriptions, and domain grouping
}
```

---

## PLAN PRESETS

Define in `config/plan-presets.ts`:

```typescript
export const PLAN_PRESETS: Record<string, FeatureKey[]> = {
  free: [
    FEATURE_KEYS.MARKETING_SITE,
    FEATURE_KEYS.BLOG,
    FEATURE_KEYS.STORIES,
  ],
  starter: [
    ...free features,
    FEATURE_KEYS.TRAINING_MODULES,
    FEATURE_KEYS.VIDEO_UPLOAD,
    FEATURE_KEYS.DOCUMENT_STORAGE,
    FEATURE_KEYS.DIRECT_MESSAGES,
  ],
  professional: [
    ...starter features,
    FEATURE_KEYS.MEDICAL_REVIEW_WORKFLOW,
    FEATURE_KEYS.CAREGIVER_ASSESSMENTS,
    FEATURE_KEYS.SHIFT_MANAGEMENT,
    FEATURE_KEYS.CHECK_IN_OUT,
    FEATURE_KEYS.GEOFENCING,
    FEATURE_KEYS.TIMESHEET_EXPORT,
    FEATURE_KEYS.GROUP_CHANNELS,
    FEATURE_KEYS.THREADED_REPLIES,
    FEATURE_KEYS.DOCUMENT_VERSIONING,
    FEATURE_KEYS.DOCUMENT_EXPIRATION_ALERTS,
    FEATURE_KEYS.AI_CARE_ASSISTANT,
    FEATURE_KEYS.ACTION_LOGGING,
    FEATURE_KEYS.ESCALATION_DETECTION,
  ],
  enterprise: Object.values(FEATURE_KEYS), // Everything
}
```

---

## CODE ORGANIZATION RULES

Same rules as the refactor prompt — they still apply:

- No file over 150 lines. Pages under 50 lines.
- One file = one concern. No junk drawers.
- Data in config/, logic in hooks/, UI in components/.
- `@/*` imports only (no `../../`).
- Import order: React/Next → external → `@/` → relative.

---

## BUILD ORDER

1. **Supabase schema** — Run the SQL. Seed Meet Betsi org. Create first super_admin user manually.
2. **SSR migration** — Remove static export, split Supabase client, add middleware, update DO App Platform config.
3. **Auth** — Login page, SessionProvider, AuthGuard, RoleGuard, use-auth hook.
4. **Route reorganization** — Move marketing pages into `(marketing)` route group. Verify nothing breaks.
5. **OrgProvider upgrade** — Fetch org config from Supabase for authenticated users, fallback to static for marketing.
6. **Admin layout + dashboard** — Sidebar, stats cards, basic structure.
7. **Organizations CRUD** — List, create, edit, delete orgs.
8. **Feature toggle grid** — The core admin UI for per-org feature management.
9. **User management** — User list, invite, role changes, remove.
10. **Theme editor** — Color pickers, font selection, logo upload, preview.
11. **Polish + test** — Verify all admin flows, test role permissions, test marketing site still works unauthenticated.

After each step, `npm run build` and verify. Push to GitHub for auto-deploy.

---

## FUTURE-PROOFING

- **Billing integration**: The `organizations` table already has `stripe_customer_id` and `plan` fields. When Stripe launches, plan changes auto-update feature toggles via the presets.
- **Custom domains**: The `domain` field on organizations + Next.js middleware can resolve org config from the request hostname. White-label ready.
- **Org-scoped data**: Every future table (training_modules, shifts, messages, documents) gets an `org_id` column with RLS policies that scope data to the user's org. The pattern established here (org_memberships → RLS) scales to every feature.
- **Audit log**: Add an `admin_audit_log` table later that records every admin action (who toggled what feature, who invited whom, etc.).

---

## DO NOT

- Do not break the marketing site. It must continue to work without authentication.
- Do not hardcode any org-specific logic. Everything flows through the config system.
- Do not create API routes for simple CRUD — use Supabase client directly with RLS.
- Do not build Stripe integration yet — just the plan field and presets.
- Do not build the user-facing dashboard yet — just admin. User dashboard comes in Phase 3.
- Do not exceed file line limits. Split aggressively.
- Do not skip RLS policies. Every table needs them.
- Do not use Supabase service role key in client code. Only anon key on the client. Service role only in server-side code if absolutely needed.
