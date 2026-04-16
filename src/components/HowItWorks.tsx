'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const steps = [
  {
    number: '01',
    title: 'Install & Run Wolfmax',
    description:
      'Download the app and start it on your device. It runs quietly in the background while you work.',
    color: 'var(--brand-red)',
    glowClass: 'glow-red',
    icon: (
      <svg
        width="28"
        height="28"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
        <polyline points="7 10 12 15 17 10" />
        <line x1="12" y1="15" x2="12" y2="3" />
      </svg>
    ),
  },
  {
    number: '02',
    title: 'Record Your Process, Privately',
    description:
      'Wolfmax captures your creative process locally on your device. Nothing leaves your machine without your permission.',
    color: 'var(--brand-purple)',
    glowClass: 'glow-purple',
    icon: (
      <svg
        width="28"
        height="28"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
        <circle cx="12" cy="16" r="1" />
      </svg>
    ),
  },
  {
    number: '03',
    title: 'Generate a Report',
    description:
      'Create a verifiable report that proves how your work was made. Share it with anyone who needs to see your process.',
    color: 'var(--brand-blue)',
    glowClass: 'glow-blue',
    icon: (
      <svg
        width="28"
        height="28"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <path d="M9 15l2 2 4-4" />
      </svg>
    ),
  },
];

function StepCard({
  step,
  index,
}: {
  step: (typeof steps)[number];
  index: number;
}) {
  return (
    <motion.div
      className="relative group"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ delay: index * 0.2, duration: 0.7, ease: 'easeOut' }}
    >
      {/* Card */}
      <div className="relative overflow-hidden rounded-2xl bg-white/[0.03] border border-white/[0.06] p-8 sm:p-10 h-full transition-all duration-500 group-hover:bg-white/[0.05] group-hover:border-white/[0.12]">
        {/* Ambient glow behind card on hover */}
        <div
          className="absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10 blur-xl"
          style={{ background: step.color, opacity: 0 }}
        />
        <motion.div
          className="absolute -inset-px rounded-2xl -z-10 blur-xl"
          style={{ background: step.color }}
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 0.08 }}
          transition={{ duration: 0.4 }}
        />

        {/* Icon - absolute top right */}
        <motion.div
          className="absolute top-8 sm:top-10 right-8 sm:right-10 flex items-center justify-center w-12 h-12 rounded-xl border overflow-hidden transition-colors duration-300"
          style={{
            borderColor: `color-mix(in srgb, ${step.color} 30%, transparent)`,
            color: step.color,
          }}
          whileHover={{ scale: 1.1 }}
          transition={{ type: 'spring', stiffness: 400, damping: 15 }}
        >
          {step.icon}
        </motion.div>

        {/* Step number */}
        <div className="mb-8">
          <span
            className="text-7xl sm:text-8xl font-black tracking-tighter leading-none opacity-60"
            style={{ color: step.color }}
          >
            {step.number}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-xl sm:text-2xl font-bold text-white mb-3 leading-snug">
          {step.title}
        </h3>

        {/* Description */}
        <p className="text-gray-400 text-sm sm:text-base leading-relaxed">
          {step.description}
        </p>

        {/* Bottom accent line */}
        <motion.div
          className="absolute bottom-0 left-8 right-8 h-px"
          style={{
            background: `linear-gradient(90deg, transparent, ${step.color}, transparent)`,
          }}
          initial={{ scaleX: 0, opacity: 0 }}
          whileInView={{ scaleX: 1, opacity: 0.4 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.2 + 0.5, duration: 0.8 }}
        />
      </div>
    </motion.div>
  );
}

function ConnectorArrow({ color }: { color: string }) {
  return (
    <div className="hidden lg:flex items-center justify-center self-center -mx-3">
      <motion.div
        initial={{ opacity: 0, scaleX: 0 }}
        whileInView={{ opacity: 1, scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.6, duration: 0.5 }}
        className="flex items-center gap-1"
      >
        <div
          className="w-8 h-px"
          style={{
            background: `linear-gradient(90deg, transparent, ${color})`,
          }}
        />
        <svg
          width="8"
          height="12"
          viewBox="0 0 8 12"
          fill="none"
          style={{ color }}
        >
          <path
            d="M1.5 1L6.5 6L1.5 11"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </motion.div>
    </div>
  );
}

export function HowItWorks() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

  return (
    <section
      id="how-it-works"
      ref={sectionRef}
      className="relative py-24 sm:py-32 px-4 sm:px-6 lg:px-8"
    >
      {/* Section header */}
      <div className="max-w-4xl mx-auto text-center mb-16 sm:mb-20">
        <motion.p
          className="text-sm font-medium tracking-widest uppercase mb-4"
          style={{ color: 'var(--brand-red)' }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          How it works
        </motion.p>
        <motion.h2
          className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1, duration: 0.6 }}
        >
          Three simple steps
        </motion.h2>
        <motion.p
          className="text-gray-400 text-base sm:text-lg max-w-lg mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          Protect your creative integrity without changing how you work
        </motion.p>
      </div>

      {/* Steps grid */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-[1fr_auto_1fr_auto_1fr] gap-6 lg:gap-0 items-stretch">
        <StepCard step={steps[0]} index={0} />
        <ConnectorArrow color="var(--brand-red)" />
        <StepCard step={steps[1]} index={1} />
        <ConnectorArrow color="var(--brand-purple)" />
        <StepCard step={steps[2]} index={2} />
      </div>
    </section>
  );
}
