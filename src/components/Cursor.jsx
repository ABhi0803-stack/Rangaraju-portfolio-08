import { useEffect, useRef, useState } from 'react'

export default function Cursor() {
  const dotRef = useRef(null)
  const ringRef = useRef(null)

  const pos = useRef({ x: -100, y: -100 })
  const ring = useRef({ x: -100, y: -100 })

  const [variant, setVariant] = useState('default')
  const [label, setLabel] = useState('')

  useEffect(() => {
    let raf

    const move = e => {
      pos.current = { x: e.clientX, y: e.clientY }

      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`
      }
    }

    const tick = () => {
      ring.current.x += (pos.current.x - ring.current.x) * 0.12
      ring.current.y += (pos.current.y - ring.current.y) * 0.12

      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${ring.current.x}px, ${ring.current.y}px)`
      }

      raf = requestAnimationFrame(tick)
    }

    const handleOver = e => {
      const el = e.target.closest('[data-cursor]')

      if (!el) {
        setVariant('default')
        setLabel('')
        return
      }

      const type = el.getAttribute('data-cursor')

      if (type === 'view') {
        setVariant('big')
        setLabel('VIEW')
      } else if (type === 'link') {
        setVariant('big')
        setLabel('OPEN')
      } else {
        setVariant('default')
        setLabel('')
      }
    }

    document.addEventListener('mousemove', move)
    document.addEventListener('mouseover', handleOver)

    raf = requestAnimationFrame(tick)

    return () => {
      document.removeEventListener('mousemove', move)
      document.removeEventListener('mouseover', handleOver)
      cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <>
      <div ref={dotRef} className="cursor-dot" />

      <div
        ref={ringRef}
        className={`cursor-ring ${variant}`}
      >
        {label && <span className="cursor-text">{label}</span>}
      </div>
    </>
  )
}