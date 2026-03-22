import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function Loader({ onComplete }) {
  const [count,   setCount]   = useState(0)
  const [visible, setVisible] = useState(true)
  const [wiping,  setWiping]  = useState(false)

  useEffect(() => {
    let c = 0
    const id = setInterval(() => {
      c += Math.floor(Math.random() * 14) + 5
      if (c >= 100) {
        c = 100; clearInterval(id)
        setTimeout(() => setWiping(true), 300)
        setTimeout(() => { onComplete(); setTimeout(() => setVisible(false), 100) }, 1150)
      }
      setCount(c)
    }, 55)
    return () => clearInterval(id)
  }, [onComplete])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div key="loader" style={S.wrap}
          exit={{ opacity: 0, transition: { duration: 0.3 } }}>

          {/* Panel wipe left */}
          <motion.div style={{ ...S.panel, background: '#F5F5F5', transformOrigin: 'left' }}
            animate={wiping ? { scaleX: 0 } : { scaleX: 1 }}
            transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }} />
          {/* Panel wipe right */}
          <motion.div style={{ ...S.panel, background: '#FFFFFF', transformOrigin: 'right' }}
            animate={wiping ? { scaleX: 0 } : { scaleX: 1 }}
            transition={{ duration: 0.7, delay: 0.07, ease: [0.76, 0, 0.24, 1] }} />

          <motion.div style={S.body}
            animate={wiping ? { opacity: 0, y: -10 } : { opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}>

            {/* Logo mark */}
            <div style={S.logoRow}>
              <div style={S.logoMark}>R</div>
              <div style={S.logoText}>
                <div style={S.logoName}>Rangaraju R</div>
                <div style={S.logoRole}>QA Engineer · Full Stack Developer</div>
              </div>
            </div>

            {/* Name letter reveal */}
            <div style={S.nameRow}>
              {['R','a','n','g','a','r','a','j','u',' ','R'].map((ch, i) => (
                <motion.span key={i}
                  style={{ ...S.letter, marginRight: ch === ' ' ? '0.2em' : 0 }}
                  initial={{ y: '100%', opacity: 0 }}
                  animate={{ y: '0%', opacity: 1 }}
                  transition={{ duration: 0.6, delay: i * 0.05, ease: [0.16, 1, 0.3, 1] }}>
                  {ch}
                </motion.span>
              ))}
            </div>

            {/* Progress */}
            <div style={S.barTrack}>
              <motion.div style={S.barFill}
                animate={{ width: count + '%' }}
                transition={{ ease: 'linear', duration: 0.04 }} />
            </div>
            <div style={S.barRow}>
              <span style={S.hint}>Loading portfolio...</span>
              <span style={S.pct}>{count}%</span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

const S = {
  wrap: { position:'fixed', inset:0, zIndex:9000, display:'flex', alignItems:'center', justifyContent:'center', overflow:'hidden' },
  panel: { position:'absolute', inset:0 },
  body: { position:'relative', zIndex:1, width:'min(500px, 88vw)', display:'flex', flexDirection:'column', gap:24 },
  logoRow: { display:'flex', alignItems:'center', gap:14 },
  logoMark: {
    width:48, height:48, borderRadius:8,
    background:'#AE0600', color:'#fff',
    display:'flex', alignItems:'center', justifyContent:'center',
    fontFamily:"'Inter',sans-serif", fontSize:24, fontWeight:800, flexShrink:0,
  },
  logoText: { display:'flex', flexDirection:'column', gap:2 },
  logoName: { fontFamily:"'Inter',sans-serif", fontSize:18, fontWeight:700, color:'#1A1A1A', letterSpacing:'-0.02em' },
  logoRole: { fontFamily:"'JetBrains Mono',monospace", fontSize:10, letterSpacing:'0.14em', textTransform:'uppercase', color:'#8A8A9A' },
  nameRow: {
    display:'flex', flexWrap:'nowrap', overflow:'hidden',
    fontFamily:"'Inter',sans-serif", fontSize:'clamp(36px,6vw,68px)',
    fontWeight:800, letterSpacing:'-0.04em', color:'#1A1A1A', lineHeight:1,
  },
  letter: { display:'inline-block' },
  barTrack: { height:3, background:'rgba(0,0,0,0.08)', borderRadius:2, overflow:'hidden' },
  barFill: { height:'100%', width:'0%', background:'#AE0600', borderRadius:2 },
  barRow: { display:'flex', justifyContent:'space-between', alignItems:'center' },
  hint: { fontFamily:"'JetBrains Mono',monospace", fontSize:10, letterSpacing:'0.14em', textTransform:'uppercase', color:'#8A8A9A' },
  pct:  { fontFamily:"'JetBrains Mono',monospace", fontSize:11, letterSpacing:'0.1em', color:'#AE0600', fontWeight:500 },
}
