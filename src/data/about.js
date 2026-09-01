// Content sourced from context/resume.md (Build / Refine pillars); the Design
// pillar is the user's own copy. Skill lists are curated so they fit the card
// backs, which are `overflow: hidden` in the animated layout — check for
// clipping before adding items. This section replaced the full Skills grid.

export const aboutHeading = 'Design. Build. Refine.'

// The About copy is the user's own words — keep the voice as written.
// Rendered as a lead line plus body paragraphs, both in the static layout and
// on the split-card panel.
export const aboutLead = 'Hi, hello. I’m Abirami Saravanan.'

export const aboutParagraphs = [
  'I’m an empathetic, creative, and curious person. I love connecting with people and knowing their story. I question a lot, and learning to ask questions properly has shaped my path, both personally and professionally.',
  'I design and build websites, apps, and systems, usually starting from one simple question: what is the purpose, and how can it be met for both the user and the business? The intent matters, and it should come through in the work. I want to make systems that are handy for everyone to use.',
  'I recently graduated with my master’s in Computer Science from Indiana University Bloomington, focused on user experience and app development. Before that I spent over two years at Mr. Cooper Group building loan-validation platforms.',
  'Apart from work, I’m in my creative art flow. I believe in the blend of structure and flow.',
]

export const pillars = [
  {
    id: 'design',
    title: 'Design',
    tagline: 'Where it starts. Always on paper first.',
    groups: [
      {
        label: 'UX & product',
        items: ['Figma', 'User research', 'Wireframing', 'Prototyping', 'Usability testing'],
      },
      {
        label: 'Interfaces',
        items: ['Layout', 'Typography', 'Color schema', 'HTML', 'CSS', 'Tailwind'],
      },
      {
        label: 'Visual art',
        items: ['Sketching', 'Painting', 'Digital illustration'],
      },
    ],
  },
  {
    id: 'develop',
    title: 'Build',
    tagline: 'Where ideas become real.',
    groups: [
      { label: 'Languages', items: ['Python', 'Java', 'JavaScript', 'C#'] },
      { label: 'Frontend', items: ['React', 'Redux', 'Tailwind', 'Angular'] },
      { label: 'Backend', items: ['ASP.NET', 'Spring Boot', 'Node.js', 'Kafka'] },
      { label: 'Cloud & Data', items: ['AWS', 'Docker', 'PostgreSQL', 'MongoDB'] },
    ],
  },
  {
    id: 'automate',
    title: 'Refine',
    tagline: 'Where good becomes reliable.',
    groups: [
      { label: 'AI-Assisted Dev', items: ['Claude Code', 'GitHub Copilot', 'Codex'] },
      { label: 'Workflows', items: ['UiPath', 'Power Automate', 'Kafka pipelines'] },
      { label: 'Quality & CI', items: ['SonarQube', 'Azure DevOps', 'Jest', 'xUnit'] },
      { label: 'Monitoring', items: ['Splunk', 'New Relic', 'CloudWatch'] },
    ],
  },
]
