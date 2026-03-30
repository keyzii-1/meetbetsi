'use client'

interface Props {
  active: string
  onChange: (tab: string) => void
}

const TABS = ['General', 'Features', 'Users', 'Theme']

export default function OrgTabs({ active, onChange }: Props) {
  return (
    <div className="flex gap-1 border-b border-gray-200 mb-6">
      {TABS.map(tab => (
        <button key={tab} onClick={() => onChange(tab)}
          className={`px-4 py-2.5 text-sm font-medium transition-colors ${
            active === tab
              ? 'text-brand-purple border-b-2 border-brand-purple'
              : 'text-brand-gray hover:text-brand-dark'
          }`}>
          {tab}
        </button>
      ))}
    </div>
  )
}
