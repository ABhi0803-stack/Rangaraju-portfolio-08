import { useRef } from 'react'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'
import { useReveal } from '../hooks/useReveal'
import s from './Contact.module.css'

const year = new Date().getFullYear()

const LINKS = [
  {
    label: 'Email',
    val: 'rangarajabhi333@gmail.com',
    href: 'mailto:rangarajabhi333@gmail.com',
    primary: true,
    icon: (
      <svg viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="2" y="5" width="18" height="13" rx="2.5" stroke="currentColor" strokeWidth="1.4"/>
        <path d="M2 8.5l9 6 9-6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    label: 'LinkedIn',
    val: 'rangaraju-r-2b2464238',
    href: 'https://www.linkedin.com/in/rangaraju-r-2b2464238',
    icon: (
      <svg viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="2" y="2" width="18" height="18" rx="4" stroke="currentColor" strokeWidth="1.4"/>
        <path d="M7 10v6M7 7v.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
        <path d="M11 16v-3c0-1.5.9-2.3 2-2.3s2 .8 2 2.3v3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    label: 'GitHub',
    val: 'ABhi0803-stack',
    href: 'https://github.com/ABhi0803-stack',
    icon: (
      <svg viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M11 2C6.03 2 2 6.03 2 11c0 3.98 2.58 7.36 6.16 8.55.45.08.61-.2.61-.43v-1.52c-2.5.54-3.03-1.2-3.03-1.2-.41-1.04-.99-1.32-.99-1.32-.81-.55.06-.54.06-.54.9.06 1.37.92 1.37.92.8 1.36 2.09.97 2.6.74.08-.58.31-.97.57-1.2C6.93 14.6 4.9 13.84 4.9 10.47c0-.97.35-1.77.92-2.39-.09-.23-.4-1.13.09-2.36 0 0 .75-.24 2.45.92A8.5 8.5 0 0 1 11 6.28c.76 0 1.52.1 2.24.3 1.7-1.16 2.45-.92 2.45-.92.49 1.23.18 2.13.09 2.36.57.62.92 1.42.92 2.39 0 3.38-2.04 4.12-3.98 4.34.31.27.59.8.59 1.61v2.39c0 .23.16.51.62.43C17.43 18.36 20 14.98 20 11c0-4.97-4.03-9-9-9z" fill="currentColor"/>
      </svg>
    ),
  },
]

export default function Contact() {
  const { ref, inView } = useReveal()
  const sectionRef = useRef()
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] })

  /* Parallax storytelling: title drifts up, card drifts less */
  const titleY = useTransform(scrollYProgress, [0, 1], [60, -60])
  const cardY  = useTransform(scrollYProgress, [0, 1], [30, -30])
  const sTitleY = useSpring(titleY, { stiffness: 50, damping: 20 })
  const sCardY  = useSpring(cardY,  { stiffness: 50, damping: 20 })

  return (
    <section id="contact" className={s.contact} ref={sectionRef}>
      {/* Marquee belt */}
      <div className={s.marqueeWrap}>
        <div className={s.marqueeInner} aria-hidden>
          {[...Array(8)].map((_, i) => (
            <span key={i} className={s.marqueeItem}>
              Let&apos;s Work Together
              <span className={s.marqueeSep}>
                <svg viewBox="0 0 12 12" fill="none"><circle cx="6" cy="6" r="3" fill="var(--coral)"/></svg>
              </span>
            </span>
          ))}
        </div>
      </div>

      <div className="section-wrap" ref={ref}>
        <div className={s.grid}>

          {/* Left — title + copy */}
          <motion.div className={s.left} style={{ y: sTitleY }}>
            <motion.div className="eyebrow"
              initial={{ opacity:0, y:20 }} animate={inView?{opacity:1,y:0}:{}}
              transition={{ duration:.6 }}>
              04 — Contact
            </motion.div>
            <motion.h2 className={`sec-title ${s.bigTitle}`}
              initial={{ opacity:0, y:40 }} animate={inView?{opacity:1,y:0}:{}}
              transition={{ duration:.9, delay:.1, ease:[.16,1,.3,1] }}>
              Let&apos;s Build<br />
              <span className="accent">Something</span><br />
              <span className="ghost">Great.</span>
            </motion.h2>
            <motion.p className={s.sub}
              initial={{ opacity:0, y:24 }} animate={inView?{opacity:1,y:0}:{}}
              transition={{ duration:.8, delay:.25, ease:[.16,1,.3,1] }}>
              Open to full-time QA roles, automation consulting, and full-stack development projects.
              Whether you need bulletproof test coverage or a polished web application — I&apos;m ready to contribute.
            </motion.p>
          </motion.div>

          {/* Right — contact card */}
          <motion.div className={s.right} style={{ y: sCardY }}>
            <motion.div className={s.card}
              initial={{ opacity:0, x:48 }} animate={inView?{opacity:1,x:0}:{}}
              transition={{ duration:.9, delay:.2, ease:[.16,1,.3,1] }}
            >
              {/* Card header */}
              <div className={s.cardHeader}>
                <span className={s.cardTitle}>Get In Touch</span>
                <span className={s.cardStatus}>
                  <span className={s.statusDot}/>
                  Available {year}
                </span>
              </div>

              {/* Links */}
              <div className={s.links}>
                {LINKS.map((l, i) => (
                  <motion.a
                    key={l.label}
                    href={l.href}
                    target={l.href.startsWith('mailto') ? undefined : '_blank'}
                    rel="noopener noreferrer"
                    className={`${s.link} ${l.primary ? s.primary : ''}`}
                    initial={{ opacity:0, y:18 }}
                    animate={inView ? { opacity:1, y:0 } : {}}
                    transition={{ duration:.65, delay:.38 + i*.12, ease:[.16,1,.3,1] }}
                    whileHover={{ x: 6, transition: { duration:.2 } }}
                  >
                    <span className={s.linkIcon}>{l.icon}</span>
                    <span className={s.linkBody}>
                      <span className={s.linkLabel}>{l.label}</span>
                      <span className={s.linkVal}>{l.val}</span>
                    </span>
                    <svg className={s.arrow} width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <path d="M2 7h10M7 2l5 5-5 5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </motion.a>
                ))}
              </div>

              {/* Tech SVG bar */}
              <div className={s.techBar}>
                {/* QA tools icons */}
                {[
                  { label: 'Selenium', col: 'var(--green)' },
                  { label: 'TestNG',   col: 'var(--blue)' },
                  { label: 'Java',     col: 'var(--amber)' },
                  { label: 'React',    col: 'var(--green)' },
                  { label: 'Node.js',  col: 'var(--blue)' },
                ].map(t => (
                  <span key={t.label} className={s.techPill} style={{ borderColor: t.col, color: t.col }}>
                    {t.label}
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
