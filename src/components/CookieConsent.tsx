'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Logo } from './Logo';
import { readConsent, setConsent, COOKIE_PREFS_EVENT } from '@/lib/consent';

export { COOKIE_PREFS_EVENT };

export function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Defer so it animates in after first paint rather than flashing.
    const t = setTimeout(() => {
      if (!readConsent()) setVisible(true);
    }, 600);

    const reopen = () => setVisible(true);
    window.addEventListener(COOKIE_PREFS_EVENT, reopen);
    return () => {
      clearTimeout(t);
      window.removeEventListener(COOKIE_PREFS_EVENT, reopen);
    };
  }, []);

  const choose = (analytics: 'granted' | 'denied') => {
    setConsent(analytics);
    setVisible(false);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          role="dialog"
          aria-label="Cookie notice"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 24 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-x-3 bottom-3 z-[60] mx-auto max-w-5xl rounded-2xl border border-cream/12 bg-navy/95 text-cream shadow-[0_16px_48px_rgba(12,16,48,0.35)] backdrop-blur-md sm:inset-x-4 sm:bottom-4"
        >
          <div className="flex flex-col items-center gap-4 p-5 text-center sm:flex-row sm:items-center sm:gap-6 sm:p-6 sm:text-left">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center">
              <Logo variant="light" iconOnly className="h-6 w-auto" />
            </div>
            <div className="flex-1 text-sm leading-relaxed text-cream/80">
              <span className="font-semibold text-cream">Your choice on cookies.</span>{' '}
              We always store a small record of your consent choice and any waitlist email you submit. With your
              permission we also use <span className="text-cream">Google Analytics</span> to understand site traffic —
              it stays off unless you accept. Read the{' '}
              <Link href="/privacy" className="text-[#7aa6ff] underline underline-offset-2 hover:text-cream">
                privacy policy
              </Link>.
            </div>
            <div className="flex shrink-0 flex-col gap-2.5 self-stretch sm:flex-row sm:self-auto">
              <button onClick={() => choose('denied')} className="btn-ghost-cream justify-center text-sm">
                Reject
              </button>
              <button onClick={() => choose('granted')} className="btn-blue justify-center text-sm">
                Accept
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
