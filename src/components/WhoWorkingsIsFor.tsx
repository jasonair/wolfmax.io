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
    title: 'Students show their process.',
    description:
      'And you see the genuine effort behind it - no surveillance, no accusation.',
    cta: 'Explore for educators',
    href: '/institutions#educators',
  },
  {
    eyebrow: 'Businesses',
    title: 'Exploring ROI on your AI spend.',
    description:
      'Privacy-first. See where AI is adding value to your business and where human judgement still matters.',
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
 * Single card. `min-h-[320px]` pins a shared minimum so cards stay
 * aligned regardless of copy length, and `mb-auto` on the body pushes
 * the CTA to a shared baseline at the bottom of the flex column.
 */
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
      <Link
        href={item.href}
        className="card-on-cream group flex h-full min-h-[320px] flex-col p-8 sm:p-9"
      >
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

function GroupLabel({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <span className={`eyebrow text-blue mb-5 block ${className}`}>{children}</span>;
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
      {/* Mobile (default) & tablet (sm) — stack zones vertically. The
          Institutions container appears at sm+, with the pair side-by-side
          inside it. Layout below switches to a balanced 3-card row at lg. */}
      <div className="mt-16 sm:mt-20 lg:hidden grid gap-y-12">
        <div>
          <GroupLabel>Individuals</GroupLabel>
          <AudienceCard item={individuals} index={0} eyebrowStyle="hidden" />
        </div>
        <div>
          <GroupLabel>Institutions</GroupLabel>
          <div className="sm:rounded-[28px] sm:bg-navy/[0.03] sm:p-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 h-full">
              <AudienceCard item={educators} index={1} eyebrowStyle="demoted" />
              <AudienceCard item={businesses} index={2} eyebrowStyle="demoted" />
            </div>
          </div>
        </div>
      </div>

      {/*
        Desktop (lg+) — 3-card row with asymmetric gutters.

        Grid template columns (left → right):
          1fr  | 48px       | 16px   | 1fr  | 20px      | 1fr  | 16px
          ──── outer gap     ── frame  ──── inner gap    ──── frame
          INDIV                pad-L   EDU    (inst)     BIZ   pad-R

        Three `1fr` tracks → all three cards land on EXACTLY equal widths.
        The 16px frame-pad cols + the inner-gap col give the Institutions
        container its visual width (it spans cols 3 through 7) without
        eating into the cards inside it. Outer gap (48px) is intentionally
        much larger than the inner gap (20px) so proximity reads as
        grouping — the pair belongs together, the lone Individuals card
        stands apart.
      */}
      <div
        className="mt-16 sm:mt-20 hidden lg:grid items-stretch
                   lg:grid-cols-[1fr_48px_16px_1fr_20px_1fr_16px]
                   lg:grid-rows-[auto_1.5rem_1rem_1fr_1rem]"
      >
        {/*
          Row 1 — group labels.
          Row 2 — 24px gap between labels and the container.
          Row 3 — 16px top frame-pad (only the BG occupies this row).
          Row 4 — the cards (1fr, stretches to tallest card).
          Row 5 — 16px bottom frame-pad (only the BG occupies this row).

          INDIVIDUALS sits tight over the lone card.
          INSTITUTIONS spans the container's full width (cols 3-7).
        */}
        <div className="lg:col-start-1 lg:row-start-1">
          <GroupLabel className="!mb-0">Individuals</GroupLabel>
        </div>
        <div className="lg:col-start-3 lg:col-end-8 lg:row-start-1 lg:pl-1">
          <GroupLabel className="!mb-0">Institutions</GroupLabel>
        </div>

        {/* Institutions container background — spans rows 3-5 so it has
            matching ~16px frame-pad on every side of the card pair. */}
        <div
          aria-hidden="true"
          className="lg:col-start-3 lg:col-end-8 lg:row-start-3 lg:row-end-6 lg:rounded-[28px] lg:bg-navy/[0.03]"
        />

        {/* Cards — placed in row 4 (the 1fr row). Individuals card matches
            the height of the institution cards; the BG extends 16px above
            and below the card row, so the container reads as a deliberate
            frame around the pair. */}
        <div className="lg:col-start-1 lg:row-start-4">
          <AudienceCard item={individuals} index={0} eyebrowStyle="hidden" />
        </div>
        <div className="lg:col-start-4 lg:row-start-4">
          <AudienceCard item={educators} index={1} eyebrowStyle="demoted" />
        </div>
        <div className="lg:col-start-6 lg:row-start-4">
          <AudienceCard item={businesses} index={2} eyebrowStyle="demoted" />
        </div>
      </div>
    </Section>
  );
}
