'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { FloatingParticles } from '@/components/FloatingParticles';
import { GradientOrbs } from '@/components/GradientOrbs';

const values = [
  {
    title: 'Privacy First',
    short: 'We believe privacy is a right, not a feature.',
    long: 'Every architectural decision starts with the question: does this protect the user? We never compromise on this, even when it makes things harder to build. Your data stays yours — that principle drives everything we do.',
    color: 'var(--brand-green)',
    stat: '0',
    statLabel: 'bytes sent to our servers',
  },
  {
    title: 'Trust Through Transparency',
    short: 'We build in the open and earn trust through action.',
    long: 'No black boxes, no hidden agendas. We publish our architecture, open-source our verification protocol, and invite scrutiny. Trust isn\'t claimed — it\'s demonstrated.',
    color: 'var(--brand-blue)',
    stat: '100%',
    statLabel: 'open verification protocol',
  },
  {
    title: 'Creator Advocates',
    short: 'We exist to protect the people who make things.',
    long: 'Creators are under siege from false AI accusations, broken detection tools, and eroding trust. We\'re building the tools that put power back in their hands — proving process without surrendering privacy.',
    color: 'var(--brand-purple)',
    stat: '∞',
    statLabel: 'creative processes worth protecting',
  },
];

const positions = [
  {
    title: 'Senior Backend Engineer',
    type: 'Full-time',
    location: 'Remote',
    description: 'Building the core recording and verification engine.',
    details: [
      'Design and implement the local capture agent and encryption layer',
      'Build tamper-evident report generation with hash chains',
      'Optimize for performance — the agent must be invisible to the user',
      'Work with cryptographic primitives and zero-knowledge proofs',
    ],
    stack: ['Rust', 'TypeScript', 'WebAssembly', 'SQLite'],
    color: 'var(--brand-red)',
    email: 'contact@wolfmax.io?subject=Application%20—%20Senior%20Backend%20Engineer',
  },
  {
    title: 'Product Designer',
    type: 'Full-time',
    location: 'Remote',
    description: 'Designing privacy-first experiences for creators.',
    details: [
      'Own the end-to-end design of the Wolfmax experience',
      'Design the verification interface and process report visualizations',
      'Create intuitive flows for complex privacy controls',
      'Conduct user research with students, writers, and creative professionals',
    ],
    stack: ['Figma', 'Prototyping', 'User Research', 'Design Systems'],
    color: 'var(--brand-purple)',
    email: 'contact@wolfmax.io?subject=Application%20—%20Product%20Designer',
  },
  {
    title: 'Developer Relations',
    type: 'Full-time',
    location: 'Remote',
    description: 'Building community and supporting developers integrating Wolfmax.',
    details: [
      'Create SDKs, documentation, and integration guides',
      'Build relationships with university IT departments and LMS platforms',
      'Speak at conferences and represent Wolfmax in the developer community',
      'Gather feedback and champion developer needs internally',
    ],
    stack: ['Technical Writing', 'SDKs', 'Community', 'Public Speaking'],
    color: 'var(--brand-blue)',
    email: 'contact@wolfmax.io?subject=Application%20—%20Developer%20Relations',
  },
  {
    title: 'Security Researcher',
    type: 'Contract',
    location: 'Remote',
    description: 'Auditing our encryption and privacy architecture.',
    details: [
      'Conduct security audits of the local capture and encryption pipeline',
      'Identify attack vectors against process report tamper-evidence',
      'Review our zero-knowledge privacy model for vulnerabilities',
      'Produce detailed reports and work with engineering to remediate',
    ],
    stack: ['Cryptography', 'Pen Testing', 'Threat Modeling', 'Security Audits'],
    color: 'var(--brand-green)',
    email: 'contact@wolfmax.io?subject=Application%20—%20Security%20Researcher',
  },
];

function ValueCard({ value, index }: { value: typeof values[number]; index: number }) {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <motion.div
      className="relative cursor-pointer perspective-[1000px]"
      style={{ minHeight: '280px' }}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ delay: index * 0.12, duration: 0.7, ease: 'easeOut' }}
      onClick={() => setIsFlipped(!isFlipped)}
    >
      <AnimatePresence mode="wait" initial={false}>
        {!isFlipped ? (
          <motion.div
            key="front"
            className="absolute inset-0 overflow-hidden rounded-2xl bg-white/[0.03] border border-white/[0.06] p-8 flex flex-col justify-between group hover:bg-white/[0.05] hover:border-white/[0.12] transition-all duration-500"
            initial={{ rotateY: -90, opacity: 0 }}
            animate={{ rotateY: 0, opacity: 1 }}
            exit={{ rotateY: 90, opacity: 0 }}
            transition={{ duration: 0.35 }}
          >
            {/* Corner gradient */}
            <div
              className="absolute top-0 right-0 w-40 h-40 opacity-[0.05] group-hover:opacity-[0.1] transition-opacity duration-500"
              style={{
                background: `radial-gradient(circle at top right, ${value.color}, transparent 70%)`,
              }}
            />

            <div>
              {/* Stat */}
              <motion.span
                className="text-4xl sm:text-5xl font-black block mb-1"
                style={{ color: value.color }}
              >
                {value.stat}
              </motion.span>
              <span className="text-xs text-gray-600 uppercase tracking-wider block mb-6">
                {value.statLabel}
              </span>

              {/* Divider */}
              <div className="w-8 h-px mb-6 opacity-30" style={{ background: value.color }} />

              <h3 className="text-xl font-bold text-white mb-2">{value.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{value.short}</p>
            </div>

            {/* Tap hint */}
            <div className="flex items-center gap-2 mt-4">
              <span className="text-xs text-gray-600">Click to learn more</span>
              <motion.div
                animate={{ x: [0, 4, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
              >
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-gray-600">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </motion.div>
            </div>

            {/* Bottom accent */}
            <div
              className="absolute bottom-0 left-8 right-8 h-px opacity-30"
              style={{
                background: `linear-gradient(90deg, transparent, ${value.color}, transparent)`,
              }}
            />
          </motion.div>
        ) : (
          <motion.div
            key="back"
            className="absolute inset-0 overflow-hidden rounded-2xl border p-8 flex flex-col justify-between"
            style={{
              borderColor: `color-mix(in srgb, ${value.color} 20%, transparent)`,
              background: `color-mix(in srgb, ${value.color} 3%, black)`,
            }}
            initial={{ rotateY: 90, opacity: 0 }}
            animate={{ rotateY: 0, opacity: 1 }}
            exit={{ rotateY: -90, opacity: 0 }}
            transition={{ duration: 0.35 }}
          >
            <div>
              <h3 className="text-lg font-bold text-white mb-4">{value.title}</h3>
              <p className="text-gray-300 text-sm leading-[1.8]">{value.long}</p>
            </div>
            <div className="flex items-center gap-2 mt-4">
              <span className="text-xs" style={{ color: value.color }}>Click to go back</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function PositionCard({ pos, index }: { pos: typeof positions[number]; index: number }) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <motion.div
      className="relative group"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ delay: index * 0.08, duration: 0.6, ease: 'easeOut' }}
    >
      <div className="relative overflow-hidden rounded-2xl bg-white/[0.03] border border-white/[0.06] transition-all duration-500 group-hover:bg-white/[0.05] group-hover:border-white/[0.12]">
        {/* Left accent */}
        <div
          className="absolute top-0 bottom-0 left-0 w-[3px]"
          style={{ background: pos.color }}
        />

        {/* Main row */}
        <div
          className="p-6 sm:p-8 pl-8 sm:pl-10 cursor-pointer"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h3 className="text-lg font-bold text-white mb-2">{pos.title}</h3>
              <div className="flex items-center gap-3 mb-2">
                <span
                  className="text-xs font-medium px-2.5 py-1 rounded-full border"
                  style={{
                    borderColor: `color-mix(in srgb, ${pos.color} 25%, transparent)`,
                    color: pos.color,
                    background: `color-mix(in srgb, ${pos.color} 6%, transparent)`,
                  }}
                >
                  {pos.type}
                </span>
                <span className="text-xs text-gray-600">{pos.location}</span>
              </div>
              <p className="text-gray-400 text-sm">{pos.description}</p>
            </div>

            {/* Expand toggle */}
            <motion.div
              className="shrink-0 w-10 h-10 rounded-xl bg-white/[0.04] border border-white/[0.06] flex items-center justify-center text-gray-500 self-start sm:self-center"
              animate={{ rotate: isExpanded ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </motion.div>
          </div>
        </div>

        {/* Expanded details */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.35, ease: 'easeInOut' }}
              className="overflow-hidden"
            >
              <div className="px-6 sm:px-8 pl-8 sm:pl-10 pb-8 border-t border-white/[0.05]">
                <div className="pt-6 grid sm:grid-cols-[1fr_auto] gap-8">
                  {/* Responsibilities */}
                  <div>
                    <h4 className="text-sm font-semibold text-white mb-3 uppercase tracking-wider">What you&apos;ll do</h4>
                    <ul className="space-y-2.5">
                      {pos.details.map((detail, i) => (
                        <motion.li
                          key={i}
                          className="flex items-start gap-3 text-sm text-gray-400"
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.05 + 0.1, duration: 0.3 }}
                        >
                          <div
                            className="w-1.5 h-1.5 rounded-full mt-1.5 shrink-0"
                            style={{ background: pos.color }}
                          />
                          {detail}
                        </motion.li>
                      ))}
                    </ul>

                    {/* Stack tags */}
                    <div className="mt-6">
                      <h4 className="text-sm font-semibold text-white mb-3 uppercase tracking-wider">Stack</h4>
                      <div className="flex flex-wrap gap-2">
                        {pos.stack.map((tech) => (
                          <span
                            key={tech}
                            className="text-xs px-3 py-1.5 rounded-lg bg-white/[0.04] border border-white/[0.06] text-gray-400"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Apply button */}
                  <div className="sm:self-end">
                    <motion.a
                      href={`mailto:${pos.email}`}
                      className="inline-flex items-center gap-2 px-7 py-3 bg-brand-red text-white font-bold rounded-full hover:scale-105 transition-transform pulse-glow text-sm whitespace-nowrap"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.97 }}
                    >
                      Apply Now
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </motion.a>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

export default function CareersPage() {
  return (
    <div className="relative bg-black">
      <div className="fixed inset-0 grid-bg pointer-events-none" />
      <FloatingParticles />
      <GradientOrbs />

      <main className="relative z-10 max-w-6xl mx-auto pt-32 sm:pt-40 pb-24 sm:pb-32 px-4 sm:px-6 lg:px-8">

        {/* Hero */}
        <motion.header
          className="max-w-6xl mx-auto mb-20 sm:mb-28"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold text-white mb-6 tracking-tight">
            Join the <span className="text-brand-purple">Pack</span>
          </h1>
          <p className="text-gray-400 text-xl max-w-2xl leading-relaxed mb-8">
            Help us build the future of creative integrity.
          </p>
          <div className="flex flex-wrap items-center gap-6 text-sm text-gray-500">
            {['Remote-first', 'Async culture', 'Competitive equity', 'Build what matters'].map((perk) => (
              <span key={perk} className="flex items-center gap-2">
                <span className="w-1 h-1 rounded-full bg-brand-purple/50" />
                {perk}
              </span>
            ))}
          </div>
        </motion.header>

        {/* Values - flippable cards */}
        <div className="mb-24 sm:mb-32">
          <motion.div
            className="mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-white">What We Stand For</h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {values.map((value, i) => (
              <ValueCard key={value.title} value={value} index={i} />
            ))}
          </div>
        </div>

        {/* Open Positions - expandable */}
        <div className="mb-24 sm:mb-32">
          <motion.header
            className="mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-3">Open Positions</h2>
            <p className="text-gray-500 text-lg">
              We&apos;re a small, remote-first team building something that matters.
            </p>
          </motion.header>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {positions.map((pos, i) => (
              <PositionCard key={pos.title} pos={pos} index={i} />
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <motion.div
          className="text-center pt-12 border-t border-white/[0.06]"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-gray-400 text-lg mb-2">
            Don&apos;t see your role?
          </p>
          <p className="text-gray-500 text-base mb-6">
            We&apos;re always looking for exceptional people.
          </p>
          <a
            href="mailto:contact@wolfmax.io"
            className="inline-flex items-center gap-2 text-brand-red hover:opacity-80 font-semibold transition text-lg group"
          >
            contact@wolfmax.io
            <svg className="w-5 h-5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
            </svg>
          </a>
        </motion.div>

      </main>
    </div>
  );
}
