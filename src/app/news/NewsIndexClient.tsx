'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Eyebrow } from '@/components/Eyebrow';
import { timeline, type TimelineEntry, type TimelineEntryType } from './timelineData';

interface Post {
  id: string;
  slug: string;
  title: string;
  description: string | null;
  image: string | null;
  publishedAt: Date | string | null;
  createdAt: Date | string;
}

type Tab = 'timeline' | 'blog';

const TAB_LABEL: Record<Tab, string> = {
  timeline: 'Timeline',
  blog: 'Blog',
};

export function NewsIndexClient({ posts }: { posts: Post[] }) {
  const [tab, setTab] = useState<Tab>('timeline');

  // Honour ?#blog / ?#timeline in the URL so the back link from a blog post
  // returns the reader to the tab they came from. Also keeps the URL hash in
  // sync with the current tab so the choice can be deep-linked or shared.
  useEffect(() => {
    const apply = () => {
      const h = window.location.hash.replace('#', '');
      if (h === 'blog' || h === 'timeline') setTab(h);
    };
    apply();
    window.addEventListener('hashchange', apply);
    return () => window.removeEventListener('hashchange', apply);
  }, []);
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const target = `#${tab}`;
    if (window.location.hash !== target) {
      // replaceState (not pushState) — we don't want every tab click to add a
      // back-button entry.
      history.replaceState(null, '', target);
    }
  }, [tab]);

  return (
    <main className="surface-cream min-h-screen selection:bg-blue/15">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 sm:pt-40 pb-24">
        {/* Page header */}
        <header className="mb-10">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Eyebrow className="text-mute mb-4">News</Eyebrow>
            <h1 className="font-display text-5xl sm:text-6xl text-navy leading-[1.05] mb-2 max-w-[18ch]">
              What we&apos;ve been working on.
            </h1>
          </motion.div>
        </header>

        {/* Tabs */}
        <div className="border-b border-navy/12 mb-12">
          <div className="flex items-center gap-8">
            {(['timeline', 'blog'] as Tab[]).map((t) => {
              const active = tab === t;
              return (
                <button
                  key={t}
                  onClick={() => setTab(t)}
                  className={`relative pb-3 text-sm font-medium transition-colors ${
                    active ? 'text-blue' : 'text-navy/55 hover:text-navy'
                  }`}
                >
                  {TAB_LABEL[t]}
                  {active && (
                    <motion.span
                      layoutId="news-tab-indicator"
                      className="absolute left-0 right-0 -bottom-px h-[2px] bg-blue rounded-full"
                      transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Panels */}
        <motion.section
          key={tab}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25 }}
        >
          {tab === 'timeline' ? <Timeline /> : <BlogPanel posts={posts} />}
        </motion.section>
      </div>
    </main>
  );
}

/* -------------------------------------------------------------------------- */
/* Timeline                                                                   */
/* -------------------------------------------------------------------------- */

function Timeline() {
  return (
    <ol className="relative pl-8 sm:pl-10">
      {/* Vertical rail */}
      <span
        aria-hidden="true"
        className="absolute left-[7px] sm:left-[9px] top-2 bottom-2 w-px bg-navy/15"
      />

      {timeline.map((entry, i) => (
        <TimelineRow key={i} entry={entry} />
      ))}
    </ol>
  );
}

function TimelineRow({ entry }: { entry: TimelineEntry }) {
  const isUpcoming = entry.type === 'UPCOMING';
  const cardBorder = entry.highlighted
    ? 'border-blue/60 ring-1 ring-blue/40'
    : 'border-navy/10';

  return (
    <li className="relative mb-4 last:mb-0">
      {/* Marker dot — sits over the rail */}
      <span
        aria-hidden="true"
        className={`absolute -left-8 sm:-left-10 top-5 w-[15px] h-[15px] rounded-full border-2 ${
          isUpcoming
            ? 'bg-cream border-peach'
            : entry.highlighted
              ? 'bg-blue border-blue ring-2 ring-blue/25'
              : 'bg-blue border-blue'
        }`}
      />

      <article
        className={`rounded-2xl border ${cardBorder} bg-white/60 px-5 py-4 sm:px-6 sm:py-5 transition-shadow hover:shadow-[0_8px_24px_rgba(12,16,48,0.06)]`}
      >
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mb-2">
          <TypeBadge type={entry.type} />
          {entry.version && (
            <span className="eyebrow text-blue/80">{entry.version}</span>
          )}
          <span className="eyebrow text-mute">{entry.date}</span>
        </div>
        <h3 className="font-display text-lg sm:text-xl text-navy leading-snug mb-1.5">
          {entry.title}
        </h3>
        <p className="font-subtitle text-mute text-sm sm:text-[0.95rem] leading-relaxed">
          {entry.description}
        </p>
      </article>
    </li>
  );
}

function TypeBadge({ type }: { type: TimelineEntryType }) {
  const styles: Record<TimelineEntryType, string> = {
    UPCOMING: 'bg-peach/30 text-[#a45a31]',
    NEWS: 'bg-blue/12 text-blue',
    RELEASE: 'bg-blue/12 text-blue',
    MILESTONE: 'bg-navy/10 text-navy/70',
  };
  return (
    <span
      className={`eyebrow inline-flex items-center rounded-md px-2 py-[3px] text-[0.65rem] tracking-[0.12em] ${styles[type]}`}
    >
      {type}
    </span>
  );
}

/* -------------------------------------------------------------------------- */
/* Blog                                                                       */
/* -------------------------------------------------------------------------- */

function BlogPanel({ posts }: { posts: Post[] }) {
  if (posts.length === 0) {
    return (
      <div className="rounded-2xl border border-navy/10 bg-white/60 p-6 sm:p-8">
        <p className="eyebrow text-blue mb-3">Coming soon</p>
        <h2 className="font-display text-xl sm:text-2xl text-navy mb-3">
          Long-form writing from the Workings team
        </h2>
        <p className="font-subtitle text-mute text-sm sm:text-base leading-relaxed">
          Our blog launches alongside public beta - essays on authorship, AI in education,
          the technical work behind process recording, and what we&apos;re learning from
          university pilots. Subscribe via the{' '}
          <Link href="/#early-access" className="text-blue underline-offset-4 hover:underline">
            waitlist
          </Link>{' '}
          to be notified when the first post drops.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
      {posts.map((post, idx) => (
        <motion.div
          key={post.id}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: idx * 0.08 }}
        >
          <Link href={`/news/${post.slug}`} className="group block h-full">
            <article className="card-on-cream h-full flex flex-col overflow-hidden transition-transform duration-300 group-hover:-translate-y-1">
              {post.image && (
                <div className="aspect-[16/9] overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={post.image}
                    alt={post.title}
                    className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
              )}

              <div className="p-8 flex flex-col flex-1">
                <p className="eyebrow text-mute mb-4">
                  {new Date(post.publishedAt || post.createdAt).toLocaleDateString('en-GB', {
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric',
                  })}
                </p>

                <h2 className="font-display text-2xl text-navy mb-4 group-hover:text-blue transition-colors duration-200">
                  {post.title}
                </h2>

                <p className="font-subtitle text-mute text-base leading-relaxed mb-8 line-clamp-3 flex-1">
                  {post.description}
                </p>

                <div className="mt-auto flex items-center text-blue text-sm font-semibold gap-1.5">
                  Read article
                  <svg
                    className="w-4 h-4 transition-transform group-hover:translate-x-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </div>
              </div>
            </article>
          </Link>
        </motion.div>
      ))}
    </div>
  );
}
