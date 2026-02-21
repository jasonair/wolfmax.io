'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { FloatingParticles } from '@/components/FloatingParticles';
import { GradientOrbs } from '@/components/GradientOrbs';


export default function TermsPage() {
  return (
    <div className="relative min-h-screen bg-black overflow-hidden">
      {/* Background effects */}
      <div className="fixed inset-0 grid-bg opacity-30 pointer-events-none" />
      <FloatingParticles />
      <GradientOrbs />

      {/* Main Content */}
      <main className="relative z-10 px-4 sm:px-6 lg:px-8 pt-32 pb-20">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.h1
              className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.8 }}
            >
              Terms of Service
            </motion.h1>
            <motion.p
              className="text-lg sm:text-xl text-gray-300"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              Last updated: February 8, 2026
            </motion.p>
          </motion.div>

          {/* Content */}
          <motion.div
            className="prose prose-invert prose-lg max-w-none"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            <div className="space-y-8 text-gray-300 leading-relaxed">
              {/* Introduction */}
              <section>
                <h2 className="text-2xl font-bold text-white mb-4">Agreement to Terms</h2>
                <p>
                  These Terms of Service (&quot;Terms&quot;) constitute a legally binding agreement between you and Wolfmax
                  (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;) regarding your use of our website, platform, and services
                  (collectively, the &quot;Service&quot;). By accessing or using our Service, you agree to be bound by these Terms.
                </p>
                <p className="mt-4">
                  If you do not agree to these Terms, you may not access or use the Service. We reserve the right to modify
                  these Terms at any time, and such modifications will be effective immediately upon posting.
                </p>
              </section>

              {/* Description of Service */}
              <section>
                <h2 className="text-2xl font-bold text-white mb-4">Description of Service</h2>
                <p>
                  Wolfmax provides a proof layer for human work, enabling users to create verifiable proof of authorship and
                  work authenticity. Our Service includes tools for capturing, verifying, and proving the human origin of
                  creative and professional work in an AI-saturated world.
                </p>
                <p className="mt-4">
                  We reserve the right to modify, suspend, or discontinue any part of the Service at any time, with or without
                  notice, and without liability to you.
                </p>
              </section>

              {/* User Accounts */}
              <section>
                <h2 className="text-2xl font-bold text-white mb-4">User Accounts</h2>
                <p>To use certain features of our Service, you may need to create an account. When creating an account, you agree to:</p>
                <ul className="list-disc list-inside space-y-2 ml-4 mt-4">
                  <li>Provide accurate, current, and complete information</li>
                  <li>Maintain and promptly update your account information</li>
                  <li>Maintain the security of your account credentials</li>
                  <li>Accept responsibility for all activities that occur under your account</li>
                  <li>Notify us immediately of any unauthorized use of your account</li>
                </ul>
                <p className="mt-4">
                  You are responsible for maintaining the confidentiality of your account credentials. We are not liable for any
                  loss or damage arising from your failure to protect your account information.
                </p>
              </section>

              {/* Acceptable Use */}
              <section>
                <h2 className="text-2xl font-bold text-white mb-4">Acceptable Use</h2>
                <p>You agree to use the Service only for lawful purposes and in accordance with these Terms. You agree not to:</p>
                <ul className="list-disc list-inside space-y-2 ml-4 mt-4">
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
                <h2 className="text-2xl font-bold text-white mb-4">User Content</h2>
                <p>
                  You retain ownership of any content you submit, post, or display through the Service (&quot;User Content&quot;).
                  By submitting User Content, you grant us a worldwide, non-exclusive, royalty-free license to use, reproduce,
                  modify, adapt, publish, and distribute such content solely for the purpose of providing and improving the Service.
                </p>
                <p className="mt-4">
                  You represent and warrant that you own or have the necessary rights to all User Content you submit and that
                  such content does not violate any third-party rights or applicable laws.
                </p>
                <p className="mt-4">
                  We reserve the right to remove or refuse to display any User Content that we believe violates these Terms or
                  is otherwise objectionable, without prior notice.
                </p>
              </section>

              {/* Proof of Work and Verification */}
              <section>
                <h2 className="text-2xl font-bold text-white mb-4">Proof of Work and Verification</h2>
                <p>
                  Our Service enables you to create cryptographic proof of work and authorship. You understand and agree that:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4 mt-4">
                  <li>Proof data created through our Service may be publicly accessible and immutable</li>
                  <li>We cannot guarantee the accuracy or validity of proof claims made by users</li>
                  <li>You are solely responsible for the content and claims associated with your proof of work</li>
                  <li>We reserve the right to investigate and take action against fraudulent or misleading proof claims</li>
                  <li>Proof data may be retained indefinitely as part of the verification system, even after account deletion</li>
                </ul>
              </section>

              {/* Intellectual Property */}
              <section>
                <h2 className="text-2xl font-bold text-white mb-4">Intellectual Property</h2>
                <p>
                  The Service and its original content, features, and functionality are owned by Wolfmax and are protected by
                  international copyright, trademark, patent, trade secret, and other intellectual property laws.
                </p>
                <p className="mt-4">
                  Our trademarks, service marks, and logos may not be used without our prior written permission. You may not
                  use our intellectual property in any way that suggests endorsement or affiliation without our consent.
                </p>
              </section>

              {/* Payment Terms */}
              <section>
                <h2 className="text-2xl font-bold text-white mb-4">Payment Terms</h2>
                <p>
                  If you purchase any paid features or subscriptions, you agree to pay all fees associated with such purchases.
                  Fees are non-refundable unless otherwise required by law or as specified in our refund policy.
                </p>
                <p className="mt-4">
                  We reserve the right to change our pricing at any time. Price changes will not affect existing subscriptions
                  until the next billing cycle, unless otherwise specified.
                </p>
              </section>

              {/* Disclaimers */}
              <section>
                <h2 className="text-2xl font-bold text-white mb-4">Disclaimers</h2>
                <p>
                  THE SERVICE IS PROVIDED &quot;AS IS&quot; AND &quot;AS AVAILABLE&quot; WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR
                  IMPLIED, INCLUDING BUT NOT LIMITED TO IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE,
                  AND NON-INFRINGEMENT.
                </p>
                <p className="mt-4">
                  We do not warrant that the Service will be uninterrupted, secure, or error-free, or that defects will be
                  corrected. We do not guarantee the accuracy, completeness, or usefulness of any information provided through
                  the Service.
                </p>
              </section>

              {/* Limitation of Liability */}
              <section>
                <h2 className="text-2xl font-bold text-white mb-4">Limitation of Liability</h2>
                <p>
                  TO THE MAXIMUM EXTENT PERMITTED BY LAW, WOLFMAX SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL,
                  CONSEQUENTIAL, OR PUNITIVE DAMAGES, OR ANY LOSS OF PROFITS OR REVENUES, WHETHER INCURRED DIRECTLY OR INDIRECTLY,
                  OR ANY LOSS OF DATA, USE, GOODWILL, OR OTHER INTANGIBLE LOSSES, RESULTING FROM YOUR USE OF THE SERVICE.
                </p>
                <p className="mt-4">
                  Our total liability to you for all claims arising from or related to the Service shall not exceed the amount
                  you paid us in the twelve (12) months preceding the claim, or one hundred dollars ($100), whichever is greater.
                </p>
              </section>

              {/* Indemnification */}
              <section>
                <h2 className="text-2xl font-bold text-white mb-4">Indemnification</h2>
                <p>
                  You agree to indemnify, defend, and hold harmless Wolfmax and its officers, directors, employees, and agents
                  from and against any claims, liabilities, damages, losses, and expenses, including reasonable attorneys&apos; fees,
                  arising out of or in any way connected with your use of the Service, your User Content, or your violation of
                  these Terms.
                </p>
              </section>

              {/* Termination */}
              <section>
                <h2 className="text-2xl font-bold text-white mb-4">Termination</h2>
                <p>
                  We may terminate or suspend your account and access to the Service immediately, without prior notice or liability,
                  for any reason, including if you breach these Terms.
                </p>
                <p className="mt-4">
                  Upon termination, your right to use the Service will cease immediately. All provisions of these Terms that by
                  their nature should survive termination shall survive, including ownership provisions, warranty disclaimers,
                  indemnity, and limitations of liability.
                </p>
              </section>

              {/* Governing Law */}
              <section>
                <h2 className="text-2xl font-bold text-white mb-4">Governing Law</h2>
                <p>
                  These Terms shall be governed by and construed in accordance with the laws of the jurisdiction in which Wolfmax
                  operates, without regard to its conflict of law provisions. Any disputes arising from these Terms or the Service
                  shall be resolved in the appropriate courts of that jurisdiction.
                </p>
              </section>

              {/* Changes to Terms */}
              <section>
                <h2 className="text-2xl font-bold text-white mb-4">Changes to Terms</h2>
                <p>
                  We reserve the right to modify these Terms at any time. We will notify you of any material changes by posting
                  the updated Terms on this page and updating the &quot;Last updated&quot; date. Your continued use of the Service
                  after such modifications constitutes your acceptance of the updated Terms.
                </p>
                <p className="mt-4">
                  If you do not agree to the modified Terms, you must stop using the Service and may terminate your account.
                </p>
              </section>

              {/* Severability */}
              <section>
                <h2 className="text-2xl font-bold text-white mb-4">Severability</h2>
                <p>
                  If any provision of these Terms is found to be unenforceable or invalid, that provision shall be limited or
                  eliminated to the minimum extent necessary, and the remaining provisions shall remain in full force and effect.
                </p>
              </section>

              {/* Entire Agreement */}
              <section>
                <h2 className="text-2xl font-bold text-white mb-4">Entire Agreement</h2>
                <p>
                  These Terms, together with our Privacy Policy, constitute the entire agreement between you and Wolfmax regarding
                  the Service and supersede all prior agreements and understandings.
                </p>
              </section>

              {/* Contact Us */}
              <section>
                <h2 className="text-2xl font-bold text-white mb-4">Contact Us</h2>
                <p>
                  If you have any questions about these Terms, please contact us:
                </p>
                <ul className="list-none space-y-2 ml-4 mt-4">
                  <li>
                    <strong className="text-white">Email:</strong>{' '}
                    <Link href="/contact" className="text-brand-blue hover:text-brand-purple transition-colors">
                      Contact us through our contact page
                    </Link>
                  </li>
                  <li>
                    <strong className="text-white">Website:</strong>{' '}
                    <Link href="/" className="text-brand-blue hover:text-brand-purple transition-colors">
                      wolfmax.io
                    </Link>
                  </li>
                </ul>
              </section>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
}



