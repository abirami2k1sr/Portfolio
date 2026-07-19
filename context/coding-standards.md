# Coding Standards

## JavaScript

- Use modern ES syntax (const/let, arrow functions, destructuring, optional chaining, spread)
- No unused variables or imports
- Prefer named exports for components; default export the top-level page/route component
- No `var`

## React

- Functional components only (no class components)
- Use hooks for state and side effects
- Keep components focused — one job per component
- Extract reusable logic into custom hooks (`src/hooks/`)
- Colocate small helpers with the component; promote to `src/lib/` when reused

## Vite

- Dev server on `http://localhost:5173` by default
- Environment variables via `import.meta.env`, prefixed with `VITE_`
- Static assets in `public/`, imported assets in `src/assets/`

## Styling (Plain CSS + Variables)

**CRITICAL**: All colors come from CSS variables defined in `src/styles/themes.css`. No hardcoded hex or rgb values in component styles.

- Themes are switched by setting `data-theme="dark"` or `data-theme="light"` on `<html>`
- One CSS file per section/component, colocated with the JSX file (e.g., `Hero.jsx` + `Hero.css`)
- Global resets and base styles in `src/styles/global.css`
- Theme variables in `src/styles/themes.css`
- No inline styles except for dynamic values that can't be expressed in CSS (e.g., calculated positions in animations)
- No CSS-in-JS libraries
- No Tailwind

Example theme setup in `themes.css`:

```css
:root,
[data-theme="dark"] {
  --bg: #0a1a24;
  --surface: #12232e;
  --primary: #14b8a6;
  --accent: #22d3ee;
  --text: #e6f1f5;
  --text-muted: #7a94a3;
  --border: #1e3a4a;
}

[data-theme="light"] {
  --bg: #f5fbfd;
  --surface: #e6f1f5;
  --primary: #0f766e;
  --accent: #0891b2;
  --text: #0a1a24;
  --text-muted: #4a6572;
  --border: #cbdde3;
}
```

## Routing

- `react-router-dom` v6+
- Routes defined in `App.jsx`
- Use `<Link>` for internal navigation, never a raw `<a href="">` for routes
- Section anchors on Home use hash links (`#education`) — handled by scroll behavior, not by the router

## Animation

- GSAP registered once in a shared init module (`src/lib/gsap.js`)
- Use the `useGSAP` hook from `@gsap/react` for component-scoped animations
- Always clean up animations on unmount (the `useGSAP` hook handles this automatically)
- Register ScrollTrigger explicitly with `gsap.registerPlugin(ScrollTrigger)`
- Always respect `prefers-reduced-motion` — skip or shorten animations when the user prefers reduced motion

## File Organization

- Components (reusable): `src/components/ComponentName.jsx`
- Section components (Home-only): `src/sections/SectionName.jsx`
- Pages (route-level): `src/pages/PageName.jsx`
- Context: `src/context/ContextName.jsx`
- Custom hooks: `src/hooks/useThing.js`
- Utilities: `src/lib/utility.js`
- Content data: `src/data/thing.js`
- Styles: colocated `.css` files + `src/styles/` for globals and themes

## Naming

- Components: PascalCase (`ThemeToggle.jsx`)
- Files: match component name
- Hooks: `useCamelCase.js`
- Functions: camelCase
- Constants: SCREAMING_SNAKE_CASE
- CSS variables: `--kebab-case`
- CSS class names: `kebab-case`, BEM-ish where helpful (`.card__title`, `.card--featured`)

## Data

- Content lives in `src/data/*.js` as exported arrays/objects
- No database, no API for MVP
- Section components import from `src/data/` and map over items

## Error Handling

- Wrap async operations (e.g., contact form submission) in try/catch
- Show user-friendly error messages inline or via toast
- Don't swallow errors silently — at minimum, `console.error` with context

## Accessibility

- Semantic HTML (`<nav>`, `<section>`, `<main>`, `<footer>`, heading hierarchy)
- All images have meaningful `alt` text (decorative images get `alt=""`)
- Interactive elements are keyboard-focusable with visible focus states
- Color contrast meets WCAG AA in both themes
- Respect `prefers-reduced-motion` for all animations
- Form inputs have associated `<label>` elements

## Code Quality

- No commented-out code unless explicitly noted
- No unused imports or variables
- Keep components under ~150 lines when possible; extract subcomponents otherwise
- Break long JSX into smaller components rather than deeply nested trees
