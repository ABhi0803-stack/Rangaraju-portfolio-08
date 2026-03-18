import s from './Footer.module.css'

export default function Footer() {
  const year = new Date().getFullYear()
  const go = (e, href) => {
    e.preventDefault()
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
  }
  return (
    <footer className={s.footer}>
      <div className={s.inner}>
        <div className={s.logo}>
          Rangaraju R
          <span className={s.dot} />
        </div>
        <nav className={s.nav}>
          {['#about','#skills','#projects','#contact'].map(h => (
            <a key={h} href={h} onClick={e => go(e,h)} className={s.link}>
              {h.replace('#','').charAt(0).toUpperCase() + h.replace('#','').slice(1)}
            </a>
          ))}
        </nav>
        <div className={s.copy}>© {year} Rangaraju R · All Rights Reserved</div>
      </div>
      <div className={s.bar} />
    </footer>
  )
}
