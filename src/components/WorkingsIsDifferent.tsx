'use client';

import { motion } from 'framer-motion';
import { Logo } from './Logo';

/**
 * "Workings is different" — flywheel diagram.
 *
 * Four arrow-tipped arcs in a ring, graduating from a deep cobalt navy at
 * the top through brand --w-blue to a light cobalt at the left, suggesting
 * a continuous loop of data → privacy → reach → authorship. The W mark sits
 * in the centre with the brand tagline beneath. Labels at the four cardinal
 * directions sit outside the ring.
 *
 * Layout: 3x3 CSS grid so the labels at top/right/bottom/left stay
 * positioned relative to the diagram cell regardless of label-text length.
 * The ring's viewBox includes a small extension beyond R_OUT so arrowheads
 * aren't clipped.
 */

// Ring geometry. Centre at (250, 250) in a 500x500 viewBox so each segment
// has clean trigonometric coordinates.
const CENTRE = 250;
const R_IN = 138;
const R_OUT = 188;
// Each segment occupies one quarter of the ring (90°) minus a small gap so
// the four arrows visually separate. The arrow's "tip" extends ARROW_PROTRUDE
// beyond R_OUT, with ARROW_SPAN_DEG of the segment dedicated to the tapered
// arrow shape.
const SEGMENT_GAP_DEG = 8;
const ARROW_SPAN_DEG = 11;
const ARROW_PROTRUDE = 16;

// SVG angle convention: 0° = 3 o'clock, increases clockwise (y is down). So
// the top arc starts a hair past 12 (-90°) and ends just before 3 (0°), with
// its arrow tip pointing into the 3 o'clock direction. Subsequent arcs
// continue clockwise.
//
// Palette is tuned for navy surface — every fill is well above the navy
// background luminance so each arc reads without bleeding into the bg.
const SEGMENTS = [
  { startDeg: -90 + SEGMENT_GAP_DEG / 2, endDeg: 0 - SEGMENT_GAP_DEG / 2, fill: '#2c4fd1' }, // top: deep cobalt
  { startDeg: 0 + SEGMENT_GAP_DEG / 2, endDeg: 90 - SEGMENT_GAP_DEG / 2, fill: '#4470eb' }, // right: brand cobalt
  { startDeg: 90 + SEGMENT_GAP_DEG / 2, endDeg: 180 - SEGMENT_GAP_DEG / 2, fill: '#7a96ff' }, // bottom: medium-light cobalt
  { startDeg: 180 + SEGMENT_GAP_DEG / 2, endDeg: 270 - SEGMENT_GAP_DEG / 2, fill: '#b3c5ff' }, // left: very light cobalt
];

function buildPath(startDeg: number, endDeg: number): string {
  const polar = (r: number, deg: number): [number, number] => {
    const rad = (deg * Math.PI) / 180;
    return [CENTRE + r * Math.cos(rad), CENTRE + r * Math.sin(rad)];
  };
  const baseAngle = endDeg - ARROW_SPAN_DEG;
  const [x1, y1] = polar(R_OUT, startDeg);       // outer trailing corner
  const [x2, y2] = polar(R_OUT, baseAngle);      // outer leading (arrow base)
  const [xt, yt] = polar(R_OUT + ARROW_PROTRUDE, endDeg); // arrow tip (protrudes outward)
  const [x4, y4] = polar(R_IN, baseAngle);       // inner leading (arrow base)
  const [x5, y5] = polar(R_IN, startDeg);        // inner trailing corner
  const f = (n: number) => n.toFixed(2);
  // Outer CW arc from trailing to base, line to tip, line to inner base,
  // inner CCW arc back to trailing, close. Sweep flag 1/0 (CW vs CCW) and
  // large-arc 0 (each arc is < 180°).
  return `M${f(x1)} ${f(y1)} A${R_OUT} ${R_OUT} 0 0 1 ${f(x2)} ${f(y2)} L${f(xt)} ${f(yt)} L${f(x4)} ${f(y4)} A${R_IN} ${R_IN} 0 0 0 ${f(x5)} ${f(y5)} Z`;
}

const LABEL_CLASS = 'font-display text-[1.05rem] sm:text-[1.2rem] font-semibold text-cream leading-tight';

export function WorkingsIsDifferent() {
  return (
    <section id="how-it-works" className="surface-navy relative overflow-hidden px-4 sm:px-6 lg:px-8 py-24 sm:py-32">
      <div className="max-w-5xl mx-auto">
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
          {/* Row 1: top label */}
          <div />
          <div className={`${LABEL_CLASS} text-center`}>Collect rich data</div>
          <div />

          {/* Row 2: left label | diagram | right label */}
          <div className={`${LABEL_CLASS} justify-self-end text-right max-w-[160px] sm:max-w-[180px]`}>
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
          <div className={`${LABEL_CLASS} justify-self-start text-left max-w-[160px] sm:max-w-[180px]`}>
            In total privacy
          </div>

          {/* Row 3: bottom label */}
          <div />
          <div className={`${LABEL_CLASS} text-center`}>Across any app</div>
          <div />
        </motion.div>
      </div>
    </section>
  );
}
