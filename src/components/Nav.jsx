import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import s from './Nav.module.css'

const LINKS = [
  { href: '#about',    label: 'About'    },
  { href: '#skills',   label: 'Skills'   },
  { href: '#projects', label: 'Work'     },
  { href: '#contact',  label: 'Contact'  },
]

export default function Nav() {
  const [stuck,    setStuck]    = useState(false)
  const [mobileOpen, setMobile] = useState(false)

  useEffect(() => {
    const fn = () => setStuck(window.scrollY > 48)
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  const go = (e, href) => {
    e.preventDefault(); setMobile(false)
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <motion.nav
      className={`${s.nav} ${stuck ? s.stuck : ''}`}
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0,   opacity: 1 }}
      transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
    >
      <a href="#hero" onClick={e => go(e, '#hero')} className={s.logo}>
        Rangaraju R
      </a>

      <ul className={`${s.links} ${mobileOpen ? s.open : ''}`}>
        {LINKS.map(l => (
          <li key={l.href}>
            <a href={l.href} onClick={e => go(e, l.href)} className={s.link}>
              {l.label}
            </a>
          </li>
        ))}
      </ul>

      <a href="mailto:rangarajabhi333@gmail.com" className={s.cta}>
        Hire Me
      </a>

      <button
        className={`${s.burger} ${mobileOpen ? s.active : ''}`}
        onClick={() => setMobile(o => !o)}
        aria-label="Toggle menu"
      >
        <span /><span /><span />
      </button>
    </motion.nav>
  )
}
