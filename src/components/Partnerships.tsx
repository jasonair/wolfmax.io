'use client';

import { motion } from 'framer-motion';
import { Section } from './Section';

const partners = [
  { title: 'Top-tier universities', status: 'Pilots launching soon', stat: '10+', statLabel: 'institutions' },
  { title: 'Research institutions', status: 'In discussions', stat: '5', statLabel: 'partners' },
  { title: 'Global reach', status: 'Multiple continents', stat: '3', statLabel: 'continents' },
];

export function Partnerships() {
  return (
    <Section
      surface="cream"
      eyebrow="Partnerships in progress"
      title="Trusted by institutions"
      intro="We're working with leading universities and institutions to pilot Workings for academic integrity and creative verification."
    >
      <div className="mt-16 sm:mt-20 max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-6">
        {partners.map((partner, i) => (
          <motion.div
            key={partner.title}
            className="card-on-cream p-8 h-full text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ delay: i * 0.1, duration: 0.6, ease: 'easeOut' }}
          >
            <span className="font-display text-5xl sm:text-6xl text-blue leading-none">{partner.stat}</span>
            <p className="eyebrow text-mute mt-3 mb-6">{partner.statLabel}</p>
            <div className="w-8 h-px mx-auto mb-6 bg-navy/15" />
            <h3 className="text-lg font-semibold text-navy mb-3">{partner.title}</h3>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-blue/20 bg-blue/[0.05]">
              <motion.span
                className="w-1.5 h-1.5 rounded-full bg-blue"
                animate={{ opacity: [0.4, 1, 0.4] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut', delay: i * 0.3 }}
              />
              <span className="text-xs text-mute font-medium">{partner.status}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
