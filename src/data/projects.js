// ✏️ Dummy data for now — replace with your real 3–4 projects.
// knowHer + the portfolio are kept as real seeds (full knowHer write-up is
// archived in context/archive/pre-sticky-projects/projects.js); the last two
// are placeholders.
//
// Every card renders a GitHub button from `githubUrl` (point it at the repo —
// the profile URL is a stand-in). `liveUrl` is optional: the "Live site"
// button only appears when a project is actually hosted.

export const projects = [
  {
    id: 'knowher',
    title: 'knowHer',
    description:
      'A fertility-tracking platform — daily BBT and cervical-mucus logging, a Node/Express engine that detects thermal shifts and Peak Day, and cycle-aware AI guidance.',
    tech: ['React', 'Tailwind', 'Node.js', 'Express', 'PostgreSQL', 'AWS'],
    githubUrl: 'https://github.com/abirami2k1',
    liveUrl: '',
  },
  {
    id: 'portfolio',
    title: 'Personal Portfolio',
    description:
      'This site — an ocean-teal design system with dark/light themes and GSAP scroll choreography: the clutter hero, split About cards, a drawn journey route, and these stacking cards.',
    tech: ['React', 'Vite', 'GSAP', 'CSS variables'],
    githubUrl: 'https://github.com/abirami2k1',
    liveUrl: '',
  },
  {
    id: 'project-three',
    title: 'Project Three',
    description:
      '✏️ Placeholder — a couple of lines about the problem this project solves, the approach you took, and what came out of it. This one shows the hosted state with both buttons.',
    tech: ['Tech 1', 'Tech 2', 'Tech 3'],
    githubUrl: 'https://github.com/abirami2k1',
    liveUrl: 'https://example.com',
  },
  {
    id: 'project-four',
    title: 'Project Four',
    description:
      '✏️ Placeholder — swap in a real project. Keep descriptions to two or three lines so the card stays balanced against the media pane.',
    tech: ['Tech 1', 'Tech 2'],
    githubUrl: 'https://github.com/abirami2k1',
    liveUrl: '',
  },
]
