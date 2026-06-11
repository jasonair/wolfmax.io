'use client';

import Link from 'next/link';
import { useRef } from 'react';
import { usePathname } from 'next/navigation';
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

// Decorative footer waves. Sized against --stage (= min(100vw, 1728px), set on
// the page wrapper) so the composition scales with viewport width up to the
// 1728px cap, then freezes instead of stretching. The numbers are percentages
// of --stage (tuned at 1728px / footer height 850px): `width` sizes each wave;
// `top`/`left` anchor it relative to the footer's top-centre. Wave-01 sits
// higher, bleeding up into the CTA above.
const WAVES = [
  { src: '/images/wave-01.png', width: 166, top: -13.11, left: -6.25 },
  { src: '/images/wave-02.png', width: 166, top: 3.13, left: -17.82 },
];

// Pages whose final section is already a navy block flush above the footer
// (it carries the rounded top instead, so the footer stays flat to avoid a
// cream notch at the navy-on-navy seam). The homepage's EarlyAccess block does
// the same. Everywhere else the footer itself is the top of the navy region,
// so it gets the rounded top.
const TRAILING_NAVY = new Set(['/individuals', '/verify']);

export function Footer() {
  const pathname = usePathname();
  const showWaves = pathname === '/';
  const roundedTop = pathname !== '/' && !TRAILING_NAVY.has(pathname);
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
    <footer className={`surface-navy relative overflow-x-clip ${roundedTop ? 'rounded-t-[5rem]' : ''}`}>
      {/* Decorative waves — homepage only */}
      {showWaves && WAVES.map((w) => (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          key={w.src}
          aria-hidden
          src={w.src}
          alt=""
          className="pointer-events-none select-none absolute"
          style={{
            width: `calc(var(--stage) * ${w.width / 100})`,
            maxWidth: 'none',
            left: `calc(50% + var(--stage) * ${w.left / 100})`,
            transform: 'translateX(-50%)',
            top: `calc(var(--stage) * ${w.top / 100})`,
          }}
        />
      ))}

      {/* Wave stage — only needed on homepage where the waves render */}
      {showWaves && <div className="h-[calc(var(--stage)*0.3)]" />}

      <div className={`relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-14 sm:pb-16 ${roundedTop ? 'pt-16 sm:pt-20' : ''}`}>
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
