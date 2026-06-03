'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import type { ReactNode } from 'react';
import { Section } from './Section';

const audiences: {
  eyebrow: string;
  title: ReactNode;
  description: string;
  cta: string;
  href: string;
}[] = [
  {
    eyebrow: 'Individuals',
    title: 'Prove your work is yours.',
    description:
      'For writers, designers, developers, inventors, students, and anyone whose authorship matters when it counts.',
    cta: 'Explore for individuals',
    href: '/individuals',
  },
  {
    eyebrow: 'Educators',
    title: 'Detection asks the wrong question.',
    description:
      'Verifiable process evidence that supports assessment redesign, without compromising student privacy.',
    cta: 'Explore for educators',
    href: '/institutions#educators',
  },
  {
    eyebrow: 'Businesses',
    title: 'Know what your AI is actually doing.',
    description:
      'Privacy-first insight into where AI is adding value to your work, and where human judgement still matters.',
    cta: 'Explore for business',
    href: '/institutions#businesses',
  },
];

const Arrow = () => (
  <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="transition-transform group-hover:translate-x-0.5">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
  </svg>
);

/**
 * One audience card. `min-h-[320px]` pins a shared minimum so cards stay
 * aligned regardless of copy length, and `mb-auto` on the body pushes
 * the CTA to a shared baseline at the bottom of the flex column.
 */
function AudienceCard({
  item,
  index,
}: {
  item: (typeof audiences)[number];
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ delay: index * 0.08, duration: 0.6, ease: 'easeOut' }}
      className="h-full"
    >
      <Link
        href={item.href}
        className="card-on-cream group flex h-full min-h-[320px] flex-col p-8 sm:p-9"
      >
        <span className="eyebrow text-blue mb-4">{item.eyebrow}</span>
        <h3 className="font-display text-[1.4rem] sm:text-[1.65rem] leading-[1.1] text-navy mb-3.5">
          {item.title}
        </h3>
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
      title="Wherever authorship matters."
      intro={
        <>
          Authorship isn&apos;t only contested in one place. The student defending their thesis, the company
          proving its value, the writer protecting their voice - they all need the same thing: evidence of how the
          work was made.
        </>
      }
    >
      {/* Flat 3-up grid on lg+ with even gaps; 2-up on sm; 1-up on mobile.
          Equal-width tracks via `grid-cols-3` so all three cards share an
          exact width, with `items-stretch` (grid default) syncing heights
          to the tallest card. min-h on the card itself pins a baseline so
          short copy doesn't make a card look squat next to longer ones. */}
      <div className="mt-16 sm:mt-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7 lg:gap-8 items-stretch">
        {audiences.map((item, i) => (
          <AudienceCard key={item.eyebrow} item={item} index={i} />
        ))}
      </div>
    </Section>
  );
}
