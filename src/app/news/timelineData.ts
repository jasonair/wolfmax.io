export type TimelineEntryType = 'UPCOMING' | 'NEWS' | 'RELEASE' | 'MILESTONE';

export interface TimelineEntry {
  type: TimelineEntryType;
  date: string;
  version?: string;
  title: string;
  description: string;
  highlighted?: boolean;
}

// Ordered newest -> oldest (top of timeline -> bottom).
// Note: prior to April 2026 the product was in stealth under the name Wolfmax.
// Entries before the "Workings name locked in" milestone refer to it as Wolfmax.
export const timeline: TimelineEntry[] = [
  {
    type: 'UPCOMING',
    date: 'Q3 2026',
    title: 'Wider release & university trials',
    description:
      'Workings opens to a wider release, with planned university trials in the UK and Australia.',
  },
  {
    type: 'UPCOMING',
    date: 'June 2026',
    title: 'London-based creative agency pilot',
    description:
      'Our first pilot goes live with London-based creative agency, putting Workings to work in a real creative studio.',
  },
  {
    type: 'NEWS',
    date: '26 May 2026',
    title: 'Out of stealth - website goes live',
    description:
      'After nine months building quietly - five of them post-alpha - Workings steps out of stealth. The website launches, explaining the product and how process verification works.',
  },
  {
    type: 'MILESTONE',
    date: '20 May 2026',
    title: 'Brand finalised and TM submitted',
    description:
      'Final brand identity locked in, with trademark application submitted for Workings.',
  },
  {
    type: 'RELEASE',
    date: 'May 2026',
    version: 'v0.6.0-v0.7.4',
    title: 'Rich searchable history',
    description:
      'A richer record of your work across more of the tools you use, plus passkey sign-in and an added privacy lock - with broad reliability and performance gains across Windows and macOS.',
  },
  {
    type: 'NEWS',
    date: '01 May 2026',
    title: 'Private beta begins',
    description:
      'Beta opens to early-access users. The full recording, report generation, and verification flow goes live.',
  },
  {
    type: 'RELEASE',
    date: 'April 2026',
    version: 'v0.5.0-v0.5.6',
    title: 'Redaction & control',
    description:
      'Putting you in control of what you share. Added redaction for sensitive moments, flexible capture modes, nomad mode (offline support), and the ability to attach and verify source documents. Reports now present your work as a whole, and "Originality" became "Authorship."',
  },
  {
    type: 'MILESTONE',
    date: 'April 2026',
    title: 'Five advisors signed',
    description:
      'Five advisors join Workings, covering GTM & marketing, ZK proofs & cryptography, dev in EdTech & MedTech, IP (Partner @ CMS), and scalable infrastructure (Mechanical Rock).',
  },
  {
    type: 'MILESTONE',
    date: 'April 2026',
    title: 'Workings name locked in',
    description:
      'Built in stealth as Wolfmax up to this point. After naming testing with target audiences, we locked in Workings as the public name.',
  },
  {
    type: 'MILESTONE',
    date: '31 March 2026',
    title: 'Angel round closed',
    description:
      'We closed our angel round to fund the next phase of development. Grateful to our investors, protecting authorship in the age of AI.',
  },
  {
    type: 'RELEASE',
    date: 'March 2026',
    version: 'v0.4.0-v0.4.9',
    title: 'The evidence report',
    description:
      'The evidence report came of age - a clear visual story of how a piece of work came together, with shareable verification. Added video reports, a guided setup experience, refreshed settings, and fast search across your history.',
  },
  {
    type: 'RELEASE',
    date: 'February 2026',
    version: 'v0.2.0-v0.3.7',
    title: 'Browsing & proof reports',
    description:
      'A major step up in how you browse and review your work - a calendar view, system-tray controls, and pause-and-resume. The first proof reports arrive, alongside a redesigned evidence view and stronger privacy foundations with encrypted local storage.',
  },
  {
    type: 'MILESTONE',
    date: 'February 2026',
    title: 'Mechanical Rock engaged for development phase',
    description:
      'We bring on Mechanical Rock as our engineering partner to take Wolfmax from alpha into production.',
  },
  {
    type: 'NEWS',
    date: 'January 2026',
    title: 'Outreach begins',
    description:
      'Multiple live conversations underway with law firms, consultancies, universities, and more.',
  },
  {
    type: 'RELEASE',
    date: 'January 2026',
    version: 'v0.1.0-v0.1.5',
    title: 'Foundations',
    description:
      'Production stage of development begins. The first desktop builds arrive - a private, local-first foundation for capturing your work as you create, with Windows and macOS support from the start.',
  },
  {
    type: 'MILESTONE',
    date: 'December 2025',
    title: 'LOI signed for pilot with London-based creative agency',
    description:
      'We signed a letter of intent with London-based creative agency - our first pilot partner - to validate Wolfmax in a live creative studio.',
  },
  {
    type: 'MILESTONE',
    date: 'November 2025',
    title: 'Finance and Operations Lead joins',
    description:
      'We welcomed our Finance and Operations Lead, strengthening the team as we moved toward launch.',
  },
  {
    type: 'MILESTONE',
    date: '15 October 2025',
    title: 'Patent pending',
    description:
      'Working with patent attorneys Reddie & Grose, we filed for protection of the Wolfmax process verification technology - safeguarding our novel approach to creative integrity.',
  },
  {
    type: 'MILESTONE',
    date: 'September 2025',
    title: 'Student survey signals strong market pull',
    description:
      'A survey of students revealed clear demand - validating Wolfmax not just as proof of authorship, but as a tool students actively wanted for their own work.',
  },
  {
    type: 'MILESTONE',
    date: 'August 2025',
    title: 'Wolfmax* Alpha',
    description:
      'The journey begins. Our first internal alpha proves the core concept: local process recording and tamper-evident recordings on a privacy-first architecture, built by a small founding team. (*Stealth name used until April 2026.)',
  },
];
