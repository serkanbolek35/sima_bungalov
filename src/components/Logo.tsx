export function LogoMark({ className = "h-9 w-9" }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* A-frame roofline */}
      <path
        d="M24 6L42 34H6L24 6Z"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinejoin="round"
      />
      {/* Ridge beam glow line */}
      <path d="M24 6V34" stroke="currentColor" strokeWidth="1.2" strokeOpacity="0.5" />
      {/* Water line — heated pool */}
      <path
        d="M4 39C7 37 10 41 14 39C18 37 20 41 24 39C28 37 30 41 34 39C38 37 41 41 44 39"
        stroke="var(--color-amber-ember, #C9793D)"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function Logo({
  className = "",
  markClassName = "h-8 w-8 text-mist-cream",
  textClassName = "font-display text-lg tracking-wide text-mist-cream",
}: {
  className?: string;
  markClassName?: string;
  textClassName?: string;
}) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <LogoMark className={markClassName} />
      <span className={textClassName}>
        Sima <span className="text-amber-soft">Bungalov</span>
      </span>
    </span>
  );
}
