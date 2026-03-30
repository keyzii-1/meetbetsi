'use client'

import { FeatureGate } from '@/components/feature-gate'
import { FEATURE_KEYS } from '@/config/features'

export default function DocumentsPage() {
  return (
    <div>
      <h1 className="text-2xl font-heading font-bold text-brand-dark mb-1">Documents</h1>
      <p className="text-brand-gray text-sm mb-8">Manage and share important files</p>

      <FeatureGate feature={FEATURE_KEYS.DOCUMENT_STORAGE}>
        <div className="bg-white rounded-xl border border-gray-100 p-6 mb-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-brand-dark">Files</h3>
            <button className="text-xs text-brand-purple hover:text-brand-purple-light font-medium">+ Upload</button>
          </div>
          <div className="space-y-2">
            {[
              { name: 'Employee Handbook.pdf', size: '2.4 MB', date: 'Mar 15, 2026' },
              { name: 'HIPAA Compliance Guide.pdf', size: '1.8 MB', date: 'Mar 10, 2026' },
              { name: 'Care Plan Template.docx', size: '450 KB', date: 'Mar 8, 2026' },
              { name: 'Emergency Procedures.pdf', size: '890 KB', date: 'Feb 28, 2026' },
            ].map(file => (
              <div key={file.name} className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded bg-red-50 flex items-center justify-center text-xs text-red-600 font-medium">
                    PDF
                  </div>
                  <div>
                    <p className="text-sm font-medium text-brand-dark">{file.name}</p>
                    <p className="text-xs text-brand-gray">{file.size}</p>
                  </div>
                </div>
                <span className="text-xs text-brand-gray">{file.date}</span>
              </div>
            ))}
          </div>
        </div>
      </FeatureGate>

      <div className="grid gap-5 lg:grid-cols-2">
        <FeatureGate feature={FEATURE_KEYS.DOCUMENT_VERSIONING}>
          <div className="bg-white rounded-xl border border-gray-100 p-6">
            <h3 className="font-semibold text-brand-dark mb-2">Version History</h3>
            <p className="text-sm text-brand-gray">Track changes and revert to previous versions of any document.</p>
          </div>
        </FeatureGate>

        <FeatureGate feature={FEATURE_KEYS.DOCUMENT_EXPIRATION_ALERTS}>
          <div className="bg-white rounded-xl border border-gray-100 p-6">
            <h3 className="font-semibold text-brand-dark mb-2">Expiration Alerts</h3>
            <p className="text-sm text-brand-gray mb-3">Documents expiring soon:</p>
            <div className="space-y-2">
              <div className="flex items-center justify-between p-2 rounded bg-amber-50">
                <span className="text-sm text-amber-800">CPR Certification</span>
                <span className="text-xs text-amber-600 font-medium">Expires in 14 days</span>
              </div>
              <div className="flex items-center justify-between p-2 rounded bg-red-50">
                <span className="text-sm text-red-800">TB Test Results</span>
                <span className="text-xs text-red-600 font-medium">Expires in 3 days</span>
              </div>
            </div>
          </div>
        </FeatureGate>
      </div>
    </div>
  )
}
