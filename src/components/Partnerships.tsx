'use client';

import { motion } from 'framer-motion';

const partners = [
  {
    title: 'Top-tier Universities',
    status: 'Pilots launching soon',
    color: 'var(--brand-blue)',
    stat: '10+',
    statLabel: 'institutions',
  },
  {
    title: 'Research Institutions',
    status: 'In discussions',
    color: 'var(--brand-purple)',
    stat: '5',
    statLabel: 'partners',
  },
  {
    title: 'Global Reach',
    status: 'Multiple continents',
    color: 'var(--brand-green)',
    stat: '3',
    statLabel: 'continents',
  },
];

export function Partnerships() {
  return (
    <section className="relative py-24 sm:py-32 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse, rgba(83,132,237,0.05) 0%, transparent 70%)',
        }}
      />

      {/* Section header */}
      <div className="relative max-w-4xl mx-auto text-center mb-16 sm:mb-20">
        <motion.p
          className="text-sm font-medium tracking-widest uppercase mb-4"
          style={{ color: 'var(--brand-blue)' }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Partnerships in progress
        </motion.p>
        <motion.h2
          className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1, duration: 0.6 }}
        >
          Trusted by Institutions
        </motion.h2>
        <motion.p
          className="text-gray-400 text-base sm:text-lg max-w-xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          We&apos;re working with leading universities and institutions to pilot
          Wolfmax for academic integrity and creative verification
        </motion.p>
      </div>

      {/* Cards */}
      <div className="relative max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-6">
        {partners.map((partner, i) => (
          <motion.div
            key={partner.title}
            className="relative group"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{
              delay: i * 0.12,
              duration: 0.7,
              ease: 'easeOut',
            }}
          >
            <div className="relative overflow-hidden rounded-2xl bg-white/[0.03] border border-white/[0.06] p-8 h-full text-center transition-all duration-500 group-hover:bg-white/[0.05] group-hover:border-white/[0.12]">
              {/* Corner gradient */}
              <div
                className="absolute top-0 left-0 w-full h-32 opacity-[0.05] group-hover:opacity-[0.1] transition-opacity duration-500"
                style={{
                  background: `radial-gradient(ellipse at top, ${partner.color}, transparent 70%)`,
                }}
              />

              {/* Large stat number */}
              <motion.div
                className="relative mb-2"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{
                  delay: i * 0.12 + 0.3,
                  duration: 0.5,
                  ease: 'easeOut',
                }}
              >
                <span
                  className="text-5xl sm:text-6xl font-black tracking-tight"
                  style={{ color: partner.color }}
                >
                  {partner.stat}
                </span>
              </motion.div>

              {/* Stat label */}
              <p className="text-sm text-gray-500 mb-6 uppercase tracking-wider font-medium">
                {partner.statLabel}
              </p>

              {/* Divider */}
              <div
                className="w-8 h-px mx-auto mb-6 opacity-30"
                style={{ background: partner.color }}
              />

              {/* Title */}
              <h3 className="text-lg font-bold text-white mb-2">
                {partner.title}
              </h3>

              {/* Status pill */}
              <div
                className="inline-flex items-center gap-2 px-3 py-1 rounded-full border mt-2"
                style={{
                  borderColor: `color-mix(in srgb, ${partner.color} 20%, transparent)`,
                  background: `color-mix(in srgb, ${partner.color} 5%, transparent)`,
                }}
              >
                <motion.div
                  className="w-1.5 h-1.5 rounded-full"
                  style={{ background: partner.color }}
                  animate={{ opacity: [0.4, 1, 0.4] }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: 'easeInOut',
                    delay: i * 0.3,
                  }}
                />
                <span className="text-xs text-gray-400 font-medium">
                  {partner.status}
                </span>
              </div>

              {/* Bottom accent line */}
              <motion.div
                className="absolute bottom-0 left-8 right-8 h-px"
                style={{
                  background: `linear-gradient(90deg, transparent, ${partner.color}, transparent)`,
                }}
                initial={{ scaleX: 0, opacity: 0 }}
                whileInView={{ scaleX: 1, opacity: 0.3 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12 + 0.5, duration: 0.8 }}
              />
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
