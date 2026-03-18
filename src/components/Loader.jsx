import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function Loader({ onComplete }) {
  const [count, setCount] = useState(0)
  const [visible, setVisible] = useState(true)
  const [wiping, setWiping] = useState(false)

  useEffect(() => {
    let c = 0

    const id = setInterval(() => {
      c += Math.floor(Math.random() * 10) + 6

      if (c >= 100) {
        c = 100
        clearInterval(id)

        // start wipe animation
        setTimeout(() => setWiping(true), 200)

        // remove loader AFTER animation
        setTimeout(() => {
          setVisible(false)

          // mount app AFTER loader gone
          setTimeout(() => {
            onComplete()
          }, 150)
        }, 1000)
      }

      setCount(c)
    }, 50)

    return () => clearInterval(id)
  }, [onComplete])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="loader"
          style={styles.wrap}
          exit={{ opacity: 0, transition: { duration: 0.4 } }}
        >
          {/* background panels */}
          <motion.div
            style={{ ...styles.panel, background: '#F8F6F1', transformOrigin: 'left' }}
            animate={wiping ? { scaleX: 0 } : { scaleX: 1 }}
            transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
          />

          <motion.div
            style={{ ...styles.panel, background: '#EEF2FF', transformOrigin: 'right' }}
            animate={wiping ? { scaleX: 0 } : { scaleX: 1 }}
            transition={{ duration: 0.7, delay: 0.08, ease: [0.76, 0, 0.24, 1] }}
          />

          {/* content */}
          <motion.div
            style={styles.body}
            initial={{ opacity: 0, y: 20 }}
            animate={wiping ? { opacity: 0, y: -20 } : { opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* NAME (FIXED — no split bug) */}
            <motion.div
              style={styles.name}
              initial={{ opacity: 0, y: 50, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            >
              Rangaraju R
            </motion.div>

            {/* PROGRESS BAR */}
            <div style={styles.barWrap}>
              <motion.div
                style={styles.barFill}
                animate={{ width: count + '%' }}
                transition={{ ease: 'linear', duration: 0.05 }}
              />
            </div>

            {/* BOTTOM INFO */}
            <div style={styles.bottom}>
              <span style={styles.role}>
                QA Engineer · Full Stack Developer
              </span>

              <motion.span
                style={styles.pct}
                key={count}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                {String(count).padStart(3, '0')}
              </motion.span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

/* ================= STYLES ================= */

const styles = {
  wrap: {
    position: 'fixed',
    inset: 0,
    zIndex: 9999,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },

  panel: {
    position: 'absolute',
    inset: 0,
  },

  body: {
    position: 'relative',
    zIndex: 2,
    width: 'min(520px, 88vw)',
    display: 'flex',
    flexDirection: 'column',
    gap: 24,
    alignItems: 'center',
  },

  name: {
    fontFamily: "'Syne', sans-serif",
    fontSize: 'clamp(42px, 6vw, 72px)',
    fontWeight: 800,
    letterSpacing: '-0.04em',
    color: '#18130F',
    textAlign: 'center',
  },

  barWrap: {
    width: '100%',
    height: 3,
    background: 'rgba(24,19,15,0.08)',
    borderRadius: 2,
    overflow: 'hidden',
  },

  barFill: {
    height: '100%',
    width: '0%',
    background: 'linear-gradient(90deg, #1D4ED8, #059669)',
  },

  bottom: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  role: {
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: 10,
    letterSpacing: '0.18em',
    textTransform: 'uppercase',
    color: '#6B5E54',
  },

  pct: {
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: 11,
    letterSpacing: '0.2em',
    color: '#1D4ED8',
  },
}