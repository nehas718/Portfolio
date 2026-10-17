import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { SKIP_HASH_KEY } from "../lib/scroll";
import Hero from "../sections/Hero";
import About from "../sections/About";
import FeaturedProjects from "../sections/FeaturedProjects";
import Skills from "../sections/Skills";
import Contact from "../sections/Contact";

export default function Home() {
  const location = useLocation();

  useEffect(() => {
    document.title = "Neha Shababudeen — Product & Technology";
  }, []);

  useEffect(() => {
    // Hard load / refresh: stay at the top (App already cleared any hash)
    if (sessionStorage.getItem(SKIP_HASH_KEY)) {
      sessionStorage.removeItem(SKIP_HASH_KEY);
      window.scrollTo(0, 0);
      return;
    }

    // In-app navigation (e.g. back from a case study with /#work)
    const id = location.hash.replace("#", "");
    if (id) {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
      return;
    }

    window.scrollTo(0, 0);
  }, [location.hash, location.key]);

  return (
    <main>
      <Hero />
      <About />
      <FeaturedProjects />
      <Skills />
      <Contact />
    </main>
  );
}
