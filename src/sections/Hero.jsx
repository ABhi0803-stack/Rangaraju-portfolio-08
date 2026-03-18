import { useRef, Suspense, useEffect } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { MeshDistortMaterial, Float, Environment } from '@react-three/drei'
import { EffectComposer, Bloom } from '@react-three/postprocessing'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import s from './Hero.module.css'

gsap.registerPlugin(ScrollTrigger)

/* ── 3D Objects ── */
function Sphere() {
  const mesh = useRef()
  const { mouse } = useThree()
  useFrame(st => {
    const t = st.clock.getElapsedTime()
    mesh.current.rotation.y = t * 0.09 + mouse.x * 0.12
    mesh.current.rotation.x = t * 0.06 + mouse.y * 0.1
    mesh.current.position.y = Math.sin(t * 0.35) * 0.08
  })
  return (
    <Float speed={1.1} rotationIntensity={0.2} floatIntensity={0.4}>
      <mesh ref={mesh} scale={1.85}>
        <icosahedronGeometry args={[1, 6]} />
        <MeshDistortMaterial
          color="#dbeafe"
          metalness={0.3}
          roughness={0.12}
          distort={0.18}
          speed={1.8}
          clearcoat={1}
          clearcoatRoughness={0.02}
          envMapIntensity={0.8}
        />
      </mesh>
    </Float>
  )
}

function Rings() {
  const r1 = useRef(), r2 = useRef()
  useFrame(st => {
    const t = st.clock.getElapsedTime()
    r1.current.rotation.x = t * 0.18; r1.current.rotation.z = t * 0.07
    r2.current.rotation.y = t * 0.14; r2.current.rotation.x = Math.PI/3 + t * 0.05
  })
  return (
    <>
      <mesh ref={r1}><torusGeometry args={[2.4, 0.006, 6, 140]} /><meshBasicMaterial color="#1D4ED8" transparent opacity={0.22} /></mesh>
      <mesh ref={r2}><torusGeometry args={[2.9, 0.004, 6, 140]} /><meshBasicMaterial color="#059669" transparent opacity={0.15} /></mesh>
    </>
  )
}

function SmallGems() {
  const gems = [
    { p: [-3, 1.8, -1], c: '#1D4ED8', sc: 0.13 },
    { p: [3.2,-1.4,-1],  c: '#059669', sc: 0.10 },
    { p: [-2,-2.2,-2],   c: '#D97706', sc: 0.09 },
    { p: [2.6,2.0,-2],   c: '#1D4ED8', sc: 0.08 },
    { p: [4.0,-0.3,-2],  c: '#DC2626', sc: 0.09 },
  ]
  return gems.map((g, i) => (
    <Float key={i} speed={0.7+i*.2} floatIntensity={0.8} rotationIntensity={1.1}>
      <mesh position={g.p} scale={g.sc}>
        <octahedronGeometry args={[1,0]} />
        <meshPhysicalMaterial color={g.c} metalness={1} roughness={0} emissive={g.c} emissiveIntensity={0.3} />
      </mesh>
    </Float>
  ))
}

function Scene() {
  return (
    <>
      <Environment preset="city" />
      <ambientLight intensity={0.9} color="#f0f4ff" />
      <directionalLight position={[5,8,4]} intensity={1.2} color="#e8f0ff" />
      <pointLight position={[-3,3,3]} color="#1D4ED8" intensity={5} distance={12} />
      <pointLight position={[4,-2,2]} color="#059669" intensity={3} distance={10} />
      <Sphere /><Rings /><SmallGems />
      <EffectComposer>
        <Bloom luminanceThreshold={0.8} intensity={0.6} luminanceSmoothing={0.9} />
      </EffectComposer>
    </>
  )
}

/* ── Real tech SVG logos ── */
const TECH_ICONS = [
  {
    name: 'Java',
    color: '#E76F00',
    svg: (
      <svg viewBox="0 0 128 128" style={{width:'100%',height:'100%'}}>
        <path fill="#E76F00" d="M47.617 98.12s-4.767 2.774 3.397 3.71c9.892 1.13 14.947.968 25.845-1.092 0 0 2.871 1.795 6.873 3.351-24.439 10.47-55.308-.607-36.115-5.969zm-2.988-13.665s-5.348 3.959 2.823 4.805c10.567 1.091 18.91 1.18 33.354-1.6 0 0 1.993 2.025 5.132 3.131-29.542 8.64-62.446.68-41.309-6.336z"/>
        <path fill="#E76F00" d="M69.802 61.271c6.025 6.929-1.58 13.17-1.58 13.17s15.289-7.891 8.269-17.777c-6.559-9.215-11.587-13.792 15.635-29.58 0 0-42.731 10.67-22.324 34.187z"/>
        <path fill="#5382A1" d="M102.123 108.229s3.529 2.91-3.888 5.159c-14.102 4.272-58.706 5.56-71.094.171-4.451-1.938 3.899-4.625 6.526-5.192 2.739-.593 4.303-.485 4.303-.485-4.953-3.487-32.013 6.85-13.743 9.815 49.821 8.076 90.817-3.637 77.896-9.468zM49.912 70.294s-22.686 5.389-8.033 7.348c6.188.828 18.518.638 30.011-.326 9.39-.789 18.813-2.474 18.813-2.474s-3.308 1.419-5.704 3.053c-23.042 6.061-67.544 3.238-54.731-2.958 10.832-5.239 19.644-4.643 19.644-4.643zm40.697 22.747c23.421-12.167 12.591-23.86 5.032-22.285-1.848.385-2.677.72-2.677.72s.688-1.079 2-1.543c14.953-5.255 26.451 15.503-4.823 23.74 0 .001.359-.327.468-.632z"/>
        <path fill="#E76F00" d="M76.491 1.587S89.459 14.563 64.188 34.51c-20.266 16.006-4.621 25.13-.007 35.559-11.831-10.673-20.509-20.07-14.688-28.815C58.041 28.42 81.722 22.195 76.491 1.587z"/>
        <path fill="#5382A1" d="M52.214 126.021c22.476 1.437 57-.8 57.817-11.436 0 0-1.571 4.032-18.577 7.231-19.186 3.612-42.854 3.191-56.887.874 0 .001 2.875 2.368 17.647 3.331z"/>
      </svg>
    ),
  },
  {
    name: 'Selenium',
    color: '#43B02A',
    svg: (
      <svg viewBox="0 0 128 128" style={{width:'100%',height:'100%'}}>
        <circle cx="64" cy="64" r="60" fill="#43B02A"/>
        <path fill="#fff" d="M64 20c-24.3 0-44 19.7-44 44s19.7 44 44 44 44-19.7 44-44-19.7-44-44-44zm0 80c-19.9 0-36-16.1-36-36s16.1-36 36-36 36 16.1 36 36-16.1 36-36 36z"/>
        <path fill="#fff" d="M64 36c-15.5 0-28 12.5-28 28s12.5 28 28 28 28-12.5 28-28-12.5-28-28-28zm0 48c-11 0-20-9-20-20s9-20 20-20 20 9 20 20-9 20-20 20z"/>
        <circle cx="64" cy="64" r="10" fill="#fff"/>
      </svg>
    ),
  },
  {
    name: 'React',
    color: '#61DAFB',
    svg: (
      <svg viewBox="0 0 128 128" style={{width:'100%',height:'100%'}}>
        <g fill="#61DAFB">
          <circle cx="64" cy="64" r="11.4"/>
          <path d="M64 19.7c-27.6 0-50 19.9-50 44.3s22.4 44.3 50 44.3 50-19.9 50-44.3-22.4-44.3-50-44.3zm0 80.6c-20 0-36.2-16.3-36.2-36.3S44 27.7 64 27.7s36.2 16.3 36.2 36.3S84 100.3 64 100.3z" opacity=".5"/>
          <ellipse cx="64" cy="64" rx="50" ry="19.1" transform="rotate(60 64 64)" opacity=".5"/>
          <ellipse cx="64" cy="64" rx="50" ry="19.1" transform="rotate(120 64 64)" opacity=".5"/>
          <ellipse cx="64" cy="64" rx="50" ry="19.1"/>
        </g>
      </svg>
    ),
  },
  {
    name: 'Node.js',
    color: '#339933',
    svg: (
      <svg viewBox="0 0 128 128" style={{width:'100%',height:'100%'}}>
        <path fill="#83CD29" d="M64 0L10.4 32v64L64 128l53.6-32V32z"/>
        <path fill="#fff" d="M64 16L21.3 40v48L64 112l42.7-24V40z" opacity=".2"/>
        <path fill="#fff" d="M64 122.9L14.3 93.6V34.4L64 5.1l49.7 29.3v59.2L64 122.9zm0-111L19.3 37.3v53.3L64 117l44.7-26.3V37.3L64 11.9z" opacity=".2"/>
        <path fill="#fff" d="M57.2 78.4V54.2l-8.4-4.8v29l15.2 8.8 8.4-4.8zm13.7-28.8l8.4 4.8v14.2l-8.4 4.8-8.4-4.8V54.4zm8.4 24.2l-8.4 4.8-8.4-4.8V54.4l8.4-4.8 8.4 4.8z"/>
      </svg>
    ),
  },
  {
    name: 'Jenkins',
    color: '#D33833',
    svg: (
      <svg viewBox="0 0 128 128" style={{width:'100%',height:'100%'}}>
        <path fill="#D33833" d="M64 8C33 8 8 33 8 64s25 56 56 56 56-25 56-56S95 8 64 8z"/>
        <path fill="#fff" d="M64 20c-24.3 0-44 19.7-44 44s19.7 44 44 44 44-19.7 44-44-19.7-44-44-44zm8 62h-16V54h16v28zm0-36h-16V38h16v8z"/>
      </svg>
    ),
  },
  {
    name: 'Postman',
    color: '#FF6C37',
    svg: (
      <svg viewBox="0 0 128 128" style={{width:'100%',height:'100%'}}>
        <circle cx="64" cy="64" r="60" fill="#FF6C37"/>
        <path fill="#fff" d="M64 30c-18.8 0-34 15.2-34 34s15.2 34 34 34 34-15.2 34-34-15.2-34-34-34zm16 38H56V56h24v12zm-28 0H40V56h12v12zm28-16H56V40h24v12zm-28 0H40V40h12v12z" opacity=".9"/>
        <circle cx="64" cy="64" r="12" fill="#fff" opacity=".95"/>
        <path fill="#FF6C37" d="M60 60h8v8h-8z"/>
      </svg>
    ),
  },
  {
    name: 'Git',
    color: '#F05032',
    svg: (
      <svg viewBox="0 0 128 128" style={{width:'100%',height:'100%'}}>
        <path fill="#F05032" d="M124.742 58.378L69.625 3.264a8.44 8.44 0 00-11.94 0L46.63 14.32l15.111 15.111a10.028 10.028 0 0112.68 12.76l14.554 14.554a10.033 10.033 0 1112 9.586 10.041 10.041 0 01-9.938-11.51L77.112 40.876v38.169a10.033 10.033 0 11-11.674-.283V40.23a10.025 10.025 0 01-5.439-13.18L44.996 11.94 3.258 53.68a8.44 8.44 0 000 11.94l55.117 55.118a8.44 8.44 0 0011.94 0l54.427-54.426a8.442 8.442 0 000-11.934z"/>
      </svg>
    ),
  },
  {
    name: 'TestNG',
    color: '#F4A020',
    svg: (
      <svg viewBox="0 0 128 128" style={{width:'100%',height:'100%'}}>
        <rect width="128" height="128" rx="18" fill="#F4A020"/>
        <path fill="#fff" d="M24 40h80v12H72v36H56V52H24zm0 0"/>
        <path fill="rgba(255,255,255,0.35)" d="M24 88h36V76H24zm44 0h36V76H68z"/>
      </svg>
    ),
  },
]

/* ── Status badges ── */
const BADGES = [
  { label:'247/247 Tests Passed', col:'var(--green)', bg:'rgba(5,150,105,.08)', bo:'rgba(5,150,105,.22)', pos:{ top:'24%', left:'2%' }, d:0 },
  { label:'Build #312 Successful', col:'var(--blue)',  bg:'rgba(29,78,216,.07)', bo:'rgba(29,78,216,.2)',  pos:{ top:'30%', right:'1%'}, d:1.2 },
]

export default function Hero() {
  const heroRef = useRef()
  const heroBgRef = useRef()
const nameRef = useRef()
  const year = new Date().getFullYear()
  const { scrollY } = useScroll()
  const rawY    = useTransform(scrollY, [0, 600], [0, -80])
  const springY = useSpring(rawY, { stiffness: 55, damping: 18 })
  const opacity = useTransform(scrollY, [0, 500], [1, 0])

  useEffect(() => {
    const ctx = gsap.context(() => {
      /* Set initial states immediately — no flash */
      gsap.set('.h-eye',        { opacity: 0, x: -20 })
      gsap.set('.h-name',       { opacity: 1})
      gsap.set('.h-role',       { opacity: 0, y: 18, scale: 0.9 })
      gsap.set('.h-meta',       { opacity: 0, y: 22 })
      gsap.set('.h-tech-icon',  { opacity: 0, y: 28, scale: 0.7 })

      /* Canvas zoom entrance */
      gsap.fromTo('.hero-canvas',
        { scale: 1.12, opacity: 0 },
        { scale: 1, opacity: 1, duration: 1.6, ease: 'power3.out', delay: 0.1 }
      )
      /* Eyebrow */
      gsap.to('.h-eye',
        { opacity:1, x:0, duration:0.7, delay:0.35, ease:'power3.out' }
      )
      /* Name — simple fade + slide up, no clip-path (caused ghost duplicate) */
  gsap.fromTo('.h-name span',
  {
    y: 120,
    opacity: 0,
    filter: 'blur(10px)',
    textShadow: '0px 0px 0px rgba(29,78,216,0)'
  },
  {
    y: 0,
    opacity: 1,
    filter: 'blur(0px)',
    textShadow: '0px 0px 18px rgba(29,78,216,0.35)',
    stagger: 0.05,
    duration: 1,
    delay: 0.5,
    ease: 'power4.out',
    onComplete: () => {
      gsap.to('.h-name span', {
        textShadow: '0px 0px 0px rgba(29,78,216,0)',
        duration: 1.2,
        stagger: 0.03
      })
    }
  }
)
      /* Role pills */
      gsap.to('.h-role',
        { opacity:1, y:0, scale:1, duration:0.6, stagger:0.1, delay:1.0, ease:'back.out(1.5)' }
      )
      /* Meta row */
      gsap.to('.h-meta',
        { opacity:1, y:0, duration:0.8, delay:1.3, ease:'power3.out' }
      )
      /* Tech icons stagger in from bottom */
      gsap.to('.h-tech-icon',
        { opacity:1, y:0, scale:1, duration:0.55, stagger:0.07, delay:1.5, ease:'back.out(1.7)' }
      )
    }, heroRef)
    return () => ctx.revert()
  }, [])

  useEffect(() => {
  const moveBg = (e) => {
    const x = (e.clientX / window.innerWidth - 0.5) * 20
    const y = (e.clientY / window.innerHeight - 0.5) * 20

    if (heroBgRef.current) {
      heroBgRef.current.style.transform = `translate(${x}px, ${y}px)`
    }
  }

  window.addEventListener('mousemove', moveBg)

  return () => {
    window.removeEventListener('mousemove', moveBg)
  }
}, [])

useEffect(() => {
  const el = nameRef.current

  const move = (e) => {
    const rect = el.getBoundingClientRect()
    const x = e.clientX - rect.left - rect.width / 2
    const y = e.clientY - rect.top - rect.height / 2

    gsap.to(el, {
      x: x * 0.08,
      y: y * 0.08,
      duration: 0.4,
      ease: 'power3.out'
    })
  }

  const leave = () => {
    gsap.to(el, {
      x: 0,
      y: 0,
      duration: 0.6,
      ease: 'elastic.out(1, 0.4)'
    })
  }

  el.addEventListener('mousemove', move)
  el.addEventListener('mouseleave', leave)

  return () => {
    el.removeEventListener('mousemove', move)
    el.removeEventListener('mouseleave', leave)
  }
}, [])

  return (
    <section className={s.hero} id="hero" ref={heroRef}>
      {/* ── Gradient background — NOT plain white ── */}
      <div className={s.heroBg} ref={heroBgRef} />
      <div className={s.techGrid} />

<div className={s.particles}>
  {[...Array(20)].map((_, i) => (
    <span
      key={i}
      style={{
        left: Math.random() * 100 + '%',
        top: Math.random() * 100 + '%',
        animationDelay: Math.random() * 10 + 's'
      }}
    />
  ))}
</div>


      {/* ── 3D Canvas ── */}
      <div className={`${s.canvas} hero-canvas`} style={{ opacity: 0 }}>
        <Canvas camera={{ position:[0,0,7.5], fov:48 }} gl={{ antialias:true, alpha:true }} dpr={[1,2]}>
          <Suspense fallback={null}><Scene /></Suspense>
        </Canvas>
      </div>

      {/* ── Status badges — only 2, positioned to NOT overlap text ── */}
      {BADGES.map((b, i) => (
        <motion.div key={i} className={s.badge}
          style={{ ...b.pos, color:b.col, borderColor:b.bo, background:b.bg }}
          initial={{ opacity:0, scale:0.8 }}
          animate={{ opacity:1, scale:1 }}
          transition={{ duration:0.5, delay:1.7+i*0.15, ease:[0.16,1,0.3,1] }}
          whileHover={{ scale:1.06, y:-3 }}
        >
          <span className={s.bdot} style={{ background:b.col }} />
          {b.label}
        </motion.div>
      ))}

      {/* ── Main text layer ── */}
      <motion.div 
  className={s.content} 
  style={{ y: springY }}
>
        <div className={`${s.eyebrow} h-eye`}>
          <span className={s.avdot} />
          Available for work — {year}
        </div>

  <h1 ref={nameRef} className={`${s.name} h-name`}>
  {'Rangaraju R'.split('').map((ch, i) => (
    <span key={i}>{ch === ' ' ? '\u00A0' : ch}</span>
  ))}
</h1>

        <div className={s.roles}>
          {['QA Automation Engineer', 'Full Stack Developer'].map((r, i) => (
            <span key={r} className={`${s.roleTag} h-role`}
              style={{
                opacity: 0,
                background: i===0 ? 'var(--blue)' : 'transparent',
                color:      i===0 ? '#fff'        : 'var(--muted)',
                border:     i===0 ? '1px solid var(--blue)' : '1px solid var(--border2)',
              }}>
              {r}
            </span>
          ))}
        </div>

        {/* ── Tech icons row ── */}
        <div className={s.techRow}>
          {TECH_ICONS.map(tc => (
            <motion.div
              key={tc.name}
              className={`${s.techIcon} h-tech-icon`}
              style={{ opacity: 0 }}
              title={tc.name}
              whileHover={{ scale: 1.18, y:-4, transition:{ duration:0.2 } }}
            >
              <div className={s.techIconInner}>{tc.svg}</div>
              <span className={s.techIconLabel}>{tc.name}</span>
            </motion.div>
          ))}
        </div>

        {/* ── Meta ── */}
        <div className={`${s.meta} h-meta`}>
          <div className={s.metaGrid}>
            {[
              { l:'Primary Role', v:'QA Automation Engineer' },
              { l:'Also',         v:'Full Stack Developer'   },
              { l:'Location',     v:'India · Remote Ready'   },
            ].map(m => (
              <div key={m.l} className={s.metaCell}>
                <div className={s.metaL}>{m.l}</div>
                <div className={s.metaV}>{m.v}</div>
              </div>
            ))}
          </div>
          <div className={s.ctas}>
            <motion.a href="#projects" className={s.btnP}
              whileHover={{ scale:1.04, y:-2 }} whileTap={{ scale:0.97 }}>
              View Work
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M2 7h10M7 2l5 5-5 5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </motion.a>
            <motion.a href="mailto:rangarajabhi333@gmail.com" className={s.btnO}
              whileHover={{ scale:1.04, y:-2 }} whileTap={{ scale:0.97 }}>
              Hire Me
            </motion.a>
          </div>
        </div>
      </motion.div>

      {/* Scroll hint */}
      <motion.div className={s.scroll}
        initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:2.2, duration:0.9 }}>
        <span className={s.scrollTxt}>Scroll</span>
        <span className={s.scrollLine} />
      </motion.div>
    </section>
  )
}
