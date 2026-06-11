'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import type { ReactNode } from 'react';


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
        className="card-on-navy group flex h-full min-h-[320px] flex-col p-8 sm:p-9"
      >
        <span className="eyebrow text-blue mb-4">{item.eyebrow}</span>
        <h3 className="font-display text-[1.4rem] sm:text-[1.65rem] leading-[1.1] text-cream mb-3.5">
          {item.title}
        </h3>
        <p className="text-cream/65 text-sm sm:text-[0.95rem] leading-relaxed mb-auto">{item.description}</p>
        <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-blue">
          {item.cta} <Arrow />
        </span>
      </Link>
    </motion.div>
  );
}

/**
 * Pure-vector glow wave — no embedded raster, so it stays crisp at any size.
 * The SVG stretches edge-to-edge (`preserveAspectRatio="none"`); the curve is
 * a single cubic-bezier path. A vertical gradient fills the area below it to a
 * navy glow, and a blurred stroke of the same curve gives the luminous edge.
 */
function GradientWave() {
  // Wave curve: gentle left crest → centre trough → right crest, lifting off
  // the right edge. Drawn on a 1440×320 canvas, stretched to the container.
  const CURVE =
    'M0,150 C150,130 280,96 430,96 C580,96 660,250 780,250 C900,250 980,128 1130,140 C1280,152 1360,118 1440,96';
  const FILL = `${CURVE} L1440,320 L0,320 Z`;

  return (
    <div className="w-full pointer-events-none select-none" aria-hidden="true">
      <svg
        viewBox="0 0 1440 320"
        preserveAspectRatio="none"
        className="block w-full h-[180px] sm:h-[240px] md:h-[300px]"
        fill="none"
      >
        <defs>
          <linearGradient id="wave-glow-fill" x1="0" y1="96" x2="0" y2="320" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#4470eb" stopOpacity="0.55" />
            <stop offset="45%" stopColor="#0048ff" stopOpacity="0.18" />
            <stop offset="100%" stopColor="#0048ff" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="wave-glow-stroke" x1="0" y1="0" x2="1440" y2="0" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#2c4fd1" />
            <stop offset="50%" stopColor="#6b8bff" />
            <stop offset="100%" stopColor="#2c4fd1" />
          </linearGradient>
          <filter id="wave-blur" x="-20%" y="-50%" width="140%" height="200%">
            <feGaussianBlur stdDeviation="10" />
          </filter>
        </defs>

        {/* Soft body glow below the curve */}
        <path d={FILL} fill="url(#wave-glow-fill)" />
        {/* Blurred bloom along the crest */}
        <path d={CURVE} stroke="url(#wave-glow-stroke)" strokeWidth="10" strokeLinecap="round" filter="url(#wave-blur)" opacity="0.7" />
        {/* Crisp luminous edge */}
        <path d={CURVE} stroke="url(#wave-glow-stroke)" strokeWidth="3.5" strokeLinecap="round" vectorEffect="non-scaling-stroke" />
      </svg>
    </div>
  );
}

export function WhoWorkingsIsFor() {
  return (
    <section id="who-its-for" className="surface-cream py-4 sm:py-6">
      <div className="surface-navy rounded-[5rem] mx-4 sm:mx-6 lg:mx-8 overflow-hidden">

        {/* Header text */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 sm:pt-32 pb-10 sm:pb-14 text-center">
          <div className="mx-auto max-w-3xl">
            <p className="eyebrow mb-5 text-blue">
              Who <em className="italic">Workings</em> is for
            </p>
            <h2 className="font-display text-[2rem] sm:text-[3rem] leading-[1.08]">
              Wherever authorship matters.
            </h2>
            <p className="font-subtitle mt-5 text-[1.02rem] leading-relaxed text-cream/70 mx-auto max-w-[52ch]">
              Authorship isn&apos;t only contested in one place. The student defending their thesis, the company
              proving its value, the writer protecting their voice - they all need the same thing: evidence of how the
              work was made.
            </p>
          </div>
        </div>

        {/* Wave — full-bleed between header and cards */}
        <GradientWave />

        {/* Cards */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-24 sm:pb-32">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7 lg:gap-8 items-stretch">
            {audiences.map((item, i) => (
              <AudienceCard key={item.eyebrow} item={item} index={i} />
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
