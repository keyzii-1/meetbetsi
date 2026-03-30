import Image from 'next/image'
import AnimateOnScroll from '@/components/ui/AnimateOnScroll'

export default function MovementSection() {
  return (
    <section className="relative py-20 md:py-28 overflow-hidden">
      <div className="mx-auto max-w-[1200px] px-5">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <AnimateOnScroll animation="slide-left">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">This is more than training.</h2>
            <p className="text-lg text-brand-gray leading-relaxed mb-4">
              It&apos;s a movement to make care better — for everyone. At Meet Betsi, we are redefining the caregiving industry through an innovative approach to education and technology.
            </p>
            <p className="text-lg text-brand-gray leading-relaxed">
              Whether you are a caregiver seeking professional development, a healthcare provider looking to enhance workforce training, or an advocate for equitable access to quality care, you can be a part of this transformation.
            </p>
          </AnimateOnScroll>
          <AnimateOnScroll animation="slide-right">
            <div className="rounded-2xl overflow-hidden shadow-lg shadow-brand-purple/10">
              <Image src="/images/home/movement-header.png" alt="Join the movement for better caregiver training" width={600} height={400} className="w-full h-auto" />
            </div>
          </AnimateOnScroll>
        </div>
      </div>
    </section>
  )
}
