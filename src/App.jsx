import { useEffect, useRef, useState, Suspense } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Canvas, useFrame } from '@react-three/fiber'
import { useGLTF, Environment, ContactShadows, OrbitControls } from '@react-three/drei'
import * as THREE from 'three'

const WA_NUMBER = '213781418142'
const WA_MSG_EN = encodeURIComponent("Hello BM+, I'd like to get a quote for custom furniture.")
const WA_MSG_AR = encodeURIComponent("مرحباً BM+، أرغب في الحصول على عرض سعر لأثاث مخصص.")
const EMAIL = 'mokhtarboukabous92@gmail.com'

// Preload both models
useGLTF.preload('/models/9362268e-0236-4990-9190-4750689b0e7c/base_basic_pbr.glb')
useGLTF.preload('/models/fcebda7b-60d7-48a4-b321-f85b112a6a45/base_basic_pbr.glb')

const T = {
  en: {
    dir: 'ltr',
    waMsg: WA_MSG_EN,
    nav: { collection: 'Collection', savoir: 'Craftsmanship', contact: 'Contact', cta: 'Get a Quote' },
    heroPhases: [
      {
        eyebrow: 'Bespoke Furniture · Kolea, Algeria',
        h1: <>Furniture, <span className="italic">crafted</span> around your life.</>,
        p: 'BM+ designs and builds bespoke furniture in Algeria — clean architectural lines, noble materials, and lighting that gives every piece its presence.',
      },
      {
        eyebrow: 'Materials & Craftsmanship',
        h1: <>Every detail <span className="italic">speaks</span> quality.</>,
        p: 'Matte facades, lacquered frames, premium glass — materials chosen to last a lifetime and age with grace.',
      },
      {
        eyebrow: 'Your Vision, Our Craft',
        h1: <>Made <span className="italic">exactly</span> for you.</>,
        p: 'From the first sketch to the final installation, we bring every detail to life. No compromises.',
      },
    ],
    hero: { btnWa: 'Request a quote', btnGhost: 'Explore the collection', scroll: 'Scroll' },
    marquee: ['Custom-made', 'Wardrobes', 'Bookcases', 'Lit displays', 'Kitchens', 'Matte finishes', 'Modern design'],
    intro: {
      eyebrow: 'The BM+ Craft', h2: 'Detail is everything.',
      big: 'Every piece begins as architecture — a black frame, clean facades, and light worked into the structure itself.',
      p: 'From the first sketch to the final installation, we stay close to your project: precise measurements, hand-selected materials, and assembly finished to last.',
      btn: 'Talk about your project', tag: 'Light Collection',
    },
    stats: [['12+', ' yrs', 'of craftsmanship'], ['100%', '', 'made to measure'], ['48h', '', 'free quote'], ['∞', '', 'finish options']],
    collection: {
      eyebrow: 'The Collection', h2: 'Signature pieces',
      p: 'A selection of our work — from closed wardrobes to softly lit display units.',
      cards: [['Wardrobe', 'Atelier Line'], ['Lit display', 'Light Edition'], ['Bookcase', 'Noir Composition'], ['Centerpiece', 'Duo Display']],
    },
    values: {
      eyebrow: 'Why BM+', h2: "A maker's hands, an architect's eye.",
      items: [
        ['01', 'Designed around you', 'We draw each piece to fit your space, your habits and your style — never off the shelf, never a compromise on proportion.'],
        ['02', 'Materials that endure', 'Matte facades, lacquered frames, glass and solid wood — chosen to age beautifully and last for years.'],
        ['03', 'Light, built in', 'Discreet integrated LED lighting that frames your objects and gives every unit a sense of depth.'],
      ],
    },
    cta: {
      eyebrow: 'Start your project', h2: 'Get your free quote.',
      p: 'Send your ideas, measurements or inspiration straight to WhatsApp. Fast reply, personal guidance, no obligation.',
      btnWa: 'WhatsApp · 0781 41 81 42', btnGhost: 'Write to us',
    },
    contact: {
      eyebrow: 'Contact', h2: "Let's talk about your interior.",
      items: [['WhatsApp / Phone', null], ['Email', null], ['Workshop', 'Kolea, Algeria · 42003']],
    },
    footer: '© 2026 Meubles BM Plus — Custom furniture · Kolea, Algeria',
  },
  ar: {
    dir: 'rtl',
    waMsg: WA_MSG_AR,
    nav: { collection: 'المجموعة', savoir: 'حرفيتنا', contact: 'اتصل بنا', cta: 'طلب عرض سعر' },
    heroPhases: [
      {
        eyebrow: 'أثاث حسب الطلب · قليعة، الجزائر',
        h1: <>أثاث <span className="italic">يُصنع</span> لأجل حياتك.</>,
        p: 'تُصمّم BM+ وتصنع الأثاث المخصّص في الجزائر — خطوط معمارية أنيقة، مواد راقية، وإضاءة تمنح كل قطعة حضورها.',
      },
      {
        eyebrow: 'المواد والحِرفية',
        h1: <>كل تفصيل <span className="italic">ينطق</span> بالجودة.</>,
        p: 'واجهات مطفأة، هياكل ملمّعة، زجاج فاخر — مواد منتقاة لتدوم عمراً وتشيخ بأناقة.',
      },
      {
        eyebrow: 'رؤيتك، حِرفتنا',
        h1: <>مصنوع <span className="italic">خصيصاً</span> لك.</>,
        p: 'من الرسمة الأولى حتى التركيب النهائي، نُحيي كل تفصيل. دون أي تنازل.',
      },
    ],
    hero: { btnWa: 'اطلب عرض سعر', btnGhost: 'اكتشف المجموعة', scroll: 'تمرير' },
    marquee: ['على القياس', 'غرف ملابس', 'مكتبات', 'واجهات مضيئة', 'مطابخ', 'تشطيبات مطفأة', 'تصميم عصري'],
    intro: {
      eyebrow: 'حِرفة BM+', h2: 'التفاصيل هي كل شيء.',
      big: 'كل قطعة تبدأ كبنية معمارية — هيكل أسود، واجهات أنيقة، وإضاءة مدمجة في صميم التصميم.',
      p: 'من الرسم الأول حتى التركيب النهائي، نرافق مشروعك عن قرب: قياسات دقيقة، مواد منتقاة بعناية، وتجميع متقن ليدوم.',
      btn: 'تحدث عن مشروعك', tag: 'مجموعة الضوء',
    },
    stats: [['12+', ' سنة', 'من الحِرفة'], ['100%', '', 'حسب القياس'], ['48 س', '', 'عرض سعر مجاني'], ['∞', '', 'خيارات تشطيب']],
    collection: {
      eyebrow: 'المجموعة', h2: 'القطع المميّزة',
      p: 'مختارات من أعمالنا — من خزائن الملابس المغلقة إلى الواجهات المضاءة بنعومة.',
      cards: [['غرفة ملابس', 'خط أتيليه'], ['واجهة مضيئة', 'إصدار الضوء'], ['مكتبة', 'تركيبة نوار'], ['قطعة رئيسية', 'فيترين دوو']],
    },
    values: {
      eyebrow: 'لماذا BM+', h2: 'يدا الحِرفي وعين المعماري.',
      items: [
        ['01', 'مصمَّم لأجلك', 'نرسم كل قطعة لتناسب فضاءك وعاداتك وذوقك — لا شيء جاهز، ولا تنازل عن النسب.'],
        ['02', 'مواد تدوم', 'واجهات مطفأة، هياكل ملمّعة، زجاج وخشب صلب — مختارة لتشيخ بأناقة وتدوم سنوات.'],
        ['03', 'إضاءة مدمجة', 'إضاءة LED خفية تُبرز مقتنياتك وتمنح كل وحدة إحساساً بالعمق.'],
      ],
    },
    cta: {
      eyebrow: 'ابدأ مشروعك', h2: 'احصل على عرض سعرك المجاني.',
      p: 'أرسل أفكارك أو قياساتك أو مصادر إلهامك مباشرة عبر واتساب. رد سريع، مرافقة شخصية، دون أي التزام.',
      btnWa: 'واتساب · 0781 41 81 42', btnGhost: 'راسلنا',
    },
    contact: {
      eyebrow: 'اتصل بنا', h2: 'لنتحدث عن ديكور منزلك.',
      items: [['واتساب / هاتف', null], ['البريد الإلكتروني', null], ['الورشة', 'قليعة، الجزائر · 42003']],
    },
    footer: '© 2026 مفروشات BM Plus — أثاث مخصص · قليعة، الجزائر',
  },
}

// ─── Icons ────────────────────────────────────────────────────────────────────
const IconWA = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M.057 24l1.687-6.163a11.867 11.867 0 01-1.587-5.945C.16 5.335 5.495 0 12.05 0a11.82 11.82 0 018.413 3.488 11.82 11.82 0 013.48 8.414c-.003 6.557-5.338 11.892-11.893 11.892a11.9 11.9 0 01-5.688-1.448L.057 24zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884a9.86 9.86 0 001.523 5.27l-.999 3.648 3.966-1.617zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
  </svg>
)
const IconArrow = ({ rtl }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true"
    style={rtl ? { transform: 'scaleX(-1)' } : {}}>
    <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

// ─── Animation helper ─────────────────────────────────────────────────────────
const rise = {
  hidden: { opacity: 0, y: 34 },
  show: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: i * 0.08 },
  }),
}
const Reveal = ({ children, i = 0, className, as: Tag = 'div', style }) => {
  const MTag = motion[Tag] || motion.div
  return (
    <MTag className={className} style={style} variants={rise} custom={i}
      initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.3 }}>
      {children}
    </MTag>
  )
}

// ─── 3D Chair ─────────────────────────────────────────────────────────────────
function ChairModel({ scrollProgress, phase }) {
  const { scene } = useGLTF('/models/9362268e-0236-4990-9190-4750689b0e7c/base_basic_pbr.glb')
  const meshRef = useRef()
  const prevPhase = useRef(phase)
  const scaleSpring = useRef(1)
  const scaleTarget = useRef(1)

  // Trigger zoom-in on phase change
  useEffect(() => {
    if (phase !== prevPhase.current) {
      scaleTarget.current = 1.18
      setTimeout(() => { scaleTarget.current = 1 }, 400)
      prevPhase.current = phase
    }
  }, [phase])

  useFrame((_, delta) => {
    if (!meshRef.current) return
    // Smooth spin driven by scroll
    const targetY = scrollProgress.current * Math.PI * 2.5
    meshRef.current.rotation.y += (targetY - meshRef.current.rotation.y) * 0.06
    // Gentle float
    meshRef.current.position.y = Math.sin(Date.now() * 0.0008) * 0.04
    // Scale spring
    scaleSpring.current += (scaleTarget.current - scaleSpring.current) * 0.12
    meshRef.current.scale.setScalar(scaleSpring.current)
  })

  // Center the model
  useEffect(() => {
    if (!meshRef.current) return
    const box = new THREE.Box3().setFromObject(meshRef.current)
    const center = box.getCenter(new THREE.Vector3())
    const size = box.getSize(new THREE.Vector3())
    meshRef.current.position.x = -center.x
    meshRef.current.position.z = -center.z
    meshRef.current.position.y = -box.min.y
  }, [scene])

  return <primitive ref={meshRef} object={scene} />
}

function HeroCanvas({ scrollProgress, phase }) {
  return (
    <Canvas
      shadows
      camera={{ position: [0, 1.2, 3.5], fov: 42 }}
      style={{ background: 'transparent' }}
      gl={{ antialias: true, alpha: true }}
    >
      <ambientLight intensity={0.4} />
      <directionalLight
        position={[3, 5, 3]} intensity={1.6}
        castShadow shadow-mapSize={[2048, 2048]}
      />
      <directionalLight position={[-4, 2, -2]} intensity={0.4} color="#c8b49a" />
      <pointLight position={[0, 4, -2]} intensity={0.6} color="#ffffff" />

      <Suspense fallback={null}>
        <ChairModel scrollProgress={scrollProgress} phase={phase} />
        <ContactShadows
          position={[0, 0, 0]} opacity={0.55} scale={6}
          blur={2.5} far={4} color="#000000"
        />
        <Environment preset="studio" />
      </Suspense>
    </Canvas>
  )
}

// ─── Nav ─────────────────────────────────────────────────────────────────────
function LangToggle({ lang, setLang }) {
  return (
    <button className="lang-toggle" onClick={() => setLang(l => l === 'en' ? 'ar' : 'en')} aria-label="Switch language">
      <span className={lang === 'en' ? 'active' : ''}>EN</span>
      <span className="sep">|</span>
      <span className={lang === 'ar' ? 'active' : ''}>AR</span>
    </button>
  )
}

function Nav({ lang, setLang, scrolled, t }) {
  const waLink = `https://wa.me/${WA_NUMBER}?text=${t.waMsg}`
  return (
    <nav className={`nav ${scrolled ? 'scrolled' : ''}`}>
      <a href="#top" className="brand">
        <span className="brand-mark" style={{ color: scrolled ? '' : '#f4f1ea' }}>Meubles BM</span>
        <span className="brand-plus">+</span>
      </a>
      <div className="nav-links">
        <a href="#collection" className="hide-mobile" style={{ color: scrolled ? '' : '#f4f1ea' }}>{t.nav.collection}</a>
        <a href="#savoir" className="hide-mobile" style={{ color: scrolled ? '' : '#f4f1ea' }}>{t.nav.savoir}</a>
        <a href="#contact" className="hide-mobile" style={{ color: scrolled ? '' : '#f4f1ea' }}>{t.nav.contact}</a>
        <LangToggle lang={lang} setLang={setLang} />
        <a href={waLink} target="_blank" rel="noreferrer" className="btn btn-nav-cta">
          {t.nav.cta} <IconArrow rtl={lang === 'ar'} />
        </a>
      </div>
    </nav>
  )
}

// ─── Hero ─────────────────────────────────────────────────────────────────────
function Hero({ t, lang, waLink }) {
  const heroRef = useRef()
  const scrollProgress = useRef(0)
  const [phase, setPhase] = useState(0)
  const phases = t.heroPhases

  useEffect(() => {
    const onScroll = () => {
      if (!heroRef.current) return
      const rect = heroRef.current.getBoundingClientRect()
      const totalScroll = heroRef.current.offsetHeight - window.innerHeight
      const scrolled = -rect.top
      const progress = Math.max(0, Math.min(1, scrolled / totalScroll))
      scrollProgress.current = progress
      const newPhase = progress < 0.33 ? 0 : progress < 0.66 ? 1 : 2
      setPhase(p => p !== newPhase ? newPhase : p)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const cur = phases[phase]

  return (
    <div ref={heroRef} className="hero-scroll-container" id="top">
      <div className="hero-sticky">
        {/* Studio background */}
        <div className="hero-studio-bg" />

        {/* Left — text */}
        <div className="hero-text-side">
          <AnimatePresence mode="wait">
            <motion.div
              key={phase}
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
            >
              <p className="eyebrow hero-eyebrow">{cur.eyebrow}</p>
              <h1 className="display hero-h1">{cur.h1}</h1>
              <p className="hero-p">{cur.p}</p>
            </motion.div>
          </AnimatePresence>

          <motion.div
            className="hero-actions"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            <a href={waLink} target="_blank" rel="noreferrer" className="btn btn-wa">
              <IconWA /> {t.hero.btnWa}
            </a>
            <a href="#collection" className="btn btn-ghost hero-ghost">{t.hero.btnGhost}</a>
          </motion.div>

          {/* Phase dots */}
          <div className="hero-dots">
            {phases.map((_, i) => (
              <span key={i} className={`hero-dot ${i === phase ? 'active' : ''}`} />
            ))}
          </div>
        </div>

        {/* Right — 3D canvas */}
        <div className="hero-canvas-side">
          <HeroCanvas scrollProgress={scrollProgress} phase={phase} />
        </div>

        <span className="scroll-hint" style={lang === 'ar' ? { right: 'auto', left: 'var(--pad)' } : {}}>
          {t.hero.scroll}
        </span>
      </div>
    </div>
  )
}

// ─── Rest of sections (unchanged content, same as before) ────────────────────
function Marquee({ t }) {
  const loop = [...t.marquee, ...t.marquee]
  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee-track">
        {loop.map((w, i) => <span key={i}>{w}</span>)}
      </div>
    </div>
  )
}

function Intro({ t, lang }) {
  return (
    <section className="section container" id="savoir">
      <div className="split">
        <Reveal className="split-media">
          <img src="/media/product.jpg" alt="Lit display BM+ with black frame and glass shelves" />
          <span className="tag">{t.intro.tag}</span>
        </Reveal>
        <div className="lead">
          <Reveal as="p" className="eyebrow">{t.intro.eyebrow}</Reveal>
          <Reveal as="h2" className="display">{t.intro.h2}</Reveal>
          <Reveal as="p" className="big">{t.intro.big}</Reveal>
          <Reveal as="p">{t.intro.p}</Reveal>
          <Reveal>
            <a href="#contact" className="btn btn-ghost" style={{ marginTop: '0.6rem' }}>
              {t.intro.btn} <IconArrow rtl={lang === 'ar'} />
            </a>
          </Reveal>
        </div>
      </div>
      <div className="stats">
        {t.stats.map(([num, suf, label], i) => (
          <Reveal className="stat" i={i} key={label}>
            <div className="num">{num}<span>{suf}</span></div>
            <div className="label">{label}</div>
          </Reveal>
        ))}
      </div>
    </section>
  )
}

function Collection({ t }) {
  return (
    <section className="section container" id="collection">
      <div className="head-row">
        <div>
          <Reveal as="p" className="eyebrow">{t.collection.eyebrow}</Reveal>
          <Reveal as="h2" className="display">{t.collection.h2}</Reveal>
        </div>
        <Reveal as="p">{t.collection.p}</Reveal>
      </div>
      <div className="grid">
        <Reveal className="card c-tall" i={0}>
          <video src="/media/clip1.mp4" autoPlay muted loop playsInline />
          <div className="meta"><span className="k">{t.collection.cards[0][0]}</span><h3>{t.collection.cards[0][1]}</h3></div>
        </Reveal>
        <Reveal className="card c-wide" i={1}>
          <video src="/media/clip2.mp4" autoPlay muted loop playsInline />
          <div className="meta"><span className="k">{t.collection.cards[1][0]}</span><h3>{t.collection.cards[1][1]}</h3></div>
        </Reveal>
        <Reveal className="card c-half" i={2}>
          <video src="/media/clip3.mp4" autoPlay muted loop playsInline />
          <div className="meta"><span className="k">{t.collection.cards[2][0]}</span><h3>{t.collection.cards[2][1]}</h3></div>
        </Reveal>
        <Reveal className="card c-half" i={3}>
          <img src="/media/product.jpg" alt="BM+ display unit" />
          <div className="meta"><span className="k">{t.collection.cards[3][0]}</span><h3>{t.collection.cards[3][1]}</h3></div>
        </Reveal>
      </div>
    </section>
  )
}

function Values({ t }) {
  return (
    <section className="section container">
      <Reveal as="p" className="eyebrow">{t.values.eyebrow}</Reveal>
      <Reveal as="h2" className="display" i={1} style={{ fontSize: 'clamp(2rem,5vw,3.6rem)', margin: '1rem 0 3.5rem', maxWidth: '16ch' }}>
        {t.values.h2}
      </Reveal>
      <div className="values">
        {t.values.items.map(([idx, title, body], i) => (
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

function CTA({ t }) {
  const waLink = `https://wa.me/${WA_NUMBER}?text=${t.waMsg}`
  return (
    <section className="section container">
      <Reveal className="cta">
        <p className="eyebrow">{t.cta.eyebrow}</p>
        <h2 className="display">{t.cta.h2}</h2>
        <p>{t.cta.p}</p>
        <div className="cta-actions">
          <a href={waLink} target="_blank" rel="noreferrer" className="btn btn-wa">
            <IconWA /> {t.cta.btnWa}
          </a>
          <a href={`mailto:${EMAIL}`} className="btn btn-ghost">{t.cta.btnGhost}</a>
        </div>
      </Reveal>
    </section>
  )
}

function Contact({ t }) {
  const waLink = `https://wa.me/${WA_NUMBER}?text=${t.waMsg}`
  return (
    <section className="section container" id="contact">
      <Reveal as="p" className="eyebrow">{t.contact.eyebrow}</Reveal>
      <Reveal as="h2" className="display" i={1} style={{ fontSize: 'clamp(2rem,5vw,3.6rem)', marginTop: '1rem' }}>
        {t.contact.h2}
      </Reveal>
      <div className="contact-grid">
        <Reveal className="contact-item" i={0}>
          <span className="k">{t.contact.items[0][0]}</span>
          <a href={waLink} target="_blank" rel="noreferrer">0781 41 81 42</a>
        </Reveal>
        <Reveal className="contact-item" i={1}>
          <span className="k">{t.contact.items[1][0]}</span>
          <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
        </Reveal>
        <Reveal className="contact-item" i={2}>
          <span className="k">{t.contact.items[2][0]}</span>
          <p>{t.contact.items[2][1]}</p>
        </Reveal>
      </div>
    </section>
  )
}

function Footer({ t }) {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <a href="#top" className="brand">
          <span className="brand-mark">Meubles BM</span><span className="brand-plus">+</span>
        </a>
        <small>{t.footer}</small>
      </div>
    </footer>
  )
}

// ─── App ──────────────────────────────────────────────────────────────────────
export default function App() {
  const [lang, setLang] = useState('en')
  const [scrolled, setScrolled] = useState(false)
  const t = T[lang]
  const waLink = `https://wa.me/${WA_NUMBER}?text=${t.waMsg}`

  useEffect(() => {
    document.documentElement.dir = t.dir
    document.documentElement.lang = lang
  }, [lang, t.dir])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > window.innerHeight * 0.8)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <Nav lang={lang} setLang={setLang} scrolled={scrolled} t={t} />
      <Hero t={t} lang={lang} waLink={waLink} />
      <Marquee t={t} />
      <Intro t={t} lang={lang} />
      <Collection t={t} />
      <Values t={t} />
      <CTA t={t} />
      <Contact t={t} />
      <Footer t={t} />
      <a href={waLink} target="_blank" rel="noreferrer" className="wa-float" aria-label="Contact on WhatsApp">
        <IconWA />
      </a>
    </>
  )
}
