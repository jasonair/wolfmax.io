'use client';

import { motion } from 'framer-motion';
import { Section } from './Section';

type Feature = { title: string; description: string; icon: React.ReactNode };

const privacy: Feature[] = [
  {
    title: 'Local-first, encrypted',
    description:
      'Everything runs and stays on your device, encrypted with keys only you hold. No one else can read it - including us.',
    icon: (
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
    ),
  },
  {
    title: 'You stay in control',
    description:
      'Decide what to share, when, and with whom. Wipe your data or your whole account whenever you want. Nothing leaves, and nothing lingers, without your say-so.',
    icon: (
      <>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
      </>
    ),
  },
  {
    title: 'Zero-knowledge architecture',
    description:
      "We're built so we never see your raw content. Even the aggregate insights organisations rely on are computed without exposing what's underneath.",
    icon: (
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
    ),
  },
];

const integrity: Feature[] = [
  {
    title: 'Sealed against future AI forgery',
    description:
      "Sealed the moment it's made, a record can't be forged after the fact. However good future AI gets at faking human work, it can't reach back.",
    icon: (
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
    ),
  },
  {
    title: 'Tamper-evident',
    description:
      "Every record is cryptographically chained - altering even a single detail breaks the chain and is immediately detectable. A record either verifies intact, or it doesn't verify.",
    icon: (
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3M9 4.5L4.5 9 9 13.5" />
    ),
  },
  {
    title: 'Quantum-strong hashing',
    description:
      'Every record is hashed with SHA-512, a standard strong enough to stay secure even against quantum computers.',
    icon: (
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
    ),
  },
];

function FeatureCard({ item, index }: { item: Feature; index: number }) {
  return (
    <motion.div
      className="card-on-navy p-7 sm:p-8 h-full"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ delay: index * 0.07, duration: 0.6, ease: 'easeOut' }}
    >
      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue/[0.18] text-blue mb-5">
        <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          {item.icon}
        </svg>
      </div>
      <h3 className="text-lg font-bold text-cream mb-2.5 leading-snug">{item.title}</h3>
      <p className="text-cream/70 text-sm leading-relaxed">{item.description}</p>
    </motion.div>
  );
}

export function PrivacySection() {
  return (
    <Section
      surface="navy"
      id="security"
      eyebrow="Privacy & security"
      title="We can't see your work. Neither can anyone else."
      intro={
        <>
          Local-first, zero-knowledge, sealed against forgery. Built not just for today&apos;s threats,
          but for what comes after.
        </>
      }
    >
      <p className="eyebrow text-cream/55 text-center mt-16 mb-6">Privacy</p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
        {privacy.map((item, i) => (
          <FeatureCard key={item.title} item={item} index={i} />
        ))}
      </div>

      <p className="eyebrow text-cream/55 text-center mt-12 mb-6">Integrity &amp; durability</p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
        {integrity.map((item, i) => (
          <FeatureCard key={item.title} item={item} index={i} />
        ))}
      </div>
    </Section>
  );
}
