// Content sourced from context/resume.md (Develop / Automate pillars).
// ✏️ The Design pillar is placeholder content — no résumé source for art-side
// skills; edit it to make it yours. Skill lists are curated (~4 per group) so
// they fit the card backs — this section replaced the full Skills grid.

export const aboutHeading = 'Design. Develop. Automate.'

export const aboutIntro =
  "Hi, I'm Abirami — a software engineer who also paints. I spent 2+ years at " +
  'Mr. Cooper Group building loan-validation platforms: REST APIs, Kafka ' +
  "pipelines, and React dashboards across .NET and AWS. These days I'm " +
  'pursuing my MS in Computer Science at Indiana University Bloomington. I ' +
  'like my backends resilient, my interfaces clean, and my weekends covered ' +
  'in paint. Everything I make comes down to the same three moves.'

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
    title: 'Develop',
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
    title: 'Automate',
    groups: [
      { label: 'AI-Assisted Dev', items: ['Claude Code', 'GitHub Copilot', 'Codex'] },
      { label: 'Workflows', items: ['UiPath', 'Power Automate', 'Kafka pipelines'] },
      { label: 'Quality & CI', items: ['SonarQube', 'Azure DevOps', 'Jest', 'xUnit'] },
      { label: 'Monitoring', items: ['Splunk', 'New Relic', 'CloudWatch'] },
    ],
  },
]
