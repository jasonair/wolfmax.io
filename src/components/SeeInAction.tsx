'use client';

import { motion } from 'framer-motion';
import { Section } from './Section';
import { Wave } from './Wave';

export function SeeInAction() {
  return (
    <Section
      surface="cream"
      eyebrow="See it in action"
      title="Watch Workings work"
      intro="See how easy it is to prove your creative process."
    >
      <motion.div
        className="mt-12 sm:mt-16 max-w-4xl mx-auto"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <div className="group relative aspect-video rounded-[22px] overflow-hidden surface-navy border border-navy cursor-pointer">
          {/* Wave motif backdrop */}
          <Wave className="absolute left-0 right-0 top-1/2 -translate-y-1/2 w-full h-32 text-blue/20" strokeWidth={6} />

          <div className="absolute inset-0 flex flex-col items-center justify-center gap-6">
            <div className="relative">
              <motion.div
                className="absolute inset-0 rounded-full bg-blue"
                animate={{ scale: [1, 1.4, 1], opacity: [0.3, 0, 0.3] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
              />
              <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-blue flex items-center justify-center transition-transform group-hover:scale-105">
                <svg width="26" height="30" viewBox="0 0 28 32" fill="none" className="ml-1.5">
                  <path d="M26 14.268a2 2 0 0 1 0 3.464L4 28.66a2 2 0 0 1-3-1.732V5.072a2 2 0 0 1 3-1.732L26 14.268Z" fill="white" />
                </svg>
              </div>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.06] border border-cream/15">
              <span className="w-1.5 h-1.5 rounded-full bg-blue animate-pulse" />
              <span className="text-sm text-cream/70 font-medium">Video coming soon</span>
            </div>
          </div>
        </div>
      </motion.div>
    </Section>
  );
}
