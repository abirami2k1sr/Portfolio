import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

// Handles scrolling on route changes:
// - navigating to /#section scrolls to that section
// - navigating without a hash scrolls back to the top
// Smoothness comes from CSS `scroll-behavior`, which already respects
// prefers-reduced-motion via global.css.
export function useScrollManager() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (hash) {
      const target = document.getElementById(hash.slice(1))
      if (target) {
        target.scrollIntoView({ block: 'start' })
        return
      }
    }
    window.scrollTo(0, 0)
  }, [pathname, hash])
}
