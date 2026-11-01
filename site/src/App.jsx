import { useEffect, useState } from "react";
import { motion, useScroll, useSpring, useMotionValue, useTransform, animate, useInView } from "framer-motion";
import { useRef } from "react";
import Scene3D from "./Scene3D.jsx";
import { links, roles, stats, skills, experience, projects } from "./data.js";

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
          {["about", "skills", "experience", "projects", "contact"].map((s) => <a key={s} href={`#${s}`}>{s}</a>)}
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

        <Section id="contact" title="Let's Connect">
          <div className="socials">
            {[["LinkedIn", links.linkedin], ["GitHub", links.github], ["X", links.x], ["Instagram", links.instagram], ["Facebook", links.facebook], ["Email", links.email], ["Portfolio", links.portfolio]].map(([n, h], i) => (
              <motion.a key={n} href={h} target="_blank" rel="noreferrer" className="btn"
                variants={fadeUp} custom={i} initial="hidden" whileInView="show" viewport={{ once: true }}
                whileHover={{ y: -6, scale: 1.08 }} whileTap={{ scale: 0.95 }}>{n}</motion.a>
            ))}
          </div>
        </Section>
      </main>

      <footer>Built with React · Three.js · Framer Motion — © Jyoti Prakash</footer>
    </>
  );
}
