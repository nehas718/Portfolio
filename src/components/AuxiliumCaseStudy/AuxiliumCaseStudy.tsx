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
  AWARD_INDEX,
  award,
  concepts,
  delivered,
  focusAreas,
  gallery,
  goals,
  nextSteps,
  sections,
  stats,
  type AuxiliumSectionId,
} from "./auxiliumData";
// Shared tab / panel / button styles from the What's On case study.
import "../CaseStudy/CaseStudy.css";
import "./AuxiliumCaseStudy.css";

const SWIPE_THRESHOLD = 50;

const wrapIndex = (index: number, total: number) => ((index % total) + total) % total;

const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

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

function CountUp({
  value,
  decimals = 0,
  suffix = "",
  duration = 1100,
}: {
  value: number;
  decimals?: number;
  suffix?: string;
  duration?: number;
}) {
  const [current, setCurrent] = useState(prefersReducedMotion() ? value : 0);

  useEffect(() => {
    if (prefersReducedMotion()) {
      setCurrent(value);
      return undefined;
    }

    let frame = 0;
    const start = performance.now();

    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - (1 - progress) ** 3;
      setCurrent(value * eased);
      if (progress < 1) frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [value, duration]);

  return (
    <>
      {current.toFixed(decimals)}
      {suffix}
    </>
  );
}

function BalanceVisual() {
  const [balance, setBalance] = useState(50);
  const isBalanced = balance >= 40 && balance <= 60;

  let reading = "Balanced: the target for Auxilium.";
  if (balance < 40) reading = "Leaning toward structural strength.";
  if (balance > 60) reading = "Leaning toward lightweight comfort.";

  return (
    <div className="cs-visual">
      <span className="cs-label">The balance to strike</span>

      <div className="ax-balance">
        <div className="ax-meter">
          <span>Structural strength</span>
          <span className="ax-bar" aria-hidden="true">
            <span
              className="ax-bar-fill"
              style={{ transform: `scaleX(${(100 - balance) / 100})` }}
            />
          </span>
        </div>

        <div className="ax-meter">
          <span>Lightweight, comfortable wear</span>
          <span className="ax-bar" aria-hidden="true">
            <span className="ax-bar-fill" style={{ transform: `scaleX(${balance / 100})` }} />
          </span>
        </div>

        <label className="ax-sr" htmlFor="ax-balance">
          Balance between structural strength and lightweight comfort
        </label>
        <input
          id="ax-balance"
          className="ax-range"
          type="range"
          min="0"
          max="100"
          value={balance}
          aria-valuetext={reading}
          onChange={(event) => setBalance(Number(event.target.value))}
        />

        <p className={`ax-reading${isBalanced ? " is-balanced" : ""}`} aria-live="polite">
          {reading}
          <span className="ax-hint"> Drag to explore the trade-off.</span>
        </p>
      </div>

      <div className="ax-group">
        <span className="cs-label">The exoskeleton needed to</span>
        <ul className="ax-chips">
          {goals.map((goal) => (
            <li key={goal}>{goal}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function DirectionVisual() {
  const [activeId, setActiveId] = useState<(typeof concepts)[number]["id"]>(concepts[0].id);
  const active = concepts.find((concept) => concept.id === activeId) ?? concepts[0];

  return (
    <div className="cs-visual">
      <div className="cs-toggle" role="group" aria-label="Design direction">
        {concepts.map((concept) => (
          <button
            key={concept.id}
            type="button"
            className={`cs-toggle-btn${concept.id === activeId ? " is-on" : ""}`}
            aria-pressed={concept.id === activeId}
            onClick={() => setActiveId(concept.id)}
          >
            {concept.tab}
          </button>
        ))}
      </div>

      <div
        className={`ax-concept${active.id === "chosen" ? " is-chosen" : ""}`}
        key={active.id}
        aria-live="polite"
      >
        <p className="ax-concept-note">{active.note}</p>
        <h4>{active.title}</h4>
        <ul className="ax-chips">
          {active.chips.map((chip) => (
            <li key={chip}>{chip}</li>
          ))}
        </ul>
      </div>

      <div className="ax-group">
        <span className="cs-label">My focus</span>
        <ul className="ax-chips">
          {focusAreas.map((area) => (
            <li key={area}>{area}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function ResultsVisual({ onOpenAward }: { onOpenAward?: () => void }) {
  return (
    <div className="cs-visual">
      <ul className="ax-stats">
        {stats.map((stat, index) => (
          <li key={stat.id} style={{ "--i": index } as CSSProperties}>
            <strong>
              {typeof stat.value === "number" ? (
                <CountUp value={stat.value} decimals={stat.decimals} suffix={stat.suffix} />
              ) : (
                stat.value
              )}
            </strong>
            <span>{stat.label}</span>
          </li>
        ))}
      </ul>

      <div className="ax-group">
        <span className="cs-label">Delivered</span>
        <ul className="ax-chips">
          {delivered.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>

      <button type="button" className="ax-link" onClick={onOpenAward}>
        View the certificate
        <ArrowUpRightIcon />
      </button>
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

type VisualProps = { onOpenAward?: () => void };

const VISUALS: Record<AuxiliumSectionId, (props: VisualProps) => ReactElement> = {
  problem: () => <BalanceVisual />,
  prioritization: () => <DirectionVisual />,
  success: ResultsVisual,
  next: () => <NextVisual />,
};

function AwardCard({ onOpen }: { onOpen: () => void }) {
  return (
    <aside className="ax-award" aria-label="Award">
      <button type="button" className="ax-award-btn" onClick={onOpen}>
        <img
          className="ax-award-thumb"
          src={award.thumb}
          alt={award.thumbAlt}
          loading="lazy"
          decoding="async"
        />
        <span className="ax-award-text">
          <span className="ax-award-eyebrow">{award.eyebrow}</span>
          <span className="ax-award-title">{award.title}</span>
          <span className="ax-award-sub">{award.text}</span>
        </span>
        <span className="ax-award-cta">
          {award.cta}
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
    <section className="cs ax-gallery" aria-labelledby="ax-gallery-heading">
      <div className="cs-inner">
        <header>
          <p className="cs-eyebrow">Gallery</p>
          <h2 className="cs-heading" id="ax-gallery-heading">
            The build.
          </h2>
          <p className="cs-intro">
            The companion app, hardware, 3D Fusion model, and the award the prototype earned.
          </p>
        </header>

        <div className="ax-gallery-grid">
          <div className="ax-main">
            <div
              className="ax-stage"
              role="group"
              aria-roledescription="carousel"
              aria-label="Auxilium build gallery"
              tabIndex={0}
              onKeyDown={handleKeyDown}
              onPointerDown={handlePointerDown}
              onPointerUp={handlePointerUp}
            >
              {gallery.map((item, index) => (
                <figure
                  key={item.id}
                  className={`ax-slide${index === active ? " is-active" : ""}`}
                  data-id={item.id}
                  aria-hidden={index !== active}
                >
                  <span
                    className="ax-slide-bg"
                    style={{ backgroundImage: `url(${item.src})` }}
                    aria-hidden="true"
                  />
                  <button
                    type="button"
                    className="ax-slide-btn"
                    tabIndex={index === active ? 0 : -1}
                    aria-label={`Enlarge image: ${item.title}`}
                    onClick={() => handleOpen(index)}
                  >
                    <img src={item.src} alt={item.alt} decoding="async" draggable={false} />
                  </button>
                </figure>
              ))}
            </div>

            <div className="ax-bar-row">
              <div className="ax-caption" aria-live="polite">
                <span className="ax-count">
                  {String(active + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
                </span>
                <h3>{current.title}</h3>
                <p>{current.caption}</p>
              </div>

              <div className="ax-arrows">
                <button
                  type="button"
                  className="ax-arrow"
                  aria-label="Previous image"
                  onClick={() => go(active - 1)}
                >
                  <ArrowIcon direction="left" />
                </button>
                <button
                  type="button"
                  className="ax-arrow"
                  aria-label="Next image"
                  onClick={() => go(active + 1)}
                >
                  <ArrowIcon />
                </button>
              </div>
            </div>
          </div>

          <ul className="ax-thumbs">
            {gallery.map((item, index) => (
              <li key={item.id}>
                <button
                  type="button"
                  className={`ax-thumb${index === active ? " is-active" : ""}`}
                  data-id={item.id}
                  aria-label={`Show image: ${item.title}`}
                  aria-current={index === active ? "true" : undefined}
                  onClick={() => go(index)}
                >
                  <img src={item.src} alt="" decoding="async" />
                  <span className="ax-thumb-text">
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
      className="ax-lightbox"
      aria-label="Image viewer"
      onClose={onClose}
      onKeyDown={handleKeyDown}
      onClick={handleClick}
    >
      {isOpen ? (
        <div className="ax-lb">
          <button
            type="button"
            className="ax-lb-btn ax-lb-close"
            aria-label="Close image viewer"
            onClick={onClose}
          >
            <CloseIcon />
          </button>

          <button
            type="button"
            className="ax-lb-btn ax-lb-prev"
            aria-label="Previous image"
            onClick={() => step(-1)}
          >
            <ArrowIcon direction="left" />
          </button>

          <figure className="ax-lb-figure" key={item.id}>
            <img src={item.src} alt={item.alt} />
            <figcaption>
              <strong>{item.title}</strong>
              <span>{item.caption}</span>
            </figcaption>
          </figure>

          <button
            type="button"
            className="ax-lb-btn ax-lb-next"
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

export default function AuxiliumCaseStudy() {
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

  const openAward = () => setLightboxIndex(AWARD_INDEX);

  return (
    <>
      <section className="cs" aria-labelledby="ax-heading">
        <div className="cs-inner">
          <header className="cs-header">
            <h2 className="cs-heading" id="ax-heading">
              How Auxilium came together.
            </h2>
            <p className="cs-intro">From the problem to the next iteration, in four steps.</p>
          </header>

          <div className="cs-layout">
            <div className="cs-side">
              <div
                className="cs-tabs"
                role="tablist"
                aria-label="Auxilium case study"
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
                    id={`ax-tab-${section.id}`}
                    className={`cs-tab${index === activeIndex ? " is-active" : ""}${
                      index < activeIndex ? " is-done" : ""
                    }`}
                    aria-selected={index === activeIndex}
                    aria-controls="ax-panel"
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

              <AwardCard onOpen={openAward} />
            </div>

            <div
              className="cs-panel"
              id="ax-panel"
              role="tabpanel"
              aria-labelledby={`ax-tab-${active.id}`}
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

                <Visual onOpenAward={openAward} />
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

      <Lightbox
        index={lightboxIndex}
        onChange={setLightboxIndex}
        onClose={() => setLightboxIndex(null)}
      />
    </>
  );
}
