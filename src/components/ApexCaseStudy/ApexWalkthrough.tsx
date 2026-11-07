import {
  useEffect,
  useMemo,
  useReducer,
  useRef,
  useState,
  type FormEvent,
} from "react";
import {
  currentEmployee,
  dueOptions,
  employees,
  initialActivity,
  initialEquipment,
  initialTasks,
  statusMeta,
  steps,
  walkthroughIntro,
  type EquipmentStatus,
  type TaskStatus,
  type WalkthroughTask,
} from "./apexData";
import "./ApexWalkthrough.css";

const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

type Role = "supervisor" | "employee";
type SupervisorTab = "overview" | "equipment" | "tasks";
type EmployeeTab = "tasks" | "equipment";
type TabId = SupervisorTab | EmployeeTab;

const NAV: Record<Role, { id: TabId; label: string }[]> = {
  supervisor: [
    { id: "overview", label: "Overview" },
    { id: "equipment", label: "Equipment" },
    { id: "tasks", label: "Tasks" },
  ],
  employee: [
    { id: "tasks", label: "My tasks" },
    { id: "equipment", label: "Equipment" },
  ],
};

const TASK_COLUMNS: { id: TaskStatus; label: string }[] = [
  { id: "todo", label: "To do" },
  { id: "doing", label: "In progress" },
  { id: "done", label: "Done" },
];

type ActivityEntry = { id: number; text: string };

type DemoFlags = {
  assigned: boolean;
  updated: boolean;
  monitored: boolean;
  summary: boolean;
};

type DemoState = {
  tasks: WalkthroughTask[];
  activity: ActivityEntry[];
  nextId: number;
  flags: DemoFlags;
};

type DemoAction =
  | {
      type: "ASSIGN";
      title: string;
      equipmentId: string;
      assignee: string;
      due: string;
    }
  | { type: "PROGRESS"; taskId: string; progress: number }
  | { type: "FLAG"; flag: keyof DemoFlags }
  | { type: "RESET" };

type EquipmentView = (typeof initialEquipment)[number] & {
  status: EquipmentStatus;
};

/* -------------------------------------------------------------------------
   State: tasks drive equipment status, and both roles read the same data
   ------------------------------------------------------------------------- */

const createState = (): DemoState => ({
  tasks: initialTasks.map((task) => ({ ...task })),
  activity: initialActivity.map((text, index) => ({ id: index, text })),
  nextId: 100,
  flags: { assigned: false, updated: false, monitored: false, summary: false },
});

const addActivity = (state: DemoState, text: string) =>
  [{ id: state.nextId, text }, ...state.activity].slice(0, 5);

const reducer = (state: DemoState, action: DemoAction): DemoState => {
  switch (action.type) {
    case "ASSIGN": {
      const task: WalkthroughTask = {
        id: `t${state.nextId}`,
        title: action.title,
        equipmentId: action.equipmentId,
        assignee: action.assignee,
        due: action.due,
        status: "todo",
        progress: 0,
        isNew: true,
      };

      return {
        ...state,
        tasks: [task, ...state.tasks],
        activity: addActivity(state, `Task assigned to ${action.assignee}: ${action.title}`),
        nextId: state.nextId + 1,
        flags: { ...state.flags, assigned: true },
      };
    }

    case "PROGRESS": {
      const task = state.tasks.find((item) => item.id === action.taskId);

      if (!task || task.progress === action.progress) return state;

      const status: TaskStatus =
        action.progress >= 100 ? "done" : action.progress > 0 ? "doing" : "todo";
      const verb = status === "done" ? "completed" : "updated";
      const detail = status === "done" ? "" : ` (${action.progress}%)`;

      return {
        ...state,
        tasks: state.tasks.map((item) =>
          item.id === action.taskId
            ? { ...item, progress: action.progress, status, isNew: false }
            : item,
        ),
        activity: addActivity(state, `${task.assignee} ${verb}: ${task.title}${detail}`),
        nextId: state.nextId + 1,
        flags: { ...state.flags, updated: true },
      };
    }

    case "FLAG":
      return state.flags[action.flag]
        ? state
        : { ...state, flags: { ...state.flags, [action.flag]: true } };

    case "RESET":
      return createState();

    default:
      return state;
  }
};

const deriveStatus = (
  item: (typeof initialEquipment)[number],
  tasks: WalkthroughTask[],
): EquipmentStatus => {
  const related = tasks.filter((task) => task.equipmentId === item.id);
  const open = related.filter((task) => task.status !== "done");

  if (open.some((task) => task.status === "doing")) return "maintenance";
  if (open.length) return "scheduled";
  if (related.some((task) => task.status === "done")) return "operational";

  return item.baseStatus;
};

const buildSummary = (equipment: EquipmentView[], tasks: WalkthroughTask[]) => {
  const count = (status: TaskStatus) => tasks.filter((task) => task.status === status).length;
  const done = count("done");
  const doing = count("doing");
  const todo = count("todo");
  const attention = equipment.filter((item) => item.status === "attention");
  const lead = tasks.find((task) => task.status === "doing");

  const lines = [
    `This week: ${done} task${done === 1 ? "" : "s"} completed, ${doing} in progress, ${todo} waiting to start.`,
    attention.length
      ? `${attention.map((item) => item.name).join(" and ")} still ${
          attention.length === 1 ? "needs" : "need"
        } attention.`
      : "No equipment is waiting on attention.",
    lead
      ? `Suggested follow-up: check in on "${lead.title}" (${lead.assignee}, ${lead.progress}%).`
      : "Suggested follow-up: review upcoming maintenance requirements.",
  ];

  return lines.join(" ");
};

/* -------------------------------------------------------------------------
   Small pieces
   ------------------------------------------------------------------------- */

function CheckIcon() {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M3.5 8.5l3 3 6-7" />
    </svg>
  );
}

function StatusBadge({ status }: { status: EquipmentStatus }) {
  return <span className={`aw-badge is-${status}`}>{statusMeta[status]}</span>;
}

function Avatar({ name }: { name: string }) {
  return (
    <span className="aw-avatar" aria-hidden="true">
      {name.slice(0, 1)}
    </span>
  );
}

/* -------------------------------------------------------------------------
   Supervisor: overview with activity feed and an AI summary concept
   ------------------------------------------------------------------------- */

function SummaryCard({
  equipment,
  tasks,
  onGenerate,
}: {
  equipment: EquipmentView[];
  tasks: WalkthroughTask[];
  onGenerate: () => void;
}) {
  const [text, setText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(
    () => () => {
      if (timer.current) clearInterval(timer.current);
    },
    [],
  );

  const generate = () => {
    const full = buildSummary(equipment, tasks);

    if (timer.current) clearInterval(timer.current);
    onGenerate();

    if (prefersReducedMotion()) {
      setText(full);
      setIsTyping(false);
      return;
    }

    let index = 0;

    setText("");
    setIsTyping(true);
    timer.current = setInterval(() => {
      index += 3;
      setText(full.slice(0, index));

      if (index >= full.length) {
        if (timer.current) clearInterval(timer.current);
        setIsTyping(false);
      }
    }, 22);
  };

  return (
    <div className="aw-card aw-summary">
      <div className="aw-card-head">
        <h4>AI summary</h4>
        <span className="aw-chip">Concept preview</span>
      </div>

      <p className="aw-summary-text" aria-live="polite">
        {text || "Generate a maintenance summary from the sample data on this screen."}
        {isTyping ? <span className="aw-caret" aria-hidden="true" /> : null}
      </p>

      <button type="button" className="aw-btn" onClick={generate} disabled={isTyping}>
        {text ? "Regenerate summary" : "Generate summary"}
      </button>

      <p className="aw-fine">Scripted from the sample data above, not a live AI model.</p>
    </div>
  );
}

function Overview({
  equipment,
  tasks,
  activity,
  onGenerate,
}: {
  equipment: EquipmentView[];
  tasks: WalkthroughTask[];
  activity: ActivityEntry[];
  onGenerate: () => void;
}) {
  const stats = [
    {
      id: "operational",
      label: "Operational",
      value: equipment.filter((e) => e.status === "operational").length,
    },
    {
      id: "attention",
      label: "Needs attention",
      value: equipment.filter((e) => e.status === "attention").length,
    },
    {
      id: "open",
      label: "Open tasks",
      value: tasks.filter((t) => t.status !== "done").length,
    },
    {
      id: "done",
      label: "Completed",
      value: tasks.filter((t) => t.status === "done").length,
    },
  ];

  return (
    <div className="aw-stack">
      <ul className="aw-stats">
        {stats.map((stat) => (
          <li key={stat.id} className={`is-${stat.id}`}>
            <strong>{stat.value}</strong>
            <span>{stat.label}</span>
          </li>
        ))}
      </ul>

      <div className="aw-two">
        <SummaryCard equipment={equipment} tasks={tasks} onGenerate={onGenerate} />

        <div className="aw-card">
          <div className="aw-card-head">
            <h4>Recent activity</h4>
          </div>
          <ul className="aw-feed">
            {activity.map((entry) => (
              <li key={entry.id}>{entry.text}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------
   Equipment: shared list, supervisors can assign from the detail card
   ------------------------------------------------------------------------- */

function AssignForm({
  item,
  onAssign,
}: {
  item: EquipmentView;
  onAssign: (payload: {
    equipmentId: string;
    assignee: string;
    due: string;
    title: string;
  }) => void;
}) {
  const [assignee, setAssignee] = useState(currentEmployee);
  const [due, setDue] = useState(dueOptions[0]);
  const [title, setTitle] = useState(`${item.requirement}: ${item.name}`);

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!title.trim()) return;
    onAssign({ equipmentId: item.id, assignee, due, title: title.trim() });
  };

  return (
    <form className="aw-form" onSubmit={submit}>
      <label>
        <span>Task</span>
        <input value={title} onChange={(event) => setTitle(event.target.value)} />
      </label>
      <div className="aw-form-row">
        <label>
          <span>Assign to</span>
          <select value={assignee} onChange={(event) => setAssignee(event.target.value)}>
            {employees.map((name) => (
              <option key={name}>{name}</option>
            ))}
          </select>
        </label>
        <label>
          <span>Due</span>
          <select value={due} onChange={(event) => setDue(event.target.value)}>
            {dueOptions.map((option) => (
              <option key={option}>{option}</option>
            ))}
          </select>
        </label>
      </div>
      <button type="submit" className="aw-btn is-primary">
        Assign task
      </button>
    </form>
  );
}

function EquipmentPanel({
  role,
  equipment,
  onAssign,
}: {
  role: Role;
  equipment: EquipmentView[];
  onAssign: (payload: {
    equipmentId: string;
    assignee: string;
    due: string;
    title: string;
  }) => void;
}) {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const selected = equipment.find((item) => item.id === selectedId);

  return (
    <div className="aw-stack">
      <ul className="aw-list">
        {equipment.map((item) => (
          <li key={item.id}>
            <button
              type="button"
              className={`aw-row${item.id === selectedId ? " is-selected" : ""}`}
              aria-pressed={item.id === selectedId}
              onClick={() => setSelectedId(item.id === selectedId ? null : item.id)}
            >
              <span className="aw-row-main">
                <strong>{item.name}</strong>
                <small>{item.code}</small>
              </span>
              <StatusBadge status={item.status} />
            </button>
          </li>
        ))}
      </ul>

      {selected ? (
        <div className="aw-card aw-detail" key={selected.id}>
          <div className="aw-card-head">
            <h4>
              {selected.name} <small>{selected.code}</small>
            </h4>
            <StatusBadge status={selected.status} />
          </div>
          <dl className="aw-facts">
            <div>
              <dt>Last service</dt>
              <dd>{selected.lastService}</dd>
            </div>
            <div>
              <dt>Maintenance requirement</dt>
              <dd>{selected.requirement}</dd>
            </div>
          </dl>

          {role === "supervisor" ? (
            <AssignForm item={selected} onAssign={onAssign} />
          ) : (
            <p className="aw-fine">
              Employees can see equipment information. Supervisors assign the work.
            </p>
          )}
        </div>
      ) : (
        <p className="aw-hint">
          {role === "supervisor"
            ? "Select an item to see its details and assign a maintenance task."
            : "Select an item to see its details."}
        </p>
      )}
    </div>
  );
}

/* -------------------------------------------------------------------------
   Tasks: supervisor board and employee list
   ------------------------------------------------------------------------- */

function ProgressBar({ value }: { value: number }) {
  return (
    <span className="aw-progress" aria-hidden="true">
      <span style={{ transform: `scaleX(${value / 100})` }} />
    </span>
  );
}

function TaskBoard({
  tasks,
  equipment,
}: {
  tasks: WalkthroughTask[];
  equipment: EquipmentView[];
}) {
  return (
    <div className="aw-board">
      {TASK_COLUMNS.map((column) => {
        const items = tasks.filter((task) => task.status === column.id);

        return (
          <section key={column.id} className="aw-column" aria-label={column.label}>
            <h4>
              {column.label} <span>{items.length}</span>
            </h4>
            <ul>
              {items.map((task) => {
                const item = equipment.find((entry) => entry.id === task.equipmentId);

                return (
                  <li key={task.id} className="aw-task">
                    <strong>{task.title}</strong>
                    <small>{item ? `${item.name} · ${item.code}` : ""}</small>
                    <ProgressBar value={task.progress} />
                    <span className="aw-task-foot">
                      <Avatar name={task.assignee} />
                      {task.assignee}
                      <em>{task.progress}%</em>
                    </span>
                  </li>
                );
              })}
              {!items.length ? <li className="aw-empty">Nothing here</li> : null}
            </ul>
          </section>
        );
      })}
    </div>
  );
}

function EmployeeTasks({
  tasks,
  equipment,
  onProgress,
}: {
  tasks: WalkthroughTask[];
  equipment: EquipmentView[];
  onProgress: (taskId: string, progress: number) => void;
}) {
  const mine = tasks.filter((task) => task.assignee === currentEmployee);

  if (!mine.length) {
    return <p className="aw-hint">No tasks assigned to you yet.</p>;
  }

  return (
    <ul className="aw-mine">
      {mine.map((task) => {
        const item = equipment.find((entry) => entry.id === task.equipmentId);

        return (
          <li key={task.id} className="aw-card aw-mytask">
            <div className="aw-card-head">
              <h4>{task.title}</h4>
              {task.isNew ? <span className="aw-chip is-new">New</span> : null}
            </div>
            <p className="aw-meta">
              {item ? `${item.name} · ${item.code}` : ""} · Due {task.due}
            </p>

            <label className="aw-slider">
              <span>
                Progress <strong>{task.progress}%</strong>
              </span>
              <input
                type="range"
                min="0"
                max="100"
                step="10"
                value={task.progress}
                onChange={(event) => onProgress(task.id, Number(event.target.value))}
              />
            </label>

            <div className="aw-actions">
              {task.status === "todo" ? (
                <button
                  type="button"
                  className="aw-btn is-primary"
                  onClick={() => onProgress(task.id, 10)}
                >
                  Start task
                </button>
              ) : null}
              {task.status === "doing" ? (
                <button
                  type="button"
                  className="aw-btn is-primary"
                  onClick={() => onProgress(task.id, 100)}
                >
                  Mark done
                </button>
              ) : null}
              {task.status === "done" ? <span className="aw-done">Completed</span> : null}
            </div>
          </li>
        );
      })}
    </ul>
  );
}

/* -------------------------------------------------------------------------
   ApexWalkthrough
   ------------------------------------------------------------------------- */

export default function ApexWalkthrough() {
  const [state, dispatch] = useReducer(reducer, undefined, createState);
  const [role, setRole] = useState<Role>("supervisor");
  const [tab, setTab] = useState<TabId>("overview");
  const [toast, setToast] = useState("");
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const equipment = useMemo(
    () =>
      initialEquipment.map((item) => ({
        ...item,
        status: deriveStatus(item, state.tasks),
      })),
    [state.tasks],
  );

  useEffect(
    () => () => {
      if (toastTimer.current) clearTimeout(toastTimer.current);
    },
    [],
  );

  // Opening the board after an employee update completes the "monitor" step.
  useEffect(() => {
    if (role === "supervisor" && tab === "tasks" && state.flags.updated) {
      dispatch({ type: "FLAG", flag: "monitored" });
    }
  }, [role, tab, state.flags.updated]);

  const say = (message: string) => {
    if (toastTimer.current) clearTimeout(toastTimer.current);
    setToast(message);
    toastTimer.current = setTimeout(() => setToast(""), 2400);
  };

  const goTo = (nextRole: Role, nextTab: TabId) => {
    setRole(nextRole);
    setTab(nextTab);
  };

  const switchRole = (nextRole: Role) => {
    if (nextRole !== role) goTo(nextRole, NAV[nextRole][0].id);
  };

  const handleAssign = (payload: {
    equipmentId: string;
    assignee: string;
    due: string;
    title: string;
  }) => {
    dispatch({ type: "ASSIGN", ...payload });
    say(`Task assigned to ${payload.assignee}`);
  };

  const handleProgress = (taskId: string, progress: number) => {
    dispatch({ type: "PROGRESS", taskId, progress });
  };

  const flagByStep = {
    assign: "assigned",
    update: "updated",
    monitor: "monitored",
    summary: "summary",
  } as const satisfies Record<(typeof steps)[number]["id"], keyof DemoFlags>;

  const done = steps.map((step) => state.flags[flagByStep[step.id]]);
  const nextIndex = done.indexOf(false);

  const reset = () => {
    dispatch({ type: "RESET" });
    goTo("supervisor", "overview");
    say("Demo reset");
  };

  return (
    <section className="aw on-band" id="ap-walkthrough" aria-labelledby="aw-heading">
      <div className="aw-inner">
        <header className="aw-header">
          <p className="aw-eyebrow">{walkthroughIntro.eyebrow}</p>
          <h2 className="aw-heading" id="aw-heading">
            {walkthroughIntro.title}
          </h2>
          <p className="aw-intro">{walkthroughIntro.text}</p>
        </header>

        <div className="aw-grid">
          <div className="aw-window" role="region" aria-label="Illustrated Apex workspace">
            <div className="aw-bar">
              <span className="aw-dots" aria-hidden="true" />
              <span className="aw-brand">Apex</span>

              <div className="aw-roles" role="group" aria-label="View as">
                {(["supervisor", "employee"] as const).map((id) => (
                  <button
                    key={id}
                    type="button"
                    className={role === id ? "is-on" : undefined}
                    aria-pressed={role === id}
                    onClick={() => switchRole(id)}
                  >
                    {id === "supervisor" ? "Supervisor" : "Employee"}
                  </button>
                ))}
              </div>

              <span className="aw-sample">Sample data</span>
            </div>

            <div className="aw-body">
              <nav className="aw-nav" aria-label="Workspace sections">
                {NAV[role].map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    className={tab === item.id ? "is-on" : undefined}
                    aria-current={tab === item.id ? "page" : undefined}
                    onClick={() => setTab(item.id)}
                  >
                    {item.label}
                  </button>
                ))}
                <p className="aw-user">
                  <Avatar name={role === "supervisor" ? "Supervisor" : currentEmployee} />
                  {role === "supervisor" ? "Supervisor" : currentEmployee}
                </p>
              </nav>

              <div className="aw-main" key={`${role}-${tab}`}>
                {role === "supervisor" && tab === "overview" ? (
                  <Overview
                    equipment={equipment}
                    tasks={state.tasks}
                    activity={state.activity}
                    onGenerate={() => dispatch({ type: "FLAG", flag: "summary" })}
                  />
                ) : null}
                {tab === "equipment" ? (
                  <EquipmentPanel role={role} equipment={equipment} onAssign={handleAssign} />
                ) : null}
                {role === "supervisor" && tab === "tasks" ? (
                  <TaskBoard tasks={state.tasks} equipment={equipment} />
                ) : null}
                {role === "employee" && tab === "tasks" ? (
                  <EmployeeTasks
                    tasks={state.tasks}
                    equipment={equipment}
                    onProgress={handleProgress}
                  />
                ) : null}
              </div>
            </div>

            <p className={`aw-toast${toast ? " is-on" : ""}`} role="status">
              {toast}
            </p>
          </div>

          <aside className="aw-rail" aria-label="Guided tour">
            <h3>Try this</h3>
            <ol className="aw-steps">
              {steps.map((step, index) => (
                <li
                  key={step.id}
                  className={`${done[index] ? "is-done" : ""}${
                    index === nextIndex ? " is-next" : ""
                  }`}
                >
                  <span className="aw-step-n" aria-hidden="true">
                    {done[index] ? <CheckIcon /> : index + 1}
                  </span>
                  <div>
                    <strong>{step.title}</strong>
                    <p>{step.text}</p>
                    {!done[index] ? (
                      <button
                        type="button"
                        className="aw-link"
                        onClick={() => goTo(step.action.role, step.action.tab)}
                      >
                        Take me there
                      </button>
                    ) : null}
                  </div>
                </li>
              ))}
            </ol>

            <button type="button" className="aw-reset" onClick={reset}>
              Reset demo
            </button>
          </aside>
        </div>
      </div>
    </section>
  );
}
