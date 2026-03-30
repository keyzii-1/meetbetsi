'use client'

import { motion } from 'framer-motion'
import EmailSignup from '@/components/ui/EmailSignup'

export default function HeroSection() {
  return (
    <section className="relative min-h-[80vh] flex items-center overflow-hidden bg-gradient-to-br from-brand-purple-bg via-white to-brand-purple-bg">
      {/* Floating blobs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        <div className="absolute -top-[15%] -right-[10%] w-[500px] h-[500px] rounded-full bg-radial-[at_center] from-brand-purple/10 to-transparent animate-[float_8s_ease-in-out_infinite]" />
        <div className="absolute -bottom-[20%] -left-[8%] w-[350px] h-[350px] rounded-full bg-radial-[at_center] from-pink-300/10 to-transparent animate-[float_10s_ease-in-out_infinite_2s]" />
        <div className="absolute top-[20%] left-[15%] w-[200px] h-[200px] rounded-full bg-radial-[at_center] from-orange-200/10 to-transparent animate-[float_12s_ease-in-out_infinite_1s]" />
      </div>

      <div className="relative z-10 mx-auto max-w-[1200px] px-5 py-20">
        <div className="max-w-2xl mx-auto text-center">
          <motion.h1
            className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-brand-dark leading-tight mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            A new way to train caregivers — with love, clarity, and care 💜
          </motion.h1>
          <motion.p
            className="text-xl text-brand-purple font-medium mb-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Care that feels like home.
          </motion.p>
          <motion.div
            className="max-w-md mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <EmailSignup source="homepage-hero" />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
