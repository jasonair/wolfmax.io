'use client';

import { motion } from 'framer-motion';
import { Section } from './Section';

type Feature = { title: string; description: string };

// Three cards: architecture (local-first + zero-knowledge merged), control
// (picks up the "you choose what to share" half of the headline), integrity
// (boring precision: SHA-512, chained, externally anchored).
const features: Feature[] = [
  {
    title: 'Private by architecture',
    description:
      "Everything runs and stays on your device, encrypted with keys only you hold. We never see your raw content - there's nothing on our side to hand over.",
  },
  {
    title: "You're in control",
    description:
      'Share, redact, or wipe everything whenever you choose. Nothing leaves, and nothing lingers, without your say-so.',
  },
  {
    title: 'Tamper-evident',
    description:
      "SHA-512 hashing, cryptographically chained records, externally anchored timestamps. A genuine record verifies. A doctored one can't.",
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
      title="We can't see your work. You choose what to share, and with whom."
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
