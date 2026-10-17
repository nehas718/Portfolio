import { useEffect, useState, type MouseEvent } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { EMAIL } from "../data/projects";
import { useTheme } from "../hooks/useTheme";
import { MenuIcon, MoonIcon, SunIcon } from "./Icons";

const links = [
  { label: "Home", href: "#hero" },
  { label: "About", href: "#about" },
  { label: "Work", href: "#work" },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "#contact" },
];

export default function Nav() {
  const { toggle } = useTheme();
  const location = useLocation();
  const navigate = useNavigate();
  const isHome = location.pathname === "/";
  const [menuOpen, setMenuOpen] = useState(false);
  const [current, setCurrent] = useState("hero");

  useEffect(() => {
    setMenuOpen(false);
  }, [location]);

  useEffect(() => {
    if (!isHome || !("IntersectionObserver" in window)) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setCurrent(entry.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );

    links.forEach((link) => {
      const el = document.getElementById(link.href.slice(1));
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [isHome]);

  function handleNavClick(event: MouseEvent<HTMLAnchorElement>, href: string) {
    event.preventDefault();
    const id = href.replace("#", "");
    setMenuOpen(false);

    if (id === "hero") {
      if (isHome) {
        window.scrollTo({ top: 0, behavior: "smooth" });
        setCurrent("hero");
        return;
      }
      navigate("/");
      window.setTimeout(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }, 80);
      return;
    }

    if (isHome) {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
      return;
    }

    navigate(`/#${id}`);
    window.setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    }, 80);
  }

  return (
    <header className="site-header" id="top-bar">
      <nav className="nav" aria-label="Primary">
        <a className="brand" href={`mailto:${EMAIL}`}>
          {EMAIL}
        </a>
        <ul className={`nav-links${menuOpen ? " open" : ""}`} id="navlinks">
          {links.map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                aria-current={isHome && current === link.href.slice(1) ? true : undefined}
                onClick={(event) => handleNavClick(event, link.href)}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
        <button className="icon-btn theme" type="button" aria-label="Switch colour theme" onClick={toggle}>
          <SunIcon />
          <MoonIcon />
        </button>
        <button
          className="icon-btn menu-btn"
          type="button"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          aria-controls="navlinks"
          onClick={() => setMenuOpen((open) => !open)}
        >
          <MenuIcon />
        </button>
      </nav>
    </header>
  );
}
