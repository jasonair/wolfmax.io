'use client';

import type { ReactNode } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Section } from './Section';

const audiences = [
  {
    eyebrow: 'Individuals',
    title: 'Record your process, protect your work.',
    description:
      'For writers, designers, developers, inventors, students, and anyone whose authorship matters when it counts.',
    cta: 'Explore for individuals',
    href: '/individuals',
  },
  {
    eyebrow: 'Educators',
    title: 'Students show their work.',
    description:
      'And you see the genuine effort behind it - no surveillance, no accusation.',
    cta: 'Explore for educators',
    href: '/institutions#educators',
  },
  {
    eyebrow: 'Businesses',
    title: 'Find the human in the loop.',
    description:
      'See the patterns, not the people. Aggregate insight, never individual surveillance. Evolve your AI policy on real evidence.',
    cta: 'Explore for business',
    href: '/institutions#businesses',
  },
];

const Arrow = () => (
  <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="transition-transform group-hover:translate-x-0.5">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
  </svg>
);

function AudienceCard({
  item,
  index,
  eyebrowStyle = 'normal',
}: {
  item: (typeof audiences)[number];
  index: number;
  eyebrowStyle?: 'normal' | 'demoted' | 'hidden';
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ delay: index * 0.1, duration: 0.6, ease: 'easeOut' }}
      className="h-full"
    >
      <Link href={item.href} className="card-on-cream group flex h-full flex-col p-8 sm:p-9">
        {eyebrowStyle !== 'hidden' && (
          <span
            className={
              eyebrowStyle === 'demoted'
                ? 'eyebrow !text-[0.62rem] text-blue/60 mb-4'
                : 'eyebrow text-blue mb-4'
            }
          >
            {item.eyebrow}
          </span>
        )}
        <h3 className="font-display text-[1.4rem] sm:text-[1.65rem] leading-[1.1] text-navy mb-3.5">{item.title}</h3>
        <p className="text-mute text-sm sm:text-[0.95rem] leading-relaxed mb-auto">{item.description}</p>
        <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-blue">
          {item.cta} <Arrow />
        </span>
      </Link>
    </motion.div>
  );
}

function GroupLabel({ children }: { children: ReactNode }) {
  return <span className="eyebrow text-blue mb-5 block">{children}</span>;
}

export function WhoWorkingsIsFor() {
  const [individuals, educators, businesses] = audiences;

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
      intro="One privacy-first standard. Designed to support the people who make the work - verifiable by the organisations that need to trust it."
    >
      {/*
        Two-zone layout. The container around the institutions pair is the
        whole approach — it IS the "Institutions" nav item, made visible.
        - lg: row of [Individuals 1fr | Institutions 2.2fr]. The right side
          needs the extra width to absorb its own padding so its inner cards
          end up at least as wide as the lone Individuals card.
        - sm-lg: zones stack; the Institutions frame is still visible, pair
          renders 2-up inside it.
        - <sm: pure stack, 1-up everywhere. The container drops its tint so
          it isn't doing visual work it doesn't need to — the INSTITUTIONS
          label is enough at single-column.
        items-stretch on the outer grid + grid-rows-[auto_1fr] in each zone
        keeps the row balanced (a lone short card beside a tall container
        looks lopsided; the card pins its CTA to the bottom instead).
      */}
      <div className="mt-16 sm:mt-20 grid gap-y-12 lg:grid-cols-[1fr_2.2fr] lg:gap-x-8 lg:gap-y-0 items-stretch">
        {/* Individuals zone */}
        <div className="grid grid-rows-[auto_1fr]">
          <GroupLabel>Individuals</GroupLabel>
          <AudienceCard item={individuals} index={0} eyebrowStyle="hidden" />
        </div>

        {/* Institutions zone */}
        <div className="grid grid-rows-[auto_1fr]">
          <GroupLabel>Institutions</GroupLabel>
          <div className="sm:rounded-[28px] sm:bg-navy/[0.03] sm:p-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 h-full">
              <AudienceCard item={educators} index={1} eyebrowStyle="demoted" />
              <AudienceCard item={businesses} index={2} eyebrowStyle="demoted" />
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
