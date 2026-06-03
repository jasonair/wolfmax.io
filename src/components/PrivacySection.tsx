'use client';

import { motion } from 'framer-motion';
import { Section } from './Section';
import { Annotate } from './Annotate';

type Feature = { title: string; description: string };

const privacy: Feature[] = [
  {
    title: 'Local-first, encrypted',
    description:
      'Everything runs and stays on your device, encrypted with keys only you hold. No one else can read it - including us.',
  },
  {
    title: 'You stay in control',
    description:
      'Decide what to share, when, and with whom. Wipe your data or your whole account whenever you want. Nothing leaves, and nothing lingers, without your say-so.',
  },
  {
    title: 'Zero-knowledge architecture',
    description:
      "We're built so we never see your raw content. Even the aggregate insights organisations rely on are computed without exposing what's underneath.",
  },
];

const integrity: Feature[] = [
  {
    title: 'Sealed against future AI forgery',
    description:
      "Sealed the moment it's made, a record can't be forged after the fact. However good future AI gets at faking human work, it can't reach back.",
  },
  {
    title: 'Tamper-evident',
    description:
      "Every record is cryptographically chained - altering even a single detail breaks the chain and is immediately detectable. A record either verifies intact, or it doesn't verify.",
  },
  {
    title: 'Quantum-strong hashing',
    description:
      'Every record is hashed with SHA-512, a standard strong enough to stay secure even against quantum computers.',
  },
];

function FeatureCard({ item, index }: { item: Feature; index: number }) {
  return (
    <motion.div
      className="card-on-navy group p-7 sm:p-8 h-full"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ delay: index * 0.07, duration: 0.6, ease: 'easeOut' }}
    >
      <div className="flex items-center gap-4 mb-6">
        <span className="h-[3px] w-9 rounded-full bg-blue transition-all duration-300 group-hover:w-12" />
        <span className="h-px flex-1 bg-cream/12 transition-colors group-hover:bg-blue/40" />
      </div>
      <h3 className="text-[1.4rem] font-bold text-cream mb-3 leading-[1.15] tracking-tight">{item.title}</h3>
      <p className="text-cream/65 text-sm leading-relaxed">{item.description}</p>
    </motion.div>
  );
}

export function PrivacySection() {
  return (
    <Section
      surface="navy"
      id="security"
      eyebrow="Privacy & security"
      title={
        <>
          We can&apos;t see your work. Neither can{' '}
          <Annotate variant="underline-double">anyone else</Annotate>.
        </>
      }
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
