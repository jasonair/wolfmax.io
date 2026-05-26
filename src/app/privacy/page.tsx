import Link from 'next/link';
import { LegalShell } from '@/components/LegalShell';

export default function PrivacyPage() {
  return (
    <LegalShell
      eyebrow={<>Legal · workings.io</>}
      title="Website privacy policy."
      meta="Last updated: 26 May 2026 · Effective immediately"
      note={
        <>
          For the <em>Workings</em> desktop application privacy policy (the local recording engine, encryption,
          zero-knowledge architecture), see <Link href="/app-privacy">App privacy policy</Link>.
        </>
      }
      lead={
        <>
          This policy explains how Human <em>Workings</em> Ltd (&quot;<em>Workings</em>&quot;, &quot;we&quot;,
          &quot;us&quot;) collects and uses personal data when you visit <strong>workings.io</strong> or interact with us
          via this website. It is written to comply with the UK General Data Protection Regulation (UK GDPR), the EU
          General Data Protection Regulation (EU GDPR), and the UK Data Protection Act 2018.
        </>
      }
    >
      <h2>1. Who we are (data controller)</h2>
      <p>The data controller for personal information collected through this website is:</p>
      <p>
        <strong>Human Workings Ltd</strong>
        <br />
        Registered in England &amp; Wales · Company number to be confirmed
        <br />
        Contact: <a href="mailto:privacy@workings.io">privacy@workings.io</a>
      </p>

      <h2>2. What we collect</h2>
      <p>
        We deliberately collect as little personal data as possible. The only personal data we routinely collect through
        this website is:
      </p>
      <ul>
        <li>
          <strong>Waitlist / early-access email address</strong> - when you submit the form on our home page, we store
          your email address so we can notify you about the Workings beta and product launch.
        </li>
        <li>
          <strong>Email correspondence</strong> - when you email us (contact, careers, universities, security, privacy),
          we receive your email address and the content of your message.
        </li>
        <li>
          <strong>Consent &amp; preference signals</strong> - a small browser storage record of your cookie / consent
          choice, so we don&apos;t ask you again.
        </li>
        <li>
          <strong>Analytics data (only if you accept)</strong> - if you consent to analytics, Google Analytics collects
          standard usage data such as the pages you view, approximate location (country / region, derived from a
          truncated IP address), and device and browser type. We use it to understand site traffic only; we have not
          enabled Google Analytics advertising or remarketing features.
        </li>
      </ul>
      <p>
        With your consent, we use <strong>Google Analytics</strong> to measure website traffic (see section 4).
        Analytics stays switched off until you accept it, and you can withdraw at any time. We do <strong>not</strong>{' '}
        use advertising trackers, social-media pixels, session replay, fingerprinting, or any cross-site tracking on this
        website.
      </p>

      <h2>3. Lawful basis for processing</h2>
      <ul>
        <li>
          <strong>Waitlist email:</strong> Article 6(1)(a) UK/EU GDPR - your <em>consent</em>, given when you tick the
          consent box and submit the waitlist form. You may withdraw consent at any time by emailing{' '}
          <a href="mailto:privacy@workings.io">privacy@workings.io</a> or by unsubscribing from any email we send.
        </li>
        <li>
          <strong>Correspondence you send us:</strong> Article 6(1)(f) - our <em>legitimate interest</em> in responding
          to your enquiry.
        </li>
        <li>
          <strong>Essential consent storage:</strong> Article 6(1)(f) - legitimate interest in honouring your privacy
          preferences.
        </li>
        <li>
          <strong>Analytics (Google Analytics):</strong> Article 6(1)(a) - your <em>consent</em>, given when you choose
          &quot;Accept&quot; on our cookie notice. No analytics cookies are set before then. You may withdraw consent at
          any time via the <strong>Cookie preferences</strong> link in the footer, which also clears the analytics
          cookies from your browser.
        </li>
      </ul>

      <h2>4. Cookies &amp; local storage</h2>
      <p>
        <strong>Essential storage</strong> is always present and is never used for tracking:
      </p>
      <ul>
        <li>
          <code>workings_consent</code> - records your cookie choice (accept or reject) so we don&apos;t ask you again
          (browser local storage; expires after 12 months).
        </li>
        <li>
          <code>workings_waitlist_draft</code> - temporarily holds your waitlist form entry so it isn&apos;t lost
          (cleared as soon as you submit).
        </li>
      </ul>
      <p>
        <strong>Analytics cookies</strong> are set <strong>only if you choose &quot;Accept&quot;</strong> on the cookie
        notice. If you accept, Google Analytics sets cookies such as <code>_ga</code> and <code>_ga_&lt;id&gt;</code>{' '}
        (typically lasting up to ~13 months) to distinguish visitors and measure traffic. If you reject - or never
        choose - none of these cookies are set and no Google Analytics script is loaded.
      </p>
      <p>
        You can change your mind at any time via the <strong>Cookie preferences</strong> link in the footer. Choosing
        &quot;Reject&quot; there records your choice and removes any existing Google Analytics cookies. You can also
        clear all of this through your browser&apos;s site-data controls.
      </p>

      <h2>5. How long we keep your data</h2>
      <ul>
        <li>
          <strong>Waitlist email:</strong> until you ask us to remove it, or for up to 24 months after the public launch
          of Workings - whichever comes first.
        </li>
        <li>
          <strong>Email correspondence:</strong> for as long as needed to answer your enquiry and for up to 24 months
          thereafter for service continuity.
        </li>
        <li>
          <strong>Consent storage:</strong> 12 months, then re-prompted.
        </li>
      </ul>

      <h2>6. Who we share data with</h2>
      <p>We use a small number of trusted processors to operate this website and our email list:</p>
      <ul>
        <li>
          <strong>Hosting &amp; CDN provider</strong> - static site hosting and content delivery. Bound by SCCs &amp; UK
          IDTA where applicable.
        </li>
        <li>
          <strong>Email service provider</strong> - for waitlist and transactional email. Provider to be confirmed
          before list activation; will be a GDPR-compliant processor with appropriate data-transfer safeguards.
        </li>
        <li>
          <strong>Google Analytics (Google Ireland Ltd / Google LLC)</strong> - website analytics, used{' '}
          <strong>only with your consent</strong>. Data may be transferred to the United States under Google&apos;s
          Standard Contractual Clauses and the EU-US / UK-US Data Privacy Framework.
        </li>
      </ul>
      <p>
        We do <strong>not</strong> sell, rent, or share your personal data with anyone for advertising or marketing
        purposes.
      </p>
      <p>
        If a processor is located outside the UK / EEA, we ensure appropriate safeguards are in place (Standard
        Contractual Clauses, UK International Data Transfer Addendum, or an adequacy decision).
      </p>

      <h2>7. Your rights</h2>
      <p>Under UK and EU GDPR, you have the right to:</p>
      <ul>
        <li>
          <strong>Access</strong> the personal data we hold about you
        </li>
        <li>
          <strong>Rectify</strong> inaccurate or incomplete data
        </li>
        <li>
          <strong>Erase</strong> your data (&quot;right to be forgotten&quot;)
        </li>
        <li>
          <strong>Restrict</strong> how we process your data
        </li>
        <li>
          <strong>Port</strong> your data in a structured, machine-readable format
        </li>
        <li>
          <strong>Object</strong> to processing based on legitimate interest
        </li>
        <li>
          <strong>Withdraw consent</strong> at any time, where processing is based on consent
        </li>
      </ul>
      <p>
        To exercise any of these rights, email <a href="mailto:privacy@workings.io">privacy@workings.io</a>. We will
        respond within one calendar month.
      </p>
      <p>
        You also have the right to lodge a complaint with the UK Information Commissioner&apos;s Office (
        <a href="https://ico.org.uk" target="_blank" rel="noopener noreferrer">
          ico.org.uk
        </a>
        ) or your local EU data protection authority.
      </p>

      <h2>8. Security</h2>
      <p>
        We protect your data with TLS in transit, encryption at rest with our hosting and email providers, access
        controls limited to named team members, and a responsible-disclosure programme. Report security issues to{' '}
        <a href="mailto:security@workings.io">security@workings.io</a>.
      </p>

      <h2>9. Children</h2>
      <p>
        This website is not directed at children under 16. If you believe a child has provided us with personal data,
        contact <a href="mailto:privacy@workings.io">privacy@workings.io</a> and we will delete it.
      </p>

      <h2>10. Changes to this policy</h2>
      <p>
        We may update this policy from time to time. The &quot;Last updated&quot; date at the top of this page always
        reflects the current version. If we make material changes that affect data we already hold (for example, a new
        processor or a new processing purpose), we will email everyone on our waitlist before the change takes effect.
      </p>

      <h2>11. Contact</h2>
      <p>Questions, requests, or complaints about this policy or our use of your data:</p>
      <p>
        <a href="mailto:privacy@workings.io">privacy@workings.io</a>
      </p>
    </LegalShell>
  );
}
