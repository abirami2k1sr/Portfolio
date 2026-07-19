## Portfolio Project Specifications

## Purpose

A single-page personal portfolio with a separate Art page. Clean, professional-techy aesthetic in an ocean teal-blue palette. Simple code, easy to extend as design decisions get made.

## Audience

- **Recruiters**: Skim experience, skills, projects fast
- **Developers**: Look at tech, projects, code quality
- **Clients / Collaborators**: Get a sense of style and reach out
- **Personal visitors**: See hobbies, art — the human side

## Features

Here is the feature list for the portfolio.

A. **Home Page (Single Page)**

Sections in order, connected by smooth scroll and anchor navigation:

1. **Hero / Intro** — name, tagline, short blurb, CTA to projects/contact
2. **Education** — schools, degrees, dates
3. **Work Experience** — roles, companies, dates, bullets
4. **Skills** — grouped (languages, frameworks, tools)
5. **Projects** — cards with title, description, tech, links
6. **Hobbies** — short list or icon grid
7. **Contact** — name, email, message form
8. **Footer** — socials, copyright

Anchor URLs look like `/#education`, `/#projects`, etc.

B. **Art Page**

Separate route with a gallery grid. Each item is an image with an optional title/caption. Back link to Home. Route: `/art`.

C. **Theme System**

- Two themes: `dark` (default) and `light`
- Toggle button in navbar (icon: sun / moon)
- Theme state stored in React Context
- Persisted in `localStorage` under key `portfolio-theme`
- Applied via `data-theme` attribute on `<html>` root
- All colors come from CSS variables — no hardcoded hex in components
- Smooth color transition on toggle

D. **Navigation**

- Sticky top navbar, translucent on scroll (optional)
- Links: Home section anchors + `/art` + theme toggle
- Smooth scroll via CSS `scroll-behavior: smooth`
- Active section indicator (Phase 2)
- Mobile: hamburger drawer

E. **Animations (Phase 2)**

- GSAP for section entry (fade + translate on mount / scroll into view)
- GSAP ScrollTrigger for scroll-linked reveals
- Page transitions between `/` and `/art`
- All animations respect `prefers-reduced-motion`

F. **Contact Form**

- Fields: name, email, message
- Client-side validation (required fields, email format)
- Submission strategy: TBD (`mailto:` link, Formspree, or EmailJS)
- Feedback: success/error toast or inline message
- Disable submit button while sending

## Routing

Two routes handled by React Router:

- `/` — Home (single-page scroll)
- `/art` — Art gallery

Section anchors on Home use hash links (`#hero`, `#education`, `#experience`, `#skills`, `#projects`, `#hobbies`, `#contact`). Handled by browser scroll, not routing.

## Theme Palette (Draft)

Ocean teal-blue. All values live as CSS variables. Exact hex decided during design phase, but the structure is fixed.

**Dark (default)**

- `--bg`: deep navy / near-black
- `--surface`: slightly lighter navy
- `--primary`: teal
- `--accent`: brighter teal-cyan
- `--text`: near-white
- `--text-muted`: gray-blue
- `--border`: subtle navy

**Light**

- `--bg`: near-white
- `--surface`: light gray-blue
- `--primary`: darker teal
- `--accent`: mid teal
- `--text`: near-black
- `--text-muted`: slate
- `--border`: light gray-blue

## Tech Stack

- Framework: **Vite + React**
- Language: JavaScript
- Routing: React Router
- Styling: Plain CSS with CSS variables (no Tailwind, no CSS-in-JS)
- Animation: GSAP + `@gsap/react` + ScrollTrigger (added in Phase 2)
- Icons: Lucide React (or similar, TBD)
- Deployment: TBD

## Data

No database. Content lives in JS/JSON data files under `src/data/`:

- `education.js`
- `experience.js`
- `skills.js`
- `projects.js`
- `hobbies.js`
- `art.js`

Each exports a simple array of objects. Section components map over their data.

## UI/UX

**General**

- Modern, minimal, professional-techy
- Dark mode default (developer audience expects this)
- Clean typography, one or two fonts max
- Generous whitespace
- Ocean teal-blue as accent, not overwhelming
- Reference vibe: Linear, Vercel, personal dev sites

**Layout**

- Sticky navbar
- Sections full-width, content constrained by max-width container (~1100px)
- Consistent vertical rhythm between sections (e.g., `padding: 6rem 0`)
- Projects and Art use responsive CSS grid

**Responsive**

- Desktop-first structure, mobile-usable
- Navbar collapses to drawer at `~768px`
- Grids reflow to single-column on mobile

**Micro-interactions**

- Hover states on links, cards, buttons
- Smooth color transition on theme toggle
- Loading state on contact form submit
- Focus rings on all interactive elements
