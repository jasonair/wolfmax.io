'use client';

import { motion } from 'framer-motion';
import { Logo } from './Logo';

const C = 250;          // SVG centre
const R_IN  = 160;      // inner ring radius — larger = more centre space
const R_OUT = 212;      // outer ring radius
const R_MID = (R_IN + R_OUT) / 2; // where the tip converges (186)
const GAP   = 9;        // degrees of gap between segments
const HEAD  = 18;       // degrees the arrowhead spans
const FLARE = 16;       // px each side beyond arc width at arrowhead base
const N     = 14;       // polygon steps for smooth arrowhead curves

const SEGMENTS = [
  { id: 'a', s: -90 + GAP / 2, e:   0 - GAP / 2, color: '#2c4fd1' },
  { id: 'b', s:   0 + GAP / 2, e:  90 - GAP / 2, color: '#4470eb' },
  { id: 'c', s:  90 + GAP / 2, e: 180 - GAP / 2, color: '#7a96ff' },
  { id: 'd', s: 180 + GAP / 2, e: 270 - GAP / 2, color: '#b3c5ff' },
];

function pt(r: number, deg: number): [number, number] {
  const rad = (deg * Math.PI) / 180;
  return [C + r * Math.cos(rad), C + r * Math.sin(rad)];
}

function f(n: number) { return n.toFixed(2); }

function buildPath(startDeg: number, endDeg: number): string {
  const hs = endDeg - HEAD;           // arrowhead base angle
  const RO = R_OUT + FLARE;           // flared outer radius
  const RI = R_IN  - FLARE;           // flared inner radius

  // Named points
  const [ax, ay] = pt(R_OUT, startDeg); // outer arc start
  const [bx, by] = pt(R_OUT, hs);       // outer arc body end
  const [cx, cy] = pt(RO,    hs);       // outer flare (notch corner)
  const [dx, dy] = pt(RI,    hs);       // inner flare (notch corner)
  const [ex, ey] = pt(R_IN,  hs);       // inner arc body start
  const [fx2, fy2] = pt(R_IN, startDeg); // inner arc start

  // Outer arrowhead curve: (RO, hs) → (R_MID, endDeg)
  const outerCurve = Array.from({ length: N }, (_, i) => {
    const t = (i + 1) / N;
    const [x, y] = pt(RO + (R_MID - RO) * t, hs + HEAD * t);
    return `L${f(x)} ${f(y)}`;
  }).join(' ');

  // Inner arrowhead curve: (R_MID, endDeg) → (RI, hs)
  const innerCurve = Array.from({ length: N }, (_, i) => {
    const t = (N - 1 - i) / N;
    const [x, y] = pt(RI + (R_MID - RI) * t, hs + HEAD * t);
    return `L${f(x)} ${f(y)}`;
  }).join(' ');

  return [
    `M${f(ax)} ${f(ay)}`,
    `A${R_OUT} ${R_OUT} 0 0 1 ${f(bx)} ${f(by)}`, // outer arc (CW)
    `L${f(cx)} ${f(cy)}`,                           // flare out (notch)
    outerCurve,                                      // taper to tip
    innerCurve,                                      // taper back from tip
    `L${f(dx)} ${f(dy)}`,                           // flare end already here — step to arc
    `L${f(ex)} ${f(ey)}`,                           // step back to R_IN
    `A${R_IN} ${R_IN} 0 0 0 ${f(fx2)} ${f(fy2)}`,  // inner arc (CCW)
    'Z',
  ].join(' ');
}

const LABEL = 'font-subtitle text-[1.05rem] sm:text-[1.2rem] font-semibold text-cream leading-tight';

export function WorkingsIsDifferent() {
  return (
    <section id="how-it-works" className="surface-cream py-4 sm:py-6">
      <div className="surface-navy relative overflow-hidden rounded-[5rem] mx-4 sm:mx-6 lg:mx-8 px-4 sm:px-6 lg:px-8 py-24 sm:py-32">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-14 sm:mb-16">
          <p className="eyebrow text-blue mb-5">Properly Private</p>
          <h2 className="font-display text-[2rem] sm:text-[3rem] leading-[1.08] text-cream max-w-[22ch] mx-auto">
            <em className="italic">Workings</em> is different.
          </h2>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="mx-auto grid w-full max-w-[820px] grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] items-center justify-items-center gap-x-2 gap-y-4 sm:gap-x-4 sm:gap-y-6"
        >
          <div />
          <div className={`${LABEL} text-center`}>Collect rich data</div>
          <div />

          <div className={`${LABEL} justify-self-end text-center max-w-[120px] sm:max-w-[140px]`}>
            Verifiable authorship
          </div>

          <div className="relative aspect-square w-[260px] sm:w-[360px] md:w-[440px]">
            <svg viewBox="0 0 500 500" className="absolute inset-0 h-full w-full" aria-hidden="true">
              <defs>
                {SEGMENTS.map(seg => {
                  const [x1, y1] = pt(R_MID, seg.s);
                  const [x2, y2] = pt(R_MID, seg.e);
                  return (
                    <linearGradient key={seg.id} id={`g-${seg.id}`} x1={f(x1)} y1={f(y1)} x2={f(x2)} y2={f(y2)} gradientUnits="userSpaceOnUse">
                      <stop offset="0%" stopColor={seg.color} stopOpacity="0" />
                      <stop offset="100%" stopColor={seg.color} stopOpacity="1" />
                    </linearGradient>
                  );
                })}
              </defs>
              {SEGMENTS.map(seg => (
                <path key={seg.id} d={buildPath(seg.s, seg.e)} fill={`url(#g-${seg.id})`} />
              ))}
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <Logo iconOnly variant="light" className="h-12 sm:h-14 w-auto" />
              <span className="eyebrow text-cream/55 mt-2 text-[0.6rem] sm:text-[0.7rem]">the way you work</span>
            </div>
          </div>

          <div className={`${LABEL} justify-self-start text-left max-w-[160px] sm:max-w-[180px]`}>
            In total privacy
          </div>

          <div />
          <div className={`${LABEL} text-center`}>Across any app</div>
          <div />
        </motion.div>
      </div>
      </div>
    </section>
  );
}
