import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

const WA_NUMBER = '213781418142'
const WA_MSG_EN = encodeURIComponent("Hello BM+, I'd like to get a quote for custom furniture.")
const WA_MSG_AR = encodeURIComponent("مرحباً BM+، أرغب في الحصول على عرض سعر لأثاث مخصص.")
const EMAIL = 'mokhtarboukabous92@gmail.com'

const T = {
  en: {
    dir: 'ltr',
    waMsg: WA_MSG_EN,
    nav: { collection: 'Collection', savoir: 'Craftsmanship', contact: 'Contact', cta: 'Get a Quote' },
    hero: {
      eyebrow: 'Exceptional Furniture · Kolea, Algeria',
      h1: <>Furniture that <span className="italic">inhabits</span> space.</>,
      p: 'BM+ designs and crafts custom furniture with clean lines — noble materials, precise finishes, mastered light.',
      btnWa: 'Request a quote',
      btnGhost: 'View collection',
      scroll: 'Scroll',
    },
    marquee: ['Custom-made', 'Wardrobes', 'Bookcases', 'Lit displays', 'Kitchens', 'Matte finishes', 'Modern design'],
    intro: {
      eyebrow: 'BM+ Craftsmanship',
      h2: 'Elegance in every detail.',
      big: 'Each piece is conceived as architecture: black structure, clean facades, integrated light.',
      p: 'From first sketch to installation, we accompany each project. Precise measurements, selected materials and careful assembly for a lasting result.',
      btn: 'Talk about your project',
      tag: 'Light Collection',
    },
    stats: [
      ['12+', ' yrs', 'of experience'],
      ['100%', '', 'custom-made'],
      ['48h', '', 'free quote'],
      ['∞', '', 'possible finishes'],
    ],
    collection: {
      eyebrow: 'The collection',
      h2: 'Signature pieces',
      p: 'A selection of creations — from closed wardrobes to lit displays.',
      cards: [
        ['Wardrobe', 'Atelier Line'],
        ['Lit display', 'Light Edition'],
        ['Bookcase', 'Noir Composition'],
        ['Centerpiece', 'Duo Display'],
      ],
    },
    values: {
      eyebrow: 'Why BM+',
      h2: "A craftsman's approach, an architect's finish.",
      items: [
        ['01', 'Custom design', 'We draw each piece according to your space, uses and style — no compromise on proportions.'],
        ['02', 'Materials & finishes', 'Matte facades, lacquered frames, glass and wood: materials selected to last and age with elegance.'],
        ['03', 'Integrated light', 'Discreet LED lighting to showcase your objects and give depth to every storage unit.'],
      ],
    },
    cta: {
      eyebrow: 'Your project starts here',
      h2: 'Request your free quote.',
      p: 'Send us your ideas, dimensions or inspirations on WhatsApp. Quick response and personalized support.',
      btnWa: 'WhatsApp · 0781 41 81 42',
      btnGhost: 'Write to us',
    },
    contact: {
      eyebrow: 'Contact',
      h2: "Let's talk about your interior.",
      items: [
        ['WhatsApp / Phone', null],
        ['Email', null],
        ['Workshop', 'Kolea, Algeria · 42003'],
      ],
    },
    footer: '© 2026 Meubles BM Plus — Custom furniture · Kolea, Algeria',
  },
  ar: {
    dir: 'rtl',
    waMsg: WA_MSG_AR,
    nav: { collection: 'المجموعة', savoir: 'حرفيتنا', contact: 'اتصل بنا', cta: 'طلب عرض سعر' },
    hero: {
      eyebrow: 'أثاث استثنائي · قليعة، الجزائر',
      h1: <>أثاث <span className="italic">يُسكن</span> الفضاء.</>,
      p: 'تُصمّم BM+ وتصنع الأثاث المخصص بخطوط أنيقة — مواد راقية، تشطيبات دقيقة، وإضاءة محكمة.',
      btnWa: 'طلب عرض سعر',
      btnGhost: 'استعرض المجموعة',
      scroll: 'تمرير',
    },
    marquee: ['على القياس', 'غرف ملابس', 'مكتبات', 'واجهات مضيئة', 'مطابخ', 'تشطيبات مطفأة', 'تصميم عصري'],
    intro: {
      eyebrow: 'حرفية BM+',
      h2: 'الأناقة في كل تفصيل.',
      big: 'كل قطعة مُصمَّمة كبنية معمارية: هيكل أسود، واجهات أنيقة، وإضاءة متكاملة.',
      p: 'من الرسم الأول حتى التركيب، نرافق كل مشروع. قياسات دقيقة، مواد مختارة، وتجميع عناية فائقة لنتيجة دائمة.',
      btn: 'تحدث عن مشروعك',
      tag: 'مجموعة الضوء',
    },
    stats: [
      ['12+', ' سنة', 'من الخبرة'],
      ['100%', '', 'على القياس'],
      ['48 س', '', 'عرض سعر مجاني'],
      ['∞', '', 'تشطيبات ممكنة'],
    ],
    collection: {
      eyebrow: 'المجموعة',
      h2: 'القطع المميزة',
      p: 'مختارات من أعمالنا — من غرف الملابس المغلقة إلى الواجهات المضيئة.',
      cards: [
        ['غرفة ملابس', 'خط أتيليه'],
        ['واجهة مضيئة', 'إصدار الضوء'],
        ['مكتبة', 'تركيبة نوار'],
        ['قطعة رئيسية', 'فيترين دوو'],
      ],
    },
    values: {
      eyebrow: 'لماذا BM+',
      h2: 'أسلوب الحرفي، تشطيب المعماري.',
      items: [
        ['01', 'تصميم مخصص', 'نرسم كل قطعة وفق فضائك واستخداماتك وأسلوبك — بلا تنازل على النسب.'],
        ['02', 'مواد وتشطيبات', 'واجهات مطفأة، هياكل ملمّعة، زجاج وخشب: مواد مختارة لتدوم وتشيخ بأناقة.'],
        ['03', 'إضاءة متكاملة', 'إضاءة LED خفية لإبراز مقتنياتك ومنح العمق لكل وحدة تخزين.'],
      ],
    },
    cta: {
      eyebrow: 'مشروعك يبدأ هنا',
      h2: 'اطلب عرض سعرك المجاني.',
      p: 'أرسل لنا أفكارك وأبعادك أو مصادر إلهامك عبر واتساب. رد سريع ومرافقة شخصية.',
      btnWa: 'واتساب · 0781 41 81 42',
      btnGhost: 'راسلنا',
    },
    contact: {
      eyebrow: 'اتصل بنا',
      h2: 'لنتحدث عن ديكور منزلك.',
      items: [
        ['واتساب / هاتف', null],
        ['البريد الإلكتروني', null],
        ['الورشة', 'قليعة، الجزائر · 42003'],
      ],
    },
    footer: '© 2026 مفروشات BM Plus — أثاث مخصص · قليعة، الجزائر',
  },
}

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

function LangToggle({ lang, setLang }) {
  return (
    <button
      className="lang-toggle"
      onClick={() => setLang(l => l === 'en' ? 'ar' : 'en')}
      aria-label="Switch language"
    >
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
        <a href={waLink} target="_blank" rel="noreferrer" className={`btn btn-nav-cta ${scrolled ? 'btn-nav-cta--scrolled' : ''}`}>
          {t.nav.cta} <IconArrow rtl={lang === 'ar'} />
        </a>
      </div>
    </nav>
  )
}

function Hero({ t, lang }) {
  const waLink = `https://wa.me/${WA_NUMBER}?text=${t.waMsg}`
  return (
    <header className="hero" id="top">
      <video className="hero-video" src="/media/hero.mp4" autoPlay muted loop playsInline poster="/media/product.jpg" />
      <div className="hero-inner">
        <motion.div initial="hidden" animate="show">
          <Reveal as="p" className="eyebrow" i={0}>{t.hero.eyebrow}</Reveal>
          <Reveal as="h1" className="display" i={1}>{t.hero.h1}</Reveal>
          <Reveal as="p" i={2}>{t.hero.p}</Reveal>
          <Reveal className="hero-actions" i={3}>
            <a href={waLink} target="_blank" rel="noreferrer" className="btn btn-wa">
              <IconWA /> {t.hero.btnWa}
            </a>
            <a href="#collection" className="btn btn-ghost">{t.hero.btnGhost}</a>
          </Reveal>
        </motion.div>
      </div>
      <span className="scroll-hint" style={lang === 'ar' ? { right: 'auto', left: 'var(--pad)' } : {}}>{t.hero.scroll}</span>
    </header>
  )
}

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
  const waLink = `https://wa.me/${WA_NUMBER}?text=${t.waMsg}`
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

export default function App() {
  const [lang, setLang] = useState('en')
  const [scrolled, setScrolled] = useState(false)
  const t = T[lang]

  useEffect(() => {
    document.documentElement.dir = t.dir
    document.documentElement.lang = lang
  }, [lang, t.dir])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const waLink = `https://wa.me/${WA_NUMBER}?text=${t.waMsg}`

  return (
    <>
      <Nav lang={lang} setLang={setLang} scrolled={scrolled} t={t} />
      <Hero t={t} lang={lang} />
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
