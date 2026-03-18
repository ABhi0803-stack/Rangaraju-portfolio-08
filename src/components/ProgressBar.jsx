import { useEffect, useRef } from 'react'

export default function ProgressBar() {
  const ref = useRef(null)
  useEffect(() => {
    const fn = () => {
      const p = window.scrollY / (document.body.scrollHeight - window.innerHeight) * 100
      if (ref.current) ref.current.style.width = p + '%'
    }
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])
  return <div id="progress-bar" ref={ref} />
}
