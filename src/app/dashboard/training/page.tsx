'use client'

import { useOrg } from '@/config/org-provider'
import { FeatureGate } from '@/components/feature-gate'
import { FEATURE_KEYS } from '@/config/features'

export default function TrainingPage() {
  const org = useOrg()

  return (
    <div>
      <h1 className="text-2xl font-heading font-bold text-brand-dark mb-1">Training</h1>
      <p className="text-brand-gray text-sm mb-8">Manage and complete training modules</p>

      <div className="grid gap-5 lg:grid-cols-2">
        <FeatureGate feature={FEATURE_KEYS.TRAINING_MODULES}>
          <div className="bg-white rounded-xl border border-gray-100 p-6">
            <h3 className="font-semibold text-brand-dark mb-2">Training Modules</h3>
            <p className="text-sm text-brand-gray mb-4">Video-based training courses for caregivers.</p>
            <div className="space-y-3">
              {['Medication Management', 'Fall Prevention', 'Dementia Care Basics', 'Infection Control'].map(title => (
                <div key={title} className="flex items-center justify-between p-3 rounded-lg bg-gray-50">
                  <span className="text-sm text-brand-dark">{title}</span>
                  <span className="text-xs px-2 py-0.5 rounded-full bg-brand-purple-bg text-brand-purple">Not started</span>
                </div>
              ))}
            </div>
          </div>
        </FeatureGate>

        <FeatureGate feature={FEATURE_KEYS.CAREGIVER_ASSESSMENTS}>
          <div className="bg-white rounded-xl border border-gray-100 p-6">
            <h3 className="font-semibold text-brand-dark mb-2">Assessments</h3>
            <p className="text-sm text-brand-gray mb-4">Quizzes to verify training completion.</p>
            <div className="space-y-3">
              {['Med Management Quiz', 'Fall Prevention Quiz'].map(title => (
                <div key={title} className="flex items-center justify-between p-3 rounded-lg bg-gray-50">
                  <span className="text-sm text-brand-dark">{title}</span>
                  <span className="text-xs px-2 py-0.5 rounded-full bg-gray-200 text-gray-600">Pending</span>
                </div>
              ))}
            </div>
          </div>
        </FeatureGate>

        <FeatureGate feature={FEATURE_KEYS.VIDEO_UPLOAD}>
          <div className="bg-white rounded-xl border border-gray-100 p-6">
            <h3 className="font-semibold text-brand-dark mb-2">Video Library</h3>
            <p className="text-sm text-brand-gray">Upload and manage training videos.</p>
            <div className="mt-4 border-2 border-dashed border-gray-200 rounded-lg p-8 text-center">
              <p className="text-sm text-brand-gray">Drag and drop videos here or click to upload</p>
            </div>
          </div>
        </FeatureGate>

        <FeatureGate feature={FEATURE_KEYS.AI_AVATAR_OVERLAYS}>
          <div className="bg-white rounded-xl border border-gray-100 p-6">
            <h3 className="font-semibold text-brand-dark mb-2">AI Avatar Overlays</h3>
            <p className="text-sm text-brand-gray">Generate AI presenters for your training content.</p>
            <div className="mt-4 bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg p-8 text-center">
              <p className="text-sm text-brand-purple font-medium">Coming soon</p>
            </div>
          </div>
        </FeatureGate>
      </div>
    </div>
  )
}
