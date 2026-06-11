'use client';

import { motion } from 'framer-motion';
import { Section } from './Section';
import { Button } from './Button';

/**
 * Verifier section — answers "why should I trust a report from the author's
 * own app" by promoting the public /verify tool. Anyone can drop a Workings
 * report in and see whether the chain holds without an account or access to
 * the author's underlying record.
 *
 * The proof card makes the binary tangible: a genuine report verifies, an
 * altered one fails. Quiet expert tone, no hype.
 */

const Check = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.6} strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 6 9 17l-5-5" />
  </svg>
);

const Cross = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.6} strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 6 6 18M6 6l12 12" />
  </svg>
);

export function VerifierSection() {
  return (
    <Section
      surface="cream"
      eyebrow="Independently verifiable"
      title={
        <>
          Anyone can check a <em className="italic">Workings</em> report.
        </>
      }
      intro="No account. No access to your private record. A report either verifies intact, or it doesn't."
      className="!pb-12 sm:!pb-16"
    >
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="mt-12 sm:mt-14 mx-auto max-w-md"
      >
        <div className="overflow-hidden rounded-3xl border border-navy/8 bg-white text-left shadow-[0_18px_50px_rgba(12,16,48,0.07)] divide-y divide-navy/8">
          <div className="flex items-center gap-4 px-6 py-5">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue text-white shadow-[0_6px_16px_rgba(0,72,255,0.3)]">
              <Check />
            </span>
            <span className="flex-1">
              <span className="block text-[0.95rem] font-semibold text-navy">Genuine report</span>
              <span className="mt-0.5 block font-mono text-[0.7rem] tracking-wide text-mute">every record matches its seal</span>
            </span>
            <span className="font-mono text-[0.66rem] uppercase tracking-[0.18em] text-blue">Verifies</span>
          </div>
          <div className="flex items-center gap-4 px-6 py-5">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-navy/15 text-mute">
              <Cross />
            </span>
            <span className="flex-1">
              <span className="block text-[0.95rem] font-semibold text-navy/55 line-through decoration-navy/20">Altered report</span>
              <span className="mt-0.5 block font-mono text-[0.7rem] tracking-wide text-mute">one byte changed after sealing</span>
            </span>
            <span className="font-mono text-[0.66rem] uppercase tracking-[0.18em] text-mute">Fails</span>
          </div>
        </div>
      </motion.div>

      <div className="mt-10 flex justify-center">
        <Button href="/verify" variant="ghost-navy" withArrow>
          Open the verifier
        </Button>
      </div>
    </Section>
  );
}
