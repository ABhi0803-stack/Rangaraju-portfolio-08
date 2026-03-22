import { useRef } from 'react'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import s from './Contact.module.css'

const year = new Date().getFullYear()

const LINKS = [
  {
    label: 'Email',
    val: 'rangarajabhi333@gmail.com',
    href: 'mailto:rangarajabhi333@gmail.com',
    primary: true,
    icon: (
      <svg viewBox="0 0 20 20" fill="none">
        <rect x="2" y="4" width="16" height="12" rx="2" stroke="currentColor" strokeWidth="1.4"/>
        <path d="M2 7l8 5.5L18 7" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    label: 'LinkedIn',
    val: 'rangaraju-r-2b2464238',
    href: 'https://www.linkedin.com/in/rangaraju-r-2b2464238',
    icon: (
      <svg viewBox="0 0 20 20" fill="none">
        <rect x="2" y="2" width="16" height="16" rx="3.5" stroke="currentColor" strokeWidth="1.4"/>
        <path d="M6.5 9v5M6.5 6.5v.5M10 14v-2.5c0-1.3.7-2 1.8-2 1 0 1.7.7 1.7 2V14"
          stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    label: 'GitHub',
    val: 'ABhi0803-stack',
    href: 'https://github.com/ABhi0803-stack',
    icon: (
      <svg viewBox="0 0 20 20" fill="none">
        <path d="M10 2C5.58 2 2 5.58 2 10c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38v-1
          c-1.67.36-2.02-.81-2.02-.81-.27-.7-.67-.88-.67-.88-.55-.37.04-.36.04-.36
          .6.04.92.62.92.62.54.92 1.41.65 1.75.5.05-.39.21-.65.38-.8
          -1.34-.15-2.74-.67-2.74-2.97 0-.66.24-1.19.62-1.61
          -.06-.15-.27-.76.06-1.59 0 0 .5-.16 1.65.62a5.7 5.7 0 0 1 3 0
          c1.15-.78 1.65-.62 1.65-.62.33.83.12 1.44.06 1.59
          .39.42.62.95.62 1.61 0 2.31-1.41 2.82-2.75 2.97
          .22.19.41.56.41 1.13v1.68c0 .16.11.35.41.29
          C15.71 16.53 18 13.54 18 10c0-4.42-3.58-8-8-8z"
          fill="currentColor"/>
      </svg>
    ),
  },
]

const TECH = ['Selenium', 'TestNG', 'Java', 'React', 'Node.js', 'Postman', 'Jenkins', 'Git']

export default function Contact() {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true })
  const secRef = useRef()
  const { scrollYProgress } = useScroll({ target: secRef, offset: ['start end', 'end start'] })
  const titleY = useTransform(scrollYProgress, [0, 1], [50, -50])
  const cardY  = useTransform(scrollYProgress, [0, 1], [25, -25])
  const sTY = useSpring(titleY, { stiffness: 50, damping: 20 })
  const sCY = useSpring(cardY,  { stiffness: 50, damping: 20 })

  return (
    <section id="contact" className={s.contact} ref={secRef}>
      {/* Marquee */}
      <div className={s.marqueeWrap}>
        <div className={s.marqueeInner} aria-hidden>
          {[...Array(8)].map((_, i) => (
            <span key={i} className={s.marqueeItem}>
              Let&apos;s Work Together
              <span className={s.marqueeSep}>
                <svg viewBox="0 0 10 10" fill="none">
                  <circle cx="5" cy="5" r="3" fill="#5B0E14"/>
                </svg>
              </span>
            </span>
          ))}
        </div>
      </div>

      <div className="section-wrap" ref={ref}>
        <div className={s.grid}>

          {/* Left — title */}
          <motion.div style={{ y: sTY }}>
            <motion.div className="eyebrow"
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}>
              04 — Contact
            </motion.div>

            <motion.h2 className="sec-title"
              initial={{ opacity: 0, y: 32 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.85, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}>
              Let&apos;s Build<br />
              <span style={{ color: 'var(--primary)' }}>Something</span><br />
              <span className="ghost">Great.</span>
            </motion.h2>

            <motion.p className={s.sub}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.75, delay: 0.22, ease: [0.16, 1, 0.3, 1] }}>
              Open to full-time QA roles, automation consulting, and full-stack dev projects.
              Whether you need bulletproof test coverage or a polished web application — I&apos;m ready.
            </motion.p>
          </motion.div>

          {/* Right — contact card */}
          <motion.div style={{ y: sCY }}>
            <motion.div className={s.card}
              initial={{ opacity: 0, x: 40 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.85, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}>

              <div className={s.cardHeader}>
                <span className={s.cardTitle}>Get In Touch</span>
                <span className={s.cardStatus}>
                  <span className={s.statusDot} />
                  Available {year}
                </span>
              </div>

              <div className={s.links}>
                {LINKS.map((l, i) => (
                  <a
                    key={l.label}
                    href={l.href}
                    target={l.href.startsWith('mailto') ? undefined : '_blank'}
                    rel="noopener noreferrer"
                    className={`${s.link}${l.primary ? ' ' + s.primary : ''}`}
                  >
                    <span className={s.linkIcon}>{l.icon}</span>
                    <span className={s.linkBody}>
                      <span className={s.linkLabel}>{l.label}</span>
                      <span className={s.linkVal}>{l.val}</span>
                    </span>
                    <svg className={s.arrow} width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <path d="M2 7h10M7 2l5 5-5 5" stroke="currentColor" strokeWidth="1.3"
                        strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </a>
                ))}
              </div>

              <div className={s.techBar}>
                {TECH.map(t => (
                  <span key={t} className={s.techPill}
                    style={{ color: 'var(--gold)', borderColor: 'rgba(241,225,148,0.35)' }}>
                    {t}
                  </span>
                ))}
              </div>

            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
