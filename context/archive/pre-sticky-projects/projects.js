// Content sourced from context/resume.md — edit here to update the site.
// Add repoUrl / liveUrl when you have links (leave "" to hide that link on a card).

export const projects = [
  {
    id: 'knowher',
    title: 'knowHer',
    description:
      'A fertility-tracking platform where users log daily BBT and cervical-mucus patterns to visualize their predicted fertile window with Recharts. The Node/Express backend computes the coverline, detects thermal shifts across three consecutive readings, and identifies Peak Day, while an integrated AI API returns cycle-aware guidance. Non-technical contributors can add health content through a Swagger-documented endpoint.',
    tech: ['React', 'Tailwind', 'Node.js', 'Express', 'PostgreSQL', 'AWS'],
    repoUrl: '',
    liveUrl: '',
  },
  {
    id: 'portfolio',
    title: 'Personal Portfolio',
    description:
      'This site — a single-page portfolio with a separate art gallery, ocean-teal theming, dark/light mode, and GSAP transitions on the roadmap.',
    tech: ['React', 'Vite', 'React Router', 'CSS variables'],
    repoUrl: '',
    liveUrl: '',
  },
]
