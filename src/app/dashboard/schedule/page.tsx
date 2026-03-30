'use client'

import { useOrg } from '@/config/org-provider'
import { FeatureGate } from '@/components/feature-gate'
import { FEATURE_KEYS } from '@/config/features'

export default function SchedulePage() {
  const org = useOrg()

  return (
    <div>
      <h1 className="text-2xl font-heading font-bold text-brand-dark mb-1">Schedule</h1>
      <p className="text-brand-gray text-sm mb-8">Manage shifts and attendance</p>

      <div className="grid gap-5 lg:grid-cols-2">
        <FeatureGate feature={FEATURE_KEYS.SHIFT_MANAGEMENT}>
          <div className="bg-white rounded-xl border border-gray-100 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-brand-dark">Upcoming Shifts</h3>
              <button className="text-xs text-brand-purple hover:text-brand-purple-light font-medium">+ New Shift</button>
            </div>
            <div className="space-y-3">
              {[
                { name: 'Morning Shift', time: '7:00 AM - 3:00 PM', caregiver: 'Sarah M.' },
                { name: 'Evening Shift', time: '3:00 PM - 11:00 PM', caregiver: 'James T.' },
                { name: 'Night Shift', time: '11:00 PM - 7:00 AM', caregiver: 'Maria L.' },
              ].map(shift => (
                <div key={shift.name} className="flex items-center justify-between p-3 rounded-lg bg-gray-50">
                  <div>
                    <p className="text-sm font-medium text-brand-dark">{shift.name}</p>
                    <p className="text-xs text-brand-gray">{shift.time}</p>
                  </div>
                  <span className="text-xs text-brand-gray">{shift.caregiver}</span>
                </div>
              ))}
            </div>
          </div>
        </FeatureGate>

        <FeatureGate feature={FEATURE_KEYS.CHECK_IN_OUT}>
          <div className="bg-white rounded-xl border border-gray-100 p-6">
            <h3 className="font-semibold text-brand-dark mb-4">Check-in / Check-out</h3>
            <div className="text-center py-6">
              <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-3">
                <span className="text-2xl">✓</span>
              </div>
              <p className="text-sm text-brand-dark font-medium">Ready to check in</p>
              <p className="text-xs text-brand-gray mt-1">Tap when you arrive at your assigned location</p>
              <button className="mt-4 px-6 py-2 rounded-full bg-green-600 text-white text-sm font-medium hover:bg-green-700 transition-colors">
                Check In
              </button>
            </div>
          </div>
        </FeatureGate>

        <FeatureGate feature={FEATURE_KEYS.GEOFENCING}>
          <div className="bg-white rounded-xl border border-gray-100 p-6">
            <h3 className="font-semibold text-brand-dark mb-2">Geofence Status</h3>
            <p className="text-sm text-brand-gray mb-4">Location verification for check-ins ({org.settings.geofenceRadiusMeters}m radius)</p>
            <div className="bg-gray-100 rounded-lg h-40 flex items-center justify-center">
              <p className="text-xs text-brand-gray">Map view placeholder</p>
            </div>
          </div>
        </FeatureGate>

        <FeatureGate feature={FEATURE_KEYS.TIMESHEET_EXPORT}>
          <div className="bg-white rounded-xl border border-gray-100 p-6">
            <h3 className="font-semibold text-brand-dark mb-2">Timesheets</h3>
            <p className="text-sm text-brand-gray mb-4">Export timesheets for payroll processing.</p>
            <button className="px-4 py-2 rounded-lg bg-brand-purple text-white text-sm font-medium hover:bg-brand-purple-light transition-colors">
              Export This Week
            </button>
          </div>
        </FeatureGate>
      </div>
    </div>
  )
}
