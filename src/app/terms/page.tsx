import Link from 'next/link';

export default function TermsPage() {
  return (
    <div className="surface-cream min-h-screen">
      <main className="max-w-[72ch] mx-auto px-4 sm:px-6 lg:px-8 pt-32 sm:pt-40 pb-24 sm:pb-32">
        {/* Header */}
        <header className="mb-16">
          <p className="eyebrow mb-4">Legal</p>
          <h1 className="font-display text-5xl sm:text-6xl text-navy leading-tight mb-6">
            Terms of Service
          </h1>
          <p className="text-mute text-lg">Last updated: February 8, 2026</p>
        </header>

        {/* Content */}
        <div className="prose prose-headings:font-display prose-headings:text-navy prose-p:text-navy/80 prose-a:text-blue prose-strong:text-navy prose-li:text-navy/80 prose-lg max-w-none">
          {/* Agreement to Terms */}
          <section>
            <h2>Agreement to Terms</h2>
            <p>
              These Terms of Service (&quot;Terms&quot;) constitute a legally binding agreement between you and Workings
              (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;) regarding your use of our website, platform, and services
              (collectively, the &quot;Service&quot;). By accessing or using our Service, you agree to be bound by these Terms.
            </p>
            <p>
              If you do not agree to these Terms, you may not access or use the Service. We reserve the right to modify
              these Terms at any time, and such modifications will be effective immediately upon posting.
            </p>
          </section>

          {/* Description of Service */}
          <section>
            <h2>Description of Service</h2>
            <p>
              Workings provides a proof layer for human work, enabling users to create verifiable proof of authorship and
              work authenticity. Our Service includes tools for capturing, verifying, and proving the human origin of
              creative and professional work in an AI-saturated world.
            </p>
            <p>
              We reserve the right to modify, suspend, or discontinue any part of the Service at any time, with or without
              notice, and without liability to you.
            </p>
          </section>

          {/* User Accounts */}
          <section>
            <h2>User Accounts</h2>
            <p>To use certain features of our Service, you may need to create an account. When creating an account, you agree to:</p>
            <ul>
              <li>Provide accurate, current, and complete information</li>
              <li>Maintain and promptly update your account information</li>
              <li>Maintain the security of your account credentials</li>
              <li>Accept responsibility for all activities that occur under your account</li>
              <li>Notify us immediately of any unauthorized use of your account</li>
            </ul>
            <p>
              You are responsible for maintaining the confidentiality of your account credentials. We are not liable for any
              loss or damage arising from your failure to protect your account information.
            </p>
          </section>

          {/* Acceptable Use */}
          <section>
            <h2>Acceptable Use</h2>
            <p>You agree to use the Service only for lawful purposes and in accordance with these Terms. You agree not to:</p>
            <ul>
              <li>Violate any applicable laws, regulations, or third-party rights</li>
              <li>Use the Service to create false or misleading proof of work</li>
              <li>Impersonate any person or entity or misrepresent your affiliation with any person or entity</li>
              <li>Upload, post, or transmit any content that is illegal, harmful, threatening, abusive, or otherwise objectionable</li>
              <li>Interfere with or disrupt the Service or servers or networks connected to the Service</li>
              <li>Attempt to gain unauthorized access to any portion of the Service or any other systems or networks</li>
              <li>Use automated systems (bots, scrapers, etc.) to access the Service without our prior written consent</li>
              <li>Reverse engineer, decompile, or disassemble any part of the Service</li>
              <li>Remove any copyright, trademark, or other proprietary notices from the Service</li>
              <li>Use the Service to compete with us or to build a similar or competing service</li>
            </ul>
          </section>

          {/* User Content */}
          <section>
            <h2>User Content</h2>
            <p>
              You retain ownership of any content you submit, post, or display through the Service (&quot;User Content&quot;).
              By submitting User Content, you grant us a worldwide, non-exclusive, royalty-free license to use, reproduce,
              modify, adapt, publish, and distribute such content solely for the purpose of providing and improving the Service.
            </p>
            <p>
              You represent and warrant that you own or have the necessary rights to all User Content you submit and that
              such content does not violate any third-party rights or applicable laws.
            </p>
            <p>
              We reserve the right to remove or refuse to display any User Content that we believe violates these Terms or
              is otherwise objectionable, without prior notice.
            </p>
          </section>

          {/* Proof of Work and Verification */}
          <section>
            <h2>Proof of Work and Verification</h2>
            <p>
              Our Service enables you to create cryptographic proof of work and authorship. You understand and agree that:
            </p>
            <ul>
              <li>Proof data created through our Service may be publicly accessible and immutable</li>
              <li>We cannot guarantee the accuracy or validity of proof claims made by users</li>
              <li>You are solely responsible for the content and claims associated with your proof of work</li>
              <li>We reserve the right to investigate and take action against fraudulent or misleading proof claims</li>
              <li>Proof data may be retained indefinitely as part of the verification system, even after account deletion</li>
            </ul>
          </section>

          {/* Intellectual Property */}
          <section>
            <h2>Intellectual Property</h2>
            <p>
              The Service and its original content, features, and functionality are owned by Workings and are protected by
              international copyright, trademark, patent, trade secret, and other intellectual property laws.
            </p>
            <p>
              Our trademarks, service marks, and logos may not be used without our prior written permission. You may not
              use our intellectual property in any way that suggests endorsement or affiliation without our consent.
            </p>
          </section>

          {/* Payment Terms */}
          <section>
            <h2>Payment Terms</h2>
            <p>
              If you purchase any paid features or subscriptions, you agree to pay all fees associated with such purchases.
              Fees are non-refundable unless otherwise required by law or as specified in our refund policy.
            </p>
            <p>
              We reserve the right to change our pricing at any time. Price changes will not affect existing subscriptions
              until the next billing cycle, unless otherwise specified.
            </p>
          </section>

          {/* Disclaimers */}
          <section>
            <h2>Disclaimers</h2>
            <p>
              THE SERVICE IS PROVIDED &quot;AS IS&quot; AND &quot;AS AVAILABLE&quot; WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR
              IMPLIED, INCLUDING BUT NOT LIMITED TO IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE,
              AND NON-INFRINGEMENT.
            </p>
            <p>
              We do not warrant that the Service will be uninterrupted, secure, or error-free, or that defects will be
              corrected. We do not guarantee the accuracy, completeness, or usefulness of any information provided through
              the Service.
            </p>
          </section>

          {/* Limitation of Liability */}
          <section>
            <h2>Limitation of Liability</h2>
            <p>
              TO THE MAXIMUM EXTENT PERMITTED BY LAW, WORKINGS SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL,
              CONSEQUENTIAL, OR PUNITIVE DAMAGES, OR ANY LOSS OF PROFITS OR REVENUES, WHETHER INCURRED DIRECTLY OR INDIRECTLY,
              OR ANY LOSS OF DATA, USE, GOODWILL, OR OTHER INTANGIBLE LOSSES, RESULTING FROM YOUR USE OF THE SERVICE.
            </p>
            <p>
              Our total liability to you for all claims arising from or related to the Service shall not exceed the amount
              you paid us in the twelve (12) months preceding the claim, or one hundred dollars ($100), whichever is greater.
            </p>
          </section>

          {/* Indemnification */}
          <section>
            <h2>Indemnification</h2>
            <p>
              You agree to indemnify, defend, and hold harmless Workings and its officers, directors, employees, and agents
              from and against any claims, liabilities, damages, losses, and expenses, including reasonable attorneys&apos; fees,
              arising out of or in any way connected with your use of the Service, your User Content, or your violation of
              these Terms.
            </p>
          </section>

          {/* Termination */}
          <section>
            <h2>Termination</h2>
            <p>
              We may terminate or suspend your account and access to the Service immediately, without prior notice or liability,
              for any reason, including if you breach these Terms.
            </p>
            <p>
              Upon termination, your right to use the Service will cease immediately. All provisions of these Terms that by
              their nature should survive termination shall survive, including ownership provisions, warranty disclaimers,
              indemnity, and limitations of liability.
            </p>
          </section>

          {/* Governing Law */}
          <section>
            <h2>Governing Law</h2>
            <p>
              These Terms shall be governed by and construed in accordance with the laws of the jurisdiction in which Workings
              operates, without regard to its conflict of law provisions. Any disputes arising from these Terms or the Service
              shall be resolved in the appropriate courts of that jurisdiction.
            </p>
          </section>

          {/* Changes to Terms */}
          <section>
            <h2>Changes to Terms</h2>
            <p>
              We reserve the right to modify these Terms at any time. We will notify you of any material changes by posting
              the updated Terms on this page and updating the &quot;Last updated&quot; date. Your continued use of the Service
              after such modifications constitutes your acceptance of the updated Terms.
            </p>
            <p>
              If you do not agree to the modified Terms, you must stop using the Service and may terminate your account.
            </p>
          </section>

          {/* Severability */}
          <section>
            <h2>Severability</h2>
            <p>
              If any provision of these Terms is found to be unenforceable or invalid, that provision shall be limited or
              eliminated to the minimum extent necessary, and the remaining provisions shall remain in full force and effect.
            </p>
          </section>

          {/* Entire Agreement */}
          <section>
            <h2>Entire Agreement</h2>
            <p>
              These Terms, together with our Privacy Policy, constitute the entire agreement between you and Workings regarding
              the Service and supersede all prior agreements and understandings.
            </p>
          </section>

          {/* Contact Us */}
          <section>
            <h2>Contact Us</h2>
            <p>
              If you have any questions about these Terms, please contact us:
            </p>
            <ul className="list-none pl-0">
              <li>
                <strong>Email:</strong>{' '}
                <Link href="/contact">
                  Contact us through our contact page
                </Link>
              </li>
              <li>
                <strong>Website:</strong>{' '}
                <Link href="/">
                  workings.io
                </Link>
              </li>
            </ul>
          </section>
        </div>
      </main>
    </div>
  );
}
