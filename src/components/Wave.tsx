'use client';

import { motion } from 'framer-motion';

interface WaveProps {
  className?: string;
  strokeWidth?: number;
  /** When provided, the line draws itself across left-to-right (true) or
   *  stays hidden until it flips true. Omit for a plain static wave. */
  draw?: boolean;
  drawDelay?: number;
  drawDuration?: number;
}

/**
 * The Workings hand-drawn wave / squiggle - the brand's "journey" motif.
 * Colour is inherited via `currentColor` (e.g. add `text-blue`).
 */
export function Wave({
  className = "",
  strokeWidth = 8,
  draw,
  drawDelay = 0,
  drawDuration = 1.4,
}: WaveProps) {
  // Lazy, low-frequency rolling wave - two broad humps with relaxed, flowing
  // S-curves, matching the brand reference. Generated as a Catmull-Rom spline
  // through hand-placed anchors (crest1≈345,26 · trough1≈548,99 · crest2≈893,31
  // · trough2≈1042,86), so the tangents are natural rather than forced-flat -
  // no pinching. It enters low at the left edge and climbs off the top-RIGHT
  // corner, with the end anchors set just past x=-40 / x=1492 so the round caps
  // clip off-screen and the line reaches BOTH edges. The viewBox is ~12:1
  // (1440×120) to match the hero's display aspect, so `preserveAspectRatio
  // ="none"` stretches it almost uniformly - keeping the curve smooth - while
  // `non-scaling-stroke` holds an even thickness at any width.
  const d =
    "M-40 96 C54 77 247 26 345 26 C443 26 457 98 548 99 C639 100 811 33 893 31 C975 29 942 90 1042 86 C1142 82 1389 28 1492 6";

  const path = (
    <path
      d={d}
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      vectorEffect="non-scaling-stroke"
      fill="none"
    />
  );

  // Static usages (e.g. the 404 page) render a plain, full-width path.
  if (draw === undefined) {
    return (
      <svg className={className} viewBox="0 0 1440 120" fill="none" preserveAspectRatio="none" aria-hidden="true">
        {path}
      </svg>
    );
  }

  // The "draw across" reveal is a left→right clip-path wipe rather than a
  // stroke-dash animation. A dash animation combined with `non-scaling-stroke`
  // freezes the dash length in screen pixels, so widening the window leaves the
  // line stopping short of the edge. A clip is relative to the element box, so
  // once it finishes it stays fully open through any resize - the line always
  // reaches both edges - and the stroke keeps its even, non-scaling thickness.
  return (
    <motion.svg
      className={className}
      viewBox="0 0 1440 120"
      fill="none"
      preserveAspectRatio="none"
      aria-hidden="true"
      initial={{ clipPath: 'inset(0 100% 0 0)' }}
      animate={draw ? { clipPath: 'inset(0 0% 0 0)' } : { clipPath: 'inset(0 100% 0 0)' }}
      transition={{ duration: drawDuration, ease: 'easeInOut', delay: drawDelay }}
    >
      {path}
    </motion.svg>
  );
}
