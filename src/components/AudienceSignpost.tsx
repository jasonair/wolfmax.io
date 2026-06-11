'use client';

import Link from 'next/link';

/**
 * Slim signpost — homepage primary narrative is for individuals, but
 * educators and businesses still need a one-click path off the homepage to
 * their dedicated content. Two link cards on a cream banner, deliberately
 * understated so they read as "also for" rather than competing audiences.
 */

const Arrow = () => (
  <svg
    width="14"
    height="14"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    className="transition-transform group-hover:translate-x-0.5"
  >
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
  </svg>
);

const links = [
  {
    question: 'Running a course?',
    label: 'For educators',
    href: '/institutions#educators',
  },
  {
    question: 'Running a team?',
    label: 'For businesses',
    href: '/institutions#businesses',
  },
];

export function AudienceSignpost() {
  return (
    <section className="surface-cream px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
      <div className="max-w-3xl mx-auto">
        <p className="eyebrow text-mute text-center mb-6 sm:mb-8">Also for</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="group flex items-center justify-between rounded-2xl border border-navy/10 bg-white/50 px-6 py-5 transition-colors hover:border-blue/40 hover:bg-white"
            >
              <span>
                <span className="block text-mute text-sm">{l.question}</span>
                <span className="mt-1 block font-semibold text-navy text-base sm:text-lg">{l.label}</span>
              </span>
              <span className="text-blue">
                <Arrow />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
