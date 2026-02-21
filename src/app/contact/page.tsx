'use client';

import { motion } from 'framer-motion';
import { ContactForm } from '@/components/ContactForm';
import Link from 'next/link';
import { FloatingParticles } from '@/components/FloatingParticles';
import { GradientOrbs } from '@/components/GradientOrbs';


export default function ContactPage() {
  return (
    <div className="relative min-h-screen bg-black overflow-hidden">
      {/* Background effects */}
      <div className="fixed inset-0 grid-bg opacity-30 pointer-events-none" />
      <FloatingParticles />
      <GradientOrbs />

      {/* Main Content */}
      <main className="relative z-10 min-h-[calc(100vh-200px)] flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 pt-32 pb-12">
        <div className="w-full max-w-4xl mx-auto">
          {/* Header */}
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.h1
              className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.8 }}
            >
              Get in Touch
            </motion.h1>
            <motion.p
              className="text-lg sm:text-xl text-gray-300 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              Have a question or want to learn more about{' '}
              <span className="text-white font-semibold">Wolfmax</span>?
              <br />
              We&apos;d love to hear from you.
            </motion.p>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            <ContactForm />
          </motion.div>

          {/* Additional Contact Info */}
          <motion.div
            className="mt-16 pt-8 border-t border-white/10 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.6 }}
          >
            <p className="text-gray-500 text-sm mb-4">
              Or reach out to us on{' '}
              <a
                href="https://x.com/WolfmaxLabs"
                target="_blank"
                rel="noopener noreferrer"
                className="text-brand-blue hover:text-brand-purple transition-colors"
              >
                X (Twitter)
              </a>
            </p>
          </motion.div>
        </div>
      </main>
    </div>
  );
}

