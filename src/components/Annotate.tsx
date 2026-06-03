'use client';

import { useRef } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';

type Variant = 'circle' | 'underline' | 'underline-double' | 'strike';

interface AnnotateProps {
  children: React.ReactNode;
  /** Which pen mark to scribble. Default `underline`. */
  variant?: Variant;
  /** Pen colour. Inherits the brand blue by default to match Wave/Squiggle. */
  color?: string;
  /** Seconds to wait after the word scrolls in before the pen starts. */
  delay?: number;
  /** Override the trace duration (defaults are tuned per variant). */
  duration?: number;
  /** Stroke weight in viewBox units (~px before stretch). */
  strokeWidth?: number;
  /** Nudge the whole mark down by this many `em` - handy for descender-less
   *  words, where an under-mark otherwise reads as sitting too high. */
  nudge?: number;
  className?: string;
}

/**
 * Per-variant geometry. Each path is authored to look hand-drawn, not
 * geometric: strokes wobble, over- and under-shoot their ends, and the
 * circle deliberately fails to close - its tail crosses back over the
 * start, the tell-tale of a word ringed by hand with a real pen.
 *
 * `style` is a FOUR-SIDED `inset` (all of top/right/bottom/left) so the svg
 * box stretches to the word on both axes; the line is then placed purely by
 * its Y within the viewBox and `preserveAspectRatio="none"` drapes it across
 * any word width. Insets are in `em` so they track the responsive headline:
 * the circle breathes around the word, and the under-marks carry a negative
 * BOTTOM inset to drop the line just past the baseline (the display line box
 * is tight, so there's little room beneath the baseline without it).
 */
const MARKS: Record<
  Variant,
  {
    viewBox: string;
    d: string | string[];
    style: React.CSSProperties;
    duration: number;
  }
> = {
  // A loose ellipse drawn anticlockwise from the lower-right. The final
  // curve loops back inside and past the entry point so the two ends cross -
  // a closed geometric ellipse reads as a logo; this reads as a scribble.
  circle: {
    viewBox: '0 0 240 104',
    d:
      'M212 30 C198 14 132 6 80 12 C30 18 8 42 12 64 ' +
      'C16 88 86 98 142 96 C204 94 236 74 230 46 ' +
      'C226 26 196 16 150 16 C120 16 96 22 78 30',
    style: { inset: '-0.16em -0.4em' },
    duration: 0.8,
  },
  // One relaxed stroke riding low under the word - up to the right, a dip,
  // overshooting both ends. Never a ruler-straight line. Sits near the foot
  // of the line box (high Y in the viewBox) so it reads as an underline.
  underline: {
    viewBox: '0 0 220 52',
    d: 'M6 46 C46 40 92 50 138 43 C170 39 196 45 214 41',
    style: { inset: '0 -0.16em -0.66em' },
    duration: 0.5,
  },
  // Two passes of the stroke, the second lower and shorter, as if gone back
  // over it for emphasis.
  'underline-double': {
    viewBox: '0 0 220 56',
    d: [
      'M6 45 C46 39 92 49 138 42 C170 38 196 44 214 40',
      'M11 54 C49 49 95 56 138 52 C166 48 190 53 205 50',
    ],
    style: { inset: '0 -0.16em -0.76em' },
    duration: 0.62,
  },
  // A struck-through emphasis line, faintly waved, riding the word's middle.
  strike: {
    viewBox: '0 0 220 36',
    d: 'M6 19 C56 15 100 23 150 17 C176 13 198 20 214 16',
    style: { inset: '0 -0.12em' },
    duration: 0.5,
  },
};

/**
 * Scribbles a hand-drawn pen mark (circle / underline / strike) around a
 * keyword, tracing it on with the pen's own motion the moment the word
 * scrolls into view. Extends the site's drawn-line motif (Wave, Squiggle):
 * one blue pen, used sparingly on the words that carry the message.
 *
 * The trace is a `stroke-dashoffset` sweep normalised by `pathLength={1}`,
 * so it stays a clean 100%→0% reveal at any rendered width - no dependence
 * on screen-pixel dash maths (cf. the resize note in Wave.tsx, which is why
 * the full-bleed lines there wipe instead). Honours reduced-motion by
 * showing the finished mark with no draw.
 */
export function Annotate({
  children,
  variant = 'underline',
  color = 'var(--w-blue)',
  delay = 0.35,
  duration,
  strokeWidth = 3,
  nudge = 0,
  className = '',
}: AnnotateProps) {
  // Observe the unclipped wrapper, never the svg: stroke-dashoffset leaves the
  // svg's box intact (unlike the clip-path lines), but keeping the ref on the
  // wrapper matches the Squiggle pattern and stays robust across Fast Refresh.
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const reduce = useReducedMotion();

  const mark = MARKS[variant];
  const strokes = Array.isArray(mark.d) ? mark.d : [mark.d];
  const dur = duration ?? mark.duration;

  return (
    <span ref={ref} className={`relative inline-block ${className}`}>
      <span className="relative z-10">{children}</span>
      <svg
        className="pointer-events-none absolute z-0 overflow-visible"
        style={nudge ? { ...mark.style, transform: `translateY(${nudge}em)` } : mark.style}
        viewBox={mark.viewBox}
        fill="none"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        {strokes.map((d, i) => (
          <motion.path
            key={i}
            d={d}
            pathLength={1}
            stroke={color}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ strokeDashoffset: 1.05 }}
            animate={{ strokeDashoffset: reduce || inView ? 0 : 1.05 }}
            // Reduced motion snaps straight to the finished mark (no trace);
            // otherwise the pen traces it on, second strokes trailing the first.
            transition={
              reduce
                ? { duration: 0 }
                : {
                    delay: delay + i * (dur * 0.55),
                    duration: dur,
                    ease: [0.32, 0.12, 0.2, 1],
                  }
            }
            // Gap (1.1) is a touch longer than the dash (1 = full path) and the
            // hidden offset (1.05) parks the whole path INSIDE that gap, so at
            // rest the round end-caps sit in empty space - no stray dots before
            // the line draws. At offset 0 the dash covers the path completely.
            style={{ strokeDasharray: '1 1.1' }}
          />
        ))}
      </svg>
    </span>
  );
}
