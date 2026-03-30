'use client'

import { FeatureGate } from '@/components/feature-gate'
import { FEATURE_KEYS } from '@/config/features'

export default function MessagesPage() {
  return (
    <div>
      <h1 className="text-2xl font-heading font-bold text-brand-dark mb-1">Messages</h1>
      <p className="text-brand-gray text-sm mb-8">Communicate with your care team</p>

      <div className="grid gap-5 lg:grid-cols-3">
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
            <div className="p-3 border-b border-gray-100">
              <input placeholder="Search conversations..."
                className="w-full px-3 py-2 text-sm rounded-lg bg-gray-50 outline-none focus:bg-white focus:ring-1 focus:ring-brand-purple" />
            </div>
            <FeatureGate feature={FEATURE_KEYS.DIRECT_MESSAGES}>
              <div className="divide-y divide-gray-50">
                {['Sarah Martinez', 'James Thompson', 'Care Coordinator'].map(name => (
                  <div key={name} className="flex items-center gap-3 p-3 hover:bg-gray-50 cursor-pointer">
                    <div className="w-8 h-8 rounded-full bg-brand-purple-bg flex items-center justify-center text-xs font-medium text-brand-purple">
                      {name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-brand-dark truncate">{name}</p>
                      <p className="text-xs text-brand-gray truncate">Last message preview...</p>
                    </div>
                  </div>
                ))}
              </div>
            </FeatureGate>
            <FeatureGate feature={FEATURE_KEYS.GROUP_CHANNELS}>
              <div className="border-t border-gray-100 p-3">
                <p className="text-xs font-medium text-brand-gray uppercase tracking-wider mb-2">Channels</p>
                {['#general', '#shift-updates', '#training'].map(ch => (
                  <div key={ch} className="px-2 py-1.5 text-sm text-brand-gray hover:text-brand-dark cursor-pointer">
                    {ch}
                  </div>
                ))}
              </div>
            </FeatureGate>
          </div>
        </div>

        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl border border-gray-100 p-12 text-center min-h-[400px] flex items-center justify-center">
            <div>
              <p className="text-brand-gray text-sm">Select a conversation to start messaging</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
