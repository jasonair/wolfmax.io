'use client';

import Link from 'next/link';
import { Logo } from './Logo';

const productLinks = [
  { label: 'How it Works', href: '/#how-it-works' },
  { label: 'Use Cases', href: '/#use-cases' },
  { label: 'Verify a Report', href: '/verify' },
];

const resourceLinks = [
  { label: 'Whitepaper', href: '/#whitepaper' },
  { label: 'Blog', href: '/blog' },
  { label: 'Changelog', href: '/changelog' },
  { label: 'Security', href: '/#security' },
];

const companyLinks = [
  { label: 'Careers', href: '/careers' },
  { label: 'Privacy Policy', href: '/privacy' },
  { label: 'Terms', href: '/terms' },
  { label: 'Contact', href: '/contact' },
];

function FooterColumn({
  title,
  links,
}: {
  title: string;
  links: { label: string; href: string }[];
}) {
  return (
    <div>
      <h4 className="text-cream font-semibold text-sm mb-4">{title}</h4>
      <ul className="space-y-2.5">
        {links.map((link) => (
          <li key={link.label}>
            <Link
              href={link.href}
              className="text-sm text-cream/55 hover:text-cream transition-colors"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Footer() {
  return (
    <footer className="surface-navy border-t border-cream/10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-16">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-10 sm:gap-8">
          {/* Brand column */}
          <div className="col-span-2 sm:col-span-1">
            <Link href="/" className="inline-flex items-center mb-4 group" aria-label="Workings home">
              <Logo variant="light" className="h-7 w-auto transition-transform group-hover:scale-[1.03]" />
            </Link>
            <p className="text-sm text-cream/55 leading-relaxed mb-5">
              Prove your process.
              <br />
              Protect your work.
            </p>
            {/* Social */}
            <div className="flex items-center gap-3">
              <a
                href="https://x.com/WolfmaxLabs"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-white/[0.04] border border-cream/10 flex items-center justify-center text-cream/55 hover:text-cream hover:border-blue hover:bg-white/[0.08] transition-all"
                aria-label="Follow us on X"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Link columns */}
          <FooterColumn title="Product" links={productLinks} />
          <FooterColumn title="Resources" links={resourceLinks} />
          <FooterColumn title="Company" links={companyLinks} />
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-6 border-t border-cream/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="text-cream/45 text-sm" suppressHydrationWarning>
            &copy; {new Date().getFullYear()} Workings. All rights reserved.
          </span>
          <span className="text-cream/35 text-xs">
            Built for creators, by creators.
          </span>
        </div>
      </div>
    </footer>
  );
}
