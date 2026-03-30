import AnimateOnScroll from './AnimateOnScroll'

interface SectionHeadingProps {
  title: string
  subtitle?: string
  centered?: boolean
  className?: string
}

export default function SectionHeading({ title, subtitle, centered = true, className = '' }: SectionHeadingProps) {
  return (
    <AnimateOnScroll className={`max-w-2xl ${centered ? 'mx-auto text-center' : ''} mb-12 ${className}`}>
      <h2 className="text-3xl md:text-4xl font-bold mb-4">{title}</h2>
      {subtitle && <p className="text-lg text-brand-gray">{subtitle}</p>}
    </AnimateOnScroll>
  )
}
