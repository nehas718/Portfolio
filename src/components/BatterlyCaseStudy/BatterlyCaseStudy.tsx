import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type KeyboardEvent,
  type PointerEvent as ReactPointerEvent,
  type ReactElement,
  type ReactNode,
} from "react";
import {
  approach,
  capabilities,
  cvKey,
  gallery,
  legend,
  nextSteps,
  preview,
  problemViews,
  roleViews,
  sections,
  team,
  type BatterlySectionId,
} from "./batterlyData";
// Shared tab / panel / button styles from the What's On case study.
import "../CaseStudy/CaseStudy.css";
import "./BatterlyCaseStudy.css";

const SWIPE_THRESHOLD = 50;

const wrapIndex = (index: number, total: number) => ((index % total) + total) % total;

function Icon({
  children,
  size = 16,
  strokeWidth = 1.6,
}: {
  children: ReactNode;
  size?: number;
  strokeWidth?: number;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {children}
    </svg>
  );
}

function ArrowIcon({ direction = "right" }: { direction?: "left" | "right" }) {
  return (
    <Icon>
      <path d={direction === "right" ? "M3 8h10M9 4l4 4-4 4" : "M13 8H3M7 4L3 8l4 4"} />
    </Icon>
  );
}

function ArrowUpRightIcon() {
  return (
    <Icon>
      <path d="M4 12L12 4M5.5 4H12v6.5" />
    </Icon>
  );
}

function CloseIcon() {
  return (
    <Icon size={18} strokeWidth={1.8}>
      <path d="M3.5 3.5l9 9M12.5 3.5l-9 9" />
    </Icon>
  );
}

function RoleVisual() {
  const [activeId, setActiveId] = useState<(typeof roleViews)[number]["id"]>(roleViews[0].id);
  const active = roleViews.find((view) => view.id === activeId) ?? roleViews[0];

  return (
    <div className="cs-visual">
      <div className="cs-toggle" role="group" aria-label="Area of work">
        {roleViews.map((view) => (
          <button
            key={view.id}
            type="button"
            className={`cs-toggle-btn${view.id === activeId ? " is-on" : ""}`}
            aria-pressed={view.id === activeId}
            onClick={() => setActiveId(view.id)}
          >
            {view.tab}
          </button>
        ))}
      </div>

      <div
        className={`bt-card${active.id === "hardware" ? " is-alt" : ""}`}
        key={active.id}
        aria-live="polite"
      >
        <p className="bt-card-note">{active.note}</p>
        <h4>{active.title}</h4>
        <ul className="bt-chips">
          {active.chips.map((chip) => (
            <li key={chip}>{chip}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

const TRIANGLE = "200,30 340,218 60,218";
const GAPS = [
  { x: 96, y: 176, width: 52, height: 28 },
  { x: 226, y: 124, width: 40, height: 26 },
];

function FillDiagram() {
  return (
    <svg
      className="bt-fill-svg"
      viewBox="0 0 400 250"
      role="img"
      aria-label="A triangle print with two unfilled gaps and a camera reflection"
    >
      <defs>
        <clipPath id="bt-triangle-clip">
          <polygon points={TRIANGLE} />
        </clipPath>
        <pattern id="bt-stripes" width="10" height="7" patternUnits="userSpaceOnUse">
          <rect className="bt-stripe" width="10" height="3" y="2" />
        </pattern>
        <pattern id="bt-stripes-fill" width="10" height="7" patternUnits="userSpaceOnUse">
          <rect className="bt-stripe-fill" width="10" height="3" y="2" />
        </pattern>
      </defs>

      <polygon className="bt-tri-bg" points={TRIANGLE} />

      <g clipPath="url(#bt-triangle-clip)">
        <rect x="0" y="0" width="400" height="250" fill="url(#bt-stripes)" />
        {GAPS.map((gap) => (
          <rect key={`hole-${gap.x}`} className="bt-hole" rx="4" {...gap} />
        ))}
        {GAPS.map((gap) => (
          <rect
            key={`fill-${gap.x}`}
            className="bt-gap-fill"
            rx="4"
            fill="url(#bt-stripes-fill)"
            {...gap}
          />
        ))}
      </g>

      <polygon className="bt-tri-line" points={TRIANGLE} />

      {GAPS.map((gap) => (
        <rect key={`mark-${gap.x}`} className="bt-gap-mark" rx="4" {...gap} />
      ))}

      <path
        className="bt-route"
        pathLength="1"
        d="M340 62 C 312 96, 272 116, 246 137 S 162 178, 122 190"
      />
      <g className="bt-nozzle">
        <circle cx="340" cy="62" r="9" />
        <circle cx="340" cy="62" r="3.5" />
      </g>

      <g className="bt-reflection" transform="translate(78 78)">
        <circle className="bt-refl-halo" r="16" />
        <circle className="bt-refl-core" r="5" />
        <line className="bt-refl-strike" x1="-13" y1="13" x2="13" y2="-13" />
      </g>
    </svg>
  );
}

function ProblemVisual() {
  const [viewId, setViewId] = useState<(typeof problemViews)[number]["id"]>(problemViews[0].id);
  const active = problemViews.find((view) => view.id === viewId) ?? problemViews[0];

  return (
    <div className="cs-visual">
      <div className="cs-toggle" role="group" aria-label="Print view">
        {problemViews.map((view) => (
          <button
            key={view.id}
            type="button"
            className={`cs-toggle-btn${view.id === viewId ? " is-on" : ""}`}
            aria-pressed={view.id === viewId}
            onClick={() => setViewId(view.id)}
          >
            {view.tab}
          </button>
        ))}
      </div>

      <div className={`bt-fill is-${viewId}`}>
        <FillDiagram />
        <ul className="bt-legend">
          {legend.map((item) => (
            <li key={item.id} className={`bt-legend-${item.id}`}>
              <span className="bt-swatch" aria-hidden="true" />
              {item.label}
            </li>
          ))}
        </ul>
      </div>

      <p className="cs-caption" aria-live="polite">
        {active.caption}
      </p>
    </div>
  );
}

function ApproachVisual() {
  const [activeId, setActiveId] = useState(approach[0].id);
  const active = approach.find((item) => item.id === activeId) ?? approach[0];

  return (
    <div className="cs-visual">
      <span className="cs-label">My focus</span>

      <div className="cs-criteria" role="group" aria-label="Approach">
        {approach.map((item, index) => (
          <button
            key={item.id}
            type="button"
            className={`cs-criterion${item.id === activeId ? " is-on" : ""}`}
            aria-pressed={item.id === activeId}
            onClick={() => setActiveId(item.id)}
          >
            <span className="cs-criterion-n">{String(index + 1).padStart(2, "0")}</span>
            {item.label}
          </button>
        ))}
      </div>

      <p className="cs-detail" key={active.id} aria-live="polite">
        {active.detail}
      </p>

      <div className="bt-group">
        <span className="cs-label">Seen in the CV analysis</span>
        <ul className="bt-key">
          {cvKey.map((item) => (
            <li key={item.id} className={`bt-key-${item.id}`}>
              <span className="bt-swatch" aria-hidden="true" />
              {item.label}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function SuccessVisual({ onOpenImage }: { onOpenImage?: (index: number) => void }) {
  return (
    <div className="cs-visual">
      <ul className="bt-tiles">
        {capabilities.map((item, index) => {
          const isLink = typeof item.imageIndex === "number" && item.imageIndex >= 0;
          const content = (
            <>
              <span className="bt-tile-title">{item.title}</span>
              <span className="bt-tile-detail">{item.detail}</span>
              {isLink ? (
                <span className="bt-tile-cta">
                  View screen
                  <ArrowUpRightIcon />
                </span>
              ) : null}
            </>
          );

          return (
            <li key={item.id} style={{ "--i": index } as CSSProperties}>
              {isLink ? (
                <button
                  type="button"
                  className="bt-tile is-link"
                  onClick={() => onOpenImage?.(item.imageIndex as number)}
                >
                  {content}
                </button>
              ) : (
                <div className="bt-tile">{content}</div>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

function NextVisual() {
  return (
    <div className="cs-visual">
      <ol className="cs-steps">
        {nextSteps.map((step, index) => (
          <li key={step.id} style={{ "--i": index } as CSSProperties}>
            <span className="cs-step-n" aria-hidden="true">
              {index + 1}
            </span>
            <div>
              <h4>{step.title}</h4>
              <p>{step.detail}</p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}

type VisualProps = { onOpenImage?: (index: number) => void };

const VISUALS: Record<BatterlySectionId, (props: VisualProps) => ReactElement> = {
  role: () => <RoleVisual />,
  problem: () => <ProblemVisual />,
  approach: () => <ApproachVisual />,
  success: SuccessVisual,
  next: () => <NextVisual />,
};

function PreviewCard({ onOpen }: { onOpen: () => void }) {
  return (
    <aside className="bt-preview" aria-label="Interface preview">
      <button type="button" className="bt-preview-btn" onClick={onOpen}>
        <img
          className="bt-preview-thumb"
          src={preview.thumb}
          alt={preview.thumbAlt}
          decoding="async"
        />
        <span className="bt-preview-text">
          <span className="bt-preview-eyebrow">{preview.eyebrow}</span>
          <span className="bt-preview-title">{preview.title}</span>
          <span className="bt-preview-sub">{preview.text}</span>
        </span>
        <span className="bt-preview-cta">
          {preview.cta}
          <ArrowUpRightIcon />
        </span>
      </button>
    </aside>
  );
}

function Gallery({ onOpen }: { onOpen: (index: number) => void }) {
  const [active, setActive] = useState(0);
  const swipe = useRef<{ startX: number | null; didSwipe: boolean }>({
    startX: null,
    didSwipe: false,
  });
  const total = gallery.length;
  const current = gallery[active];

  const go = (index: number) => setActive(wrapIndex(index, total));

  const handlePointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    swipe.current = { startX: event.clientX, didSwipe: false };
  };

  const handlePointerUp = (event: ReactPointerEvent<HTMLDivElement>) => {
    const { startX } = swipe.current;
    if (startX === null) return;

    const distance = event.clientX - startX;
    if (Math.abs(distance) > SWIPE_THRESHOLD) {
      swipe.current.didSwipe = true;
      go(active + (distance < 0 ? 1 : -1));
    }
    swipe.current.startX = null;
  };

  const handleOpen = (index: number) => {
    if (swipe.current.didSwipe) {
      swipe.current.didSwipe = false;
      return;
    }
    onOpen(index);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "ArrowRight") {
      event.preventDefault();
      go(active + 1);
    } else if (event.key === "ArrowLeft") {
      event.preventDefault();
      go(active - 1);
    }
  };

  return (
    <section className="cs bt-gallery" aria-labelledby="bt-gallery-heading">
      <div className="cs-inner">
        <header>
          <p className="cs-eyebrow">Gallery</p>
          <h2 className="cs-heading" id="bt-gallery-heading">
            The interface.
          </h2>
          <p className="cs-intro">
            Where the software meets the machine: the shape studio, live movement control, and flow
            insights.
          </p>
        </header>

        <div className="bt-gallery-grid">
          <div className="bt-main">
            <div
              className="bt-stage"
              role="group"
              aria-roledescription="carousel"
              aria-label="Batterly interface gallery"
              tabIndex={0}
              onKeyDown={handleKeyDown}
              onPointerDown={handlePointerDown}
              onPointerUp={handlePointerUp}
            >
              {gallery.map((item, index) => (
                <figure
                  key={item.id}
                  className={`bt-slide${index === active ? " is-active" : ""}`}
                  data-id={item.id}
                  aria-hidden={index !== active}
                >
                  <span
                    className="bt-slide-bg"
                    style={{ backgroundImage: `url(${item.src})` }}
                    aria-hidden="true"
                  />
                  <button
                    type="button"
                    className="bt-slide-btn"
                    tabIndex={index === active ? 0 : -1}
                    aria-label={`Enlarge image: ${item.title}`}
                    onClick={() => handleOpen(index)}
                  >
                    <img src={item.src} alt={item.alt} decoding="async" draggable={false} />
                  </button>
                </figure>
              ))}
            </div>

            <div className="bt-bar-row">
              <div className="bt-caption" aria-live="polite">
                <span className="bt-count">
                  {String(active + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
                </span>
                <h3>{current.title}</h3>
                <p>{current.caption}</p>
              </div>

              <div className="bt-arrows">
                <button
                  type="button"
                  className="bt-arrow"
                  aria-label="Previous image"
                  onClick={() => go(active - 1)}
                >
                  <ArrowIcon direction="left" />
                </button>
                <button
                  type="button"
                  className="bt-arrow"
                  aria-label="Next image"
                  onClick={() => go(active + 1)}
                >
                  <ArrowIcon />
                </button>
              </div>
            </div>
          </div>

          <ul className="bt-thumbs">
            {gallery.map((item, index) => (
              <li key={item.id}>
                <button
                  type="button"
                  className={`bt-thumb${index === active ? " is-active" : ""}`}
                  data-id={item.id}
                  aria-label={`Show image: ${item.title}`}
                  aria-current={index === active ? "true" : undefined}
                  onClick={() => go(index)}
                >
                  <img src={item.src} alt="" decoding="async" />
                  <span className="bt-thumb-text">
                    <strong>{item.title}</strong>
                    <small>{item.caption}</small>
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

function Lightbox({
  index,
  onChange,
  onClose,
}: {
  index: number | null;
  onChange: (index: number) => void;
  onClose: () => void;
}) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const isOpen = index !== null;
  const total = gallery.length;
  const item = gallery[isOpen ? index : 0];

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (isOpen && !dialog.open) dialog.showModal();
    if (!isOpen && dialog.open) dialog.close();
  }, [isOpen]);

  const step = (direction: number) => {
    if (index === null) return;
    onChange(wrapIndex(index + direction, total));
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLDialogElement>) => {
    if (event.key === "ArrowRight") step(1);
    if (event.key === "ArrowLeft") step(-1);
  };

  const handleClick = (event: React.MouseEvent<HTMLDialogElement>) => {
    if (!(event.target as HTMLElement).closest("img, button, figcaption")) onClose();
  };

  return (
    <dialog
      ref={dialogRef}
      className="bt-lightbox"
      aria-label="Image viewer"
      onClose={onClose}
      onKeyDown={handleKeyDown}
      onClick={handleClick}
    >
      {isOpen ? (
        <div className="bt-lb">
          <button
            type="button"
            className="bt-lb-btn bt-lb-close"
            aria-label="Close image viewer"
            onClick={onClose}
          >
            <CloseIcon />
          </button>

          <button
            type="button"
            className="bt-lb-btn bt-lb-prev"
            aria-label="Previous image"
            onClick={() => step(-1)}
          >
            <ArrowIcon direction="left" />
          </button>

          <figure className="bt-lb-figure" key={item.id}>
            <img src={item.src} alt={item.alt} />
            <figcaption>
              <strong>{item.title}</strong>
              <span>{item.caption}</span>
            </figcaption>
          </figure>

          <button
            type="button"
            className="bt-lb-btn bt-lb-next"
            aria-label="Next image"
            onClick={() => step(1)}
          >
            <ArrowIcon />
          </button>
        </div>
      ) : null}
    </dialog>
  );
}

function TeamNote() {
  return (
    <section className="cs bt-team" aria-labelledby="bt-team-heading">
      <div className="cs-inner">
        <div className="bt-team-card">
          <div className="bt-team-copy">
            <p className="cs-eyebrow">{team.eyebrow}</p>
            <h2 className="bt-team-heading" id="bt-team-heading">
              {team.title}
            </h2>
            <p className="bt-team-text">{team.text}</p>
          </div>

          <ul className="bt-team-roles">
            {team.roles.map((role) => (
              <li key={role.id} className={role.isMine ? "is-mine" : undefined}>
                <span>{role.label}</span>
                <small>{role.who}</small>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

export default function BatterlyCaseStudy() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const total = sections.length;
  const active = sections[activeIndex];
  const Visual = VISUALS[active.id];
  const nextSection = sections[wrapIndex(activeIndex + 1, total)];
  const isLast = activeIndex === total - 1;

  const select = (index: number, shouldFocus = false) => {
    const next = wrapIndex(index, total);
    setActiveIndex(next);
    if (shouldFocus) tabRefs.current[next]?.focus();
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const keys: Record<string, number> = {
      ArrowDown: activeIndex + 1,
      ArrowRight: activeIndex + 1,
      ArrowUp: activeIndex - 1,
      ArrowLeft: activeIndex - 1,
      Home: 0,
      End: total - 1,
    };

    if (!(event.key in keys)) return;
    event.preventDefault();
    select(keys[event.key], true);
  };

  return (
    <>
      <section className="cs" aria-labelledby="bt-heading">
        <div className="cs-inner">
          <header className="cs-header">
            <h2 className="cs-heading" id="bt-heading">
              How Batterly came together.
            </h2>
            <p className="cs-intro">From my role to the next iteration, in five steps.</p>
          </header>

          <div className="cs-layout">
            <div className="cs-side">
              <div
                className="cs-tabs"
                role="tablist"
                aria-label="Batterly case study"
                onKeyDown={handleKeyDown}
              >
                {sections.map((section, index) => (
                  <button
                    key={section.id}
                    ref={(node) => {
                      tabRefs.current[index] = node;
                    }}
                    type="button"
                    role="tab"
                    id={`bt-tab-${section.id}`}
                    className={`cs-tab${index === activeIndex ? " is-active" : ""}${
                      index < activeIndex ? " is-done" : ""
                    }`}
                    aria-selected={index === activeIndex}
                    aria-controls="bt-panel"
                    tabIndex={index === activeIndex ? 0 : -1}
                    onClick={() => select(index)}
                  >
                    <span className="cs-tab-n">{section.number}</span>
                    <span className="cs-tab-text">
                      <span className="cs-tab-title">{section.tab}</span>
                      <span className="cs-tab-hint">{section.hint}</span>
                    </span>
                  </button>
                ))}
              </div>

              <PreviewCard onOpen={() => setLightboxIndex(0)} />
            </div>

            <div
              className="cs-panel"
              id="bt-panel"
              role="tabpanel"
              aria-labelledby={`bt-tab-${active.id}`}
              tabIndex={0}
            >
              <div className="cs-panel-body" key={active.id}>
                <div className="cs-progress" aria-hidden="true">
                  <span className="cs-step-count">
                    {active.number} / {String(total).padStart(2, "0")}
                  </span>
                  <span className="cs-bar">
                    <span
                      className="cs-bar-fill"
                      style={{ transform: `scaleX(${(activeIndex + 1) / total})` }}
                    />
                  </span>
                </div>

                <h3 className="cs-title">{active.title}</h3>
                <p className="cs-body">{active.body}</p>

                <Visual onOpenImage={setLightboxIndex} />
              </div>

              <div className="cs-footer">
                <button
                  type="button"
                  className="cs-btn cs-btn--ghost"
                  onClick={() => select(activeIndex - 1)}
                  disabled={activeIndex === 0}
                >
                  <ArrowIcon direction="left" />
                  Back
                </button>

                <button type="button" className="cs-btn" onClick={() => select(activeIndex + 1)}>
                  {isLast ? "Start again" : `Next: ${nextSection.tab}`}
                  <ArrowIcon />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Gallery onOpen={setLightboxIndex} />

      <TeamNote />

      <Lightbox
        index={lightboxIndex}
        onChange={setLightboxIndex}
        onClose={() => setLightboxIndex(null)}
      />
    </>
  );
}
