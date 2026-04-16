'use client';

import { motion } from 'framer-motion';

const audiences = [
  {
    title: 'Students & Universities',
    description:
      'Prove your essays, code, and projects are genuinely yours. Satisfy academic integrity requirements with ease.',
    color: 'var(--brand-blue)',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
        <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
      </svg>
    ),
  },
  {
    title: 'Writers',
    description:
      'Show editors and publishers that your articles, stories, and copy are authentically human-written when it matters.',
    color: 'var(--brand-green)',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
        <path d="m15 5 4 4" />
      </svg>
    ),
  },
  {
    title: 'Creatives',
    description:
      'Designers, artists, and musicians can document their creative process and prove the human craft behind their work.',
    color: 'var(--brand-purple)',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
        <circle cx="8.5" cy="8.5" r="1.5" />
        <polyline points="21 15 16 10 5 21" />
      </svg>
    ),
  },
  {
    title: 'Influencers',
    description:
      'Build trust with your audience by showing the real work behind your content. Authenticity is your brand.',
    color: 'var(--brand-yellow)',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="23 7 16 12 23 17 23 7" />
        <rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
      </svg>
    ),
  },
];

function AudienceCard({
  item,
  index,
}: {
  item: (typeof audiences)[number];
  index: number;
}) {
  return (
    <motion.div
      className="relative group"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ delay: index * 0.12, duration: 0.7, ease: 'easeOut' }}
    >
      <div className="relative overflow-hidden rounded-2xl bg-white/[0.03] border border-white/[0.06] p-8 h-full transition-all duration-500 group-hover:bg-white/[0.05] group-hover:border-white/[0.12]">
        {/* Hover glow */}
        <motion.div
          className="absolute -inset-px rounded-2xl -z-10 blur-xl"
          style={{ background: item.color }}
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 0.08 }}
          transition={{ duration: 0.4 }}
        />

        {/* Icon */}
        <motion.div
          className="w-12 h-12 rounded-xl flex items-center justify-center mb-6 border transition-colors duration-300"
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

        {/* Title */}
        <h3 className="text-lg sm:text-xl font-bold text-white mb-3">
          {item.title}
        </h3>

        {/* Description */}
        <p className="text-gray-400 text-sm sm:text-base leading-relaxed">
          {item.description}
        </p>

        {/* Bottom accent line */}
        <motion.div
          className="absolute bottom-0 left-8 right-8 h-px"
          style={{
            background: `linear-gradient(90deg, transparent, ${item.color}, transparent)`,
          }}
          initial={{ scaleX: 0, opacity: 0 }}
          whileInView={{ scaleX: 1, opacity: 0.4 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.12 + 0.5, duration: 0.8 }}
        />
      </div>
    </motion.div>
  );
}

export function BuiltForEveryone() {
  return (
    <section id="use-cases" className="relative py-24 sm:py-32 px-4 sm:px-6 lg:px-8">
      {/* Section header */}
      <div className="max-w-4xl mx-auto text-center mb-16 sm:mb-20">
        <motion.p
          className="text-sm font-medium tracking-widest uppercase mb-4"
          style={{ color: 'var(--brand-green)' }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Who it&apos;s for
        </motion.p>
        <motion.h2
          className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1, duration: 0.6 }}
        >
          Built for Everyone Who Creates
        </motion.h2>
        <motion.p
          className="text-gray-400 text-base sm:text-lg max-w-xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          Whether you&apos;re writing a thesis or recording a podcast, your process matters
        </motion.p>
      </div>

      {/* Cards grid - 2x2 on large, stacked on mobile */}
      <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-5">
        {audiences.map((item, i) => (
          <AudienceCard key={item.title} item={item} index={i} />
        ))}
      </div>
    </section>
  );
}
