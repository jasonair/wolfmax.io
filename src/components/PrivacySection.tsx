'use client';

import { motion } from 'framer-motion';

const features = [
  {
    title: 'End-to-End Encryption',
    description:
      'All data is encrypted on your device before it goes anywhere. Only you hold the keys.',
    color: 'var(--brand-green)',
    span: 'col-span-1' as const,
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
      </svg>
    ),
  },
  {
    title: '100% Local Processing',
    description:
      'Everything runs on your machine. Your creative process never leaves your device unless you choose to share it.',
    color: 'var(--brand-blue)',
    span: 'col-span-1 lg:col-span-2' as const,
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
        <line x1="8" y1="21" x2="16" y2="21" />
        <line x1="12" y1="17" x2="12" y2="21" />
      </svg>
    ),
  },
  {
    title: 'Full Anonymity',
    description:
      'Use Wolfmax without revealing your identity. Prove your process without proving who you are.',
    color: 'var(--brand-purple)',
    span: 'col-span-1 lg:col-span-2' as const,
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
        <line x1="12" y1="17" x2="12.01" y2="17" />
      </svg>
    ),
  },
  {
    title: 'You Control Sharing',
    description:
      'You choose what to share, when to share it, and with whom. Granular control over every piece of data.',
    color: 'var(--brand-red)',
    span: 'col-span-1' as const,
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
        <circle cx="12" cy="12" r="3" />
      </svg>
    ),
  },
  {
    title: 'Zero-Knowledge Architecture',
    description:
      'We literally cannot see your data. Our architecture is designed so we never have access to your content.',
    color: 'var(--brand-green)',
    span: 'col-span-1 lg:col-span-2' as const,
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <polyline points="9 12 12 15 16 10" />
      </svg>
    ),
  },
  {
    title: 'Legal Protection',
    description:
      'Your Wolfmax reports can serve as evidence of your creative process. Built with legal defensibility in mind.',
    color: 'var(--brand-yellow)',
    span: 'col-span-1' as const,
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="16" y1="13" x2="8" y2="13" />
        <line x1="16" y1="17" x2="8" y2="17" />
        <polyline points="10 9 9 9 8 9" />
      </svg>
    ),
  },
];

function FeatureCard({
  item,
  index,
}: {
  item: (typeof features)[number];
  index: number;
}) {
  const isWide = item.span.includes('col-span-2');

  return (
    <motion.div
      className={`relative group ${item.span}`}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ delay: index * 0.08, duration: 0.7, ease: 'easeOut' }}
    >
      <div className="relative overflow-hidden rounded-2xl bg-white/[0.03] border border-white/[0.06] p-8 h-full transition-all duration-500 group-hover:bg-white/[0.05] group-hover:border-white/[0.12]">
        {/* Corner gradient accent */}
        <div
          className="absolute top-0 right-0 w-32 h-32 opacity-[0.04] group-hover:opacity-[0.08] transition-opacity duration-500"
          style={{
            background: `radial-gradient(circle at top right, ${item.color}, transparent 70%)`,
          }}
        />

        {/* Wide card layout: side by side. Normal card: stacked */}
        <div className={isWide ? 'flex items-start gap-6' : ''}>
          {/* Icon */}
          <motion.div
            className="w-11 h-11 rounded-xl flex items-center justify-center mb-5 border shrink-0"
            style={{
              borderColor: `color-mix(in srgb, ${item.color} 30%, transparent)`,
              background: `color-mix(in srgb, ${item.color} 8%, transparent)`,
              color: item.color,
            }}
            whileHover={{ scale: 1.1 }}
            transition={{ type: 'spring', stiffness: 400, damping: 15 }}
          >
            {item.icon}
          </motion.div>

          <div>
            {/* Title */}
            <h3 className="text-lg font-bold text-white mb-2">
              {item.title}
            </h3>

            {/* Description */}
            <p className="text-gray-400 text-sm leading-relaxed">
              {item.description}
            </p>
          </div>
        </div>

        {/* Bottom accent line */}
        <motion.div
          className="absolute bottom-0 left-8 right-8 h-px"
          style={{
            background: `linear-gradient(90deg, transparent, ${item.color}, transparent)`,
          }}
          initial={{ scaleX: 0, opacity: 0 }}
          whileInView={{ scaleX: 1, opacity: 0.3 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.08 + 0.5, duration: 0.8 }}
        />
      </div>
    </motion.div>
  );
}

export function PrivacySection() {
  return (
    <section id="security" className="relative py-24 sm:py-32 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background glow for section */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(126,252,216,0.06) 0%, transparent 70%)',
        }}
      />

      {/* Section header */}
      <div className="relative max-w-4xl mx-auto text-center mb-16 sm:mb-20">
        <motion.div
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border mb-6"
          style={{
            borderColor: 'color-mix(in srgb, var(--brand-green) 30%, transparent)',
            background: 'color-mix(in srgb, var(--brand-green) 5%, transparent)',
          }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--brand-green)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          </svg>
          <span className="text-sm font-medium tracking-wide" style={{ color: 'var(--brand-green)' }}>
            Privacy first
          </span>
        </motion.div>

        <motion.h2
          className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1, duration: 0.6 }}
        >
          Your Privacy is Non‑Negotiable
        </motion.h2>
        <motion.p
          className="text-gray-400 text-base sm:text-lg max-w-xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          We built Wolfmax with a radical approach to privacy: we never see your data
        </motion.p>
      </div>

      {/* Bento grid */}
      <div className="relative max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {features.map((item, i) => (
          <FeatureCard key={item.title} item={item} index={i} />
        ))}
      </div>
    </section>
  );
}
