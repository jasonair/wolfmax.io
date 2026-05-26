import Link from 'next/link';
import { LegalShell } from '@/components/LegalShell';

export default function TermsPage() {
  return (
    <LegalShell
      eyebrow={<>Legal · workings.io</>}
      title="Terms of use."
      meta="Last updated: 01 April 2026"
      lead={
        <>
          These terms govern your use of the workings.io website and any pre-launch services (waitlist, demos, beta
          access enquiries). Separate terms will apply to the <em>Workings</em> application when it launches.
        </>
      }
    >
      <h2>1. About us</h2>
      <p>
        This website is operated by Human Workings Ltd, a company registered in England &amp; Wales. Contact:{' '}
        <a href="mailto:info@workings.io">info@workings.io</a>.
      </p>

      <h2>2. Acceptable use</h2>
      <p>You may browse this site for any lawful purpose. You agree not to:</p>
      <ul>
        <li>Use the site in any way that breaches applicable law</li>
        <li>Attempt to gain unauthorised access to the site or its hosting infrastructure</li>
        <li>Use automated systems to scrape content at a volume that disrupts service</li>
        <li>Submit waitlist or contact forms with false or misleading information</li>
      </ul>

      <h2>3. Waitlist &amp; beta access</h2>
      <p>
        Joining the waitlist is free and does not guarantee beta or production access. We may invite users to the beta
        in waves and at our discretion. Beta access, if offered, will be governed by separate beta terms.
      </p>
      <p>
        Personal data submitted via the waitlist is handled in accordance with our{' '}
        <Link href="/privacy">Website Privacy Policy</Link>.
      </p>

      <h2>4. Intellectual property</h2>
      <p>
        All content on this website - including the Workings name, logo, brand marks, copy, and design - is owned by
        Human Workings Ltd or licensed to us. You may not reproduce, distribute, or create derivative works without our
        written permission, save for fair-use quotation for the purpose of news reporting, review, or academic citation.
      </p>

      <h2>5. Disclaimer</h2>
      <p>
        The website and its content are provided &quot;as is&quot;. We make no warranties about availability, accuracy,
        or fitness for any particular purpose. Pre-launch claims about the Workings product describe our current
        intentions and are not contractual commitments.
      </p>

      <h2>6. Liability</h2>
      <p>
        To the maximum extent permitted by law, Human Workings Ltd will not be liable for any indirect or consequential
        loss arising from your use of this website. Nothing in these terms limits liability for death or personal injury
        caused by negligence, fraud, or any other liability that cannot be excluded under applicable law.
      </p>

      <h2>7. Governing law</h2>
      <p>
        These terms are governed by the laws of England &amp; Wales. The courts of England &amp; Wales have exclusive
        jurisdiction over any dispute arising from them.
      </p>

      <h2>8. Changes</h2>
      <p>
        We may update these terms from time to time. The current version is always available at{' '}
        <Link href="/terms">workings.io/terms</Link>.
      </p>

      <h2>9. Contact</h2>
      <p>
        <a href="mailto:info@workings.io">info@workings.io</a>
      </p>
    </LegalShell>
  );
}
