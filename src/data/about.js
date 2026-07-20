// Content sourced from context/resume.md (Develop / Automate pillars).
// ✏️ The Design pillar is placeholder content — no résumé source for art-side
// skills; edit it to make it yours. Skill lists are curated (~4 per group) so
// they fit the card backs — this section replaced the full Skills grid.

export const aboutHeading = 'Design. Build. Refine.'

export const aboutIntro =
  'Hi, hello! Im Abirami Saravanan. Im a curious person and an empathetic one, and Im at my happiest when those two meet: understanding what people actually need, then building it. I design and develop websites, apps, and systems that make technology feel handy instead of heavy. I did my masters in Computer Science at Indiana University Bloomington, where I focused on user experience and app development. '+
  'Before that, I spent over two years at Mr. Cooper Group building loan-validation platforms. REST APIs, Kafka pipelines, React dashboards. Quiet systems that saved underwriters hours of their day.'

export const pillars = [
  {
    id: 'design',
    number: '01',
    title: 'Design',
    groups: [
      { label: 'Visual Art', items: ['Sketching', 'Painting', 'Digital illustration'] },
      { label: 'Interfaces', items: ['Layout', 'Typography', 'Color systems'] },
      { label: 'This Site', items: ['Ocean-teal theme', 'Clutter hero', 'Journey map'] },
    ],
  },
  {
    id: 'develop',
    number: '02',
    title: 'Build',
    groups: [
      { label: 'Languages', items: ['Python', 'Java', 'JavaScript', 'C#'] },
      { label: 'Frontend', items: ['React', 'Redux', 'Tailwind', 'Angular'] },
      { label: 'Backend', items: ['ASP.NET', 'Spring Boot', 'Node.js', 'Kafka'] },
      { label: 'Cloud & Data', items: ['AWS', 'Docker', 'PostgreSQL', 'MongoDB'] },
    ],
  },
  {
    id: 'automate',
    number: '03',
    title: 'Refine',
    groups: [
      { label: 'AI-Assisted Dev', items: ['Claude Code', 'GitHub Copilot', 'Codex'] },
      { label: 'Workflows', items: ['UiPath', 'Power Automate', 'Kafka pipelines'] },
      { label: 'Quality & CI', items: ['SonarQube', 'Azure DevOps', 'Jest', 'xUnit'] },
      { label: 'Monitoring', items: ['Splunk', 'New Relic', 'CloudWatch'] },
    ],
  },
]
