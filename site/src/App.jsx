import { useEffect, useState } from "react";
import { motion, AnimatePresence, useScroll, useSpring, useMotionValue, useTransform, animate, useInView } from "framer-motion";
import { useRef } from "react";
import Scene3D from "./Scene3D.jsx";
import { links, roles, stats, skills, experience, projects, phone, quotes, categories, posts } from "./data.js";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.7, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] } }),
};

function Section({ id, title, children }) {
  return (
    <section id={id} className="section">
      <motion.h2 variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-80px" }}>
        <span className="grad">{title}</span>
      </motion.h2>
      {children}
    </section>
  );
}

function Counter({ to, suffix }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const v = useMotionValue(0);
  const text = useTransform(v, (n) => Math.round(n) + suffix);
  useEffect(() => {
    if (inView) animate(v, to, { duration: 1.6, ease: "easeOut" });
  }, [inView, to, v]);
  return <motion.span ref={ref}>{text}</motion.span>;
}

function Typewriter() {
  const [i, setI] = useState(0);
  const [txt, setTxt] = useState("");
  const [del, setDel] = useState(false);
  useEffect(() => {
    const full = roles[i];
    const t = setTimeout(() => {
      if (!del) {
        setTxt(full.slice(0, txt.length + 1));
        if (txt.length + 1 === full.length) setTimeout(() => setDel(true), 1100);
      } else {
        setTxt(full.slice(0, txt.length - 1));
        if (txt.length - 1 === 0) { setDel(false); setI((i + 1) % roles.length); }
      }
    }, del ? 35 : 70);
    return () => clearTimeout(t);
  }, [txt, del, i]);
  return <span className="typed">{txt}<i className="caret" /></span>;
}

function Tilt({ children, className }) {
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  return (
    <motion.div
      className={className}
      style={{ rotateX: rx, rotateY: ry, transformPerspective: 800 }}
      onMouseMove={(e) => {
        const b = e.currentTarget.getBoundingClientRect();
        ry.set(((e.clientX - b.left) / b.width - 0.5) * 14);
        rx.set(-((e.clientY - b.top) / b.height - 0.5) * 14);
      }}
      onMouseLeave={() => { animate(rx, 0); animate(ry, 0); }}
      whileHover={{ scale: 1.03 }}
      variants={fadeUp}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }}
    >
      {children}
    </motion.div>
  );
}

function QuoteRotator() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((n) => (n + 1) % quotes.length), 5000);
    return () => clearInterval(t);
  }, []);
  return (
    <div className="quote-box">
      <AnimatePresence mode="wait">
        <motion.blockquote key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.5 }}>
          <p>“{quotes[i].text}”</p>
          <cite>— {quotes[i].by}</cite>
        </motion.blockquote>
      </AnimatePresence>
    </div>
  );
}

function PostModal({ post, onClose }) {
  useEffect(() => {
    const h = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [onClose]);
  return (
    <motion.div className="overlay" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose}>
      <motion.article className="modal card" role="dialog" aria-modal="true" aria-label={post.title}
        initial={{ y: 60, scale: 0.94, opacity: 0 }} animate={{ y: 0, scale: 1, opacity: 1 }} exit={{ y: 40, opacity: 0 }}
        transition={{ type: "spring", stiffness: 160, damping: 20 }} onClick={(e) => e.stopPropagation()}>
        <button className="close" onClick={onClose} aria-label="Close">✕</button>
        <span className="period">{post.category} · {post.read} read</span>
        <h3 className="modal-title"><span>{post.emoji}</span> {post.title}</h3>
        {post.body?.map((p) => <p key={p}>{p}</p>)}
        {post.speech?.map((p) => <p key={p} className="speech">{p}</p>)}
        {post.steps && <ol>{post.steps.map((st) => <li key={st}>{st}</li>)}</ol>}
        <p className="takeaway">💡 {post.takeaway}</p>
      </motion.article>
    </motion.div>
  );
}

function Blog() {
  const [cat, setCat] = useState("All");
  const [open, setOpen] = useState(null);
  const list = posts.filter((p) => cat === "All" || p.category === cat);
  return (
    <>
      <QuoteRotator />
      <div className="chips filters">
        {categories.map((c) => (
          <button key={c} className={"chip filter" + (c === cat ? " active" : "")} onClick={() => setCat(c)}>{c}</button>
        ))}
      </div>
      <motion.div layout className="grid3">
        <AnimatePresence>
          {list.map((p) => (
            <motion.div key={p.id} layout initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }}
              className="card post" whileHover={{ y: -8, rotateX: 4, rotateY: -4 }} style={{ transformPerspective: 800 }}
              onClick={() => setOpen(p)} role="button" tabIndex={0} onKeyDown={(e) => e.key === "Enter" && setOpen(p)}>
              <div className="emoji">{p.emoji}</div>
              <span className="period">{p.category} · {p.read}</span>
              <h3>{p.title}</h3>
              <p>{p.summary}</p>
              <span className="more grad">Read more →</span>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
      <AnimatePresence>{open && <PostModal post={open} onClose={() => setOpen(null)} />}</AnimatePresence>
    </>
  );
}

const PhoneIcon = () => (
  <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor" aria-hidden="true">
    <path d="M6.6 10.8a15.1 15.1 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.25 11.4 11.4 0 0 0 3.6.57 1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.25.2 2.45.57 3.57a1 1 0 0 1-.25 1z" />
  </svg>
);
const WhatsAppIcon = () => (
  <svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M3.5 20.5l1.3-4.2A8.5 8.5 0 1 1 8 19.3z" />
    <path d="M9 8.5c0 3 2.5 5.500 5.500 5.500l1.200-1.300-1.800-1-.9.700a4 4 0 0 1-1.700-1.700l.7-.9-1-1.800z" fill="currentColor" stroke="none" />
  </svg>
);

function FloatingContact() {
  return (
    <div className="fab-wrap">
      <motion.a className="fab call" href={links.phone} aria-label={`Call ${phone.display}`}
        initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ type: "spring", delay: 1.2 }}
        whileHover={{ scale: 1.15, rotate: -8 }} whileTap={{ scale: 0.9 }}>
        <PhoneIcon /><span className="tip">{phone.display}</span>
      </motion.a>
      <motion.a className="fab wa" href={links.whatsapp} target="_blank" rel="noreferrer" aria-label="Chat on WhatsApp"
        initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ type: "spring", delay: 1.4 }}
        whileHover={{ scale: 1.15, rotate: 8 }} whileTap={{ scale: 0.9 }}>
        <WhatsAppIcon /><span className="tip">WhatsApp</span>
      </motion.a>
    </div>
  );
}

export default function App() {
  const [theme, setTheme] = useState(() => {
    try { return localStorage.getItem("theme") || (matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark"); }
    catch { return "dark"; }
  });
  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    try { localStorage.setItem("theme", theme); } catch { /* storage unavailable */ }
  }, [theme]);

  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 24 });

  return (
    <>
      <Scene3D theme={theme} />
      <motion.div className="progress" style={{ scaleX: progress }} />

      <nav className="nav">
        <a href="#top" className="logo grad">JP</a>
        <div className="navlinks">
          {["about", "skills", "experience", "projects", "blog", "contact"].map((s) => <a key={s} href={`#${s}`}>{s}</a>)}
          <button className="toggle" aria-label="Toggle theme" onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
            {theme === "dark" ? "☀️" : "🌙"}
          </button>
        </div>
      </nav>

      <main>
        <header id="top" className="hero">
          <motion.div className="hero-text" initial="hidden" animate="show">
            <motion.p variants={fadeUp} custom={0} className="eyebrow">👋 Hello, I'm</motion.p>
            <motion.h1 variants={fadeUp} custom={1}><span className="grad">Jyoti Prakash</span></motion.h1>
            <motion.p variants={fadeUp} custom={2} className="role"><Typewriter /></motion.p>
            <motion.p variants={fadeUp} custom={3} className="lead">
              5+ years building scalable MERN/PERN, FinTech, real-time and AI-driven products —
              from LMS and CRM platforms to Document AI with LLMs.
            </motion.p>
            <motion.div variants={fadeUp} custom={4} className="cta">
              <a className="btn primary" href="#projects">View work</a>
              <a className="btn" href={links.email}>Hire me</a>
            </motion.div>
          </motion.div>
          <motion.div
            className="avatar"
            initial={{ opacity: 0, scale: 0.6, rotate: -8 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 90, damping: 14, delay: 0.3 }}
            whileHover={{ rotate: 3, scale: 1.04 }}
          >
            <img src="./profile.png" alt="Jyoti Prakash" />
          </motion.div>
        </header>

        <Section id="about" title="About">
          <div className="stats">
            {stats.map((s, i) => (
              <Tilt key={s.label} className="card stat">
                <b className="grad"><Counter to={s.value} suffix={s.suffix} /></b>
                <span>{s.label}</span>
              </Tilt>
            ))}
          </div>
          <motion.p className="about" variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}>
            Full-Stack Developer based in Gurugram, India. I work across React.js, TypeScript, Node.js and Python/FastAPI,
            with experience in LLM workflows, backend systems, data platforms, cloud deployment and third-party integrations.
            B.Tech in Information Technology, CUSAT (2016–2020).
          </motion.p>
        </Section>

        <Section id="skills" title="Skills">
          <div className="grid2">
            {Object.entries(skills).map(([group, items]) => (
              <Tilt key={group} className="card">
                <h3>{group}</h3>
                <div className="chips">
                  {items.map((s, i) => (
                    <motion.span key={s} className="chip" whileHover={{ y: -4, scale: 1.08 }}
                      initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }} transition={{ delay: i * 0.03 }}>{s}</motion.span>
                  ))}
                </div>
              </Tilt>
            ))}
          </div>
        </Section>

        <Section id="experience" title="Experience">
          <div className="timeline">
            {experience.map((e, i) => (
              <motion.div key={e.company} className="tl-item"
                initial={{ opacity: 0, x: i % 2 ? 60 : -60 }} whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-60px" }} transition={{ duration: 0.7 }}>
                <span className="dot" />
                <div className="card">
                  <span className="period">{e.period}</span>
                  <h3>{e.role} · <span className="grad">{e.company}</span></h3>
                  <ul>{e.points.map((p) => <li key={p}>{p}</li>)}</ul>
                </div>
              </motion.div>
            ))}
          </div>
        </Section>

        <Section id="projects" title="Projects">
          <div className="grid3">
            {projects.map((p) => (
              <Tilt key={p.name} className="card project">
                <span className="period">{p.tag}</span>
                <h3>{p.name}</h3>
                <p>{p.desc}</p>
                <div className="chips">{p.stack.map((s) => <span key={s} className="chip sm">{s}</span>)}</div>
              </Tilt>
            ))}
          </div>
        </Section>

        <Section id="blog" title="Blog · Mindset & Problem Solving">
          <Blog />
        </Section>

        <Section id="contact" title="Let's Connect">
          <div className="socials">
            {[["LinkedIn", links.linkedin], ["GitHub", links.github], ["X", links.x], ["Instagram", links.instagram], ["Facebook", links.facebook], ["Call " + phone.display, links.phone], ["WhatsApp", links.whatsapp], ["Email", links.email], ["Portfolio", links.portfolio]].map(([n, h], i) => (
              <motion.a key={n} href={h} target="_blank" rel="noreferrer" className="btn"
                variants={fadeUp} custom={i} initial="hidden" whileInView="show" viewport={{ once: true }}
                whileHover={{ y: -6, scale: 1.08 }} whileTap={{ scale: 0.95 }}>{n}</motion.a>
            ))}
          </div>
        </Section>
      </main>

      <FloatingContact />

      <footer>Built with React · Three.js · Framer Motion — © Jyoti Prakash</footer>
    </>
  );
}
