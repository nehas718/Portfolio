import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { projects, type ProjectSection } from "../data/projects";
import ProjectArt from "../components/ProjectArt";
import CaseStudy from "../components/CaseStudy/CaseStudy";
import AuxiliumCaseStudy from "../components/AuxiliumCaseStudy/AuxiliumCaseStudy";
import BatterlyCaseStudy from "../components/BatterlyCaseStudy/BatterlyCaseStudy";

export default function ProjectDetail() {
  const { id } = useParams<{ id: string }>();
  const project = projects.find((item) => item.id === id);
  const currentIndex = projects.findIndex((item) => item.id === id);
  const nextProject = projects[(currentIndex + 1) % projects.length];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  useEffect(() => {
    if (project) document.title = `${project.title} — Neha Shababudeen`;
    else document.title = "Project not found — Neha Shababudeen";
  }, [project]);

  if (!project) {
    return (
      <article className="project">
        <div className="wrap">
          <Link className="back" to="/#work">
            <span aria-hidden="true">←</span> All projects
          </Link>
          <h1>Project not found</h1>
        </div>
      </article>
    );
  }

  return (
    <article
      className={`project${
        project.id === "whatson" || project.id === "auxilium" || project.id === "batterly"
          ? " project--case"
          : ""
      }`}
    >
      <div className="wrap">
        <Link className="back" to="/#work">
          <span aria-hidden="true">←</span> All projects
        </Link>
        <p className="p-cat">{project.cat}</p>
        <h1>{project.title}</h1>
        <p className="p-sum">{project.sum}</p>
        <dl className="p-meta">
          {project.meta.map(([label, value]) => (
            <div key={label}>
              <dt>{label}</dt>
              <dd>{value}</dd>
            </div>
          ))}
        </dl>

        {project.id === "whatson" ||
        project.id === "auxilium" ||
        project.id === "batterly" ? null : (
          <div className="frame">
            <span className="tag">Project preview</span>
            <ProjectArt id={project.id} />
          </div>
        )}

        {project.sections.map((section) => (
          <section className="p-sec" key={section.title}>
            <h2>{section.title}</h2>
            <div className="p-body">
              <SectionBody section={section} />
            </div>
          </section>
        ))}
      </div>

      {project.id === "whatson" ? (
        <CaseStudy prototypeUrl={project.prototypeUrl ?? "/WhatsOn_Prototype.html"} />
      ) : null}

      {project.id === "auxilium" ? <AuxiliumCaseStudy /> : null}

      {project.id === "batterly" ? <BatterlyCaseStudy /> : null}

      <div className="next on-band">
        <div className="wrap">
          <div>
            <p>Next project</p>
            <Link className="n-link" to={`/projects/${nextProject.id}`}>
              {nextProject.title} <span aria-hidden="true">→</span>
            </Link>
          </div>
          <div className="actions">
            <Link className="btn" to="/#work">
              All projects
            </Link>
            <Link className="btn light" to="/#contact">
              Get in touch
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}

function SectionBody({ section }: { section: ProjectSection }) {
  if ("chips" in section) {
    return (
      <ul className="chips">
        {section.chips.map((chip) => (
          <li key={chip}>{chip}</li>
        ))}
      </ul>
    );
  }

  if ("layers" in section) {
    return (
      <div className="layers">
        {section.layers.map((layer) => (
          <div key={layer.title}>
            <h3>{layer.title}</h3>
            <p>{layer.body}</p>
          </div>
        ))}
      </div>
    );
  }

  return (
    <>
      {section.paragraphs.map((paragraph) => (
        <p key={paragraph}>{paragraph}</p>
      ))}
      {section.list ? (
        <ul>
          {section.list.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      ) : null}
    </>
  );
}
