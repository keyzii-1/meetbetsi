import Link from 'next/link'
import Image from 'next/image'
import type { StoryCard as StoryCardType } from '@/types'

export default function StoryCard({ title, description, href, image }: StoryCardType) {
  return (
    <Link href={href} className="group block rounded-xl overflow-hidden bg-white shadow-md hover:shadow-xl transition-all duration-400 hover:-translate-y-2 hover:-rotate-[0.5deg]">
      <div className="h-48 overflow-hidden">
        <Image src={image} alt={title} width={600} height={300} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
      </div>
      <div className="p-5">
        <h3 className="font-heading font-bold text-xl text-brand-dark mb-2">{title}</h3>
        <p className="text-sm text-brand-gray mb-3 line-clamp-3">{description}</p>
        <span className="inline-flex items-center rounded-full border-2 border-brand-purple px-4 py-1.5 text-sm font-semibold text-brand-purple group-hover:bg-brand-purple group-hover:text-white transition-colors">
          Watch
        </span>
      </div>
    </Link>
  )
}
