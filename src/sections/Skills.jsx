import { useRef } from 'react'
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion'
import { useReveal } from '../hooks/useReveal'
import s from './Skills.module.css'

/* Custom SVGs per skill */
const SKILLS = [
  { id:'qa', name:'QA Automation', pct:92, accent:'var(--green)',
    tags:['Selenium WebDriver','TestNG','Page Object Model','Manual Testing','SDLC / STLC','JIRA'],
    svg: <svg viewBox="0 0 48 48" fill="none"><circle cx="24" cy="22" r="11" stroke="var(--teal)" strokeWidth="1.5"/><path d="M17 22l5 5 9-9" stroke="var(--teal)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/><path d="M31 33l6 6" stroke="var(--teal)" strokeWidth="1.6" strokeLinecap="round"/><circle cx="37" cy="39" r="2.5" fill="var(--teal)" opacity="0.4"/></svg>
  },
  { id:'api', name:'API Testing', pct:88, accent:'var(--blue)',
    tags:['Postman','RESTAssured','API Automation','JSON','Auth Testing','Status Validation'],
    svg: <svg viewBox="0 0 48 48" fill="none"><circle cx="24" cy="24" r="8" stroke="var(--coral)" strokeWidth="1.5" fill="none"/><line x1="8" y1="24" x2="16" y2="24" stroke="var(--coral)" strokeWidth="1.6" strokeLinecap="round"/><line x1="32" y1="24" x2="40" y2="24" stroke="var(--coral)" strokeWidth="1.6" strokeLinecap="round"/><line x1="24" y1="8" x2="24" y2="16" stroke="var(--coral)" strokeWidth="1.6" strokeLinecap="round"/><line x1="24" y1="32" x2="24" y2="40" stroke="var(--coral)" strokeWidth="1.6" strokeLinecap="round"/><circle cx="24" cy="24" r="2.5" fill="var(--coral)" opacity="0.4"/></svg>
  },
  { id:'fe', name:'Frontend Dev', pct:85, accent:'var(--amber)',
    tags:['React.js','Next.js','JavaScript','HTML5','CSS3','Tailwind CSS'],
    svg: <svg viewBox="0 0 48 48" fill="none"><rect x="6" y="10" width="36" height="26" rx="3" stroke="var(--gold)" strokeWidth="1.5"/><path d="M14 22l5 4-5 4" stroke="var(--gold)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/><line x1="22" y1="30" x2="34" y2="30" stroke="var(--gold)" strokeWidth="1.4" strokeLinecap="round"/></svg>
  },
  { id:'be', name:'Backend Dev', pct:78, accent:'var(--green)',
    tags:['Node.js','Express.js','REST APIs','MongoDB','SQL','Java'],
    svg: <svg viewBox="0 0 48 48" fill="none"><rect x="8" y="8" width="13" height="13" rx="2.5" stroke="var(--teal)" strokeWidth="1.4" fill="none"/><rect x="27" y="8" width="13" height="13" rx="2.5" stroke="var(--teal)" strokeWidth="1.4" fill="none" opacity="0.5"/><rect x="8" y="27" width="13" height="13" rx="2.5" stroke="var(--teal)" strokeWidth="1.4" fill="none" opacity="0.5"/><rect x="27" y="27" width="13" height="13" rx="2.5" stroke="var(--teal)" strokeWidth="1.4" fill="none"/><line x1="21" y1="14.5" x2="27" y2="14.5" stroke="var(--teal)" strokeWidth="1.2"/><line x1="21" y1="33.5" x2="27" y2="33.5" stroke="var(--teal)" strokeWidth="1.2"/><line x1="14.5" y1="21" x2="14.5" y2="27" stroke="var(--teal)" strokeWidth="1.2"/><line x1="33.5" y1="21" x2="33.5" y2="27" stroke="var(--teal)" strokeWidth="1.2"/></svg>
  },
  { id:'prog', name:'Programming', pct:84, accent:'var(--blue)',
    tags:['Java','JavaScript','TypeScript','SQL','OOP','Data Structures'],
    svg: <svg viewBox="0 0 48 48" fill="none"><path d="M18 17l-9 7 9 7" stroke="var(--coral)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/><path d="M30 17l9 7-9 7" stroke="var(--coral)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/><path d="M26 12l-4 24" stroke="var(--coral)" strokeWidth="1.4" strokeLinecap="round" opacity="0.5"/></svg>
  },
  { id:'devops', name:'DevOps & Tools', pct:75, accent:'var(--amber)',
    tags:['Git & GitHub','Jenkins','CI/CD','JIRA','VS Code','Eclipse','Maven'],
    svg: <svg viewBox="0 0 48 48" fill="none"><path d="M24 10v7m0 14v7M10 24h7m14 0h7" stroke="var(--gold)" strokeWidth="1.6" strokeLinecap="round"/><circle cx="24" cy="24" r="7" stroke="var(--gold)" strokeWidth="1.4" fill="none"/><circle cx="24" cy="24" r="2.5" fill="var(--gold)" opacity="0.35"/></svg>
  },
]

/* 3D tilt card */
function TiltCard({ skill, index }) {
  const { ref, inView } = useReveal({ threshold: 0.1 })
  const cardRef = useRef()
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const rx = useTransform(y, [-0.5, 0.5], [ 8, -8])
  const ry = useTransform(x, [-0.5, 0.5], [-8,  8])
  const sx = useSpring(rx, { stiffness: 200, damping: 20 })
  const sy = useSpring(ry, { stiffness: 200, damping: 20 })

  const onMove = e => {
    const r = cardRef.current.getBoundingClientRect()
    x.set((e.clientX - r.left) / r.width  - 0.5)
    y.set((e.clientY - r.top)  / r.height - 0.5)
  }
  const onLeave = () => { x.set(0); y.set(0) }

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 44 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.75, delay: index * 0.09, ease: [0.16, 1, 0.3, 1] }}
      style={{ perspective: 900 }}
    >
      <motion.div
        ref={cardRef}
        className={s.card}
        style={{ rotateX: sx, rotateY: sy, transformStyle: 'preserve-3d' }}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        whileHover={{ boxShadow: '0 16px 48px rgba(28,25,23,0.12)', borderColor: 'var(--border2)' }}
      >
        <div className={s.cardAccent} style={{ background: skill.accent }} />
        <div className={s.iconWrap}>{skill.svg}</div>
        <div className={s.cardName}>{skill.name}</div>
        <div className={s.tags}>
          {skill.tags.map(t => <span key={t} className={s.tag}>{t}</span>)}
        </div>
        <div className={s.barWrap}>
          <div className={s.barRow}>
            <span style={{ fontFamily: 'var(--font-m)', fontSize: 9, letterSpacing: '0.1em', color: 'var(--muted2)', textTransform: 'uppercase' }}>Proficiency</span>
            <span style={{ fontFamily: 'var(--font-m)', fontSize: 9, color: skill.accent }}>{skill.pct}%</span>
          </div>
          <div className={s.bar}>
            <motion.div className={s.fill}
              style={{ background: skill.accent }}
              initial={{ width: 0 }}
              animate={inView ? { width: skill.pct + '%' } : {}}
              transition={{ duration: 1.6, delay: index * 0.09 + 0.4, ease: [0.16, 1, 0.3, 1] }}
            />
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default function Skills() {
  const { ref, inView } = useReveal()
  return (
    <section id="skills" style={{ background: 'var(--bg2)' }}>
      <div className="section-wrap">
        <div ref={ref}>
          <motion.div className="eyebrow" initial={{ opacity:0, y:20 }} animate={inView?{opacity:1,y:0}:{}} transition={{ duration:.6 }}>02 — Expertise</motion.div>
          <motion.h2 className="sec-title" initial={{ opacity:0, y:32 }} animate={inView?{opacity:1,y:0}:{}} transition={{ duration:.8, delay:.1, ease:[.16,1,.3,1] }}>
            My <span className="ghost">Skills</span>
          </motion.h2>
        </div>
        <div className={s.grid}>
          {SKILLS.map((sk, i) => <TiltCard key={sk.id} skill={sk} index={i} />)}
        </div>
      </div>
    </section>
  )
}
