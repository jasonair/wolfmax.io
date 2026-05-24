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
          and the line bleeds off-screen rather than showing a tip. It enters
          low on the left, rolls through two crests, then climbs and exits the
          top-RIGHT corner: at the right edge (x=1200) the line is still inside
          the band (y≈18), so it spans the full width before bleeding off.
          `non-scaling-stroke` keeps the line an even thickness despite the
          non-uniform (preserveAspectRatio="none") stretch. */}
      <path
        d="M-100 95 C60 95 140 28 300 28 C352 28 378 90 430 90 C546 90 604 40 720 40 C776 40 804 86 860 86 C1030 86 1160 26 1360 -36"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        vectorEffect="non-scaling-stroke"
        fill="none"
      />
    </svg>
  );
}
