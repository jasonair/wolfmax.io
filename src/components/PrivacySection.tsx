'use client';

import { motion } from 'framer-motion';
import { Section } from './Section';

const features = [
  {
    title: 'End-to-end encryption',
    description: 'All data is encrypted on your device before it goes anywhere. Only you hold the keys.',
    span: 'col-span-1' as const,
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
      </svg>
    ),
  },
  {
    title: '100% local processing',
    description: 'Everything runs on your machine. Your creative process never leaves your device unless you choose to share it.',
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
    title: 'Full anonymity',
    description: 'Use Workings without revealing your identity. Prove your process without proving who you are.',
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
    title: 'You control sharing',
    description: 'You choose what to share, when to share it, and with whom. Granular control over every piece of data.',
    span: 'col-span-1' as const,
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
        <circle cx="12" cy="12" r="3" />
      </svg>
    ),
  },
  {
    title: 'Zero-knowledge architecture',
    description: 'We literally cannot see your data. Our architecture is designed so we never have access to your content.',
    span: 'col-span-1 lg:col-span-2' as const,
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <polyline points="9 12 12 15 16 10" />
      </svg>
    ),
  },
  {
    title: 'Legal protection',
    description: 'Your Workings reports can serve as evidence of your creative process. Built with legal defensibility in mind.',
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

function FeatureCard({ item, index }: { item: (typeof features)[number]; index: number }) {
  const isWide = item.span.includes('col-span-2');
  return (
    <motion.div
      className={`card-on-cream p-8 h-full ${item.span}`}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ delay: index * 0.07, duration: 0.6, ease: 'easeOut' }}
    >
      <div className={isWide ? 'flex items-start gap-5' : ''}>
        <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-5 border border-blue/25 bg-blue/[0.06] text-blue shrink-0">
          {item.icon}
        </div>
        <div>
          <h3 className="text-lg font-semibold text-navy mb-2">{item.title}</h3>
          <p className="text-mute text-sm leading-relaxed">{item.description}</p>
        </div>
      </div>
    </motion.div>
  );
}

export function PrivacySection() {
  return (
    <Section
      surface="cream"
      id="security"
      eyebrow="Privacy first"
      title="Your privacy is non-negotiable"
      intro="We built Workings with a radical approach to privacy: we never see your data."
    >
      <div className="mt-16 sm:mt-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {features.map((item, i) => (
          <FeatureCard key={item.title} item={item} index={i} />
        ))}
      </div>
    </Section>
  );
}
