'use client';

import Link from 'next/link';
import { WolfLogo } from './WolfLogo';

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
      <h4 className="text-white font-semibold text-sm mb-4">{title}</h4>
      <ul className="space-y-2.5">
        {links.map((link) => (
          <li key={link.label}>
            <Link
              href={link.href}
              className="text-sm text-gray-500 hover:text-white transition-colors"
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
    <footer className="relative z-10 border-t border-white/[0.06] bg-black">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-16">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-10 sm:gap-8">
          {/* Brand column */}
          <div className="col-span-2 sm:col-span-1">
            <Link href="/" className="inline-flex items-center gap-2 mb-4 group">
              <WolfLogo className="w-7 h-7 transition-transform group-hover:scale-110" animate={false} />
              <span className="text-base font-bold text-white tracking-tight">Wolfmax</span>
            </Link>
            <p className="text-sm text-gray-500 leading-relaxed mb-5">
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
                className="w-9 h-9 rounded-lg bg-white/[0.04] border border-white/[0.06] flex items-center justify-center text-gray-500 hover:text-white hover:border-white/[0.12] hover:bg-white/[0.08] transition-all"
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
        <div className="mt-12 pt-6 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="text-gray-600 text-sm" suppressHydrationWarning>
            &copy; {new Date().getFullYear()} Wolfmax. All rights reserved.
          </span>
          <div
            className="h-px w-8 sm:hidden"
            style={{
              background: 'linear-gradient(90deg, transparent, var(--brand-red), transparent)',
              opacity: 0.3,
            }}
          />
          <span className="text-gray-700 text-xs">
            Built for creators, by creators.
          </span>
        </div>
      </div>
    </footer>
  );
}
