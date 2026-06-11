'use client';

import Link from 'next/link';
import { useRef } from 'react';
import { Logo } from './Logo';
import { COOKIE_PREFS_EVENT } from './CookieConsent';

type FooterItem = { label: string; href?: string; external?: boolean; action?: 'cookie-prefs' };

const columns: { title: string; items: FooterItem[] }[] = [
  {
    title: 'Product',
    items: [
      { label: 'Individuals', href: '/individuals' },
      { label: 'Educators', href: '/institutions#educators' },
      { label: 'Businesses', href: '/institutions#businesses' },
    ],
  },
  {
    title: 'How it works',
    items: [
      { label: 'How it works', href: '/#how-it-works' },
      { label: 'Verify a report', href: '/verify' },
      { label: 'Security', href: '/#security' },
    ],
  },
  {
    title: 'Resources',
    items: [
      { label: 'News', href: '/news' },
      { label: 'FAQ', href: '/faq' },
      { label: 'info@workings.io', href: 'mailto:info@workings.io', external: true },
    ],
  },
  {
    title: 'Legal',
    items: [
      { label: 'Privacy', href: '/privacy' },
      { label: 'Cookie preferences', action: 'cookie-prefs' },
    ],
  },
];

const linkClass = 'text-sm text-cream/55 hover:text-cream transition-colors text-left';

function FooterLink({ item }: { item: FooterItem }) {
  if (item.action === 'cookie-prefs') {
    return (
      <button className={linkClass} onClick={() => window.dispatchEvent(new Event(COOKIE_PREFS_EVENT))}>
        {item.label}
      </button>
    );
  }
  if (item.external) {
    return (
      <a className={linkClass} href={item.href}>
        {item.label}
      </a>
    );
  }
  return (
    <Link className={linkClass} href={item.href!}>
      {item.label}
    </Link>
  );
}

export function Footer() {
  // Easter egg: three quick clicks on the divider dot.
  const clicks = useRef(0);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const onEgg = () => {
    clicks.current += 1;
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => (clicks.current = 0), 800);
    if (clicks.current >= 3) {
      clicks.current = 0;
      window.open('https://www.youtube.com/shorts/2XUun_OPEXA', '_blank');
    }
  };

  return (
    <footer className="surface-navy">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-16">
        <div className="grid grid-cols-2 gap-10 sm:grid-cols-3 lg:grid-cols-[2fr_1fr_1fr_1fr_1fr] sm:gap-8">
          {/* Brand column */}
          <div className="col-span-2 sm:col-span-3 lg:col-span-1">
            <Link href="/" className="inline-flex items-center mb-4 group" aria-label="Workings home">
              <Logo variant="light" className="h-7 w-auto transition-transform group-hover:scale-[1.03]" />
            </Link>
            <p className="font-display text-2xl text-cream leading-tight mb-5 max-w-[260px]">
              The way you work.
            </p>
          </div>

          {/* Link columns */}
          {columns.map((col) => (
            <div key={col.title}>
              <h4 className="eyebrow text-cream/55 mb-4">{col.title}</h4>
              <ul className="space-y-2.5 flex flex-col items-start">
                {col.items.map((item) => (
                  <li key={item.label}>
                    <FooterLink item={item} />
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-6 border-t border-cream/10 flex flex-col sm:flex-row items-center justify-between gap-3 font-mono text-xs text-cream/45">
          <span>
            &copy; 2026 Human Workings Ltd{' '}
            <span onClick={onEgg} className="cursor-pointer select-none" title="·">·</span>
          </span>
          <span>All rights reserved</span>
        </div>

        {/* Site signature — appears at the bottom of every page */}
        <p className="mt-8 text-center text-sm text-cream/55">Properly private.</p>
      </div>
    </footer>
  );
}
