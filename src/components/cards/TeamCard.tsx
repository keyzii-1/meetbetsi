import Image from 'next/image'
import type { TeamMember } from '@/types/team'

export default function TeamCard({ name, title, image, linkedin }: TeamMember) {
  return (
    <div className="text-center p-4 group">
      <div className="w-40 h-40 mx-auto mb-4 rounded-full overflow-hidden border-4 border-transparent bg-gradient-to-br from-brand-purple via-brand-purple-muted to-[#FFB794] p-[3px] shadow-md transition-transform group-hover:scale-105 group-hover:rotate-2">
        <div className="w-full h-full rounded-full overflow-hidden bg-white">
          <Image src={image} alt={name} width={160} height={160} className="w-full h-full object-cover" />
        </div>
      </div>
      <p className="font-heading font-bold text-brand-dark text-lg">{name}</p>
      <p className="text-sm text-brand-gray mb-2">{title}</p>
      {linkedin && (
        <a href={linkedin} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-sm text-brand-purple hover:text-brand-purple-light" aria-label={`${name} on LinkedIn`}>
          <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-current"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg> LinkedIn
        </a>
      )}
    </div>
  )
}
