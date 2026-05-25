interface WaveProps {
  className?: string;
  strokeWidth?: number;
}

/**
 * The Workings hand-drawn wave / squiggle — the brand's "journey" motif.
 * Colour is inherited via `currentColor` (e.g. add `text-blue`).
 */
export function Wave({ className = "", strokeWidth = 8 }: WaveProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 1200 120"
      fill="none"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      {/* Organic rolling wave that starts at x=-100 and ends at x=1360 —
          past both edges of the 0–1200 viewBox — so the end-caps are clipped
          and the line bleeds off-screen rather than showing a tip. Crests
          (y≈28/34) and troughs (y≈92/88) are spaced on an even ~480-wide
          wavelength so no bump is pinched, and each segment's control points
          sit at its midpoint with horizontal tangents — giving cosine-shaped,
          kink-free curves like the bottom-of-page Squiggle, with a touch of
          height variation to keep the hand-drawn feel. It enters low on the
          left, rolls through two crests, then climbs and exits the top-RIGHT
          corner. `non-scaling-stroke` keeps the line an even thickness despite
          the non-uniform (preserveAspectRatio="none") stretch. */}
      <path
        d="M-100 96 C50 96 50 28 200 28 C320 28 320 92 440 92 C560 92 560 34 680 34 C800 34 800 88 920 88 C1090 88 1280 4 1360 -32"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        vectorEffect="non-scaling-stroke"
        fill="none"
      />
    </svg>
  );
}
