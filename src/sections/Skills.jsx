import { useRef } from 'react'
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion'
import { useReveal } from '../hooks/useReveal'
import s from './Skills.module.css'

const SKILLS = [
  { id:'qa',    name:'QA Automation',   pct:92, accent:'var(--primary)', tags:['Selenium WebDriver','TestNG','Page Object Model','Manual Testing','SDLC/STLC','JIRA'],
    svg:<svg viewBox="0 0 48 48" fill="none"><rect width="48" height="48" rx="6" fill="rgba(174,6,0,0.07)" stroke="rgba(174,6,0,0.18)" strokeWidth="1"/><circle cx="24" cy="22" r="11" stroke="#AE0600" strokeWidth="1.5" fill="none"/><path d="M17 22l5 5 9-9" stroke="#AE0600" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/><path d="M31 33l6 6" stroke="#AE0600" strokeWidth="1.6" strokeLinecap="round"/></svg> },
  { id:'api',   name:'API Testing',     pct:88, accent:'#5B0E14',        tags:['Postman','RESTAssured','API Automation','JSON','Auth Testing','Contract Testing'],
    svg:<svg viewBox="0 0 48 48" fill="none"><rect width="48" height="48" rx="6" fill="rgba(91,14,20,0.07)" stroke="rgba(91,14,20,0.18)" strokeWidth="1"/><circle cx="24" cy="24" r="8" stroke="#5B0E14" strokeWidth="1.5" fill="none"/><line x1="8" y1="24" x2="16" y2="24" stroke="#5B0E14" strokeWidth="1.6" strokeLinecap="round"/><line x1="32" y1="24" x2="40" y2="24" stroke="#5B0E14" strokeWidth="1.6" strokeLinecap="round"/><line x1="24" y1="8" x2="24" y2="16" stroke="#5B0E14" strokeWidth="1.6" strokeLinecap="round"/><line x1="24" y1="32" x2="24" y2="40" stroke="#5B0E14" strokeWidth="1.6" strokeLinecap="round"/></svg> },
  { id:'fe',    name:'Frontend Dev',    pct:85, accent:'#D4C45A',        tags:['React.js','Next.js','JavaScript','HTML5','CSS3','Tailwind CSS'],
    svg:<svg viewBox="0 0 48 48" fill="none"><rect width="48" height="48" rx="6" fill="rgba(212,196,90,0.07)" stroke="rgba(212,196,90,0.18)" strokeWidth="1"/><rect x="8" y="12" width="32" height="22" rx="3" stroke="#D4C45A" strokeWidth="1.5" fill="none"/><path d="M16 21l4 3-4 3" stroke="#D4C45A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/><line x1="23" y1="27" x2="33" y2="27" stroke="#D4C45A" strokeWidth="1.4" strokeLinecap="round"/></svg> },
  { id:'be',    name:'Backend Dev',     pct:78, accent:'#7C6F2B',        tags:['Node.js','Express.js','REST APIs','MongoDB','SQL','Java'],
    svg:<svg viewBox="0 0 48 48" fill="none"><rect width="48" height="48" rx="6" fill="rgba(124,111,43,0.07)" stroke="rgba(124,111,43,0.18)" strokeWidth="1"/><rect x="9" y="9" width="13" height="13" rx="2" stroke="#7C6F2B" strokeWidth="1.4" fill="none"/><rect x="26" y="9" width="13" height="13" rx="2" stroke="#7C6F2B" strokeWidth="1.4" fill="none" opacity=".5"/><rect x="9" y="26" width="13" height="13" rx="2" stroke="#7C6F2B" strokeWidth="1.4" fill="none" opacity=".5"/><rect x="26" y="26" width="13" height="13" rx="2" stroke="#7C6F2B" strokeWidth="1.4" fill="none"/><line x1="22" y1="15.5" x2="26" y2="15.5" stroke="#7C6F2B" strokeWidth="1.2"/><line x1="22" y1="32.5" x2="26" y2="32.5" stroke="#7C6F2B" strokeWidth="1.2"/><line x1="15.5" y1="22" x2="15.5" y2="26" stroke="#7C6F2B" strokeWidth="1.2"/><line x1="32.5" y1="22" x2="32.5" y2="26" stroke="#7C6F2B" strokeWidth="1.2"/></svg> },
  { id:'prog',  name:'Programming',     pct:84, accent:'var(--primary)', tags:['Java','JavaScript','TypeScript','SQL','OOP','Data Structures'],
    svg:<svg viewBox="0 0 48 48" fill="none"><rect width="48" height="48" rx="6" fill="rgba(174,6,0,0.07)" stroke="rgba(174,6,0,0.18)" strokeWidth="1"/><path d="M18 17l-9 7 9 7" stroke="#AE0600" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/><path d="M30 17l9 7-9 7" stroke="#AE0600" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/><path d="M26 13l-4 22" stroke="#AE0600" strokeWidth="1.4" strokeLinecap="round" opacity=".5"/></svg> },
  { id:'devops',name:'DevOps & Tools',  pct:75, accent:'#5B0E14',        tags:['Git & GitHub','Jenkins','CI/CD','JIRA','VS Code','Eclipse','Maven'],
    svg:<svg viewBox="0 0 48 48" fill="none"><rect width="48" height="48" rx="6" fill="rgba(91,14,20,0.07)" stroke="rgba(91,14,20,0.18)" strokeWidth="1"/><path d="M24 10v7m0 14v7M10 24h7m14 0h7" stroke="#5B0E14" strokeWidth="1.6" strokeLinecap="round"/><circle cx="24" cy="24" r="7" stroke="#5B0E14" strokeWidth="1.4" fill="none"/><circle cx="24" cy="24" r="2.5" fill="#5B0E14" opacity=".4"/></svg> },
]

function TiltCard({ sk, i }) {
  const { ref, inView } = useReveal({ threshold:0.08 })
  const cr = useRef()
  const mx = useMotionValue(0), my = useMotionValue(0)
  const rx = useTransform(my,[-0.5,0.5],[7,-7])
  const ry = useTransform(mx,[-0.5,0.5],[-7,7])
  const srx = useSpring(rx,{ stiffness:200,damping:22 })
  const sry = useSpring(ry,{ stiffness:200,damping:22 })
  const onMove = e => { const r=cr.current.getBoundingClientRect(); mx.set((e.clientX-r.left)/r.width-.5); my.set((e.clientY-r.top)/r.height-.5) }
  const onLeave = () => { mx.set(0); my.set(0) }
  return (
    <motion.div ref={ref} initial={{opacity:0,y:36}} animate={inView?{opacity:1,y:0}:{}}
      transition={{duration:0.7,delay:i*0.09,ease:[0.16,1,0.3,1]}} style={{perspective:900}}>
      <motion.div ref={cr} className={s.card}
        style={{ rotateX:srx, rotateY:sry, transformStyle:'preserve-3d', '--accent':sk.accent }}
        onMouseMove={onMove} onMouseLeave={onLeave}>
        <div className={s.topLine}/>
        <div className={s.iconWrap}>{sk.svg}</div>
        <div className={s.cardName}>{sk.name}</div>
        <div className={s.tags}>{sk.tags.map(t=><span key={t} className={s.tag}>{t}</span>)}</div>
        <div className={s.barRow}>
          <span>Proficiency</span>
          <span style={{color:sk.accent,fontFamily:'var(--font-m)',fontSize:9}}>{sk.pct}%</span>
        </div>
        <div className={s.bar}>
          <motion.div className={s.fill} style={{background:sk.accent}}
            initial={{width:0}} animate={inView?{width:sk.pct+'%'}:{}}
            transition={{duration:1.4,delay:i*0.09+0.35,ease:[0.16,1,0.3,1]}}/>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default function Skills() {
  const { ref, inView } = useReveal()
  return (
    <section id="skills" style={{background:'var(--bg2)'}}>
      <div className="section-wrap">
        <div ref={ref}>
          <motion.div className="eyebrow" initial={{opacity:0,y:18}} animate={inView?{opacity:1,y:0}:{}} transition={{duration:0.6}}>02 — Expertise</motion.div>
          <motion.h2 className="sec-title" initial={{opacity:0,y:28}} animate={inView?{opacity:1,y:0}:{}} transition={{duration:0.75,delay:0.1,ease:[0.16,1,0.3,1]}}>
            My <span className="ghost">Skills</span>
          </motion.h2>
        </div>
        <div className={s.grid}>{SKILLS.map((sk,i)=><TiltCard key={sk.id} sk={sk} i={i}/>)}</div>
      </div>
    </section>
  )
}
