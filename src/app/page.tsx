'use client';

import { motion, useScroll, useTransform, useInView, AnimatePresence } from 'framer-motion';
import { WolfLogoWithText, WolfLogo } from '@/components/WolfLogo';
import { WaitlistForm } from '@/components/WaitlistForm';
import { useRef, useEffect, useState } from 'react';
import Link from 'next/link';
import { HeartbeatBackground } from '@/components/HeartbeatBackground';
import { FloatingParticles } from '@/components/FloatingParticles';
import { GradientOrbs } from '@/components/GradientOrbs';



// Hero Section
function HeroSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { amount: 0.6 });

  const [showPulse, setShowPulse] = useState(false);

  useEffect(() => {
    if (isInView) {
      const timer = setTimeout(() => setShowPulse(true), 1800);
      return () => clearTimeout(timer);
    } else {
      setShowPulse(false);
    }
  }, [isInView]);

  return (
    <section
      ref={ref}
      className="relative h-screen flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 snap-start shrink-0"
    >
      {/* {isInView && showPulse && <HeartbeatBackground />} */}
      <div className="relative z-10 max-w-4xl mx-auto text-center">
        {/* Logo */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.8 }}
        >
          <WolfLogoWithText className="justify-center" />
        </motion.div>

        {/* Main Headline */}
        <motion.h1
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          Protect your value <br /> <span className="gradient-text">in the AI age.</span>
        </motion.h1>

        <motion.div
          className="flex flex-col items-center justify-center max-w-4xl mx-auto mb-10 space-y-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          {/* Benefit Block */}
          <div className="text-center space-y-4 pt-4 border-t border-white/5 w-full max-w-3xl">
            <p className="text-xl sm:text-2xl text-white font-medium">
              We don&apos;t want your data.
            </p>
            <p className="text-gray-400 text-base sm:text-lg whitespace-nowrap">
              Wolfmax captures how your work was created by humans, AI, or both locally on your device.
            </p>
            <p className="text-gray-400 text-base sm:text-lg mt-2 font-medium">
              Share only what&apos;s needed to protect your credibility.
            </p>
          </div>
        </motion.div>

        {/* Hero CTA Items */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ delay: 1.2, duration: 0.6 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a
            href="#early-access"
            onClick={(e) => {
              e.preventDefault();
              const section = document.getElementById('early-access');
              if (section) {
                section.scrollIntoView({ behavior: 'smooth' });
                setTimeout(() => {
                  const input = document.getElementById('email-input');
                  if (input) input.focus();
                }, 800);
              }
            }}
            className="w-full sm:w-auto px-8 py-4 bg-brand-red text-white font-bold rounded-full hover:scale-105 transition-transform pulse-glow cursor-pointer"
          >
            Join the waitlist
          </a>
          <Link
            href="/blog"
            className="w-full sm:w-auto px-8 py-4 bg-black text-white font-bold rounded-full border border-white/20 hover:bg-white/10 transition-all flex items-center justify-center gap-2 group"
          >
            Read Blog
            <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </Link>
        </motion.div>
      </div>


    </section>
  );
}

function WhyWolfmaxRotating() {
  const bullets = [
    { text: "Protect your reputation", color: "bg-brand-red" },
    { text: "Avoid false AI accusations", color: "bg-brand-purple" },
    { text: "Show your process without exposing your work", color: "bg-brand-blue" },
    { text: "Privately review your process. Improve over time", color: "bg-brand-green" },
  ];

  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % bullets.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="h-8 flex items-center justify-center overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -20, opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="flex items-center gap-3 text-gray-400 font-medium"
        >
          <div className={`w-1.5 h-1.5 rounded-full ${bullets[index].color}`} />
          <span>{bullets[index].text}</span>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

// CTA Section
function CTASection() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.3], [50, 0]);

  return (
    <section
      id="early-access"
      ref={ref}
      className="relative h-screen flex flex-col px-4 sm:px-6 lg:px-8 snap-start shrink-0"
    >
      <div className="flex-1 flex flex-col items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          onViewportEnter={() => {
            // Small delay to ensure snap is settled
            setTimeout(() => {
              document.getElementById('email-input')?.focus();
            }, 600);
          }}
          viewport={{ amount: 0.3 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative z-10 max-w-2xl mx-auto text-center"
        >
          {/* Floating Wolf Icon */}
          <motion.div
            className="mb-4"
            animate={{
              y: [0, -10, 0],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          >
            <WolfLogo className="w-20 h-20 mx-auto" animate={false} />
          </motion.div>

          {/* CTA Title */}
          <motion.h2
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.6 }}
          >
            Get Early Access
          </motion.h2>

          {/* CTA Description */}
          <motion.p
            className="text-lg sm:text-xl text-gray-300 mb-3"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            If your work matters, <span className="text-brand-red font-semibold italic">process</span> matters.
          </motion.p>

          <motion.p
            className="text-base text-gray-400 mb-10"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            Join early and protect what makes your work yours.
          </motion.p>

          {/* Waitlist Form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            <WaitlistForm />
          </motion.div>

          {/* Trust indicators */}
          <motion.div
            className="mt-8 pt-6 border-t border-white/10"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            <motion.p
              className="text-sm text-gray-500 mb-3"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{ delay: 0.7, duration: 0.6 }}
            >
              For creators, professionals, and students who need trust - with complete privacy.
            </motion.p>
            <div className="flex flex-wrap justify-center gap-8 text-sm text-gray-500">
              <div className="flex items-center gap-2">
                <div className="w-1 h-1 rounded-full bg-gray-500" />
                <span>Verifiable Process</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-1 h-1 rounded-full bg-gray-500" />
                <span>Privacy First</span>
              </div>
            </div>

            {/* Why Wolfmax section */}
            <div className="mt-8 text-center">
              <h3 className="text-xl font-bold text-white mb-2">Why Wolfmax?</h3>
              <WhyWolfmaxRotating />
            </div>
          </motion.div>
        </motion.div>
      </div>
      <Footer />
    </section>
  );
}

// Footer
function Footer() {
  return (
    <footer className="relative z-10 py-8 px-4 border-t border-white/5 bg-black">
      <div className="max-w-4xl mx-auto text-center">
        {/* Foundation Text */}
        {/* <div className="space-y-6">
          <p className="text-xl sm:text-2xl text-gray-300 font-light leading-relaxed">
            Because if you&apos;re going to protect human work, <span className="text-white font-semibold">the foundation has to be real</span>.
          </p>
          <p className="text-xl sm:text-2xl text-gray-300 font-light leading-relaxed">
            We&apos;re building openly, carefully, and with the people who care most about keeping the human signal alive.
          </p>
          <p className="text-xl sm:text-2xl text-gray-300 font-light leading-relaxed">
            If that sounds like you, you&apos;re in the right place.
          </p>
        </div> */}

        {/* Powered by Link */}
        {/* <div className="pt-4">
          <a
            href="https://synscribe.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-brand-purple hover:opacity-80 transition-opacity font-medium underline underline-offset-4"
          >
            Powered by Synscribe
          </a>
        </div> */}



        {/* Bottom Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <WolfLogo className="w-8 h-8" animate={false} />
            <span className="text-gray-600 text-sm" suppressHydrationWarning>© {new Date().getFullYear()} Wolfmax. All rights reserved.</span>
          </div>
          <div className="flex items-center gap-6">
            <a
              href="https://x.com/WolfmaxLabs"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-white transition-colors"
              aria-label="Follow us on X (Twitter)"
            >
              <svg
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>
            <div className="flex gap-6 text-sm text-gray-600">
              <Link href="/blog" className="hover:text-white transition-colors">Blog</Link>
              <Link href="/privacy" className="hover:text-white transition-colors">Privacy</Link>
              <Link href="/terms" className="hover:text-white transition-colors">Terms</Link>
              <Link href="/contact" className="hover:text-white transition-colors">Contact</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default function Home() {
  const isMounted = useRef(false);

  useEffect(() => {
    // Nuclear option: Lock scroll, snap to top, then unlock
    document.documentElement.style.scrollBehavior = 'auto';
    window.scrollTo(0, 0);

    const timer = setTimeout(() => {
      window.scrollTo(0, 0);
      document.documentElement.style.scrollBehavior = 'smooth';
    }, 10);

    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative h-screen bg-black overflow-y-auto snap-y snap-mandatory scroll-smooth overflow-x-hidden">
      {/* Background effects */}
      <div className="fixed inset-0 grid-bg pointer-events-none" />
      <FloatingParticles />
      <GradientOrbs />

      {/* Content */}
      <main className="relative z-10">
        <HeroSection />
        <CTASection />
      </main>
    </div>
  );
}
