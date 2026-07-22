import { useEffect, useRef, useState } from 'react'
import { Flip, gsap, useGSAP } from '../lib/gsap.js'
import { profile } from '../data/profile.js'
import { asset } from '../lib/asset.js'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion.js'
import { useTypingEffect } from '../hooks/useTypingEffect.js'
import { ARRANGEMENTS, CLUTTER_ITEMS } from './heroClutter.js'
import './Hero.css'

const ITEM_SIZES = Object.fromEntries(CLUTTER_ITEMS.map((item) => [item.id, item.size]))

function BoltIcon() {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
    </svg>
  )
}

function GridIcon() {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="3" y="3" width="7" height="7" />
      <rect x="14" y="3" width="7" height="7" />
      <rect x="14" y="14" width="7" height="7" />
      <rect x="3" y="14" width="7" height="7" />
    </svg>
  )
}

function BookIcon() {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
    </svg>
  )
}

const MODES = [
  { id: 'chaos', label: 'Chaos layout', Icon: BoltIcon },
  { id: 'cleanup', label: 'Cleanup layout', Icon: GridIcon },
  { id: 'notebook', label: 'Notebook layout', Icon: BookIcon },
]

export function Hero() {
  const deskRef = useRef(null)
  const modeRef = useRef('chaos')
  const [activeMode, setActiveMode] = useState('chaos')
  const reducedMotion = usePrefersReducedMotion()
  const typedRole = useTypingEffect(profile.roles, !reducedMotion)

  // Instantly positions the header + items for a mode (percentages of desk size).
  const setLayout = (mode) => {
    const desk = deskRef.current
    if (!desk) return
    const header = desk.querySelector('.hero__header')
    const { header: headerPos, items } = ARRANGEMENTS[mode]
    const deskWidth = desk.offsetWidth
    const deskHeight = desk.offsetHeight
    const isMobile = deskWidth < 1000

    const center = isMobile || headerPos.center
    const headerX = isMobile ? 50 : headerPos.x
    const headerY = isMobile ? 47.5 : headerPos.y
    gsap.set(header, {
      x: (headerX / 100) * deskWidth - (center ? header.offsetWidth / 2 : 0),
      y: (headerY / 100) * deskHeight - (center ? header.offsetHeight / 2 : 0),
    })

    items.forEach(({ id, x, y, rotation, size }) => {
      // Arrangements may override an item's base size (e.g. the notebook
      // grows into a text backdrop in notebook mode).
      const box = size ?? ITEM_SIZES[id]
      gsap.set(desk.querySelector(`[data-item='${id}']`), {
        x: (x / 100) * deskWidth,
        y: (y / 100) * deskHeight,
        width: box,
        height: box,
        rotation,
      })
    })
  }

  const { contextSafe } = useGSAP(
    () => {
      // The desk starts hidden (CSS opacity 0) so items don't flash unpositioned.
      setLayout(modeRef.current)
      gsap.set(deskRef.current, { autoAlpha: 1 })
    },
    { scope: deskRef },
  )

  const switchMode = contextSafe((mode) => {
    if (mode === modeRef.current) return
    modeRef.current = mode
    setActiveMode(mode)

    // Reduced motion: apply the new arrangement instantly, no Flip animation.
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setLayout(mode)
      return
    }

    const desk = deskRef.current
    const flipTargets = [desk.querySelector('.hero__header'), ...gsap.utils.toArray('.hero__item', desk)]
    const state = Flip.getState(flipTargets)
    setLayout(mode)
    Flip.from(state, {
      duration: 1.25,
      ease: 'power3.inOut',
      stagger: { amount: 0.1, from: 'center' },
      absolute: true,
    })
  })

  // Re-anchor the active arrangement when the viewport changes.
  useEffect(() => {
    const onResize = () => setLayout(modeRef.current)
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  return (
    <section id="home" className={`hero hero--${activeMode}`}>
      <div ref={deskRef} className="hero__desk">
        {CLUTTER_ITEMS.map((item) => (
          <div
            key={item.id}
            className={`hero__item${item.ink ? ' hero__item--ink' : ''}`}
            data-item={item.id}
          >
            <img src={asset(item.src)} alt="" />
          </div>
        ))}

        <div className="hero__header">
          <p className="hero__greeting">Hi, This is </p>
          <h1 className="hero__name">{profile.name}</h1>
          <p className="hero__role">
            {/* Screen readers get the full list; the typewriter is decorative. */}
            <span className="hero__role-sr">{profile.roles.join(' · ')}</span>
            <span className="hero__role-typed" aria-hidden="true">
              {typedRole}
              <span className="hero__caret" />
            </span>
          </p>
        </div>

        <div className="hero__modes" role="group" aria-label="Desk arrangement">
          {MODES.map(({ id, label, Icon }) => (
            <button
              key={id}
              type="button"
              className={`hero__mode-button${activeMode === id ? ' is-active' : ''}`}
              aria-pressed={activeMode === id}
              aria-label={label}
              title={label}
              onClick={() => switchMode(id)}
            >
              <Icon />
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}
