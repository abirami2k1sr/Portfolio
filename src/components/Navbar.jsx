import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { profile } from '../data/profile.js'
import { ThemeToggle } from './ThemeToggle.jsx'
import './Navbar.css'

const SECTION_LINKS = [
  { label: 'About', hash: '#about' },
  { label: 'Projects', hash: '#projects' },
  { label: 'Journey', hash: '#journey' },
  { label: 'Contact', hash: '#contact' },
]

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

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const { pathname, hash } = useLocation()
  const onHome = pathname === '/'
  const [firstName] = profile.name.split(' ')

  // Close the drawer after any navigation.
  useEffect(() => {
    setMenuOpen(false)
  }, [pathname, hash])

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

  return (
    <header className="navbar">
      <div className="navbar__inner container">
        <Link to="/" className="navbar__brand" onClick={closeMenu}>
          {firstName}
          <span className="navbar__brand-mark">.</span>
        </Link>

        <nav className="navbar__nav" aria-label="Primary">
          <ul id="primary-navigation" className={`navbar__links${menuOpen ? ' is-open' : ''}`}>
            {SECTION_LINKS.map((link) =>
              <li key={link.hash}>
                {onHome ? (
                  <a className="navbar__link" href={link.hash} onClick={closeMenu}>
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
          <ThemeToggle />
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
