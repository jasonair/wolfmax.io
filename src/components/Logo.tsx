interface LogoProps {
  /** `dark` = navy/blue mark for light backgrounds; `light` = white mark for dark backgrounds */
  variant?: "dark" | "light";
  iconOnly?: boolean;
  className?: string;
}

export function Logo({ variant = "dark", iconOnly = false, className = "" }: LogoProps) {
  const src = iconOnly
    ? variant === "light"
      ? "/brand/workings-icon-white.svg"
      : "/brand/workings-icon.svg"
    : variant === "light"
      ? "/brand/workings-horiz-white.svg"
      : "/brand/workings-horiz.svg";

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt="Workings"
      className={className}
      width={iconOnly ? 803 : 1920}
      height={iconOnly ? 734 : 542}
    />
  );
}
