import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useReveal } from '../hooks/useReveal'
import s from './About.module.css'
import profileImg from '../assets/profile.jpg'

const FV = (d=0) => ({
  hidden:{ opacity:0, y:32 },
  show:{ opacity:1, y:0, transition:{ duration:0.82, delay:d, ease:[0.16,1,0.3,1] } }
})

export default function About() {
  const { ref, inView } = useReveal()
  const imgRef = useRef()
  const { scrollYProgress } = useScroll({ target:imgRef, offset:['start end','end start'] })
  const imgY = useTransform(scrollYProgress, [0,1], ['-5%','5%'])

  return (
    <section id="about">
      <div className="section-wrap">
        <div className={s.grid} ref={ref}>
          <motion.div className={s.photoCol}
            initial={{ opacity:0, x:-44 }}
            animate={inView?{opacity:1,x:0}:{}}
            transition={{ duration:0.9, ease:[0.16,1,0.3,1] }}
          >
            <div className={s.frame} ref={imgRef}>
              <svg className={s.cornerSvg} viewBox="0 0 120 120" fill="none">
                <path d="M10 4H4v6"  stroke="var(--blue)" strokeWidth="1.5" strokeLinecap="round"/>
                <path d="M110 4h6v6" stroke="var(--blue)" strokeWidth="1.5" strokeLinecap="round"/>
                <path d="M4 110v6h6" stroke="var(--blue)" strokeWidth="1.5" strokeLinecap="round"/>
                <path d="M116 110v6h-6" stroke="var(--blue)" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
              <motion.img
                src={profileImg}
                alt="Rangaraju R"
                className={s.photo}
                style={{ y: imgY }}
                
              />
              <div className={s.colorOverlay}/>
            </div>
            <motion.div className={s.floatTag}
              initial={{opacity:0,x:-18,y:18}} animate={inView?{opacity:1,x:0,y:0}:{}}
              transition={{duration:0.7,delay:0.4,ease:[0.16,1,0.3,1]}}
              whileHover={{scale:1.05,rotate:-1}}>
              QA Engineer<br/>
              <span style={{fontSize:10,opacity:0.8}}>Full Stack Dev</span>
            </motion.div>
            <motion.div className={s.status}
              initial={{opacity:0,scale:0.85}} animate={inView?{opacity:1,scale:1}:{}}
              transition={{duration:0.6,delay:0.55,ease:[0.16,1,0.3,1]}}>
              <span className={s.statusDot}/>Open to Work
            </motion.div>
          </motion.div>

          <div>
            <motion.div className="eyebrow" variants={FV(0)}   initial="hidden" animate={inView?'show':'hidden'}>01 — About Me</motion.div>
            <motion.h2  className="sec-title" variants={FV(0.1)} initial="hidden" animate={inView?'show':'hidden'}>
              Who<br/><span className="ghost">I Am</span>
            </motion.h2>
            <motion.p className={s.body} variants={FV(0.18)} initial="hidden" animate={inView?'show':'hidden'}>
              I'm <strong>Rangaraju R</strong> — a QA Automation Engineer and Full Stack Developer. I build systems, then make sure they're unbreakable.
            </motion.p>
            <motion.p className={s.body} variants={FV(0.26)} initial="hidden" animate={inView?'show':'hidden'}>
              My core strength is test automation — Selenium WebDriver, Java, TestNG, RESTAssured, Page Object Model, and Jenkins CI/CD pipelines that catch bugs before production.
            </motion.p>
            <motion.p className={s.body} variants={FV(0.33)} initial="hidden" animate={inView?'show':'hidden'}>
              On the development side I craft full-stack web apps with React, Node.js and Express, bringing a QA engineer's precision to every feature I ship.
            </motion.p>

            <motion.div className={s.svgDiagram} variants={FV(0.41)} initial="hidden" animate={inView?'show':'hidden'}>
              <svg viewBox="0 0 320 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="320" height="80" rx="6" fill="var(--bg2)" stroke="var(--border)" strokeWidth="1"/>
                <text x="12" y="22" fontFamily="JetBrains Mono" fontSize="9" fill="var(--muted2)" letterSpacing="2">QA AUTOMATION</text>
                <rect x="12" y="28" width="296" height="4" rx="2" fill="var(--bg3)"/>
                <motion.rect x="12" y="28" height="4" rx="2" fill="var(--green)"
                  initial={{width:0}} animate={inView?{width:272}:{width:0}}
                  transition={{duration:1.6,delay:0.6,ease:[0.16,1,0.3,1]}}/>
                <text x="312" y="34" fontFamily="JetBrains Mono" fontSize="8" fill="var(--green)" textAnchor="end">92%</text>
                <text x="12" y="56" fontFamily="JetBrains Mono" fontSize="9" fill="var(--muted2)" letterSpacing="2">FULL STACK DEV</text>
                <rect x="12" y="62" width="296" height="4" rx="2" fill="var(--bg3)"/>
                <motion.rect x="12" y="62" height="4" rx="2" fill="var(--blue)"
                  initial={{width:0}} animate={inView?{width:243}:{width:0}}
                  transition={{duration:1.6,delay:0.8,ease:[0.16,1,0.3,1]}}/>
                <text x="312" y="68" fontFamily="JetBrains Mono" fontSize="8" fill="var(--blue)" textAnchor="end">82%</text>
              </svg>
            </motion.div>

            <motion.div className={s.stats} variants={FV(0.48)} initial="hidden" animate={inView?'show':'hidden'}>
              {[['5+','Projects'],['3+','Test Frameworks'],['10+','Technologies']].map(([n,l])=>(
                <div key={l} className={s.stat}>
                  <div className={s.statN}>{n}</div>
                  <div className={s.statL}>{l}</div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
