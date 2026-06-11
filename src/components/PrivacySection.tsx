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

// Full-bleed decorative wave that bands across the navy block, behind the
// content (clipped by the rounded corners). Rendered as a fixed-height
// background so the image keeps its natural proportions: `top`/`height` (px)
// pin it to a fixed vertical position, while `cover` lets it bleed past the
// block's sides and crop horizontally as the viewport narrows — never
// squashing the wave.
const WAVE = { src: '/images/wave-02.png' };

function WaveDecoration() {
  return (
    <div
      aria-hidden
      // Fixed vertical band (top/height in px) so the wave keeps its natural
      // proportions and holds position. On mobile the title wraps taller and
      // the intro→cards gap is tight, so the band sits higher and shorter to
      // clear the cards; from sm up it drops to its full-size position.
      className="pointer-events-none select-none absolute inset-x-0 z-0 top-[255px] h-[250px] min-[480px]:top-[310px] sm:top-[298px] sm:h-[450px]"
      style={{
        backgroundImage: `url(${WAVE.src})`,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        backgroundSize: 'cover',
      }}
    />
  );
}

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
        <span className="h-px flex-1 bg-cream/15 transition-colors group-hover:bg-blue/40" />
      </div>
      <h3 className="text-[1.4rem] font-bold text-cream mb-3 leading-[1.15] tracking-tight">{item.title}</h3>
      <p className="text-cream/65 text-sm leading-relaxed">{item.description}</p>
    </motion.div>
  );
}

export function PrivacySection() {
  return (
    <Section
      contained
      surface="navy"
      id="security"
      eyebrow="Privacy & security"
      title="We can't see your work. You choose what to share, and with whom."
      intro="Local-first, zero-knowledge, tamper-evident - the architecture behind the record."
      decoration={<WaveDecoration />}
    >
      <div className="mt-[130px] sm:mt-[178px] grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
        {features.map((item, i) => (
          <FeatureCard key={item.title} item={item} index={i} />
        ))}
      </div>
    </Section>
  );
}
