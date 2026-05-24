'use client';

import { motion } from 'framer-motion';
import { Section } from './Section';

const steps = [
  {
    number: '01',
    title: 'Install & run Workings',
    description:
      'Download the app and start it on your device. It runs quietly in the background while you work.',
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
        <polyline points="7 10 12 15 17 10" />
        <line x1="12" y1="15" x2="12" y2="3" />
      </svg>
    ),
  },
  {
    number: '02',
    title: 'Record your process, privately',
    description:
      'Workings captures your creative process locally on your device. Nothing leaves your machine without your permission.',
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
        <circle cx="12" cy="16" r="1" />
      </svg>
    ),
  },
  {
    number: '03',
    title: 'Generate a report',
    description:
      'Create a verifiable report that proves how your work was made. Share it with anyone who needs to see your process.',
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <path d="M9 15l2 2 4-4" />
      </svg>
    ),
  },
];

function StepCard({ step, index }: { step: (typeof steps)[number]; index: number }) {
  return (
    <motion.div
      className="card-on-navy p-8 sm:p-10 h-full"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ delay: index * 0.12, duration: 0.6, ease: 'easeOut' }}
    >
      <div className="flex items-center justify-between mb-8">
        <span className="font-display text-5xl sm:text-6xl text-blue leading-none">
          {step.number}
        </span>
        <div className="flex items-center justify-center w-12 h-12 rounded-xl border border-blue/30 text-blue">
          {step.icon}
        </div>
      </div>
      <h3 className="text-xl sm:text-2xl font-semibold text-cream mb-3 leading-snug">
        {step.title}
      </h3>
      <p className="text-cream/65 text-sm sm:text-base leading-relaxed">
        {step.description}
      </p>
    </motion.div>
  );
}

function Connector() {
  return (
    <div className="hidden lg:flex items-center justify-center self-center text-blue/60">
      <svg width="28" height="12" viewBox="0 0 28 12" fill="none">
        <path d="M0 6h24m0 0l-5-5m5 5l-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  );
}

export function HowItWorks() {
  return (
    <Section
      surface="navy"
      id="how-it-works"
      eyebrow="How it works"
      title="Three simple steps"
      intro="Protect your creative integrity without changing how you work."
    >
      <div className="mt-16 sm:mt-20 grid grid-cols-1 lg:grid-cols-[1fr_auto_1fr_auto_1fr] gap-6 lg:gap-4 items-stretch">
        <StepCard step={steps[0]} index={0} />
        <Connector />
        <StepCard step={steps[1]} index={1} />
        <Connector />
        <StepCard step={steps[2]} index={2} />
      </div>
    </Section>
  );
}
