type Surface = "cream" | "navy" | "blue";

const introColor: Record<Surface, string> = {
  cream: "text-mute",
  navy: "text-cream/70",
  blue: "text-white/85",
};

interface SectionProps {
  surface?: Surface;
  id?: string;
  eyebrow?: React.ReactNode;
  title?: React.ReactNode;
  intro?: React.ReactNode;
  align?: "center" | "left";
  contained?: boolean;
  className?: string;
  containerClassName?: string;
  children?: React.ReactNode;
}

export function Section({
  surface = "cream",
  id,
  eyebrow,
  title,
  intro,
  align = "center",
  contained = false,
  className = "",
  containerClassName = "",
  children,
}: SectionProps) {
  const hasHeader = eyebrow || title || intro;
  const centered = align === "center";

  const header = hasHeader && (
    <div className={`${centered ? "text-center mx-auto" : ""} max-w-3xl`}>
      {eyebrow && (
        <p className={`eyebrow mb-5 ${surface === "cream" ? "text-mute" : "text-blue"}`}>
          {eyebrow}
        </p>
      )}
      {title && (
        <h2 className="font-display text-[2rem] sm:text-[3rem] leading-[1.08]">
          {title}
        </h2>
      )}
      {intro && (
        <p className={`font-subtitle mt-5 text-[1.02rem] leading-relaxed ${introColor[surface]} ${centered ? "mx-auto" : ""} max-w-[52ch]`}>
          {intro}
        </p>
      )}
    </div>
  );

  if (contained) {
    return (
      <section id={id} className={`surface-cream py-4 sm:py-6 ${className}`}>
        <div className="surface-navy rounded-[5rem] mx-4 sm:mx-6 lg:mx-8 py-24 sm:py-32">
          <div className={`max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 ${containerClassName}`}>
            {header}
            {children}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id={id} className={`surface-${surface} py-24 sm:py-32 ${className}`}>
      <div className={`max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 ${containerClassName}`}>
        {header}
        {children}
      </div>
    </section>
  );
}
