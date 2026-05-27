'use client';

import { useEffect, useLayoutEffect, useState } from 'react';
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
    title: 'Surface the human work behind everything you deliver.',
    sub: (
      <>
        AI is in every deliverable now. <em className="italic">Workings</em> gives you a verifiable
        record of how it was used and where your people added value, stored securely and shared only
        when your team chooses. So when a client, regulator, or your own leadership asks, you answer
        with evidence.
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

// "What you can prove" — four benefit cards. Order: authorship, merged
// policy/compliance, disputes/pitches, then verify hires (promoted from the
// old recruitment footnote). Icons refreshed to match each card's meaning:
// pen for authorship, shield-check for regulatory compliance, bar chart for
// defensible record, user-check for hires.
const BIZ_CARDS_PROOF = [
  {
    title: 'Prove genuine human authorship',
    description:
      "Show how critical work was made, with a timestamped, verifiable record. Establish when it was created, that it was developed independently, and that it's yours.",
    // Pen / signature — reads as "authorship"
    icon: 'M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z',
  },
  {
    title: 'Prove policy and regulatory compliance',
    description:
      "Give clients and regulators a tamper-evident record of how your team's work was produced - clear evidence when questions arise about process or authorship.",
    // Shield-check — protection + verified compliance
    icon: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z',
  },
  {
    title: 'Settle disputes and win pitches',
    description:
      'Resolve billing or scope questions, and stand out in tenders, with a defensible record of who did what, and when.',
    // Bar chart — defensible record / evidence
    icon: 'M3 3v18h18M8 17V9M13 17V5M18 17v-3',
  },
  {
    title: 'Fix hiring funnel',
    description:
      'Candidates work as normal for remote assessment, sharing a verified record of their process - preventing spam and enabling them to differentiate their application.',
    // User-check — verified person
    icon: 'M16 21v-2a4 4 0 00-4-4H6a4 4 0 00-4 4v2M9 11a4 4 0 100-8 4 4 0 000 8zM16 11l2 2 4-4',
  },
];

// "Who it's for" — three audience segments. Rendered as stacked rows (not
// cards) so they read lighter than the benefit grid above.
const WHO_ITS_FOR = [
  {
    title: 'Creative agencies, studios & media',
    badge: 'Currently piloting',
    description:
      'Show clients the human craft behind the deliverable, and protect your originality, your billables, and your reputation in a market where AI-made work is everywhere.',
  },
  {
    title: 'Law firms & consulting',
    description:
      'Demonstrate that high-value deliverables are genuine human work product, not AI output billed at premium rates. A defensible record behind every engagement and every invoice.',
  },
  {
    title: 'R&D-heavy industry',
    description:
      'Substantiate R&D tax claims with a contemporaneous record of who did the work and when. Establish inventorship and provenance for the IP and patents that matter.',
  },
];

const EDU_BULLETS = [
  'Direct line to engineering during the pilot',
  'Staff training & report interpretation',
  'No detection - verifiable process evidence',
  'Anonymised institutional insight on AI use',
];

function CardGrid({
  cards,
  cols,
  surface = 'navy',
}: {
  cards: { title: string; description: string; icon: string }[];
  cols: string;
  surface?: 'navy' | 'cream';
}) {
  // Cream variant uses the existing .card-on-cream class with navy text/mute
  // body to stay legible on light backgrounds; icon container drops to a
  // lighter blue tint so it doesn't punch on cream.
  const cardClass =
    surface === 'cream' ? 'card-on-cream p-7 sm:p-8 h-full' : 'card-on-navy p-7 sm:p-8 h-full';
  const titleClass =
    surface === 'cream'
      ? 'text-base font-bold text-navy mb-2.5 leading-snug'
      : 'text-base font-bold text-cream mb-2.5 leading-snug';
  const bodyClass =
    surface === 'cream'
      ? 'text-mute text-sm leading-relaxed'
      : 'text-cream/70 text-sm leading-relaxed';
  const iconWrapClass =
    surface === 'cream'
      ? 'flex h-11 w-11 items-center justify-center rounded-xl bg-blue/[0.10] text-blue mb-5'
      : 'flex h-11 w-11 items-center justify-center rounded-xl bg-blue/[0.18] text-blue mb-5';

  return (
    <div className={`grid grid-cols-1 ${cols} gap-5 sm:gap-6`}>
      {cards.map((c, i) => (
        <motion.div
          key={c.title}
          className={cardClass}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ delay: i * 0.06, duration: 0.55, ease: 'easeOut' }}
        >
          <div className={iconWrapClass}>
            <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d={c.icon} />
            </svg>
          </div>
          <h3 className={titleClass}>{c.title}</h3>
          <p className={bodyClass}>{c.description}</p>
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
      {/* Dark half: section header + the four benefit cards. This is the
          "Proof of the work" side of the headline; only the front half
          stays dark. */}
      <section className="surface-navy px-4 sm:px-6 lg:px-8 py-24 sm:py-28">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <Eyebrow className="text-blue mb-5">Proof, not assurances</Eyebrow>
            <h2 className="font-display text-[1.7rem] sm:text-[2.5rem] leading-[1.1] text-cream">
              You set the policy. Visibility your team consents to.
            </h2>
          </div>

          <div>
            <Eyebrow className="text-cream/55 mb-6">What you can prove</Eyebrow>
            <CardGrid cards={BIZ_CARDS_PROOF} cols="sm:grid-cols-2 lg:grid-cols-4" surface="navy" />
            {/* Everyday-utility caption — sits directly under the cards as a
                centred product-utility note. */}
            <p className="mt-10 sm:mt-12 text-cream/65 text-sm sm:text-base leading-relaxed max-w-3xl mx-auto text-center">
              Day-to-day: instantly search your entire workflow history to find any message, page, or document you
              saw. Generate timelapse or process summaries to share with colleagues.
            </p>
          </div>
        </div>
      </section>

      {/* Cream half — single dark→cream seam. Holds the audience segments
          only; flows straight into the closing cream CTA below. */}
      <section className="surface-cream px-4 sm:px-6 lg:px-8 pt-20 sm:pt-24 pb-12 sm:pb-16">
        <div className="max-w-6xl mx-auto">
          {/* Who it's for — three audience segments as stacked rows */}
          <div>
            <Eyebrow className="text-mute mb-6">Who it&apos;s for</Eyebrow>
            <ul className="space-y-5 sm:space-y-6">
              {WHO_ITS_FOR.map((item) => (
                <li
                  key={item.title}
                  className="border-t border-navy/10 pt-5 sm:pt-6 first:border-t-0 first:pt-0"
                >
                  <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1.5 mb-1.5">
                    <h3 className="text-navy font-semibold text-base sm:text-[1.05rem] leading-snug">
                      {item.title}
                    </h3>
                    {item.badge && (
                      <span className="eyebrow inline-flex items-center rounded-md px-2 py-[3px] text-[0.62rem] tracking-[0.12em] bg-peach/25 text-[#a45a31]">
                        {item.badge}
                      </span>
                    )}
                  </div>
                  <p className="text-mute text-sm sm:text-[0.95rem] leading-relaxed max-w-3xl">
                    {item.description}
                  </p>
                </li>
              ))}
            </ul>
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
                A short call with our team - we&apos;ll walk through reports, policy use-cases, and what a pilot
                looks like, whether it&apos;s for your own team or the clients you advise.
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

// Read the active tab from the URL hash. SSR returns the default; client reads
// the actual hash. Kept as a plain function so both the initial state and the
// post-mount sync go through the same logic.
const readHashTab = (): Tab =>
  typeof window !== 'undefined' && window.location.hash.replace('#', '') === 'businesses'
    ? 'businesses'
    : 'educators';

// In a browser, useLayoutEffect runs synchronously after mount but BEFORE the
// browser paints — which means a hash like `#businesses` is picked up before
// the user sees the page. On the server it's a no-op (so we fall back to
// useEffect to avoid Next.js's SSR warning).
const useIsomorphicLayoutEffect =
  typeof window !== 'undefined' ? useLayoutEffect : useEffect;

export default function InstitutionsPage() {
  // Default to 'educators' to match the server-rendered HTML; the
  // useIsomorphicLayoutEffect below syncs to the real hash before paint.
  const [tab, setTab] = useState<Tab>('educators');

  // Initial sync: read the hash as soon as we have a window. Crucial when the
  // user arrives via a deep link like /institutions#businesses — the prior
  // useSyncExternalStore version sometimes missed this on first navigation.
  useIsomorphicLayoutEffect(() => {
    const next = readHashTab();
    setTab((cur) => (cur === next ? cur : next));
  }, []);

  // Ongoing sync: respond to hashchange events AND to Next.js client
  // navigation (which updates the URL via history.pushState and does NOT fire
  // a `hashchange` event). Wrapping pushState/replaceState catches both the
  // navbar dropdown links and any browser back/forward.
  useEffect(() => {
    const sync = () => {
      const next = readHashTab();
      setTab((cur) => (cur === next ? cur : next));
    };
    window.addEventListener('hashchange', sync);

    const origPush = history.pushState.bind(history);
    const origReplace = history.replaceState.bind(history);
    history.pushState = (...args) => {
      origPush(...args);
      sync();
    };
    history.replaceState = (...args) => {
      origReplace(...args);
      sync();
    };

    return () => {
      window.removeEventListener('hashchange', sync);
      history.pushState = origPush;
      history.replaceState = origReplace;
    };
  }, []);

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
