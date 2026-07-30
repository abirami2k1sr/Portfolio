import { createContext, useContext } from 'react'

// The context object lives here (not in ThemeContext.jsx) so that the provider
// file only exports a component — required for reliable hot reloading.
export const ThemeContext = createContext(null)

export function useTheme() {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}
