'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { WL_PERSONAS, WL_USE_CASES, WL_COUNTRIES, WL_COUNTRIES_TOP } from './data';

const DRAFT_KEY = 'workings_waitlist_draft';
const EMAIL_RE = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

type Draft = {
  email: string;
  country: string;
  user_personas: string[];
  use_cases: string[];
  user_personas_other: string;
  use_cases_other: string;
};

const emptyDraft: Draft = {
  email: '',
  country: '',
  user_personas: [],
  use_cases: [],
  user_personas_other: '',
  use_cases_other: '',
};

function readDraft(): Draft {
  try {
    const raw = localStorage.getItem(DRAFT_KEY);
    return raw ? { ...emptyDraft, ...JSON.parse(raw) } : emptyDraft;
  } catch {
    return emptyDraft;
  }
}

const sortedCountries = [...WL_COUNTRIES].sort((a, b) => a[1].localeCompare(b[1]));

type Errors = Partial<Record<'email' | 'country' | 'user_personas' | 'use_cases' | 'consent' | 'submit', string>>;

export function WaitlistModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [draft, setDraft] = useState<Draft>(emptyDraft);
  const [consent, setConsent] = useState(false);
  const [errors, setErrors] = useState<Errors>({});
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const [edge, setEdge] = useState({ top: false, bottom: false });
  const emailRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  // Hydrate draft + focus when opened.
  useEffect(() => {
    if (!isOpen) return;
    setDraft(readDraft());
    setDone(false);
    setErrors({});
    const t = setTimeout(() => emailRef.current?.focus(), 60);
    return () => clearTimeout(t);
  }, [isOpen]);

  // Persist draft as the user types.
  useEffect(() => {
    if (!isOpen) return;
    try {
      localStorage.setItem(DRAFT_KEY, JSON.stringify(draft));
    } catch {
      /* storage unavailable - ignore */
    }
  }, [draft, isOpen]);

  // Lock scroll + close on Escape.
  useEffect(() => {
    if (!isOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prev;
      document.removeEventListener('keydown', onKey);
    };
  }, [isOpen, onClose]);

  // Track scroll position so the edge fades signal there's more below/above.
  const updateEdges = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    const { scrollTop, scrollHeight, clientHeight } = el;
    setEdge({
      top: scrollTop > 4,
      bottom: scrollTop + clientHeight < scrollHeight - 4,
    });
  }, []);

  // Recompute fades on open and whenever the form's height changes (e.g. "other" inputs).
  useEffect(() => {
    if (!isOpen) return;
    const scroller = scrollRef.current;
    const content = contentRef.current;
    if (!scroller || !content) return;
    updateEdges();
    const ro = new ResizeObserver(updateEdges);
    ro.observe(scroller);
    ro.observe(content);
    return () => ro.disconnect();
  }, [isOpen, updateEdges]);

  const toggleMulti = useCallback((field: 'user_personas' | 'use_cases', value: string) => {
    setDraft((d) => {
      const has = d[field].includes(value);
      return { ...d, [field]: has ? d[field].filter((v) => v !== value) : [...d[field], value] };
    });
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const next: Errors = {};
    if (!EMAIL_RE.test(draft.email.trim())) next.email = 'Please enter a valid email address.';
    if (!draft.country) next.country = 'Please select a country.';
    if (draft.user_personas.length === 0) next.user_personas = 'Pick at least one.';
    if (draft.use_cases.length === 0) next.use_cases = 'Pick at least one.';
    if (!consent) next.consent = 'Consent is required to join the waitlist.';
    setErrors(next);
    if (Object.keys(next).length > 0) {
      // Bring the first error into view inside the scroll area (double rAF: after React commits).
      requestAnimationFrame(() =>
        requestAnimationFrame(() => {
          scrollRef.current
            ?.querySelector<HTMLElement>('.wl-err')
            ?.scrollIntoView({ block: 'center', behavior: 'smooth' });
        }),
      );
      return;
    }

    const markDone = () => {
      try {
        localStorage.removeItem(DRAFT_KEY);
      } catch {
        /* ignore */
      }
      setDone(true);
    };

    setSubmitting(true);
    try {
      // Server handles dedup (email is UNIQUE; INSERT ... ON CONFLICT DO NOTHING),
      // so a repeat email is still a 200 and shows the success state.
      const res = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: draft.email.trim().toLowerCase(),
          country: draft.country, // ISO 3166-1 alpha-2
          user_personas: draft.user_personas,
          user_personas_other: draft.user_personas.includes('other') ? draft.user_personas_other.trim() : null,
          use_cases: draft.use_cases,
          use_cases_other: draft.use_cases.includes('other') ? draft.use_cases_other.trim() : null,
          consent,
        }),
      });
      if (!res.ok) throw new Error(`Request failed: ${res.status}`);
      markDone();
    } catch (err) {
      console.error('Waitlist submit failed:', err);
      setErrors({ submit: 'Something went wrong. Please try again.' });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[80] flex items-center justify-center px-4 py-8 sm:py-12">
          <motion.div
            className="fixed inset-0 bg-navy/60 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="wl-title"
            className="relative z-[1] flex max-h-[calc(100dvh_-_4rem)] w-full max-w-2xl flex-col overflow-hidden rounded-[28px] bg-cream text-navy shadow-[0_30px_80px_rgba(12,16,48,0.35)] sm:max-h-[calc(100dvh_-_6rem)]"
            initial={{ opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.98 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
          >
            <button
              onClick={onClose}
              aria-label="Close"
              className="absolute right-4 top-4 z-10 flex h-9 w-9 items-center justify-center rounded-full text-mute transition-colors hover:bg-navy/[0.06] hover:text-navy"
            >
              <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" d="M6 6l12 12M18 6L6 18" />
              </svg>
            </button>

            {done ? (
              <div className="px-6 py-12 text-center sm:px-10">
                <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-blue text-2xl text-white">✓</div>
                <h2 className="font-display text-3xl text-navy sm:text-4xl">You&apos;re on the list.</h2>
                <p className="mx-auto mt-3 max-w-md text-mute">
                  We&apos;ll be in touch as we open beta access in waves. Until then, you can close this window.
                </p>
                <button onClick={onClose} className="btn-blue mt-7 justify-center">
                  Close
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="flex min-h-0 flex-1 flex-col">
                <header className="shrink-0 px-6 pb-5 pr-14 pt-8 sm:px-10 sm:pr-16 sm:pt-10">
                  <p className="eyebrow text-mute">Join the waitlist</p>
                  <h2 id="wl-title" className="font-display mt-2 text-3xl text-navy sm:text-4xl">
                    Three quick questions.
                  </h2>
                  <p className="mt-2 max-w-xl text-mute">
                    Helps us shape the beta and notify you when there&apos;s something useful for you specifically.
                  </p>
                </header>

                <div className="relative flex min-h-0 flex-1 flex-col">
                  <div
                    ref={scrollRef}
                    onScroll={updateEdges}
                    className="wl-scroll min-h-0 flex-1 overflow-y-auto overflow-x-hidden px-6 sm:px-10"
                  >
                    <div ref={contentRef} className="pb-6">
                  {/* Email */}
                  <div className="mb-6">
                    <label htmlFor="wl-email" className="wl-label">Email</label>
                    <input
                      id="wl-email"
                      ref={emailRef}
                      type="email"
                      autoComplete="email"
                      placeholder="you@example.com"
                      value={draft.email}
                      onChange={(e) => setDraft((d) => ({ ...d, email: e.target.value }))}
                      className="wl-input"
                    />
                    {errors.email && <p className="wl-err">{errors.email}</p>}
                  </div>

                  {/* Country */}
                  <div className="mb-6">
                    <label htmlFor="wl-country" className="wl-label">Which country are you in?</label>
                    <p className="-mt-1 mb-2 text-xs text-mute">
                      We&apos;ll let you know when <em>Workings</em> is available in your region.
                    </p>
                    <select
                      id="wl-country"
                      value={draft.country}
                      onChange={(e) => setDraft((d) => ({ ...d, country: e.target.value }))}
                      className="wl-input wl-select"
                    >
                      <option value="" disabled>Select your country…</option>
                      <optgroup label="Frequently selected">
                        {WL_COUNTRIES_TOP.map(([v, l]) => (
                          <option key={`top-${v}`} value={v}>{l}</option>
                        ))}
                      </optgroup>
                      <optgroup label="All countries">
                        {sortedCountries.map(([v, l]) => (
                          <option key={v} value={v}>{l}</option>
                        ))}
                      </optgroup>
                    </select>
                    {errors.country && <p className="wl-err">{errors.country}</p>}
                  </div>

                  {/* Personas */}
                  <fieldset className="mb-6 border-0 p-0">
                    <legend className="wl-label">Which best describes you?</legend>
                    <p className="-mt-1 mb-2 text-xs text-mute">Select all that apply.</p>
                    <div className="grid grid-cols-1 gap-1.5 sm:grid-cols-2 sm:gap-x-4">
                      {WL_PERSONAS.map(([value, label]) => (
                        <WlOption
                          key={value}
                          label={label}
                          checked={draft.user_personas.includes(value)}
                          onChange={() => toggleMulti('user_personas', value)}
                        />
                      ))}
                    </div>
                    {draft.user_personas.includes('other') && (
                      <input
                        type="text"
                        maxLength={80}
                        placeholder="Tell us - max 80 chars"
                        value={draft.user_personas_other}
                        onChange={(e) => setDraft((d) => ({ ...d, user_personas_other: e.target.value }))}
                        className="wl-input mt-2.5"
                      />
                    )}
                    {errors.user_personas && <p className="wl-err">{errors.user_personas}</p>}
                  </fieldset>

                  {/* Use cases */}
                  <fieldset className="mb-6 border-0 p-0">
                    <legend className="wl-label">What do you want to use <em>Workings</em> for?</legend>
                    <p className="-mt-1 mb-2 text-xs text-mute">Select all that apply.</p>
                    <div className="grid grid-cols-1 gap-1.5 sm:grid-cols-2 sm:gap-x-4">
                      {WL_USE_CASES.map(([value, label]) => (
                        <WlOption
                          key={value}
                          label={label}
                          checked={draft.use_cases.includes(value)}
                          onChange={() => toggleMulti('use_cases', value)}
                        />
                      ))}
                    </div>
                    {draft.use_cases.includes('other') && (
                      <input
                        type="text"
                        maxLength={120}
                        placeholder="Tell us - max 120 chars"
                        value={draft.use_cases_other}
                        onChange={(e) => setDraft((d) => ({ ...d, use_cases_other: e.target.value }))}
                        className="wl-input mt-2.5"
                      />
                    )}
                    {errors.use_cases && <p className="wl-err">{errors.use_cases}</p>}
                  </fieldset>

                  {/* Consent */}
                  <label className="flex items-start gap-2.5 text-[0.82rem] leading-relaxed text-mute">
                    <input
                      type="checkbox"
                      checked={consent}
                      onChange={(e) => setConsent(e.target.checked)}
                      className="mt-0.5 h-3.5 w-3.5 shrink-0 accent-[var(--w-blue)]"
                    />
                    <span>
                      I agree that <em>Workings</em> can store my email and responses to contact me about beta access and
                      product updates. I can withdraw consent at any time. See the{' '}
                      <a href="/privacy" className="text-blue underline">privacy policy</a>.
                    </span>
                  </label>
                  {errors.consent && <p className="wl-err">{errors.consent}</p>}
                    </div>
                  </div>

                  {/* Edge fades - hint that fields continue beyond the viewport */}
                  <div
                    aria-hidden
                    className={`pointer-events-none absolute inset-x-0 top-0 h-6 bg-gradient-to-b from-cream to-transparent transition-opacity duration-200 ${edge.top ? 'opacity-100' : 'opacity-0'}`}
                  />
                  <div
                    aria-hidden
                    className={`pointer-events-none absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-cream to-transparent transition-opacity duration-200 ${edge.bottom ? 'opacity-100' : 'opacity-0'}`}
                  />
                </div>

                {/* Pinned action bar - keeps the CTA in view and anchors the scroll region */}
                <div className="shrink-0 border-t border-navy/[0.08] px-6 py-5 sm:px-10">
                  {errors.submit && <p className="wl-err mb-3 text-center">{errors.submit}</p>}
                  <button type="submit" disabled={submitting} className="btn-peach w-full justify-center disabled:opacity-60">
                    {submitting ? 'Joining…' : 'Join waitlist'}
                  </button>
                </div>
              </form>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

function WlOption({ label, checked, onChange }: { label: string; checked: boolean; onChange: () => void }) {
  return (
    <label
      className={`flex cursor-pointer items-start gap-2.5 rounded-xl border px-3 py-2.5 text-[0.92rem] leading-snug transition-colors ${
        checked ? 'border-blue/30 bg-blue/[0.06]' : 'border-transparent hover:bg-navy/[0.04]'
      }`}
    >
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="mt-0.5 h-4 w-4 shrink-0 accent-[var(--w-blue)]"
      />
      <span>{label}</span>
    </label>
  );
}
