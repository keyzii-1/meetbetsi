import Link from 'next/link'
import Image from 'next/image'
import type { BlogPost } from '@/types'

export default function BlogCard({ title, author, date, description, href, image }: BlogPost) {
  return (
    <div className="group rounded-xl overflow-hidden bg-white shadow-md hover:shadow-xl transition-all duration-400 hover:-translate-y-2 hover:rotate-[0.5deg]">
      <Link href={href}>
        <div className="h-56 overflow-hidden">
          <Image src={image} alt={title} width={600} height={300} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
        </div>
      </Link>
      <div className="p-5">
        <p className="text-xs text-brand-gray mb-1">By {author} &middot; {date}</p>
        <h3 className="font-heading font-bold text-xl mb-2">
          <Link href={href} className="text-brand-dark hover:text-brand-purple transition-colors">{title}</Link>
        </h3>
        <p className="text-sm text-brand-gray mb-3">{description}</p>
        <Link href={href} className="inline-flex items-center rounded-full border-2 border-brand-purple px-4 py-1.5 text-sm font-semibold text-brand-purple hover:bg-brand-purple hover:text-white transition-colors">
          Read More
        </Link>
      </div>
    </div>
  )
}
