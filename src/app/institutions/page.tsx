'use client';

import { useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { Eyebrow } from '@/components/Eyebrow';
import { Button } from '@/components/Button';
import { Annotate } from '@/components/Annotate';

type Tab = 'educators' | 'businesses';

const HERO: Record<Tab, { eyebrow: string; title: string; sub: ReactNode; ctaHref: string; ctaLabel: string; meta: string }> = {
  educators: {
    eyebrow: 'For heads of learning & teaching',
    title: 'Detection asks the wrong question.',
    sub: (
      <>
        <p>
          The finished essay used to prove the work. Now it proves nothing - detectors guess at the output,
          proctoring polices the student.
        </p>
        <p>
          <em className="italic">Workings</em> asks: How did the work actually get made? It keeps a private
          record - in the wild, held by the student, verifiable by the institution.
        </p>
        <p className="font-semibold text-navy/85">Tech in service of pedagogy.</p>
      </>
    ),
    ctaHref: 'mailto:universities@workings.io?subject=University%20demo%20request',
    ctaLabel: 'Book a demo',
    meta: 'Currently planning pilots in UK and Australia',
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
      'How did this thesis, essay, or research paper actually come together? Students attach a verifiable record of their process - drafting, sourcing, revising, AI use, the lot. You assess the work and the workings.',
  },
  {
    title: 'Exams & assessments',
    description:
      "Take-home and open-book exams without invasive proctoring. A tamper-evident record of the session sits with the student. If integrity is ever questioned, the evidence is there. If it isn't, no one ever looks at it.",
  },
  {
    title: 'Productivity insights',
    description:
      "Private feedback to students on their own research-to-writing ratios, revision patterns, and deep-work stretches. They see how they actually learn. They build better habits. You didn't have to mark another rubric.",
  },
  {
    title: 'Understand AI use & evolve policy',
    description:
      'Aggregate, anonymised insight into how your students actually use AI - not what your policy assumes. Redesign assessment with evidence, not anecdote.',
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
      'Improve efficiency for staff by giving them a tool that lets them search their entire workflow history instantly - find any document, message, or webpage seen previously or worked on.',
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
      'Catch AI hallucinations, errors, and unsupported claims before they reach a client - by seeing where AI was used in a deliverable and whether it was checked.',
      'Understand how a piece of work came together: which collaborators shaped which parts, and where the thinking happened.',
      'Run honest retrospectives on a real record of how work was produced, rather than reconstructed memory.',
      'Build a clearer working relationship with contractors: they show their workings, you have a shared basis for trusting the output.',
    ],
  },
];

const EDU_BULLETS = [
  'Opt-in for students - no mandate, no surveillance',
  'No detection - verifiable process evidence, not accusations',
  'Direct line to engineering during the pilot',
  'Anonymised institutional insight on student AI use',
  'Staff training and report interpretation included',
];

function CardGrid({
  cards,
  cols,
  surface = 'navy',
}: {
  cards: { title: string; description: string }[];
  cols: string;
  surface?: 'navy' | 'cream';
}) {
  // Cream variant uses .card-on-cream with navy text/mute body to stay legible
  // on light backgrounds; the leading hairline rule also flips to a navy tint
  // so it reads on cream (cream/12 is invisible there).
  const cardClass =
    surface === 'cream' ? 'card-on-cream group p-7 sm:p-8 h-full' : 'card-on-navy group p-7 sm:p-8 h-full';
  const titleClass =
    surface === 'cream'
      ? 'text-[1.4rem] font-bold text-navy mb-3 leading-[1.15] tracking-tight'
      : 'text-[1.4rem] font-bold text-cream mb-3 leading-[1.15] tracking-tight';
  const bodyClass =
    surface === 'cream'
      ? 'text-mute text-sm leading-relaxed'
      : 'text-cream/65 text-sm leading-relaxed';
  const ruleClass = surface === 'cream' ? 'bg-navy/10' : 'bg-cream/12';

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
          <div className="flex items-center gap-4 mb-6">
            <span className="h-[3px] w-9 rounded-full bg-blue transition-all duration-300 group-hover:w-12" />
            <span className={`h-px flex-1 ${ruleClass} transition-colors group-hover:bg-blue/40`} />
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
              Four questions <Annotate variant="underline" nudge={0.1}>detection</Annotate> can&apos;t answer.
            </h2>
          </div>
          <CardGrid cards={EDU_CARDS} cols="sm:grid-cols-2 lg:grid-cols-4" />
        </div>
      </section>

      {/* Human Moment — quiet cream section, deliberate whitespace. The
          headline lands at thesis-defence intensity; the line beneath is
          the promise. No CTA, no decoration — the silence is the design. */}
      <section className="surface-cream px-4 sm:px-6 lg:px-8 py-32 sm:py-40">
        <div className="max-w-[42rem] mx-auto text-center">
          <h2 className="font-display text-[1.55rem] sm:text-[2.1rem] md:text-[2.5rem] leading-[1.2] text-navy">
            You just finished your thesis. Now you&apos;re being accused of using AI to write it.
          </h2>
        </div>
      </section>

      <section className="surface-cream px-4 sm:px-6 lg:px-8 pb-24 sm:pb-28">
        <div className="max-w-5xl mx-auto">
          <div className="surface-blue rounded-[28px] px-8 py-12 sm:px-12 sm:py-14 grid grid-cols-1 lg:grid-cols-[1.3fr_1fr] gap-10 lg:gap-12 items-center text-white">
            <div>
              <Eyebrow className="text-white/70 mb-3">Pilot with us</Eyebrow>
              <h3 className="font-display text-[1.5rem] sm:text-[1.95rem] leading-[1.1] mb-4">
                Run a pilot this semester - without adding to your team&apos;s workload.
              </h3>
              <p className="text-white/85 leading-relaxed mb-6 max-w-[56ch]">
                We work with academic-integrity teams, faculty, and IT to deploy{' '}
                <em className="italic">Workings</em> to specific cohorts or assessments. Most pilots run a semester,
                are opt-in for students, and don&apos;t require changes to your existing assessment design.
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
      {/* Applications — reworked from the dense navy card grid into a calm
          editorial index on the standard cream surface. No dark band, no boxed
          cards: each use-case cluster is a ledger row anchored by a ghosted
          serif index numeral and separated by hairline rules. A top hairline
          marks the seam from the cream hero above. Keeps the long bullet lists
          readable without four high-contrast white slabs competing for the
          eye. */}
      <section className="surface-cream border-t border-navy/10 px-4 sm:px-6 lg:px-8 pt-24 sm:pt-28 pb-16 sm:pb-20">
        <div className="max-w-6xl mx-auto">
          <div className="max-w-3xl mb-16 sm:mb-20">
            <Eyebrow className="text-blue mb-5">Applications</Eyebrow>
            <h2 className="font-display text-[1.7rem] sm:text-[2.3rem] leading-[1.14] text-navy">
              The cryptographically sealed body of evidence of how work is made has a wide range of applications for
              business.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 lg:gap-x-16">
            {BIZ_APPLICATIONS.map((group, idx) => (
              <motion.div
                key={group.title}
                className="group border-t border-navy/12 pt-8 sm:pt-9 pb-10 sm:pb-12"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ delay: (idx % 2) * 0.08, duration: 0.5, ease: 'easeOut' }}
              >
                <span className="block font-display text-[2rem] sm:text-[2.3rem] leading-none text-navy/20 tabular-nums mb-4 transition-colors duration-300 group-hover:text-blue/50">
                  {String(idx + 1).padStart(2, '0')}
                </span>
                <h3 className="font-display text-[1.4rem] sm:text-[1.65rem] leading-[1.12] text-navy mb-3">
                  {group.title}
                </h3>
                <p className="text-mute/90 text-sm leading-relaxed italic mb-7 max-w-[46ch]">
                  {group.subtitle}
                </p>
                <ul className="space-y-4 max-w-[52ch]">
                  {group.bullets.map((bullet, i) => (
                    <li
                      key={i}
                      className="flex gap-3.5 text-mute text-sm sm:text-[0.95rem] leading-relaxed"
                    >
                      <span
                        aria-hidden="true"
                        className="mt-[0.6rem] h-px w-3 bg-blue/60 shrink-0"
                      />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="surface-cream px-4 sm:px-6 lg:px-8 pt-14 pb-24 sm:pt-16 sm:pb-28">
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
    // `hashchange`. Wrap the methods so we still get notified. Next calls
    // these during its render/commit cycle, which can land inside React's
    // insertion-effect window — bumping state synchronously there triggers
    // "useInsertionEffect must not schedule updates", so defer to a
    // microtask (after commit).
    const origPush = history.pushState.bind(history);
    const origReplace = history.replaceState.bind(history);
    history.pushState = (...args) => {
      origPush(...args);
      queueMicrotask(bump);
    };
    history.replaceState = (...args) => {
      origReplace(...args);
      queueMicrotask(bump);
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
                <div className="font-subtitle text-base sm:text-lg text-mute max-w-xl mx-auto leading-relaxed mb-8 space-y-4">
                  {hero.sub}
                </div>
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
