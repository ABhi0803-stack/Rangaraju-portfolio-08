import { useRef, Suspense, useEffect } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { MeshDistortMaterial, Float, Environment } from '@react-three/drei'
import { EffectComposer, Bloom } from '@react-three/postprocessing'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import s from './Hero.module.css'

gsap.registerPlugin(ScrollTrigger)

/* ─────────────────────────────────────────
   3D SCENE — burgundy/gold toned sphere
───────────────────────────────────────── */
function Sphere() {
  const m = useRef()
  const { mouse } = useThree()
  useFrame(st => {
    const t = st.clock.getElapsedTime()
    m.current.rotation.y = t * 0.08 + mouse.x * 0.1
    m.current.rotation.x = t * 0.05 + mouse.y * 0.08
    m.current.position.y = Math.sin(t * 0.35) * 0.08
  })
  return (
    <Float speed={1} rotationIntensity={0.2} floatIntensity={0.4}>
      <mesh ref={m} scale={1.75}>
        <icosahedronGeometry args={[1, 6]} />
        <MeshDistortMaterial
          color="#f8edd0"
          metalness={0.25} roughness={0.12}
          distort={0.14} speed={1.5}
          clearcoat={1} clearcoatRoughness={0.05}
          envMapIntensity={0.6}
        />
      </mesh>
    </Float>
  )
}

function Rings() {
  const r1 = useRef(), r2 = useRef()
  useFrame(st => {
    const t = st.clock.getElapsedTime()
    r1.current.rotation.x = t * 0.16; r1.current.rotation.z = t * 0.06
    r2.current.rotation.y = t * 0.12; r2.current.rotation.x = Math.PI / 3 + t * 0.04
  })
  return (
    <>
      <mesh ref={r1}><torusGeometry args={[2.3, 0.005, 6, 140]} /><meshBasicMaterial color="#5B0E14" transparent opacity={0.3} /></mesh>
      <mesh ref={r2}><torusGeometry args={[2.9, 0.004, 6, 140]} /><meshBasicMaterial color="#D4C45A" transparent opacity={0.2} /></mesh>
    </>
  )
}

function Gems() {
  const data = [
    { p: [-3.2, 1.8, -1], c: '#5B0E14', sc: 0.13 },
    { p: [ 3.1,-1.4, -1], c: '#D4C45A', sc: 0.10 },
    { p: [-2.0,-2.2, -2], c: '#5B0E14', sc: 0.09 },
    { p: [ 2.8, 2.0, -2], c: '#D4C45A', sc: 0.08 },
    { p: [ 4.0,-0.3, -2], c: '#5B0E14', sc: 0.10 },
  ]
  return data.map((d, i) => (
    <Float key={i} speed={0.7 + i * 0.2} floatIntensity={0.8} rotationIntensity={1.1}>
      <mesh position={d.p} scale={d.sc}>
        <octahedronGeometry args={[1, 0]} />
        <meshPhysicalMaterial color={d.c} metalness={1} roughness={0} emissive={d.c} emissiveIntensity={0.4} />
      </mesh>
    </Float>
  ))
}

function Scene() {
  return (
    <>
      <Environment preset="sunset" />
      <ambientLight intensity={0.9} color="#fff5e6" />
      <directionalLight position={[5, 8, 4]} intensity={1.1} color="#ffe8cc" />
      <pointLight position={[-3, 3, 3]} color="#5B0E14" intensity={4} distance={12} />
      <pointLight position={[4, -2, 2]} color="#D4C45A" intensity={3} distance={10} />
      <Sphere /><Rings /><Gems />
      <EffectComposer>
        <Bloom luminanceThreshold={0.82} intensity={0.55} luminanceSmoothing={0.9} />
      </EffectComposer>
    </>
  )
}

/* ─────────────────────────────────────────
   ANIMATED SVG CIRCUIT BOARD BACKGROUND
   — Tech-themed: looks like a PCB / code grid
   — Animated with Framer Motion path draws
───────────────────────────────────────── */
function CircuitBackground() {
  return (
    <svg className={s.circuitSvg} viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice"
      xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <defs>
        <style>{`
          @keyframes dash1 { from{stroke-dashoffset:600} to{stroke-dashoffset:0} }
          @keyframes dash2 { from{stroke-dashoffset:900} to{stroke-dashoffset:0} }
          @keyframes dash3 { from{stroke-dashoffset:400} to{stroke-dashoffset:0} }
          @keyframes nodePulse { 0%,100%{opacity:.35;r:3} 50%{opacity:.9;r:4.5} }
          @keyframes nodePulse2{ 0%,100%{opacity:.2;r:2.5} 50%{opacity:.7;r:4} }
          .cl1 { stroke:#5B0E14; stroke-dasharray:600; animation:dash1 4s ease forwards; animation-delay:var(--d,0s); }
          .cl2 { stroke:#5B0E14; stroke-dasharray:900; animation:dash2 6s ease forwards; animation-delay:var(--d,0s); }
          .cl3 { stroke:#D4C45A; stroke-dasharray:400; animation:dash3 3.5s ease forwards; animation-delay:var(--d,0s); }
          .nd1 { fill:#5B0E14; animation:nodePulse 2.8s ease-in-out infinite; animation-delay:var(--d,0s); }
          .nd2 { fill:#D4C45A; animation:nodePulse2 3.5s ease-in-out infinite; animation-delay:var(--d,0s); }
        `}</style>
      </defs>

      {/* ── Horizontal traces ── */}
      <path className="cl1" style={{'--d':'0.2s'}} fill="none" strokeWidth="1" d="M0 180 H 320 V 240 H 600"/>
      <path className="cl1" style={{'--d':'0.8s'}} fill="none" strokeWidth="1" d="M0 380 H 200 V 320 H 480 V 360 H 700"/>
      <path className="cl2" style={{'--d':'0.4s'}} fill="none" strokeWidth="1" d="M1440 120 H 1100 V 200 H 860 V 160 H 640"/>
      <path className="cl2" style={{'--d':'1.2s'}} fill="none" strokeWidth="1" d="M1440 520 H 1200 V 480 H 960 V 540 H 780"/>
      <path className="cl1" style={{'--d':'1.6s'}} fill="none" strokeWidth="1" d="M0 620 H 280 V 680 H 560 V 640 H 820"/>
      <path className="cl2" style={{'--d':'0.6s'}} fill="none" strokeWidth="1" d="M1440 740 H 1080 V 800 H 820 V 760 H 600"/>
      <path className="cl1" style={{'--d':'2.0s'}} fill="none" strokeWidth="1" d="M100 900 V 720 H 200 V 660 H 400"/>
      <path className="cl2" style={{'--d':'1.8s'}} fill="none" strokeWidth="1" d="M1340 0 V 100 H 1200 V 180 H 1000"/>

      {/* ── Vertical traces ── */}
      <path className="cl1" style={{'--d':'0.3s'}} fill="none" strokeWidth="1" d="M320 0 V 180"/>
      <path className="cl2" style={{'--d':'0.9s'}} fill="none" strokeWidth="1" d="M840 900 V 640 H 920 V 540"/>
      <path className="cl1" style={{'--d':'1.4s'}} fill="none" strokeWidth="1" d="M560 900 V 680"/>
      <path className="cl2" style={{'--d':'0.5s'}} fill="none" strokeWidth="1" d="M1100 0 V 200"/>

      {/* ── Gold accent traces ── */}
      <path className="cl3" style={{'--d':'1.0s'}} fill="none" strokeWidth="1.2" d="M600 180 H 760 V 260 H 900"/>
      <path className="cl3" style={{'--d':'1.5s'}} fill="none" strokeWidth="1.2" d="M700 380 H 860 V 300 H 1000"/>
      <path className="cl3" style={{'--d':'2.2s'}} fill="none" strokeWidth="1.2" d="M820 640 H 960 V 740 H 1080"/>
      <path className="cl3" style={{'--d':'0.7s'}} fill="none" strokeWidth="1.2" d="M400 640 H 560 V 720"/>

      {/* ── Burgundy nodes (connection points) ── */}
      {[
        [320,180],[600,180],[200,320],[480,360],[700,380],
        [280,680],[560,640],[820,640],[960,540],[1100,200],
        [1200,480],[860,160],[640,160],[400,360],
      ].map(([x,y],i) => (
        <circle key={`b${i}`} className="nd1" cx={x} cy={y} r="3"
          style={{'--d': `${(i * 0.22).toFixed(2)}s`}} />
      ))}

      {/* ── Gold accent nodes ── */}
      {[
        [760,260],[900,260],[860,300],[1000,300],
        [960,740],[1080,740],[560,720],[400,640],
      ].map(([x,y],i) => (
        <circle key={`g${i}`} className="nd2" cx={x} cy={y} r="2.5"
          style={{'--d': `${(i * 0.3 + 0.5).toFixed(2)}s`}} />
      ))}

      {/* ── IC chip rectangles ── */}
      <rect x="448" y="208" width="64" height="40" rx="3" fill="none" stroke="#5B0E14" strokeWidth="1" opacity="0.25"/>
      <rect x="456" y="214" width="48" height="28" rx="2" fill="rgba(91,14,20,0.06)"/>
      <line x1="448" y1="220" x2="430" y2="220" stroke="#5B0E14" strokeWidth="1" opacity="0.3"/>
      <line x1="448" y1="228" x2="430" y2="228" stroke="#5B0E14" strokeWidth="1" opacity="0.3"/>
      <line x1="448" y1="236" x2="430" y2="236" stroke="#5B0E14" strokeWidth="1" opacity="0.3"/>
      <line x1="512" y1="220" x2="530" y2="220" stroke="#5B0E14" strokeWidth="1" opacity="0.3"/>
      <line x1="512" y1="228" x2="530" y2="228" stroke="#5B0E14" strokeWidth="1" opacity="0.3"/>
      <line x1="512" y1="236" x2="530" y2="236" stroke="#5B0E14" strokeWidth="1" opacity="0.3"/>

      <rect x="880" y="460" width="60" height="36" rx="3" fill="none" stroke="#D4C45A" strokeWidth="1" opacity="0.3"/>
      <rect x="887" y="466" width="46" height="24" rx="2" fill="rgba(212,196,90,0.06)"/>
      <line x1="880" y1="470" x2="862" y2="470" stroke="#D4C45A" strokeWidth="1" opacity="0.35"/>
      <line x1="880" y1="478" x2="862" y2="478" stroke="#D4C45A" strokeWidth="1" opacity="0.35"/>
      <line x1="940" y1="470" x2="958" y2="470" stroke="#D4C45A" strokeWidth="1" opacity="0.35"/>
      <line x1="940" y1="478" x2="958" y2="478" stroke="#D4C45A" strokeWidth="1" opacity="0.35"/>

      {/* ── Dot matrix pattern (corner accents) ── */}
      {[0,1,2,3,4].map(row => [0,1,2,3,4].map(col => (
        <circle key={`d-${row}-${col}`}
          cx={1340 + col * 18} cy={80 + row * 18} r="1.2"
          fill="#5B0E14" opacity="0.18"/>
      )))}
      {[0,1,2,3,4].map(row => [0,1,2,3].map(col => (
        <circle key={`d2-${row}-${col}`}
          cx={60 + col * 18} cy={780 + row * 18} r="1.2"
          fill="#D4C45A" opacity="0.22"/>
      )))}

      {/* ── Binary text (subtle, tech flavor) ── */}
      <text x="1290" y="290" fontFamily="JetBrains Mono, monospace" fontSize="9"
        fill="#5B0E14" opacity="0.12" letterSpacing="2">01101010</text>
      <text x="1290" y="305" fontFamily="JetBrains Mono, monospace" fontSize="9"
        fill="#5B0E14" opacity="0.10" letterSpacing="2">11001010</text>
      <text x="1290" y="320" fontFamily="JetBrains Mono, monospace" fontSize="9"
        fill="#5B0E14" opacity="0.08" letterSpacing="2">00110101</text>
      <text x="60" y="130" fontFamily="JetBrains Mono, monospace" fontSize="9"
        fill="#D4C45A" opacity="0.18" letterSpacing="2">SELENIUM</text>
      <text x="60" y="145" fontFamily="JetBrains Mono, monospace" fontSize="9"
        fill="#D4C45A" opacity="0.14" letterSpacing="2">{'}'} PASS</text>
    </svg>
  )
}

/* ── Status chips ── */
const CHIPS = [
  { text: '247/247 Tests Passed', col: '#059669', border: 'rgba(5,150,105,.3)', pos: { top:'22%', left:'2%' }, d: 0 },
  { text: 'Build #312 Successful', col: '#5B0E14', border: 'rgba(91,14,20,.3)',  pos: { top:'30%', right:'1.5%' }, d: 1 },
]

/* ── Tech icons ── */
const TECH = [
  { name:'Java',     svg:<svg viewBox="0 0 128 128" style={{width:'100%',height:'100%'}}><path fill="#E76F00" d="M47.617 98.12s-4.767 2.774 3.397 3.71c9.892 1.13 14.947.968 25.845-1.092 0 0 2.871 1.795 6.873 3.351-24.439 10.47-55.308-.607-36.115-5.969zm-2.988-13.665s-5.348 3.959 2.823 4.805c10.567 1.091 18.91 1.18 33.354-1.6 0 0 1.993 2.025 5.132 3.131-29.542 8.64-62.446.68-41.309-6.336z"/><path fill="#E76F00" d="M69.802 61.271c6.025 6.929-1.58 13.17-1.58 13.17s15.289-7.891 8.269-17.777c-6.559-9.215-11.587-13.792 15.635-29.58 0 0-42.731 10.67-22.324 34.187z"/><path fill="#5382A1" d="M102.123 108.229s3.529 2.91-3.888 5.159c-14.102 4.272-58.706 5.56-71.094.171-4.451-1.938 3.899-4.625 6.526-5.192 2.739-.593 4.303-.485 4.303-.485-4.953-3.487-32.013 6.85-13.743 9.815 49.821 8.076 90.817-3.637 77.896-9.468zM49.912 70.294s-22.686 5.389-8.033 7.348c6.188.828 18.518.638 30.011-.326 9.39-.789 18.813-2.474 18.813-2.474s-3.308 1.419-5.704 3.053c-23.042 6.061-67.544 3.238-54.731-2.958 10.832-5.239 19.644-4.643 19.644-4.643zm40.697 22.747c23.421-12.167 12.591-23.86 5.032-22.285-1.848.385-2.677.72-2.677.72s.688-1.079 2-1.543c14.953-5.255 26.451 15.503-4.823 23.74 0 .001.359-.327.468-.632z"/><path fill="#E76F00" d="M76.491 1.587S89.459 14.563 64.188 34.51c-20.266 16.006-4.621 25.13-.007 35.559-11.831-10.673-20.509-20.07-14.688-28.815C58.041 28.42 81.722 22.195 76.491 1.587z"/><path fill="#5382A1" d="M52.214 126.021c22.476 1.437 57-.8 57.817-11.436 0 0-1.571 4.032-18.577 7.231-19.186 3.612-42.854 3.191-56.887.874 0 .001 2.875 2.368 17.647 3.331z"/></svg> },
  { name:'Selenium', svg:<svg viewBox="0 0 128 128" style={{width:'100%',height:'100%'}}><circle cx="64" cy="64" r="60" fill="#43B02A"/><path fill="#fff" d="M64 20c-24.3 0-44 19.7-44 44s19.7 44 44 44 44-19.7 44-44-19.7-44-44-44zm0 80c-19.9 0-36-16.1-36-36s16.1-36 36-36 36 16.1 36 36-16.1 36-36 36z"/><path fill="#fff" d="M64 36c-15.5 0-28 12.5-28 28s12.5 28 28 28 28-12.5 28-28-12.5-28-28-28zm0 48c-11 0-20-9-20-20s9-20 20-20 20 9 20 20-9 20-20 20z"/><circle cx="64" cy="64" r="10" fill="#fff"/></svg> },
  { name:'React',    svg:<svg viewBox="0 0 128 128" style={{width:'100%',height:'100%'}}><g fill="#61DAFB"><circle cx="64" cy="64" r="11.4"/><path d="M64 19.7c-27.6 0-50 19.9-50 44.3s22.4 44.3 50 44.3 50-19.9 50-44.3-22.4-44.3-50-44.3zm0 80.6c-20 0-36.2-16.3-36.2-36.3S44 27.7 64 27.7s36.2 16.3 36.2 36.3S84 100.3 64 100.3z" opacity=".5"/><ellipse cx="64" cy="64" rx="50" ry="19.1" transform="rotate(60 64 64)" opacity=".5"/><ellipse cx="64" cy="64" rx="50" ry="19.1" transform="rotate(120 64 64)" opacity=".5"/><ellipse cx="64" cy="64" rx="50" ry="19.1"/></g></svg> },
  { name:'Node.js',  svg:<svg viewBox="0 0 128 128" style={{width:'100%',height:'100%'}}><path fill="#83CD29" d="M64 0L10.4 32v64L64 128l53.6-32V32z"/><path fill="#fff" d="M57.2 78.4V54.2l-8.4-4.8v29l15.2 8.8 8.4-4.8zm13.7-28.8l8.4 4.8v14.2l-8.4 4.8-8.4-4.8V54.4zm8.4 24.2l-8.4 4.8-8.4-4.8V54.4l8.4-4.8 8.4 4.8z"/></svg> },
  { name:'TestNG',   svg:<svg viewBox="0 0 128 128" style={{width:'100%',height:'100%'}}><rect width="128" height="128" rx="16" fill="#F4A020"/><path fill="#fff" d="M24 40h80v14H72v36H56V54H24z"/></svg> },
  { name:'Jenkins',  svg:<svg viewBox="0 0 128 128" style={{width:'100%',height:'100%'}}><path fill="#D33833" d="M64 8C33 8 8 33 8 64s25 56 56 56 56-25 56-56S95 8 64 8z"/><path fill="#fff" d="M64 22c-23.2 0-42 18.8-42 42s18.8 42 42 42 42-18.8 42-42-18.8-42-42-42zm6 58H58V54h12v26zm0-34H58V38h12v8z"/></svg> },
  { name:'Postman',  svg:<svg viewBox="0 0 128 128" style={{width:'100%',height:'100%'}}><circle cx="64" cy="64" r="60" fill="#FF6C37"/><path fill="#fff" d="M38 48h52v8H38zm0 14h40v8H38zm0 14h28v8H38z" opacity=".9"/></svg> },
  { name:'Git',      svg:<svg viewBox="0 0 128 128" style={{width:'100%',height:'100%'}}><path fill="#F05032" d="M124.742 58.378L69.625 3.264a8.44 8.44 0 00-11.94 0L46.63 14.32l15.111 15.111a10.028 10.028 0 0112.68 12.76l14.554 14.554a10.033 10.033 0 1112 9.586 10.041 10.041 0 01-9.938-11.51L77.112 40.876v38.169a10.033 10.033 0 11-11.674-.283V40.23a10.025 10.025 0 01-5.439-13.18L44.996 11.94 3.258 53.68a8.44 8.44 0 000 11.94l55.117 55.118a8.44 8.44 0 0011.94 0l54.427-54.426a8.442 8.442 0 000-11.934z"/></svg> },
]

/* ─────────────────────────────────────────
   MAIN COMPONENT
───────────────────────────────────────── */
export default function Hero() {
  const ref = useRef()
  const year = new Date().getFullYear()
  const { scrollY } = useScroll()
  const rawY = useTransform(scrollY, [0, 600], [0, -70])
  const y    = useSpring(rawY, { stiffness: 55, damping: 18 })
  const op   = useTransform(scrollY, [0, 480], [1, 0])

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(['.h-eye','.h-name','.h-roles','.h-tech','.h-meta'], { opacity: 0 })
      gsap.set('.h-eye',   { x: -18 })
      gsap.set('.h-name',  { y: 36 })
      gsap.set('.h-roles', { y: 16, scale: 0.95 })
      gsap.set('.h-tech',  { y: 20 })
      gsap.set('.h-meta',  { y: 18 })

      /* Immersive zoom-in */
      gsap.fromTo('.hero-canvas',
        { scale: 1.1, opacity: 0 },
        { scale: 1, opacity: 1, duration: 1.6, ease: 'power3.out', delay: 0.05 }
      )
      /* Circuit fade in */
      gsap.fromTo('.hero-circuit',
        { opacity: 0 },
        { opacity: 0.55, duration: 2, ease: 'power2.out', delay: 0.3 }
      )
      gsap.to('.h-eye',   { opacity: 1, x: 0, duration: 0.65, delay: 0.35, ease: 'power3.out' })
      gsap.to('.h-name',  { opacity: 1, y: 0, duration: 0.9,  delay: 0.52, ease: 'power3.out' })
      gsap.to('.h-roles', { opacity: 1, y: 0, scale: 1, duration: 0.65, delay: 0.9,  ease: 'back.out(1.4)' })
      gsap.to('.h-tech',  { opacity: 1, y: 0, duration: 0.55, delay: 1.1, stagger: 0.06, ease: 'power3.out' })
      gsap.to('.h-meta',  { opacity: 1, y: 0, duration: 0.7,  delay: 1.3, ease: 'power3.out' })
    }, ref)
    return () => ctx.revert()
  }, [])

  return (
    <section className={s.hero} id="hero" ref={ref}>
      {/* Warm gradient base */}
      <div className={s.heroBg} />

      {/* Animated circuit board SVG — tech-stack themed */}
      <div className={`${s.circuitSvg} hero-circuit`} style={{ opacity: 0, position: 'absolute', inset: 0, zIndex: 1 }}>
        <CircuitBackground />
      </div>

      {/* 3D Canvas */}
      <div className={`${s.canvas} hero-canvas`} style={{ opacity: 0 }}>
        <Canvas camera={{ position: [0, 0, 7.5], fov: 48 }} gl={{ antialias: true, alpha: true }} dpr={[1, 2]}>
          <Suspense fallback={null}><Scene /></Suspense>
        </Canvas>
      </div>

      {/* Status chips */}
      {CHIPS.map((c, i) => (
        <motion.div key={i} className={s.chip}
          style={{ ...c.pos, color: c.col, borderColor: c.border }}
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 1.7 + i * 0.15, ease: [0.16, 1, 0.3, 1] }}
          whileHover={{ scale: 1.05, y: -3 }}>
          <span className={s.chipDot} style={{ background: c.col }} />
          {c.text}
        </motion.div>
      ))}

      {/* Main text */}
      <motion.div className={s.content} style={{ y, opacity: op }}>
        <div className={`${s.eyebrow} h-eye`}>
          <span className={s.avDot} />
          Available for work — {year}
        </div>

        <h1 className={`${s.name} h-name`}>Rangaraju R</h1>

        <div className={`${s.roles} h-roles`}>
          {['QA Automation Engineer', 'Full Stack Developer'].map((r, i) => (
            <span key={r} className={`${s.roleTag} h-roles`}
              style={{
                background:   i === 0 ? 'var(--primary)' : 'transparent',
                color:        i === 0 ? 'var(--gold)'    : 'var(--text-s)',
                borderColor:  i === 0 ? 'var(--primary)' : 'var(--border)',
              }}>
              {r}
            </span>
          ))}
        </div>

        <div className={`${s.techRow} h-tech`}>
          {TECH.map(t => (
            <motion.div key={t.name} className={`${s.techIcon} h-tech`} title={t.name}
              whileHover={{ scale: 1.15, y: -4, transition: { duration: 0.2 } }}>
              <div className={s.techInner}>{t.svg}</div>
              <span className={s.techLabel}>{t.name}</span>
            </motion.div>
          ))}
        </div>

        <div className={`${s.meta} h-meta`}>
          <div className={s.metaGrid}>
            {[
              { l: 'Primary Role', v: 'QA Automation Engineer' },
              { l: 'Also',         v: 'Full Stack Developer'   },
              { l: 'Location',     v: 'India · Remote Ready'   },
            ].map(m => (
              <div key={m.l} className={s.metaCell}>
                <div className={s.metaL}>{m.l}</div>
                <div className={s.metaV}>{m.v}</div>
              </div>
            ))}
          </div>
          <div className={s.ctas}>
            <motion.a href="#projects" className={`btn btn-primary btn-lg ${s.btn}`}
              whileHover={{ scale: 1.03, y: -1 }} whileTap={{ scale: 0.97 }}>
              View Work
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M3 8h10M8 3l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </motion.a>
            <motion.a href="mailto:rangarajabhi333@gmail.com"
              className={`btn btn-secondary btn-lg ${s.btn}`}
              whileHover={{ scale: 1.03, y: -1 }} whileTap={{ scale: 0.97 }}>
              Hire Me
            </motion.a>
          </div>
        </div>
      </motion.div>

      {/* Scroll hint */}
      <motion.div className={s.scrollHint}
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        transition={{ delay: 2.1, duration: 0.8 }}>
        <span className={s.scrollTxt}>Scroll</span>
        <span className={s.scrollLine} />
      </motion.div>
    </section>
  )
}
