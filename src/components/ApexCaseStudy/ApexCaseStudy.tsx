import { useRef, useState, type CSSProperties, type KeyboardEvent, type ReactNode } from "react";
import {
  aims,
  aiCapabilities,
  challenges,
  dataPath,
  directionViews,
  downtimeImpacts,
  hero,
  hubNodes,
  mindsets,
  scattered,
  sections,
  tradeoffs,
  type ApexSectionId,
} from "./apexData";
import ApexWalkthrough from "./ApexWalkthrough";
// Shared tab / panel / button styles from the What's On case study.
import "../CaseStudy/CaseStudy.css";
import "./ApexCaseStudy.css";

const wrapIndex = (index: number, total: number) => ((index % total) + total) % total;

const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/* -------------------------------------------------------------------------
   Icons
   ------------------------------------------------------------------------- */

function Icon({ children, size = 16 }: { children: ReactNode; size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
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

function ArrowDownIcon() {
  return (
    <Icon>
      <path d="M8 3v10M4 9l4 4 4-4" />
    </Icon>
  );
}

function CursorIcon() {
  return (
    <Icon size={18}>
      <path d="M3.5 2.5l9 4-3.8 1.5L7 12z" />
    </Icon>
  );
}

/* -------------------------------------------------------------------------
   Hero
   ------------------------------------------------------------------------- */

function Hero() {
  return (
    <section className="cs ap-hero" aria-labelledby="ap-title">
      <div className="cs-inner">
        <p className="ap-status">
          <span className="ap-status-dot" aria-hidden="true" />
          {hero.status}
        </p>
        <h1 className="ap-title" id="ap-title">
          {hero.title}
        </h1>
        <p className="ap-subtitle">{hero.subtitle}</p>

        <ul className="ap-tags">
          {hero.tags.map((tag) => (
            <li key={tag}>{tag}</li>
          ))}
        </ul>

        <p className="ap-note">{hero.note}</p>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------
   01 Overview: a hub of four things Apex connects
   ------------------------------------------------------------------------- */

const HUB_POSITIONS = [
  { x: 18, y: 20 },
  { x: 82, y: 20 },
  { x: 18, y: 80 },
  { x: 82, y: 80 },
];

function OverviewVisual() {
  const [activeId, setActiveId] = useState<(typeof hubNodes)[number]["id"]>(hubNodes[0].id);
  const active = hubNodes.find((node) => node.id === activeId) ?? hubNodes[0];

  return (
    <div className="cs-visual">
      <span className="cs-label">What Apex connects</span>

      <div className="ap-hub">
        <svg
          className="ap-hub-lines"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          {hubNodes.map((node, index) => (
            <line
              key={node.id}
              className={node.id === activeId ? "is-on" : undefined}
              x1="50"
              y1="50"
              x2={HUB_POSITIONS[index].x}
              y2={HUB_POSITIONS[index].y}
              vectorEffect="non-scaling-stroke"
            />
          ))}
        </svg>

        <span className="ap-hub-core" aria-hidden="true">
          Apex
        </span>

        {hubNodes.map((node, index) => (
          <button
            key={node.id}
            type="button"
            className={`ap-node${node.id === activeId ? " is-on" : ""}`}
            style={
              {
                left: `${HUB_POSITIONS[index].x}%`,
                top: `${HUB_POSITIONS[index].y}%`,
              } as CSSProperties
            }
            aria-pressed={node.id === activeId}
            onClick={() => setActiveId(node.id)}
          >
            {node.label}
          </button>
        ))}
      </div>

      <div className="ap-detail" key={active.id} aria-live="polite">
        <p className="ap-lead">{active.lead}</p>
        <ul className="ap-points">
          {active.points.map((point) => (
            <li key={point}>{point}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------
   02 Problem: scattered information, five challenges, five responses
   ------------------------------------------------------------------------- */

function ProblemVisual() {
  const [activeId, setActiveId] = useState<(typeof challenges)[number]["id"]>(challenges[0].id);
  const active = challenges.find((item) => item.id === activeId) ?? challenges[0];

  return (
    <div className="cs-visual">
      <div className="ap-flow">
        <ul className="ap-chips">
          {scattered.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
        <span className="ap-flow-arrow" aria-hidden="true">
          <ArrowIcon />
        </span>
        <span className="ap-flow-apex">One centralized platform</span>
      </div>

      <span className="cs-label ap-gap">Challenges it addresses</span>

      <ul className="ap-challenges">
        {challenges.map((item, index) => (
          <li key={item.id}>
            <button
              type="button"
              className={`ap-challenge${item.id === activeId ? " is-on" : ""}`}
              aria-pressed={item.id === activeId}
              onClick={() => setActiveId(item.id)}
            >
              <span className="ap-challenge-n">{String(index + 1).padStart(2, "0")}</span>
              {item.label}
            </button>
          </li>
        ))}
      </ul>

      <div className="ap-response" key={active.id} aria-live="polite">
        <span className="cs-label">How Apex responds</span>
        <p>{active.response}</p>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------
   03 Why it matters: reactive vs structured
   ------------------------------------------------------------------------- */

function MattersVisual() {
  const [activeId, setActiveId] = useState<(typeof mindsets)[number]["id"]>(mindsets[0].id);
  const active = mindsets.find((item) => item.id === activeId) ?? mindsets[0];

  return (
    <div className="cs-visual">
      <span className="cs-label">Equipment downtime can affect</span>
      <ul className="ap-chips">
        {downtimeImpacts.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>

      <div className="cs-toggle ap-gap" role="group" aria-label="Maintenance approach">
        {mindsets.map((item) => (
          <button
            key={item.id}
            type="button"
            className={`cs-toggle-btn${item.id === activeId ? " is-on" : ""}`}
            aria-pressed={item.id === activeId}
            onClick={() => setActiveId(item.id)}
          >
            {item.tab}
          </button>
        ))}
      </div>

      <div
        className={`ap-card${active.id === "structured" ? " is-alt" : ""}`}
        key={active.id}
        aria-live="polite"
      >
        <h4>{active.title}</h4>
        <ul className="ap-chips">
          {active.chips.map((chip) => (
            <li key={chip}>{chip}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------
   04 AI: four potential capabilities on top of a data foundation
   ------------------------------------------------------------------------- */

function AIVisual() {
  const [activeId, setActiveId] = useState<(typeof aiCapabilities)[number]["id"]>(
    aiCapabilities[0].id,
  );
  const active = aiCapabilities.find((item) => item.id === activeId) ?? aiCapabilities[0];

  return (
    <div className="cs-visual">
      <span className="cs-label">Potential AI capabilities</span>

      <div className="ap-caps" role="group" aria-label="AI capabilities">
        {aiCapabilities.map((item) => (
          <button
            key={item.id}
            type="button"
            className={`ap-cap${item.id === activeId ? " is-on" : ""}`}
            aria-pressed={item.id === activeId}
            onClick={() => setActiveId(item.id)}
          >
            {item.label}
            <small>Potential</small>
          </button>
        ))}
      </div>

      <p className="cs-detail" key={active.id} aria-live="polite">
        {active.detail}
      </p>

      <div className="ap-group">
        <span className="cs-label">As reliable data accumulates</span>
        <ol className="ap-path">
          {dataPath.map((step, index) => (
            <li key={step}>
              <span aria-hidden="true">{index + 1}</span>
              {step}
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------
   05 Trade-offs: pick one, see both sides and where I landed
   ------------------------------------------------------------------------- */

function TradeoffVisual() {
  const [activeId, setActiveId] = useState<(typeof tradeoffs)[number]["id"]>(tradeoffs[0].id);
  const active = tradeoffs.find((item) => item.id === activeId) ?? tradeoffs[0];

  return (
    <div className="cs-visual">
      <span className="cs-label">Choose a trade-off</span>

      <div className="ap-tabs" role="group" aria-label="Trade-offs">
        {tradeoffs.map((item, index) => (
          <button
            key={item.id}
            type="button"
            className={`ap-tab${item.id === activeId ? " is-on" : ""}`}
            aria-pressed={item.id === activeId}
            onClick={() => setActiveId(item.id)}
          >
            <span>{String(index + 1).padStart(2, "0")}</span>
            {item.tab}
          </button>
        ))}
      </div>

      <div className="ap-versus" key={active.id} aria-live="polite">
        {active.options.map((option, index) => (
          <div
            key={option}
            className={`ap-option${index === active.chosen ? " is-chosen" : ""}`}
          >
            {index === active.chosen ? <small>Where I landed</small> : null}
            <strong>{option}</strong>
          </div>
        ))}
      </div>

      <p className="cs-detail" key={`${active.id}-decision`}>
        {active.decision}
      </p>
    </div>
  );
}

/* -------------------------------------------------------------------------
   06 Direction: from tracking to an intelligent platform
   ------------------------------------------------------------------------- */

function OrbDiagram() {
  return (
    <svg className="ap-orbs-svg" viewBox="0 0 400 230" aria-hidden="true">
      <g className="ap-orb ap-orb--people">
        <circle cx="160" cy="100" r="62" />
        <text x="126" y="92">
          People
        </text>
      </g>
      <g className="ap-orb ap-orb--equipment">
        <circle cx="240" cy="100" r="62" />
        <text x="274" y="92">
          Equipment
        </text>
      </g>
      <g className="ap-orb ap-orb--data">
        <circle cx="200" cy="152" r="62" />
        <text x="200" y="196">
          Data
        </text>
      </g>
      <text className="ap-orb-core" x="200" y="116">
        Apex
      </text>
    </svg>
  );
}

function DirectionVisual() {
  const [viewId, setViewId] = useState<(typeof directionViews)[number]["id"]>(
    directionViews[0].id,
  );
  const active = directionViews.find((view) => view.id === viewId) ?? directionViews[0];

  return (
    <div className="cs-visual">
      <div className="cs-toggle" role="group" aria-label="Product direction">
        {directionViews.map((view) => (
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

      <div className={`ap-orbs is-${viewId}`}>
        <OrbDiagram />
      </div>

      <p className="cs-caption" aria-live="polite">
        {active.caption}
      </p>

      <div className="ap-group">
        <span className="cs-label">The platform aims to</span>
        <ul className="ap-chips">
          {aims.map((aim) => (
            <li key={aim}>{aim}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

const VISUALS: Record<ApexSectionId, () => ReactNode> = {
  overview: OverviewVisual,
  problem: ProblemVisual,
  matters: MattersVisual,
  ai: AIVisual,
  decisions: TradeoffVisual,
  direction: DirectionVisual,
};

/* -------------------------------------------------------------------------
   Side card: jumps to the walkthrough
   ------------------------------------------------------------------------- */

function SideCard() {
  const goToWalkthrough = () => {
    document.getElementById("ap-walkthrough")?.scrollIntoView({
      behavior: prefersReducedMotion() ? "auto" : "smooth",
      block: "start",
    });
  };

  return (
    <aside className="ap-side" aria-label="Interactive walkthrough">
      <button type="button" className="ap-side-btn" onClick={goToWalkthrough}>
        <span className="ap-side-icon" aria-hidden="true">
          <CursorIcon />
        </span>
        <span className="ap-side-text">
          <span className="ap-side-eyebrow">Interactive</span>
          <span className="ap-side-title">Product walkthrough</span>
          <span className="ap-side-sub">Try the supervisor and employee views</span>
        </span>
        <span className="ap-side-cta">
          Try it
          <ArrowDownIcon />
        </span>
      </button>
    </aside>
  );
}

/* -------------------------------------------------------------------------
   ApexCaseStudy
   ------------------------------------------------------------------------- */

export default function ApexCaseStudy() {
  const [activeIndex, setActiveIndex] = useState(0);
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);
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
      <Hero />

      <section className="cs ap-study" aria-labelledby="ap-heading">
        <div className="cs-inner">
          <header className="cs-header">
            <p className="cs-eyebrow">Case study</p>
            <h2 className="cs-heading" id="ap-heading">
              Why Apex exists.
            </h2>
            <p className="cs-intro">From the business problem to the direction, in six steps.</p>
          </header>

          <div className="cs-layout">
            <div className="cs-side">
              <div
                className="cs-tabs"
                role="tablist"
                aria-label="Apex by Astra case study"
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
                    id={`ap-tab-${section.id}`}
                    className={`cs-tab${index === activeIndex ? " is-active" : ""}${
                      index < activeIndex ? " is-done" : ""
                    }`}
                    aria-selected={index === activeIndex}
                    aria-controls="ap-panel"
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

              <SideCard />
            </div>

            <div
              className="cs-panel"
              id="ap-panel"
              role="tabpanel"
              aria-labelledby={`ap-tab-${active.id}`}
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
                {active.body.map((paragraph) => (
                  <p className="cs-body" key={paragraph.slice(0, 24)}>
                    {paragraph}
                  </p>
                ))}

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

      <ApexWalkthrough />
    </>
  );
}
