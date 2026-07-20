import { useEffect, useRef, useState } from 'react'
import { gsap, useGSAP } from '../lib/gsap.js'
import { SectionHeading } from '../components/SectionHeading.jsx'
import { journey } from '../data/journey.js'
import './Journey.css'

// The route both paths share, in SVG user units. The viewBox stretches to the
// rows container (preserveAspectRatio="none"), so x/y are proportions of the
// map, not pixels: the curve swings toward each row's photo/empty column,
// alternating right-left from top-center to bottom-center (5 rows → 5 swings
// at ~10/30/50/70/90% of the map height).
const ROUTE_D =
  'M 500 20 C 830 110 860 150 800 240 S 260 480 230 720 S 840 960 780 1200 S 240 1440 250 1680 S 820 1920 770 2160 S 560 2320 500 2390'

function ArrowIcon() {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M5 12h14" />
      <path d="m13 6 6 6-6 6" />
    </svg>
  )
}

function MilestoneCard({ stop }) {
  const [flipped, setFlipped] = useState(false)
  const frontBtnRef = useRef(null)
  const backBtnRef = useRef(null)
  const hasFlippedRef = useRef(false)

  // The face that was clicked goes inert, which would drop keyboard/SR focus
  // to <body> — hand it to the matching button on the face now showing.
  useEffect(() => {
    if (!hasFlippedRef.current) return
    const btn = flipped ? backBtnRef.current : frontBtnRef.current
    btn?.focus({ preventScroll: true })
  }, [flipped])

  const flipTo = (next) => {
    hasFlippedRef.current = true
    setFlipped(next)
  }

  const basics = (
    <>
      <div className="journey-card__chips">
        <span className={`journey-card__chip journey-card__chip--${stop.kind.toLowerCase()}`}>
          {stop.kind}
        </span>
        <span className="journey-card__chip">{stop.period}</span>
        {stop.current && (
          <span className="journey-card__chip journey-card__chip--now">Now</span>
        )}
      </div>
      <h3 className="journey-card__title">{stop.title}</h3>
      <p className="journey-card__place">
        {stop.place}
        {stop.location && (
          <span className="journey-card__location"> · {stop.location}</span>
        )}
      </p>
      <p className="journey-card__summary">{stop.summary}</p>
    </>
  )

  if (!stop.details) {
    return <article className="journey-card">{basics}</article>
  }

  return (
    <article
      className={`journey-card journey-card--flippable${flipped ? ' journey-card--flipped' : ''}`}
    >
      <div className="journey-card__inner">
        <div className="journey-card__face journey-card__face--front" inert={flipped}>
          {basics}
          <div className="journey-card__foot">
            <button
              type="button"
              className="journey-card__flip-btn"
              onClick={() => flipTo(true)}
              ref={frontBtnRef}
            >
              What I worked on
              <ArrowIcon />
            </button>
          </div>
        </div>

        <div className="journey-card__face journey-card__face--back" inert={!flipped}>
          <p className="journey-card__back-label">What I worked on</p>
          <ul className="journey-card__highlights">
            {stop.details.map((line) => (
              <li key={line}>{line}</li>
            ))}
          </ul>
          <div className="journey-card__foot">
            <button
              type="button"
              className="journey-card__flip-btn journey-card__flip-btn--back"
              onClick={() => flipTo(false)}
              ref={backBtnRef}
            >
              <ArrowIcon />
              Back to summary
            </button>
          </div>
        </div>
      </div>
    </article>
  )
}

export function Journey() {
  const sectionRef = useRef(null)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()

      // Reduced-motion users keep the default CSS state: route fully drawn,
      // rows visible. Everything animated is layered on inside this match.
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        const section = sectionRef.current
        const map = section.querySelector('.journey__map')
        const progress = section.querySelector('.journey__route-progress')
        const length = progress.getTotalLength()

        gsap.set(progress, { strokeDasharray: length, strokeDashoffset: length })
        gsap.to(progress, {
          strokeDashoffset: 0,
          ease: 'none',
          scrollTrigger: {
            trigger: map,
            start: 'top 70%',
            end: 'bottom 80%',
            scrub: 0.5,
          },
        })

        gsap.utils.toArray('.journey__row', section).forEach((row) => {
          gsap.from(row, {
            y: 40,
            autoAlpha: 0,
            duration: 0.7,
            ease: 'power2.out',
            scrollTrigger: { trigger: row, start: 'top 85%' },
          })
        })
      })
    },
    { scope: sectionRef },
  )

  return (
    <section id="journey" ref={sectionRef} className="section journey">
      <div className="container">
        <SectionHeading
          eyebrow="The road so far"
          title="Journey"
         />
      </div>

      <div className="journey__map container">
        <div className="journey__route" aria-hidden="true">
          <svg viewBox="0 0 1000 2400" preserveAspectRatio="none" focusable="false">
            <path className="journey__route-track" d={ROUTE_D} />
            <path className="journey__route-progress" d={ROUTE_D} />
          </svg>
        </div>

        <ol className="journey__rows">
          {journey.map((stop, index) => (
            <li
              key={stop.id}
              className={`journey__row${index % 2 === 1 ? ' journey__row--flip' : ''}`}
            >
              <MilestoneCard stop={stop} />

              {stop.photo && (
                <figure className="journey__photo">
                  <img
                    src={stop.photo.src}
                    alt={stop.photo.alt}
                    loading="lazy"
                    decoding="async"
                    style={stop.photo.position ? { objectPosition: stop.photo.position } : undefined}
                  />
                  <figcaption>{stop.photo.caption}</figcaption>
                </figure>
              )}
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
