'use client';

import { motion } from 'framer-motion';
import { ContactForm } from '@/components/ContactForm';
import Link from 'next/link';
import { FloatingParticles } from '@/components/FloatingParticles';
import { GradientOrbs } from '@/components/GradientOrbs';


export default function ContactPage() {
  return (
    <div className="relative bg-black">
      {/* Background effects */}
      <div className="fixed inset-0 grid-bg pointer-events-none" />
      <FloatingParticles />
      <GradientOrbs />

      {/* Main Content */}
      <main className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 sm:pt-40 pb-24 sm:pb-32">
        <div className="w-full">
          {/* Header */}
          <motion.header
            className="mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold text-white mb-6 tracking-tight">
              Get in <span className="text-brand-red">Touch</span>
            </h1>
            <p className="text-gray-400 text-xl max-w-2xl leading-relaxed">
              Have a question or want to learn more about Wolfmax? We&apos;d love to hear from you.
            </p>
          </motion.header>

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

