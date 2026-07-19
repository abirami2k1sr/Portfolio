import { useEffect, useState } from 'react'

const TYPE_MS = 120
const ERASE_MS = 55
const HOLD_MS = 1600
const GAP_MS = 400

// Loops a typewriter through `words`: types one in, holds it, erases it,
// then moves to the next. With `enabled` false (e.g. reduced motion) it
// returns the first word, static.
export function useTypingEffect(words, enabled = true) {
  const [text, setText] = useState(() => (enabled ? '' : words[0]))

  useEffect(() => {
    if (!enabled) {
      setText(words[0])
      return undefined
    }

    let wordIndex = 0
    let length = 0
    let erasing = false
    let timer

    const tick = () => {
      const word = words[wordIndex]
      length += erasing ? -1 : 1
      setText(word.slice(0, length))

      let delay = erasing ? ERASE_MS : TYPE_MS
      if (!erasing && length === word.length) {
        erasing = true
        delay = HOLD_MS
      } else if (erasing && length === 0) {
        erasing = false
        wordIndex = (wordIndex + 1) % words.length
        delay = GAP_MS
      }
      timer = setTimeout(tick, delay)
    }

    setText('')
    timer = setTimeout(tick, GAP_MS)
    return () => clearTimeout(timer)
  }, [words, enabled])

  return text
}
