import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

const WA_NUMBER = '213781418142'
const WA_MSG = encodeURIComponent(
  "Bonjour BM+, je souhaite obtenir un devis pour un meuble sur mesure."
)
const WA_LINK = `https://wa.me/${WA_NUMBER}?text=${WA_MSG}`
const EMAIL = 'mokhtarboukabous92@gmail.com'

const IconWA = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M.057 24l1.687-6.163a11.867 11.867 0 01-1.587-5.945C.16 5.335 5.495 0 12.05 0a11.82 11.82 0 018.413 3.488 11.82 11.82 0 013.48 8.414c-.003 6.557-5.338 11.892-11.893 11.892a11.9 11.9 0 01-5.688-1.448L.057 24zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884a9.86 9.86 0 001.523 5.27l-.999 3.648 3.966-1.617zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
  </svg>
)
const IconArrow = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
    <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

const rise = {
  hidden: { opacity: 0, y: 34 },
  show: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: i * 0.08 },
  }),
}
const Reveal = ({ children, i = 0, className, as: Tag = 'div' }) => {
  const MTag = motion[Tag] || motion.div
  return (
    <MTag className={className} variants={rise} custom={i}
      initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.3 }}>
      {children}
    </MTag>
  )
}

function Nav() {
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  return (
    <nav className={`nav ${scrolled ? 'scrolled' : ''}`}>
      <a href="#top" className="brand">
        <span className="brand-mark" style={{ color: scrolled ? '' : '#f4f1ea' }}>Meubles BM</span>
        <span className="brand-plus">+</span>
      </a>
      <div className="nav-links">
        <a href="#collection" className="hide-mobile" style={{ color: scrolled ? '' : '#f4f1ea' }}>Collection</a>
        <a href="#savoir" className="hide-mobile" style={{ color: scrolled ? '' : '#f4f1ea' }}>Savoir-faire</a>
        <a href="#contact" className="hide-mobile" style={{ color: scrolled ? '' : '#f4f1ea' }}>Contact</a>
        <a href={WA_LINK} target="_blank" rel="noreferrer" className="btn btn-dark" style={{ padding: '0.7rem 1.3rem' }}>
          Devis <IconArrow />
        </a>
      </div>
    </nav>
  )
}

function Hero() {
  return (
    <header className="hero" id="top">
      <video className="hero-video" src="/media/hero.mp4" autoPlay muted loop playsInline poster="/media/product.jpg" />
      <div className="hero-inner">
        <motion.div initial="hidden" animate="show">
          <Reveal as="p" className="eyebrow" i={0}>Mobilier d'exception · Kolea, Algérie</Reveal>
          <Reveal as="h1" className="display" i={1}>
            Des meubles qui <span className="italic">habitent</span> l'espace.
          </Reveal>
          <Reveal as="p" i={2}>
            BM+ conçoit et fabrique du mobilier sur mesure aux lignes épurées —
            matières nobles, finitions précises, lumière maîtrisée.
          </Reveal>
          <Reveal className="hero-actions" i={3}>
            <a href={WA_LINK} target="_blank" rel="noreferrer" className="btn btn-wa">
              <IconWA /> Demander un devis
            </a>
            <a href="#collection" className="btn btn-ghost">Voir la collection</a>
          </Reveal>
        </motion.div>
      </div>
      <span className="scroll-hint">Défiler</span>
    </header>
  )
}

function Marquee() {
  const words = ['Sur mesure', 'Dressing', 'Bibliothèques', 'Vitrines lumineuses', 'Cuisines', 'Finitions mates', 'Design moderne']
  const loop = [...words, ...words]
  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee-track">
        {loop.map((w, i) => <span key={i}>{w}</span>)}
      </div>
    </div>
  )
}

function Intro() {
  return (
    <section className="section container" id="savoir">
      <div className="split">
        <Reveal className="split-media">
          <img src="/media/product.jpg" alt="Vitrine lumineuse BM+ à cadre noir et étagères en verre" />
          <span className="tag">Collection Lumière</span>
        </Reveal>
        <div className="lead">
          <Reveal as="p" className="eyebrow">Le savoir-faire BM+</Reveal>
          <Reveal as="h2" className="display">L'élégance dans chaque détail.</Reveal>
          <Reveal as="p" className="big">
            Chaque pièce est pensée comme une architecture : structure noire, façades épurées,
            jeux de lumière intégrés.
          </Reveal>
          <Reveal as="p">
            De la première esquisse à la pose, nous accompagnons chaque projet. Mesures précises,
            matériaux sélectionnés et un assemblage soigné pour un résultat durable.
          </Reveal>
          <Reveal>
            <a href="#contact" className="btn btn-ghost" style={{ marginTop: '0.6rem' }}>
              Parler de votre projet <IconArrow />
            </a>
          </Reveal>
        </div>
      </div>

      <div className="stats">
        {[
          ['12+', ' ans', "d'expérience"],
          ['100%', '', 'sur mesure'],
          ['48h', '', 'devis offert'],
          ['∞', '', 'finitions possibles'],
        ].map(([num, suf, label], i) => (
          <Reveal className="stat" i={i} key={label}>
            <div className="num">{num}<span>{suf}</span></div>
            <div className="label">{label}</div>
          </Reveal>
        ))}
      </div>
    </section>
  )
}

function Collection() {
  return (
    <section className="section container" id="collection">
      <div className="head-row">
        <div>
          <Reveal as="p" className="eyebrow">La collection</Reveal>
          <Reveal as="h2" className="display">Pièces signature</Reveal>
        </div>
        <Reveal as="p">
          Une sélection de réalisations — du dressing fermé à la vitrine éclairée.
        </Reveal>
      </div>

      <div className="grid">
        <Reveal className="card c-tall" i={0}>
          <video src="/media/clip1.mp4" autoPlay muted loop playsInline />
          <div className="meta"><span className="k">Dressing</span><h3>Ligne Atelier</h3></div>
        </Reveal>
        <Reveal className="card c-wide" i={1}>
          <video src="/media/clip2.mp4" autoPlay muted loop playsInline />
          <div className="meta"><span className="k">Vitrine lumineuse</span><h3>Édition Lumière</h3></div>
        </Reveal>
        <Reveal className="card c-half" i={2}>
          <video src="/media/clip3.mp4" autoPlay muted loop playsInline />
          <div className="meta"><span className="k">Bibliothèque</span><h3>Composition Noir</h3></div>
        </Reveal>
        <Reveal className="card c-half" i={3}>
          <img src="/media/product.jpg" alt="Meuble vitrine BM+" />
          <div className="meta"><span className="k">Pièce maîtresse</span><h3>Vitrine Duo</h3></div>
        </Reveal>
      </div>
    </section>
  )
}

function Values() {
  const items = [
    ['01', 'Conception sur mesure', "Nous dessinons chaque meuble selon votre espace, vos usages et votre style — sans compromis sur les proportions."],
    ['02', 'Matières & finitions', "Façades mates, cadres laqués, verre et bois : des matériaux sélectionnés pour durer et vieillir avec élégance."],
    ['03', 'Lumière intégrée', "Éclairages LED discrets pour mettre en scène vos objets et donner de la profondeur à chaque rangement."],
  ]
  return (
    <section className="section container">
      <Reveal as="p" className="eyebrow">Pourquoi BM+</Reveal>
      <Reveal as="h2" className="display" i={1} style={{ fontSize: 'clamp(2rem,5vw,3.6rem)', margin: '1rem 0 3.5rem', maxWidth: '16ch' }}>
        Une approche d'artisan, une finition d'architecte.
      </Reveal>
      <div className="values">
        {items.map(([idx, title, body], i) => (
          <Reveal className="value" i={i} key={idx}>
            <span className="idx">{idx}</span>
            <h3>{title}</h3>
            <p>{body}</p>
          </Reveal>
        ))}
      </div>
    </section>
  )
}

function CTA() {
  return (
    <section className="section container">
      <Reveal className="cta">
        <p className="eyebrow">Votre projet commence ici</p>
        <h2 className="display">Demandez votre devis gratuit.</h2>
        <p>
          Envoyez-nous vos idées, dimensions ou inspirations sur WhatsApp.
          Réponse rapide et accompagnement personnalisé.
        </p>
        <div className="cta-actions">
          <a href={WA_LINK} target="_blank" rel="noreferrer" className="btn btn-wa">
            <IconWA /> WhatsApp · 0781 41 81 42
          </a>
          <a href={`mailto:${EMAIL}`} className="btn btn-ghost">Nous écrire</a>
        </div>
      </Reveal>
    </section>
  )
}

function Contact() {
  return (
    <section className="section container" id="contact">
      <Reveal as="p" className="eyebrow">Contact</Reveal>
      <Reveal as="h2" className="display" i={1} style={{ fontSize: 'clamp(2rem,5vw,3.6rem)', marginTop: '1rem' }}>
        Parlons de votre intérieur.
      </Reveal>
      <div className="contact-grid">
        <Reveal className="contact-item" i={0}>
          <span className="k">WhatsApp / Téléphone</span>
          <a href={WA_LINK} target="_blank" rel="noreferrer">0781 41 81 42</a>
        </Reveal>
        <Reveal className="contact-item" i={1}>
          <span className="k">Email</span>
          <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
        </Reveal>
        <Reveal className="contact-item" i={2}>
          <span className="k">Atelier</span>
          <p>Kolea, Algérie · 42003</p>
        </Reveal>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <a href="#top" className="brand">
          <span className="brand-mark">Meubles BM</span><span className="brand-plus">+</span>
        </a>
        <small>© {2026} Meubles BM Plus — Mobilier sur mesure · Kolea, Algérie</small>
      </div>
    </footer>
  )
}

export default function App() {
  return (
    <>
      <Nav />
      <Hero />
      <Marquee />
      <Intro />
      <Collection />
      <Values />
      <CTA />
      <Contact />
      <Footer />
      <a href={WA_LINK} target="_blank" rel="noreferrer" className="wa-float" aria-label="Contacter sur WhatsApp">
        <IconWA />
      </a>
    </>
  )
}
