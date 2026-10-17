import { ArrowUpRight } from "../components/Icons";

export default function Hero() {
  return (
    <section className="hero" id="hero">
      <div className="wrap">
        <p className="hello fade-in">Engineering · Product Management</p>
        <h1 aria-label="Neha Shababudeen">
          <span className="ln">
            <span>Neha</span>
          </span>
          <span className="ln italic">
            <span>Shababudeen.</span>
          </span>
        </h1>
        <div className="hero-grid fade-in">
          <p className="lede">
            I like turning “what if?” into “let’s build it.” I enjoy taking complex problems,
            understanding what people need, and turning them into thoughtful digital
            experiences; from the first idea and user flow to the final product.
          </p>
          <div className="actions">
            <a
              className="btn solid"
              href="#work"
              onClick={(event) => {
                event.preventDefault();
                document.getElementById("work")?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              View selected work
              <ArrowUpRight />
            </a>
            <a
              className="btn"
              href="#contact"
              onClick={(event) => {
                event.preventDefault();
                document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              Get in touch
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
