/**
 * Batterly: case study content.
 * Edit the copy and image paths here; the component renders whatever is in this file.
 * Images live in public/images and are served from the site root.
 */

const studioImage = "/images/batterly-studio.jpg";
const controlImage = "/images/batterly-control.png";
const pumpImage = "/images/batterly-pump.png";
const uowImage = "/images/batterly-uow.png";
const previewThumb = "/images/batterly-thumb.jpg";

/* -------------------------------------------------------------------------
   Gallery
   ------------------------------------------------------------------------- */

export const gallery = [
  {
    id: "studio",
    title: "Batterly Studio",
    caption:
      "Design shapes, run Smart Print, and monitor batter levels from a single web control interface.",
    alt: "Batterly Studio web interface with a triangle drawn on the canvas, shape tools on the left and printer controls along the top",
    src: studioImage,
  },
  {
    id: "control",
    title: "Live Machine Interface",
    caption:
      "Jog the gantry, calibrate pan limits, and track live step data for precise machine control.",
    alt: "Live Machine Interface showing controller position, directional jog buttons, pan calibration and a gantry traceability table",
    src: controlImage,
  },
  {
    id: "pump",
    title: "Pump Calibration",
    caption:
      "Real-time flow analysis and pump coefficient monitoring. Calibration runs automatically during the first print of each batch.",
    alt: "Pump Calibration panel with a raw camera feed of the printer and a computer vision analysis highlighting the batter in green",
    src: pumpImage,
  },
  {
    id: "uow",
    title: "CV Print Analysis",
    caption:
      "Computer vision tracking batter deposition during a UOW print attempt, with pan, batter, and reflection filters overlaid.",
    alt: "Pump calibration analysis showing batter extruded as UOW on a griddle with cyan pan outlines and green batter detection",
    src: uowImage,
  },
];

const indexOfImage = (id: string) => gallery.findIndex((item) => item.id === id);

/* -------------------------------------------------------------------------
   Side card
   ------------------------------------------------------------------------- */

export const preview = {
  eyebrow: "Interface",
  title: "Batterly Studio",
  text: "Control and flow insights in the browser",
  cta: "View screens",
  thumb: previewThumb,
  thumbAlt: "Triangle drawn on the Batterly Studio canvas",
};

/* -------------------------------------------------------------------------
   01 My Role
   ------------------------------------------------------------------------- */

export const roleViews = [
  {
    id: "software",
    tab: "Software I led",
    note: "Software Lead",
    title: "From the website to the detection logic",
    chips: [
      "Project website",
      "OpenCV shape detection",
      "ML-assisted calibration",
      "LLM integration",
      "Print-consistency logic",
    ],
  },
  {
    id: "hardware",
    tab: "Where it met the hardware",
    note: "Integration",
    title: "Software connected to the physical machine",
    chips: [
      "Camera feed",
      "Batter dispenser",
      "XY gantry movement",
      "Flow-rate insights",
    ],
  },
] as const;

/* -------------------------------------------------------------------------
   02 Problem: the print, before and after gap detection
   ------------------------------------------------------------------------- */

export const problemViews = [
  {
    id: "issue",
    tab: "What went wrong",
    caption:
      "Reflections caused false detections, and uneven batter deposition left parts of the shape unfilled.",
  },
  {
    id: "fix",
    tab: "What the system does",
    caption:
      "It finds the unfilled regions, filters out reflections and guides the dispenser back to the gaps.",
  },
] as const;

export const legend = [
  { id: "batter", label: "Printed batter" },
  { id: "gap", label: "Unfilled gap" },
  { id: "reflection", label: "Camera reflection" },
];

/* -------------------------------------------------------------------------
   03 Approach
   ------------------------------------------------------------------------- */

export const approach = [
  {
    id: "detection",
    label: "Camera-based detection",
    detail:
      "Using OpenCV and image processing to reduce false detections and identify unfilled regions.",
  },
  {
    id: "calibration",
    label: "Calibration at the source",
    detail:
      "Fixing printing inconsistencies where they start, rather than correcting them afterwards.",
  },
  {
    id: "system",
    label: "One coordinated system",
    detail:
      "Working with teammates to connect the software, camera and dispensing hardware.",
  },
];

export const cvKey = [
  { id: "cyan", label: "Cyan: pan" },
  { id: "green", label: "Green: batter" },
  { id: "red", label: "Red: reflections filtered" },
];

/* -------------------------------------------------------------------------
   04 Success: what the prototype can do
   ------------------------------------------------------------------------- */

export const capabilities = [
  {
    id: "interface",
    title: "Web control interface",
    detail: "Draw or drop a shape and print it from the browser.",
    imageIndex: indexOfImage("studio"),
  },
  {
    id: "dispensing",
    title: "Automated batter dispensing",
    detail: "The dispenser fills the shape without manual steering.",
  },
  {
    id: "calibration",
    title: "Smart Flow calibration",
    detail: "Camera-assisted calibration that runs on the first print of each batch.",
  },
  {
    id: "flow",
    title: "Flow-rate insights",
    detail: "Real-time flow analysis and pump coefficient monitoring on the website.",
    imageIndex: indexOfImage("pump"),
  },
  {
    id: "movement",
    title: "Printer movement control",
    detail: "Jog the gantry, set the origin and pan limits from the website.",
    imageIndex: indexOfImage("control"),
  },
  {
    id: "manual",
    title: "Less manual intervention",
    detail: "More consistent prints with fewer manual fixes.",
  },
];

/* -------------------------------------------------------------------------
   05 What I'd do differently
   ------------------------------------------------------------------------- */

export const nextSteps = [
  {
    id: "testing",
    title: "Begin integrated testing earlier",
    detail: "Test the software, camera and hardware together from the start.",
  },
  {
    id: "conditions",
    title: "Test across more lighting and batter conditions",
    detail: "Evaluate shape detection under a wider range of lighting and batter consistencies.",
  },
  {
    id: "metrics",
    title: "Set clear performance metrics",
    detail:
      "Define targets for detection accuracy and print quality, then use the results to guide improvements with the team.",
  },
];

/* -------------------------------------------------------------------------
   Team note
   ------------------------------------------------------------------------- */

export const team = {
  eyebrow: "Team",
  title: "A team effort.",
  text: "Batterly was a collaborative engineering effort. While I led the software development, my teammates' contributions across mechanical design, electrical systems, and hardware integration were essential in turning the initial concept from an idea on paper into a working prototype.",
  roles: [
    { id: "software", label: "Software development", who: "Led by me", isMine: true },
    { id: "mechanical", label: "Mechanical design", who: "Teammates" },
    { id: "electrical", label: "Electrical systems", who: "Teammates" },
    { id: "integration", label: "Hardware integration", who: "Teammates" },
  ],
};

/* -------------------------------------------------------------------------
   Case study tabs
   ------------------------------------------------------------------------- */

export type BatterlySectionId = "role" | "problem" | "approach" | "success" | "next";

export type BatterlySection = {
  id: BatterlySectionId;
  number: string;
  tab: string;
  hint: string;
  title: string;
  body: string;
};

export const sections: BatterlySection[] = [
  {
    id: "role",
    number: "01",
    tab: "My Role",
    hint: "Software Lead",
    title: "My Role",
    body: "As Software Lead, I developed the project website and contributed to integrating the software with the physical hardware. My responsibilities included OpenCV-based shape detection, ML-assisted calibration, LLM integration, and developing software logic to improve printing consistency and identify areas requiring additional batter.",
  },
  {
    id: "problem",
    number: "02",
    tab: "Problem Identification",
    hint: "Reflections and unfilled gaps",
    title: "Problem Identification",
    body: "A key software challenge was ensuring accurate shape detection under normal lighting conditions. Camera reflections sometimes caused false detections, while inconsistencies in batter deposition left parts of the printed shape unfilled. The system needed to identify these gaps and guide the dispenser back to the affected areas.",
  },
  {
    id: "approach",
    number: "03",
    tab: "How I Prioritized the Solution",
    hint: "Fix it at the source",
    title: "How I Prioritized the Solution",
    body: "I focused on improving camera-based detection and calibration to address printing inconsistencies at their source. Using OpenCV and image-processing techniques, I worked on reducing false detections and identifying unfilled regions, while collaborating with my teammates to connect the software, camera, and dispensing hardware into a coordinated system.",
  },
  {
    id: "success",
    number: "04",
    tab: "Success",
    hint: "A working prototype",
    title: "Success",
    body: "The project delivered a functional pancake-printing prototype integrating a web-based control interface, automated batter dispensing, and camera-assisted Smart Flow calibration. Through collaborative development and iterative testing, we demonstrated how software and hardware could work together to improve printing consistency and reduce manual intervention. The website also gives back insights on flow rate, and the printer's movement can be controlled directly from it.",
  },
  {
    id: "next",
    number: "05",
    tab: "What I'd Do Differently",
    hint: "The next iteration",
    title: "What I'd Do Differently",
    body: "I would begin integrated testing earlier and evaluate shape detection under a wider range of lighting conditions and batter consistencies. I would also establish clearer performance metrics for detection accuracy and print quality, using the results to guide further improvements with the team.",
  },
];
