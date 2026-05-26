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
    icon: 'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253',
  },
  {
    title: 'Writers',
    description:
      "Every draft and rewrite, captured as you write. Walk into the room able to lay out the full arc of the work, from first line to final cut. The byline's yours, and so is the story of how it got there.",
    icon: 'M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z',
  },
  {
    title: 'Creators',
    description:
      "Your process, from blank canvas to finished piece. Put the craft forward, the hours and the decisions most people never see. Let the making be part of what you're known for.",
    icon: 'M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z',
  },
  {
    title: 'Inventors',
    description:
      'Your invention documented from first idea to final design. Prove the human contribution behind it, and exactly when it happened - both critical for patent applications in the new AI era.',
    icon: 'M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z',
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
                className="card-on-navy p-7 sm:p-8 h-full"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ delay: i * 0.08, duration: 0.6, ease: 'easeOut' }}
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue/[0.18] text-blue mb-5">
                  <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d={w.icon} />
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-cream mb-2.5">{w.title}</h3>
                <p className="text-cream/70 text-sm leading-relaxed">{w.description}</p>
              </motion.div>
            ))}
          </div>
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
