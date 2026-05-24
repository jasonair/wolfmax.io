'use client';

import { motion } from 'framer-motion';
import { ContactForm } from '@/components/ContactForm';
import { Eyebrow } from '@/components/Eyebrow';

export default function ContactPage() {
  return (
    <div className="surface-cream min-h-screen">
      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 sm:pt-40 pb-24 sm:pb-32">
        {/* Header */}
        <motion.header
          className="mb-14"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Eyebrow className="mb-4">Contact</Eyebrow>
          <h1 className="font-display text-5xl sm:text-6xl text-navy tracking-tight mb-5">
            Get in <span className="text-blue">Touch</span>
          </h1>
          <p className="text-mute text-xl max-w-xl leading-relaxed">
            Have a question or want to learn more about Workings? We&apos;d love to hear from you.
          </p>
        </motion.header>

        {/* Contact Form */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <ContactForm />
        </motion.div>

        {/* Additional Contact Info */}
        <motion.div
          className="mt-14 pt-8 border-t border-navy/10 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          <p className="text-mute text-sm">
            Or reach out to us on{' '}
            <a
              href="https://x.com/WolfmaxLabs"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue hover:text-blue/80 transition-colors"
            >
              X (Twitter)
            </a>
          </p>
        </motion.div>
      </main>
    </div>
  );
}
