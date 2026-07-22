// Resolve a public-directory asset path against Vite's base URL so it works
// both in dev (base "/") and when the site is served from a sub-path in
// production (GitHub Pages serves this repo from "/Portfolio/"). Paths in JS
// string literals are not rewritten by Vite the way index.html refs are, so
// anything pointing into public/ must go through here.
export const asset = (path) => `${import.meta.env.BASE_URL}${String(path).replace(/^\/+/, '')}`
