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
    <div className="w-full max-w-2xl mx-auto">
      <AnimatePresence mode="wait">
        {formState === 'success' ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="text-center p-8 rounded-2xl bg-brand-green/20 border border-brand-green/30"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
              className="text-5xl mb-4"
            >
              ✓
            </motion.div>
            <h3 className="text-2xl font-semibold text-white mb-2">
              Message Sent!
            </h3>
            <p className="text-gray-400 text-base mb-6">
              Thanks for reaching out. We&apos;ll get back to you as soon as
              possible.
            </p>
            <button
              onClick={resetForm}
              className="px-6 py-3 bg-brand-blue text-white font-semibold rounded-lg hover:bg-brand-blue/90 transition-all"
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
              <div className="relative group">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-brand-red via-brand-purple to-brand-blue rounded-xl blur opacity-20 group-hover:opacity-30 transition duration-500"></div>
                <div className="relative">
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your Name"
                    className="w-full px-4 py-3 bg-black/50 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-brand-blue/50 transition-colors"
                    disabled={formState === 'loading'}
                    required
                  />
                </div>
              </div>

              {/* Email Field */}
              <div className="relative group">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-brand-red via-brand-purple to-brand-blue rounded-xl blur opacity-20 group-hover:opacity-30 transition duration-500"></div>
                <div className="relative">
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Your Email"
                    className="w-full px-4 py-3 bg-black/50 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-brand-blue/50 transition-colors"
                    disabled={formState === 'loading'}
                    required
                  />
                </div>
              </div>
            </div>

            {/* Subject Field */}
            <div className="relative group">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-brand-red via-brand-purple to-brand-blue rounded-xl blur opacity-20 group-hover:opacity-30 transition duration-500"></div>
              <div className="relative">
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="Subject (optional)"
                  className="w-full px-4 py-3 bg-black/50 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-brand-blue/50 transition-colors"
                  disabled={formState === 'loading'}
                />
              </div>
            </div>

            {/* Message Field */}
            <div className="relative group">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-brand-red via-brand-purple to-brand-blue rounded-xl blur opacity-20 group-hover:opacity-30 transition duration-500"></div>
              <div className="relative">
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Your Message"
                  rows={6}
                  className="w-full px-4 py-3 bg-black/50 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-brand-blue/50 transition-colors resize-none"
                  disabled={formState === 'loading'}
                  required
                />
              </div>
            </div>

            {/* Submit Button */}
            <div className="relative group">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-brand-red via-brand-purple to-brand-blue rounded-xl blur opacity-30 group-hover:opacity-50 transition duration-500"></div>
              <motion.button
                type="submit"
                disabled={formState === 'loading'}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="relative w-full px-6 py-4 bg-brand-red text-white font-semibold rounded-xl hover:bg-brand-red/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {formState === 'loading' ? (
                  <span className="flex items-center justify-center gap-2">
                    <motion.span
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                      className="inline-block w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                    />
                    Sending...
                  </span>
                ) : (
                  'Send Message'
                )}
              </motion.button>
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
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}

