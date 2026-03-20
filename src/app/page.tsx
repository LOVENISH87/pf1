'use client';
import { useState, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';

/* ── DATA ── */
const CERTIFICATES = [
  {
    id: 1,
    title: 'Computer Communications',
    issuer: 'Coursera · Univ. of Colorado Boulder',
    date: 'Dec 2024',
    icon: '🌐',
    bg: 'linear-gradient(135deg, #0056d2, #003f9e)',
    driveId: '1pcglYvR2QMwrtbIW29mIsyxFWplCM4Ii',
    viewUrl: 'https://drive.google.com/file/d/1pcglYvR2QMwrtbIW29mIsyxFWplCM4Ii/view?usp=sharing',
  },
  {
    id: 2,
    title: 'Responsive Web Design',
    issuer: 'freeCodeCamp',
    date: 'Nov 2023',
    icon: '💻',
    bg: 'linear-gradient(135deg, #0a0a23, #1a1a40)',
    driveId: '1C7_PFO0rBc_inGu8po0TYoeIxpPVeynm',
    viewUrl: 'https://drive.google.com/file/d/1C7_PFO0rBc_inGu8po0TYoeIxpPVeynm/view?usp=sharing',
  },
  {
    id: 3,
    title: 'Full Stack Development with MEAN',
    issuer: 'Nasscom Foundation · thingQbator',
    date: '2025',
    icon: '🚀',
    bg: 'linear-gradient(135deg, #00b4d8, #0077b6)',
    driveId: '1PjLhq5TTJ7QJx3_dcTn0ecfWnKRWWKaC',
    viewUrl: 'https://drive.google.com/file/d/1PjLhq5TTJ7QJx3_dcTn0ecfWnKRWWKaC/view?usp=sharing',
  },
  {
    id: 4,
    title: 'Computational Theory: Language Principle & Finite Automata',
    issuer: 'Infosys Springboard',
    date: 'Aug 2025',
    icon: '🧮',
    bg: 'linear-gradient(135deg, #007cc2, #004f8b)',
    driveId: '1euZiaDcGX0IY_rdh3JdtmLPqVR6uHuk2',
    viewUrl: 'https://drive.google.com/file/d/1euZiaDcGX0IY_rdh3JdtmLPqVR6uHuk2/view?usp=sharing',
  },
  {
    id: 5,
    title: 'Intro to Hardware & Operating Systems',
    issuer: 'IBM · Coursera',
    date: 'Sep 2024',
    icon: '🖥️',
    bg: 'linear-gradient(135deg, #1f70c1, #0a3f80)',
    driveId: '1H8JDs72eQvtD1bxW5q7_ERdpKUq8ZhTd',
    viewUrl: 'https://drive.google.com/file/d/1H8JDs72eQvtD1bxW5q7_ERdpKUq8ZhTd/view?usp=sharing',
  },
  {
    id: 6,
    title: 'BinaryBlitz Web Hackathon',
    issuer: 'CodingNinjas LPU',
    date: 'Mar 2024',
    icon: '⚡',
    bg: 'linear-gradient(135deg, #f72585, #7209b7)',
    driveId: '1jlWuZmCkAKIAGisiVJXT3WdpiB0igqJu',
    viewUrl: 'https://drive.google.com/file/d/1jlWuZmCkAKIAGisiVJXT3WdpiB0igqJu/view?usp=sharing',
  },
];

/* ── ANIMATION VARIANTS ── */
const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' as const } },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const cardVariant = {
  hidden: { opacity: 0, y: 30, scale: 0.97 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, ease: 'easeOut' as const } },
};

/* ── ANIMATED SECTION WRAPPER ── */
function Section({ children, id, className }: { children: React.ReactNode; id?: string; className?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  return (
    <motion.section
      id={id}
      ref={ref}
      className={className}
      variants={{ hidden: {}, visible: {} }}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
    >
      {children}
    </motion.section>
  );
}

/* ── CERT CARD ── */
function CertCard({ cert, index, onClick }: { cert: typeof CERTIFICATES[0]; index: number; onClick: () => void }) {
  const [imgLoaded, setImgLoaded] = useState(false);
  const [imgFailed, setImgFailed] = useState(false);

  return (
    <motion.div
      variants={cardVariant}
      custom={index}
      className="cert-card"
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && onClick()}
      whileHover={{ y: -8, transition: { duration: 0.25 } }}
    >
      <div className="cert-preview-wrapper">
        {/* Attempt thumbnail load */}
        {!imgFailed && (
          <motion.img
            src={`https://drive.google.com/thumbnail?id=${cert.driveId}&sz=w800`}
            alt={cert.title}
            className="cert-preview-img"
            loading="lazy"
            initial={{ opacity: 0 }}
            animate={{ opacity: imgLoaded ? 1 : 0 }}
            transition={{ duration: 0.4 }}
            onLoad={() => setImgLoaded(true)}
            onError={() => setImgFailed(true)}
          />
        )}

        {/* Beautiful fallback when thumbnail fails or is loading */}
        {(imgFailed || !imgLoaded) && (
          <motion.div
            className="cert-fallback"
            style={{ background: cert.bg }}
            initial={{ opacity: 0 }}
            animate={{ opacity: imgFailed || !imgLoaded ? 1 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="cert-fallback-icon-wrap">
              <span className="cert-fallback-icon">{cert.icon}</span>
              <div className="cert-fallback-ring" />
            </div>
            <p className="cert-fallback-title">{cert.title}</p>
            <p className="cert-fallback-issuer">{cert.issuer}</p>
            <span className="cert-fallback-cta">Click to View ↗</span>
          </motion.div>
        )}

        {/* Hover overlay (only when thumbnail is visible) */}
        {imgLoaded && !imgFailed && (
          <div className="cert-hover-overlay">
            <span className="cert-hover-btn">🔍 View Certificate</span>
          </div>
        )}
      </div>

      <div className="cert-info">
        <p className="cert-title">{cert.title}</p>
        <p className="cert-issuer">{cert.issuer}</p>
        <p className="cert-date">{cert.date}</p>
      </div>
    </motion.div>
  );
}

/* ── MAIN PAGE ── */
export default function Home() {
  const [modalCert, setModalCert] = useState<typeof CERTIFICATES[0] | null>(null);

  return (
    <>
      {/* ── MODAL ── */}
      <AnimatePresence>
        {modalCert && (
          <motion.div
            className="modal-overlay"
            onClick={() => setModalCert(null)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <motion.div
              className="modal-box"
              onClick={(e) => e.stopPropagation()}
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ duration: 0.3, ease: 'easeOut' as const }}
            >
              <button className="modal-close" onClick={() => setModalCert(null)}>✕</button>
              <iframe
                src={`https://drive.google.com/file/d/${modalCert.driveId}/preview`}
                className="modal-iframe"
                allow="autoplay"
                title={modalCert.title}
              />
              <div className="modal-footer">
                <div>
                  <p className="modal-cert-title">{modalCert.title}</p>
                  <p className="modal-cert-issuer">{modalCert.issuer} · {modalCert.date}</p>
                </div>
                <a
                  href={modalCert.viewUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="modal-open-btn"
                  onClick={(e) => e.stopPropagation()}
                >
                  Open in Drive ↗
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── NAVBAR ── */}
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut' as const }}
      >
        <a href="#" className="nav-logo">{'<Lovenish />'}</a>
        <ul className="nav-links">
          <li><a href="#about">About</a></li>
          <li><a href="#skills">Skills</a></li>
          <li><a href="#education">Education</a></li>
          <li><a href="#projects">Projects</a></li>
          <li><a href="#certificates">Certificates</a></li>
          <li><a href="#contact" className="nav-cta">Contact</a></li>
        </ul>
      </motion.nav>

      <div className="container">

        {/* ── HERO ── */}
        <section className="hero" id="home">
          <motion.div
            className="hero-eyebrow"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.5 }}
          >
            <span className="status-dot"></span>
            Open to Opportunities
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6, ease: 'easeOut' as const }}
          >
            Hey, I&apos;m <span className="grad">Lovenish Thakur</span>.<br />
            I build things<br />for the web.
          </motion.h1>

          <motion.p
            className="hero-desc"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.6 }}
          >
            Computer Science student passionate about coding, networking, and learning by doing.
            I love turning ideas into real projects — one commit at a time.
          </motion.p>

          <motion.div
            className="hero-actions"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            <a href="#projects" className="btn-primary">View Projects →</a>
            <a href="#contact" className="btn-ghost">Let&apos;s Talk</a>
          </motion.div>

        </section>

        {/* ── ABOUT ── */}
        <Section id="about">
          <motion.p className="section-label" variants={fadeUp}>// about</motion.p>
          <motion.h2 className="section-title" variants={fadeUp}>About Me</motion.h2>
          <motion.div className="about-grid" variants={stagger}>
            <motion.div className="about-text" variants={fadeUp}>
              <p>
                Hey! I&apos;m Lovenish — a CSE student who genuinely enjoys building things on the web.
                I started with HTML and CSS and never really stopped exploring since.
              </p>
              <p>
                I&apos;ve completed courses on everything from Computer Networking to Data Structures,
                and I love the feeling of putting together projects that actually work.
              </p>
              <p>
                Outside of coding I&apos;m usually watching tech YouTube, exploring new tools, or just debugging
                something I probably shouldn&apos;t have broken in the first place.
              </p>
            </motion.div>
            <motion.div className="about-stats" variants={stagger}>
              {[
                { num: '6', label: 'Certificates Earned' },
                { num: '3+', label: 'Projects Built' },
                { num: '☕', label: 'Powered by Coffee' },
                { num: '∞', label: 'Bugs Fixed (& Created)' },
              ].map((s) => (
                <motion.div key={s.label} className="stat-card" variants={cardVariant} whileHover={{ scale: 1.04 }}>
                  <div className="stat-number">{s.num}</div>
                  <div className="stat-label">{s.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </Section>

        {/* ── SKILLS ── */}
        <Section id="skills">
          <motion.p className="section-label" variants={fadeUp}>// skills</motion.p>
          <motion.h2 className="section-title" variants={fadeUp}>What I Know</motion.h2>

          {(() => {
            const ALL_TECHS = [
              /* ── Frontend ── */
              { name: 'HTML5',      cat: 'Frontend',  img: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg' },
              { name: 'CSS3',       cat: 'Frontend',  img: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original.svg' },
              { name: 'JavaScript', cat: 'Frontend',  img: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg' },
              { name: 'TypeScript', cat: 'Frontend',  img: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg' },
              { name: 'React',      cat: 'Frontend',  img: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg' },
              { name: 'Next.js',    cat: 'Frontend',  img: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-original.svg', invert: true },
              { name: 'Angular',    cat: 'Frontend',  img: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/angularjs/angularjs-original.svg' },
              { name: 'Tailwind',   cat: 'Frontend',  img: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg' },
              { name: 'Bootstrap',  cat: 'Frontend',  img: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/bootstrap/bootstrap-original.svg' },
              { name: 'Sass',       cat: 'Frontend',  img: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/sass/sass-original.svg' },
              { name: 'jQuery',     cat: 'Frontend',  img: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/jquery/jquery-original.svg' },
              { name: 'Vite',       cat: 'Frontend',  img: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vitejs/vitejs-original.svg' },
              /* ── Backend & Languages ── */
              { name: 'Python',     cat: 'Backend',   img: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg' },
              { name: 'C',          cat: 'Backend',   img: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/c/c-original.svg' },
              { name: 'Java',       cat: 'Backend',   img: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/java/java-original.svg' },
              { name: 'Kotlin',     cat: 'Backend',   img: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/kotlin/kotlin-original.svg' },
              { name: 'Node.js',    cat: 'Backend',   img: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg' },
              { name: 'Express',    cat: 'Backend',   img: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/express/express-original.svg', invert: true },
              { name: 'Bash',       cat: 'Backend',   img: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/bash/bash-original.svg' },
              /* ── Database ── */
              { name: 'MySQL',      cat: 'Database',  img: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mysql/mysql-original.svg' },
              { name: 'MongoDB',    cat: 'Database',  img: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mongodb/mongodb-original.svg' },
              { name: 'PostgreSQL', cat: 'Database',  img: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg' },
              { name: 'Redis',      cat: 'Database',  img: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/redis/redis-original.svg' },
              { name: 'Firebase',   cat: 'Database',  img: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/firebase/firebase-original.svg' },
              /* ── Tools ── */
              { name: 'Git',        cat: 'Tools',     img: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg' },
              { name: 'GitHub',     cat: 'Tools',     img: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/github/github-original.svg', invert: true },
              { name: 'VS Code',    cat: 'Tools',     img: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vscode/vscode-original.svg' },
              { name: 'Linux',      cat: 'Tools',     img: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/linux/linux-original.svg' },
              { name: 'Ubuntu',     cat: 'Tools',     img: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/ubuntu/ubuntu-original.svg' },
              { name: 'Arch',     cat: 'Tools',     img: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/archlinux/archlinux-original.svg' },
             
              { name: 'Docker',     cat: 'Tools',     img: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg' },
              { name: 'Postman',    cat: 'Tools',     img: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postman/postman-original.svg' },
              { name: 'Vercel',     cat: 'Tools',     img: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vercel/vercel-original.svg', invert: true },
              { name: 'npm',        cat: 'Tools',     img: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/npm/npm-original-wordmark.svg' },
              { name: 'Figma',      cat: 'Tools',     img: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/figma/figma-original.svg' },
              { name: 'Canva',      cat: 'Tools',     img: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/canva/canva-original.svg' },
            ];

            const TABS = ['Frontend', 'Backend', 'Database', 'Tools'] as const;

            // eslint-disable-next-line react-hooks/rules-of-hooks
            const [activeTab, setActiveTab] = useState<string>('Frontend');
            const filtered = ALL_TECHS.filter(t => t.cat === activeTab);

            return (
              <motion.div variants={fadeUp}>
                {/* Tab bar */}
                <div className="skill-tabs">
                  {TABS.map(tab => (
                    <button
                      key={tab}
                      className={`skill-tab${activeTab === tab ? ' active' : ''}`}
                      onClick={() => setActiveTab(tab)}
                    >
                      {tab}
                      <span className="skill-tab-count">
                        {ALL_TECHS.filter(t => t.cat === tab).length}
                      </span>
                    </button>
                  ))}
                </div>

                {/* Logo grid */}
                <motion.div className="tech-logo-grid" layout>
                  <AnimatePresence mode="popLayout">
                    {filtered.map((tech) => (
                      <motion.div
                        key={tech.name}
                        className="tech-logo-item"
                        layout
                        initial={{ opacity: 0, scale: 0.85 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.85 }}
                        transition={{ duration: 0.2 }}
                        whileHover={{ y: -5, scale: 1.06 }}
                      >
                        <img 
                          src={tech.img} 
                          alt={tech.name} 
                          className={`tech-logo-img ${'invert' in tech && tech.invert ? 'invert-img' : ''}`} 
                          loading="lazy" 
                        />
                        <span className="tech-logo-name">{tech.name}</span>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </motion.div>
              </motion.div>
            );
          })()}
        </Section>

        {/* ── EDUCATION ── */}
        <Section id="education">
          <motion.p className="section-label" variants={fadeUp}>// education</motion.p>
          <motion.h2 className="section-title" variants={fadeUp}>My Journey</motion.h2>
          <motion.div className="edu-timeline" variants={stagger}>

            {/* LPU — current */}
            <motion.div className="edu-item current" variants={cardVariant}>
              <div className="edu-dot" />
              <div className="edu-card">
                <span className="edu-badge university">  Currently Enrolled</span>
                <p className="edu-degree">B.Tech — Computer Science & Engineering</p>
                <p className="edu-school">Lovely Professional University (LPU)</p>
                <p className="edu-location">  Punjab, India &nbsp;·&nbsp; 2023 — Present</p>
                <p className="edu-desc">
                  Studying core CS subjects including Data Structures, Algorithms, Computer Networks,
                  Operating Systems, and Full Stack Development. Actively building projects,
                  earning certifications, and participating in hackathons.
                </p>
              </div>
            </motion.div>

            {/* 12th — Aryan Public School */}
            <motion.div className="edu-item" variants={cardVariant}>
              <div className="edu-dot" />
              <div className="edu-card">
                <span className="edu-badge school">  Class XII   </span>
                <p className="edu-degree">Senior Secondary</p>
                <p className="edu-school">Aryan Public School</p>
                <p className="edu-location">  Hamirpur, Himachal Pradesh</p>
                <p className="edu-desc">
                  Completed Class 12 with Science stream (PCM + Computer Science),
                  building a strong foundation in mathematics and programming that led me to pursue CSE.
                </p>
              </div>
            </motion.div>

            {/* 10th — Oasis Public School */}
            <motion.div className="edu-item" variants={cardVariant}>
              <div className="edu-dot" />
              <div className="edu-card">
                <span className="edu-badge school">   Class X  </span>
                <p className="edu-degree">Secondary School</p>
                <p className="edu-school">Oasis Public School</p>
                <p className="edu-location">  Hamirpur, Himachal Pradesh</p>
                <p className="edu-desc">
                  Completed Class 10 with strong academics and an early curiosity for technology
                  and computers that eventually grew into a full-blown passion for software development.
                </p>
              </div>
            </motion.div>

          </motion.div>
        </Section>

        {/* ── PROJECTS ── */}
        <Section id="projects">
          <motion.p className="section-label" variants={fadeUp}>// projects</motion.p>
          <motion.h2 className="section-title" variants={fadeUp}>Things I&apos;ve Built</motion.h2>
          <motion.div className="projects-grid" variants={stagger}>
            {[
              { icon: '🌐', title: 'Project 1', desc: 'Describe your first project here — what it does, what problem it solves, and what you learned building it.', tags: ['HTML', 'CSS', 'JavaScript'] },
              { icon: '⚙️', title: 'Project 2', desc: 'Describe your second project here — what it does, what problem it solves, and what you learned building it.', tags: ['Python', 'Git'] },
              { icon: '🚀', title: 'Project 3', desc: 'Describe your third project here — what it does, what problem it solves, and what you learned building it.', tags: ['C', 'Linux'] },
            ].map((proj) => (
              <motion.div key={proj.title} className="project-card" variants={cardVariant} whileHover={{ y: -6 }}>
                <div className="project-header">
                  <span className="project-icon">{proj.icon}</span>
                  <a href="https://github.com/LOVENISH87" target="_blank" rel="noreferrer" className="project-link">↗</a>
                </div>
                <h3 className="project-title">{proj.title}</h3>
                <p className="project-desc">{proj.desc}</p>
                <div className="project-tags">
                  {proj.tags.map((t) => <span key={t} className="tag">{t}</span>)}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </Section>

        {/* ── CERTIFICATES ── */}
        <Section id="certificates">
          <motion.p className="section-label" variants={fadeUp}>// certificates</motion.p>
          <motion.h2 className="section-title" variants={fadeUp}>My Certifications</motion.h2>
          <motion.div className="certs-grid" variants={stagger}>
            {CERTIFICATES.map((cert, i) => (
              <CertCard key={cert.id} cert={cert} index={i} onClick={() => setModalCert(cert)} />
            ))}
          </motion.div>
        </Section>

        {/* ── CONTACT ── */}
        <Section id="contact">
          <motion.p className="section-label" variants={fadeUp}>// contact</motion.p>
          <motion.h2 className="section-title" variants={fadeUp}>Get In Touch</motion.h2>
          <motion.div className="contact-wrapper" variants={fadeUp}>
            <p>
              Always open to new opportunities, collaborations, or just a good conversation about tech.
              Feel free to reach out — I&apos;ll get back to you!
            </p>
            <motion.div className="contact-links" variants={stagger}>
              {[
                { label: '✉️ Email Me', href: 'mailto:lovenish369@gmail.com' },
                { label: '⌥ GitHub', href: 'https://github.com/LOVENISH87' },
                { label: '💼 LinkedIn', href: 'https://linkedin.com' },
              ].map((link) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  target={link.href.startsWith('mailto') ? undefined : '_blank'}
                  rel="noreferrer"
                  className="contact-link"
                  variants={cardVariant}
                  whileHover={{ y: -3 }}
                >
                  {link.label}
                </motion.a>
              ))}
            </motion.div>
          </motion.div>
        </Section>

      </div>

      {/* ── FOOTER ── */}
      {/* <footer>
        <div className="container">
           <span>Lovenish Thakur</span>  
        </div>
      </footer> */}
    </>
  );
}
