interface StatsCardProps {
  label: string
  value: string | number
  subtitle?: string
}

export default function StatsCard({ label, value, subtitle }: StatsCardProps) {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
      <p className="text-sm text-brand-gray mb-1">{label}</p>
      <p className="text-3xl font-heading font-bold text-brand-dark">{value}</p>
      {subtitle && <p className="text-xs text-brand-gray mt-1">{subtitle}</p>}
    </div>
  )
}
