'use client';

import { useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { Eyebrow } from '@/components/Eyebrow';
import { Button } from '@/components/Button';

type Tab = 'educators' | 'businesses';

const HERO: Record<Tab, { eyebrow: string; title: string; sub: ReactNode; ctaHref: string; ctaLabel: string; meta: string }> = {
  educators: {
    eyebrow: 'For educators',
    title: 'Students show their process.',
    sub: 'And you see the genuine effort behind it - no surveillance, no accusation.',
    ctaHref: 'mailto:universities@workings.io?subject=University%20demo%20request',
    ctaLabel: 'Book a demo',
    meta: 'Currently piloting · UK · Australia',
  },
  businesses: {
    eyebrow: 'For businesses',
    title: 'Understand AI value. Keep the human in the loop.',
    sub: (
      <>
        AI is in every deliverable now - and leadership wants to know what it&apos;s worth.{' '}
        <em className="italic">Workings</em> gives you a verifiable record of how it was used and where
        your people added value, stored securely and shared only when your team chooses. So when your
        CFO, a client, or a regulator asks, you answer with evidence.
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
    title: 'Credit the human in the loop',
    description:
      'Show how critical work was made, with a timestamped, verifiable record. Establish when it was created, and how AI was used. Rapidly share best practice.',
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

// Applications matrix on the business page — grouped use-cases. Each
// cluster carries a "subtitle" line listing typical audiences for that
// group. Bullets are ReactNode so we can italicise `Workings` mid-sentence
// where it appears.
const BIZ_APPLICATIONS: {
  title: string;
  subtitle: string;
  bullets: ReactNode[];
}[] = [
  {
    title: 'Proof where you need it',
    subtitle:
      'Common in legal practice, IP advisory, creative studios, R&D-heavy businesses, scientific research, games studios, and journalism.',
    bullets: [
      'Establish inventorship and provenance for IP and patents by generating a timestamped, tamper-evident record of how the work was created.',
      'Substantiate R&D tax claims by maintaining a contemporaneous record of who did the work and when.',
      'Defend against claims that confidential information was misappropriated by showing that work was independently developed.',
      'Resolve client billing disputes by showing what was done, when, and how long it took.',
      'Demonstrate continuous supervision of AI use by junior and support staff (for legal firms) by employing a tool which allows AI use to be clearly identified.',
    ],
  },
  {
    title: 'Increase efficiency and reduce costs',
    subtitle:
      'Useful across professional services firms, distributed teams, businesses negotiating PI insurance, and any organisation running a large SaaS stack.',
    bullets: [
      'Optimise AI use across the business by understanding where it is working well and where it is not.',
      'Eliminate subscriptions for applications no one uses by understanding which tools staff are actually using.',
      'Streamline recruitment by reducing spam and understanding how applications have been constructed.',
      'Improve efficiency for staff by giving them a tool that lets them search their entire workflow history instantly — find any document, message, or webpage seen previously or worked on.',
      'Support PI insurance negotiations by maintaining a defensible workflow audit trail.',
    ],
  },
  {
    title: 'Stand out to clients',
    subtitle:
      'Useful for creative agencies, freelancers, law firms with public AI use policies, consultancies competing on craft, and journalists.',
    bullets: [
      'Certify to clients that your AI use policy was followed for their deliverables by working with us to create an assessable AI use policy.',
      'Differentiate pitches by showing prospective clients that your process is verifiable, not just stated.',
      "Demonstrate the human craft behind a deliverable to clients who need to know it wasn't AI-generated by sharing evidence.",
    ],
  },
  {
    title: 'Stand behind the work',
    subtitle:
      'Useful for anyone engaging contractors, creative agencies, law firms, distributed teams, and clients buying AI-assisted deliverables.',
    bullets: [
      'Catch AI hallucinations, errors, and unsupported claims before they reach a client — by seeing where AI was used in a deliverable and whether it was checked.',
      'Understand how a piece of work came together: which collaborators shaped which parts, and where the thinking happened.',
      'Run honest retrospectives on a real record of how work was produced, rather than reconstructed memory.',
      'Build a clearer working relationship with contractors: they show their workings, you have a shared basis for trusting the output.',
    ],
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
              Find the balance of privacy &amp; transparency with your team.
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

      {/* Applications matrix — uses cream-200 tonal shift to denote a new
          section. Four grouped use-case clusters in a 2x2 grid on md+;
          each carries a subtitle line listing typical audiences. */}
      <section className="surface-cream px-4 sm:px-6 lg:px-8 pt-20 sm:pt-24 pb-20 sm:pb-24 bg-cream-200">
        <div className="max-w-6xl mx-auto">
          <Eyebrow className="text-mute mb-5">Applications</Eyebrow>
          <p className="font-display text-[1.4rem] sm:text-[1.8rem] leading-snug text-navy max-w-3xl mb-14 sm:mb-16">
            The cryptographically sealed body of evidence of how work is made has a wide range of applications for
            business.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-12 sm:gap-y-14">
            {BIZ_APPLICATIONS.map((group) => (
              <div key={group.title}>
                <h3 className="font-display text-[1.25rem] sm:text-[1.4rem] leading-snug text-navy mb-2 sm:mb-2.5">
                  {group.title}
                </h3>
                <p className="text-mute/85 text-sm leading-relaxed italic mb-5 sm:mb-6">
                  {group.subtitle}
                </p>
                <ul className="space-y-3 sm:space-y-3.5">
                  {group.bullets.map((bullet, i) => (
                    <li
                      key={i}
                      className="flex gap-3 text-mute text-sm sm:text-[0.95rem] leading-relaxed"
                    >
                      <span aria-hidden="true" className="mt-[0.55rem] h-1.5 w-1.5 rounded-full bg-blue/70 shrink-0" />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
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

// Read the active tab from the URL hash. SSR safe (returns the default if
// no window). Used both as the per-render derivation AND inside the change
// listeners — single source of truth for "what tab should be active".
const readHashTab = (): Tab =>
  typeof window !== 'undefined' && window.location.hash.replace('#', '') === 'businesses'
    ? 'businesses'
    : 'educators';

export default function InstitutionsPage() {
  // We don't store the tab itself in state — we DERIVE it from
  // window.location.hash on every render. State only tracks "something
  // hash-related might have changed, please re-derive". This is more robust
  // than storing the tab and trying to keep it in sync via effects, because
  // there's no possible race where the state lags behind the URL.
  //
  // First render uses tick=0 → 'educators' (matches server HTML, no hydration
  // mismatch). The effect bumps tick on mount, which re-renders and pulls
  // the real hash. Every subsequent listener bump triggers another re-render
  // and re-read.
  const [tick, setTick] = useState(0);

  useEffect(() => {
    const bump = () => setTick((n) => n + 1);
    // Initial sync after mount — covers the case where the page renders with
    // educators-default but the URL is already /institutions#businesses
    // (e.g. arriving via the navbar dropdown from another page).
    bump();

    // hashchange fires for in-document anchor navigation; popstate fires
    // for browser back/forward. Both are routes the user might take to
    // switch tabs.
    window.addEventListener('hashchange', bump);
    window.addEventListener('popstate', bump);

    // Next.js client navigation (the navbar dropdown's Education/Business
    // links) updates the URL via history.pushState and does NOT fire
    // `hashchange`. Wrap the methods so we still get notified.
    const origPush = history.pushState.bind(history);
    const origReplace = history.replaceState.bind(history);
    history.pushState = (...args) => {
      origPush(...args);
      bump();
    };
    history.replaceState = (...args) => {
      origReplace(...args);
      bump();
    };

    return () => {
      window.removeEventListener('hashchange', bump);
      window.removeEventListener('popstate', bump);
      history.pushState = origPush;
      history.replaceState = origReplace;
    };
  }, []);

  // Pre-mount: tick=0 → 'educators' (matches SSR output, no hydration
  // warning). Post-mount: read the live URL on every render.
  const tab: Tab = tick === 0 ? 'educators' : readHashTab();

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
