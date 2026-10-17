const skillGroups = [
  {
    category: "Product",
    items: ["Product Strategy", "UX/UI", "Prototyping", "Requirements", "User Flows"],
  },
  {
    category: "Technology",
    items: ["React", "Python", "AWS", "APIs", "Git", "IoT"],
  },
  {
    category: "Tools",
    items: ["Figma", "PowerPoint", "Jira/Notion", "Canva"],
  },
];

export default function Skills() {
  return (
    <section className="pad skills" id="skills">
      <div className="wrap">
        <h2>Skills.</h2>
        <p className="lede muted skills-intro">
          Combining technical knowledge, analytical thinking, and product-focused
          problem-solving.
        </p>
        <div className="skills-list">
          {skillGroups.map((group) => (
            <div className="skill-row" key={group.category}>
              <h3>{group.category}</h3>
              <ul className="chips">
                {group.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
