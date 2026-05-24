'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { collection, addDoc, query, where, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase';

type FormState = 'idle' | 'loading' | 'success' | 'error' | 'exists';

export function WaitlistForm({ buttonText = "Start protecting your process" }: { buttonText?: string }) {
  const [email, setEmail] = useState('');
  const [formState, setFormState] = useState<FormState>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleHashFocus = () => {
      if (window.location.hash === '#early-access') {
        setTimeout(() => {
          inputRef.current?.focus();
        }, 800);
      }
    };

    handleHashFocus();
    window.addEventListener('hashchange', handleHashFocus);
    return () => window.removeEventListener('hashchange', handleHashFocus);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !email.includes('@')) {
      setFormState('error');
      setErrorMessage('Please enter a valid email address');
      return;
    }

    setFormState('loading');

    try {
      const waitlistRef = collection(db, 'waitlist');
      const q = query(waitlistRef, where('email', '==', email.toLowerCase()));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        setFormState('exists');
        return;
      }

      await addDoc(waitlistRef, {
        email: email.toLowerCase(),
        createdAt: new Date().toISOString(),
        source: 'landing-page',
      });

      setFormState('success');
      setEmail('');
    } catch (error) {
      console.error('Error adding to waitlist:', error);
      setFormState('error');
      setErrorMessage('Something went wrong. Please try again.');
    }
  };

  const resetForm = () => {
    setFormState('idle');
    setErrorMessage('');
  };

  return (
    <div className="w-full max-w-xl mx-auto">
      <AnimatePresence mode="wait">
        {formState === 'success' ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="text-center p-6 rounded-[22px] bg-blue/[0.06] border border-blue/25"
          >
            <div className="w-10 h-10 rounded-full bg-blue text-white flex items-center justify-center mx-auto mb-3 text-lg">✓</div>
            <h3 className="text-xl font-semibold text-navy mb-2">You&apos;re on the list!</h3>
            <p className="text-mute text-sm">We&apos;ll be in touch soon with early access details.</p>
          </motion.div>
        ) : formState === 'exists' ? (
          <motion.div
            key="exists"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="text-center p-6 rounded-[22px] bg-blue/[0.06] border border-blue/25"
          >
            <div className="text-3xl mb-3">👋</div>
            <h3 className="text-xl font-semibold text-navy mb-2">Already registered!</h3>
            <p className="text-mute text-sm mb-4">This email is already on our waitlist. We&apos;ll reach out soon.</p>
            <button onClick={resetForm} className="text-blue hover:text-blue-700 transition-colors text-sm underline">
              Try another email
            </button>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            className="space-y-4"
          >
            <div className="relative flex flex-col sm:flex-row gap-3 p-1.5 bg-white rounded-2xl border border-navy/10 focus-within:border-blue transition-colors">
              <input
                ref={inputRef}
                id="email-input"
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (formState === 'error') resetForm();
                }}
                placeholder="Enter your email"
                className="flex-1 min-w-0 px-4 py-2.5 bg-transparent text-navy placeholder-mute/70 focus:outline-none text-sm sm:text-base w-full sm:w-auto"
                disabled={formState === 'loading'}
              />
              <button
                type="submit"
                disabled={formState === 'loading'}
                className="btn-peach shrink-0 justify-center whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {formState === 'loading' ? (
                  <span className="flex items-center gap-2">
                    <motion.span
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                      className="inline-block w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
                    />
                    Joining...
                  </span>
                ) : (
                  buttonText
                )}
              </button>
            </div>

            <AnimatePresence>
              {formState === 'error' && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="text-blue text-sm text-center font-medium"
                >
                  {errorMessage}
                </motion.p>
              )}
            </AnimatePresence>

            <p className="text-mute text-xs text-center">No spam, ever. We respect your inbox.</p>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
