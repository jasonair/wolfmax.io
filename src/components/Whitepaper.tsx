'use client';

import { motion } from 'framer-motion';

export function Whitepaper() {
  return (
    <section id="whitepaper" className="relative py-24 sm:py-32 px-4 sm:px-6 lg:px-8">
      <motion.div
        className="relative max-w-5xl mx-auto"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
      >
        {/* Outer glow */}
        <div
          className="absolute -inset-1 rounded-3xl blur-2xl opacity-[0.07]"
          style={{
            background:
              'linear-gradient(135deg, var(--brand-red), var(--brand-purple))',
          }}
        />

        {/* Card */}
        <div className="relative overflow-hidden rounded-2xl bg-white/[0.03] border border-white/[0.06]">
          {/* Background gradient */}
          <div
            className="absolute inset-0 opacity-[0.04]"
            style={{
              background:
                'radial-gradient(ellipse at 20% 50%, var(--brand-red), transparent 60%), radial-gradient(ellipse at 80% 80%, var(--brand-purple), transparent 60%)',
            }}
          />

          <div className="relative flex flex-col md:flex-row items-center gap-8 md:gap-12 p-8 sm:p-12 md:p-16">
            {/* Document preview */}
            <motion.div
              className="shrink-0"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              <div className="relative w-48 sm:w-56 group cursor-pointer">
                {/* Paper shadow */}
                <div className="absolute inset-2 rounded-xl bg-brand-red/10 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                {/* Paper */}
                <div className="relative rounded-xl bg-white/[0.04] border border-white/[0.08] p-6 sm:p-8 aspect-[3/4] flex flex-col items-center justify-between transition-all duration-500 group-hover:border-white/[0.15] group-hover:bg-white/[0.06]">
                  {/* Decorative lines mimicking document content */}
                  <div className="w-full space-y-3">
                    <div className="w-3/4 h-1.5 rounded-full bg-white/[0.08]" />
                    <div className="w-full h-1 rounded-full bg-white/[0.04]" />
                    <div className="w-full h-1 rounded-full bg-white/[0.04]" />
                    <div className="w-5/6 h-1 rounded-full bg-white/[0.04]" />
                    <div className="w-full h-px bg-white/[0.06] my-1" />
                    <div className="w-full h-1 rounded-full bg-white/[0.04]" />
                    <div className="w-2/3 h-1 rounded-full bg-white/[0.04]" />
                    <div className="w-full h-1 rounded-full bg-white/[0.04]" />
                    <div className="w-4/5 h-1 rounded-full bg-white/[0.04]" />
                  </div>

                  {/* Bottom label */}
                  <div className="text-center mt-6">
                    <p className="text-sm font-semibold text-white/70">
                      Wolfmax
                    </p>
                    <p className="text-xs text-gray-500 mt-0.5">
                      Whitepaper 2026
                    </p>
                  </div>
                </div>

                {/* Red accent edge */}
                <div
                  className="absolute top-4 bottom-4 left-0 w-px"
                  style={{
                    background:
                      'linear-gradient(180deg, transparent, var(--brand-red), transparent)',
                    opacity: 0.4,
                  }}
                />
              </div>
            </motion.div>

            {/* Content */}
            <div className="flex-1 text-center md:text-left">
              <motion.h2
                className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3, duration: 0.6 }}
              >
                The Wolfmax Whitepaper
              </motion.h2>

              <motion.p
                className="text-base sm:text-lg text-gray-300 mb-3 font-medium"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4, duration: 0.6 }}
              >
                How verifiable process recording can restore trust in the age of
                AI-generated content.
              </motion.p>

              <motion.p
                className="text-sm sm:text-base text-gray-500 mb-8 max-w-lg"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5, duration: 0.6 }}
              >
                Covering our technical architecture, privacy model, and the case
                for process verification across education, media, and creative
                industries.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6, duration: 0.6 }}
              >
                <a
                  href="#"
                  className="inline-flex items-center gap-2 px-6 py-3 text-sm sm:text-base bg-brand-red text-white font-bold rounded-full hover:scale-105 transition-transform pulse-glow group"
                >
                  Read the Whitepaper
                  <svg
                    className="w-4 h-4 transition-transform group-hover:translate-x-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M14 5l7 7m0 0l-7 7m7-7H3"
                    />
                  </svg>
                </a>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
