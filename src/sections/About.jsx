import { useRef } from 'react'
import { gsap, useGSAP, ScrollTrigger } from '../lib/gsap.js'
import { aboutHeading, aboutIntro, pillars } from '../data/about.js'
import './About.css'

// How many viewport-heights of scroll the section stays pinned for.
// (Reference used 4 — shortened so the hero → About transition feels quicker.)
const PIN_DISTANCE = 2.5

export function About() {
  const sectionRef = useRef(null)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()

      // Must match the About.css media query that enables the animated layout.
      mm.add('(min-width: 1000px) and (prefers-reduced-motion: no-preference)', () => {
        const section = sectionRef.current
        const heading = section.querySelector('.about__heading')
        const container = section.querySelector('.about__cards')
        const cards = gsap.utils.toArray('.about-card', section)
        const backs = gsap.utils.toArray('.about-card__back', section)

        // Every stage is derived from pin progress with gsap.set (no timed
        // one-shot tweens): card state can never lag or desync from the
        // scroll position, in either direction.
        const splitEase = gsap.parseEase('power2.inOut')
        const flipEase = gsap.parseEase('power2.inOut')
        const radiusAt = [
          gsap.utils.interpolate('20px 0px 0px 20px', '20px 20px 20px 20px'),
          gsap.utils.interpolate('0px 0px 0px 0px', '20px 20px 20px 20px'),
          gsap.utils.interpolate('0px 20px 20px 0px', '20px 20px 20px 20px'),
        ]
        // Staggered flip windows: card i turns over 0.62+i·0.055 → 0.84+i·0.055.
        const FLIP_START = 0.62
        const FLIP_LENGTH = 0.22
        const FLIP_STAGGER = 0.055
        const TILT = [-15, 0, 15]

        ScrollTrigger.create({
          trigger: section,
          start: 'top top',
          end: () => `+=${window.innerHeight * PIN_DISTANCE}`,
          scrub: 0.5,
          pin: true,
          onUpdate: (self) => {
            const { progress } = self

            // Heading fades up during 10–25% of the pin.
            const headingProgress = gsap.utils.clamp(
              0,
              1,
              gsap.utils.mapRange(0.1, 0.25, 0, 1, progress),
            )
            gsap.set(heading, {
              y: 40 * (1 - headingProgress),
              opacity: headingProgress,
            })

            // The flush panel narrows from 75% to 60% over the first quarter.
            const width = gsap.utils.clamp(
              60,
              75,
              gsap.utils.mapRange(0, 0.25, 75, 60, progress),
            )
            gsap.set(container, { width: `${width}%` })

            // The panel tears into three cards over 33–45% of the pin.
            const split = splitEase(
              gsap.utils.clamp(0, 1, gsap.utils.mapRange(0.33, 0.45, 0, 1, progress)),
            )
            gsap.set(container, { gap: `${20 * split}px` })

            // Each card flips to its skill back inside its own progress
            // window (staggered), the outer two tilting away as they turn.
            // The back also fades in with its own flip so it can never be
            // seen before its window, whatever the browser does with
            // backface-visibility on scrollable faces.
            cards.forEach((card, index) => {
              const start = FLIP_START + index * FLIP_STAGGER
              const flip = flipEase(
                gsap.utils.clamp(
                  0,
                  1,
                  gsap.utils.mapRange(start, start + FLIP_LENGTH, 0, 1, progress),
                ),
              )
              gsap.set(card, {
                borderRadius: radiusAt[index](split),
                rotationY: 180 * flip,
                y: index === 1 ? 0 : 30 * flip,
                rotationZ: TILT[index] * flip,
              })
              gsap.set(backs[index], { opacity: flip })
            })
          },
        })

        // Everything above writes inline styles via gsap.set — clear them
        // when the breakpoint stops matching so the static layout is clean.
        return () => {
          gsap.set([heading, container, ...cards, ...backs], { clearProps: 'all' })
        }
      })
    },
    { scope: sectionRef },
  )

  return (
    <section id="about" ref={sectionRef} className="about">
      <div className="about__header">
        <h2 className="about__heading">{aboutHeading}</h2>
      </div>

      {/* Shown instead of the split panel on mobile / reduced motion. */}
      <p className="about__intro-static">{aboutIntro}</p>

      <div className="about__cards">
        {pillars.map((pillar, index) => (
          <article key={pillar.id} className="about-card">
            {/* Each front shows one third of the same full-width intro panel. */}
            <div className="about-card__front" aria-hidden={index > 0 || undefined}>
              <div className="about-card__panel">
                <p className="about-card__intro">{aboutIntro}</p>
              </div>
            </div>

            <div className="about-card__back">
              <span className="about-card__number">( {pillar.number} )</span>
              <h3 className="about-card__title">{pillar.title}</h3>
              <dl className="about-card__groups">
                {pillar.groups.map((group) => (
                  <div key={group.label} className="about-card__group">
                    <dt>{group.label}</dt>
                    <dd>{group.items.join(' · ')}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
