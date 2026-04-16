'use client';

import { motion, useScroll, useTransform, useMotionValueEvent } from 'framer-motion';
import { useRef, useState } from 'react';
import Link from 'next/link';
import { FloatingParticles } from '@/components/FloatingParticles';
import { GradientOrbs } from '@/components/GradientOrbs';

const tocItems = [
  { id: 'abstract', label: 'Abstract', num: '' },
  { id: 'introduction', label: 'Introduction', num: '01' },
  { id: 'problem', label: 'The Problem with AI Detection', num: '02' },
  { id: 'process-recording', label: 'Process Recording', num: '03' },
  { id: 'architecture', label: 'Technical Architecture', num: '04' },
  { id: 'privacy', label: 'Privacy Model', num: '05' },
  { id: 'use-cases', label: 'Use Cases', num: '06' },
  { id: 'conclusion', label: 'Conclusion', num: '07' },
];

const references = [
  { authors: 'Weber-Wulff, D., et al.', year: '2025', title: 'Testing of Detection Tools for AI-Generated Text', journal: 'International Journal for Educational Integrity, 21(1), 1-27' },
  { authors: 'Liang, W., et al.', year: '2025', title: 'GPT Detectors Are Biased Against Non-Native English Writers', journal: 'Patterns, 4(7), 100779' },
  { authors: 'Sadasivan, V. S., et al.', year: '2024', title: 'Can AI-Generated Text Be Reliably Detected?', journal: 'Proceedings of the 41st ICML, 198, 42125-42139' },
  { authors: 'Conijn, R., et al.', year: '2024', title: 'Keystroke Logging as a Window into the Writing Process', journal: 'Written Communication, 41(2), 312-358' },
  { authors: 'Doshi, A. R. & Hauser, O. P.', year: '2025', title: 'Generative AI, Content Provenance, and the Future of Trust', journal: 'Harvard Business School Working Paper, No. 25-041' },
];

function SectionHeading({ id, num, children }: { id: string; num?: string; children: React.ReactNode }) {
  return (
    <motion.div
      id={id}
      className="scroll-mt-28 mb-8"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      {num && (
        <span
          className="text-xs font-bold tracking-[0.2em] uppercase block mb-3"
          style={{ color: 'var(--brand-red)' }}
        >
          Section {num}
        </span>
      )}
      <h2 className="text-2xl sm:text-3xl font-bold text-white">
        {children}
      </h2>
    </motion.div>
  );
}

function Prose({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      className="text-gray-300 leading-[1.85] space-y-5 text-[15px] sm:text-base"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ delay: 0.1, duration: 0.6 }}
    >
      {children}
    </motion.div>
  );
}

function Callout({ children, color = 'var(--brand-red)' }: { children: React.ReactNode; color?: string }) {
  return (
    <motion.blockquote
      className="relative my-10 pl-6 py-4 border-l-2"
      style={{ borderColor: color }}
      initial={{ opacity: 0, x: -10 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <p className="text-lg sm:text-xl font-medium text-white leading-relaxed italic">
        {children}
      </p>
    </motion.blockquote>
  );
}

function KeyStat({ value, label, color }: { value: string; label: string; color: string }) {
  return (
    <motion.div
      className="text-center"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <span className="text-3xl sm:text-4xl font-black block" style={{ color }}>{value}</span>
      <span className="text-xs text-gray-500 uppercase tracking-wider mt-1 block">{label}</span>
    </motion.div>
  );
}

function SectionDivider() {
  return (
    <div className="my-16 flex items-center justify-center gap-2">
      <div className="h-px w-12 bg-white/[0.06]" />
      <div className="w-1.5 h-1.5 rounded-full bg-brand-red/40" />
      <div className="h-px w-12 bg-white/[0.06]" />
    </div>
  );
}

export default function WhitepaperPage() {
  const contentRef = useRef<HTMLDivElement>(null);
  const [isSticky, setIsSticky] = useState(false);

  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, 'change', (latest) => {
    if (contentRef.current) {
      const top = contentRef.current.offsetTop - 112; // 7rem navbar offset
      setIsSticky(latest >= top);
    }
  });

  return (
    <div className="relative bg-black">
      <div className="fixed inset-0 grid-bg pointer-events-none" />
      <FloatingParticles />
      <GradientOrbs />

      <main className="relative z-10 pt-32 sm:pt-40 pb-24 sm:pb-32 px-4 sm:px-6 lg:px-8">

        {/* Hero header */}
        <header className="max-w-4xl mx-auto text-center mb-20 sm:mb-24">
          <motion.p
            className="text-sm font-medium tracking-widest uppercase mb-6"
            style={{ color: 'var(--brand-red)' }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Wolfmax Whitepaper
          </motion.p>
          <motion.h1
            className="text-3xl sm:text-4xl md:text-[2.75rem] font-bold text-white leading-tight mb-8 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6 }}
          >
            Verifiable Process Recording: Restoring Trust in the Age of AI-Generated Content
          </motion.h1>
          <motion.div
            className="flex items-center justify-center gap-4 text-sm mb-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <span className="text-gray-400">Wolfmax Research Team</span>
            <span className="w-1 h-1 rounded-full bg-gray-600" />
            <span className="text-gray-600">March 2026</span>
          </motion.div>
          <motion.a
            href="#"
            className="inline-flex items-center gap-2 px-8 py-3 bg-brand-red text-white font-bold rounded-full hover:scale-105 transition-transform pulse-glow"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v12m0 0l-4-4m4 4l4-4M4 18h16" />
            </svg>
            Download PDF
          </motion.a>
        </header>

        {/* Two-column layout: TOC sidebar + content */}
        <div ref={contentRef} className="max-w-6xl mx-auto flex gap-12 lg:gap-16 relative">

          {/* TOC sidebar - desktop only */}
          <motion.aside
            className="hidden lg:block w-56 shrink-0"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            <nav className={isSticky ? 'fixed top-28 w-56' : ''}>
              <p className="text-xs font-bold text-gray-600 uppercase tracking-widest mb-4">Contents</p>
              <ul className="space-y-2.5 border-l border-white/[0.06] pl-4">
                {tocItems.map((item) => (
                  <li key={item.id}>
                    <a
                      href={`#${item.id}`}
                      className="text-sm text-gray-500 hover:text-white transition-colors block leading-snug"
                    >
                      {item.num && <span className="text-gray-700 mr-1.5">{item.num}</span>}
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </motion.aside>

          {/* Main content */}
          <div className="flex-1 min-w-0 max-w-3xl">

            {/* Abstract */}
            <section className="mb-16">
              <SectionHeading id="abstract">Abstract</SectionHeading>
              <Prose>
                <p>
                  The rapid advancement of generative AI has created an unprecedented crisis of content authenticity. As large language models and image generators produce outputs that are increasingly indistinguishable from human-created work, institutions across education, journalism, and the creative industries have turned to AI detection tools in an attempt to separate human work from machine-generated content. However, mounting evidence demonstrates that these detection tools are fundamentally unreliable, producing false positive rates that disproportionately affect non-native speakers, neurodivergent individuals, and writers with concise or formulaic styles.
                </p>
                <p>
                  This paper proposes a paradigm shift: rather than attempting to classify finished content as human or AI-generated after the fact, we argue that the only reliable method of establishing authorship is to record the creative process itself.
                </p>
                <p>
                  Our approach sidesteps the fundamental limitations of output-based detection by shifting the evidentiary basis from statistical inference to direct observation. This paper details the technical architecture, privacy model, and practical applications of verifiable process recording, and argues that it offers a sustainable path toward restoring trust in digital content creation.
                </p>
              </Prose>
            </section>

            <SectionDivider />

            {/* Section 1 */}
            <section className="mb-16">
              <SectionHeading id="introduction" num="01">Introduction</SectionHeading>
              <Prose>
                <p>
                  The year 2024 marked a turning point in the relationship between human creativity and artificial intelligence. With the public release of increasingly capable generative models, the volume of AI-assisted and AI-generated content surged across every domain of digital communication. Universities reported a dramatic increase in suspected AI-assisted submissions. Newsrooms began questioning the provenance of freelance contributions.
                </p>
                <p>
                  The institutional response was swift but misguided. Schools adopted AI detection platforms. Publishing houses integrated classifier APIs into their submission pipelines. Freelance marketplaces began requiring &ldquo;AI-free&rdquo; certifications. Yet the foundational assumption behind all of these measures &mdash; that the statistical properties of a finished text can reliably indicate whether a human or a machine produced it &mdash; has proven to be deeply flawed.
                </p>
              </Prose>
              <Callout>
                Instead of asking &ldquo;does this text look like it was written by AI?&rdquo;, we ask a more productive question: &ldquo;can the author demonstrate how they created this?&rdquo;
              </Callout>
              <Prose>
                <p>
                  By capturing and verifying the creative process, we replace probabilistic guesswork with observable evidence, offering a path toward trust that does not depend on the accuracy of classifiers that were never designed to bear such weight.
                </p>
              </Prose>
            </section>

            <SectionDivider />

            {/* Section 2 */}
            <section className="mb-16">
              <SectionHeading id="problem" num="02">The Problem with AI Detection</SectionHeading>
              <Prose>
                <p>
                  AI detection tools operate on a simple premise: that text generated by language models exhibits measurable statistical patterns &mdash; lower perplexity, more uniform token distributions, and predictable sentence structures &mdash; that distinguish it from human writing. In controlled laboratory settings, early detectors appeared to perform well. However, real-world deployment has revealed critical failures.
                </p>
              </Prose>

              {/* Stats highlight */}
              <motion.div
                className="my-10 py-8 px-6 rounded-2xl bg-white/[0.02] border border-white/[0.06] grid grid-cols-3 gap-6"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <KeyStat value="10-30%" label="False positive rate" color="var(--brand-red)" />
                <KeyStat value="2x" label="Bias against non-native writers" color="var(--brand-purple)" />
                <KeyStat value="0%" label="Accountability for false flags" color="var(--brand-blue)" />
              </motion.div>

              <Prose>
                <p>
                  Non-native English speakers are disproportionately flagged, as are writers who produce highly structured or formal prose. Students who follow templates, professionals trained in clear technical writing, and individuals with certain neurodivergent writing patterns all generate text that detectors frequently misclassify as AI-produced. The consequences of these false accusations are severe: failed assignments, lost contracts, damaged reputations, and an erosion of trust.
                </p>
                <p>
                  Furthermore, detection tools face an inherent arms race. As language models improve and their outputs become more varied and naturalistic, the statistical signatures that detectors rely upon diminish. The detection approach is not merely imperfect today &mdash; it is structurally incapable of keeping pace with the technology it seeks to police.
                </p>
              </Prose>
            </section>

            <SectionDivider />

            {/* Section 3 */}
            <section className="mb-16">
              <SectionHeading id="process-recording" num="03">Process Recording: A New Approach</SectionHeading>
              <Prose>
                <p>
                  Verifiable process recording reframes the authenticity problem entirely. Rather than performing post-hoc statistical analysis on a finished artifact, it captures the act of creation as it unfolds. When a writer composes an essay, they produce thousands of micro-events: keystrokes, deletions, pauses, cursor movements, copy-paste actions, tab switches to research sources, and iterative revisions. This behavioural signature is extraordinarily rich and, crucially, extraordinarily difficult to fabricate.
                </p>
              </Prose>
              <Callout color="var(--brand-green)">
                The difference is not statistical inference &mdash; it is direct, observable evidence.
              </Callout>
              <Prose>
                <p>
                  A genuine human writing session exhibits characteristic patterns that reflect cognitive processes &mdash; hesitation before complex ideas, bursts of fluency during well-understood passages, recursive editing that reveals evolving thought, and research detours that inform subsequent paragraphs. An AI-generated document pasted into an editor, by contrast, appears as a single insertion event or a series of rapid paste actions with minimal revision.
                </p>
                <p>
                  Wolfmax implements this concept through a lightweight local recording agent that runs alongside the user&apos;s writing environment. The agent captures process data &mdash; not content &mdash; and produces a structured, encrypted report that the user can choose to share with any requesting party.
                </p>
              </Prose>
            </section>

            <SectionDivider />

            {/* Section 4 */}
            <section className="mb-16">
              <SectionHeading id="architecture" num="04">Technical Architecture</SectionHeading>
              <Prose>
                <p>
                  The Wolfmax system comprises three core components:
                </p>
              </Prose>

              {/* Architecture cards */}
              <div className="my-8 grid gap-4">
                {[
                  { title: 'Local Capture Agent', desc: 'A system-level service that monitors designated writing environments and records process events in a structured event log. Events include keystroke timing, insertion and deletion operations, clipboard activity, window focus changes, and scroll behaviour. All capture occurs on the user\u2019s device.', color: 'var(--brand-red)' },
                  { title: 'Encryption & Report Layer', desc: 'Transforms the raw event log into a sealed, tamper-evident process report. Each report is cryptographically signed using a key pair generated locally. Hash chains ensure the report cannot be modified after generation without detection.', color: 'var(--brand-blue)' },
                  { title: 'Verification Interface', desc: 'Allows a third party to review the process report and assess its authenticity. Displays a timeline visualisation, key behavioural metrics, and a confidence assessment based on the richness of the recorded process.', color: 'var(--brand-green)' },
                ].map((card, i) => (
                  <motion.div
                    key={card.title}
                    className="relative overflow-hidden rounded-xl bg-white/[0.02] border border-white/[0.06] p-6 flex gap-5"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1, duration: 0.5 }}
                  >
                    <div
                      className="w-1 rounded-full shrink-0"
                      style={{ background: card.color }}
                    />
                    <div>
                      <h3 className="text-base font-bold text-white mb-2">{card.title}</h3>
                      <p className="text-sm text-gray-400 leading-relaxed">{card.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>

              <Prose>
                <p>
                  The report contains aggregate metrics &mdash; words per minute over time, revision frequency, research-to-writing ratios, and session duration &mdash; alongside a compressed behavioural fingerprint that characterises the writing pattern without exposing the underlying content. Importantly, the verifier sees evidence of how the work was created but does not gain access to drafts, deleted passages, or research history unless the author explicitly chooses to include that data.
                </p>
              </Prose>
            </section>

            <SectionDivider />

            {/* Section 5 */}
            <section className="mb-16">
              <SectionHeading id="privacy" num="05">Privacy Model</SectionHeading>
              <Callout color="var(--brand-purple)">
                Privacy is not a secondary consideration in the Wolfmax architecture &mdash; it is a foundational design constraint.
              </Callout>
              <Prose>
                <p>
                  The system was built on the principle that proving authorship should never require surrendering intellectual privacy. Writers routinely explore sensitive topics, draft and discard vulnerable passages, and conduct research that they may not wish to disclose.
                </p>
                <p>
                  Wolfmax enforces a strict local-first model. All process data is captured, stored, and processed on the user&apos;s own device. The recording agent never transmits raw event data to any server. When the user generates a process report, they control exactly what level of detail to include: a minimal report contains only aggregate behavioural metrics, while a detailed report may include anonymised revision patterns and session timelines. At no level of detail does the report contain readable content from the user&apos;s work.
                </p>
                <p>
                  Sharing is always an explicit, user-initiated action. No central database of process recordings exists, and Wolfmax has no ability to access or reconstruct a user&apos;s writing history. This architecture ensures compliance with data protection regulations and, more importantly, respects the fundamental right of creators to control their own creative records.
                </p>
              </Prose>
            </section>

            <SectionDivider />

            {/* Section 6 */}
            <section className="mb-16">
              <SectionHeading id="use-cases" num="06">Use Cases</SectionHeading>

              {[
                { num: '6.1', title: 'Education', body: 'Academic integrity is among the most pressing applications for verifiable process recording. Students can run Wolfmax during essay composition and submit a process report alongside their work, providing instructors with evidence of genuine engagement without resorting to unreliable detection tools. This shifts the dynamic from adversarial suspicion to collaborative trust.', color: 'var(--brand-blue)' },
                { num: '6.2', title: 'Journalism and Publishing', body: 'Newsrooms and publishers face growing pressure to verify that submitted content is genuinely authored by the credited writer. Freelance journalists and contributors can use Wolfmax to provide editors with process evidence that accompanies their submissions. This is particularly valuable for investigative pieces and opinion columns where authorship credibility is paramount.', color: 'var(--brand-purple)' },
                { num: '6.3', title: 'Creative and Professional Services', body: 'Freelance writers, copywriters, and content professionals increasingly encounter clients who question whether delivered work is human-authored. Wolfmax provides these professionals with a portable, verifiable credential that demonstrates their creative process. A process report restores agency to the creator and provides clients with meaningful assurance.', color: 'var(--brand-green)' },
              ].map((uc, i) => (
                <motion.div
                  key={uc.num}
                  className="mb-8 last:mb-0"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                >
                  <div className="flex items-baseline gap-3 mb-3">
                    <span className="text-2xl font-black opacity-30" style={{ color: uc.color }}>{uc.num}</span>
                    <h3 className="text-xl font-semibold text-white">{uc.title}</h3>
                  </div>
                  <p className="text-gray-300 leading-[1.85] text-[15px] sm:text-base">{uc.body}</p>
                </motion.div>
              ))}
            </section>

            <SectionDivider />

            {/* Section 7 */}
            <section className="mb-16">
              <SectionHeading id="conclusion" num="07">Conclusion</SectionHeading>
              <Prose>
                <p>
                  The challenge of content authenticity in the age of generative AI will not be solved by building better classifiers. The statistical arms race between generators and detectors is structurally unwinnable, and the collateral damage of false accusations is already significant and growing.
                </p>
                <p>
                  Verifiable process recording, as implemented by Wolfmax, offers this alternative. By capturing the rich behavioural signal of human creative work and packaging it in a privacy-preserving, tamper-evident format, it provides institutions, editors, and clients with meaningful assurance of authorship.
                </p>
              </Prose>
              <Callout>
                The future of content trust lies not in suspicion and surveillance, but in empowering creators to demonstrate their work on their own terms.
              </Callout>
            </section>

            {/* References */}
            <section className="mb-16 pt-12 border-t border-white/[0.06]">
              <motion.h2
                className="text-lg font-bold text-white mb-6"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
              >
                References
              </motion.h2>
              <div className="space-y-4">
                {references.map((ref, i) => (
                  <motion.div
                    key={i}
                    className="flex gap-4 text-sm"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.05 }}
                  >
                    <span className="text-gray-600 font-mono shrink-0 w-5 text-right">{i + 1}.</span>
                    <p className="text-gray-400">
                      {ref.authors} ({ref.year}). &ldquo;{ref.title}.&rdquo; <em className="text-gray-300">{ref.journal}</em>.
                    </p>
                  </motion.div>
                ))}
              </div>
            </section>

            {/* Footer CTA */}
            <motion.div
              className="text-center pt-12 border-t border-white/[0.06]"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <p className="text-gray-500 mb-6">Interested in learning more about Wolfmax?</p>
              <Link
                href="/"
                className="inline-flex items-center gap-2 px-8 py-3 bg-brand-red text-white font-bold rounded-full hover:scale-105 transition-transform pulse-glow group"
              >
                Visit Homepage
                <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </Link>
            </motion.div>

          </div>
        </div>
      </main>
    </div>
  );
}
