import {
  useRef,
  useState,
  type CSSProperties,
  type KeyboardEvent,
  type ReactElement,
} from "react";
import {
  criteria,
  findings,
  nextSteps,
  prototype,
  sections,
  sources,
  successPoints,
  type CaseStudySectionId,
} from "./caseStudyData";
import "./CaseStudy.css";

const wrapIndex = (index: number, total: number) => ((index % total) + total) % total;

function ArrowIcon({ direction = "right" }: { direction?: "left" | "right" }) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d={direction === "right" ? "M3 8h10M9 4l4 4-4 4" : "M13 8H3M7 4L3 8l4 4"} />
    </svg>
  );
}

function ArrowUpRightIcon() {
  return (
    <svg
      width="16"
      height="16"
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
  );
}

function CheckIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M3.5 8.5l3 3 6-7" />
    </svg>
  );
}

function ProblemVisual() {
  const [isCentral, setIsCentral] = useState(false);

  return (
    <div className="cs-visual">
      <div className="cs-toggle" role="group" aria-label="Event discovery view">
        <button
          type="button"
          className={`cs-toggle-btn${!isCentral ? " is-on" : ""}`}
          aria-pressed={!isCentral}
          onClick={() => setIsCentral(false)}
        >
          Scattered
        </button>
        <button
          type="button"
          className={`cs-toggle-btn${isCentral ? " is-on" : ""}`}
          aria-pressed={isCentral}
          onClick={() => setIsCentral(true)}
        >
          With What's On
        </button>
      </div>

      <div className={`cs-stage${isCentral ? " is-central" : ""}`}>
        <div className="cs-hub" aria-hidden="true">
          <span className="cs-hub-label">What's On</span>
          <span className="cs-hub-sub">One place to find events</span>
        </div>

        <ul className="cs-chips">
          {sources.map((source, index) => (
            <li key={source.id} className={`cs-chip cs-chip--${index + 1}`}>
              <span className="cs-chip-dot" aria-hidden="true" />
              {source.label}
            </li>
          ))}
        </ul>
      </div>

      <p className="cs-caption" aria-live="polite">
        {isCentral
          ? "Centralized: one place to find, filter and follow events."
          : "Scattered: events live across four different places."}
      </p>

      <div className="cs-findings">
        <span className="cs-label">Research confirmed</span>
        <ul>
          {findings.map((finding) => (
            <li key={finding}>{finding}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function PriorityVisual() {
  const [activeId, setActiveId] = useState(criteria[0].id);
  const active = criteria.find((item) => item.id === activeId) ?? criteria[0];

  return (
    <div className="cs-visual">
      <span className="cs-label">Prioritized on</span>

      <div className="cs-criteria" role="group" aria-label="Prioritization criteria">
        {criteria.map((item, index) => (
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

      <div className="cs-compare">
        <span className="cs-label">Weighed against</span>
        <ul>
          <li>Other concepts I explored</li>
          <li>Competition in the market</li>
        </ul>
      </div>
    </div>
  );
}

function SuccessVisual() {
  return (
    <div className="cs-visual">
      <p className="cs-status">
        <span className="cs-status-dot" aria-hidden="true" />
        Prototype stage
      </p>

      <ul className="cs-checks">
        {successPoints.map((point, index) => (
          <li key={point} style={{ "--i": index } as CSSProperties}>
            <span className="cs-check" aria-hidden="true">
              <CheckIcon />
            </span>
            {point}
          </li>
        ))}
      </ul>

      <p className="cs-note">
        <span className="cs-label">Not measured</span>
        Live-user growth
      </p>
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

const VISUALS: Record<CaseStudySectionId, () => ReactElement> = {
  problem: ProblemVisual,
  prioritization: PriorityVisual,
  success: SuccessVisual,
  next: NextVisual,
};

function PrototypeDemo({ url }: { url: string }) {
  return (
    <aside className="cs-demo" aria-label={prototype.title}>
      <p className="cs-demo-eyebrow">
        <span className="cs-status-dot" aria-hidden="true" />
        {prototype.eyebrow}
      </p>
      <h3 className="cs-demo-title">{prototype.title}</h3>
      <p className="cs-demo-text">{prototype.description}</p>
      <a className="cs-demo-btn" href={url} target="_blank" rel="noopener noreferrer">
        <span>
          {prototype.cta}
          <span className="cs-demo-extra">{prototype.ctaExtra}</span>
        </span>
        <ArrowUpRightIcon />
      </a>
    </aside>
  );
}

export default function CaseStudy({
  prototypeUrl = "/WhatsOn_Prototype.html",
}: {
  prototypeUrl?: string;
}) {
  const [activeIndex, setActiveIndex] = useState(0);
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
    <section className="cs" aria-labelledby="cs-heading">
      <div className="cs-inner">
        <header className="cs-header">
          <h2 className="cs-heading" id="cs-heading">
            How What's On came together.
          </h2>
          <p className="cs-intro">From the problem to the next iteration, in four steps.</p>
        </header>

        <div className="cs-layout">
          <div className="cs-side">
            <div
              className="cs-tabs"
              role="tablist"
              aria-label="What's On case study"
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
                  id={`cs-tab-${section.id}`}
                  className={`cs-tab${index === activeIndex ? " is-active" : ""}${
                    index < activeIndex ? " is-done" : ""
                  }`}
                  aria-selected={index === activeIndex}
                  aria-controls="cs-panel"
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

            <PrototypeDemo url={prototypeUrl} />
          </div>

          <div
            className="cs-panel"
            id="cs-panel"
            role="tabpanel"
            aria-labelledby={`cs-tab-${active.id}`}
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

              <Visual />
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
  );
}
