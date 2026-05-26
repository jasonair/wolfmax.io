'use client';

import { useSyncExternalStore } from 'react';
import type { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { Eyebrow } from '@/components/Eyebrow';
import { Button } from '@/components/Button';

type Tab = 'educators' | 'businesses';

const HERO: Record<Tab, { eyebrow: string; title: string; sub: ReactNode; ctaHref: string; ctaLabel: string; meta: string }> = {
  educators: {
    eyebrow: 'For educators',
    title: 'Students show their work.',
    sub: 'And you see the genuine effort behind it - no surveillance, no accusation.',
    ctaHref: 'mailto:universities@workings.io?subject=University%20demo%20request',
    ctaLabel: 'Book a demo',
    meta: 'Currently piloting · UK · Australia',
  },
  businesses: {
    eyebrow: 'For businesses',
    title: 'Prove the human work behind everything you deliver.',
    sub: (
      <>
        AI is in every deliverable now. <em className="italic">Workings</em> gives you a verifiable
        record of how it was used and where your people added value, stored securely and shared only
        when your team chooses. So when a client, regulator, or your own leadership asks, you answer
        with evidence, not assurances.
      </>
    ),
    ctaHref: 'mailto:business@workings.io?subject=Workings%20for%20business%20-%20demo',
    ctaLabel: 'Book a demo',
    meta: 'Currently piloting · Creative agency · London',
  },
};

const EDU_CARDS = [
  {
    title: 'Long-form written work',
    description:
      'Theses, dissertations, essays, research papers. Students attach a verifiable process report - no detection guesswork required.',
    icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z',
  },
  {
    title: 'Exams & assessments',
    description:
      'Timed take-home and open-book exams. A tamper-evident record of the session - without invasive screen or camera proctoring.',
    icon: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z',
  },
  {
    title: 'Productivity insights',
    description:
      'Private feedback for students on research-to-writing ratios, revision patterns, and deep-work stretches - so they build better habits.',
    icon: 'M3 3v18h18M7 14l4-4 4 4 6-6',
  },
  {
    title: 'Understand AI use & evolve policy',
    description:
      'Aggregate, anonymised insight into how students actually use AI - so academic-integrity policy can evolve with real evidence.',
    icon: 'M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
  },
];

// Icons reused from the previous BIZ_CARDS set, remapped to the nearest meaning
// for each new card (person, clipboard-check, bar chart, lock, lightning, people).
const BIZ_CARDS_PROOF = [
  {
    title: 'Prove genuine human authorship.',
    description:
      "Show how critical work was made with a timestamped, verifiable record. Establish when work was created, that it was developed independently, and that it's yours.",
    icon: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z',
  },
  {
    title: "Prove you're following your AI policy.",
    description:
      'Demonstrate to clients and regulators that teams work within your rules, backed by evidence rather than a written document.',
    icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4',
  },
  {
    title: 'Settle disputes and win pitches.',
    description:
      'Resolve billing or scope questions, and stand out in tenders, with a defensible record of who did what and when.',
    icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z',
  },
  {
    title: 'Reduce your liability exposure.',
    description:
      'A tamper-evident audit trail that supports your regulatory obligations and strengthens professional-indemnity conversations.',
    icon: 'M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z',
  },
];

// "Beyond proof" — utility uses of the same captured-process record. Reuses
// the existing single-path SVG icon convention (24x24 viewBox, strokeWidth 1.8
// via CardGrid). Icon picks: search, clock-rewind, users, sparkles, plus.
const BIZ_CARDS_BEYOND = [
  {
    title: 'Find anything.',
    description:
      'Search your entire workflow history to find a message, page, or document you saw earlier, whatever app it was in.',
    icon: 'M21 21l-4.35-4.35M17 10a7 7 0 11-14 0 7 7 0 0114 0z',
  },
  {
    title: 'Recover lost work.',
    description:
      'Scroll back through recent workflows to piece work together again quickly after data loss.',
    icon: 'M3 12a9 9 0 109-9 9.75 9.75 0 00-6.74 2.74L3 8M3 3v5h5M12 7v5l4 2',
  },
  {
    title: 'See how your team works.',
    description:
      'Understand how long a deliverable took, who contributed what, and where the information came from.',
    icon: 'M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2M9 11a4 4 0 100-8 4 4 0 000 8zM23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75',
  },
  {
    title: "Improve your team's use of AI.",
    description:
      'See how people use AI tools as they work, who is getting the most from them, and where there is room to improve.',
    icon: 'M12 3l1.5 4.5L18 9l-4.5 1.5L12 15l-1.5-4.5L6 9l4.5-1.5zM18 16l.5 1.5L20 18l-1.5.5L18 20l-.5-1.5L16 18l1.5-.5zM5 15l.5 1.5L7 17l-1.5.5L5 19l-.5-1.5L3 17l1.5-.5z',
  },
];

const BIZ_CARDS_BEYOND_WIDE = [
  {
    title: '…and more possibilities.',
    description:
      'The technology underneath has uses well beyond what Workings does today. Tell us what you would want to build.',
    icon: 'M12 5v14M5 12h14',
  },
];

const BIZ_CARDS_HOW = [
  {
    title: 'You set the policy.',
    description:
      "Choose what's captured, what stays private, and what your team shares. Run it as a full audit trail, or let staff opt in and share their best AI practice with colleagues. Your compliance needs, your culture, your call.",
    icon: 'M13 10V3L4 14h7v7l9-11h-7z',
  },
  {
    title: 'Visibility your team consents to.',
    description:
      'Everything is captured locally and shared only when people choose. Transparency, not surveillance.',
    icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z',
  },
];

const EDU_BULLETS = [
  'Direct line to engineering during the pilot',
  'Staff training & report interpretation',
  'No detection - verifiable process evidence',
  'Anonymised institutional insight on AI use',
];

function CardGrid({ cards, cols }: { cards: { title: string; description: string; icon: string }[]; cols: string }) {
  return (
    <div className={`grid grid-cols-1 ${cols} gap-5 sm:gap-6`}>
      {cards.map((c, i) => (
        <motion.div
          key={c.title}
          className="card-on-navy p-7 sm:p-8 h-full"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ delay: i * 0.06, duration: 0.55, ease: 'easeOut' }}
        >
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue/[0.18] text-blue mb-5">
            <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d={c.icon} />
            </svg>
          </div>
          <h3 className="text-base font-bold text-cream mb-2.5 leading-snug">{c.title}</h3>
          <p className="text-cream/70 text-sm leading-relaxed">{c.description}</p>
        </motion.div>
      ))}
    </div>
  );
}

function EducatorsPanel() {
  return (
    <>
      <section className="surface-navy px-4 sm:px-6 lg:px-8 py-24 sm:py-28">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <Eyebrow className="text-blue mb-5">What it&apos;s used for</Eyebrow>
            <h2 className="font-display text-[1.7rem] sm:text-[2.5rem] leading-[1.1] text-cream">
              Four places <em className="italic">Workings</em> replaces detection guesswork.
            </h2>
          </div>
          <CardGrid cards={EDU_CARDS} cols="sm:grid-cols-2 lg:grid-cols-4" />
        </div>
      </section>

      <section className="surface-cream px-4 sm:px-6 lg:px-8 py-24 sm:py-28">
        <div className="max-w-5xl mx-auto">
          <div className="surface-blue rounded-[28px] px-8 py-12 sm:px-12 sm:py-14 grid grid-cols-1 lg:grid-cols-[1.3fr_1fr] gap-10 lg:gap-12 items-center text-white">
            <div>
              <Eyebrow className="text-white/70 mb-3">Pilot with us</Eyebrow>
              <h3 className="font-display text-[1.5rem] sm:text-[1.95rem] leading-[1.1] mb-4">
                Run a pilot with your faculty this semester.
              </h3>
              <p className="text-white/85 leading-relaxed mb-6 max-w-[56ch]">
                We work with academic-integrity teams, faculty, and IT to deploy <em className="italic">Workings</em> to
                specific cohorts or assessments. Pilots typically run a semester and include staff training.
              </p>
              <a
                href="mailto:universities@workings.io?subject=Pilot%20enquiry"
                className="group inline-flex items-center gap-2 rounded-full bg-cream px-6 py-3 font-semibold text-navy transition-transform hover:-translate-y-0.5"
              >
                Talk to our team
                <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="transition-transform group-hover:translate-x-0.5">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </a>
            </div>
            <ul className="flex flex-col gap-3.5">
              {EDU_BULLETS.map((b) => (
                <li key={b} className="flex items-start gap-2.5 text-white/90 text-[0.95rem]">
                  <span className="mt-0.5 text-cream">✓</span>
                  {b}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}

function BusinessesPanel() {
  return (
    <>
      <section className="surface-navy px-4 sm:px-6 lg:px-8 py-24 sm:py-28">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <Eyebrow className="text-blue mb-5">Proof, not assurances</Eyebrow>
            <h2 className="font-display text-[1.7rem] sm:text-[2.5rem] leading-[1.1] text-cream">
              Proof of the work, control for the people behind it.
            </h2>
          </div>

          {/* Group 1: What you can prove */}
          <div className="mb-14 sm:mb-16">
            <Eyebrow className="text-cream/55 mb-6">What you can prove</Eyebrow>
            <CardGrid cards={BIZ_CARDS_PROOF} cols="sm:grid-cols-2 lg:grid-cols-4" />
          </div>

          {/* Group 2: Beyond proof — four cards over one full-width card.
              mt-5 sm:mt-6 between the rows matches CardGrid's internal gap. */}
          <div className="mb-14 sm:mb-16">
            <Eyebrow className="text-cream/55 mb-6">Beyond proof</Eyebrow>
            <CardGrid cards={BIZ_CARDS_BEYOND} cols="sm:grid-cols-2 lg:grid-cols-4" />
            <div className="mt-5 sm:mt-6">
              <CardGrid cards={BIZ_CARDS_BEYOND_WIDE} cols="grid-cols-1" />
            </div>
          </div>

          {/* Group 3: How it works for everyone */}
          <div>
            <Eyebrow className="text-cream/55 mb-6">How it works for everyone</Eyebrow>
            <CardGrid cards={BIZ_CARDS_HOW} cols="sm:grid-cols-2" />
          </div>
        </div>
      </section>

      <section className="surface-cream px-4 sm:px-6 lg:px-8 py-24 sm:py-28">
        <div className="max-w-5xl mx-auto">
          <div className="surface-blue rounded-[28px] px-8 py-12 sm:px-12 sm:py-16 text-center text-white">
            <div className="max-w-2xl mx-auto">
              <Eyebrow className="text-white/70 mb-3">For business</Eyebrow>
              <h3 className="font-display text-[1.5rem] sm:text-[1.95rem] leading-[1.1] mb-4">
                See how <em className="italic">Workings</em> fits your AI policy.
              </h3>
              <p className="text-white/85 leading-relaxed mb-7">
                A short call with our team - we&apos;ll walk through reports, policy use-cases, and what an internal
                pilot would look like for your organisation.
              </p>
              <a
                href="mailto:business@workings.io?subject=Workings%20for%20business%20-%20demo"
                className="group inline-flex items-center gap-2 rounded-full bg-cream px-6 py-3 font-semibold text-navy transition-transform hover:-translate-y-0.5"
              >
                Book a demo
                <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="transition-transform group-hover:translate-x-0.5">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

// The active tab is derived from the URL hash, an external mutable source, so
// we read it with useSyncExternalStore (correct SSR/hydration, no setState).
const getTabSnapshot = (): Tab =>
  typeof window !== 'undefined' && window.location.hash.replace('#', '') === 'businesses'
    ? 'businesses'
    : 'educators';

const getServerTabSnapshot = (): Tab => 'educators';

function subscribeHash(onStoreChange: () => void) {
  let lastHash = window.location.hash;
  const handler = () => {
    // Ignore history updates that don't change the hash - Next.js calls
    // replaceState for scroll restoration, and we only care about tab changes.
    if (window.location.hash === lastHash) return;
    lastHash = window.location.hash;
    // Defer the notification: Next.js calls the wrapped history methods during
    // its navigation commit (an insertion-effect phase), and scheduling a
    // re-render synchronously there triggers React's "useInsertionEffect must
    // not schedule updates" warning. A microtask runs after that phase unwinds.
    queueMicrotask(onStoreChange);
  };
  window.addEventListener('hashchange', handler);

  // Next.js client navigation (e.g. the navbar's Education/Business links)
  // changes the hash via history.pushState, which does NOT fire a `hashchange`
  // event. Wrap pushState/replaceState so the store is notified either way.
  const origPush = history.pushState.bind(history);
  const origReplace = history.replaceState.bind(history);
  history.pushState = (...args) => {
    origPush(...args);
    handler();
  };
  history.replaceState = (...args) => {
    origReplace(...args);
    handler();
  };

  return () => {
    window.removeEventListener('hashchange', handler);
    history.pushState = origPush;
    history.replaceState = origReplace;
  };
}

export default function InstitutionsPage() {
  const tab = useSyncExternalStore(subscribeHash, getTabSnapshot, getServerTabSnapshot);

  // Both heroes and both panels are rendered into the HTML so crawlers and AI
  // agents see the full content for either audience; only the active tab is
  // shown (the inactive one is hidden via the `hidden` attribute).
  return (
    <main>
      {/* Hero */}
      <section className="surface-cream px-4 sm:px-6 lg:px-8 pt-36 pb-16 sm:pt-44 sm:pb-20 text-center">
        <div className="max-w-3xl mx-auto">
          {(['educators', 'businesses'] as Tab[]).map((t) => {
            const hero = HERO[t];
            return (
              <div key={t} hidden={tab !== t}>
                <Eyebrow className="text-mute mb-5">{hero.eyebrow}</Eyebrow>
                <h1 className="font-display text-[2.4rem] sm:text-6xl text-navy leading-[1.04] mb-6 max-w-[16ch] mx-auto">
                  {hero.title}
                </h1>
                <p className="text-base sm:text-lg text-mute max-w-xl mx-auto leading-relaxed mb-8">{hero.sub}</p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <Button href={hero.ctaHref} variant="blue" withArrow>
                    {hero.ctaLabel}
                  </Button>
                  <Button href="/faq" variant="ghost-navy">
                    Read FAQ
                  </Button>
                </div>
                <p className="eyebrow text-mute mt-7">{hero.meta}</p>
              </div>
            );
          })}
        </div>
      </section>

      <div hidden={tab !== 'educators'}>
        <EducatorsPanel />
      </div>
      <div hidden={tab !== 'businesses'}>
        <BusinessesPanel />
      </div>
    </main>
  );
}
