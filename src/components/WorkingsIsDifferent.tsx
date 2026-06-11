'use client';

import { motion } from 'framer-motion';
import { Logo } from './Logo';

const CENTRE = 250;
const R_IN = 138;
const R_OUT = 188;
const SEGMENT_GAP_DEG = 8;
const ARROW_SPAN_DEG = 11;
const ARROW_PROTRUDE = 16;

const SEGMENTS = [
  { startDeg: -90 + SEGMENT_GAP_DEG / 2, endDeg: 0 - SEGMENT_GAP_DEG / 2, fill: '#2c4fd1' },
  { startDeg: 0 + SEGMENT_GAP_DEG / 2, endDeg: 90 - SEGMENT_GAP_DEG / 2, fill: '#4470eb' },
  { startDeg: 90 + SEGMENT_GAP_DEG / 2, endDeg: 180 - SEGMENT_GAP_DEG / 2, fill: '#7a96ff' },
  { startDeg: 180 + SEGMENT_GAP_DEG / 2, endDeg: 270 - SEGMENT_GAP_DEG / 2, fill: '#b3c5ff' },
];

function buildPath(startDeg: number, endDeg: number): string {
  const polar = (r: number, deg: number): [number, number] => {
    const rad = (deg * Math.PI) / 180;
    return [CENTRE + r * Math.cos(rad), CENTRE + r * Math.sin(rad)];
  };
  const baseAngle = endDeg - ARROW_SPAN_DEG;
  const [x1, y1] = polar(R_OUT, startDeg);
  const [x2, y2] = polar(R_OUT, baseAngle);
  const [xt, yt] = polar(R_OUT + ARROW_PROTRUDE, endDeg);
  const [x4, y4] = polar(R_IN, baseAngle);
  const [x5, y5] = polar(R_IN, startDeg);
  const f = (n: number) => n.toFixed(2);
  return `M${f(x1)} ${f(y1)} A${R_OUT} ${R_OUT} 0 0 1 ${f(x2)} ${f(y2)} L${f(xt)} ${f(yt)} L${f(x4)} ${f(y4)} A${R_IN} ${R_IN} 0 0 0 ${f(x5)} ${f(y5)} Z`;
}

const LABEL = 'font-subtitle text-[1.05rem] sm:text-[1.2rem] font-semibold text-cream leading-tight';

export function WorkingsIsDifferent() {
  return (
    <section id="how-it-works" className="surface-cream py-4 sm:py-6">
      <div className="surface-navy relative overflow-hidden rounded-[5rem] mx-4 sm:mx-6 lg:mx-8 px-4 sm:px-6 lg:px-8 py-24 sm:py-32">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-14 sm:mb-16">
          <p className="eyebrow text-blue mb-5">Properly Private</p>
          <h2 className="font-display text-[2rem] sm:text-[3rem] leading-[1.06] text-cream max-w-[22ch] mx-auto">
            <em className="italic">Workings</em> is different.
          </h2>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="mx-auto grid w-full max-w-[760px] grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] items-center justify-items-center gap-x-4 gap-y-6 sm:gap-x-8 sm:gap-y-8"
        >
          <div />
          <div className={`${LABEL} text-center`}>Collect rich data</div>
          <div />

          <div className={`${LABEL} justify-self-end text-right max-w-[160px] sm:max-w-[180px]`}>
            Verifiable authorship
          </div>
          <div className="relative aspect-square w-[240px] sm:w-[320px] md:w-[380px]">
            <svg viewBox="-10 -10 520 520" className="absolute inset-0 h-full w-full" aria-hidden="true">
              {SEGMENTS.map((s, i) => (
                <path key={i} d={buildPath(s.startDeg, s.endDeg)} fill={s.fill} />
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
