import { ScrollTrigger } from './gsap.js'

// The About section's pinned scrub, so its anchors can find it.
export const ABOUT_PIN_ID = 'about-pin'

// Both nav targets live inside that pin, at these points of its progress.
const ANCHOR_PROGRESS = {
  // Heading has faded in (0.1 → 0.25) and the panel has finished narrowing,
  // so the intro copy reads as one block across the three flush cards.
  '#about': 0.26,
  // Just past the last card's flip: FLIP_START 0.62 + 2 · STAGGER 0.055 +
  // LENGTH 0.22 = 0.95 — the three skill backs are showing.
  '#skills': 0.97,
}

/**
 * Where a hash that points inside the About pin should scroll to.
 *
 * Both the intro copy and the skills sit at particular points of that pinned
 * scrub, so a plain anchor jump lands on the section's flow position with the
 * cards in their starting state — copy half off-screen, backs not yet turned.
 * Returns `null` for any other hash, and for every hash when the section
 * isn't pinned (mobile / reduced motion), where the plain anchor is correct.
 */
export function pinnedScrollTop(hash) {
  const progress = ANCHOR_PROGRESS[hash]
  if (progress === undefined) return null
  const pin = ScrollTrigger.getById(ABOUT_PIN_ID)
  if (!pin) return null
  return pin.start + (pin.end - pin.start) * progress
}
