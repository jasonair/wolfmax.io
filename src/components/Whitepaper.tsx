'use client';

import { motion } from 'framer-motion';
import { Button } from './Button';
import { Eyebrow } from './Eyebrow';
import { Logo } from './Logo';

export function Whitepaper() {
  return (
    <section id="whitepaper" className="surface-navy py-24 sm:py-32">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="card-on-navy overflow-hidden"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12 p-8 sm:p-12 md:p-16">
            {/* Document preview */}
            <div className="shrink-0 w-48 sm:w-56 group cursor-pointer">
              <div className="relative rounded-xl bg-cream p-6 sm:p-8 aspect-[3/4] flex flex-col justify-between transition-transform duration-300 group-hover:-translate-y-1 shadow-[0_20px_50px_rgba(0,0,0,0.3)]">
                <div className="w-full space-y-3">
                  <div className="w-3/4 h-2 rounded-full bg-blue/70" />
                  <div className="w-full h-1.5 rounded-full bg-navy/10" />
                  <div className="w-full h-1.5 rounded-full bg-navy/10" />
                  <div className="w-5/6 h-1.5 rounded-full bg-navy/10" />
                  <div className="w-full h-px bg-navy/10 my-1" />
                  <div className="w-full h-1.5 rounded-full bg-navy/10" />
                  <div className="w-2/3 h-1.5 rounded-full bg-navy/10" />
                  <div className="w-4/5 h-1.5 rounded-full bg-navy/10" />
                </div>
                <div>
                  <Logo variant="dark" className="h-4 w-auto" />
                  <p className="eyebrow text-mute mt-1.5">Whitepaper 2026</p>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 text-center md:text-left">
              <Eyebrow className="text-blue mb-4">Whitepaper</Eyebrow>
              <h2 className="font-display text-3xl sm:text-4xl text-cream mb-4">The Workings whitepaper</h2>
              <p className="text-base sm:text-lg text-cream/80 mb-3 font-medium">
                How verifiable process recording can restore trust in the age of AI-generated content.
              </p>
              <p className="text-sm sm:text-base text-cream/60 mb-8 max-w-lg md:mx-0 mx-auto">
                Covering our technical architecture, privacy model, and the case for process verification across education, media, and creative industries.
              </p>
              <Button href="/whitepaper" variant="blue" withArrow>
                Read the whitepaper
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
