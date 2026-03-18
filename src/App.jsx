import { useEffect, useState } from 'react'
import Lenis from 'lenis'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Cursor      from './components/Cursor'
import ProgressBar from './components/ProgressBar'
import Loader      from './components/Loader'
import Nav         from './components/Nav'
import Hero        from './sections/Hero'
import About       from './sections/About'
import Skills      from './sections/Skills'
import Projects    from './sections/Projects'
import Contact     from './sections/Contact'
import Footer      from './sections/Footer'

gsap.registerPlugin(ScrollTrigger)

export default function App() {
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    const lenis = new Lenis({ lerp: 0.075, smoothWheel: true })
    lenis.on('scroll', ScrollTrigger.update)
    gsap.ticker.add(t => lenis.raf(t * 1000))
    gsap.ticker.lagSmoothing(0)
    return () => lenis.destroy()
  }, [])

  return (
    <>
      <Cursor />
      <ProgressBar />
      <Loader onComplete={() => setLoaded(true)} />
      <div style={{ opacity: loaded ? 1 : 0, transition: 'opacity 0.7s ease' }}>
        <Nav />
        <main>
          {loaded && <Hero />}
          <About />
          <Skills />
          <Projects />
          <Contact />
        </main>
        <Footer />
      </div>
    </>
  )
}
