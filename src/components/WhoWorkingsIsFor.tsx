'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Section } from './Section';

const audiences = [
  {
    eyebrow: 'Individuals',
    title: 'Prove your process. Protect your work.',
    description:
      'For writers, designers, developers, founders, students, and anyone whose authorship matters when it counts.',
    cta: 'Explore for individuals',
    href: '/individuals',
  },
  {
    eyebrow: 'Educators',
    title: 'Restore trust in student work.',
    description:
      'A privacy-first alternative to AI detection for theses, essays, exams, and academic-integrity policy.',
    cta: 'Explore for educators',
    href: '/institutions#educators',
  },
  {
    eyebrow: 'Businesses',
    title: 'Adopt AI responsibly.',
    description:
      'See the patterns, not the people. Aggregate dashboards — never individual activity. Keep humans in the loop, evolve AI policy on real evidence. Protect IP.',
    cta: 'Explore for business',
    href: '/institutions#businesses',
  },
];

const Arrow = () => (
  <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="transition-transform group-hover:translate-x-0.5">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
  </svg>
);

function AudienceCard({ item, index }: { item: (typeof audiences)[number]; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ delay: index * 0.1, duration: 0.6, ease: 'easeOut' }}
      className="h-full"
    >
      <Link href={item.href} className="card-on-cream group flex h-full flex-col p-8 sm:p-9">
        <span className="eyebrow text-blue mb-4">{item.eyebrow}</span>
        <h3 className="font-display text-[1.4rem] sm:text-[1.65rem] leading-[1.1] text-navy mb-3.5">{item.title}</h3>
        <p className="text-mute text-sm sm:text-[0.95rem] leading-relaxed mb-auto">{item.description}</p>
        <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-blue">
          {item.cta} <Arrow />
        </span>
      </Link>
    </motion.div>
  );
}

export function WhoWorkingsIsFor() {
  return (
    <Section
      surface="cream"
      id="who-its-for"
      eyebrow={
        <>
          Who <em className="italic">Workings</em> is for
        </>
      }
      title="Built for individuals and the institutions that work with them."
      intro="One privacy-first standard. Designed to support the people who make the work — verifiable by the organisations that need to trust it."
    >
      <div className="mt-16 sm:mt-20 grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
        {audiences.map((item, i) => (
          <AudienceCard key={item.eyebrow} item={item} index={i} />
        ))}
      </div>
    </Section>
  );
}
