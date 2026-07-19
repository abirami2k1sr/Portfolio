import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { Flip } from 'gsap/Flip'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// GSAP plugins are registered once here — import gsap/useGSAP/plugins from
// this module, never from the packages directly.
gsap.registerPlugin(useGSAP, Flip, ScrollTrigger)

export { gsap, useGSAP, Flip, ScrollTrigger }
