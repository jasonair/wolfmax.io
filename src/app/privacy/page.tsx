'use client';

import { motion } from 'framer-motion';
import { FloatingParticles } from '@/components/FloatingParticles';
import { GradientOrbs } from '@/components/GradientOrbs';


export default function PrivacyPage() {
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
              Privacy Policy
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
                <h2 className="text-2xl font-bold text-white mb-4">Introduction</h2>
                <p>
                  At Wolfmax (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;), we are committed to protecting your privacy.
                  This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use
                  our services, including our website, platform, and any related services (collectively, the &quot;Service&quot;).
                </p>
                <p className="mt-4">
                  By using our Service, you agree to the collection and use of information in accordance with this policy.
                  If you do not agree with our policies and practices, please do not use our Service.
                </p>
              </section>

              {/* Information We Collect */}
              <section>
                <h2 className="text-2xl font-bold text-white mb-4">Information We Collect</h2>

                <h3 className="text-xl font-semibold text-white mt-6 mb-3">Information You Provide to Us</h3>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li><strong className="text-white">Account Information:</strong> When you create an account, we collect your name, email address, and any other information you choose to provide.</li>
                  <li><strong className="text-white">Contact Information:</strong> When you contact us or join our waitlist, we collect your name, email address, and any message content.</li>
                  <li><strong className="text-white">Work Content:</strong> When you use our Service to create or verify work, we collect the content you submit, including files, metadata, and associated proof data.</li>
                  <li><strong className="text-white">Usage Data:</strong> We collect information about how you interact with our Service, including features used, time spent, and actions taken.</li>
                </ul>

                <h3 className="text-xl font-semibold text-white mt-6 mb-3">Automatically Collected Information</h3>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li><strong className="text-white">Device Information:</strong> We collect information about your device, including IP address, browser type, operating system, and device identifiers.</li>
                  <li><strong className="text-white">Log Data:</strong> We automatically collect log information when you use our Service, including access times, pages viewed, and error logs.</li>
                  <li><strong className="text-white">Cookies and Tracking Technologies:</strong> We use cookies and similar tracking technologies to track activity on our Service and store certain information.</li>
                </ul>
              </section>

              {/* How We Use Your Information */}
              <section>
                <h2 className="text-2xl font-bold text-white mb-4">How We Use Your Information</h2>
                <p>We use the information we collect for various purposes, including:</p>
                <ul className="list-disc list-inside space-y-2 ml-4 mt-4">
                  <li>To provide, maintain, and improve our Service</li>
                  <li>To process and verify proof of work and authorship claims</li>
                  <li>To communicate with you about your account, our Service, or updates</li>
                  <li>To respond to your inquiries, comments, or requests</li>
                  <li>To send you marketing communications (with your consent)</li>
                  <li>To detect, prevent, and address technical issues and security threats</li>
                  <li>To comply with legal obligations and enforce our terms</li>
                  <li>To analyze usage patterns and improve user experience</li>
                </ul>
              </section>

              {/* Information Sharing and Disclosure */}
              <section>
                <h2 className="text-2xl font-bold text-white mb-4">Information Sharing and Disclosure</h2>
                <p>We do not sell your personal information. We may share your information in the following circumstances:</p>
                <ul className="list-disc list-inside space-y-2 ml-4 mt-4">
                  <li><strong className="text-white">Service Providers:</strong> We may share information with third-party service providers who perform services on our behalf, such as hosting, analytics, and customer support.</li>
                  <li><strong className="text-white">Legal Requirements:</strong> We may disclose information if required by law or in response to valid requests by public authorities.</li>
                  <li><strong className="text-white">Business Transfers:</strong> In the event of a merger, acquisition, or sale of assets, your information may be transferred as part of that transaction.</li>
                  <li><strong className="text-white">With Your Consent:</strong> We may share your information with your explicit consent or at your direction.</li>
                  <li><strong className="text-white">Public Proof Data:</strong> When you create verifiable proof of work, certain cryptographic proofs and metadata may be publicly accessible as part of the verification system.</li>
                </ul>
              </section>

              {/* Data Security */}
              <section>
                <h2 className="text-2xl font-bold text-white mb-4">Data Security</h2>
                <p>
                  We implement appropriate technical and organizational security measures to protect your personal information
                  against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over
                  the Internet or electronic storage is 100% secure, and we cannot guarantee absolute security.
                </p>
                <p className="mt-4">
                  We use industry-standard encryption, secure authentication methods, and regular security audits to safeguard
                  your data. If you have any concerns about the security of your information, please contact us immediately.
                </p>
              </section>

              {/* Your Rights and Choices */}
              <section>
                <h2 className="text-2xl font-bold text-white mb-4">Your Rights and Choices</h2>
                <p>Depending on your location, you may have certain rights regarding your personal information:</p>
                <ul className="list-disc list-inside space-y-2 ml-4 mt-4">
                  <li><strong className="text-white">Access:</strong> You can request access to the personal information we hold about you.</li>
                  <li><strong className="text-white">Correction:</strong> You can request correction of inaccurate or incomplete information.</li>
                  <li><strong className="text-white">Deletion:</strong> You can request deletion of your personal information, subject to certain exceptions.</li>
                  <li><strong className="text-white">Portability:</strong> You can request a copy of your data in a structured, machine-readable format.</li>
                  <li><strong className="text-white">Opt-Out:</strong> You can opt out of marketing communications at any time by following the unsubscribe instructions.</li>
                  <li><strong className="text-white">Account Controls:</strong> You can update or delete your account information through your account settings.</li>
                </ul>
                <p className="mt-4">
                  To exercise these rights, please contact us using the information provided in the &quot;Contact Us&quot; section below.
                </p>
              </section>

              {/* Data Retention */}
              <section>
                <h2 className="text-2xl font-bold text-white mb-4">Data Retention</h2>
                <p>
                  We retain your personal information for as long as necessary to fulfill the purposes outlined in this Privacy
                  Policy, unless a longer retention period is required or permitted by law. When you delete your account, we
                  will delete or anonymize your personal information, except where we are required to retain it for legal,
                  regulatory, or legitimate business purposes.
                </p>
                <p className="mt-4">
                  Note that verifiable proof data created through our Service may be retained indefinitely as part of the
                  immutable proof layer, even after account deletion, to maintain the integrity of the verification system.
                </p>
              </section>

              {/* Children&apos;s Privacy */}
              <section>
                <h2 className="text-2xl font-bold text-white mb-4">Children&apos;s Privacy</h2>
                <p>
                  Our Service is not intended for individuals under the age of 13 (or the applicable age of consent in your
                  jurisdiction). We do not knowingly collect personal information from children. If you are a parent or guardian
                  and believe your child has provided us with personal information, please contact us immediately.
                </p>
              </section>

              {/* International Data Transfers */}
              <section>
                <h2 className="text-2xl font-bold text-white mb-4">International Data Transfers</h2>
                <p>
                  Your information may be transferred to and processed in countries other than your country of residence.
                  These countries may have data protection laws that differ from those in your country. We take appropriate
                  measures to ensure that your information receives an adequate level of protection in accordance with this
                  Privacy Policy.
                </p>
              </section>

              {/* Changes to This Privacy Policy */}
              <section>
                <h2 className="text-2xl font-bold text-white mb-4">Changes to This Privacy Policy</h2>
                <p>
                  We may update this Privacy Policy from time to time. We will notify you of any material changes by posting
                  the new Privacy Policy on this page and updating the &quot;Last updated&quot; date. We encourage you to review
                  this Privacy Policy periodically for any changes.
                </p>
              </section>

              {/* Contact Us */}
              <section>
                <h2 className="text-2xl font-bold text-white mb-4">Contact Us</h2>
                <p>
                  If you have any questions, concerns, or requests regarding this Privacy Policy or our data practices,
                  please contact us:
                </p>
                <ul className="list-none space-y-2 ml-4 mt-4">
                  <li>
                    <strong className="text-white">Email:</strong>{' '}
                    <a href="/contact" className="text-brand-blue hover:text-brand-purple transition-colors">
                      Contact us through our contact page
                    </a>
                  </li>
                  <li>
                    <strong className="text-white">Website:</strong>{' '}
                    <a href="/" className="text-brand-blue hover:text-brand-purple transition-colors">
                      wolfmax.io
                    </a>
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



