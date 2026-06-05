import { useEffect, useMemo, useRef, useState, Suspense } from 'react'
import { motion, AnimatePresence, useScroll, useTransform, useMotionValueEvent } from 'framer-motion'
import { Canvas, useFrame } from '@react-three/fiber'
import { useGLTF, Environment, ContactShadows } from '@react-three/drei'
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
  hidden: { opacity: 0, y: 42, filter: 'blur(8px)' },
  show: (i = 0) => ({
    opacity: 1, y: 0, filter: 'blur(0px)',
    transition: { duration: 1.0, ease: [0.16, 1, 0.3, 1], delay: i * 0.09 },
  }),
}
const Reveal = ({ children, i = 0, className, as: Tag = 'div', style }) => {
  const MTag = motion[Tag] || motion.div
  return (
    <MTag className={className} style={style} variants={rise} custom={i}
      initial="hidden" whileInView="show"
      viewport={{ once: true, amount: 0.25, margin: '0px 0px -12% 0px' }}>
      {children}
    </MTag>
  )
}

// Headline clip-wipe — used for the big display headings (artistic line reveal)
const RevealHeading = ({ children, className, style, as: Tag = 'h2' }) => {
  const MTag = motion[Tag] || motion.h2
  return (
    <MTag
      className={className} style={style}
      initial={{ opacity: 0, y: 30, clipPath: 'inset(0 0 100% 0)' }}
      whileInView={{ opacity: 1, y: 0, clipPath: 'inset(0 0 -10% 0)' }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 1.05, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </MTag>
  )
}

// ─── 3D Chair ─────────────────────────────────────────────────────────────────
const FIT_SIZE = 2.4 // world units the model's tallest axis is normalized to

function ChairModel({ scrollProgress, phase, onGround }) {
  const { scene } = useGLTF('/models/9362268e-0236-4990-9190-4750689b0e7c/base_basic_pbr.glb')
  const groupRef = useRef()
  const prevPhase = useRef(phase)
  const scaleSpring = useRef(1)
  const scaleTarget = useRef(1)

  // Normalize once per model: recenter geometry on its true centroid and
  // uniformly scale so framing is identical regardless of the GLB's raw units.
  const { offset, baseScale, groundY } = useMemo(() => {
    const box = new THREE.Box3().setFromObject(scene)
    const center = box.getCenter(new THREE.Vector3())
    const size = box.getSize(new THREE.Vector3())
    const maxDim = Math.max(size.x, size.y, size.z) || 1
    const baseScale = FIT_SIZE / maxDim
    return {
      offset: center, // primitive is shifted by -offset so centroid sits at group origin
      baseScale,
      groundY: -(size.y * baseScale) / 2, // y of the model's feet after centering
    }
  }, [scene])

  // Report the floor height so the contact shadow tracks the real feet.
  useEffect(() => { onGround?.(groundY) }, [groundY, onGround])

  // Brief zoom-in pulse on each phase change.
  useEffect(() => {
    if (phase === prevPhase.current) return
    scaleTarget.current = 1.1
    prevPhase.current = phase
    const id = setTimeout(() => { scaleTarget.current = 1 }, 420)
    return () => clearTimeout(id)
  }, [phase])

  useFrame((state) => {
    const g = groupRef.current
    if (!g) return
    // Scroll-driven spin around the centroid (in place, no wobble).
    const targetY = scrollProgress.current * Math.PI * 2.5
    g.rotation.y += (targetY - g.rotation.y) * 0.06
    // Gentle float around the centered origin — additive, never clobbers centering.
    g.position.y = Math.sin(state.clock.elapsedTime * 0.8) * 0.045
    // Spring the phase-zoom on top of the normalized base scale.
    scaleSpring.current += (scaleTarget.current - scaleSpring.current) * 0.1
    g.scale.setScalar(baseScale * scaleSpring.current)
  })

  return (
    <group ref={groupRef}>
      <primitive object={scene} position={[-offset.x, -offset.y, -offset.z]} />
    </group>
  )
}

function HeroCanvas({ scrollProgress, phase }) {
  const [groundY, setGroundY] = useState(-1.2)
  return (
    <Canvas
      shadows
      dpr={[1, 2]}
      camera={{ position: [0, 0.45, 4.2], fov: 38 }}
      style={{ background: 'transparent' }}
      gl={{ antialias: true, alpha: true }}
      onCreated={({ camera }) => camera.lookAt(0, 0, 0)}
    >
      <ambientLight intensity={0.85} />
      <directionalLight
        position={[3, 5, 3]} intensity={1.5}
        castShadow shadow-mapSize={[2048, 2048]}
      />
      <directionalLight position={[-4, 2, -2]} intensity={0.5} color="#d8c4a8" />
      <pointLight position={[0, 4, -2]} intensity={0.4} color="#ffffff" />

      <Suspense fallback={null}>
        <ChairModel scrollProgress={scrollProgress} phase={phase} onGround={setGroundY} />
        <ContactShadows
          position={[0, groundY, 0]} opacity={0.32} scale={5}
          blur={2.8} far={3} color="#2a2118"
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
        <span className="brand-mark">Meubles BM</span>
        <span className="brand-plus">+</span>
      </a>
      <div className="nav-links">
        <a href="#collection" className="hide-mobile">{t.nav.collection}</a>
        <a href="#savoir" className="hide-mobile">{t.nav.savoir}</a>
        <a href="#contact" className="hide-mobile">{t.nav.contact}</a>
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
  const scrollProgress = useRef(0) // raw 0..1, fed to the 3D spin
  const [phase, setPhase] = useState(0)
  const phases = t.heroPhases
  const rtl = lang === 'ar'
  const layerRef = useRef()

  // On phones the chair stays centered (just reveals copy below) instead of docking aside
  const [isMobile, setIsMobile] = useState(false)
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 860px)')
    const update = () => setIsMobile(mq.matches)
    update()
    mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
  }, [])

  // Continuous scroll progress over the sticky container
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end end'],
  })

  // Intro overlay fades out as the chair leaves center
  const introOpacity = useTransform(scrollYProgress, [0, 0.12], [1, 0])
  const introY = useTransform(scrollYProgress, [0, 0.12], [0, -30])
  // Text panel slides/fades in once the chair has moved over (or just fades up on mobile)
  const textOpacity = useTransform(scrollYProgress, [0.12, 0.28], [0, 1])
  const textX = useTransform(scrollYProgress, [0.12, 0.28], [rtl ? 44 : -44, 0])

  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    scrollProgress.current = v
    // Dock the chair aside on desktop; keep it centered on mobile
    if (layerRef.current) {
      const t = Math.min(1, v / 0.22)
      const shift = isMobile ? 0 : (rtl ? -26 : 26) * t
      layerRef.current.style.transform = `translateX(${shift}%)`
    }
    // Cycle the three copy phases across the docked region
    const next = v < 0.46 ? 0 : v < 0.72 ? 1 : 2
    setPhase(p => (p !== next ? next : p))
  })

  const cur = phases[phase]

  return (
    <div ref={heroRef} className="hero-scroll-container" id="top">
      <div className="hero-sticky">
        {/* White gallery backdrop + artistic watermark */}
        <div className="hero-light-bg" />
        <span className="hero-watermark" aria-hidden="true">BM+</span>

        {/* 3D layer — center → docks aside (desktop) / stays centered (mobile) */}
        <div ref={layerRef} className="hero-canvas-layer">
          <HeroCanvas scrollProgress={scrollProgress} phase={phase} />
        </div>

        {/* Centered intro (before dock) */}
        <motion.div className="hero-intro" style={{ opacity: introOpacity, y: introY }}>
          <p className="eyebrow hero-intro-eyebrow">{phases[0].eyebrow}</p>
          <h2 className="display hero-intro-title">Meubles <span className="brass">BM+</span></h2>
          <span className="hero-intro-cue">{t.hero.scroll}</span>
        </motion.div>

        {/* Text panel — revealed beside the docked chair */}
        <motion.div className="hero-text-side" style={{ opacity: textOpacity, x: textX }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={phase}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -18 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              <p className="eyebrow hero-eyebrow">{cur.eyebrow}</p>
              <h1 className="display hero-h1">{cur.h1}</h1>
              <p className="hero-p">{cur.p}</p>
            </motion.div>
          </AnimatePresence>

          <div className="hero-actions">
            <a href={waLink} target="_blank" rel="noreferrer" className="btn btn-wa">
              <IconWA /> {t.hero.btnWa}
            </a>
            <a href="#collection" className="btn hero-ghost">{t.hero.btnGhost}</a>
          </div>

          <div className="hero-dots">
            {phases.map((_, i) => (
              <span key={i} className={`hero-dot ${i === phase ? 'active' : ''}`} />
            ))}
          </div>
        </motion.div>

        <span className="scroll-hint" style={rtl ? { right: 'auto', left: 'var(--pad)' } : {}}>
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
          <RevealHeading className="display">{t.intro.h2}</RevealHeading>
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
          <RevealHeading className="display">{t.collection.h2}</RevealHeading>
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
      <RevealHeading className="display" style={{ fontSize: 'clamp(2rem,5vw,3.6rem)', margin: '1rem 0 3.5rem', maxWidth: '16ch' }}>
        {t.values.h2}
      </RevealHeading>
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
      <RevealHeading className="display" style={{ fontSize: 'clamp(2rem,5vw,3.6rem)', marginTop: '1rem' }}>
        {t.contact.h2}
      </RevealHeading>
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
