'use client';

import { motion } from 'framer-motion';
import { Section } from './Section';

const steps = [
  {
    number: '01',
    icon: '/images/step-install.svg',
    iconAlt: 'Workings app running on a desktop',
    title: (
      <>
        Install &amp; run <em className="italic">Workings</em>
      </>
    ),
    description:
      "Download the app and turn it on. You decide when it's running, and your work stays on your device.",
  },
  {
    number: '02',
    icon: '/images/step-record.svg',
    iconAlt: 'A recording locked privately on your device',
    title: 'Record your process, privately',
    description:
      'It records your screen and keystrokes while you work - locally, encrypted, only when you choose. Nothing leaves your device but an anonymous fingerprint.',
  },
  {
    number: '03',
    icon: '/images/step-generate.svg',
    iconAlt: 'A verified report generated from your record',
    title: 'Generate what you need',
    description:
      'Turn your record into a report, a summary, or a timelapse - all independently verifiable. Review & redact privately, share what you choose.',
  },
];

function StepCard({ step, index }: { step: (typeof steps)[number]; index: number }) {
  return (
    <motion.div
      className="card-on-cream p-8 sm:p-10 h-full"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ delay: index * 0.12, duration: 0.6, ease: 'easeOut' }}
    >
      <span className="font-display text-5xl sm:text-6xl text-blue leading-none block mb-6">{step.number}</span>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={step.icon} alt={step.iconAlt} className="h-20 w-auto mb-6" />
      <h3 className="text-xl sm:text-2xl font-semibold text-navy mb-3 leading-snug">{step.title}</h3>
      <p className="font-subtitle text-mute text-sm sm:text-base leading-relaxed">{step.description}</p>
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
      surface="cream"
      id="process"
      eyebrow="How it works"
      title="Three steps to evidence of how your work was made."
      intro="Run it, work as you always have, and turn your process into a record anyone can independently verify."
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
