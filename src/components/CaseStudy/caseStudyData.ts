/**
 * What's On: case study content.
 * Edit the copy here; the component renders whatever is in this file.
 */

export const prototype = {
  eyebrow: "Live prototype",
  title: "Interactive Prototype Demo",
  description:
    "Experience the full What's On mobile MVP directly in your browser.",
  cta: "Launch",
  ctaExtra: " Live Prototype",
};

export const sources = [
  { id: "instagram", label: "Instagram" },
  { id: "tiktok", label: "TikTok" },
  { id: "whatsapp", label: "WhatsApp groups" },
  { id: "platforms", label: "Event platforms" },
];

export const findings = [
  "Users often missed events",
  "Users spent too much time searching",
];

export const criteria = [
  {
    id: "severity",
    label: "Problem severity",
    detail: "A clearer, everyday problem than the other concepts I explored.",
  },
  {
    id: "feasibility",
    label: "Feasibility",
    detail: "A focused digital solution that could be built as a prototype.",
  },
  {
    id: "value",
    label: "Potential user value",
    detail: "Real opportunities for personalization.",
  },
];

export const successPoints = [
  "Validated the problem",
  "Established a clear product direction",
  "Centralized discovery with filtering",
  "Personalized recommendations",
];

export const nextSteps = [
  {
    id: "validate",
    title: "Validate the MVP with real users",
    detail: "Put the prototype in front of people before building further.",
  },
  {
    id: "metrics",
    title: "Define measurable success metrics",
    detail: "Agree on what success looks like before expanding the feature set.",
  },
  {
    id: "core",
    title: "Start with the core experience",
    detail:
      "Finding and filtering relevant events first, then let user behavior and feedback decide which additional features are worth building.",
  },
];

export type CaseStudySectionId = "problem" | "prioritization" | "success" | "next";

export type CaseStudySection = {
  id: CaseStudySectionId;
  number: string;
  tab: string;
  hint: string;
  title: string;
  body: string;
};

export const sections: CaseStudySection[] = [
  {
    id: "problem",
    number: "01",
    tab: "Problem Identification",
    hint: "The gap in event discovery",
    title: "Problem Identification",
    body: "I identified a gap in how young adults discover events in the UAE. Information was scattered across Instagram, TikTok, WhatsApp groups, and event platforms, making it difficult to find relevant events efficiently. Research confirmed that users often missed events or spent too much time searching.",
  },
  {
    id: "prioritization",
    number: "02",
    tab: "How I Prioritized the Solution",
    hint: "Why What's On came first",
    title: "How I Prioritized the Solution",
    body: "I explored multiple ideas before prioritizing What's On based on problem severity, feasibility, and potential user value. Compared with the other concepts and competition in the market, it addressed a clearer everyday problem while offering opportunities for personalization and a focused digital solution.",
  },
  {
    id: "success",
    number: "03",
    tab: "Success",
    hint: "What the prototype proved",
    title: "Success",
    body: "As the project remained at the prototype stage, success was focused on validating the problem and establishing a clear product direction rather than measuring live-user growth. The prototype successfully translated the identified pain points into a centralized discovery experience with filtering and personalized recommendations.",
  },
  {
    id: "next",
    number: "04",
    tab: "What I'd Do Differently",
    hint: "The next iteration",
    title: "What I'd Do Differently",
    body: "I would validate the MVP with real users and define measurable success metrics before expanding the feature set. I would start with the core experience, finding and filtering relevant events, then use user behavior and feedback to determine which additional features were worth building.",
  },
];
