'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { Section } from '@/components/Section';
import { Button } from '@/components/Button';

const values = [
  {
    title: 'Privacy First',
    short: 'We believe privacy is a right, not a feature.',
    long: 'Every architectural decision starts with the question: does this protect the user? We never compromise on this, even when it makes things harder to build. Your data stays yours — that principle drives everything we do.',
    stat: '0',
    statLabel: 'bytes sent to our servers',
  },
  {
    title: 'Trust Through Transparency',
    short: 'We build in the open and earn trust through action.',
    long: 'No black boxes, no hidden agendas. We publish our architecture, open-source our verification protocol, and invite scrutiny. Trust isn\'t claimed — it\'s demonstrated.',
    stat: '100%',
    statLabel: 'open verification protocol',
  },
  {
    title: 'Creator Advocates',
    short: 'We exist to protect the people who make things.',
    long: 'Creators are under siege from false AI accusations, broken detection tools, and eroding trust. We\'re building the tools that put power back in their hands — proving process without surrendering privacy.',
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
    email: 'contact@workings.io?subject=Application%20—%20Senior%20Backend%20Engineer',
  },
  {
    title: 'Product Designer',
    type: 'Full-time',
    location: 'Remote',
    description: 'Designing privacy-first experiences for creators.',
    details: [
      'Own the end-to-end design of the Workings experience',
      'Design the verification interface and process report visualizations',
      'Create intuitive flows for complex privacy controls',
      'Conduct user research with students, writers, and creative professionals',
    ],
    stack: ['Figma', 'Prototyping', 'User Research', 'Design Systems'],
    email: 'contact@workings.io?subject=Application%20—%20Product%20Designer',
  },
  {
    title: 'Developer Relations',
    type: 'Full-time',
    location: 'Remote',
    description: 'Building community and supporting developers integrating Workings.',
    details: [
      'Create SDKs, documentation, and integration guides',
      'Build relationships with university IT departments and LMS platforms',
      'Speak at conferences and represent Workings in the developer community',
      'Gather feedback and champion developer needs internally',
    ],
    stack: ['Technical Writing', 'SDKs', 'Community', 'Public Speaking'],
    email: 'contact@workings.io?subject=Application%20—%20Developer%20Relations',
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
    email: 'contact@workings.io?subject=Application%20—%20Security%20Researcher',
  },
];

function ValueCard({ value, index }: { value: typeof values[number]; index: number }) {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <motion.div
      className="relative cursor-pointer"
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
            className="card-on-navy absolute inset-0 p-8 flex flex-col justify-between"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <div>
              <span className="font-display text-4xl sm:text-5xl text-blue block mb-1">
                {value.stat}
              </span>
              <span className="eyebrow text-blue block mb-6">{value.statLabel}</span>

              <div className="w-8 h-px bg-blue/30 mb-6" />

              <h3 className="font-display text-xl text-cream mb-2">{value.title}</h3>
              <p className="text-cream/60 text-sm leading-relaxed">{value.short}</p>
            </div>

            <div className="flex items-center gap-2 mt-4">
              <span className="text-xs text-cream/40">Click to learn more</span>
              <motion.div
                animate={{ x: [0, 4, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
              >
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-cream/40">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </motion.div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="back"
            className="card-on-navy absolute inset-0 p-8 flex flex-col justify-between"
            style={{ borderColor: 'rgba(0, 72, 255, 0.35)', background: 'rgba(0, 72, 255, 0.06)' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <div>
              <h3 className="font-display text-lg text-cream mb-4">{value.title}</h3>
              <p className="text-cream/60 text-sm leading-[1.8]">{value.long}</p>
            </div>
            <div className="flex items-center gap-2 mt-4">
              <span className="text-xs text-blue">Click to go back</span>
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
      <div className="card-on-cream overflow-hidden transition-all duration-300">
        {/* Left accent */}
        <div className="absolute top-0 bottom-0 left-0 w-[3px] rounded-l-[22px] bg-blue" />

        {/* Main row */}
        <div
          className="p-6 sm:p-8 pl-8 sm:pl-10 cursor-pointer"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h3 className="font-display text-lg text-navy mb-2">{pos.title}</h3>
              <div className="flex items-center gap-3 mb-2">
                <span className="text-xs font-medium px-2.5 py-1 rounded-full border border-blue/25 text-blue bg-blue/6">
                  {pos.type}
                </span>
                <span className="text-xs text-mute">{pos.location}</span>
              </div>
              <p className="text-mute text-sm">{pos.description}</p>
            </div>

            {/* Expand toggle */}
            <motion.div
              className="shrink-0 w-10 h-10 rounded-xl bg-navy/5 border border-navy/10 flex items-center justify-center text-mute self-start sm:self-center"
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
              <div className="px-6 sm:px-8 pl-8 sm:pl-10 pb-8 border-t border-navy/10">
                <div className="pt-6 grid sm:grid-cols-[1fr_auto] gap-8">
                  {/* Responsibilities */}
                  <div>
                    <h4 className="eyebrow text-mute mb-3">What you&apos;ll do</h4>
                    <ul className="space-y-2.5">
                      {pos.details.map((detail, i) => (
                        <motion.li
                          key={i}
                          className="flex items-start gap-3 text-sm text-mute"
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.05 + 0.1, duration: 0.3 }}
                        >
                          <div className="w-1.5 h-1.5 rounded-full mt-1.5 shrink-0 bg-blue" />
                          {detail}
                        </motion.li>
                      ))}
                    </ul>

                    {/* Stack tags */}
                    <div className="mt-6">
                      <h4 className="eyebrow text-mute mb-3">Stack</h4>
                      <div className="flex flex-wrap gap-2">
                        {pos.stack.map((tech) => (
                          <span
                            key={tech}
                            className="text-xs px-3 py-1.5 rounded-lg bg-navy/5 border border-navy/10 text-mute font-mono"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Apply button */}
                  <div className="sm:self-end">
                    <Button variant="blue" href={`mailto:${pos.email}`} withArrow>
                      Apply Now
                    </Button>
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
    <>
      {/* Hero — cream surface */}
      <section className="surface-cream pt-32 sm:pt-40 pb-24 sm:pb-32">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.header
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <p className="eyebrow text-mute mb-5">Careers</p>
            <h1 className="font-display text-5xl sm:text-6xl md:text-7xl text-navy mb-6 tracking-tight">
              Join the <span className="text-blue">Team</span>
            </h1>
            <p className="text-mute text-xl max-w-2xl leading-relaxed mb-10">
              Help us build the future of creative integrity.
            </p>
            <div className="flex flex-wrap items-center gap-6 text-sm text-mute">
              {['Remote-first', 'Async culture', 'Competitive equity', 'Build what matters'].map((perk) => (
                <span key={perk} className="flex items-center gap-2">
                  <span className="w-1 h-1 rounded-full bg-blue/50" />
                  {perk}
                </span>
              ))}
            </div>
          </motion.header>
        </div>
      </section>

      {/* Values — navy surface */}
      <Section
        surface="navy"
        eyebrow="Our values"
        title="What We Stand For"
        align="left"
      >
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mt-14">
          {values.map((value, i) => (
            <ValueCard key={value.title} value={value} index={i} />
          ))}
        </div>
      </Section>

      {/* Open Positions — cream surface */}
      <Section
        surface="cream"
        eyebrow="Open positions"
        title="Join Us"
        intro="We're a small, remote-first team building something that matters."
        align="left"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-14">
          {positions.map((pos, i) => (
            <PositionCard key={pos.title} pos={pos} index={i} />
          ))}
        </div>
      </Section>

      {/* Bottom CTA — navy surface */}
      <Section surface="navy">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="eyebrow text-blue mb-4">Don&apos;t see your role?</p>
          <p className="font-display text-3xl sm:text-4xl text-cream mb-3">
            We&apos;re always looking for exceptional people.
          </p>
          <p className="text-cream/60 text-base mb-8 max-w-[48ch] mx-auto">
            If you believe in what we&apos;re building, reach out directly.
          </p>
          <Button
            variant="ghost-cream"
            href="mailto:contact@workings.io"
            withArrow
          >
            contact@workings.io
          </Button>
        </motion.div>
      </Section>
    </>
  );
}
