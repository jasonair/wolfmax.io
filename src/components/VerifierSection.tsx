'use client';

import { Section } from './Section';
import { Button } from './Button';

/**
 * Verifier section — answers "why should I trust a report from the author's
 * own app" by promoting the public /verify tool. Anyone can drop a Workings
 * report in and see whether the chain holds without an account or access to
 * the author's underlying record.
 *
 * Quiet expert tone: state what verification means in two sentences and link
 * to the tool. No hype.
 */
export function VerifierSection() {
  return (
    <Section
      surface="navy"
      eyebrow="Independently verifiable"
      title={
        <>
          Anyone can check a <em className="italic">Workings</em> report.
        </>
      }
      intro="No account. No access to your private record. A report either verifies intact, or it doesn't."
    >
      <div className="mt-12 sm:mt-14 flex justify-center">
        <Button href="/verify" variant="ghost-cream" withArrow>
          Open the verifier
        </Button>
      </div>
    </Section>
  );
}
