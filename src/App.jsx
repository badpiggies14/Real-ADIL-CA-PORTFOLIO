import { useEffect, useMemo, useRef, useState } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import {
  ArrowUpRight,
  Mail,
  Send,
  Speaker,
  VolumeX,
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const accent = '#FF6B2B';

const projects = [
  {
    name: 'VENODESIGN',
    image: 'public/images/herosection/myimage1.png',
    link: 'https://www.venodesign.store',
    description:
      'VENO DESIGN is a premium web design studio focused on building high-converting portfolio websites, modern business landing pages, and visually cinematic digital experiences.',
    tags: ['Web Design', 'Portfolio Website', 'UI/UX', 'Next.js'],
  },
  {
    name: 'CALCULATOR FOR MALAYALI',
    image: 'public/images/herosection/myimage2.png',
    link: 'https://calculator-for-malayali.vercel.app',
    description:
      'Calculator For Malayali is a clean and user-friendly utility web app designed for Malayali users to perform quick calculations with a simple and accessible interface.',
    tags: ['Calculator App', 'Web App', 'Utility Tool', 'Modern UI'],
  },
  {
    name: 'DIET PLANNER FOR KERALA',
    image: 'public/images/herosection/myimage3.png',
    link: 'diet-planner-for-kerala.vercel.app',
    description:
      'Diet Planner for Kerala is a smart and localized nutrition planning web app designed around Kerala-style food habits and lifestyle.',
    tags: ['Diet Planner', 'Health Web App', 'Nutrition Planner', 'Modern UI'],
  },
  {
    name: 'CRYPTONEST AI',
    image: '[ADD_PROJECT_IMAGE_04]',
    link: '[ADD_PROJECT_LINK_04]',
    description:
      'CryptoNest AI is a futuristic crypto dashboard and portfolio tracking platform that helps users monitor assets, market trends, NFT collections, and wallet performance in real time.',
    tags: ['Web3', 'Crypto Dashboard', 'Portfolio Tracker', 'NFT Analytics'],
  },
  {
    name: 'CREATORLINK STUDIO',
    image: '[ADD_PROJECT_IMAGE_05]',
    link: '[ADD_PROJECT_LINK_05]',
    description:
      'CreatorLink Studio is an all-in-one portfolio and bio-link platform built for creators, freelancers, developers, and influencers.',
    tags: ['Portfolio Website', 'Creator Platform', 'Animation', 'Personal Branding'],
  },
  {
    name: 'VenoFlow Agency CRM',
    image: '[ADD_PROJECT_IMAGE_06]',
    link: '[ADD_PROJECT_LINK_06]',
    description:
      'VenoFlow Agency CRM is a modern client management system designed for freelancers and creative agencies to handle projects, invoices, leads, and communication in one workspace.',
    tags: ['CRM Dashboard', 'Agency Tool', 'Web Application', 'Productivity App'],
  },
];

const skillTags = [
  'Creative Development',
  'Motion Systems',
  'Frontend Engineering',
  'Premium UI',
  'GSAP',
  'Framer Motion',
  'Web Experiences',
  'Brand Direction',
  'Performance',
  'Web3 Aesthetic',
];
const assetBase = import.meta.env.BASE_URL || '/';

function assetPath(path) {
  return `${assetBase}${path}`.replace(/\/{2,}/g, '/');
}

function projectImagePath(image) {
  if (!image || image.startsWith('[')) return null;
  return assetPath(image.replace(/^public\//, ''));
}

function projectLink(link) {
  if (!link || link.startsWith('[')) return '#contact';
  return /^https?:\/\//i.test(link) ? link : `https://${link}`;
}

function BrandIcon({ label, size = 19 }) {
  const props = {
    width: size,
    height: size,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.8,
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
    'aria-hidden': true,
  };

  if (label === 'GitHub') {
    return (
      <svg {...props}>
        <path d="M9 19c-4 1.2-4-2-5.6-2.4" />
        <path d="M15 22v-3.2a2.8 2.8 0 0 0-.8-2.2c2.7-.3 5.6-1.3 5.6-6A4.7 4.7 0 0 0 18.5 7c.1-.4.5-1.8-.2-3.6 0 0-1.1-.3-3.6 1.3a12.5 12.5 0 0 0-6.5 0C5.7 3.1 4.6 3.4 4.6 3.4 3.9 5.2 4.3 6.6 4.4 7a4.7 4.7 0 0 0-1.3 3.6c0 4.7 2.9 5.7 5.6 6a2.8 2.8 0 0 0-.8 2.2V22" />
      </svg>
    );
  }

  if (label === 'LinkedIn') {
    return (
      <svg {...props}>
        <path d="M7 10v8" />
        <path d="M7 6.5v.1" />
        <path d="M11 18v-8" />
        <path d="M11 13.8c0-2.6 5-3 5 0V18" />
        <rect x="3.5" y="3.5" width="17" height="17" rx="3" />
      </svg>
    );
  }

  if (label === 'Twitter / X') {
    return (
      <svg {...props}>
        <path d="M4 4l16 16" />
        <path d="M20 4L4 20" />
      </svg>
    );
  }

  if (label === 'Instagram') {
    return (
      <svg {...props}>
        <rect x="4" y="4" width="16" height="16" rx="4" />
        <circle cx="12" cy="12" r="3.2" />
        <path d="M16.8 7.2h.1" />
      </svg>
    );
  }

  return <Mail size={size} />;
}

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const media = window.matchMedia('(max-width: 760px), (pointer: coarse)');
    const update = () => setIsMobile(media.matches);
    update();
    media.addEventListener('change', update);
    return () => media.removeEventListener('change', update);
  }, []);

  return isMobile;
}

function buildFrameCandidates(index) {
  const four = String(index).padStart(4, '0');
  const three = String(index).padStart(3, '0');
  const names = [
    `ezgif-frame-${three}.png`,
    `ezgif-frame-${four}.png`,
    `ezgif-frame-${index}.png`,
    `frame_${four}.jpg`,
    `frame_${three}.jpg`,
    `frame_${index}.jpg`,
    `frame_${four}.png`,
    `frame_${three}.png`,
    `frame_${index}.png`,
    `${four}.jpg`,
    `${three}.jpg`,
    `${index}.jpg`,
    `${four}.png`,
    `${three}.png`,
    `${index}.png`,
  ];

  return names.flatMap((name) => [
    assetPath(`images/herosection/${name}`),
    assetPath(`image/herosection/${name}`),
  ]);
}

function probeImage(src) {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () => resolve(null);
    img.src = src;
  });
}

async function discoverHeroPattern() {
  const firstOptions = buildFrameCandidates(1);

  for (let i = 0; i < firstOptions.length; i += 1) {
    const loaded = await probeImage(firstOptions[i]);
    if (loaded) {
      return { firstImage: loaded, patternIndex: i };
    }
  }

  return null;
}

function Loader() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let frame;
    const start = performance.now();
    const tick = (now) => {
      const next = Math.min(100, Math.round(((now - start) / 1450) * 100));
      setProgress(next);
      if (next < 100) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <motion.div
      className="loader"
      initial={{ y: 0 }}
      animate={{ y: '-100%' }}
      transition={{ delay: 1.65, duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
    >
      <div className="loader-mark">ADIL</div>
      <div className="loader-row">
        <span>{progress}%</span>
        <div className="loader-line">
          <motion.div animate={{ width: `${progress}%` }} transition={{ ease: 'linear' }} />
        </div>
      </div>
    </motion.div>
  );
}

function CustomCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const glowRef = useRef(null);
  const trailRefs = useRef([]);

  useEffect(() => {
    const isTouch = window.matchMedia('(pointer: coarse)').matches;
    if (isTouch) return undefined;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let x = window.innerWidth / 2;
    let y = window.innerHeight / 2;
    let ringX = x;
    let ringY = y;
    let glowX = x;
    let glowY = y;
    let raf;
    let hoverMode = 'default';
    let magneticTarget = null;
    let lastTrailAt = 0;
    let trailIndex = 0;

    const move = (event) => {
      x = event.clientX;
      y = event.clientY;
      dotRef.current?.style.setProperty('transform', `translate3d(${x}px, ${y}px, 0) scale(1)`);

      if (!reducedMotion && performance.now() - lastTrailAt > 16) {
        const ghost = trailRefs.current[trailIndex % trailRefs.current.length];
        if (ghost) {
          ghost.style.transform = `translate3d(${x}px, ${y}px, 0) scale(1)`;
          ghost.style.opacity = '0.4';
          requestAnimationFrame(() => {
            ghost.style.transform = `translate3d(${x}px, ${y}px, 0) scale(0)`;
            ghost.style.opacity = '0';
          });
        }
        trailIndex += 1;
        lastTrailAt = performance.now();
      }

      if (magneticTarget) {
        const rect = magneticTarget.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const distance = Math.hypot(x - centerX, y - centerY);
        if (distance < 80) {
          const pullX = Math.max(-12, Math.min(12, ((x - centerX) / 80) * 12));
          const pullY = Math.max(-8, Math.min(8, ((y - centerY) / 80) * 8));
          if (magneticTarget.classList.contains('project-card')) {
            magneticTarget.style.setProperty('--magnetic-x', `${pullX}px`);
            magneticTarget.style.setProperty('--magnetic-y', `${pullY}px`);
          } else {
            magneticTarget.style.transform = `translate3d(${pullX}px, ${pullY}px, 0)`;
          }
        }
      }
    };

    const click = () => {
      if (!dotRef.current) return;
      dotRef.current.style.transform = `translate3d(${x}px, ${y}px, 0) scale(2.5)`;
      window.setTimeout(() => {
        dotRef.current?.style.setProperty('transform', `translate3d(${x}px, ${y}px, 0) scale(1)`);
      }, 150);
    };

    const over = (event) => {
      const target = event.target.closest?.('[data-cursor], a, button, input, textarea');
      if (!target) return;

      const mode = target.dataset.cursor || (target.matches('input, textarea') ? 'text' : 'hover');
      hoverMode = mode;
      if (mode === 'magnetic') {
        magneticTarget = target;
        magneticTarget.style.transition = 'transform 0.22s cubic-bezier(0.34,1.56,0.64,1)';
      }
      document.documentElement.dataset.cursorMode = mode;
    };

    const out = (event) => {
      const target = event.target.closest?.('[data-cursor], a, button, input, textarea');
      if (!target) return;
      if (target === magneticTarget) {
        magneticTarget.style.transform = '';
        magneticTarget.style.setProperty('--magnetic-x', '0px');
        magneticTarget.style.setProperty('--magnetic-y', '0px');
        magneticTarget.style.transition = 'transform 0.45s cubic-bezier(0.34,1.56,0.64,1)';
        magneticTarget = null;
      }
      hoverMode = 'default';
      document.documentElement.dataset.cursorMode = 'default';
    };

    const animate = () => {
      ringX += (x - ringX) * 0.16;
      ringY += (y - ringY) * 0.16;
      glowX += (x - glowX) * 0.06;
      glowY += (y - glowY) * 0.06;
      if (ringRef.current) ringRef.current.style.transform = `translate3d(${ringX}px, ${ringY}px, 0)`;
      if (glowRef.current) glowRef.current.style.transform = `translate3d(${glowX}px, ${glowY}px, 0)`;
      raf = requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', move);
    window.addEventListener('mousedown', click);
    document.addEventListener('mouseover', over);
    document.addEventListener('mouseout', out);
    raf = requestAnimationFrame(animate);
    return () => {
      window.removeEventListener('mousemove', move);
      window.removeEventListener('mousedown', click);
      document.removeEventListener('mouseover', over);
      document.removeEventListener('mouseout', out);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      <div ref={dotRef} className="cursor-dot" />
      <div ref={ringRef} className="cursor-ring" />
      <div ref={glowRef} className="cursor-glow" />
      {Array.from({ length: 6 }).map((_, index) => (
        <div
          key={index}
          ref={(node) => {
            trailRefs.current[index] = node;
          }}
          className="cursor-trail"
        />
      ))}
    </>
  );
}

function HeroTitle({ text }) {
  return (
    <h1 aria-label={text} className="hero-title">
      {text.split('').map((letter, index) => (
        <motion.span
          aria-hidden="true"
          key={`${letter}-${index}`}
          initial={{ y: '110%', filter: 'blur(8px)', opacity: 0 }}
          animate={{ y: 0, filter: 'blur(0px)', opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.85 + index * 0.07, ease: [0.16, 1, 0.3, 1] }}
        >
          {letter === ' ' ? '\u00A0' : letter}
        </motion.span>
      ))}
    </h1>
  );
}

function SubtitleWords({ text }) {
  return (
    <p className="hero-subtitle" data-cursor="text">
      {text.split(' ').map((word, index) => (
        <motion.span
          key={`${word}-${index}`}
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 2.15 + index * 0.06 }}
        >
          {word}
        </motion.span>
      ))}
    </p>
  );
}

function Navbar({ soundOn, toggleSound }) {
  const [hidden, setHidden] = useState(false);
  const lastY = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const current = window.scrollY;
      setHidden(current > lastY.current && current > 120);
      lastY.current = current;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTo = (id) => {
    document.querySelector(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <motion.header
      className="navbar"
      initial={{ x: '-50%', y: -80, opacity: 0 }}
      animate={{ x: '-50%', y: hidden ? '-125%' : 0, opacity: hidden ? 0 : 1 }}
      transition={{ duration: 0.45, ease: 'easeOut' }}
    >
      <button className="logo" data-cursor="magnetic" onClick={() => scrollTo('#home')} aria-label="Go to home">
        ADIL CA
      </button>
      <nav>
        {[
          ['Home', '#home'],
          ['About', '#about'],
          ['Projects', '#projects'],
          ['Contact', '#contact'],
        ].map(([label, target]) => (
          <button key={label} data-cursor="magnetic" onClick={() => scrollTo(target)}>
            {label}
          </button>
        ))}
      </nav>
      <div className="nav-actions">
        <button
          className={`sound-button ${soundOn ? 'sound-on' : ''}`}
          data-cursor="magnetic"
          onClick={toggleSound}
          aria-label={soundOn ? 'Turn ambient sound off' : 'Turn ambient sound on'}
          title={soundOn ? 'Sound on' : 'Sound off'}
        >
          {soundOn ? <Speaker size={18} /> : <VolumeX size={18} />}
        </button>
        <button className="touch-button" data-cursor="magnetic" onClick={() => scrollTo('#contact')}>
          Get In Touch
        </button>
      </div>
    </motion.header>
  );
}

function Hero() {
  const canvasRef = useRef(null);
  const sectionRef = useRef(null);
  const framesRef = useRef(new Map());
  const frameCountRef = useRef(205);
  const desiredFrameRef = useRef(1);
  const [hasFrames, setHasFrames] = useState(false);
  const isMobile = useIsMobile();
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end end'] });
  const titleOpacity = useTransform(scrollYProgress, [0, 0.72, 1], [1, 1, 0]);
  const titleY = useTransform(scrollYProgress, [0, 0.6, 1], [0, -10, -40]);

  useEffect(() => {
    if (isMobile) return undefined;
    let killed = false;
    let cleanup = () => {};
    let currentIndex = 0;

    discoverHeroPattern().then((pattern) => {
      if (killed || !pattern) return;
      framesRef.current.set(1, pattern.firstImage);
      setHasFrames(true);
      const canvas = canvasRef.current;
      const context = canvas?.getContext('2d');
      if (!canvas || !context) return;

      const draw = (image) => {
        const ratio = window.devicePixelRatio || 1;
        const width = window.innerWidth;
        const height = window.innerHeight;
        canvas.width = width * ratio;
        canvas.height = height * ratio;
        canvas.style.width = `${width}px`;
        canvas.style.height = `${height}px`;
        context.setTransform(ratio, 0, 0, ratio, 0, 0);
        const scale = Math.max(width / image.width, height / image.height);
        const x = (width - image.width * scale) / 2;
        const y = (height - image.height * scale) / 2;
        context.clearRect(0, 0, width, height);
        context.drawImage(image, x, y, image.width * scale, image.height * scale);
      };

      const loadFrame = async (index) => {
        if (framesRef.current.has(index)) return framesRef.current.get(index);
        const src = buildFrameCandidates(index)[pattern.patternIndex];
        const loaded = await probeImage(src);
        if (loaded) framesRef.current.set(index, loaded);
        return loaded;
      };

      const drawNearestLoaded = (index) => {
        for (let fallback = index; fallback >= 1; fallback -= 1) {
          const frame = framesRef.current.get(fallback);
          if (frame) {
            draw(frame);
            return;
          }
        }
      };

      draw(pattern.firstImage);

      const warmFrames = async () => {
        for (let index = 2; index <= 260 && !killed; index += 1) {
          const loaded = await loadFrame(index);
          if (!loaded) {
            frameCountRef.current = index - 1;
            break;
          }
        }
      };
      warmFrames();

      const trigger = ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top top',
        end: 'bottom bottom',
        scrub: true,
        onUpdate: (self) => {
          const index = Math.max(1, Math.min(frameCountRef.current, Math.round(self.progress * frameCountRef.current)));
          currentIndex = index;
          desiredFrameRef.current = index;
          requestAnimationFrame(() => drawNearestLoaded(index));
          loadFrame(index).then((loaded) => {
            if (loaded && desiredFrameRef.current === index && !killed) draw(loaded);
          });
        },
      });

      ScrollTrigger.refresh();

      const resize = () => drawNearestLoaded(currentIndex || 1);
      window.addEventListener('resize', resize);

      cleanup = () => {
        trigger.kill();
        window.removeEventListener('resize', resize);
      };
    });

    return () => {
      killed = true;
      cleanup();
    };
  }, [isMobile]);

  return (
    <section ref={sectionRef} id="home" className="hero-shell" style={{ minHeight: hasFrames ? '2400px' : '135vh' }}>
      <div className="hero-sticky">
        <canvas ref={canvasRef} className={`hero-canvas ${hasFrames ? 'is-visible' : ''}`} />
        <div className={`hero-fallback ${hasFrames ? 'is-hidden' : ''}`}>
          <div className="orbital orbital-one" />
          <div className="orbital orbital-two" />
          <div className="hero-beam" />
        </div>
        <div className="hero-shade" />
        <motion.div className="hero-copy" style={{ opacity: titleOpacity, y: titleY }}>
          <span className="eyebrow typewriter">Portfolio / Creative Systems</span>
          <HeroTitle text="ADIL CA" />
          <SubtitleWords text="Creative Developer & Designer crafting animated, precise, premium web experiences." />
        </motion.div>
        <div className="scroll-meter">
          <span />
        </div>
      </div>
    </section>
  );
}

function AboutTag({ tag, index, inView }) {
  return (
    <motion.span
      className="about-tag"
      data-cursor="magnetic"
      initial={{ opacity: 0, y: 22, filter: 'blur(10px)' }}
      animate={inView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
      whileHover={{ y: -8, scale: 1.035 }}
      whileTap={{ scale: 0.98 }}
      transition={{ delay: 0.42 + index * 0.055, duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
    >
      {tag}
    </motion.span>
  );
}

function About() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-120px' });
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const portraitY = useTransform(scrollYProgress, [0, 1], [46, -42]);
  const portraitRotate = useTransform(scrollYProgress, [0, 1], [-1.8, 1.8]);
  const lightY = useTransform(scrollYProgress, [0, 1], ['-14%', '16%']);

  return (
    <section id="about" ref={ref} className="section about-section">
      <motion.div className="about-light" style={{ y: lightY }} />
      <div className="about-noise" />
      <motion.div
        className="about-copy"
        initial={{ opacity: 0, y: 58, filter: 'blur(16px)' }}
        animate={inView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      >
        <motion.span
          className="eyebrow about-label"
          initial={{ opacity: 0, x: -18 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.55, delay: 0.08 }}
        >
          About
        </motion.span>
        <h2 className="about-title">
          <motion.span
            initial={{ y: '110%' }}
            animate={inView ? { y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
          >
            Engineered with precision.
          </motion.span>
          <motion.span
            initial={{ y: '110%' }}
            animate={inView ? { y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.22, ease: [0.16, 1, 0.3, 1] }}
          >
            Designed with <em>atmosphere.</em>
          </motion.span>
        </h2>
        <div className="about-body">
          <p data-cursor="text">
            <strong>ADIL CA</strong> - known online as <strong>Huntermonkx</strong> - creates cinematic digital
            experiences that blend engineering discipline with modern visual storytelling.
          </p>
          <p data-cursor="text">
            His work focuses on motion, interaction, and brand presence, shaping interfaces that feel premium, fast, and
            emotionally intentional from the very first scroll.
          </p>
          <p data-cursor="text">
            From web3 culture to modern portfolio systems, every project is crafted around clarity, performance, and a
            visual identity strong enough to be felt before it is explained.
          </p>
        </div>
        <div className="skill-cloud">
          {skillTags.map((tag, index) => (
            <AboutTag key={tag} tag={tag} index={index} inView={inView} />
          ))}
        </div>
      </motion.div>
      <motion.div
        className="portrait-panel"
        data-cursor="magnetic"
        initial={{ opacity: 0, y: 70, scale: 0.94, rotate: 2 }}
        animate={inView ? { opacity: 1, y: 0, scale: 1, rotate: 0 } : {}}
        transition={{ duration: 1, delay: 0.16, ease: [0.16, 1, 0.3, 1] }}
      >
        <motion.div className="portrait-orbit portrait-orbit-one" style={{ rotate: portraitRotate }} />
        <motion.div className="portrait-orbit portrait-orbit-two" style={{ rotate: portraitRotate }} />
        <motion.div className="portrait-image-wrap" style={{ y: portraitY }}>
          <img src={assetPath('images/herosection/myimage.png')} alt="ADIL CA, known online as Huntermonkx" />
          <div className="portrait-scan" />
        </motion.div>
        <div className="portrait-glass">
          <span>01</span>
          <small>Creative Developer</small>
        </div>
        <div className="portrait-caption">
          <div>
            <strong>ADIL CA</strong>
            <small>Huntermonkx</small>
          </div>
          <small>Motion / Interface / Web3</small>
        </div>
      </motion.div>
    </section>
  );
}

function ProjectCard({ project, index }) {
  const cardRef = useRef(null);
  const imageSrc = projectImagePath(project.image);
  const href = projectLink(project.link);
  const projectNumber = String(index + 1).padStart(2, '0');
  const [style, setStyle] = useState({
    '--mx': '50%',
    '--my': '50%',
    '--rx': '0deg',
    '--ry': '0deg',
    '--img-x': '0px',
    '--img-y': '0px',
  });

  const onMove = (event) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const rotateY = ((x / rect.width) - 0.5) * 10;
    const rotateX = ((0.5 - y / rect.height)) * 8;
    setStyle({
      '--mx': `${x}px`,
      '--my': `${y}px`,
      '--rx': `${rotateX}deg`,
      '--ry': `${rotateY}deg`,
      '--img-x': `${((x / rect.width) - 0.5) * -18}px`,
      '--img-y': `${((y / rect.height) - 0.5) * -14}px`,
    });
  };

  return (
    <motion.article
      ref={cardRef}
      className="project-card"
      data-cursor="magnetic"
      style={style}
      onMouseMove={onMove}
      onMouseLeave={() =>
        setStyle({
          '--mx': '50%',
          '--my': '50%',
          '--rx': '0deg',
          '--ry': '0deg',
          '--img-x': '0px',
          '--img-y': '0px',
        })
      }
      initial={{ opacity: 0, y: 70, filter: 'blur(16px)' }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={{ once: true, margin: '-110px' }}
      transition={{ delay: index * 0.075, duration: 0.82, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="project-card-glow" />
      <div className="project-card-grain" />
      <div className="project-topline">
        <motion.span
          className="project-index"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.075 + 0.24, duration: 0.45 }}
        >
          PROJECT {projectNumber}
        </motion.span>
        <span className="project-status">{imageSrc ? 'Live Build' : 'Slot Reserved'}</span>
      </div>
      <a
        className={`project-media ${imageSrc ? '' : 'project-media-placeholder'}`}
        href={href}
        target="_blank"
        rel="noreferrer"
        aria-label={`View ${project.name}`}
      >
        <span className="project-shimmer" />
        {imageSrc ? (
          <img src={imageSrc} alt={`${project.name} project preview`} loading="lazy" />
        ) : (
          <span className="project-placeholder-mark">{projectNumber}</span>
        )}
      </a>
      <div className="project-content">
        <h3>{project.name}</h3>
        <p data-cursor="text">{project.description}</p>
        <div className="project-tags">
          {project.tags.map((tag) => (
            <span key={tag}>{tag}</span>
          ))}
        </div>
      </div>
      <a className="project-link" href={href} target="_blank" rel="noreferrer" data-cursor="magnetic">
        View Project <ArrowUpRight size={17} />
      </a>
    </motion.article>
  );
}

function Projects() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const counter = useTransform(scrollYProgress, (latest) =>
    String(Math.min(projects.length, Math.max(1, Math.round(1 + latest * (projects.length - 1))))).padStart(2, '0')
  );
  const ambientY = useTransform(scrollYProgress, [0, 1], ['-8%', '12%']);

  useEffect(() => {
    if (!ref.current) return undefined;
    const context = gsap.context(() => {
      gsap.to('.projects-orbit', {
        rotate: 360,
        ease: 'none',
        scrollTrigger: {
          trigger: ref.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1.2,
        },
      });
    }, ref);

    return () => context.revert();
  }, []);

  return (
    <section id="projects" ref={ref} className="section projects-section">
      <motion.div className="projects-ambient" style={{ y: ambientY }} />
      <div className="projects-orbit" />
      <div className="projects-noise" />
      <div className="projects-heading">
        <div>
          <span className="eyebrow">Selected Work</span>
          <h2>
            Case <em>Studies</em>
          </h2>
        </div>
        <div className="project-counter" aria-label={`${projects.length} selected projects`}>
          <motion.span>{counter}</motion.span>
          <small>/ {String(projects.length).padStart(2, '0')}</small>
        </div>
      </div>
      <div className="project-grid">
        {projects.map((project, index) => (
          <ProjectCard key={project.name} project={project} index={index} />
        ))}
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section id="contact" className="section contact-section">
      <motion.div
        className="contact-card"
        initial={{ opacity: 0, y: 36 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.75 }}
      >
        <span className="eyebrow">Contact</span>
        <h2><span>Let's Build</span> <em>Something</em></h2>
        <p data-cursor="text">
          Reach out at <a href="mailto:hello@adilca.dev">hello@adilca.dev</a>
        </p>
        <form onSubmit={(event) => event.preventDefault()}>
          <div className="form-row">
            <input aria-label="Name" placeholder="Name" type="text" />
            <input aria-label="Email" placeholder="Email" type="email" />
          </div>
          <textarea aria-label="Message" placeholder="Message" rows="5" />
          <button type="submit" data-cursor="magnetic">
            <Send size={17} /> Send Message
          </button>
        </form>
        <div className="socials">
          {[
            'GitHub',
            'LinkedIn',
            'Twitter / X',
            'Instagram',
            'Email',
          ].map((label) => (
            <a data-cursor="magnetic" href={label === 'Email' ? 'mailto:hello@adilca.dev' : '#home'} key={label} aria-label={label} title={label}>
              <BrandIcon label={label} />
            </a>
          ))}
        </div>
      </motion.div>
    </section>
  );
}

function Footer() {
  return (
    <motion.footer className="footer" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
      <p data-cursor="text">ADIL CA © 2025</p>
      <div>
        <a href="#home">Home</a>
        <a href="#about">About</a>
        <a href="#projects">Projects</a>
        <a href="#contact">Contact</a>
      </div>
    </motion.footer>
  );
}

export default function App() {
  const audioRef = useRef(null);
  const [soundOn, setSoundOn] = useState(false);

  useEffect(() => {
    const lenis = new Lenis({ lerp: 0.08, wheelMultiplier: 0.9 });
    let raf;
    const tick = (time) => {
      lenis.raf(time);
      ScrollTrigger.update();
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
    };
  }, []);

  const toggleSound = async () => {
    if (!audioRef.current) return;
    try {
      if (soundOn) {
        audioRef.current.pause();
        setSoundOn(false);
      } else {
        audioRef.current.volume = 0.28;
        await audioRef.current.play();
        setSoundOn(true);
      }
    } catch {
      setSoundOn(false);
    }
  };

  const ambient = useMemo(() => assetPath('audio/ambient.mp3'), []);

  return (
    <>
      <Loader />
      <CustomCursor />
      <audio ref={audioRef} src={ambient} preload="none" loop />
      <Navbar soundOn={soundOn} toggleSound={toggleSound} />
      <main>
        <Hero />
        <About />
        <Projects />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
