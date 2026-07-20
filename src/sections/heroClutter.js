// Layout config for the Hero "creative clutter" desk, adapted from
// context/codegrid-gsap-creative-clutter. Item x/y are percentages of the
// desk size, `size` is the square bounding box in px, rotation in degrees.
// Sources: context/Homepage Photos, preprocessed to transparent PNGs
// (see current-feature.md). DOM order = paint order: kolam sits right after
// notebook so it reads as stuck on the notebook page; photo stays topmost.
// `ink: true` items are white line art that inverts to black on light theme
// (kolam is teal ink instead — white would vanish on the notebook page).
// Arrangement entries may override `size` (notebook grows in notebook mode).

export const CLUTTER_ITEMS = [
  
  { id: 'loading', src: '/clutter/loading.png', size: 200, ink: true },
  { id: 'error404', src: '/clutter/error404.png', size: 200, ink: true },
  { id: 'escape', src: '/clutter/escape.png', size: 230, ink: true },
  { id: 'note', src: '/clutter/note.png', size: 550 },
  { id: 'kolam', src: '/clutter/kolam.png', size: 180 },
  { id: 'pen', src: '/clutter/penRey.png', size: 260 },

  { id: 'bison', src: '/clutter/bison.png', size: 240 },
  { id: 'photo', src: '/clutter/photo.png', size: 440 },
  { id: 'robot', src: '/clutter/robot.png', size: 250 },
  { id: 'heart', src: '/clutter/heart.png', size: 220 },
    { id: 'art', src: '/clutter/art.png', size: 250 },
]

export const ARRANGEMENTS = {
  chaos: {
    header: { x: 50, y: 47.5, center: true },
    items: [
      { id: 'robot', x: 68, y: 56, rotation: 0 },
      { id: 'loading', x: 90, y: 68, rotation: -12 },
      { id: 'error404', x: 72, y: 7, rotation: -12 },
      { id: 'heart', x: 0, y: 10, rotation: -10 },
      { id: 'escape', x: 18, y: 58, rotation: 15 },
      { id: 'note', x: -15, y: 15, rotation: 10 },
      { id: 'kolam', x: 7, y: 39, rotation: 15 },
      { id: 'pen',  x: 5, y: 13, rotation: 40 },
      { id: 'art', x: 75, y: 70, rotation: 10 },
      { id: 'bison', x: 0, y: 65, rotation: -25 },
      { id: 'photo', x: 73, y: 22, rotation: -12 },
    ],
  },
  cleanup: {
    header: { x: 65, y: 45, center: false },
    items: [
      { id: 'heart', x: 65, y: 10, rotation: 0 },
      { id: 'bison', x: 3, y: 60, rotation: 0 },
      { id: 'art', x: 80, y: 6, rotation: 90 ,size: 280 },
      { id: 'robot', x: 22, y: 62, rotation: 0 },
      { id: 'loading', x: 74, y: 70, rotation: 0 },
      { id: 'note', x: 2, y: -2, rotation: 0 },
      { id: 'kolam', x: 7, y: 22, rotation: 0 },
      { id: 'pen', x: 47, y: 18, rotation: -45 },
      { id: 'escape', x: 50, y: 60, rotation: 12 ,size: 180},
      { id: 'error404', x: 40, y: 63, rotation: 0 },
      { id: 'photo', x: 24, y: 5, rotation: 0 },
    ],
  },
  notebook: {
    header: { x: 50, y: 47.5, center: true },
    items: [
      { id: 'kolam', x: 70, y: 10, rotation: 10, size: 250  },
      { id: 'loading', x: 42, y: 63, rotation: -3 },
      { id: 'error404', x: 35, y: 4, rotation: -3 },
      { id: 'escape', x: 15, y: 32, rotation: -20 },
      { id: 'robot', x: 56, y: 60, rotation: -8 },
      { id: 'note', x: 30, y: 8, rotation: -3, size: 600 },
      { id: 'bison', x: 25, y: 20, rotation: -15 , size: 200 },
      { id: 'pen', x: 48, y: 4, rotation: 35 },
      { id: 'art', x: 20, y: 62, rotation: 50 },
      { id: 'heart', x: 25, y: 50, rotation: -20 },
      { id: 'photo', x: 63, y: 26, rotation: 10 ,size: 400 },
    ],
  },
}
