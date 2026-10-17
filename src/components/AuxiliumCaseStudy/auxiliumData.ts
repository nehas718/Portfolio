/**
 * Auxilium: case study content.
 * Edit the copy and image paths here; the component renders whatever is in this file.
 * Images live in public/images and are served from the site root.
 */

const appImage = "/images/auxilium-app.jpg";
const hardwareImage = "/images/auxilium-hardware.jpg";
const fusionImage = "/images/auxilium-fusion.png";
const awardImage = "/images/auxilium-award.jpg";
const awardThumb = "/images/auxilium-award-thumb.jpg";

export const goals = [
  "Support movement",
  "Enhance workplace safety",
  "Improve productivity",
];

export const concepts = [
  {
    id: "initial",
    tab: "Initial concept",
    title: "Steel-based designs",
    note: "Early concepts hit two limits.",
    chips: ["Weight limitations", "Cost limitations"],
  },
  {
    id: "chosen",
    tab: "Chosen direction",
    title: "Lightweight, modular design",
    note: "The direction I helped prioritize.",
    chips: ["Lightweight", "Modular"],
  },
] as const;

export const focusAreas = ["Gait analysis", "Sensor data", "Companion web app"];

export type AuxiliumStat = {
  id: string;
  value: number | string;
  decimals?: number;
  suffix?: string;
  label: string;
};

export const stats: AuxiliumStat[] = [
  { id: "place", value: "1st", label: "Place at the UOWD Innovation Fair 2025" },
  { id: "projects", value: 15, suffix: "+", label: "Projects competed against" },
  { id: "weight", value: 1.5, decimals: 1, suffix: " kg", label: "Prototype weight" },
];

export const delivered = ["Modular joint support", "Intelligent gait analysis"];

export const nextSteps = [
  {
    id: "integrate",
    title: "Start hardware–software integration earlier",
    detail: "Surface compatibility issues sooner and reduce debugging time.",
  },
  {
    id: "research",
    title: "Run more user research with industrial workers",
    detail: "Evaluate the interface's usability, comfort, and functionality.",
  },
  {
    id: "refine",
    title: "Refine the product with the team",
    detail: "Use worker feedback to decide what to improve next.",
  },
];

export const award = {
  eyebrow: "Award",
  title: "1st place",
  text: "UOWD Innovation Fair 2025",
  cta: "View certificate",
  thumb: awardThumb,
  thumbAlt: "Gold medal from the UOWD Innovation Fair 2025",
};

export const gallery = [
  {
    id: "app",
    title: "Companion app",
    caption: "The Auxilium app that pairs with the exoskeleton for real-time monitoring.",
    alt: "Auxilium companion app welcome screen showing the exoskeleton knee brace",
    src: appImage,
  },
  {
    id: "hardware",
    title: "Bench electronics",
    caption:
      "Microcontrollers, motion sensors and an actuator, alongside 3D-printed enclosures.",
    alt: "Breadboard with microcontrollers and motion sensors next to an actuator and black 3D-printed housings",
    src: hardwareImage,
  },
  {
    id: "fusion",
    title: "3D Fusion model",
    caption: "CAD render of the EXO 1 knee brace, designed in Autodesk Fusion.",
    alt: "3D Fusion model of the Auxilium EXO 1 exoskeleton brace shown in profile and three-quarter views",
    src: fusionImage,
  },
  {
    id: "award",
    title: "1st place, Innovation Fair 2025",
    caption: "Certificate of Award and gold medal, School of Engineering Innovation Fair 2025.",
    alt: "University of Wollongong in Dubai Certificate of Award with a gold first place medal",
    src: awardImage,
  },
];

/** Index of the certificate inside `gallery`, used by the award card. */
export const AWARD_INDEX = gallery.findIndex((item) => item.id === "award");

export type AuxiliumSectionId = "problem" | "prioritization" | "success" | "next";

export type AuxiliumSection = {
  id: AuxiliumSectionId;
  number: string;
  tab: string;
  hint: string;
  title: string;
  body: string;
};

export const sections: AuxiliumSection[] = [
  {
    id: "problem",
    number: "01",
    tab: "Problem Identification",
    hint: "Chronic knee strain at work",
    title: "Problem Identification",
    body: "Auxilium addressed the challenge of chronic knee strain among industrial workers, where effective support must balance structural strength with lightweight, comfortable wear. The project focused on developing an intelligent exoskeleton capable of supporting movement while enhancing workplace safety and productivity.",
  },
  {
    id: "prioritization",
    number: "02",
    tab: "How I Prioritized the Solution",
    hint: "Why lightweight and modular",
    title: "How I Prioritized the Solution",
    body: "I contributed to prioritizing a lightweight, modular design after initial steel-based concepts presented weight and cost limitations. My focus was on integrating gait analysis, sensor data, and a companion web application to support real-time monitoring and improve the overall user experience.",
  },
  {
    id: "success",
    number: "03",
    tab: "Success",
    hint: "1st place at the Innovation Fair",
    title: "Success",
    body: "Auxilium secured 1st place at the UOWD Innovation Fair 2025, competing against more than 15 projects. The prototype achieved a weight of 1.5 kg and integrated modular joint support with intelligent gait analysis, demonstrating the potential of combining hardware and software to address industrial safety challenges.",
  },
  {
    id: "next",
    number: "04",
    tab: "What I'd Do Differently",
    hint: "The next iteration",
    title: "What I'd Do Differently",
    body: "I would initiate hardware–software integration earlier to identify compatibility issues and reduce debugging time. I would also conduct more user research with industrial workers to evaluate the interface's usability, comfort, and functionality, then collaborate with the team to refine the product based on their feedback.",
  },
];
