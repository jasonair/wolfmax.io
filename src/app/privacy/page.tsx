import Link from 'next/link';
import { LegalShell } from '@/components/LegalShell';

export default function PrivacyPage() {
  return (
    <LegalShell
      eyebrow={<>Legal · workings.io</>}
      title="Website privacy policy."
      meta="Last updated: 27 May 2026"
      note={
        <>
          For the Workings desktop application privacy policy (the local recording engine, encryption,
          zero-knowledge architecture), see <Link href="/app-privacy">App privacy policy</Link>.
        </>
      }
      lead={
        <>
          This policy covers only the personal data collected through the <strong>workings.io</strong> website -
          specifically the waitlist sign-up form and any direct communications you send to us. It does not cover the
          Workings product itself, which is subject to a separate privacy policy.
        </>
      }
    >
      <h2>1. Who we are</h2>
      <p>
        This website (workings.io) is operated by <strong>Human Workings Ltd</strong>, a company incorporated in
        England and Wales with company number 16688102.
      </p>
      <p>
        <strong>Registered address:</strong>
        <br />
        Human Workings Ltd
        <br />
        c/o PSF Accounting Ltd
        <br />
        13 St Mary&apos;s Street
        <br />
        Stamford
        <br />
        England PE9 2DE
      </p>
      <p>
        For any privacy-related queries, contact us at:{' '}
        <a href="mailto:privacy@workings.io">privacy@workings.io</a>
      </p>
      <p>Human Workings Ltd is the data controller for the personal data collected through this website.</p>

      <h2>2. What this policy covers</h2>
      <p>
        This policy covers only the personal data collected through the workings.io website - specifically the waitlist
        sign-up form and any direct communications you send to us. It does not cover the Workings product itself,
        which is subject to a separate privacy policy.
      </p>

      <h2>3. What data we collect</h2>

      <h3>3.1 Waitlist sign-up</h3>
      <p>When you join our waitlist, we collect:</p>
      <ul>
        <li>Your email address</li>
        <li>
          Which best describes you - role type (selected from a list of checkboxes, e.g. Student, Academic / educator,
          Founder / business owner, Developer / engineer, Creative professional, Freelancer / contractor, Influencer /
          content creator, IP developer / inventor, Consultant, Full-time employee, Other)
        </li>
        <li>
          Your intended use case for Workings (selected from a list of checkboxes, e.g. Protect my IP, Prove the work
          is mine (authorship), Provide evidence of my creative process, Generate a timelapse of my work, Show how much
          is human vs AI, Track contribution in group / team work, Academic integrity / coursework, Build a portfolio /
          showcase my craft, Just curious / exploring, Other)
        </li>
        <li>
          Which country you are in (selected from a dropdown list, used to notify you when Workings is available in
          your region)
        </li>
      </ul>
      <p>
        You provide this data voluntarily when you complete the waitlist form and check the consent box. We do not
        collect your name.
      </p>

      <h3>3.2 Direct contact</h3>
      <p>
        If you contact us by email, we will receive and store the contents of that communication, including any
        personal data you choose to include.
      </p>

      <h3>3.3 Website analytics</h3>
      <p>We use Google Analytics to collect information about how visitors use this website. This may include:</p>
      <ul>
        <li>Pages visited and time spent on each page</li>
        <li>General geographic location (country or region level)</li>
        <li>Device type and browser</li>
        <li>How you arrived at the website (e.g. search engine, direct link)</li>
      </ul>
      <p>
        Google Analytics uses cookies to collect this information. The data is aggregated and does not directly
        identify you. Analytics cookies are only set if you consent via the cookie notice on first visit; if you
        decline or do not consent, no Google Analytics script is loaded. Please see Section 6 (Cookies) for further
        detail.
      </p>

      <h2>4. How we use your data</h2>
      <p>We use the data we collect for the following purposes:</p>
      <ul>
        <li>To contact you about beta access and product updates, where you have given consent to this</li>
        <li>
          To understand the types of people joining the waitlist (including their roles and intended use cases) and the
          countries they are in, so we can shape the product and beta programme and notify users when Workings is
          available in their region
        </li>
        <li>To respond to enquiries sent to us by email</li>
        <li>To monitor and improve the performance and usability of this website (via aggregated analytics)</li>
      </ul>

      <h2>5. Legal basis for processing</h2>
      <p>
        We process your personal data on the following legal bases under UK GDPR and, where applicable, EU GDPR:
      </p>
      <ul>
        <li>
          <strong>Consent (Article 6(1)(a)):</strong> for storing your email address and survey responses (role type,
          intended use case, and country) to contact you about beta access and product updates. You provide this
          consent explicitly by checking the consent box on the waitlist form. You may withdraw consent at any time by
          contacting us at <a href="mailto:privacy@workings.io">privacy@workings.io</a>.
        </li>
        <li>
          <strong>Legitimate interests (Article 6(1)(f)):</strong> for website analytics, to understand how our website
          is used and improve it. We have assessed that this does not override your rights and freedoms, given the
          aggregated nature of the data collected.
        </li>
        <li>
          <strong>Legitimate interests (Article 6(1)(f)):</strong> for responding to direct email enquiries.
        </li>
      </ul>
      <p>
        <strong>Additional bases for non-UK/EU residents:</strong>
      </p>
      <ul>
        <li>
          <strong>Residents of US states with applicable privacy laws:</strong> we rely on the same consent and
          legitimate interests bases described above. A number of US states (including California under the CCPA/CPRA,
          Virginia under the VCDPA, Colorado under the CPA, and others) grant residents additional privacy rights set
          out in Section 10.1 below.
        </li>
        <li>
          <strong>Residents of Australia:</strong> we process your data in accordance with the Australian Privacy Act
          1988 (Cth) and the Australian Privacy Principles (APPs). We collect personal information that is reasonably
          necessary for our functions. Your rights under the APPs are set out in Section 10 below.
        </li>
      </ul>

      <h2>6. Cookies</h2>
      <p>
        This website uses cookies. Cookies are small text files stored on your device when you visit a website.
      </p>
      <p>We use the following types of cookies and local storage:</p>
      <p>
        <strong>Essential / functional storage</strong> (always active, never used for tracking):
      </p>
      <ul>
        <li>
          <code>workings_consent</code> - records your cookie choice (accept or reject) so we do not ask you again
          (browser local storage; expires after 12 months).
        </li>
        <li>
          <code>workings_waitlist_draft</code> - temporarily holds your waitlist form entry so it is not lost if you
          navigate away (cleared as soon as you submit).
        </li>
      </ul>
      <p>
        <strong>Analytics cookies</strong> (set only if you choose &quot;Accept&quot; on the cookie notice): Google
        Analytics sets cookies such as <code>_ga</code> and <code>_ga_&lt;id&gt;</code> (lasting up to approximately 13
        months) to distinguish visitors and measure traffic. If you decline, none of these cookies are set and no
        Google Analytics script is loaded.
      </p>
      <p>
        You can opt out of Google Analytics tracking by using the <strong>Cookie preferences</strong> link in the
        footer (which also clears any existing analytics cookies), by installing the Google Analytics opt-out browser
        add-on, or by adjusting your browser settings to block cookies.
      </p>
      <p>
        A cookie consent notice is displayed when you first visit the website. You may change your preference at any
        time via the <strong>Cookie preferences</strong> link in the footer.
      </p>

      <h2>7. Who we share your data with</h2>
      <p>
        We do <strong>not</strong> sell your personal data. We may share your data with the following third parties:
      </p>
      <ul>
        <li>
          <strong>Google LLC:</strong> for website analytics via Google Analytics. Google may process data in the
          United States. This is subject to Google&apos;s standard contractual clauses and data processing terms, and
          where applicable the EU-US and UK-US Data Privacy Framework.
        </li>
        <li>
          <strong>Google Workspace (Google LLC):</strong> we use Google Workspace to send emails to waitlist members
          about beta access and product updates. Google may process data in the United States under Google&apos;s
          Standard Contractual Clauses and, where applicable, the EU-US and UK-US Data Privacy Framework.
        </li>
        <li>
          <strong>Amazon:</strong> our website hosting and content delivery provider. If located outside the UK / EEA
          / Australia, appropriate safeguards will be in place.
        </li>
        <li>
          <strong>PSF Accounting Ltd:</strong> our registered office provider. They do not process waitlist or
          analytics data on our behalf.
        </li>
      </ul>
      <p>
        We may also disclose your data if required to do so by law or in response to a valid request from a public
        authority.
      </p>

      <h2>8. International data transfers</h2>
      <p>
        Our website is hosted by Amazon. Where data is transferred outside the UK or EEA, we ensure appropriate
        safeguards are in place, including Standard Contractual Clauses (SCCs) and / or the UK International Data
        Transfer Addendum (IDTA) where applicable.
      </p>
      <p>
        Google Analytics data may be processed in the United States by Google LLC, which participates in the EU-US and
        UK-US Data Privacy Framework and / or relies on Standard Contractual Clauses.
      </p>
      <p>
        <strong>For users in Australia:</strong> where we transfer your personal information outside Australia, we
        take reasonable steps to ensure the overseas recipient handles it in a manner consistent with the Australian
        Privacy Principles (APPs), including through contractual arrangements where required under APP 8.
      </p>

      <h2>9. How long we keep your data</h2>
      <ul>
        <li>
          <strong>Waitlist data</strong> (email address and survey responses): retained until you withdraw consent or
          request deletion, or until the Workings product is launched and you are transitioned to the product privacy
          policy, whichever is sooner.
        </li>
        <li>
          <strong>Email correspondence:</strong> retained for as long as reasonably necessary to respond to and follow
          up on your enquiry, and for up to 3 years thereafter.
        </li>
        <li>
          <strong>Analytics data:</strong> retained in accordance with Google Analytics&apos; standard retention
          settings (26 months by default).
        </li>
      </ul>

      <h2>10. Your rights</h2>
      <p>
        Depending on where you are located, you may have the following rights in relation to your personal data. We
        extend these rights to all users regardless of location:
      </p>
      <ul>
        <li>
          <strong>Right of access:</strong> to request a copy of the personal data we hold about you
        </li>
        <li>
          <strong>Right to rectification:</strong> to request correction of inaccurate data
        </li>
        <li>
          <strong>Right to erasure:</strong> to request deletion of your data in certain circumstances
        </li>
        <li>
          <strong>Right to restrict processing:</strong> to request that we limit how we use your data
        </li>
        <li>
          <strong>Right to data portability:</strong> to receive your data in a structured, machine-readable format
        </li>
        <li>
          <strong>Right to object:</strong> to object to processing based on legitimate interests
        </li>
        <li>
          <strong>Right to withdraw consent:</strong> where processing is based on consent, to withdraw it at any time
          without affecting the lawfulness of prior processing
        </li>
      </ul>
      <p>
        To exercise any of these rights, contact us at{' '}
        <a href="mailto:privacy@workings.io">privacy@workings.io</a>. We will respond within one calendar month.
      </p>
      <p>You also have the right to lodge a complaint with the relevant supervisory authority for your jurisdiction:</p>
      <ul>
        <li>
          <strong>UK:</strong> the Information Commissioner&apos;s Office (ICO) at{' '}
          <a href="https://ico.org.uk" target="_blank" rel="noopener noreferrer">
            ico.org.uk
          </a>
        </li>
        <li>
          <strong>EU:</strong> your local EU data protection authority
        </li>
        <li>
          <strong>Australia:</strong> the Office of the Australian Information Commissioner (OAIC) at{' '}
          <a href="https://oaic.gov.au" target="_blank" rel="noopener noreferrer">
            oaic.gov.au
          </a>
        </li>
        <li>
          <strong>USA:</strong> your applicable state privacy protection authority. California residents may contact
          the California Privacy Protection Agency (CPPA) at{' '}
          <a href="https://cppa.ca.gov" target="_blank" rel="noopener noreferrer">
            cppa.ca.gov
          </a>
        </li>
      </ul>

      <h3>10.1 Additional rights for US residents (applicable state privacy laws)</h3>
      <p>
        A number of US states have enacted privacy laws granting residents additional rights, including California
        (CCPA/CPRA), Virginia (VCDPA), Colorado (CPA), Connecticut, Texas, Oregon, and Montana, among others. If you
        are a resident of a US state with an applicable privacy law, you have the following rights (the specific
        rights available and response timescales may vary slightly by state):
      </p>
      <ul>
        <li>
          <strong>Right to know</strong> - to request disclosure of the categories and specific pieces of personal
          information we have collected about you, the purposes for collection, and the categories of third parties we
          share it with.
        </li>
        <li>
          <strong>Right to delete</strong> - to request deletion of your personal information, subject to certain
          exceptions.
        </li>
        <li>
          <strong>Right to correct</strong> - to request correction of inaccurate personal information.
        </li>
        <li>
          <strong>Right to opt out of sale or sharing</strong> - we do not sell or share personal information for
          cross-context behavioural advertising.
        </li>
        <li>
          <strong>Right to limit use of sensitive personal information</strong> - we do not collect sensitive personal
          information as defined under the CPRA.
        </li>
        <li>
          <strong>Right to non-discrimination</strong> - we will not discriminate against you for exercising any of
          these rights.
        </li>
      </ul>
      <p>
        To exercise these rights, contact <a href="mailto:privacy@workings.io">privacy@workings.io</a>. We will
        respond within 45 days (with a possible 45-day extension where permitted by applicable law).
      </p>

      <h3>10.2 Additional rights for Australian residents (Privacy Act 1988)</h3>
      <p>
        If you are located in Australia, the Australian Privacy Act 1988 (Cth) and the Australian Privacy Principles
        (APPs) apply to our handling of your personal information. In addition to the rights listed above, you have
        the right to:
      </p>
      <ul>
        <li>Complain to us about a breach of the APPs, and receive a response within 30 days.</li>
        <li>
          If not satisfied with our response, refer your complaint to the Office of the Australian Information
          Commissioner (OAIC).
        </li>
      </ul>
      <p>
        We collect personal information from you only by lawful and fair means, and only if it is reasonably necessary
        for our functions. You may contact us to access or correct your personal information at{' '}
        <a href="mailto:privacy@workings.io">privacy@workings.io</a>.
      </p>

      <h2>11. Security</h2>
      <p>
        We take reasonable technical and organisational measures to protect your personal data against unauthorised
        access, loss, or disclosure. These measures include TLS encryption in transit, encryption at rest, and access
        controls limited to named team members. If you discover a security vulnerability, please report it to{' '}
        <a href="mailto:security@workings.io">security@workings.io</a>. However, no internet transmission is completely
        secure, and we cannot guarantee the security of data transmitted to us.
      </p>

      <h2>12. Children</h2>
      <p>
        This website is not directed at children under the age of 16. We do not knowingly collect personal data from
        children under 16. If you believe we have inadvertently collected such data, please contact us at{' '}
        <a href="mailto:privacy@workings.io">privacy@workings.io</a> and we will delete it promptly.
      </p>

      <h2>13. Changes to this policy</h2>
      <p>
        We may update this policy from time to time. The date at the top of this page will reflect the most recent
        update. We encourage you to review this policy periodically. Where changes are material, we will notify
        waitlist members by email where practicable.
      </p>

      <h2>14. Contact us</h2>
      <p>If you have any questions about this privacy policy or how we handle your personal data:</p>
      <p>
        <strong>Human Workings Ltd</strong>
        <br />
        c/o PSF Accounting Ltd
        <br />
        13 St Mary&apos;s Street
        <br />
        Stamford
        <br />
        England PE9 2DE
      </p>
      <p>
        Email: <a href="mailto:privacy@workings.io">privacy@workings.io</a>
      </p>
    </LegalShell>
  );
}
