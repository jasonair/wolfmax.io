'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';

export function SeeInAction() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <section className="relative py-24 sm:py-32 px-4 sm:px-6 lg:px-8">
      {/* Section header */}
      <div className="max-w-4xl mx-auto text-center mb-12 sm:mb-16">
        <motion.p
          className="text-sm font-medium tracking-widest uppercase mb-4"
          style={{ color: 'var(--brand-red)' }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          See it in action
        </motion.p>
        <motion.h2
          className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1, duration: 0.6 }}
        >
          Watch Wolfmax Work
        </motion.h2>
        <motion.p
          className="text-gray-400 text-base sm:text-lg max-w-lg mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          See how easy it is to prove your creative process
        </motion.p>
      </div>

      {/* Video container */}
      <motion.div
        className="max-w-4xl mx-auto"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ delay: 0.3, duration: 0.7, ease: 'easeOut' }}
      >
        <div
          className="relative group cursor-pointer"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Outer glow on hover */}
          <motion.div
            className="absolute -inset-1 rounded-3xl blur-2xl"
            style={{
              background:
                'linear-gradient(135deg, var(--brand-red), var(--brand-purple))',
            }}
            animate={{ opacity: isHovered ? 0.15 : 0.05 }}
            transition={{ duration: 0.4 }}
          />

          {/* Video frame */}
          <div className="relative aspect-video rounded-2xl overflow-hidden bg-white/[0.03] border border-white/[0.08] transition-colors duration-500 group-hover:border-white/[0.15]">
            {/* Gradient background pattern */}
            <div className="absolute inset-0">
              {/* Subtle mesh gradient */}
              <div
                className="absolute inset-0 opacity-30"
                style={{
                  background:
                    'radial-gradient(ellipse at 30% 20%, rgba(255,38,94,0.15) 0%, transparent 50%), radial-gradient(ellipse at 70% 80%, rgba(140,27,246,0.1) 0%, transparent 50%)',
                }}
              />
              {/* Animated scan lines */}
              <motion.div
                className="absolute inset-0 opacity-[0.03]"
                style={{
                  backgroundImage:
                    'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.5) 2px, rgba(255,255,255,0.5) 4px)',
                }}
                animate={{ backgroundPositionY: ['0px', '4px'] }}
                transition={{
                  duration: 0.3,
                  repeat: Infinity,
                  ease: 'linear',
                }}
              />
            </div>

            {/* Center play button */}
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-6">
              {/* Play button ring */}
              <div className="relative">
                {/* Pulsing ring */}
                <motion.div
                  className="absolute inset-0 rounded-full"
                  style={{
                    background:
                      'linear-gradient(135deg, var(--brand-red), var(--brand-purple))',
                  }}
                  animate={{
                    scale: [1, 1.4, 1],
                    opacity: [0.3, 0, 0.3],
                  }}
                  transition={{
                    duration: 2.5,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                />

                {/* Play button */}
                <motion.div
                  className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-full flex items-center justify-center"
                  style={{
                    background:
                      'linear-gradient(135deg, var(--brand-red), var(--brand-purple))',
                  }}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 15 }}
                >
                  {/* Play triangle */}
                  <svg
                    width="28"
                    height="32"
                    viewBox="0 0 28 32"
                    fill="none"
                    className="ml-1.5"
                  >
                    <path
                      d="M26 14.268a2 2 0 0 1 0 3.464L4 28.66a2 2 0 0 1-3-1.732V5.072a2 2 0 0 1 3-1.732L26 14.268Z"
                      fill="white"
                    />
                  </svg>
                </motion.div>
              </div>

              {/* Coming soon label */}
              <motion.div
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.06] border border-white/[0.08]"
                animate={{ opacity: [0.6, 1, 0.6] }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              >
                <div className="w-1.5 h-1.5 rounded-full bg-brand-red animate-pulse" />
                <span className="text-sm text-gray-400 font-medium">
                  Video coming soon
                </span>
              </motion.div>
            </div>

            {/* Bottom edge highlight */}
            <div
              className="absolute bottom-0 left-0 right-0 h-px"
              style={{
                background:
                  'linear-gradient(90deg, transparent, var(--brand-red), var(--brand-purple), transparent)',
                opacity: 0.3,
              }}
            />
          </div>
        </div>
      </motion.div>
    </section>
  );
}
