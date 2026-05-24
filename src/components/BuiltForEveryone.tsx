'use client';

import { motion } from 'framer-motion';
import { Section } from './Section';

const audiences = [
  {
    title: 'Students & universities',
    description:
      'Prove your essays, code, and projects are genuinely yours. Satisfy academic integrity requirements with ease.',
  },
  {
    title: 'Writers',
    description:
      'Show editors and publishers that your articles, stories, and copy are authentically human-written when it matters.',
  },
  {
    title: 'Creatives',
    description:
      'Designers, artists, and musicians can document their creative process and prove the human craft behind their work.',
  },
  {
    title: 'Influencers',
    description:
      'Build trust with your audience by showing the real work behind your content. Authenticity is your brand.',
  },
];

function AudienceCard({ item, index }: { item: (typeof audiences)[number]; index: number }) {
  return (
    <motion.div
      className="card-on-navy p-8 sm:p-10 h-full flex flex-col"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ delay: index * 0.1, duration: 0.6, ease: 'easeOut' }}
    >
      <span className="eyebrow text-blue mb-5">
        {String(index + 1).padStart(2, '0')}
      </span>
      <h3 className="font-display text-3xl sm:text-[2.25rem] leading-[1.04] text-cream mb-4">
        {item.title}
      </h3>
      <p className="text-cream/65 text-sm sm:text-base leading-relaxed max-w-md">
        {item.description}
      </p>
    </motion.div>
  );
}

export function BuiltForEveryone() {
  return (
    <Section
      surface="navy"
      id="use-cases"
      eyebrow="Who it's for"
      title="Built for everyone who creates"
      intro="Whether you're writing a thesis or recording a podcast, your process matters."
    >
      <div className="mt-16 sm:mt-20 max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-5">
        {audiences.map((item, i) => (
          <AudienceCard key={item.title} item={item} index={i} />
        ))}
      </div>
    </Section>
  );
}
