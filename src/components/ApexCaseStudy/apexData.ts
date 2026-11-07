/**
 * Apex by Astra: page content and walkthrough sample data.
 * Edit the copy here; the components render whatever is in this file.
 * Everything in the walkthrough (equipment, people, tasks) is illustrative sample data.
 */

/* -------------------------------------------------------------------------
   Hero
   ------------------------------------------------------------------------- */

export const hero = {
  status: "In progress",
  title: "Apex by Astra",
  subtitle: "AI-Powered Equipment Maintenance & Operations Management Platform",
  tags: ["Enterprise Software", "AI Integration", "Product Development", "UI/UX"],
  note: "Currently in development. This page describes the product's purpose and direction, and the walkthrough below is an illustration of the intended experience, not a live product.",
};

/* -------------------------------------------------------------------------
   01 Overview: what Apex connects
   ------------------------------------------------------------------------- */

export const hubNodes = [
  {
    id: "supervisors",
    label: "Supervisors",
    lead: "Coordinate the work",
    points: [
      "Assign maintenance tasks",
      "Delegate responsibilities",
      "Monitor employee progress",
      "Oversee equipment status",
      "Maintain organized operational records",
    ],
  },
  {
    id: "employees",
    label: "Employees",
    lead: "Get the work done",
    points: [
      "View assigned tasks",
      "Update their progress",
      "Access equipment-related information",
      "Manage daily responsibilities",
    ],
  },
  {
    id: "equipment",
    label: "Equipment",
    lead: "One central overview",
    points: [
      "Centralized overview of company equipment",
      "Maintain equipment records",
      "Monitor equipment status",
      "Stay updated on maintenance requirements",
    ],
  },
  {
    id: "ai",
    label: "AI assistance",
    lead: "Aims to reduce admin",
    points: [
      "Automate repetitive administrative workflows",
      "Improve operational efficiency",
      "Simplify task management",
    ],
  },
] as const;

/* -------------------------------------------------------------------------
   02 Business problem
   ------------------------------------------------------------------------- */

export const scattered = ["Spreadsheets", "Messages", "Manual records"];

export const challenges = [
  {
    id: "visibility",
    label: "Limited visibility into equipment conditions and maintenance history",
    response:
      "A centralized equipment overview, with status and maintenance records in one place.",
  },
  {
    id: "delays",
    label: "Delays in assigning and following up on maintenance tasks",
    response:
      "Supervisors assign tasks in the platform and follow their progress without chasing messages.",
  },
  {
    id: "tracking",
    label: "Difficulty tracking employee responsibilities and task completion",
    response:
      "Employees see what is assigned to them and update progress, so completion is visible.",
  },
  {
    id: "admin",
    label: "Increased administrative workload for supervisors",
    response:
      "AI-powered capabilities aim to automate repetitive administrative workflows.",
  },
  {
    id: "overlooked",
    label: "Greater risk of overlooking maintenance requirements",
    response: "Maintenance requirements are tracked alongside each piece of equipment.",
  },
] as const;

/* -------------------------------------------------------------------------
   03 Why it matters
   ------------------------------------------------------------------------- */

export const downtimeImpacts = [
  "Operational efficiency",
  "Project timelines",
  "Business costs",
];

export const mindsets = [
  {
    id: "reactive",
    tab: "Reactive and manual",
    title: "Relying on reactive maintenance",
    chips: ["Reactive maintenance", "Manual follow-ups"],
  },
  {
    id: "structured",
    tab: "Structured and proactive",
    title: "A foundation for proactive management",
    chips: [
      "Centralized records",
      "Clearer supervisor and employee communication",
      "Better-informed decisions",
    ],
  },
] as const;

/* -------------------------------------------------------------------------
   04 AI
   ------------------------------------------------------------------------- */

export const aiCapabilities = [
  {
    id: "predictive",
    label: "Predictive Maintenance",
    detail:
      "Analyzing historical maintenance records and equipment data to identify patterns that may indicate potential failures.",
  },
  {
    id: "tasks",
    label: "Intelligent Task Management",
    detail:
      "Assisting supervisors with task allocation, prioritization, and maintenance follow-ups.",
  },
  {
    id: "reporting",
    label: "Automated Reporting",
    detail:
      "Generating maintenance summaries, identifying recurring issues, and reducing manual documentation.",
  },
  {
    id: "insights",
    label: "Operational Insights",
    detail:
      "Using accumulated equipment and maintenance data to identify inefficiencies and support better resource planning.",
  },
] as const;

export const dataPath = [
  "Structured records",
  "Reliable operational data",
  "More predictive practices",
];

/* -------------------------------------------------------------------------
   05 Product decisions and trade-offs
   ------------------------------------------------------------------------- */

export const tradeoffs = [
  {
    id: "automation",
    tab: "Automation vs human oversight",
    options: ["Automation", "Human judgment"],
    chosen: 1,
    decision:
      "AI can assist with recommendations, prioritization, and reporting, but maintenance decisions still need human judgment. The platform is designed to support supervisors, not replace their decision-making.",
  },
  {
    id: "scope",
    tab: "Feature scope vs practical usability",
    options: ["Many advanced features", "Core workflows done well"],
    chosen: 1,
    decision:
      "Equipment tracking, task assignment, and maintenance records come first, rather than overwhelming users with functionality.",
  },
  {
    id: "intelligence",
    tab: "Immediate efficiency vs long-term intelligence",
    options: ["Immediate AI features", "A reliable data foundation"],
    chosen: 1,
    decision:
      "Advanced AI depends on consistent, reliable operational data. Establishing a structured information system first creates a stronger foundation for predictive and intelligent features over time.",
  },
  {
    id: "workflows",
    tab: "Centralization vs existing workflows",
    options: ["One new platform", "Simple, familiar everyday tasks"],
    chosen: 1,
    decision:
      "Moving operational information into one platform means teams have to adapt. The priority is making everyday tasks simpler and more accessible, not adding unnecessary complexity.",
  },
] as const;

/* -------------------------------------------------------------------------
   06 Direction
   ------------------------------------------------------------------------- */

export const directionViews = [
  {
    id: "tracking",
    tab: "An equipment tracking system",
    caption: "Where many tools stop: a record of what equipment exists.",
  },
  {
    id: "platform",
    tab: "An intelligent operational platform",
    caption: "The direction: connecting people, equipment, and data.",
  },
] as const;

export const aims = [
  "Improve operational visibility",
  "Reduce administrative effort",
  "Make more informed maintenance decisions",
];

/* -------------------------------------------------------------------------
   Case study tabs
   ------------------------------------------------------------------------- */

export type ApexSectionId =
  | "overview"
  | "problem"
  | "matters"
  | "ai"
  | "decisions"
  | "direction";

export const sections: {
  id: ApexSectionId;
  number: string;
  tab: string;
  hint: string;
  title: string;
  body: string[];
}[] = [
  {
    id: "overview",
    number: "01",
    tab: "Overview",
    hint: "What Apex is",
    title: "Overview",
    body: [
      "Apex by Astra is an equipment maintenance and management platform currently in development, designed to streamline operational workflows for companies managing drilling and industrial equipment.",
      "The platform creates a collaborative workspace connecting supervisors and employees, allowing teams to coordinate maintenance activities, assign tasks, monitor equipment status, and maintain a centralized record of operational activities. The goal is to move away from fragmented, manual processes towards a more connected and intelligent approach to equipment management.",
    ],
  },
  {
    id: "problem",
    number: "02",
    tab: "The Business Problem",
    hint: "Scattered information",
    title: "The Business Problem",
    body: [
      "For companies operating in equipment-intensive industries, keeping track of machinery, maintenance schedules, employee responsibilities, and equipment conditions is essential to maintaining operational continuity.",
      "When this information is spread across spreadsheets, messages, and manual records, several challenges emerge. Apex addresses them by bringing equipment information, maintenance workflows, and team coordination into one centralized platform.",
    ],
  },
  {
    id: "matters",
    number: "03",
    tab: "Why This Matters to the Business",
    hint: "Downtime and decisions",
    title: "Why This Matters to the Business",
    body: [
      "Equipment downtime can directly affect operational efficiency, project timelines, and business costs.",
      "By centralizing maintenance records and improving communication between supervisors and employees, Apex aims to help the company make better-informed operational decisions. Instead of relying entirely on reactive maintenance and manual follow-ups, the platform creates the foundation for more structured, proactive equipment management.",
    ],
  },
  {
    id: "ai",
    number: "04",
    tab: "Where AI Creates Long-Term Value",
    hint: "The longer-term direction",
    title: "Where AI Creates Long-Term Value",
    body: [
      "AI is an important part of the platform's longer-term direction. Beyond automating repetitive administrative work, it creates opportunities to make equipment management increasingly proactive and data-driven.",
      "Over time, as the platform accumulates reliable operational data, these capabilities could help the company move towards more predictive maintenance practices, reduce avoidable downtime, and improve resource utilization.",
    ],
  },
  {
    id: "decisions",
    number: "05",
    tab: "Product Decisions & Trade-offs",
    hint: "Four trade-offs",
    title: "Product Decisions & Trade-offs",
    body: [
      "Developing an effective enterprise platform required balancing functionality, usability, and technical feasibility. These are the four trade-offs that shaped the product, and where I landed on each.",
    ],
  },
  {
    id: "direction",
    number: "06",
    tab: "The Direction",
    hint: "Where it is heading",
    title: "The Direction",
    body: [
      "Apex is being developed with a long-term vision of becoming more than an equipment tracking system: an intelligent operational platform that connects people, equipment, and data.",
      "By combining structured workflows with AI-driven capabilities, the platform aims to help the company improve operational visibility, reduce administrative effort, and make more informed maintenance decisions as its operations grow.",
    ],
  },
];

/* -------------------------------------------------------------------------
   Walkthrough: sample data (illustrative only)
   ------------------------------------------------------------------------- */

export const walkthroughIntro = {
  eyebrow: "Walkthrough",
  title: "See how it works.",
  text: "An illustrated walkthrough of the supervisor and employee workspaces, using sample data. Apex is still in development, so this shows the intended experience, not a live product.",
};

export const employees = ["Maria", "Ahmed", "Ravi"];
export const currentEmployee = "Maria";
export const dueOptions = ["Today", "Tomorrow", "This week"];

export type EquipmentStatus = "operational" | "attention" | "scheduled" | "maintenance";
export type TaskStatus = "todo" | "doing" | "done";

export const statusMeta: Record<EquipmentStatus, string> = {
  operational: "Operational",
  attention: "Needs attention",
  scheduled: "Maintenance scheduled",
  maintenance: "In maintenance",
};

export const initialEquipment = [
  {
    id: "mp01",
    name: "Mud Pump",
    code: "MP-01",
    baseStatus: "operational" as EquipmentStatus,
    lastService: "6 days ago",
    requirement: "Lubrication check",
  },
  {
    id: "td02",
    name: "Top Drive",
    code: "TD-02",
    baseStatus: "attention" as EquipmentStatus,
    lastService: "41 days ago",
    requirement: "Hydraulic hose inspection",
  },
  {
    id: "ac03",
    name: "Air Compressor",
    code: "AC-03",
    baseStatus: "attention" as EquipmentStatus,
    lastService: "58 days ago",
    requirement: "Air filter replacement",
  },
  {
    id: "gn04",
    name: "Generator",
    code: "GN-04",
    baseStatus: "attention" as EquipmentStatus,
    lastService: "33 days ago",
    requirement: "Load test",
  },
  {
    id: "dw05",
    name: "Drawworks",
    code: "DW-05",
    baseStatus: "operational" as EquipmentStatus,
    lastService: "12 days ago",
    requirement: "Brake band check",
  },
  {
    id: "rp06",
    name: "Rig Pump",
    code: "RP-06",
    baseStatus: "operational" as EquipmentStatus,
    lastService: "9 days ago",
    requirement: "Seal inspection",
  },
];

export type WalkthroughTask = {
  id: string;
  title: string;
  equipmentId: string;
  assignee: string;
  due: string;
  status: TaskStatus;
  progress: number;
  isNew?: boolean;
};

export const initialTasks: WalkthroughTask[] = [
  {
    id: "t1",
    title: "Inspect hydraulic hoses",
    equipmentId: "td02",
    assignee: "Maria",
    due: "Today",
    status: "doing",
    progress: 40,
  },
  {
    id: "t2",
    title: "Replace air filter",
    equipmentId: "ac03",
    assignee: "Ahmed",
    due: "Tomorrow",
    status: "todo",
    progress: 0,
  },
  {
    id: "t3",
    title: "Lubrication check",
    equipmentId: "mp01",
    assignee: "Ravi",
    due: "Today",
    status: "done",
    progress: 100,
  },
];

export const initialActivity = [
  "Ravi completed: Lubrication check",
  "Task assigned to Ahmed: Replace air filter",
  "Task assigned to Maria: Inspect hydraulic hoses",
];

export type WalkthroughStepId = "assign" | "update" | "monitor" | "summary";
export type WalkthroughRole = "supervisor" | "employee";
export type WalkthroughTab = "overview" | "equipment" | "tasks";

export const steps: {
  id: WalkthroughStepId;
  title: string;
  text: string;
  action: { role: WalkthroughRole; tab: WalkthroughTab };
}[] = [
  {
    id: "assign",
    title: "Assign a task",
    text: "As Supervisor, open Equipment, pick an item and assign a maintenance task.",
    action: { role: "supervisor", tab: "equipment" },
  },
  {
    id: "update",
    title: "Update your progress",
    text: "Switch to Employee and move a task forward.",
    action: { role: "employee", tab: "tasks" },
  },
  {
    id: "monitor",
    title: "Monitor the board",
    text: "Back as Supervisor, check the Tasks board for the update.",
    action: { role: "supervisor", tab: "tasks" },
  },
  {
    id: "summary",
    title: "Preview an AI summary",
    text: "On Overview, generate a concept summary from the sample data.",
    action: { role: "supervisor", tab: "overview" },
  },
];
