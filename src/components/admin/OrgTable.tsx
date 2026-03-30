'use client'

import Link from 'next/link'
import type { Organization } from '@/types/org'

interface OrgTableProps {
  orgs: Organization[]
}

export default function OrgTable({ orgs }: OrgTableProps) {
  if (orgs.length === 0) {
    return <p className="text-brand-gray text-center py-12">No organizations yet.</p>
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-gray-50 text-left text-brand-gray">
            <th className="px-4 py-3 font-medium">Name</th>
            <th className="px-4 py-3 font-medium">Slug</th>
            <th className="px-4 py-3 font-medium">Plan</th>
            <th className="px-4 py-3 font-medium">Status</th>
            <th className="px-4 py-3 font-medium">Created</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {orgs.map(org => (
            <tr key={org.id} className="hover:bg-gray-50 transition-colors">
              <td className="px-4 py-3">
                <Link href={`/admin/organizations/${org.id}/`} className="font-medium text-brand-dark hover:text-brand-purple">
                  {org.name}
                </Link>
              </td>
              <td className="px-4 py-3 text-brand-gray">{org.slug}</td>
              <td className="px-4 py-3">
                <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-brand-purple-bg text-brand-purple">
                  {org.plan}
                </span>
              </td>
              <td className="px-4 py-3">
                <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${org.is_active ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                  {org.is_active ? 'Active' : 'Inactive'}
                </span>
              </td>
              <td className="px-4 py-3 text-brand-gray">{new Date(org.created_at).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
