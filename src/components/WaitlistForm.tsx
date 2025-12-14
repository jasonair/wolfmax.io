'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { collection, addDoc, query, where, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase';

type FormState = 'idle' | 'loading' | 'success' | 'error' | 'exists';

export function WaitlistForm() {
  const [email, setEmail] = useState('');
  const [formState, setFormState] = useState<FormState>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !email.includes('@')) {
      setFormState('error');
      setErrorMessage('Please enter a valid email address');
      return;
    }

    setFormState('loading');

    try {
      // Check if email already exists
      const waitlistRef = collection(db, 'waitlist');
      const q = query(waitlistRef, where('email', '==', email.toLowerCase()));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        setFormState('exists');
        return;
      }

      // Add new email to waitlist
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
    <div className="w-full max-w-md mx-auto">
      <AnimatePresence mode="wait">
        {formState === 'success' ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="text-center p-6 rounded-2xl bg-brand-green/20 border border-brand-green/30"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
              className="text-4xl mb-3"
            >
              ✓
            </motion.div>
            <h3 className="text-xl font-semibold text-white mb-2">You&apos;re on the list!</h3>
            <p className="text-gray-400 text-sm">
              We&apos;ll be in touch soon with early access details.
            </p>
          </motion.div>
        ) : formState === 'exists' ? (
          <motion.div
            key="exists"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="text-center p-6 rounded-2xl bg-gradient-to-r from-brand-yellow/20 to-brand-purple/20 border border-brand-yellow/30"
          >
            <div className="text-4xl mb-3">👋</div>
            <h3 className="text-xl font-semibold text-white mb-2">Already registered!</h3>
            <p className="text-gray-400 text-sm mb-4">
              This email is already on our waitlist. We&apos;ll reach out soon.
            </p>
            <button
              onClick={resetForm}
              className="text-brand-blue hover:text-brand-purple transition-colors text-sm underline"
            >
              Try another email
            </button>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-4"
          >
            <div className="relative group">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-brand-red via-brand-purple to-brand-blue rounded-xl blur opacity-30 group-hover:opacity-50 transition duration-500"></div>
              <div className="relative flex flex-col sm:flex-row gap-3 p-1 bg-black rounded-xl border border-white/10">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (formState === 'error') resetForm();
                  }}
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-3 bg-transparent text-white placeholder-gray-500 focus:outline-none text-base"
                  disabled={formState === 'loading'}
                />
                <motion.button
                  type="submit"
                  disabled={formState === 'loading'}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-6 py-3 bg-brand-red text-white font-semibold rounded-lg hover:bg-brand-red/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
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
                    'Get Early Access'
                  )}
                </motion.button>
              </div>
            </div>

            <AnimatePresence>
              {formState === 'error' && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="text-brand-red text-sm text-center"
                >
                  {errorMessage}
                </motion.p>
              )}
            </AnimatePresence>

            <p className="text-gray-500 text-xs text-center">
              No spam, ever. We respect your inbox.
            </p>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
