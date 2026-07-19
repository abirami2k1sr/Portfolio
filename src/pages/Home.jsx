import { Hero } from '../sections/Hero.jsx'
import { About } from '../sections/About.jsx'
import { Projects } from '../sections/Projects.jsx'
import { Journey } from '../sections/Journey.jsx'
import { Contact } from '../sections/Contact.jsx'
import { profile } from '../data/profile.js'
import { useDocumentTitle } from '../hooks/useDocumentTitle.js'

export default function Home() {
  useDocumentTitle(`${profile.name} · Portfolio`)

  return (
    <>
      <Hero />
      <About />
      <Projects />
      <Journey />
      <Contact />
    </>
  )
}
