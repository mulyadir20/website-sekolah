type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  tone?: "light" | "dark";
  className?: string;
};

/**
 * Judul section yang konsisten: label kecil, judul besar, deskripsi.
 */
export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
  tone = "light",
  className = "",
}: SectionHeadingProps) {
  const alignment = align === "center" ? "mx-auto text-center" : "text-left";
  const titleTone =
    tone === "dark" ? "text-white" : "text-brand-950";
  const descTone =
    tone === "dark" ? "text-brand-100/80" : "text-brand-800/70";
  const eyebrowTone =
    tone === "dark" ? "text-gold-300" : "text-gold-600";

  return (
    <div className={`${alignment} ${className}`}>
      {eyebrow ? (
        <p
          className={`mb-3 text-xs font-semibold uppercase tracking-[0.18em] ${eyebrowTone}`}
        >
          {eyebrow}
        </p>
      ) : null}

      <h2
        className={`font-display text-3xl font-semibold leading-tight tracking-tight text-balance sm:text-4xl ${titleTone}`}
      >
        {title}
      </h2>

      {description ? (
        <p
          className={`mt-4 max-w-2xl text-base leading-relaxed text-pretty sm:text-lg ${descTone}`}
        >
          {description}
        </p>
      ) : null}
    </div>
  );
}