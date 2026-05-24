'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

type FormState = 'idle' | 'loading' | 'success' | 'error';

export function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [formState, setFormState] = useState<FormState>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (formState === 'error') {
      setFormState('idle');
      setErrorMessage('');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (!formData.name.trim()) {
      setFormState('error');
      setErrorMessage('Please enter your name');
      return;
    }

    if (!formData.email || !formData.email.includes('@')) {
      setFormState('error');
      setErrorMessage('Please enter a valid email address');
      return;
    }

    if (!formData.message.trim()) {
      setFormState('error');
      setErrorMessage('Please enter a message');
      return;
    }

    setFormState('loading');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to send message');
      }

      setFormState('success');
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
      });
    } catch (error) {
      console.error('Error submitting contact form:', error);
      setFormState('error');
      setErrorMessage(
        error instanceof Error
          ? error.message
          : 'Something went wrong. Please try again.'
      );
    }
  };

  const resetForm = () => {
    setFormState('idle');
    setErrorMessage('');
  };

  return (
    <div className="w-full">
      <AnimatePresence mode="wait">
        {formState === 'success' ? (
          <motion.div
            key="success"
            role="status"
            aria-live="polite"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            className="text-center p-10 rounded-2xl bg-blue/[0.06] border border-blue/25"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
              className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-blue/10 mb-5"
            >
              <svg
                className="w-7 h-7 text-blue"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2.5}
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </motion.div>
            <h3 className="font-display text-2xl text-navy mb-2">
              Message Sent
            </h3>
            <p className="text-mute text-base mb-7">
              Thanks for reaching out. We&apos;ll get back to you as soon as possible.
            </p>
            <button
              onClick={resetForm}
              className="btn-blue rounded-full px-6 py-2.5 text-sm font-semibold"
            >
              Send Another Message
            </button>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-5"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {/* Name Field */}
              <div>
                <label htmlFor="name" className="eyebrow block mb-2">
                  Name
                </label>
                <input
                  id="name"
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your name"
                  className="w-full px-4 py-3 bg-white border border-navy/10 rounded-xl text-navy placeholder:text-mute/70 focus:outline-none focus:border-blue transition-colors disabled:opacity-50"
                  disabled={formState === 'loading'}
                  required
                />
              </div>

              {/* Email Field */}
              <div>
                <label htmlFor="email" className="eyebrow block mb-2">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="your@email.com"
                  className="w-full px-4 py-3 bg-white border border-navy/10 rounded-xl text-navy placeholder:text-mute/70 focus:outline-none focus:border-blue transition-colors disabled:opacity-50"
                  disabled={formState === 'loading'}
                  required
                />
              </div>
            </div>

            {/* Subject Field */}
            <div>
              <label htmlFor="subject" className="eyebrow block mb-2">
                Subject <span className="normal-case font-normal text-mute/60">(optional)</span>
              </label>
              <input
                id="subject"
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                placeholder="What is this about?"
                className="w-full px-4 py-3 bg-white border border-navy/10 rounded-xl text-navy placeholder:text-mute/70 focus:outline-none focus:border-blue transition-colors disabled:opacity-50"
                disabled={formState === 'loading'}
              />
            </div>

            {/* Message Field */}
            <div>
              <label htmlFor="message" className="eyebrow block mb-2">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Tell us how we can help…"
                rows={6}
                className="w-full px-4 py-3 bg-white border border-navy/10 rounded-xl text-navy placeholder:text-mute/70 focus:outline-none focus:border-blue transition-colors resize-none disabled:opacity-50"
                disabled={formState === 'loading'}
                required
              />
            </div>

            {/* Submit Button */}
            <div>
              <motion.button
                type="submit"
                disabled={formState === 'loading'}
                whileTap={{ scale: 0.98 }}
                className="btn-blue w-full sm:w-auto rounded-full px-8 py-3 font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {formState === 'loading' ? (
                  <span className="flex items-center justify-center gap-2">
                    <motion.span
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                      className="inline-block w-4 h-4 border-2 border-white/40 border-t-white rounded-full"
                    />
                    Sending…
                  </span>
                ) : (
                  'Send Message'
                )}
              </motion.button>
            </div>

            <AnimatePresence>
              {formState === 'error' && (
                <motion.p
                  role="alert"
                  aria-live="assertive"
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  className="text-blue text-sm"
                >
                  {errorMessage}
                </motion.p>
              )}
            </AnimatePresence>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
