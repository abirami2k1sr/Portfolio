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

## Sub-feature: About copy in the user's own words (2026-07-30, `feature/about-copy`)

The user supplied their own "about me" text, replacing the AI-written `aboutIntro` paragraph (which also had its apostrophes stripped — "Im"). The new copy is a greeting line + 4 paragraphs, so the single-`<p>` render had to become a paragraph block.

- `about.js`: `aboutIntro` (one string) → `aboutLead` (`'Hi, hello, I’m Abi…'`) + `aboutParagraphs` (array). Typographic `’` used directly in the single-quoted strings — no escaping, and no repeat of the stripped-apostrophe bug. `aboutHeading` ("Design. Build. Refine.") and the three pillars are unchanged.
- `About.jsx`: new local `AboutCopy` fragment component (lead `<p class="about-copy__lead">` + `.about-copy__text` paragraphs) rendered in both places the copy appears — the static `.about__intro-static` block and the split panel inside each card front. Both containers changed from `<p>` to `<div>`.
- ⚠️ **Global `p` rules beat inherited font-size**: `global.css` has element-level `p` styling, so paragraph children of a container that sets `font-size` still take the more specific element rule unless the container's typography is re-declared per class. Watch this when converting a single styled `<p>` into a wrapper + `<p>` children.
- ⚠️ **The card face is shortest mid-scrub**: the panel's usable height is `(container width × 60% ÷ 3) × 7/5`, i.e. it *shrinks* as the container narrows — ~478px → 367px at 1440, and only ~300px at 1000–1024px wide. The old one-paragraph intro fit at any size; the new 5-paragraph copy overflowed by 35–170px at first pass. Panel copy retuned to fit the **shortest** face: `max-width: 52rem` (was 46 — the panel is 300% of a card, so width is free and longer lines mean fewer of them), `padding: clamp(1.1rem, 1.9vw, 2.25rem)` (was flat 2.5rem), `font-size: clamp(0.82rem, 1vw, 1.15rem)`, `line-height: 1.6` (was 1.75), paragraph gaps 0.6em. Static layout keeps its roomier 1.05rem/1.8.
- Note: light theme is gone (`themes.css` is single dark now, `<html data-theme="dark">` static), so theme-pair verification no longer applies here despite older notes in this file.
- Open question for the user: the hero already opens with "Hi, This is Abirami Saravanan" and the About lead now opens with "Hi, hello, I’m Abi…" — two greetings on one page. Left as written; flagged.

### Revision (2026-08-23) — user supplied updated copy

Lead is now the full name (`'Hi, hello. I’m Abirami Saravanan.'`, was `'Hi, hello, I’m Abi…'`) and the body grew to **5 paragraphs**: a new third paragraph covering the MS at IU Bloomington + the two years at Mr. Cooper Group (loan-validation platforms, REST APIs, Kafka pipelines, React dashboards), and the "clean, maintainable code" sentence dropped from the design/development paragraph. Structure unchanged — `aboutLead` + `aboutParagraphs` still render through `AboutCopy` in both the static block and the split panel.

- The extra paragraph re-broke the shortest-face fit (clip 4px at 1280, 23px at 1024 mid-scrub). Panel copy retuned again: `max-width` 52 → **58rem**, padding `clamp(0.85rem, 1.6vw, 2rem)` (was `clamp(1.1rem, 1.9vw, 2.25rem)`), `font-size clamp(0.76rem, 0.95vw, 1.1rem)` (was `clamp(0.82rem, 1vw, 1.15rem)`), `line-height` 1.6 → **1.55**, lead/para gaps 0.7/0.6em → 0.6/0.5em. Static layout untouched.
- The two-greetings note below still stands — the hero's "Hi, This is Abirami Saravanan" and this lead now say nearly the same words.

**Verified** (2026-08-23): lint + build clean; puppeteer real-scroll at 1440×900 / 1280×720 / 1024×800 sampling pin progress 0 → 0.6 — copy height 328/291/283px vs shortest face 367/322/299px, `panel.scrollHeight === clientHeight` at every sample (zero clip, was 0/6/23); split state tears the copy across the three cards; mobile 390 static block shows all 5 paragraphs with no horizontal overflow; reduced motion 1440 static; zero console errors.

**Verified** (2026-07-30): lint + build clean; puppeteer real-scroll at 1440×900, 1280×720, 1024×800 sampling pin progress 0 → 0.6 — copy height 313/284/275px vs shortest face 367/322/299px, no clip (`panel.scrollHeight === clientHeight` at every sample); split state shows the copy tearing across the three cards as before; mobile 390 static block renders all 5 paragraphs, no horizontal overflow; reduced motion 1440 = static intro + card row; zero console errors.

---

## Sub-feature: Skills nav tab (2026-08-23, `feature/about-copy`)

User asked for another top-nav tab pointing at the skills. There is no standalone Skills section — the skills are the **backs of the three About cards** (Design / Build / Refine), which replaced the old Skills grid — and the user confirmed the tab should land there, ordered About → Skills → (Projects) → Journey → Contact.

- `SECTION_LINKS` in `Navbar.jsx` gains `{ label: 'Skills', hash: '#skills' }` after About; `id="skills"` sits on `.about__cards` (+ `scroll-margin-top: calc(var(--nav-height) + 1rem)`).
- ⚠️ **A plain anchor is wrong on desktop**: the cards only turn over near the end of About's pinned 2.5vh scrub, so `#skills` as a raw jump lands on the intro copy with the backs still hidden. New `src/lib/skillsAnchor.js` resolves the hash instead: `skillsScrollTop()` looks up the pin by id (`ABOUT_PIN_ID = 'about-pin'`, now passed to `ScrollTrigger.create` in `About.jsx`) and returns `pin.start + (pin.end − pin.start) × 0.97` — just past the last card's flip end (FLIP_START 0.62 + 2·STAGGER 0.055 + LENGTH 0.22 = 0.95). Returns `null` when no pin exists (mobile / reduced motion), where the cards already show their backs and the browser's own anchor jump is correct.
- `Navbar.jsx` `handleSectionClick` only intercepts `#skills` (preventDefault + `window.scrollTo({ behavior: 'smooth' })` + `history.replaceState`); every other tab keeps the plain-anchor behaviour. Deep links (`/#skills`, reload after clicking the tab) are corrected inside About's matchMedia block after the trigger is built — `pin.refresh()` then an instant `scrollTo`.
- Landing spot is the section's own designed end state, so cards 1 and 3 rest tilted ±15° and overlap card 2 slightly (a few trailing skill words on the Build card sit under the Refine card) — pre-existing scrub behaviour, not introduced here. Flagged to the user.

**Verified** (2026-08-23): lint + build clean; puppeteer real-scroll at 1440×900 / 1280×720 / 1024×800 — clicking Skills and deep-loading `#skills` both settle at the same scrollY (3073 / 2456 / 2730) with all three backs at opacity 1 and hit-testing to `.about-card__back` (Design / Build / Refine); reduced-motion 1440 and mobile 390 land the static card stack just under the navbar (cards top 80 / 103 vs nav bottom 77) with the drawer closing on click and no horizontal overflow; nav reads About · Skills · Projects · Journey · Contact at every width; zero console errors.
---

## Sub-feature: Simple Contact + Footer (2026-08-24, `feature/about-copy`)

User asked for a simpler Contact section and footer, with a reference screenshot (pixel-font site: centred "LET'S CONNECT" → one line → one CTA button; footer = name/role left, social icons centre, copyright right, accent rule on top). The reference was followed for **structure only** — the earthy palette, type and button styling stay ours.

- **Contact**: the validated name/email/message form is gone (user chose "drop it, button opens mail" when asked). Section is now `h2.contact__title` (centred, brand-gradient rule under it) + one `.contact__lead` line + a single `.btn--primary` `mailto:` link. Kept her existing copy — "Have a question, an opportunity, or just want to say hi?" — instead of the reference site's wording. The `.contact__header` socials row added on 2026-07-26 is also gone; socials now live only in the footer (that sub-feature's note offered exactly this consolidation).
- Old `Contact.jsx` + `Contact.css` (form, validation, mailto compose, aside/email block) archived to `context/archive/pre-simple-contact/` — never hard-deleted.
- **Footer**: three-column grid (`1fr auto 1fr`) — name + first role from `profile.roles`, the three icon links (GitHub, LinkedIn, mail — SVGs moved down from `Contact.jsx`, same per-file icon pattern), copyright right-aligned. Top edge is a 2px `--gradient-brand` `::before` instead of the old `1px solid var(--border)`, echoing the reference's accent rule and the section-heading underlines. Stacks centred below 700px.
- ⚠️ `--danger` in `themes.css` is now unused — the form's invalid-field styling was its only consumer. Left in place as a standard theme token; delete it in the next cleanup pass if it stays unused.
- The contact section keeps `section--alt`, so the alternation and the `#contact` nav anchor are unchanged.

**Verified** (2026-08-24): lint + build clean; puppeteer at 1440×900 / 768×900 / 390×844 — no `.contact-form` in the DOM, CTA reads "Get in touch" → `mailto:abirami2k1sr@gmail.com`, three footer social links, footer columns land left/centre/right on desktop and tablet (identity x176 · socials x651 · copy x821 at 1440) and stack centred at 390, no horizontal overflow; zero console errors.
---

## Sub-feature: Navbar edges + #about anchor (2026-08-27, `feature/about-copy`)

Two fixes from the user: "move the navbar content to right and left. flex" and "when I'm clicking About, it's not going to the full card section where there is the about-me description".

- **Navbar**: `.navbar__inner` was already `space-between`, but its third flex item (`.navbar__actions`, the drawer button's box) is empty on desktop, so the links floated mid-bar with the 1rem flex gap tacked on. Added `.navbar__nav { margin-left: auto }` and made `.navbar__actions` `display: none` in the base, flipping to `flex` inside the existing `max-width: 880px` block — brand hard left, links hard right, mobile untouched.
- **#about**: the About section is pinned, so a plain anchor jump landed on its *flow* position (`scroll-margin-top` above the pin start) with the intro panel half off-screen and the heading still at opacity 0. `#about` now resolves the same way `#skills` does: `src/lib/skillsAnchor.js` → **`src/lib/aboutAnchors.js`**, exporting `ABOUT_PIN_ID` and a hash-keyed `pinnedScrollTop(hash)` (`ANCHOR_PROGRESS = { '#about': 0.26, '#skills': 0.97 }`); 0.26 is just past the heading fade-in (0.1 → 0.25) and the panel's narrowing, so the copy reads as one block across the three flush cards. `Navbar.jsx` intercepts any hash the resolver answers for (not just `#skills`), and About's deep-link correction is keyed off the same call.
- Unchanged: mobile / reduced motion get `null` from the resolver and keep the browser's own anchor jump to `.about` / `.about__cards`.

**Verified** (2026-08-27): lint + build clean; puppeteer at 1440×900 / 1280×720 / 1024×800 — brand at the container's left edge and links flush to its right edge (gaps 0/0 at every width, was 0/16); clicking About and deep-loading `#about` both settle at the same scrollY (1475 / 1178 / 1310) with the card block fully in view (top 298 / 230 / 282, bottom 683 / 571 / 599), heading opacity 1 and all three backs at 0 (intro copy showing); Skills still lands at the flipped backs; mobile 390 nav unchanged (brand and button flush, no overflow) and the drawer's About link lands the section under the navbar; zero console errors.
---

## Sub-feature: Signature logo — navbar mark, favicon, intro reveal (2026-08-30, `feature/logo-brand`)

User supplied two assets in `context/logo/`: `Abi logo.png` (a hand-drawn "abi"
signature, black ink on white, 1800×1350) and `Landing logo.MP4`. Asked for the
logo in the navbar + as the title icon, and the video on the landing page. When
asked, user chose an **intro reveal overlay** for the video and **logo replaces
the wordmark** in the navbar.

### What the source assets actually are

- ⚠️ `Landing logo.MP4` is **60s long but only the first 4s have content** —
  frames 24–359 are blank white. It is a morph of the Tamil **அ** (first letter
  of Abirami) into the Latin "abi" signature, 6fps, 1280×720, H.264 + a silent
  AAC track. The last content frame is exactly the still logo, so the intro ends
  on the mark that then lives in the navbar.
- Both assets are **black ink on white**; the site is single-dark espresso, so
  the white ground had to be keyed out of both.

### Processed artifacts (kept in `public/`; scripts were scratchpad-only)

Same luminance→alpha recipe as the hero ink clutter (opaque ≤0.5, transparent
≥0.75), then trim to the ink bbox:

- `public/logo/abi-mark.png` — 147×132, cream (`--text` #f7efda) ink on
  transparent, full stroke fidelity. 3× its ~44px cap so it stays crisp.
- `public/favicon-{16,32,180}.png` — **Autumn brown (#b26b3c) ink on
  transparent**, 3% inset. (First cut was cream on an espresso tile; user:
  "the icon is boxy, i dont want any background. Make it brown".) Brown floats
  on the tab strip instead of reading as a box, and Autumn is mid-toned enough
  to hold up on both a light (#dee1e6) and a dark (#35363a) strip. With no tile,
  inset only shrinks the mark — hence 3% rather than 10%.
  **Optically sized**: the hairline strokes vanish when downscaled, so each is
  dilated before scaling — r=12 at 16px, r=8 at 32px, r=4 at 180px. r=8 was the
  ceiling before the loops close up and the "i" dot merges; undilated is
  unreadable at 16px. Dilation is a separable sliding-window max (the O(r²) disc
  version times out even compiled). ⚠️ iOS composites a transparent
  apple-touch-icon onto black — brown on black, legible, but worth knowing.
- `public/logo/landing-logo.mp4` — 59KB, 634×554, **1.33s, no audio track**.
  Trimmed to the 24 content frames, cropped to the ink bbox across *all* of them
  (never clips mid-morph), re-timed 6fps → **18fps** (first cut was 10fps/2.4s;
  user asked for it faster), and
  re-encoded as **cream ink on pure black**. Black is the key colour: the page
  composites it with `mix-blend-mode: screen`, so the ground drops into the
  espresso and only the strokes show. Baking the key into the file beats
  `filter: invert(1) + screen` in CSS — one property, no filter side effects.

### Code

- **`IntroReveal.jsx` + `.css`** (new, mounted first in `Home.jsx`): fixed
  overlay at `z-index: 200` (above the navbar's 50) on `--bg`, video blended
  with `screen`. Plays 1.33s, holds 0.27s, fades 0.35s, then **unmounts** —
  ~2.3s from navigation including load. `FADE_MS` must stay in step with the
  opacity transition in the CSS.
  - Once per session (`sessionStorage 'abi:intro-seen'`, try/caught for private
    mode). Never under reduced motion — decided in the `useState` initialiser,
    not an effect, so the overlay can't drop onto a page already being read.
  - Any pointerdown / keydown / wheel / touchmove dismisses it, and a 5s
    failsafe covers autoplay being refused (the `play()` rejection is swallowed
    — the failsafe is the real guard).
  - ⚠️ The fade timer lives in its **own effect keyed on `phase === 'fading'`**.
    Setting it inside the playing effect meant the phase change tore that effect
    down and cleared its own fade timer, stranding the overlay at opacity 0.
  - Scroll is deliberately **not locked**: `overflow: hidden` on body toggles the
    scrollbar, which shifts layout width and would corrupt ScrollTrigger's
    measurements in About/Journey. Dismiss-on-scroll instead.
  - Decorative (`aria-hidden`) with nothing focusable inside — so no keyboard
    user is stranded behind it; the first Tab dismisses it.
- **Navbar**: `firstName` + `.navbar__brand-mark` "." span replaced by an
  `<img>` (`alt={profile.name}` carries the accessible name for the home link).
  Height is `clamp(1.6rem, calc(var(--nav-h) * 0.52), 2.4rem)`, so the mark
  grows with the bar as it thickens 3.4 → 4.8rem. Hover fades to 0.75 opacity —
  a PNG can't be recoloured on hover the way the text could.
- **`index.html`**: `/favicon.svg` → the three PNG links. Vite rewrites
  index.html hrefs against `base` (verified `/Portfolio/favicon-32.png` in
  `dist/`); JS string paths still need `asset()`.
- Old `public/favicon.svg` archived to `context/archive/pre-logo-favicon/` (now
  unreferenced — never hard-deleted). A 512px tile was generated and dropped:
  nothing references it without a web manifest.

**Verified** (2026-08-30, re-verified after the speed-up + brown favicon):
lint + build clean; puppeteer real-time (no `--virtual-time-budget`) at 1440×900
and 390×844 — intro present at opacity 1 with the video playing (`duration`
1.33), fading at ~2.1s, gone by ~2.6s from navigation; favicons decode with
`cornerAlpha` 0 (no tile), 28–75% transparent pixels and mean ink #b56d3d;
reload in the same session shows no overlay; wheel dismisses mid-play;
reduced motion never renders it; navbar mark loads and scales 31.5×28.3 (thin) →
42.8×38.4 (thick) staying inside the bar, flush to the container's left edge
with the links still flush right (gaps 0/0); mobile drawer + scallop trim
unchanged, zero horizontal overflow; all three favicon `<link>`s resolve 200
through the `/Portfolio/` base; zero console errors.

---

## Sub-feature: Navbar contact cluster (2026-08-30, `feature/logo-brand`)

User: "remove the contact button in the navbar and add linkedIn, mail button."

- `SECTION_LINKS` drops `Contact`, so the nav now reads **About · Skills ·
  Projects · Journey**. New `CONTACT_LINKS` renders two icon buttons after them:
  LinkedIn (read off `profile.socials`, `target="_blank"` + `rel="noreferrer"`)
  and a `mailto:` for `profile.email`. Direct actions, not another anchor —
  which is the point of dropping the section link.
- LinkedIn/Mail SVGs are **colocated in `Navbar.jsx`**, duplicating the ones in
  `Footer.jsx`. Deliberate: the per-file icon pattern is the established house
  style here (the 2026-07-26 Contact socials did the same).
- ⚠️ `.navbar__actions` used to be `display: none` on desktop — it held only the
  drawer button, and an empty box in the flow pushed the links in by the flex
  gap (the 2026-08-27 edge-alignment fix). It now carries real content at every
  width, so it is `display: flex` in the base and the mobile block only switches
  the drawer button on. Being the last flex item, it is what sits flush to the
  container's right edge, so the edge alignment still holds.
- `.navbar__contact-link` matches `.navbar__menu-button`'s 2.4rem footprint
  (pill border, muted → `--primary` on hover) so the right side reads as one
  control cluster: `About Skills Projects Journey (in) (✉)` on desktop,
  `(in) (✉) (☰)` on mobile.
- ⚠️ The `#contact` **section is now unreachable from the navbar** — it still
  exists with its own "Get in touch" CTA, and the footer still carries all three
  socials. Flagged to the user; no anchor was left dangling (`#contact` had no
  other referrer).

**Verified** (2026-08-30): lint + build clean; puppeteer at 1440×900 / 1024×800
/ 390×844 — section links are exactly About/Skills/Projects/Journey at every
width; both buttons render an SVG in a 38×38 box, hit-test to themselves, and
carry the right href (`linkedin.com/in/abirami2k1` with `target=_blank
rel=noreferrer`; `mailto:abirami2k1sr@gmail.com`); drawer button hidden on
desktop and shown at 390; brand flush left and the cluster flush right (gaps
0/0) at every width; every control stays inside the bar once it thickens to
4.8rem; zero horizontal overflow; zero console errors.

---

## Sub-feature: About copy revision — 4 paragraphs (2026-08-30, `feature/logo-brand`)

User supplied updated About copy. `aboutLead` unchanged; `aboutParagraphs` goes
**5 → 4**:

- P1 gains "I question a lot, and learning to ask questions properly has shaped
  my path…" in place of "My curiosity drives me to discover more."
- P2 gains "The intent matters… I want to make systems that are handy for
  everyone to use."
- P3 switches tense — "I did my master's" → **"I recently graduated with my
  master's"** — and drops the REST APIs / Kafka / React dashboards detail.
- The old P4 ("I work across design and development…") is **cut entirely**.
- P5 ("Apart from work, I'm in my creative art flow…") survives as P4.

Structure untouched — still `AboutCopy` rendering into the static block and each
card front's split panel. Typographic `’` throughout (see the stripped-apostrophe
bug in the 2026-07-30 note).

- Net effect on the shortest card face: the copy got **shorter** for the first
  time in this section's history, so the type could be relaxed rather than
  squeezed. `font-size` `clamp(0.76rem, 0.95vw, 1.1rem)` → `clamp(0.76rem, 1vw,
  1.1rem)`; padding, `max-width: 58rem`, `line-height: 1.55` and the paragraph
  gaps all unchanged.
- ⚠️ **Only the vw term was touched.** The 0.76rem floor is what actually
  governs ≤1280px (0.95vw = 12.16px there, below the floor), where the face is
  tightest — raising the floor would eat the margin at 1000–1280px while doing
  nothing for wide screens. 1.05vw was tried first and rejected: growing the
  type reflows lines, so height grows **super-linearly** (+17%, not the ~10%
  the font delta suggests), leaving only 11px of margin at 1280.

**Verified** (2026-08-30): lint + build clean; puppeteer real-scroll at
1440×900 / 1280×720 / 1024×800 sampling pin progress 0 → 0.6 — copy vs shortest
face 313/367, 298/322, 277/299, `panel.scrollHeight === clientHeight` at every
sample (zero clip, ≥22px margin at all three); 16 paragraph nodes = 4 paragraphs
× (static block + 3 card panels); `#about` still lands at scrollY 1475 with
backs at 0 and the card block in view, `#skills` at 3073 with all three backs at
1 — unchanged, since both are keyed to scrub progress, not pixels; mobile 390
and reduced-motion 1440 render the static block with all 4 paragraphs, no clip,
no horizontal overflow; zero console errors.

⚠️ **Left alone, flagged to the user**: "I recently graduated" now contradicts
two other places that still read as in-progress — `journey.js` `ms-iu` summary
("The current stop — going deeper into computer science at IU Bloomington,
graduating May 2026") plus its "Now" chip, and `profile.summary` ("Currently
pursuing an MS…", which is not currently rendered anywhere).

---

## Sub-feature: Journey copy + site-wide em dash removal (2026-08-30, `feature/logo-brand`)

User supplied new journey copy for four milestones and asked to "remove
'—' (m dashes) wherever used".

### Journey copy

All four supplied summaries replace the AI-written ones, in the user's voice:

- `btech-cit` — "Built my computer science foundations here, and figured out the
  practical side of the theory we studied." Title also takes the user's wording:
  `Bachelor of Information Technology` → **`Bachelor’s in Information Technology`**.
- `intern-mrcooper` — "Built REST APIs for a document-classification proof of
  concept and automated loan workflows that had been done by hand."
- `se-mrcooper` — "Built the systems underwriters relied on daily: validation
  dashboards, Kafka pipelines, and a rules engine that let non-engineers change
  loan logic without touching code."
- `ms-iu` — "Completed my master’s with a focus on user experience and app
  development." This also **resolves the tense conflict flagged on the About
  revision** ("I recently graduated" vs the old "The current stop"). Note the
  "Now" chip was never actually rendering: it keys off `stop.current`, which no
  milestone sets — earlier notes in this file claiming otherwise were drift.
- The `details` arrays on both Mr. Cooper roles were **kept** (the user gave
  summaries, not replacements for the toggle depth), reworded off em dashes.
- ⚠️ Display order is unchanged — **latest first**, as the map is designed. The
  user's list was written earliest-first, which reads as how they typed it
  rather than a reordering request.
- **`ta-luddy` (Teaching Assistant, AI on Ramp) is not in the user's list but
  was kept** — a real role, and dropping it is a deletion, not an edit. Asked;
  user confirmed **keep** (2026-08-30), so the map stays at 5 milestones and the
  TA summary keeps its existing wording (reworded off em dashes only).

### Em dash removal

Scope taken as **user-visible copy**, not code comments: comments and the
`context/**` docs are thick with em dashes and rewriting them is a large diff
with no rendered effect. Each removal is a deliberate rewrite (the dash is doing
appositive work, so a colon or comma takes over), not a blind swap:

- `journey.js` — every `period` goes em → **en** dash (`Aug 2024 – May 2026`),
  matching the user's own "2018 – 2022" notation; `Teaching Assistant — AI on
  Ramp` → `Teaching Assistant, AI on Ramp`; all summaries and `details` reworded.
- `projects.js` — 4 descriptions, em dash → colon.
- `profile.js` — `tagline` and `summary`, em dash → colon (neither is rendered
  today, but both are content).
- `index.html` — the meta description.
- `about.js` had none in copy (only comments); the About copy added earlier
  today was already clean.

**Verified** (2026-08-30): lint + build clean; puppeteer real-scroll at 1440×900
and 390×844 — all 5 milestones render with the new copy and reveal (opacity 1)
after a real scroll through the section; chips read the en-dash ranges; a
`TreeWalker` over every text node in `<body>` plus every `alt` / `title` /
`aria-label` and the meta description finds **zero em dashes**; the details
toggle on both Mr. Cooper roles flips to a 4- and 3-item back with no clipping
and no card-height jump; zero horizontal overflow at 390; zero console errors.

---

## Sub-feature: Design pillar copy + card numbers removed (2026-08-31, `feature/logo-brand`)

User supplied real Design-pillar content (it had been ✏️ placeholder since the
section was built) and asked to drop the `( 01 ) ( 02 ) ( 03 )` numbers.

- `about.js` Design pillar: new `tagline` field ("Where it starts. Always on
  paper first.") and three groups — UX & product (5), Interfaces (6), Visual art
  (4). Replaces the old 3×3 (`Visual Art` / `Interfaces` / `This Site`); the
  "This Site" group is gone. Labels take the user's sentence case.
- The user's copy used em dashes as shorthand separators (`( 01 ) Design — …`,
  `UX & product — Figma · …`). **Rendered as structure, not literal dashes** —
  the tagline is its own element and the group label/items split is what the
  `<dl>` already does — so the site stays em-dash-free per yesterday's request.
- `number` dropped from all three pillars in the data, the `.about-card__number`
  span from `About.jsx`, and its two CSS rules (base + animated override).
- ⚠️ **Only Design has a tagline.** The user gave one line, for one pillar;
  writing taglines for Build and Refine would be inventing copy. Rendered
  conditionally. Flagged — the three cards read slightly asymmetrically until
  the other two get one.
- ⚠️ Projects cards carry the same `( 0N )` treatment (`Projects.jsx`, from
  `index + 1`). **Left alone** — the user named exactly three numbers, which
  matches About. Flagged.

### Fit (the part that needed real measurement)

The Design back went from 9 skill items to 15 plus a tagline, and
`.about-card__back` is `position: absolute; inset: 0; overflow: hidden` in the
animated layout.

- ⚠️ **First measurement attempt was wrong.** Summing children's
  `offsetTop + offsetHeight` reported "spare 0px" identically at 1024 and 1000 —
  the `<dl>` is a flex child being *squashed*, so its clamped height reads as a
  perfect fit and `scrollHeight - clientHeight` stays 0. The honest probe is the
  **last `<dd>`'s `getBoundingClientRect().bottom` vs the back's padding edge**.
- ⚠️ **First fix attempt was also wrong**: tuning padding/gap/`dd` font on the
  base rules did nothing, because the `@media (min-width: 1000px)` animated
  block already overrides all three. It only made the *static/mobile* layout
  tighter, so it was reverted. The compact overrides in that block are the
  lever. Removing the number let `.about-card__title` lose its top margin, and a
  compact `.about-card__tagline` override bought the rest: Design's clearance at
  1000–1024px went **3.3px → 16px**.

### Content errors, and how they were finally caught

Writing the new pillar I dropped `Colour study` from Visual art and typed
`Color schema` for `Color systems`. Both survived a screenshot review; diffing
the parsed `about.js` against the user's list caught them.

⚠️ **Then they came back.** The fixes were verified green against the *file*, but
the next turn's live-DOM check found the old values still rendering — and
`src/data/about.js` on disk had reverted both. The file was open in the IDE
(an `<ide_opened_file>` event fired), so the editor almost certainly wrote a
stale buffer over the edits between turns. Re-applied and confirmed at all three
layers: disk, `dist/` bundle, and the module the dev server actually serves,
then the rendered DOM.

**Lesson: assert copy against the live DOM, not the file and not a screenshot.**
A file-level check passes even when the running page disagrees, and 11px text
rotated -15° is genuinely unreadable in a screenshot — the eye-check that looked
wrong here was right, and the file-check that looked right was stale.

### Taglines for all three (2026-08-31, follow-up)

User supplied the other two, resolving the asymmetry flagged above: Build =
"Where ideas become real.", Refine = "Where good becomes reliable." Adding them
cost ~22px of card height each, dropping **Refine to 5.8px clearance** at
1000–1024px (4 groups + tagline is the binding case). Bought back in the
animated block only: title `margin-bottom` 0.6 → 0.45rem, tagline
`margin-bottom` 0.7 → 0.5rem, `.about-card__groups` gap 0.55 → 0.45rem.
Refine 5.8 → **15.9px**; Design 24.5px, Build 28.9px.

**Verified** (2026-08-31): lint + build clean; all 15 Design items + 3 labels +
all 3 taglines diffed against the user's lists **in the live DOM** (exact match,
no extra groups);
puppeteer real-scroll landing on the flipped backs via the Skills anchor at
1440×900 / 1280×720 / 1024×800 / 1000×700 — no `.about-card__number` in the DOM,
last line clears the padding edge by 104 / 51 / 16 / 16px, `dl` not squashed;
mobile 390 static layout renders the tagline, all three titles, zero clip, zero
horizontal overflow; zero console errors.
- Occlusion in the fanned end state re-measured (cards 1 and 3 rest at ±15° over
  card 2): Design's last line 4% hidden at 1440, 8% at 1280; Build's last line
  2% / 6%. Pre-existing behaviour, marginally more visible with longer lines.

---

## Sub-feature: Patient Observation Tracker project (2026-08-31, `feature/logo-brand`)

User supplied a write-up + repo link for a Spring Boot clinical-record project,
asking to "add Project 2".

- Inserted at **index 1** (the literal reading of "Project 2"), so the order is
  knowHer → Patient Observation Tracker → Personal Portfolio → ✏️ placeholder.
- ⚠️ **The section is hard-wired to exactly four cards.** `Projects.css` declares
  `.project-card--1..4` for both the card colours (`--project-card-N-bg/-fg`)
  and the sticky cascade tops; a fifth entry renders with **no background and no
  sticky offset**. So adding one meant retiring a placeholder rather than
  growing the list. Dropped `project-three`, keeping `project-four` so the
  remaining placeholder's name still matches its slot. A warning block now sits
  at the top of `projects.js`.
  - Side effect: `project-three` was the entry demoing the hosted state (the
    only one with a `liveUrl`), so no card currently renders the "Live site"
    button. The new project *is* deployed to Render but the user gave no URL.
- The user's text used an em dash to separate title from description; that maps
  onto the `title` / `description` split, so no em dash entered the data. The
  `→` arrows in the architecture chain are not em dashes and were kept.
- `tech`: Spring Boot · SQLite · Docker · GitHub Actions · Render.

### ⚠️ The description did not fit, and had to be trimmed

The supplied copy is **564 chars against a design tuned for ~160** (the file's
own comment says "two or three lines"). Card height is a fixed
`clamp(430px, 100svh - 24.5rem, 640px)`, so long copy overflows the rounded
background — and nothing sets `overflow: hidden`, so it visibly spills.

Measured overflow of the text column past `.project-card__inner`'s padding edge:
**-27px at 1440×800, -24px at 1280×720, -16px at 1024×800, -40px at 390×844**;
only a tall 1440×900 fitted. Trimmed to **360 chars** by dropping the third
sentence (Docker multi-stage build / Render / GitHub Actions pipeline) — the
least distinctive of the three, and already carried by the tech chips. Now
+61/+12/+14/+23/+35px spare across those viewports.

⚠️ **410px is the card's floor** (the clamp bottoms out at both 800px and 720px
viewport heights), so the +12px worst case is the true worst case, not a lucky
sample. Restoring the third sentence would need taller cards, which in turn
breaks the tuning that keeps the 4th card fully on screen.

### ⚠️ Two false alarms from a bad probe (worth not repeating)

The first measurement pass reported `bg MISSING` on **all four** cards and a
uniform `spare -344px` at 1440×800 — both wrong, and both flagged as ❌:

- Background is on `.project-card__inner`, not `.project-card`, which is
  transparent by design.
- The probe took the lowest of description/links/**media**; `.project-card__media`
  is `aspect-ratio: 16/10` and clips itself, so it legitimately extends lowest.

**A failure identical across untouched cards is a probe bug, not a regression.**
The signal that mattered was the one that differed per-card (mobile: -40px on
card 2 vs +140px on the others).

**Verified** (2026-08-31): lint + build clean; puppeteer real-scroll at 1440×900
/ 1440×800 / 1280×720 / 1024×800 / 390×844 — 4 cards, correct modifier classes
1..4, numbers ( 01 )..( 04 ), GitHub button on card 2 pointing at
`abirami2k1/Patient-Observations-Tracker`, chips correct, text column inside the
card at every viewport; description re-read **from the live DOM** (360 chars, no
em dash) per the [[verify-copy-against-live-dom]] lesson; cascade swept from the
section top and hits exactly the documented `[184, 248, 312, 376]` at +1500px,
so the geometry is unchanged; no em dash anywhere in body text; zero horizontal
overflow; zero console errors.

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
