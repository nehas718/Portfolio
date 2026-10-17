import "./PrototypeCta.css";

type PrototypeCtaProps = {
  href: string;
  title?: string;
  description?: string;
  buttonLabel?: string;
};

export default function PrototypeCta({
  href,
  title = "Interactive Prototype Demo",
  description = "Experience the full What's On mobile MVP directly in your browser.",
  buttonLabel = "Launch Live Prototype ↗",
}: PrototypeCtaProps) {
  return (
    <aside className="proto-cta" aria-label="Live prototype">
      <div className="proto-cta-glow" aria-hidden="true" />
      <div className="proto-cta-inner">
        <p className="proto-cta-eyebrow">Project preview</p>
        <h2 className="proto-cta-title">{title}</h2>
        <p className="proto-cta-copy">{description}</p>
        <a
          className="proto-cta-btn"
          href={href}
          target="_blank"
          rel="noopener noreferrer"
        >
          <span>{buttonLabel}</span>
          <svg
            viewBox="0 0 16 16"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M4 12L12 4M5.5 4H12v6.5" />
          </svg>
        </a>
      </div>
    </aside>
  );
}
