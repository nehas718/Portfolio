export const EMAIL = "nehashabab@gmail.com";

export type ProjectSection =
  | { title: string; paragraphs: string[]; list?: string[] }
  | { title: string; layers: { title: string; body: string }[] }
  | { title: string; chips: string[] };

export interface Project {
  id: string;
  title: string;
  cat: string;
  featured?: boolean;
  blurb: string;
  sum: string;
  hoverRole: string;
  hoverExtraLabel: string;
  hoverExtra: string;
  meta: [string, string][];
  sections: ProjectSection[];
  /** Optional live prototype URL shown as a CTA instead of artwork */
  prototypeUrl?: string;
}

export const projects: Project[] = [
  {
    id: "whatson",
    title: "What's On",
    cat: "Product development · Management",
    featured: true,
    blurb:
      "A UAE-based event discovery platform exploring how Gen Z discovers, evaluates, and signs up for events.",
    sum: "A UAE-based event discovery platform exploring how Gen Z discovers, evaluates, and signs up for events.",
    hoverRole: "Product / UX / Research",
    hoverExtraLabel: "Reach",
    hoverExtra: "Three emirates",
    meta: [
      ["My role", "Founder and Product Lead"],
      ["Focus", "Product, UX, Research"],
      ["Reach", "Three emirates, UAE"],
    ],
    prototypeUrl: "/WhatsOn_Prototype.html",
    /** Narrative lives in the interactive CaseStudy component */
    sections: [],
  },
  {
    id: "batterly",
    title: "Batterly",
    cat: "Software development",
    blurb:
      "An AI-integrated 3D pancake printing system connecting a web-based design interface with physical food printing.",
    sum: "An AI-integrated 3D pancake printing system connecting a web-based design interface with physical food printing.",
    hoverRole: "Frontend / Computer Vision / Product",
    hoverExtraLabel: "Tech",
    hoverExtra: "React · Computer Vision · OpenCV · Raspberry Pi",
    meta: [
      ["My role", "Frontend, Computer Vision, Product"],
      ["Technologies", "React · Computer Vision · OpenCV · Raspberry Pi"],
      ["Type", "Software and hardware system"],
    ],
    /** Narrative lives in the interactive BatterlyCaseStudy component */
    sections: [],
  },
  {
    id: "auxilium",
    title: "Auxilium",
    cat: "AI / Healthcare Technology",
    blurb:
      "A product concept exploring how an intelligent interface could help users interact with and monitor a robotic knee exoskeleton.",
    sum: "A product concept exploring how an intelligent interface could help users interact with and monitor a robotic knee exoskeleton.",
    hoverRole: "Web Development / Product",
    hoverExtraLabel: "Focus",
    hoverExtra: "Connecting the exoskeleton to software",
    meta: [
      ["My role", "Web development and software connection concept"],
      ["Team", "Multidisciplinary engineering team"],
      ["Context", "Auxilium Robotics, Dubai startup collaboration"],
    ],
    /** Narrative lives in the interactive AuxiliumCaseStudy component */
    sections: [],
  },
];
