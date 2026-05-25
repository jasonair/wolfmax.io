'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Logo } from './Logo';

const CONSENT_KEY = 'workings_consent';
const CONSENT_TTL_MS = 365 * 24 * 60 * 60 * 1000; // 12 months

/** Footer "Cookie preferences" link dispatches this to re-open the notice. */
export const COOKIE_PREFS_EVENT = 'workings:open-cookie-prefs';

function hasValidConsent(): boolean {
  try {
    const raw = localStorage.getItem(CONSENT_KEY);
    if (!raw) return false;
    const { ts } = JSON.parse(raw);
    return typeof ts === 'number' && Date.now() - ts < CONSENT_TTL_MS;
  } catch {
    return false;
  }
}

export function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Defer so it animates in after first paint rather than flashing.
    const t = setTimeout(() => {
      if (!hasValidConsent()) setVisible(true);
    }, 600);

    const reopen = () => {
      try {
        localStorage.removeItem(CONSENT_KEY);
      } catch {
        /* ignore */
      }
      setVisible(true);
    };
    window.addEventListener(COOKIE_PREFS_EVENT, reopen);
    return () => {
      clearTimeout(t);
      window.removeEventListener(COOKIE_PREFS_EVENT, reopen);
    };
  }, []);

  const accept = () => {
    try {
      localStorage.setItem(CONSENT_KEY, JSON.stringify({ acknowledged: true, ts: Date.now() }));
    } catch {
      /* ignore */
    }
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
          className="fixed inset-x-3 bottom-3 z-[60] mx-auto max-w-3xl rounded-2xl border border-cream/12 bg-navy/95 text-cream shadow-[0_16px_48px_rgba(12,16,48,0.35)] backdrop-blur-md sm:inset-x-4 sm:bottom-4"
        >
          <div className="flex flex-col items-center gap-4 p-5 text-center sm:flex-row sm:items-center sm:gap-6 sm:p-6 sm:text-left">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center">
              <Logo variant="light" iconOnly className="h-6 w-auto" />
            </div>
            <div className="flex-1 text-sm leading-relaxed text-cream/80">
              <span className="font-semibold text-cream">Essential storage only.</span>{' '}
              <em>Workings</em>.io doesn&apos;t use analytics, advertising, or tracking cookies. We store a small record
              of your consent choice and any waitlist email you submit (with your permission). Read the{' '}
              <a href="/privacy" className="text-[#7aa6ff] underline underline-offset-2 hover:text-cream">
                website privacy policy
              </a>.
            </div>
            <button onClick={accept} className="btn-blue shrink-0 justify-center self-center sm:self-auto">
              Got it
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
