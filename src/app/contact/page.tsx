'use client';

import { motion } from 'framer-motion';
import { WolfLogoWithText } from '@/components/WolfLogo';
import { ContactForm } from '@/components/ContactForm';
import Link from 'next/link';

// Animated background particles (same as homepage)
function FloatingParticles() {
  const particles = Array.from({ length: 30 }, (_, i) => ({
    id: i,
    size: Math.random() * 4 + 1,
    x: Math.random() * 100,
    y: Math.random() * 100,
    duration: Math.random() * 20 + 10,
    delay: Math.random() * 5,
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full bg-white/5"
          style={{
            width: particle.size,
            height: particle.size,
            left: `${particle.x}%`,
            top: `${particle.y}%`,
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0.2, 0.5, 0.2],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            delay: particle.delay,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  );
}

// Gradient orbs for visual interest
function GradientOrbs() {
  return (
    <>
      <motion.div
        className="absolute top-1/4 -left-32 w-96 h-96 rounded-full bg-brand-purple/20 blur-[100px]"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
      <motion.div
        className="absolute bottom-1/4 -right-32 w-96 h-96 rounded-full bg-brand-blue/20 blur-[100px]"
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 2,
        }}
      />
      <motion.div
        className="absolute top-2/3 left-1/3 w-64 h-64 rounded-full bg-brand-red/10 blur-[80px]"
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 4,
        }}
      />
    </>
  );
}

export default function ContactPage() {
  return (
    <div className="relative min-h-screen bg-black overflow-hidden">
      {/* Background effects */}
      <div className="fixed inset-0 grid-bg" />
      <FloatingParticles />
      <GradientOrbs />

      {/* Navigation */}
      <nav className="relative z-20 py-6 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link href="/">
            <WolfLogoWithText className="hover:opacity-80 transition-opacity" />
          </Link>
          <Link
            href="/"
            className="text-gray-400 hover:text-white transition-colors text-sm"
          >
            ← Back to Home
          </Link>
        </div>
      </nav>

      {/* Main Content */}
      <main className="relative z-10 min-h-[calc(100vh-200px)] flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 py-12">
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

