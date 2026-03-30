import type { Metadata } from 'next'
import AnimateOnScroll from '@/components/ui/AnimateOnScroll'
import BlogCard from '@/components/cards/BlogCard'
import { BLOG_POSTS } from '@/lib/constants'

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Insights on caregiver training, healthcare, and building better care — from the Meet Betsi team.',
}

export default function BlogPage() {
  return (
    <>
      <section className="bg-brand-purple-bg py-16 text-center">
        <div className="mx-auto max-w-[1200px] px-5">
          <h1 className="text-4xl md:text-5xl font-bold mb-3">Blog</h1>
          <p className="text-lg text-brand-gray max-w-xl mx-auto">Insights on caregiver training, healthcare, and building better care.</p>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-[1200px] px-5">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {BLOG_POSTS.map((post, i) => (
              <AnimateOnScroll key={post.href} delay={i * 0.1}>
                <BlogCard {...post} />
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
