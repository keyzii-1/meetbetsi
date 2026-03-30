'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase-client'
import type { Organization } from '@/types/org'

interface Props {
  org: Organization
  onUpdate: () => void
}

export default function ThemeEditor({ org, onUpdate }: Props) {
  const [theme, setTheme] = useState({
    primary_color: org.primary_color,
    secondary_color: org.secondary_color,
    dark_color: org.dark_color,
    font_heading: org.font_heading,
    font_body: org.font_body,
  })
  const [saving, setSaving] = useState(false)

  const handleSave = async () => {
    setSaving(true)
    const supabase = createClient()
    await supabase.from('organizations').update(theme).eq('id', org.id)
    setSaving(false)
    onUpdate()
  }

  const ColorField = ({ label, field }: { label: string; field: keyof typeof theme }) => (
    <div>
      <label className="block text-xs font-medium mb-1">{label}</label>
      <div className="flex items-center gap-2">
        <input type="color" value={theme[field]} onChange={e => setTheme({ ...theme, [field]: e.target.value })}
          className="w-10 h-10 rounded border cursor-pointer" />
        <input type="text" value={theme[field]} onChange={e => setTheme({ ...theme, [field]: e.target.value })}
          className="px-3 py-2 border rounded-lg text-sm font-mono w-28 focus:border-brand-purple outline-none" />
      </div>
    </div>
  )

  return (
    <div className="space-y-6">
      <div className="grid sm:grid-cols-3 gap-6">
        <ColorField label="Primary Color" field="primary_color" />
        <ColorField label="Secondary Color" field="secondary_color" />
        <ColorField label="Dark Color" field="dark_color" />
      </div>

      <div className="grid sm:grid-cols-2 gap-6">
        <div>
          <label className="block text-xs font-medium mb-1">Heading Font</label>
          <select value={theme.font_heading} onChange={e => setTheme({ ...theme, font_heading: e.target.value })}
            className="w-full px-3 py-2 border rounded-lg text-sm focus:border-brand-purple outline-none">
            {['Sora', 'Inter', 'Poppins', 'Montserrat', 'Raleway', 'Lato', 'Roboto'].map(f =>
              <option key={f} value={f}>{f}</option>
            )}
          </select>
        </div>
        <div>
          <label className="block text-xs font-medium mb-1">Body Font</label>
          <select value={theme.font_body} onChange={e => setTheme({ ...theme, font_body: e.target.value })}
            className="w-full px-3 py-2 border rounded-lg text-sm focus:border-brand-purple outline-none">
            {['Inter', 'Sora', 'Open Sans', 'Roboto', 'Lato', 'Source Sans 3', 'Nunito'].map(f =>
              <option key={f} value={f}>{f}</option>
            )}
          </select>
        </div>
      </div>

      {/* Live preview */}
      <div className="rounded-xl border p-6" style={{ fontFamily: theme.font_body }}>
        <p className="text-xs text-gray-400 mb-3">Preview</p>
        <div className="rounded-lg p-4" style={{ backgroundColor: theme.primary_color + '15' }}>
          <h3 style={{ color: theme.dark_color, fontFamily: theme.font_heading }} className="text-lg font-bold mb-1">
            Organization Name
          </h3>
          <p style={{ color: theme.dark_color + 'aa' }} className="text-sm mb-3">Care that feels like home.</p>
          <button style={{ backgroundColor: theme.primary_color }} className="px-4 py-2 rounded-full text-white text-sm">
            Get Started
          </button>
        </div>
      </div>

      <button onClick={handleSave} disabled={saving}
        className="px-6 py-2 rounded-lg bg-brand-purple text-white text-sm font-medium hover:bg-brand-purple-light disabled:opacity-50">
        {saving ? 'Saving...' : 'Save Theme'}
      </button>
    </div>
  )
}
