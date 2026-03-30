'use client'

import { FeatureGate } from '@/components/feature-gate'
import { FEATURE_KEYS } from '@/config/features'

export default function AIPage() {
  return (
    <div>
      <h1 className="text-2xl font-heading font-bold text-brand-dark mb-1">AI Assistant</h1>
      <p className="text-brand-gray text-sm mb-8">AI-powered tools for better care</p>

      <div className="grid gap-5 lg:grid-cols-2">
        <FeatureGate feature={FEATURE_KEYS.AI_CARE_ASSISTANT}>
          <div className="bg-white rounded-xl border border-gray-100 p-6 lg:col-span-2">
            <h3 className="font-semibold text-brand-dark mb-4">Care Assistant</h3>
            <div className="bg-gray-50 rounded-lg p-4 mb-4 min-h-[200px]">
              <div className="flex gap-3 mb-4">
                <div className="w-7 h-7 rounded-full bg-brand-purple flex items-center justify-center text-xs text-white font-bold">B</div>
                <div className="bg-white rounded-lg px-3 py-2 text-sm text-brand-dark shadow-sm max-w-md">
                  Hi! I&apos;m Betsi, your AI care assistant. I can help with care recommendations, answer questions about protocols, and flag potential concerns. How can I help?
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              <input placeholder="Ask Betsi a question..."
                className="flex-1 px-4 py-2 border rounded-lg text-sm focus:border-brand-purple outline-none" />
              <button className="px-4 py-2 rounded-lg bg-brand-purple text-white text-sm font-medium hover:bg-brand-purple-light transition-colors">
                Send
              </button>
            </div>
          </div>
        </FeatureGate>

        <FeatureGate feature={FEATURE_KEYS.ACTION_LOGGING}>
          <div className="bg-white rounded-xl border border-gray-100 p-6">
            <h3 className="font-semibold text-brand-dark mb-2">Action Log</h3>
            <p className="text-sm text-brand-gray mb-4">Automatically logged care actions.</p>
            <div className="space-y-2">
              {[
                { action: 'Medication administered', time: '2 hours ago' },
                { action: 'Vitals recorded', time: '3 hours ago' },
                { action: 'Meal prepared', time: '5 hours ago' },
              ].map(log => (
                <div key={log.action} className="flex items-center justify-between p-2 rounded bg-gray-50">
                  <span className="text-sm text-brand-dark">{log.action}</span>
                  <span className="text-xs text-brand-gray">{log.time}</span>
                </div>
              ))}
            </div>
          </div>
        </FeatureGate>

        <FeatureGate feature={FEATURE_KEYS.ESCALATION_DETECTION}>
          <div className="bg-white rounded-xl border border-gray-100 p-6">
            <h3 className="font-semibold text-brand-dark mb-2">Escalation Alerts</h3>
            <p className="text-sm text-brand-gray mb-4">AI-detected situations needing attention.</p>
            <div className="bg-green-50 rounded-lg p-4 text-center">
              <p className="text-sm text-green-700 font-medium">All clear</p>
              <p className="text-xs text-green-600 mt-1">No escalations detected</p>
            </div>
          </div>
        </FeatureGate>
      </div>
    </div>
  )
}
