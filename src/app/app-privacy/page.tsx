import Link from 'next/link';
import { LegalShell } from '@/components/LegalShell';

export default function AppPrivacyPage() {
  return (
    <LegalShell
      eyebrow={
        <>
          Legal · <em>Workings</em> app
        </>
      }
      title="App privacy policy."
      meta="Last updated: 01 April 2026"
      note={
        <>
          For the website privacy policy (cookies, waitlist email, contact), see{' '}
          <Link href="/privacy">workings.io/privacy</Link>.
        </>
      }
      lead={
        <>
          This policy covers the <em>Workings</em> desktop application. The <em>Workings</em> app is built so that your
          data belongs to you and only you. Your information stays on your device, under your control, at all times.
          This page explains what data the app handles, how it handles it, and the choices you have.
        </>
      }
    >
      <h2>Information We Collect</h2>
      <p>
        We collect the absolute minimum amount of data necessary to provide our services. When you create an account, we
        store your email address and a hashed version of your password. We do not collect your name, phone number,
        physical address, or any other personal identifiers unless you voluntarily add them to your profile.
      </p>
      <p>
        The content you create, analyze, or process through Workings remains entirely local to your device. Our
        architecture is built on a local-first principle, meaning your files, projects, and workspace data are stored on
        your machine — not on our servers.
      </p>
      <p>
        We do not use tracking pixels, fingerprinting techniques, or hidden identifiers. We collect basic, anonymized
        usage analytics (such as feature usage counts and crash reports) solely to improve the product, and these cannot
        be tied back to any individual user.
      </p>

      <h2>How Your Data is Processed</h2>
      <p>
        Workings operates on a zero-knowledge architecture. All data processing — including analysis, transformations,
        and report generation — happens locally on your device. Your raw data never leaves your machine and is never
        transmitted to our servers.
      </p>
      <p>
        Because processing occurs client-side, we have no ability to read, access, or inspect the content of your work.
        Even if compelled by a legal request, we simply do not possess your data and therefore cannot hand it over. This
        is by design.
      </p>

      <h2>Data You Choose to Share</h2>
      <p>
        Certain features allow you to generate shareable reports, export files, or collaborate with others. When you
        choose to use these features, the data you explicitly select is transmitted through our servers using
        end-to-end encryption. We facilitate the transfer but cannot read the contents.
      </p>
      <p>
        Shared links are encrypted and time-limited by default. You may revoke access to any shared content at any time
        from your dashboard. Once a shared link is revoked or expires, the associated data is permanently deleted from
        our relay servers within 24 hours.
      </p>

      <h2>Encryption &amp; Security</h2>
      <p>
        All communications between your device and our services are encrypted using TLS 1.3. For shared content, we
        employ end-to-end encryption where only the sender and intended recipients hold the decryption keys.
      </p>
      <p>
        Account credentials are hashed using bcrypt with a high work factor before storage. We never store plaintext
        passwords and have no mechanism to recover them — only to reset them.
      </p>
      <p>
        We conduct regular security audits and maintain a responsible disclosure program. If you discover a
        vulnerability, please report it to <a href="mailto:security@workings.io">security@workings.io</a>.
      </p>

      <h2>Third-Party Services</h2>
      <p>
        We use a small number of third-party services to operate Workings. These include infrastructure providers for
        hosting and a payment processor for handling subscriptions. We do not sell, rent, or share your personal
        information with third parties for marketing or advertising purposes.
      </p>
      <p>
        Our third-party providers are contractually bound to process data only as instructed by us and to maintain
        appropriate security measures. We do not use any third-party analytics services that track individual users
        across the web.
      </p>

      <h2>Data Retention</h2>
      <p>
        Since your workspace data is stored locally on your device, you have full control over its retention. We do not
        maintain copies of your local data on our servers.
      </p>
      <p>
        Account information (email and hashed password) is retained for as long as your account is active. If you delete
        your account, all associated data on our servers is permanently erased within 30 days.
      </p>
      <p>
        Anonymized, aggregated analytics data may be retained indefinitely to help us understand long-term product
        trends, but this data contains no personally identifiable information.
      </p>

      <h2>Your Rights</h2>
      <p>Regardless of where you are located, we extend the following rights to all Workings users:</p>
      <ul>
        <li>
          <strong>Access</strong> — You may request a copy of all personal data we hold about you at any time.
        </li>
        <li>
          <strong>Deletion</strong> — You may request the permanent deletion of your account and all associated data
          from our servers.
        </li>
        <li>
          <strong>Portability</strong> — You may export all of your local data in standard, open formats at any time
          directly from the application.
        </li>
        <li>
          <strong>Correction</strong> — You may update or correct any personal information stored in your account.
        </li>
        <li>
          <strong>Objection</strong> — You may opt out of anonymized analytics collection through your account settings.
        </li>
      </ul>
      <p>
        To exercise any of these rights, contact us at <a href="mailto:privacy@workings.io">privacy@workings.io</a>. We
        will respond to all requests within 14 days.
      </p>

      <h2>Children&apos;s Privacy</h2>
      <p>
        Workings is not directed at children under the age of 16. We do not knowingly collect personal information from
        anyone under 16. If we become aware that a child under 16 has provided us with personal data, we will take
        immediate steps to delete that information. If you believe a child has provided us with their data, please
        contact us at <a href="mailto:privacy@workings.io">privacy@workings.io</a>.
      </p>

      <h2>Changes to This Policy</h2>
      <p>
        We may update this Privacy Policy from time to time to reflect changes in our practices or for legal and
        regulatory reasons. When we make material changes, we will notify you by email or through a prominent notice
        within the application at least 30 days before the changes take effect. Your continued use of Workings after the
        effective date constitutes acceptance of the revised policy.
      </p>

      <h2>Contact Us</h2>
      <p>
        If you have any questions, concerns, or requests regarding this Privacy Policy or our data practices, please
        reach out to us:
      </p>
      <p>
        <a href="mailto:privacy@workings.io">privacy@workings.io</a>
      </p>
    </LegalShell>
  );
}
