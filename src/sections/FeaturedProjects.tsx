import {
  useCallback,
  useRef,
  useState,
  type CSSProperties,
  type KeyboardEvent,
  type PointerEvent,
} from "react";
import { useNavigate } from "react-router-dom";
import projects, { type CarouselProject } from "./featured/projectData";
import ProjectArt from "./featured/ProjectArt";
import "./featured/FeaturedProjects.css";

const SWIPE_THRESHOLD = 50;
const DRAG_START = 6;
const DRAG_RESISTANCE = 0.4;

type CardPosition =
  | "active"
  | "next"
  | "previous"
  | "far-next"
  | "far-previous"
  | "hidden";

const wrapIndex = (index: number, total: number) => ((index % total) + total) % total;

const getOffset = (index: number, activeIndex: number, total: number) => {
  let offset = wrapIndex(index - activeIndex, total);
  if (offset > total / 2) offset -= total;
  return offset;
};

const getPosition = (offset: number, total: number): CardPosition => {
  if (offset === 0) return "active";
  if (offset === 1) return "next";
  if (offset === -1) return "previous";
  if (total >= 5 && offset === 2) return "far-next";
  if (total >= 5 && offset === -2) return "far-previous";
  return "hidden";
};

/* -------------------------------------------------------------------------
   ProjectCard
   ------------------------------------------------------------------------- */

type ProjectCardProps = {
  project: CarouselProject;
  index: number;
  total: number;
  position: CardPosition;
  isActive: boolean;
  onActivate: (index: number) => void;
  onOpen: (project: CarouselProject) => void;
};

function ProjectCard({
  project,
  index,
  total,
  position,
  isActive,
  onActivate,
  onOpen,
}: ProjectCardProps) {
  const label = isActive
    ? `Open case study: ${project.title}`
    : `Show ${project.title}`;

  const handleClick = () => {
    if (isActive) {
      onOpen(project);
    } else {
      onActivate(index);
    }
  };

  return (
    <article
      className={`fp-card is-${position}`}
      role="group"
      aria-roledescription="slide"
      aria-label={`${index + 1} of ${total}: ${project.title}`}
    >
      <div className="fp-media">
        {project.image ? (
          <img
            src={project.image}
            alt={`${project.title} project screenshot`}
            loading="lazy"
            decoding="async"
            draggable={false}
          />
        ) : (
          <ProjectArt id={project.id} />
        )}
      </div>

      <div className="fp-shade" />

      {!project.image && <span className="fp-badge">Project preview</span>}

      <div className="fp-info">
        <p className="fp-category">{project.category}</p>
        <h3 className="fp-title">{project.title}</h3>

        <div className="fp-more">
          <div className="fp-more-inner">
            <p className="fp-description">{project.description}</p>
            <span className="fp-cta">
              View Case Study <span aria-hidden="true">→</span>
            </span>
          </div>
        </div>
      </div>

      <button
        type="button"
        className="fp-hit"
        tabIndex={isActive ? 0 : -1}
        aria-label={label}
        onClick={handleClick}
      />
    </article>
  );
}

/* -------------------------------------------------------------------------
   ProjectNavigation
   ------------------------------------------------------------------------- */

function ChevronIcon({ direction }: { direction: "left" | "right" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d={direction === "left" ? "M15 5l-7 7 7 7" : "M9 5l7 7-7 7"} />
    </svg>
  );
}

function ProjectNavigation({
  onPrevious,
  onNext,
}: {
  onPrevious: () => void;
  onNext: () => void;
}) {
  return (
    <>
      <button
        type="button"
        className="fp-arrow fp-arrow--previous"
        aria-label="Previous project"
        onClick={onPrevious}
      >
        <ChevronIcon direction="left" />
      </button>
      <button
        type="button"
        className="fp-arrow fp-arrow--next"
        aria-label="Next project"
        onClick={onNext}
      >
        <ChevronIcon direction="right" />
      </button>
    </>
  );
}

/* -------------------------------------------------------------------------
   ProjectPagination
   ------------------------------------------------------------------------- */

function ProjectPagination({
  items,
  activeIndex,
  onSelect,
}: {
  items: CarouselProject[];
  activeIndex: number;
  onSelect: (index: number) => void;
}) {
  return (
    <ul className="fp-dots">
      {items.map((project, index) => (
        <li key={project.id}>
          <button
            type="button"
            className={`fp-dot${index === activeIndex ? " is-active" : ""}`}
            aria-label={`Go to ${project.title}`}
            aria-current={index === activeIndex ? "true" : undefined}
            onClick={() => onSelect(index)}
          />
        </li>
      ))}
    </ul>
  );
}

/* -------------------------------------------------------------------------
   ProjectCarousel
   ------------------------------------------------------------------------- */

type ProjectCarouselProps = {
  items: CarouselProject[];
  activeIndex: number;
  onActivate: (index: number) => void;
  onNext: () => void;
  onPrevious: () => void;
  onOpen: (project: CarouselProject) => void;
};

function ProjectCarousel({
  items,
  activeIndex,
  onActivate,
  onNext,
  onPrevious,
  onOpen,
}: ProjectCarouselProps) {
  const stageRef = useRef<HTMLDivElement>(null);
  const drag = useRef({
    pointerId: null as number | null,
    startX: 0,
    dx: 0,
    isDragging: false,
  });
  const lastDragEnd = useRef(0);
  const [isDragging, setIsDragging] = useState(false);
  const total = items.length;

  const setDragOffset = (value: number) => {
    stageRef.current?.style.setProperty("--drag", `${value}px`);
  };

  const handlePointerDown = (event: PointerEvent<HTMLDivElement>) => {
    if (event.pointerType === "mouse" && event.button !== 0) return;

    drag.current = {
      pointerId: event.pointerId,
      startX: event.clientX,
      dx: 0,
      isDragging: false,
    };
  };

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    const state = drag.current;
    if (state.pointerId !== event.pointerId) return;

    state.dx = event.clientX - state.startX;

    if (!state.isDragging && Math.abs(state.dx) > DRAG_START) {
      state.isDragging = true;
      setIsDragging(true);
      stageRef.current?.setPointerCapture(event.pointerId);
    }

    if (state.isDragging) {
      setDragOffset(state.dx * DRAG_RESISTANCE);
    }
  };

  const finishDrag = (event: PointerEvent<HTMLDivElement>) => {
    const state = drag.current;
    if (state.pointerId !== event.pointerId) return;

    if (state.isDragging) {
      lastDragEnd.current = performance.now();

      if (state.dx <= -SWIPE_THRESHOLD) onNext();
      else if (state.dx >= SWIPE_THRESHOLD) onPrevious();
    }

    drag.current = { pointerId: null, startX: 0, dx: 0, isDragging: false };
    setIsDragging(false);
    setDragOffset(0);
  };

  const wasJustDragged = () => performance.now() - lastDragEnd.current < 120;

  const handleActivate = (index: number) => {
    if (!wasJustDragged()) onActivate(index);
  };

  const handleOpen = (project: CarouselProject) => {
    if (!wasJustDragged()) onOpen(project);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "ArrowRight") {
      event.preventDefault();
      onNext();
    } else if (event.key === "ArrowLeft") {
      event.preventDefault();
      onPrevious();
    }
  };

  return (
    <div
      ref={stageRef}
      className={`fp-stage${isDragging ? " is-dragging" : ""}`}
      role="region"
      aria-roledescription="carousel"
      aria-label="Featured projects"
      tabIndex={0}
      onKeyDown={handleKeyDown}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={finishDrag}
      onPointerCancel={finishDrag}
    >
      {items.map((project, index) => {
        const position = getPosition(getOffset(index, activeIndex, total), total);

        return (
          <ProjectCard
            key={project.id}
            project={project}
            index={index}
            total={total}
            position={position}
            isActive={position === "active"}
            onActivate={handleActivate}
            onOpen={handleOpen}
          />
        );
      })}
    </div>
  );
}

/* -------------------------------------------------------------------------
   FeaturedProjects
   ------------------------------------------------------------------------- */

type FeaturedProjectsProps = {
  onProjectOpen?: (project: CarouselProject) => void;
};

export default function FeaturedProjects({ onProjectOpen }: FeaturedProjectsProps) {
  const navigate = useNavigate();
  const [activeIndex, setActiveIndex] = useState(0);
  const total = projects.length;

  const goTo = useCallback(
    (index: number) => setActiveIndex(wrapIndex(index, total)),
    [total],
  );

  const goNext = useCallback(
    () => setActiveIndex((current) => wrapIndex(current + 1, total)),
    [total],
  );

  const goPrevious = useCallback(
    () => setActiveIndex((current) => wrapIndex(current - 1, total)),
    [total],
  );

  const handleProjectClick = useCallback(
    (project: CarouselProject) => {
      if (onProjectOpen) {
        onProjectOpen(project);
        return;
      }
      navigate(project.path);
    },
    [navigate, onProjectOpen],
  );

  const activeProject = projects[activeIndex];

  return (
    <section className="fp" id="work" aria-labelledby="fp-heading">
      <div className="fp-inner">
        <h2 className="fp-heading" id="fp-heading">
          Featured Projects.
        </h2>
        <p className="fp-intro">
          Selected products, systems, and experiments I've worked on.
        </p>
      </div>

      <div className="fp-carousel">
        {projects.map((project, index) => (
          <div
            key={project.id}
            className={`fp-glow${index === activeIndex ? " is-on" : ""}`}
            style={{ "--glow": project.glow } as CSSProperties}
            aria-hidden="true"
          />
        ))}

        <ProjectCarousel
          items={projects}
          activeIndex={activeIndex}
          onActivate={goTo}
          onNext={goNext}
          onPrevious={goPrevious}
          onOpen={handleProjectClick}
        />

        <div className="fp-floor" aria-hidden="true" />
        <ProjectNavigation onPrevious={goPrevious} onNext={goNext} />
      </div>

      <ProjectPagination items={projects} activeIndex={activeIndex} onSelect={goTo} />

      <p className="fp-sr" aria-live="polite">
        {`Showing project ${activeIndex + 1} of ${total}: ${activeProject.title}`}
      </p>
    </section>
  );
}
