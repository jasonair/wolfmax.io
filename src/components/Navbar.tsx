'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Logo } from './Logo';
import { useWaitlist } from './waitlist/WaitlistProvider';
import { useIntroReady } from '@/lib/useIntroReady';

// After the intro lands the logo, the nav items cascade in one after another.
const navItemsStagger = {
  hidden: {},
  show: { transition: { delayChildren: 0.4, staggerChildren: 0.07 } },
};
const navItem = {
  hidden: { opacity: 0, y: -8 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } },
} as const;

type NavLink =
  | { label: string; href: string }
  | { label: string; href: string; children: { label: string; href: string }[] };

const navLinks: NavLink[] = [
  { label: 'What it is', href: '/' },
  { label: 'How it works', href: '/#how-it-works' },
  { label: 'Individuals', href: '/individuals' },
  {
    label: 'Institutions',
    href: '/institutions',
    children: [
      { label: 'Education', href: '/institutions#educators' },
      { label: 'Business', href: '/institutions#businesses' },
    ],
  },
  { label: 'News', href: '/news' },
];

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { open: openWaitlist } = useWaitlist();
  const pathname = usePathname();
  const ready = useIntroReady();

  // Track the URL hash so anchor-style nav items ("How it works", etc.) can
  // light up the active underline when their section is the current target.
  // Next.js client navigation updates the hash via history.pushState, which
  // doesn't fire `hashchange` — so we wrap both methods.
  const [hash, setHash] = useState('');
  useEffect(() => {
    const update = () => setHash(window.location.hash);
    update();
    window.addEventListener('hashchange', update);
    const origPush = history.pushState.bind(history);
    const origReplace = history.replaceState.bind(history);
    // Next.js calls these during its render/commit cycle (e.g. scroll
    // restoration), which can land inside React's insertion-effect window.
    // Setting state synchronously there triggers "useInsertionEffect must not
    // schedule updates", so defer the read to a microtask — after commit.
    history.pushState = (...args) => {
      origPush(...args);
      queueMicrotask(update);
    };
    history.replaceState = (...args) => {
      origReplace(...args);
      queueMicrotask(update);
    };
    return () => {
      window.removeEventListener('hashchange', update);
      history.pushState = origPush;
      history.replaceState = origReplace;
    };
  }, []);

  // Active rules:
  //  - '/#section'  → home page AND hash matches
  //  - '/'          → home page AND no hash (so "What it is" doesn't fight
  //                   with "How it works" when the user is mid-page)
  //  - everything else → page match or sub-route match
  const isActive = (href: string) => {
    if (href.startsWith('/#')) {
      return pathname === '/' && hash === href.slice(1);
    }
    if (href === '/') {
      return pathname === '/' && !hash;
    }
    return pathname === href || pathname.startsWith(href + '/');
  };

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-cream">
        {/* The nav line - drawn across left-to-right once the logo lands. */}
        <motion.span
          aria-hidden="true"
          className="absolute bottom-0 left-0 right-0 h-px bg-navy/10 origin-left"
          initial={{ scaleX: 0 }}
          animate={ready ? { scaleX: 1 } : { scaleX: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut', delay: 0.05 }}
        />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-[68px] flex items-center justify-between">
          <Link href="/" id="nav-logo" className="flex items-center group" aria-label="Workings home">
            <Logo className="h-7 w-auto transition-transform group-hover:scale-[1.03]" />
          </Link>

          {/* Desktop nav */}
          <motion.div
            className="hidden md:flex items-center gap-7"
            variants={navItemsStagger}
            initial="hidden"
            animate={ready ? 'show' : 'hidden'}
          >
            {navLinks.map((link) => {
              const active = isActive(link.href);
              return 'children' in link ? (
                <motion.div key={link.label} variants={navItem} className="relative group">
                  <Link
                    href={link.href}
                    className={`relative flex items-center gap-1 text-sm font-medium transition-colors py-5 ${
                      active ? 'text-blue' : 'text-navy/80 hover:text-navy'
                    }`}
                  >
                    {link.label}
                    <svg
                      width="11"
                      height="11"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2.5}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="opacity-70 transition-transform group-hover:rotate-180"
                    >
                      <polyline points="6 9 12 15 18 9" />
                    </svg>
                    {active && (
                      <span
                        aria-hidden="true"
                        className="absolute left-0 right-4 -bottom-px h-[2px] bg-blue rounded-full"
                      />
                    )}
                  </Link>
                  <div className="absolute left-0 top-full pt-1 opacity-0 invisible translate-y-1 transition-all duration-150 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0">
                    <div className="min-w-[200px] rounded-2xl border border-navy/10 bg-cream/98 backdrop-blur-md p-2 shadow-[0_18px_48px_rgba(12,16,48,0.12)]">
                      {link.children.map((c) => (
                        <Link
                          key={c.label}
                          href={c.href}
                          className="block rounded-xl px-4 py-2.5 text-sm text-navy/80 hover:bg-blue/[0.08] hover:text-blue transition-colors"
                        >
                          {c.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ) : (
                <motion.div key={link.label} variants={navItem}>
                  <Link
                    href={link.href}
                    className={`relative py-5 text-sm font-medium transition-colors ${
                      active ? 'text-blue' : 'text-navy/80 hover:text-navy'
                    }`}
                  >
                    {link.label}
                    {active && (
                      <span
                        aria-hidden="true"
                        className="absolute left-0 right-0 -bottom-px h-[2px] bg-blue rounded-full"
                      />
                    )}
                  </Link>
                </motion.div>
              );
            })}
            <motion.div variants={navItem}>
              <button onClick={openWaitlist} className="btn-peach !px-5 !py-2.5 !text-sm">
                Join waitlist
              </button>
            </motion.div>
          </motion.div>

          {/* Mobile hamburger */}
          <motion.button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden relative w-10 h-10 flex items-center justify-center"
            aria-label="Toggle menu"
            initial={{ opacity: 0 }}
            animate={ready ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.4, delay: 0.4 }}
          >
            <span className={`absolute block w-5 h-0.5 bg-navy transition-all duration-300 ${menuOpen ? 'rotate-45' : '-translate-y-[5px]'}`} />
            <span className={`absolute block w-5 h-0.5 bg-navy transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
            <span className={`absolute block w-5 h-0.5 bg-navy transition-all duration-300 ${menuOpen ? '-rotate-45' : 'translate-y-[5px]'}`} />
          </motion.button>
        </div>
      </nav>

      {/* Full-screen mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden fixed inset-0 z-40 bg-cream/97 backdrop-blur-xl flex flex-col items-center justify-center"
          >
            <div className="flex flex-col items-center gap-3">
              {navLinks.map((link) => (
                <div key={link.label} className="flex flex-col items-center">
                  <Link
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className="text-2xl font-medium text-navy/80 hover:text-navy transition-colors py-1.5"
                  >
                    {link.label}
                  </Link>
                  {'children' in link &&
                    link.children.map((c) => (
                      <Link
                        key={c.label}
                        href={c.href}
                        onClick={() => setMenuOpen(false)}
                        className="text-base text-navy/55 hover:text-navy transition-colors py-1"
                      >
                        - {c.label}
                      </Link>
                    ))}
                </div>
              ))}
              <button
                onClick={() => {
                  setMenuOpen(false);
                  openWaitlist();
                }}
                className="btn-peach mt-4"
              >
                Join waitlist
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
