// Three real projects.
// (Full knowHer write-up is archived in
// context/archive/pre-sticky-projects/projects.js.)
//
// ⚠️ AT MOST FOUR ENTRIES. Projects.css hard-codes .project-card--1..4 for both
// the card colours and the sticky cascade tops, so a fifth card renders with no
// background and no sticky offset. Slot 4's styles are kept deliberately, so
// adding a fourth project here just works; a fifth means extending that CSS and
// the --project-card-N theme vars, and re-tuning the card height so the last
// card still lands fully on screen.
//
// Every card renders a single GitHub button from `githubUrl`.

export const projects = [
  {
    id: 'knowher',
    title: 'knowHer',
    description:
      'A fertility-tracking platform: daily BBT and cervical-mucus logging, a Node/Express engine that detects thermal shifts and Peak Day, and cycle-aware AI guidance.',
    tech: ['React', 'Tailwind', 'Node.js', 'Express', 'PostgreSQL', 'AWS'],
    githubUrl: 'https://github.com/abirami2k1',
  },
  {
    id: 'patient-observations',
    title: 'Patient Observation Tracker',
    description:
      'A Spring Boot + SQLite clinical-record system where staff log quantitative measurements and qualitative observations against patients, run diagnostic rules over them, and keep a full command and audit trail. A strict four-layer architecture with Strategy, Observer, Factory, and Command patterns lets new rule algorithms plug in without touching existing code.',
    tech: ['Spring Boot', 'SQLite', 'Docker', 'GitHub Actions', 'Render'],
    githubUrl: 'https://github.com/abirami2k1/Patient-Observations-Tracker',
  },
  {
    id: 'portfolio',
    title: 'Personal Portfolio',
    description:
      'This site: an earthy terracotta design system with GSAP scroll choreography: the clutter hero, split About cards, a drawn journey route, and these stacking cards.',
    tech: ['React', 'Vite', 'GSAP', 'CSS variables'],
    // Path into public/ — rendered through asset() for the GitHub Pages base.
    image: '/projects/portfolio.jpg',
    githubUrl: 'https://github.com/abirami2k1',
  },
]
