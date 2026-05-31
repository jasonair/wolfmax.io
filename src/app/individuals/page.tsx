'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Eyebrow } from '@/components/Eyebrow';
import { Button } from '@/components/Button';
import { useWaitlist } from '@/components/waitlist/WaitlistProvider';

const works = [
  {
    title: 'Students',
    description:
      'Your thinking, captured as you work. Submit essays and theses with the whole process behind them, so you can show not just the answer but how you got there. The depth is part of the record.',
  },
  {
    title: 'Writers',
    description:
      "Every draft and rewrite, captured as you write. Walk into the room able to lay out the full arc of the work, from first line to final cut. The byline's yours, and so is the story of how it got there.",
  },
  {
    title: 'Creators',
    description:
      "Your process, from blank canvas to finished piece. Put the craft forward, the hours and the decisions most people never see. Let the making be part of what you're known for.",
  },
  {
    title: 'Inventors',
    description:
      'Your invention documented from first idea to final design. Prove the human contribution behind it, and exactly when it happened - both critical for patent applications in the new AI era.',
  },
];

const crossLinks = [
  { title: 'Education', sub: 'Academic integrity, essays, exams', href: '/institutions#educators' },
  { title: 'Business', sub: 'AI policy, compliance, team visibility', href: '/institutions#businesses' },
];

const Arrow = ({ className = '' }: { className?: string }) => (
  <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
  </svg>
);

export default function IndividualsPage() {
  const { open } = useWaitlist();

  return (
    <main>
      {/* Hero */}
      <section className="surface-cream px-4 sm:px-6 lg:px-8 pt-36 pb-20 sm:pt-44 sm:pb-24 text-center">
        <motion.div
          className="max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Eyebrow className="text-mute mb-5">For individuals</Eyebrow>
          <h1 className="font-display text-[2.4rem] sm:text-6xl text-navy leading-[1.04] mb-6">
            Record your process, protect your work.
          </h1>
          <p className="text-base sm:text-lg text-mute max-w-xl mx-auto leading-relaxed mb-8">
            For students, writers, creators, inventors and anyone whose authorship matters. Capture how you work -
            privately, on your device - and share verifiable proof when it counts.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button variant="peach" withArrow onClick={open}>
              Join the waitlist
            </Button>
            <Button href="/faq" variant="ghost-navy">
              Read FAQ
            </Button>
          </div>
        </motion.div>
      </section>

      {/* Four kinds of work */}
      <section className="surface-navy px-4 sm:px-6 lg:px-8 py-24 sm:py-28">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <Eyebrow className="text-blue mb-5">For people who make things</Eyebrow>
            <h2 className="font-display text-[2rem] sm:text-[3rem] leading-[1.08] text-cream">
              Four kinds of work. One kind of proof.
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
            {works.map((w, i) => (
              <motion.div
                key={w.title}
                className="card-on-navy group p-7 sm:p-8 h-full"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ delay: i * 0.08, duration: 0.6, ease: 'easeOut' }}
              >
                <div className="flex items-center gap-4 mb-6">
                  <span className="h-[3px] w-9 rounded-full bg-blue transition-all duration-300 group-hover:w-12" />
                  <span className="h-px flex-1 bg-cream/12 transition-colors group-hover:bg-blue/40" />
                </div>
                <h3 className="text-[1.4rem] font-bold text-cream mb-3 leading-[1.15] tracking-tight">{w.title}</h3>
                <p className="text-cream/65 text-sm leading-relaxed">{w.description}</p>
              </motion.div>
            ))}
          </div>
          <p className="mt-10 sm:mt-12 text-center text-cream/75 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            If your work is ever questioned, you hold the evidence of exactly how and when it was created.
          </p>
        </div>
      </section>

      {/* Waitlist CTA */}
      <section className="surface-cream px-4 sm:px-6 lg:px-8 py-24 sm:py-28">
        <div className="max-w-5xl mx-auto">
          <motion.div
            className="surface-blue rounded-[28px] px-8 py-12 sm:px-12 sm:py-16 text-center text-white"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6 }}
          >
            <Eyebrow className="text-white/70 mb-4">Early access</Eyebrow>
            <h2 className="font-display text-[1.8rem] sm:text-[2.8rem] leading-[1.05] mb-4 max-w-[20ch] mx-auto">
              If your work matters, your process matters.
            </h2>
            <p className="text-white/85 max-w-xl mx-auto leading-relaxed mb-8">
              Join the waitlist and we&apos;ll let you know as we open beta access. Three quick questions when you sign
              up - helps us shape the beta around real users.
            </p>
            <button
              onClick={open}
              className="group inline-flex items-center gap-2 rounded-full bg-peach px-7 py-3.5 font-semibold text-navy shadow-[0_8px_24px_rgba(244,184,154,0.4)] transition-transform hover:-translate-y-0.5"
            >
              Join the waitlist
              <Arrow className="transition-transform group-hover:translate-x-0.5" />
            </button>
          </motion.div>
        </div>
      </section>

      {/* Cross-links */}
      <section className="surface-navy px-4 sm:px-6 lg:px-8 pt-16 pb-24">
        <div className="max-w-3xl mx-auto">
          <Eyebrow className="text-cream/55 text-center block mb-8">Also for organisations</Eyebrow>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {crossLinks.map((c) => (
              <Link
                key={c.title}
                href={c.href}
                className="group flex items-center justify-between rounded-2xl border border-cream/12 bg-white/[0.04] px-6 py-5 transition-colors hover:border-blue hover:bg-white/[0.07]"
              >
                <span>
                  <strong className="block text-base font-bold text-cream">{c.title}</strong>
                  <small className="text-sm text-cream/60">{c.sub}</small>
                </span>
                <Arrow className="text-cream/70 transition-transform group-hover:translate-x-0.5" />
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
