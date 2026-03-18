import { useRef } from 'react'
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion'
import { useReveal } from '../hooks/useReveal'
import s from './Projects.module.css'

const PROJECTS = [
  {
    id: 'p1', num: '001', wide: true,
    accent: 'var(--green)',
    icon: (
      <svg viewBox="0 0 52 52" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="52" height="52" rx="8" fill="rgba(13,148,136,0.08)" stroke="rgba(13,148,136,0.2)" strokeWidth="1"/>
        <rect x="12" y="14" width="28" height="22" rx="3" stroke="var(--teal)" strokeWidth="1.4" fill="none"/>
        <path d="M18 23l4 4 8-8" stroke="var(--teal)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M18 34h16M26 36v4" stroke="var(--teal)" strokeWidth="1.3" strokeLinecap="round"/>
      </svg>
    ),
    title: 'Selenium Automation Framework',
    desc: 'Scalable end-to-end automation framework using Java, Selenium WebDriver 4, TestNG, and Page Object Model. Features parallel cross-browser execution, ExtentReports HTML dashboards, data-driven testing with Excel, and Jenkins CI/CD pipeline integration.',
    tags: ['Java', 'Selenium 4', 'TestNG', 'Page Object Model', 'Jenkins', 'ExtentReports', 'Maven'],
    link: 'https://github.com/ABhi0803-stack',
    linkLabel: 'View on GitHub',
  },
  {
    id: 'p2', num: '002',
    accent: 'var(--blue)',
    icon: (
      <svg viewBox="0 0 52 52" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="52" height="52" rx="8" fill="rgba(232,93,58,0.08)" stroke="rgba(232,93,58,0.2)" strokeWidth="1"/>
        <circle cx="26" cy="26" r="10" stroke="var(--coral)" strokeWidth="1.4" fill="none"/>
        <line x1="10" y1="26" x2="16" y2="26" stroke="var(--coral)" strokeWidth="1.5" strokeLinecap="round"/>
        <line x1="36" y1="26" x2="42" y2="26" stroke="var(--coral)" strokeWidth="1.5" strokeLinecap="round"/>
        <circle cx="26" cy="26" r="3" fill="var(--coral)" opacity="0.4"/>
      </svg>
    ),
    title: 'REST API Test Suite',
    desc: 'Automated REST API testing with RESTAssured — full CRUD coverage, auth flows, contract validation, and Jenkins CI/CD integration.',
    tags: ['RESTAssured', 'Java', 'Postman', 'JSON', 'CI/CD'],
    link: 'https://github.com/ABhi0803-stack',
    linkLabel: 'View on GitHub',
  },
  {
    id: 'p3', num: '003',
    accent: 'var(--amber)',
    icon: (
      <svg viewBox="0 0 52 52" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="52" height="52" rx="8" fill="rgba(180,83,9,0.08)" stroke="rgba(180,83,9,0.2)" strokeWidth="1"/>
        <rect x="10" y="10" width="14" height="14" rx="3" stroke="var(--gold)" strokeWidth="1.4"/>
        <rect x="28" y="10" width="14" height="14" rx="3" stroke="var(--gold)" strokeWidth="1.4"/>
        <rect x="10" y="28" width="14" height="14" rx="3" stroke="var(--gold)" strokeWidth="1.4"/>
        <path d="M28 35h14M35 28v14" stroke="var(--gold)" strokeWidth="1.4" strokeLinecap="round"/>
      </svg>
    ),
    title: 'Image Editor',
    desc: 'Browser-based image editor with real-time CSS filters, preset effects, and one-click download. Pure vanilla JavaScript, no dependencies.',
    tags: ['JavaScript', 'Canvas API', 'CSS Filters', 'HTML5'],
    link: 'https://abhi0803-stack.github.io/Image-Editor/',
    linkLabel: 'View Live',
  },
  {
    id: 'p4', num: '004',
    accent: 'var(--green)',
    icon: (
      <svg viewBox="0 0 52 52" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="52" height="52" rx="8" fill="rgba(13,148,136,0.08)" stroke="rgba(13,148,136,0.2)" strokeWidth="1"/>
        <path d="M14 26l6 6 18-16" stroke="var(--teal)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
        <rect x="12" y="12" width="28" height="28" rx="4" stroke="var(--teal)" strokeWidth="1.2" fill="none" opacity="0.3"/>
      </svg>
    ),
    title: 'ToDo List App',
    desc: 'Dynamic task manager with drag-and-drop reordering, priority labels, and local storage persistence across sessions.',
    tags: ['JavaScript', 'Drag & Drop API', 'LocalStorage', 'CSS'],
    link: 'https://abhi0803-stack.github.io/Project2-ToDoList/',
    linkLabel: 'View Live',
  },
  {
    id: 'p5', num: '005',
    accent: 'var(--blue)',
    icon: (
      <svg viewBox="0 0 52 52" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="52" height="52" rx="8" fill="rgba(232,93,58,0.08)" stroke="rgba(232,93,58,0.2)" strokeWidth="1"/>
        <path d="M26 10 C 26 10 12 18 12 28 C 12 34 18 40 26 40 C 34 40 40 34 40 28 C 40 18 26 10 26 10Z" stroke="var(--coral)" strokeWidth="1.4" fill="none"/>
        <circle cx="26" cy="28" r="5" stroke="var(--coral)" strokeWidth="1.3" fill="none"/>
        <line x1="26" y1="10" x2="26" y2="23" stroke="var(--coral)" strokeWidth="1.3" strokeLinecap="round" opacity="0.5"/>
      </svg>
    ),
    title: 'Snake Game',
    desc: 'Classic Snake built on HTML Canvas with progressive speed scaling, high score tracking, and smooth keyboard controls.',
    tags: ['JavaScript', 'Canvas API', 'CSS', 'HTML5'],
    link: 'https://abhi0803-stack.github.io/snake-game/',
    linkLabel: 'View Live',
  },
]

function ArrowSvg() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <path d="M2 7h10M7 2l5 5-5 5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

function ProjectCard({ p, i }) {
  const { ref, inView } = useReveal({ threshold: 0.08 })
  const cardRef = useRef()
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const rotX = useTransform(my, [-0.5, 0.5], [6, -6])
  const rotY = useTransform(mx, [-0.5, 0.5], [-6, 6])
  const sRotX = useSpring(rotX, { stiffness: 180, damping: 22 })
  const sRotY = useSpring(rotY, { stiffness: 180, damping: 22 })

  const onMove = e => {
  const r = cardRef.current.getBoundingClientRect()

  const x = (e.clientX - r.left) / r.width
  const y = (e.clientY - r.top) / r.height

  cardRef.current.style.setProperty('--x', `${x * 100}%`)
  cardRef.current.style.setProperty('--y', `${y * 100}%`)

  mx.set(x - 0.5)
  my.set(y - 0.5)
}
  const onLeave = () => { mx.set(0); my.set(0) }

  return (
    <motion.div
      ref={ref}
      className={`${s.cardOuter} ${p.wide ? s.wide : ''}`}
      initial={{ opacity: 0, y: 48 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.75, delay: (i % 3) * 0.1, ease: [0.16, 1, 0.3, 1] }}
      style={{ perspective: 1000 }}
    >
      <motion.div
        ref={cardRef}
  className={s.card}
  data-cursor="view"
        style={{ rotateX: sRotX, rotateY: sRotY, transformStyle: 'preserve-3d' }}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        whileHover={{ boxShadow: '0 20px 56px rgba(28,25,23,0.13)', borderColor: 'var(--border2)' }}
      >
        {/* top accent line */}
        <motion.div className={s.topLine} style={{ background: p.accent }} />

        <div className={s.num}>{p.num}</div>
        <div className={s.iconWrap}>{p.icon}</div>
        <div className={s.title}>{p.title}</div>
        <div className={s.desc}>{p.desc}</div>
        <div className={s.tags}>
          {p.tags.map(t => <span key={t} className={s.tag}>{t}</span>)}
        </div>
        <motion.a
        data-cursor="link"
          href={p.link} target="_blank" rel="noopener noreferrer"
          className={s.link} style={{ color: p.accent }}
          whileHover={{ gap: '14px' }}
        >
          <span>{p.linkLabel}</span>
          <ArrowSvg />
        </motion.a>
      </motion.div>
    </motion.div>
  )
}

export default function Projects() {
  const { ref, inView } = useReveal()
  return (
    <section id="projects">
      <div className="section-wrap">
        <div ref={ref}>
          <motion.div className="eyebrow" initial={{ opacity:0, y:20 }} animate={inView?{opacity:1,y:0}:{}} transition={{ duration:.6 }}>
            03 — Work
          </motion.div>
          <motion.h2 className="sec-title" initial={{ opacity:0, y:32 }} animate={inView?{opacity:1,y:0}:{}} transition={{ duration:.8, delay:.1, ease:[.16,1,.3,1] }}>
            Selected <span className="ghost">Projects</span>
          </motion.h2>
        </div>
        <div className={s.grid}>
          {PROJECTS.map((p, i) => <ProjectCard key={p.id} p={p} i={i} />)}
        </div>
      </div>
    </section>
  )
}
