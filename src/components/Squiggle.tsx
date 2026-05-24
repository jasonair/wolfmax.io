interface SquiggleProps {
  className?: string;
  strokeWidth?: number;
}

/**
 * Tight, regular sine "squiggle" — the same wave used on the product-UI
 * snapshot timeline. Distinct from the big organic hero `Wave`.
 * Colour is inherited via `currentColor` (e.g. add `text-blue`).
 */
export function Squiggle({ className = "", strokeWidth = 3 }: SquiggleProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 1200 40"
      fill="none"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <path
        d="M0 20 Q60 4 120 20 T240 20 T360 20 T480 20 T600 20 T720 20 T840 20 T960 20 T1080 20 T1200 20"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        vectorEffect="non-scaling-stroke"
        fill="none"
      />
    </svg>
  );
}
