## Portfolio Project Specifications

🚀 A personal developer portfolio site

---

## 📌 Purpose (Core Idea)

A single place to showcase who I am, what I've built, and what I've made. Clean, professional-techy feel with an ocean teal-blue palette. 

The site should:

- Introduce me at a glance
- Present education, experience, skills, and projects clearly
- Give visitors a way to reach out
- Show hobbies and creative side (Art)
- Feel smooth and animated without being over-designed

---

## 🧑‍💻 Audience

| Persona                | Needs                                              |
| ---------------------- | -------------------------------------------------- |
| Recruiter              | Quick scan of skills, experience, projects, contact |
| Fellow Developer       | Depth on tech stack, code, projects                |
| Client / Collaborator  | Sense of style, easy contact                       |
| Curious Visitor        | Personality — hobbies + art                        |

---

## ✨ Core Features

### A) Home Page Sections

Single-page scroll with anchor navigation:

- Hero / Intro
- Education
- Work Experience
- Skills
- Projects
- Hobbies
- Contact form

Route: `/`

### B) Art Page

Separate route with a gallery grid. Each item is an image with an optional caption. Back link to Home.

Route: `/art`

### C) Theme System

- Two themes: **dark** (default) and **light**
- Ocean teal-blue palette anchoring both
- Toggle button in navbar
- State via React Context, persisted in `localStorage`
- Applied via `data-theme` attribute on `<html>`
- All colors driven by CSS variables

### D) Navigation

- Sticky top navbar
- Section anchors on Home + link to `/art`
- Smooth scroll between sections
- Collapses to hamburger drawer on mobile

### E) Animations (Phase 2)

- GSAP for section entry animations
- ScrollTrigger for scroll-linked reveals
- Page transitions between Home and Art
- Respects `prefers-reduced-motion`

### F) Contact Form

- Fields: name, email, message
- Client-side validation
- Submission strategy TBD (`mailto:`, Formspree, or EmailJS)

---

## 🧱 Tech Stack

| Category   | Choice                                    |
| ---------- | ----------------------------------------- |
| Framework  | **Vite + React**                          |
| Language   | JavaScript                                |
| Routing    | React Router                              |
| Styling    | Plain CSS + CSS variables                 |
| Animation  | GSAP + ScrollTrigger (Phase 2)            |
| Deployment | TBD (Vercel / Netlify / GitHub Pages)     |

No backend for MVP. No auth. No database.

---

## 🎨 UI / UX

- Ocean teal-blue palette
- Professional techy: clean, minimal, no clutter
- Dark mode default, light mode toggleable
- Generous whitespace, clear typography
- Subtle motion — animations enhance, don't distract

### Layout

- Sticky top navbar
- Full-width sections stacked vertically on Home
- Grid layout for Projects and Art gallery
- Footer with socials

### Responsive

- Desktop-first structure, mobile-usable
- Navbar collapses to drawer at small breakpoints
- Grids reflow to single-column

---

## 🗂️ Development Workflow

- **One branch per feature** (`feature/theme-toggle`, `feature/hero-section`, etc.)
- Track the active feature in `@context/current-feature.md`
- Build incrementally: scaffold → theme → layout → sections → art → animations

**Branch examples**:

```
git switch -c feature/scaffold
git switch -c feature/theme-system
```

---

## 🧭 Roadmap

### **MVP**

- Vite scaffold + React Router
- Theme system (dark/light + ocean teal palette)
- Layout shell (Navbar, Footer, empty routes)
- Home sections filled with placeholder content
- Art page with gallery grid
- Contact form (basic)

### **Phase 2**

- GSAP entry animations
- ScrollTrigger reveals
- Page transitions between routes

### **Polish**

- Real content
- Contact form backend wired up
- Deployment
- SEO tags, favicon, meta images

---

## 📌 Status

- In planning
- Ready for Vite scaffold + folder skeleton

---

🏗️ **Portfolio — Simple. Smooth. Ocean teal.**
