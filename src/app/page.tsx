'use client';

import { motion, useScroll, useTransform, useInView } from 'framer-motion';
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
      {isInView && showPulse && <HeartbeatBackground />}
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
          Show how your <br /> <span className="gradient-text">work was created.</span>
        </motion.h1>

        <motion.p
          className="text-sm sm:text-base md:text-lg text-gray-300 mb-6 max-w-3xl mx-auto text-balance"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          Wolfmax provides proof of how work was made <span className="text-white">human, AI, or both</span> without collecting your content.
        </motion.p>

        {/* Description */}
        <motion.p
          className="text-sm sm:text-base text-gray-400 max-w-2xl mx-auto leading-relaxed mb-8 text-balance"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ delay: 0.7, duration: 0.6 }}
        >
          Your content stays yours. <span className="text-gray-300">Private and local by default.</span>
        </motion.p>

        {/* Feature Points */}
        <motion.div
          className="flex flex-col sm:flex-row flex-wrap justify-center gap-4 sm:gap-8 text-sm sm:text-base text-gray-400 mb-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ delay: 0.9, duration: 0.6 }}
        >
          <div className="flex items-center justify-center gap-2">
            <div className="w-2 h-2 rounded-full bg-brand-green shadow-[0_0_10px_rgba(126,252,216,0.5)]"></div>
            <span>Share proof with anyone</span>
          </div>
          <div className="flex items-center justify-center gap-2">
            <div className="w-2 h-2 rounded-full bg-brand-blue shadow-[0_0_10px_rgba(83,132,237,0.5)]"></div>
            <span>Works with humans and AI</span>
          </div>
          <div className="flex items-center justify-center gap-2">
            <div className="w-2 h-2 rounded-full bg-brand-purple shadow-[0_0_10px_rgba(140,27,246,0.5)]"></div>
            <span>No uploads, no training</span>
          </div>
        </motion.div>

        {/* Tagline */}
        <motion.p
          className="text-lg font-medium text-white mb-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ delay: 1.1, duration: 0.6 }}
        >
          Peace of mind in an age of AI.
        </motion.p>

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
            If your work matters, <span className="text-brand-red font-semibold">proof matters</span>.
          </motion.p>

          <motion.p
            className="text-base text-gray-400 mb-10"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            Join the Wolfmax waitlist and help define the standard for authorship in the AI era.
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
            className="mt-16 pt-8 border-t border-white/10"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            <motion.p
              className="text-sm text-gray-500 mb-6"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{ delay: 0.7, duration: 0.6 }}
            >
              For creators, professionals, and students who need trust - with complete privacy.
            </motion.p>
            <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-500">
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 text-brand-green" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>Verifiable Proof</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 text-brand-blue" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>Privacy First</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 text-brand-purple" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
                </svg>
                <span>Human Verified</span>
              </div>
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
