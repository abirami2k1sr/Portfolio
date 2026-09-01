import { useEffect, useRef, useState } from 'react'
import { asset } from '../lib/asset.js'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion.js'
import './IntroReveal.css'

// The clip runs 1.33s and ends on the finished mark; hold that a beat so the
// signature registers, then fade. Keep FADE_MS in step with the opacity
// transition in IntroReveal.css.
const HOLD_MS = 1600
const FADE_MS = 350
// Autoplay can be refused (data saver, an unfocused background tab). Nothing
// else dismisses the overlay on its own, so this is the hard ceiling.
const FAILSAFE_MS = 5000

const SEEN_KEY = 'abi:intro-seen'

const alreadySeen = () => {
  try {
    return sessionStorage.getItem(SEEN_KEY) === '1'
  } catch {
    // Private mode / blocked storage — just play the intro.
    return false
  }
}

const markSeen = () => {
  try {
    sessionStorage.setItem(SEEN_KEY, '1')
  } catch {
    // Nothing to do: the intro simply replays on the next visit.
  }
}

/**
 * First-load intro: the logo animation (Tamil அ morphing into the "abi"
 * signature) plays full-screen over the landing page, then fades away.
 *
 * Once per session, and never under reduced motion. Any click, key, or scroll
 * dismisses it early — the overlay never locks scrolling, so a visitor who
 * starts reading is not held up.
 */
export function IntroReveal() {
  const reducedMotion = usePrefersReducedMotion()
  // Decided once, at mount: flipping to "playing" after paint would drop the
  // overlay on top of a page the visitor is already reading.
  const [phase, setPhase] = useState(() =>
    alreadySeen() || window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'done' : 'playing',
  )
  const videoRef = useRef(null)

  // Play, and wait for whichever comes first: the clip finishing, or the
  // visitor doing anything at all.
  useEffect(() => {
    if (phase !== 'playing') return

    markSeen()
    const dismiss = () => setPhase('fading')

    const holdTimer = window.setTimeout(dismiss, HOLD_MS)
    const failsafe = window.setTimeout(dismiss, FAILSAFE_MS)
    window.addEventListener('pointerdown', dismiss)
    window.addEventListener('keydown', dismiss)
    window.addEventListener('wheel', dismiss, { passive: true })
    window.addEventListener('touchmove', dismiss, { passive: true })

    // Some browsers reject autoplay even when muted. The rejection is not worth
    // surfacing — the failsafe above still clears the overlay.
    videoRef.current?.play?.().catch(() => {})

    return () => {
      window.clearTimeout(holdTimer)
      window.clearTimeout(failsafe)
      window.removeEventListener('pointerdown', dismiss)
      window.removeEventListener('keydown', dismiss)
      window.removeEventListener('wheel', dismiss)
      window.removeEventListener('touchmove', dismiss)
    }
  }, [phase])

  // Unmount only once the fade has finished. Kept in its own effect so the
  // teardown above can't clear this timer as `phase` changes under it.
  useEffect(() => {
    if (phase !== 'fading') return
    const timer = window.setTimeout(() => setPhase('done'), FADE_MS)
    return () => window.clearTimeout(timer)
  }, [phase])

  // A preference switched on mid-play should clear the overlay immediately.
  useEffect(() => {
    if (reducedMotion) setPhase('done')
  }, [reducedMotion])

  if (phase === 'done') return null

  return (
    // Decorative: the page's own heading is the accessible landing content, and
    // there is nothing focusable in here to strand a keyboard user behind.
    <div className={`intro-reveal${phase === 'fading' ? ' is-fading' : ''}`} aria-hidden="true">
      <video
        ref={videoRef}
        className="intro-reveal__video"
        src={asset('logo/landing-logo.mp4')}
        autoPlay
        muted
        playsInline
        preload="auto"
      />
    </div>
  )
}
