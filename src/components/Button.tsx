"use client";

import Link from "next/link";

type Variant = "blue" | "peach" | "ghost-navy" | "ghost-cream";

const variantClass: Record<Variant, string> = {
  blue: "btn-blue",
  peach: "btn-peach",
  "ghost-navy": "btn-ghost-navy",
  "ghost-cream": "btn-ghost-cream",
};

interface ButtonProps {
  variant?: Variant;
  href?: string;
  onClick?: (e: React.MouseEvent<HTMLElement>) => void;
  withArrow?: boolean;
  className?: string;
  target?: string;
  rel?: string;
  type?: "button" | "submit";
  children: React.ReactNode;
}

const Arrow = () => (
  <svg
    className="transition-transform group-hover:translate-x-0.5"
    width="16"
    height="16"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
  </svg>
);

export function Button({
  variant = "blue",
  href,
  onClick,
  withArrow = false,
  className = "",
  target,
  rel,
  type = "button",
  children,
}: ButtonProps) {
  const classes = `group ${variantClass[variant]} ${className}`;
  const inner = (
    <>
      {children}
      {withArrow && <Arrow />}
    </>
  );

  if (href) {
    return (
      <Link href={href} onClick={onClick} className={classes} target={target} rel={rel}>
        {inner}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} className={classes}>
      {inner}
    </button>
  );
}
