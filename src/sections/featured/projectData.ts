/**
 * Featured projects shown in the 3D carousel.
 *
 * - `image` : path to a screenshot (e.g. "/images/whatson.png").
 *             Leave as null to show the built-in placeholder artwork.
 * - `glow`  : soft colour that lights the stage while the project is active.
 * - `path`  : where the case study lives once you connect routing.
 */

export interface CarouselProject {
  id: string;
  title: string;
  category: string;
  description: string;
  role: string;
  technologies: string[];
  image: string | null;
  glow: string;
  path: string;
}

const projects: CarouselProject[] = [
  {
    id: "whatson",
    title: "What's On",
    category: "PRODUCT DEVELOPMENT · MANAGEMENT",
    description:
      "A UAE-based event discovery platform exploring how Gen Z discovers, evaluates, and signs up for events.",
    role: "Product / UX / Research",
    technologies: ["React", "Product Research", "UX"],
    image: null,
    glow: "rgba(91, 108, 255, 0.55)",
    path: "/projects/whatson",
  },
  {
    id: "batterly",
    title: "Batterly",
    category: "SOFTWARE DEVELOPMENT",
    description:
      "An AI-integrated 3D pancake printing system connecting a web-based design interface with physical food printing.",
    role: "Frontend / Computer Vision / Product",
    technologies: ["React", "OpenCV", "Raspberry Pi"],
    image: null,
    glow: "rgba(45, 170, 145, 0.5)",
    path: "/projects/batterly",
  },
  {
    id: "auxilium",
    title: "Auxilium",
    category: "AI / PRODUCT DESIGN",
    description:
      "A product concept exploring an intelligent interface for interacting with and monitoring a robotic knee exoskeleton.",
    role: "Web Development / Product",
    technologies: ["Web Development", "Product Design", "AI"],
    image: null,
    glow: "rgba(70, 115, 225, 0.5)",
    path: "/projects/auxilium",
  },
];

export default projects;
