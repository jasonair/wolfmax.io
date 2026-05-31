'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

interface SquiggleProps {
  className?: string;
  strokeWidth?: number;
  /** Draw the line on left→right when it first scrolls into view. Omit for a
   *  plain static squiggle. */
  draw?: boolean;
  drawDuration?: number;
}

/**
 * Tight, regular sine "squiggle" - the same wave used on the product-UI
 * snapshot timeline. Distinct from the big organic hero `Wave`.
 * Colour is inherited via `currentColor` (e.g. add `text-blue`).
 */
export function Squiggle({ className = "", strokeWidth = 3, draw, drawDuration = 1.6 }: SquiggleProps) {
  // Explicit IntersectionObserver via the ref-based hook rather than the
  // declarative `whileInView` prop: on a nested motion.svg the prop's observer
  // could fail to attach/fire (notably across Fast Refresh), leaving the line
  // stuck hidden. The hook ties the observer to the ref + an effect, so it
  // re-runs reliably and the `animate` value below switches deterministically.
  //
  // The ref lives on the UNCLIPPED wrapper div, never on the clipped svg:
  // IntersectionObserver factors in `clip-path`, so observing the svg (which
  // starts `inset(0 100% 0 0)`, i.e. clipped to zero area) reports ratio 0
  // forever - inView never flips, the wipe never runs. Observing the wrapper
  // breaks that deadlock.
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });

  const d =
    "M0 20 Q60 4 120 20 T240 20 T360 20 T480 20 T600 20 T720 20 T840 20 T960 20 T1080 20 T1200 20";

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

  if (draw === undefined) {
    return (
      <svg className={className} viewBox="0 0 1200 40" fill="none" preserveAspectRatio="none" aria-hidden="true">
        {path}
      </svg>
    );
  }

  // Left→right clip-path wipe on scroll-into-view. Using a clip (rather than a
  // stroke-dash draw) keeps the `non-scaling-stroke` even and stays edge-to-edge
  // through any window resize - see the note in Wave.tsx. The shown keyframe is
  // `0%` (not bare `0`) so the right inset interpolates 100%→0% in matching
  // units - a unitless `0` makes framer-motion skip the tween (see Wave.tsx).
  return (
    <div ref={ref} className={className}>
      <motion.svg
        className="block h-full w-full"
        viewBox="0 0 1200 40"
        fill="none"
        preserveAspectRatio="none"
        aria-hidden="true"
        initial={{ clipPath: 'inset(0 100% 0 0)' }}
        animate={inView ? { clipPath: 'inset(0 0% 0 0)' } : { clipPath: 'inset(0 100% 0 0)' }}
        transition={{ duration: drawDuration, ease: 'easeInOut' }}
      >
        {path}
      </motion.svg>
    </div>
  );
}
