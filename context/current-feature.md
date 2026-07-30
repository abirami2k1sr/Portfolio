# Current Feature

## Feature: Section Reorder + Journey Map (Education ∪ Experience)

**Status**: Implemented & verified — awaiting commit approval
**Branch**: stacked on the same uncommitted working tree (repo still has zero commits; commits get split by feature on approval)

## Description

Home is **Hero → About → Projects → Journey → Contact**, single-route (Hobbies section and the whole `/art` page were removed on user request, 2026-07-16 — archived to `context/archive/hobbies-art-removal/`; the router + Link-vs-anchor navbar logic stays for when routes return). Education and Work Experience merged into one **Journey map** adapted from the CodeGrid scroll-powered SVG-stroke reference: a winding SVG route drawn in by a ScrollTrigger scrub (strokeDashoffset) behind alternating milestone rows, **latest first**:

1. MS CS, Luddy School, Indiana University (2024–2026, current, "Now" chip) — `sample-gates.jpg`
2. TA — AI on Ramp (INFO/CSCI 33715), Luddy (Jan–May 2026) — `graduation.jpg`; no details toggle (only one LinkedIn line existed → lives in the summary)
3. Software Engineer, Mr. Cooper Group (2022–2024) — `mrcooper.jpg`
4. SE Intern, Mr. Cooper Group (Jan–Jul 2022) — `mrcooper-intern.jpg` (portrait → `photo.position: '50% 62%'` rendered as inline `object-position`)
5. B.Tech IT, Coimbatore Institute of Technology (2018–2022) — no photo

Work milestones show a one-line summary; condensed resume highlights (3–4 lines) sit in a native `<details>` toggle per milestone (user: "few lines inside toggle"). Source photos live in `context/photos/`; the site serves downscaled copies from `public/journey/`.

## Implementation notes

- `src/data/journey.js` supersedes `education.js` + `experience.js` (archived with the old section files in `context/archive/pre-journey/` — repo has zero commits, never hard-delete).
- `ROUTE_D` lives in `Journey.jsx`: 1000×2400 user units, `C`+`S` segments, 5 swings at ~10/30/50/70/90% of map height (path length 3892). x/y are proportions, so re-tuning the weave = editing one string. Both `<path>`s share it: `.journey__route-track` (var(--border)) under `.journey__route-progress` (var(--primary), scrub-drawn); stroke colors come from CSS so themes just work.
- Draw trigger: `.journey__map`, `top 70%` → `bottom 80%`, `scrub: 0.5`; row reveals are separate one-shot `gsap.from` tweens (`top 85%`). All inside `mm.add('(prefers-reduced-motion: no-preference)')` — context-registered, so useGSAP cleanup is automatic.
- `<details>` toggles call `ScrollTrigger.refresh()`.
- Photos: polaroid frames (±1.5° rotate) echoing the hero clutter; shared `aspect-ratio: 4 / 3` + `object-fit: cover` avoids CLS.
- vs reference: no Lenis (house style); two-path route map instead of one fat ribbon; `preserveAspectRatio="none"` + `vector-effect="non-scaling-stroke"` so the path tracks content height and dash math is resize-proof; mobile stacks single-column with the path container widened ~250%, section `overflow: hidden`. Reduced motion / no-JS default = full path drawn, rows visible.
- A11y: milestones as `<ol>`, decorative SVG `aria-hidden`, native details/summary, meaningful alt text.
- ⚠️ `context/project-overview.md` still specs the Art page — spec intentionally left untouched (same pattern as the Skills removal).
- ⚠️ Puppeteer: element screenshots of tall sections (`captureBeyondViewport`) render without real scrolling — ScrollTrigger reveals get caught at `autoAlpha: 0` and look like missing content. Judge reveals only from real-scrolled viewport screenshots. (And never `--virtual-time-budget` — it freezes GSAP's rAF ticker.)

**Verified** (2026-07-12, re-verified after each change): lint + build clean; monotonic draw 3892 → 0 sampled while really scrolling; all 5 rows reveal; details toggle grows the page with no errors; `#journey` anchor lands 80px below viewport top; mobile 390 no overflow; reduced motion static; both themes; zero console errors.

---

## Sub-feature: Sticky-Cards Projects (2026-07-16)

Started as a port of `context/References/cg-serious-business-sticky-cards` (GSAP pins + drift), then **redesigned the same day on user feedback** into a **pure-CSS `position: sticky` cascade — no GSAP in Projects at all**. Requirement: each project's name must stay visible as a card header once the next card covers it, and the section must be properly responsive.

Final design:

- 4 projects in `projects.js` — knowHer + portfolio real, ✏️ two placeholder entries. Every card has a GitHub button (`githubUrl`); "Live site" renders only when `liveUrl` is set.
- Card layout: `<header>` row — `( 0N ) Title` + hairline rule; description, tech chips, links, media in `.project-card__body`.
- Card N sticks at `nav + 1.25rem + (N−1)·4rem` (mobile: `nav + 0.75rem + (N−1)·4.75rem`), so each covered card keeps exactly a header band visible; card height `clamp(430px, 100svh − 18.25rem, 640px)` keeps the 4th card fully on screen. Later DOM siblings paint above (both positioned) — no z-index. Sticky releases naturally with the flow, zero snap.
- Card colors via theme vars `--project-card-{1..4}-bg/-fg` on explicit `.project-card--N` modifier classes; links/chips derive from `--card-fg` so contrast holds on every card in both themes. Projects section is plain `--bg` (alternation now: Contact alt only).
- Sticky only inside `prefers-reduced-motion: no-preference`; reduced motion = static stacked list.
- ⚠️ Sticky dwell gotcha: sticky cards are confined to the container's **content box**, and each card's own margin box counts against it — post-arrival scroll room must be a separate flex item. `padding-bottom` on the container does nothing; the working form is a `.projects__cards::after` spacer (`clamp(160px, 26svh, 320px)`).
- ⚠️ From the abandoned GSAP version, still worth knowing: ScrollTrigger pins wrap elements in `.pin-spacer` divs, so `:nth-of-type` card selectors silently break under pinning — use explicit modifier classes.
- Old grid Projects archived to `context/archive/pre-sticky-projects/`.

**Verified** (2026-07-16): cascade tops exactly [84, 148, 212, 276] desktop / [76, 152, 228, 304] mobile through the dwell; covered headers hit-test to themselves, bodies to the covering card; GitHub button hittable on the top card; natural release; no 390px overflow; reduced motion static; both themes; zero console errors. Mobile: header band fits title + one chip row (~4 chips; extras wrap under the next card).

---

## Cleanup pass (2026-07-16, user request)

Dead-code sweep after the rework churn (data/hooks modules, gsap exports, npm deps, clutter photos, theme vars, every CSS class vs JSX — note runtime-composed classes like `journey-card__chip--{kind}` / `project-card--{index}` are false positives in such audits). Removed dead `.btn--ghost`; fixed stale Art-page copy in `index.html` meta / README / CLAUDE.md and README's data-file list. Kept deliberately: `src/assets/` (`.gitkeep`'d), unrendered `profile.tagline`/`profile.phone`, `context/archive/**`. Verified: lint + build clean, full-scroll smoke test with zero console errors.

---

## Sub-feature: Personal hero clutter photos (2026-07-18)

**Status**: Implemented & verified — awaiting commit approval

All stock clutter items on the hero desk (inherited from the codegrid reference) were replaced with the user's own images from `context/Homepage Photos/`, preprocessed from white-background JPEGs/HEIC into transparent PNGs via Swift/CoreImage scripts (session scratchpad only — the processed PNGs in `public/clutter/` are the kept artifacts). After several rounds of user-directed additions/removals, the final set is **11 items** (`heroClutter.js`, in `src/sections/`):

- **Cutouts with baked shadow**: `photo` (her photo, white-border print, 440), `bison` (IU sign, circular die-cut, 240), `heart` (watercolor gem, 220), `robot` (sticker, 200), `note` (spiral notebook, 550).
- **`pen`** (260, added 2026-07-18): Reynolds 045 ballpoint — user-supplied transparent PNG (no baked shadow). Asset is `penRey.png`, pre-rotated ~45° tip-up-right (it replaced a vertical rendition, `pen.png`, still sitting unreferenced in `public/clutter/` alongside `notebook.png`), so per-mode `rotation` values are relative to that diagonal: 0 in chaos (dropped center-bottom), −45 in cleanup (standing vertical), 35 in notebook (lying along the top edge of the page).
- **`art`** (230, added 2026-07-18): watercolor paint palette + brush, user-supplied transparent PNG — top-center in chaos, beside the header (brush pointing at the name) in cleanup, bottom-left corner in notebook mode.
- **Ink line art** (`ink: true` — transparent bg, white lines, no shadow; light theme flips to black via `[data-theme='light'] .hero__item--ink img { filter: invert(1) }`): `loading` 300, `error404` 200, `escape` 230.
- **`kolam`** (180): dark ink, baked (originally teal; asset since swapped) — it sits ON the white notebook page. No `ink` flag. In **notebook mode** it's pushed off onto the desk, where dark ink vanishes in dark theme — a scoped rule in `Hero.css` (`[data-theme='dark'] .hero--notebook … [data-item='kolam'] img`) forces it white via `filter: brightness(0) invert(1)` (user request 2026-07-18). DOM-ordered right after `note` so it reads as stuck to the page.

Key mechanics:

- **Notebook mode**: the notebook grows into a centered page behind the header via a per-arrangement `size` override (`setLayout` reads `item.size ?? ITEM_SIZES[id]`); kolam is pushed off to the top-left; the pile scatters around the page edges. Header text sits on the page: `hero--{mode}` class + a `≥1000px` scoped block in `themes.css` overriding `--primary/--accent/--text` to black ink (`#0a1a24`, both themes; user request 2026-07-18). ⚠️ The block must also redeclare `--gradient-brand` — the `:root` declaration resolves its `var(--primary)` at `:root`, so the name's gradient ignores scoped var overrides otherwise. Below 1000px the notebook isn't behind the header, so mobile keeps normal colors — readable via the veil alone (the old header halo was removed entirely on request: no `.hero__header::before`, no `--hero-halo` vars).
- Processing recipes (for future assets): Vision `VNGenerateForegroundInstanceMaskRequest` + alpha-bbox trim for cutouts (⚠️ failed on the bison — rebuilt as a geometric circular die-cut from the red-pixel bbox); luminance→alpha ramp for ink (opaque ≤0.5, transparent ≥0.75, tint white, trim); baked drop shadow blur 9 / y −7 / 32% black on non-ink items.
- Archives: original 11 stock PNGs → `context/archive/pre-personal-clutter/`; intermediate white-sticker renditions → `context/archive/sticker-clutter-v1/`; removed items (coding, geode, star) → `context/archive/removed-personal-clutter/`.
- ⚠️ Doc-drift note (2026-07-18): `heroClutter.js` is the source of truth for the final arrangements — positions were re-tuned after the last round of notes here, and the notebook asset was swapped to `note.png`. The superseded `public/clutter/notebook.png` is now unreferenced (not yet archived).

**Verified** (2026-07-18, after each round): lint + build clean; puppeteer real-time — all images load in both themes, chaos → cleanup → notebook Flip transitions clean, ink white-in-dark / black-in-light, typed role dark-ink on the page in notebook mode, mobile 390, reduced-motion instant switches, zero console errors.

---

## Sub-feature: Scalloped navbar edge (2026-07-26, `feature/earthy-palette`)

The navbar's bottom edge is a scalloped trim: `.navbar::after` strip (`height: --scallop-r` = 13px) below the bar, painted with a repeating radial tile (`--scallop-tile` = 2r) — each bump **filled with `--bg`** up to `r − 2px`, then a `--brand` orange rim arc to `r`, transparent beyond. The fill matters: the earlier hollow-arc version let page content show through inside the bumps while scrolling. Bar body (`::before`, plain `--bg`) + filled bumps read as one opaque shape; the rim is the only visible edge. Mobile drawer opens at `--nav-h + --scallop-r`, below the trim.

- ⚠️ Puppeteer: `screenshot({ clip })` coordinates are **document**-based and `captureBeyondViewport` (default true) re-renders from the page top — a scrolled sticky navbar lands outside a `y: 0` clip and looks "disappeared" while `getBoundingClientRect` says it's fine. Viewport-truth screenshots = `captureBeyondViewport: false`, no clip.

**Verified** (2026-07-26): lint + build clean; puppeteer real-scroll — thin at top / thick after scroll, bumps opaque over hero content, mobile 390 drawer + zero horizontal overflow, zero console errors.

---

## Sub-feature: Pinned Projects heading (2026-07-26, `feature/earthy-palette`)

User: on scroll the first project card is stable (sticky) but the **section heading should also stay fixed**. Made the `SectionHeading` container (`.projects__intro`, new class on the wrapping `.container` in `Projects.jsx`) `position: sticky` so "Projects" stays pinned while the cards cascade under it.

- Geometry lives in scoped vars on `.projects`: `--projects-heading-top` (nav + 1.25rem — where the heading pins) and `--projects-cascade-top` (nav + 7.5rem — where card 1 pins, ~1.25rem below the pinned heading). The old card cascade tops (nav + 1.25/5.25/9.25/13.25rem) were pushed down to start at `--projects-cascade-top`, stepping `--projects-cascade-step` (4rem). Card height shrank `100svh − 18.25rem` → `100svh − 24.5rem` (min 400) so the 4th card still lands fully on screen under nav + heading + cascade.
- Sticky heading is **desktop only** (`@media (min-width: 881px)`, complementing the `max-width: 880px` mobile card block): on short phones a pinned heading + 4 header bands + full 4th card overruns the viewport, so mobile keeps its original tuning and the heading scrolls away. Reduced motion = static (no sticky), as before.
- Cards never rise above their own sticky `top`, so they can't cover the pinned heading during the cascade (verified ~19px gap desktop). At section **exit** the stack scrolls up behind the heading — handled by `z-index: 1` + `background: var(--bg)` on `.projects__intro` (the only reason it needs a bg; the section is plain `--bg`), so the heading paints cleanly over the departing cards. Hit-test confirms the heading title stays topmost throughout.
- ⚠️ Scallop clearance fix (2026-07-26): `--projects-heading-top` was `nav + 1.25rem`, which tucked the pinned heading behind the navbar — the bar **thickens to 4.8rem on scroll** (`Navbar.jsx` `THICK_REM`; `--nav-height` is only the 3.4→4.8 base) and the scalloped `.navbar::after` adds 13px below it (~90px visual bottom). Bumped to `nav + 2.75rem` (108px) for an 18px gap under the trim. The eyebrow-less "Projects" heading is only ~57px tall, so `--projects-cascade-top` (nav + 7.5rem = 184px) still clears it by 19px — cascade tops + card height stayed at their original verified values.
- **Early release (2026-07-26, user request "quit before the last card scroll")**: the heading now slides up and out as the **last** card reaches its pinned spot, instead of staying pinned through the dwell + exit. This is the one thing pure CSS can't do here — a `position: sticky` element only releases at the bottom of its containing block, which the heading shares with the cards (they need the trailing `::after` dwell room), so it would otherwise linger until the section exits. Added `useHeadingRelease` in `Projects.jsx`: a rAF-throttled scroll listener (same pattern as the navbar's thickness listener — **vanilla JS, still no GSAP**) that writes `--projects-intro-shift` to `.projects__intro`, `translateY(0)` while pinned then `-(scrollY − releaseAt)` past the release point. `releaseAt = flowTop(lastCard) − lastCard.stickyTop − (headingPinTop + headingHeight)`, i.e. the heading finishes clearing exactly as the last card pins. `flowTop` sums `offsetTop`/`offsetParent` (scroll- and sticky-independent). Gated to the same `(min-width: 881px) and no-preference` query (removes the shift otherwise); re-measures on resize and matchMedia change. ⚠️ Projects is **no longer strictly pure-CSS** — this is the first JS in the section; the card cascade itself is still all CSS.

**Verified** (2026-07-26, re-checked after the scallop fix + early release): lint + build clean; puppeteer real-scroll at 1440/1280/1366 — nav thick (4.8rem) when pinned, heading [108,165] with an 18px gap below the scallop, card1 tucks 19px below, cascade tops [184,248,312,376], 4th card fully visible (14–16px bottom margin at 800–900px tall), no overlap (heading title hit-tests to itself); **`--projects-intro-shift` holds 0 through cards 1–3 then ramps monotonically (0 → −26 → −132 → −238…) so the heading is fully above the nav exactly as card 4 pins at 376**; mobile heading scrolls away with card cascade unchanged; zero console errors.

---

## Sub-feature: Social icons at Contact heading level (2026-07-26, `feature/earthy-palette`)

User: put the GitHub, LinkedIn and mail icons on the same level as the Contact header. Wrapped `Contact.jsx`'s `SectionHeading` + a new `.contact__socials` `<ul>` in a `.contact__header` flex row (`justify-content: space-between; align-items: center`); the row owns the heading's bottom spacing (`.contact__header .section-heading { margin-bottom: 0 }`) so the icons center on the title. Icons are circular bordered pill links (muted → `--primary` on hover), built from `profile.socials` (GitHub, LinkedIn) + a `mailto` for email — same icon SVGs as the footer, colocated in `Contact.jsx` per the existing per-file icon pattern (cf. `Projects.jsx`).

- **Additive, not a move**: the footer still renders its own socials — the two aren't adjacent (contact header is at the top of the last section, footer at page bottom, form between them). Offered to drop the footer set if the user wants a single location.
- Mobile: the `.contact__header` row wraps (`flex-wrap`), so on narrow screens the icons drop just below the heading, left-aligned above the email/form — no room to keep them inline with the title.

**Verified** (2026-07-26): lint + build clean; puppeteer real-scroll at 1440/1024/390 — icons sit at the "Contact" title level right-aligned on desktop/tablet (socials-vs-title center delta 6px), wrap cleanly below the heading on mobile; zero console errors.

---

## Previous features (implemented, unmerged)

### Hero Typing Roles + Intro Cleanup

Hero's static role line became a looping typewriter cycling `profile.roles` (Software Engineer → Designer → Observer → Artist) with blinking caret; tagline + CTAs removed — hero card is greeting + name + typed role. `useTypingEffect` + `usePrefersReducedMotion` hooks; SRs get a static clipped span with all roles, animated span `aria-hidden`; reduced motion = static first role, no blink.

### About + Skills Split-Card Section (GSAP ScrollTrigger)

Pinned split-card About after the hero (2.5 viewport-heights scrub): three cards start flush, container narrows, cards split, then flip with stagger to reveal pillars ( 01 ) Design · ( 02 ) Develop · ( 03 ) Automate. Replaced the old Skills grid (skills curated onto card backs; Design pillar ✏️ placeholder; dropped items restorable via `about.js`). `gsap.matchMedia` `(min-width: 1000px) and (prefers-reduced-motion: no-preference)` matches the CSS media query; base styles are the static layout.

- ⚠️ Fixed 2026-07-16: stage tweens fired at progress thresholds finish/reverse a full stage away from the scroll position under scrub lag — every stage is now a progress-locked `gsap.set` in `onUpdate` (staggered per-card flip windows 0.62+i·0.055, length 0.22; each back's opacity tied to its own flip). rAF-monitor verified zero violating frames (script pattern: session scratchpad `monitor-about.mjs`). mm cleanup `clearProps` covers all inline styles.
- Card-back theme vars `--about-card-{1,2,3}-bg/-fg`, `--about-panel-glow`. Hero owns `id="home"`; this section owns `id="about"`.

### Creative-Clutter Hero (GSAP)

Interactive desk hero from the codegrid creative-clutter reference: full-viewport desk, three arrangement modes (chaos / cleanup / notebook) via GSAP Flip; reduced motion switches instantly. `.modes` absolute (not fixed); `--hero-veil` var. ⚠️ Chrome's `--virtual-time-budget` freezes GSAP's rAF ticker — verify GSAP with puppeteer-core real-time waits.

### Project Scaffold + MVP Site

Vite 8 + React 19, React Router, ocean-teal dark/light theme (localStorage, pre-paint script), sticky navbar + drawer, Home sections, validated contact form → `mailto:`. Content from `context/resume.md`.

- ⚠️ `context/resume.md` and `context/project-spec.md` are NOT referenced by CLAUDE.md — read them anyway; project-spec.md differs from project-overview.md (localStorage key, breakpoint, icons) — left as-is pending decision.
- `npm run lint` runs **oxlint** (Vite template default), not ESLint.
- Reference folders live under `context/References/` (older notes may cite the previous `context/codegrid-*` paths).

---

## History

_(completed features get moved here after merge)_
