'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { WaitlistForm } from '@/components/WaitlistForm';
import { useEffect, useState } from 'react';
import { Logo } from '@/components/Logo';
import { Wave } from '@/components/Wave';
import { Squiggle } from '@/components/Squiggle';
import { Eyebrow } from '@/components/Eyebrow';
import { Button } from '@/components/Button';
import { HowItWorks } from '@/components/HowItWorks';
import { SeeInAction } from '@/components/SeeInAction';
import { BuiltForEveryone } from '@/components/BuiltForEveryone';
import { PrivacySection } from '@/components/PrivacySection';
import { ProcessVideos } from '@/components/ProcessVideos';
import { Partnerships } from '@/components/Partnerships';
import { Whitepaper } from '@/components/Whitepaper';

function scrollToEarlyAccess() {
  const section = document.getElementById('early-access');
  if (section) {
    section.scrollIntoView({ behavior: 'smooth' });
    setTimeout(() => document.getElementById('email-input')?.focus(), 800);
  }
}

// Hero Section
function HeroSection() {
  return (
    <section className="surface-cream relative overflow-hidden pt-36 pb-32 sm:pt-44 sm:pb-40 px-4 sm:px-6 lg:px-8">
      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Eyebrow className="text-mute mb-6">The way you work</Eyebrow>
        </motion.div>

        <motion.h1
          className="font-display text-[2.6rem] sm:text-6xl md:text-[4.4rem] text-navy mb-7"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.7 }}
        >
          Prove your process.
          <br />
          Protect your work.
        </motion.h1>

        <motion.p
          className="text-base sm:text-lg text-mute max-w-2xl mx-auto leading-relaxed mb-9"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.6 }}
        >
          We don&apos;t want your data. Workings captures how your work was created
          by humans, AI, or both, locally on your device, and shares only what&apos;s
          needed to protect your credibility.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Button href="/#early-access" variant="peach" onClick={(e) => { e.preventDefault(); scrollToEarlyAccess(); }}>
            Join the waitlist
          </Button>
          <Button href="/blog" variant="ghost-navy" withArrow>
            Read blog
          </Button>
        </motion.div>
      </div>

      {/* Brand wave */}
      <motion.div
        className="absolute left-0 right-0 bottom-0 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 1 }}
      >
        <Wave className="w-full h-32 sm:h-44 text-blue" strokeWidth={7} />
      </motion.div>
    </section>
  );
}

function WhyWorkingsRotating() {
  const bullets = [
    'Protect your reputation',
    'Avoid false AI accusations',
    'Show your process without exposing your work',
    'Privately review your process and improve over time',
  ];

  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % bullets.length);
    }, 3000);
    return () => clearInterval(timer);
  }, [bullets.length]);

  return (
    <div className="h-8 flex items-center justify-center overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -20, opacity: 0 }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
          className="flex items-center gap-3 text-mute font-medium"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-blue" />
          <span>{bullets[index]}</span>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

// CTA Section
function CTASection() {
  return (
    <section id="early-access" className="surface-cream px-4 sm:px-6 lg:px-8 py-24 sm:py-32">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
        className="max-w-2xl mx-auto text-center"
      >
        <div className="mb-6">
          <Logo iconOnly className="w-14 h-14 mx-auto" />
        </div>

        <h2 className="font-display text-3xl sm:text-4xl md:text-5xl text-navy mb-3">
          Get early access
        </h2>
        <p className="text-base sm:text-lg text-mute mb-8">
          If your work matters, your process matters.
        </p>

        <WaitlistForm />

        <div className="mt-8">
          <Squiggle className="w-full h-8 text-blue mb-8" />
          <p className="text-sm text-mute mb-6">
            For creators, professionals, and students, with complete privacy.
          </p>
          <h3 className="text-base font-semibold text-navy mb-2">Why Workings?</h3>
          <WhyWorkingsRotating />
        </div>
      </motion.div>
    </section>
  );
}

export default function Home() {
  return (
    <main>
      <HeroSection />
      <HowItWorks />
      <SeeInAction />
      <BuiltForEveryone />
      <PrivacySection />
      <ProcessVideos />
      <Partnerships />
      <Whitepaper />
      <CTASection />
    </main>
  );
}
