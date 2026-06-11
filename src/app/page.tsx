'use client';

import { motion } from 'framer-motion';
import { Eyebrow } from '@/components/Eyebrow';
import { Button } from '@/components/Button';
import { Wave } from '@/components/Wave';
import { Squiggle } from '@/components/Squiggle';
import { HowItWorks } from '@/components/HowItWorks';
import { WorkingsIsDifferent } from '@/components/WorkingsIsDifferent';
import { PrivacySection } from '@/components/PrivacySection';
import Link from 'next/link';
import { useWaitlist } from '@/components/waitlist/WaitlistProvider';
import { useIntroReady } from '@/lib/useIntroReady';

function HeroSection() {
  const { open } = useWaitlist();
  const ready = useIntroReady();
  // Hero text cascades in after the nav line + items (which start ~T+0.4s),
  // then the wave draws across last.
  const reveal = (delay: number, y = 20) => ({
    initial: { opacity: 0, y },
    animate: ready ? { opacity: 1, y: 0 } : { opacity: 0, y },
    transition: { delay, duration: 0.6 },
  });

  return (
    <section className="surface-cream relative overflow-hidden pt-36 pb-56 sm:pt-44 sm:pb-64 px-4 sm:px-6 lg:px-8">
      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <motion.div {...reveal(0.75, 16)}>
          <Eyebrow className="text-mute mb-6">The way you work</Eyebrow>
        </motion.div>

        <motion.h1
          className="font-display text-[2.4rem] sm:text-6xl md:text-[4.4rem] text-navy mb-7 mx-auto max-w-[18ch]"
          {...reveal(0.87)}
          transition={{ delay: 0.87, duration: 0.7 }}
        >
          Asked if you did it?
          <br />
          Show your <em className="italic">workings</em>.
        </motion.h1>

        <motion.p
          className="font-subtitle text-base sm:text-lg text-mute max-w-2xl mx-auto leading-relaxed mb-9"
          {...reveal(1.0)}
        >
          A private, tamper-evident record of how your work was made - human, AI, or both.
          <br />
          Review in private, verify with anyone.
        </motion.p>

        <motion.div {...reveal(1.13)} className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button variant="peach" withArrow onClick={open}>
            Join the waitlist
          </Button>
          <Button href="/#how-it-works" variant="ghost-navy">
            How it works
          </Button>
        </motion.div>
      </div>

      <div className="absolute left-0 right-0 bottom-8 sm:bottom-12 pointer-events-none">
        <Wave className="w-full h-28 sm:h-40 text-blue" strokeWidth={7} draw={ready} drawDelay={1.35} drawDuration={1.5} />
      </div>
    </section>
  );
}

function WMark() {
  return (
    <svg viewBox="0 0 803 734" aria-hidden="true" className="w-full h-full">
      <path
        fill="currentColor"
        d="M487.526,564.71c-1.764,5.439-4.461,8.737-8.562,8.737s-6.919-3.069-6.613-8.264c1.84-31.281,35.183-268.225,39.942-311.415,7.888-71.589-22.422-116.148-80.645-121.428-46.788-4.243-102.362,15.526-137.162,102.873-14.845,37.261-58.534,137.166-82.861,198.365-1.137,2.86-3.147,6.323-7.45,6.323-5.508,0-5.86-6.1-5.767-11.522.749-43.944,1.937-55.903,2.879-83.817,1.246-36.925,4.229-76.87-27.97-99.315-21.214-14.787-63.692-12.394-87.988,4.02-17.561,11.864-32.343,34.172-42.866,51.409-10.904,17.86-31.047,53.227-40.423,72.234-3.717,7.534-2.98,18.112,7.504,21.061,11.459,3.223,29.89,2.293,40.977-.38,9.865-2.378,20.342-11.874,26.522-21.347,7.611-11.665,21.021-32.149,29.541-46.576,1.192-2.018,2.849-3.949,5.327-3.821,2.793.145,3.27,2.362,3.129,4.334-1.655,23.215-5.39,69.54-6.034,122.316-.713,58.486,22.962,77.798,42.935,91.563,20.918,14.416,107.598,34.657,143.671-47.8,28.26-64.599,91.041-216.968,94.432-225.696,2.566-6.606,12.869-5.257,11.258,2.777-.958,4.775-32.08,158.441-49.384,290.956-17.304,132.515,48.848,170.482,99.979,173.437,62.246,3.597,126.087-28.911,165.263-139.072,32.763-92.13,168.239-498.459,183.954-549.608,6.238-20.304-3.31-38.326-24.149-42.452-14.079-2.788-35.325-3.339-58.084-1.645-25.187,1.874-47.002,18.344-55.896,41.98-10.123,26.904-145.878,430.569-175.46,521.772Z"
      />
    </svg>
  );
}

const alsoForLinks = [
  { question: 'Running a course?', label: 'For educators', href: '/institutions#educators' },
  { question: 'Running a team?', label: 'For businesses', href: '/institutions#businesses' },
];

function EarlyAccess() {
  const { open } = useWaitlist();
  return (
    <section id="early-access" className="surface-cream pt-4 sm:pt-6">
      <div className="surface-navy rounded-t-[5rem] px-4 sm:px-6 lg:px-8 pt-24 sm:pt-32 pb-24 sm:pb-32">
        <div className="max-w-6xl mx-auto">

          {/* Independently verifiable */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="text-center max-w-3xl mx-auto"
          >
            <p className="eyebrow text-blue mb-5">Independently verifiable</p>
            <h2 className="font-display text-[2rem] sm:text-[3rem] leading-[1.08] text-cream">
              Anyone can check a <em className="italic">Workings</em> report.
            </h2>
            <p className="font-subtitle mt-5 text-[1.02rem] leading-relaxed text-cream/70 mx-auto max-w-[52ch]">
              No account. No access to your private record. A report either verifies intact, or it doesn&apos;t.
            </p>
            <div className="mt-10">
              <Button href="/verify" variant="ghost-cream" withArrow>
                Open the verifier
              </Button>
            </div>
          </motion.div>

          {/* Also for */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="mt-20 sm:mt-24 max-w-3xl mx-auto"
          >
            <p className="eyebrow text-cream/55 text-center mb-6 sm:mb-8">Also for</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              {alsoForLinks.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  className="group flex items-center justify-between rounded-2xl border border-cream/12 bg-white/[0.04] px-6 py-5 transition-colors hover:border-blue hover:bg-white/[0.07]"
                >
                  <span>
                    <span className="block text-cream/60 text-sm">{l.question}</span>
                    <span className="mt-1 block font-semibold text-cream text-base sm:text-lg">{l.label}</span>
                  </span>
                  <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="text-blue transition-transform group-hover:translate-x-0.5">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </Link>
              ))}
            </div>
          </motion.div>

          {/* Divider */}
          <div className="mt-20 sm:mt-24 border-t border-cream/10" />

          {/* Piloting / waitlist CTA */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className="max-w-2xl mx-auto text-center mt-20 sm:mt-24"
          >
            <div className="w-20 h-20 sm:w-24 sm:h-24 mx-auto mb-8 text-blue">
              <WMark />
            </div>
            <p className="eyebrow text-cream/55 mb-5">Piloting with Pangaea creative agency</p>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl text-cream mb-10 mx-auto max-w-[14ch]">
              Capture your <em className="italic">Workings</em>.
            </h2>
            <div id="signup-target" className="flex justify-center">
              <Button variant="peach" withArrow onClick={open} className="!text-base !px-8 !py-4">
                Join the waitlist
              </Button>
            </div>
            <Squiggle className="w-full max-w-2xl h-8 mx-auto mt-16 text-blue opacity-55" draw />
          </motion.div>

        </div>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <main>
      <HeroSection />
      <WorkingsIsDifferent />
      <HowItWorks />
      <PrivacySection />
      <EarlyAccess />
    </main>
  );
}
