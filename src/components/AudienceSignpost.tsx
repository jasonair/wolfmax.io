'use client';

import Link from 'next/link';

/**
 * Slim signpost — homepage primary narrative is for individuals, but
 * educators and businesses still need a one-click path off the homepage to
 * their dedicated content. Mirrors the cross-link cards in the footer of the
 * individuals page (title + sub + arrow), themed for the cream surface.
 */

const Arrow = ({ className = '' }: { className?: string }) => (
  <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
  </svg>
);

const links = [
  { title: 'Education', sub: 'Academic integrity, essays, exams', href: '/institutions#educators' },
  { title: 'Business', sub: 'AI policy, compliance, team visibility', href: '/institutions#businesses' },
];

export function AudienceSignpost() {
  return (
    <section className="surface-cream px-4 sm:px-6 lg:px-8 pt-6 pb-20 sm:pb-28">
      <div className="max-w-3xl mx-auto">
        <p className="eyebrow text-mute text-center mb-8">Also for institutions</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {links.map((l) => (
            <Link
              key={l.title}
              href={l.href}
              className="group flex items-center justify-between rounded-2xl border border-navy/12 bg-white/50 px-6 py-5 transition-colors hover:border-blue hover:bg-white"
            >
              <span>
                <strong className="block text-base font-bold text-navy">{l.title}</strong>
                <small className="text-sm text-mute">{l.sub}</small>
              </span>
              <Arrow className="text-navy/45 transition-transform group-hover:translate-x-0.5" />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
