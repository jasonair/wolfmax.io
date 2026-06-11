'use client';

import { motion } from 'framer-motion';
import { Section } from './Section';
import { Annotate } from './Annotate';

type Feature = { title: string; description: string };

// Tightened to three cards (was 3+3). Drops the "You stay in control" /
// "Sealed against future AI forgery" / "Quantum-strong hashing" framings in
// favour of boring precision: SHA-512, chained, externally anchored. The
// tamper-evident card absorbs the integrity specifics.
const features: Feature[] = [
  {
    title: 'Local-first, encrypted',
    description:
      'Runs and stays on your device, encrypted with keys only you hold. Nothing leaves without your say-so.',
  },
  {
    title: 'Zero-knowledge architecture',
    description:
      "We never see your raw content. Even the aggregate insights organisations rely on are computed without exposing what's underneath.",
  },
  {
    title: 'Tamper-evident',
    description:
      "SHA-512 hashing, cryptographically chained records, externally anchored timestamps. Alter a single detail and the chain breaks - the report either verifies intact, or it doesn't.",
  },
];

function FeatureCard({ item, index }: { item: Feature; index: number }) {
  return (
    <motion.div
      className="card-on-cream group p-7 sm:p-8 h-full"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ delay: index * 0.07, duration: 0.6, ease: 'easeOut' }}
    >
      <div className="flex items-center gap-4 mb-6">
        <span className="h-[3px] w-9 rounded-full bg-blue transition-all duration-300 group-hover:w-12" />
        <span className="h-px flex-1 bg-navy/10 transition-colors group-hover:bg-blue/40" />
      </div>
      <h3 className="text-[1.4rem] font-bold text-navy mb-3 leading-[1.15] tracking-tight">{item.title}</h3>
      <p className="text-mute text-sm leading-relaxed">{item.description}</p>
    </motion.div>
  );
}

export function PrivacySection() {
  return (
    <Section
      surface="cream"
      id="security"
      eyebrow="Privacy & security"
      title={
        <>
          We can&apos;t see your work. You choose what to share, and with{' '}
          <Annotate variant="underline-double" nudge={0.12}>whom</Annotate>.
        </>
      }
      intro="Local-first, zero-knowledge, tamper-evident - the architecture behind the record."
    >
      <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
        {features.map((item, i) => (
          <FeatureCard key={item.title} item={item} index={i} />
        ))}
      </div>
    </Section>
  );
}
