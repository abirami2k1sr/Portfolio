import { useEffect, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { profile } from '../data/profile.js'
import { asset } from '../lib/asset.js'
import { pinnedScrollTop } from '../lib/aboutAnchors.js'
import './Navbar.css'

const SECTION_LINKS = [
  // About and Skills are two points of the same pinned section — the intro
  // copy and the flipped card backs. See lib/aboutAnchors.js.
  { label: 'About', hash: '#about' },
  { label: 'Skills', hash: '#skills' },
  { label: 'Projects', hash: '#projects' },
  { label: 'Journey', hash: '#journey' },
]

// Reaching out is a direct action now that Contact is off the section list, so
// these are links out rather than another anchor. Icons colocated per the
// per-file pattern (cf. Footer.jsx, Projects.jsx).
const CONTACT_LINKS = [
  {
    label: 'LinkedIn',
    href: profile.socials.find((social) => social.label === 'LinkedIn').url,
    external: true,
  },
  { label: 'Email', href: `mailto:${profile.email}`, external: false },
]

function LinkedInIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true">
      <path d="M4.98 3.5a2.5 2.5 0 1 1-.02 5 2.5 2.5 0 0 1 .02-5ZM3 9h4v12H3V9Zm7 0h3.8v1.7h.05c.53-1 1.83-2.05 3.77-2.05 4.03 0 4.78 2.65 4.78 6.1V21h-4v-5.5c0-1.31-.03-3-1.83-3-1.83 0-2.11 1.43-2.11 2.9V21h-4V9Z" />
    </svg>
  )
}

function MailIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="m22 7-10 6L2 7" />
    </svg>
  )
}

const CONTACT_ICONS = {
  LinkedIn: LinkedInIcon,
  Email: MailIcon,
}

function MenuIcon() {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
      <path d="M3 6h18M3 12h18M3 18h18" />
    </svg>
  )
}

function CloseIcon() {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
      <path d="m6 6 12 12M6 18 18 6" />
    </svg>
  )
}

// Navbar grows from THIN to THICK over the first SCROLL_RANGE pixels of scroll.
const THIN_REM = 3.4
const THICK_REM = 4.8
const SCROLL_RANGE = 200

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const { pathname, hash } = useLocation()
  const onHome = pathname === '/'
  const headerRef = useRef(null)

  // Close the drawer after any navigation.
  useEffect(() => {
    setMenuOpen(false)
  }, [pathname, hash])

  // Thicken the bar as the page scrolls. Write the CSS var straight to the
  // element (via ref) so scrolling never triggers a React re-render.
  useEffect(() => {
    const header = headerRef.current
    if (!header) return
    let frame = 0
    const apply = () => {
      frame = 0
      const progress = Math.min(window.scrollY / SCROLL_RANGE, 1)
      const height = THIN_REM + (THICK_REM - THIN_REM) * progress
      header.style.setProperty('--nav-h', `${height}rem`)
      header.style.setProperty('--nav-progress', progress.toFixed(3))
    }
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(apply)
    }
    apply()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      if (frame) cancelAnimationFrame(frame)
    }
  }, [])

  // Close the drawer on Escape.
  useEffect(() => {
    if (!menuOpen) return
    const onKeyDown = (event) => {
      if (event.key === 'Escape') setMenuOpen(false)
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [menuOpen])

  const closeMenu = () => setMenuOpen(false)

  // #about and #skills both point inside the pinned About section, where a
  // plain anchor jump lands on the section's flow position instead of the
  // scrub point that actually shows the copy / the flipped card backs.
  const handleSectionClick = (event, targetHash) => {
    closeMenu()
    const top = pinnedScrollTop(targetHash)
    if (top === null) return
    event.preventDefault()
    window.scrollTo({ top, behavior: 'smooth' })
    window.history.replaceState(null, '', targetHash)
  }

  return (
    <header className="navbar" ref={headerRef}>
      <div className="navbar__inner container">
        <Link to="/" className="navbar__brand" onClick={closeMenu}>
          <img
            className="navbar__brand-mark"
            src={asset('logo/abi-mark.png')}
            alt={profile.name}
            width="147"
            height="132"
          />
        </Link>

        <nav className="navbar__nav" aria-label="Primary">
          <ul id="primary-navigation" className={`navbar__links${menuOpen ? ' is-open' : ''}`}>
            {SECTION_LINKS.map((link) =>
              <li key={link.hash}>
                {onHome ? (
                  <a
                    className="navbar__link"
                    href={link.hash}
                    onClick={(event) => handleSectionClick(event, link.hash)}
                  >
                    {link.label}
                  </a>
                ) : (
                  <Link className="navbar__link" to={`/${link.hash}`} onClick={closeMenu}>
                    {link.label}
                  </Link>
                )}
              </li>
            )}
          </ul>
        </nav>

        <div className="navbar__actions">
          <ul className="navbar__contact" aria-label="Get in touch">
            {CONTACT_LINKS.map(({ label, href, external }) => {
              const Icon = CONTACT_ICONS[label]
              return (
                <li key={label}>
                  <a
                    className="navbar__contact-link"
                    href={href}
                    aria-label={label}
                    title={label}
                    onClick={closeMenu}
                    {...(external ? { target: '_blank', rel: 'noreferrer' } : {})}
                  >
                    <Icon />
                  </a>
                </li>
              )
            })}
          </ul>

          <button
            type="button"
            className="navbar__menu-button"
            aria-expanded={menuOpen}
            aria-controls="primary-navigation"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>
      </div>
    </header>
  )
}
