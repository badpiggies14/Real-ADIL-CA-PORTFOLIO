import { useEffect, useRef, useState } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import {
  ArrowUpRight,
  Mail,
  Menu,
  Speaker,
  VolumeX,
  X,
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const CONTACT_FRAME_COUNT = 124;
const CONTACT_FRAME_PATH = 'images/contact';
const CONTACT_FRAME_EXTENSION = 'png';

const socials = [
  { label: 'GitHub', href: 'https://github.com/badpiggies14', handle: '@badpiggies14' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/adilweb3', handle: '/in/adilweb3' },
  { label: 'Twitter / X', href: 'https://x.com/HUNTERMONKX', handle: '@HUNTERMONKX' },
  { label: 'Instagram', href: 'https://www.instagram.com/adil_caaaa', handle: '@adil_caaaa' },
  { label: 'WhatsApp', href: 'https://wa.me/919447413750', handle: '+91 9447413750' },
  { label: 'Email', href: 'mailto:caadil15100@gmail.com', handle: 'caadil15100@gmail.com' },
];

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

  if (label === 'WhatsApp') {
    return (
      <svg {...props}>
        <path d="M5.2 19.2l1.1-3.3a7 7 0 1 1 2.7 2.4z" />
        <path d="M9.4 8.8c.2-.5.4-.5.7-.5h.5c.2 0 .4.1.5.4l.6 1.4c.1.2.1.4-.1.6l-.3.4c-.1.1-.2.3-.1.5a5.3 5.3 0 0 0 2.4 2.1c.2.1.4.1.5-.1l.6-.7c.2-.2.4-.2.6-.1l1.4.7c.3.1.4.3.4.5 0 .6-.4 1.5-1.2 1.8-.7.3-2 .2-3.6-.7-2.5-1.4-4.2-3.8-4.3-5.2 0-.5.2-.9.4-1.1z" />
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

function buildContactFrameCandidates(index) {
  const four = String(index).padStart(4, '0');
  const three = String(index).padStart(3, '0');
  const names = [
    `ezgif-frame-${three}.${CONTACT_FRAME_EXTENSION}`,
    `frame_${four}.${CONTACT_FRAME_EXTENSION}`,
    `frame_${three}.${CONTACT_FRAME_EXTENSION}`,
    `contact-${four}.${CONTACT_FRAME_EXTENSION}`,
    `contact-${three}.${CONTACT_FRAME_EXTENSION}`,
    `${four}.${CONTACT_FRAME_EXTENSION}`,
    `${three}.${CONTACT_FRAME_EXTENSION}`,
    `${index}.${CONTACT_FRAME_EXTENSION}`,
  ];

  return names.map((name) => assetPath(`${CONTACT_FRAME_PATH}/${name}`));
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
          initial={{ y: '110%', opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
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

function Navbar({ soundOn, toggleSound, audioStatus }) {
  const [hidden, setHidden] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const isMobile = useIsMobile();
  const lastY = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const current = window.scrollY;
      setHidden(!isMobile && !menuOpen && current > lastY.current && current > 120);
      lastY.current = current;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [isMobile, menuOpen]);

  useEffect(() => {
    document.body.classList.toggle('menu-lock', menuOpen);
    return () => document.body.classList.remove('menu-lock');
  }, [menuOpen]);

  const scrollTo = (id) => {
    document.querySelector(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    setMenuOpen(false);
  };

  const navItems = [
    ['Home', '#home'],
    ['About', '#about'],
    ['Projects', '#projects'],
    ['Contact', '#contact'],
  ];

  return (
    <motion.header
      className={`navbar ${menuOpen ? 'menu-open' : ''}`}
      initial={{ x: '-50%', y: -80, opacity: 0 }}
      animate={{ x: '-50%', y: hidden ? '-125%' : 0, opacity: hidden ? 0 : 1 }}
      transition={{ duration: 0.45, ease: 'easeOut' }}
    >
      <button className="logo" data-cursor="magnetic" onClick={() => scrollTo('#home')} aria-label="Go to home">
        ADIL CA
      </button>
      <nav>
        {navItems.map(([label, target]) => (
          <button key={label} data-cursor="magnetic" onClick={() => scrollTo(target)}>
            {label}
          </button>
        ))}
      </nav>
      <div className="nav-actions">
        <button
          className={`sound-button ${soundOn ? 'sound-on' : ''} ${audioStatus === 'error' ? 'sound-error' : ''}`}
          data-cursor="magnetic"
          onClick={toggleSound}
          aria-label={soundOn ? 'Pause voice audio' : 'Play voice audio'}
          title={audioStatus === 'error' ? 'Audio unavailable' : soundOn ? 'Audio playing' : 'Audio paused'}
        >
          <span className="sound-icon">{soundOn ? <Speaker size={18} /> : <VolumeX size={18} />}</span>
          <span className="equalizer" aria-hidden="true"><i /><i /><i /></span>
        </button>
        <button className="touch-button" data-cursor="magnetic" onClick={() => scrollTo('#contact')}>
          Get In Touch
        </button>
        <button
          className="menu-button"
          data-cursor="magnetic"
          onClick={() => setMenuOpen((open) => !open)}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
        >
          {menuOpen ? <X size={19} /> : <Menu size={19} />}
        </button>
      </div>
      <motion.div
        className="mobile-menu"
        initial={false}
        animate={menuOpen ? { opacity: 1, y: 0, pointerEvents: 'auto' } : { opacity: 0, y: -12, pointerEvents: 'none' }}
        transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
      >
        {navItems.map(([label, target], index) => (
          <motion.button
            key={label}
            data-cursor="magnetic"
            onClick={() => scrollTo(target)}
            initial={false}
            animate={menuOpen ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
            transition={{ delay: menuOpen ? index * 0.04 : 0, duration: 0.24 }}
          >
            <span>0{index + 1}</span>{label}
          </motion.button>
        ))}
      </motion.div>
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
  const titleY = useTransform(scrollYProgress, [0, 0.6, 1], [0, isMobile ? -22 : -10, isMobile ? -80 : -40]);

  useEffect(() => {
    let killed = false;
    let cleanup = () => {};
    let currentIndex = 0;
    let lastDrawAt = 0;
    let canvasWidth = 0;
    let canvasHeight = 0;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const frameStep = isMobile ? 4 : 1;

    discoverHeroPattern().then((pattern) => {
      if (killed || !pattern) return;
      framesRef.current.set(1, pattern.firstImage);
      setHasFrames(true);
      const canvas = canvasRef.current;
      const context = canvas?.getContext('2d');
      if (!canvas || !context) return;

      const draw = (image) => {
        const ratio = Math.min(window.devicePixelRatio || 1, isMobile ? 1.15 : 2);
        const width = window.innerWidth;
        const height = window.innerHeight;
        if (canvasWidth !== width || canvasHeight !== height) {
          canvasWidth = width;
          canvasHeight = height;
          canvas.width = Math.round(width * ratio);
          canvas.height = Math.round(height * ratio);
          canvas.style.width = `${width}px`;
          canvas.style.height = `${height}px`;
        }
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
        for (let fallback = index; fallback >= 1; fallback -= frameStep) {
          const frame = framesRef.current.get(fallback);
          if (frame) {
            draw(frame);
            return;
          }
        }
      };

      draw(pattern.firstImage);

      const warmFrames = async () => {
        for (let index = 1 + frameStep; index <= 260 && !killed; index += frameStep) {
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
          if (reducedMotion) return;
          const rawIndex = Math.max(1, Math.min(frameCountRef.current, Math.round(self.progress * frameCountRef.current)));
          const steppedIndex = isMobile ? Math.max(1, Math.round(rawIndex / frameStep) * frameStep) : rawIndex;
          const index = Math.min(frameCountRef.current, steppedIndex);
          currentIndex = index;
          desiredFrameRef.current = index;
          const now = performance.now();
          if (isMobile && now - lastDrawAt < 34) return;
          lastDrawAt = now;
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
    <section ref={sectionRef} id="home" className="hero-shell" style={{ minHeight: hasFrames ? (isMobile ? '190vh' : '2400px') : (isMobile ? '150vh' : '135vh') }}>
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
      initial={{ opacity: 0, y: 22 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
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
        initial={{ opacity: 0, y: 58 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
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
      initial={{ opacity: 0, y: 70 }}
      whileInView={{ opacity: 1, y: 0 }}
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

function ContactFramePlayer() {
  const shellRef = useRef(null);
  const canvasRef = useRef(null);
  const framesRef = useRef(new Map());
  const patternRef = useRef(0);
  const lastFrameRef = useRef(1);
  const rafRef = useRef(0);
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);
  const inView = useInView(shellRef, { margin: '220px' });
  const isMobile = useIsMobile();
  const { scrollYProgress } = useScroll({ target: shellRef, offset: ['start end', 'end start'] });

  useEffect(() => {
    if (!inView || failed) return undefined;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let killed = false;
    let resizeObserver;
    let lastDrawAt = 0;
    const frameStep = isMobile ? 4 : 1;

    const draw = (image) => {
      const canvas = canvasRef.current;
      const context = canvas?.getContext('2d', { alpha: true });
      if (!canvas || !context || !image) return;

      const rect = canvas.getBoundingClientRect();
      const ratio = Math.min(window.devicePixelRatio || 1, isMobile ? 1.15 : 2);
      const width = Math.max(1, Math.round(rect.width));
      const height = Math.max(1, Math.round(rect.height));

      if (canvas.width !== Math.round(width * ratio) || canvas.height !== Math.round(height * ratio)) {
        canvas.width = Math.round(width * ratio);
        canvas.height = Math.round(height * ratio);
      }

      context.setTransform(ratio, 0, 0, ratio, 0, 0);
      context.clearRect(0, 0, width, height);
      const scale = Math.max(width / image.width, height / image.height);
      const x = (width - image.width * scale) / 2;
      const y = (height - image.height * scale) / 2;
      context.drawImage(image, x, y, image.width * scale, image.height * scale);
    };

    const loadFrame = async (index) => {
      if (framesRef.current.has(index)) return framesRef.current.get(index);
      const src = buildContactFrameCandidates(index)[patternRef.current];
      const loaded = await probeImage(src);
      if (loaded) framesRef.current.set(index, loaded);
      return loaded;
    };

    const drawNearest = (index) => {
      for (let frame = index; frame >= 1; frame -= frameStep) {
        const image = framesRef.current.get(frame);
        if (image) {
          draw(image);
          return;
        }
      }
    };

    const warmNearby = (index) => {
      const stride = isMobile ? frameStep : 1;
      for (let offset = stride; offset <= (isMobile ? 8 : 10); offset += stride) {
        const next = Math.min(CONTACT_FRAME_COUNT, index + offset);
        if (!framesRef.current.has(next)) loadFrame(next);
      }
    };

    const boot = async () => {
      const candidates = buildContactFrameCandidates(1);
      let first = null;
      for (let i = 0; i < candidates.length; i += 1) {
        first = await probeImage(candidates[i]);
        if (first) {
          patternRef.current = i;
          break;
        }
      }

      if (killed) return;
      if (!first) {
        setFailed(true);
        return;
      }

      framesRef.current.set(1, first);
      setReady(true);
      draw(first);
      warmNearby(1);

      resizeObserver = new ResizeObserver(() => drawNearest(lastFrameRef.current));
      if (canvasRef.current) resizeObserver.observe(canvasRef.current);
    };

    boot();

    const unsubscribe = scrollYProgress.on('change', (progress) => {
      if (!ready && !framesRef.current.has(1)) return;
      const frameCount = reducedMotion ? 1 : CONTACT_FRAME_COUNT;
      const target = Math.max(1, Math.min(frameCount, Math.round(progress * frameCount)));
      const steppedFrame = isMobile ? Math.max(1, Math.round(target / frameStep) * frameStep) : target;
      const frame = Math.min(frameCount, steppedFrame);
      if (frame === lastFrameRef.current) return;
      const now = performance.now();
      if (isMobile && now - lastDrawAt < 34) return;
      lastDrawAt = now;
      lastFrameRef.current = frame;
      cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        drawNearest(frame);
        loadFrame(frame).then((image) => {
          if (!killed && image && lastFrameRef.current === frame) draw(image);
        });
        warmNearby(frame);
      });
    });

    return () => {
      killed = true;
      unsubscribe();
      cancelAnimationFrame(rafRef.current);
      resizeObserver?.disconnect();
    };
  }, [failed, inView, isMobile, scrollYProgress]);

  return (
    <div ref={shellRef} className="contact-frame-shell">
      <canvas ref={canvasRef} className={`contact-canvas ${ready ? 'is-ready' : ''}`} aria-label="Cinematic contact animation" />
      <div className={`contact-frame-fallback ${failed ? 'is-visible' : ''}`}>
        <span>ADIL</span>
      </div>
      <div className="contact-frame-hud">
        <span>OUTRO SEQUENCE</span>
        <small>{ready ? `${String(lastFrameRef.current).padStart(3, '0')} / ${CONTACT_FRAME_COUNT}` : 'LOADING FRAMES'}</small>
      </div>
    </div>
  );
}

function SocialTerminalCard({ item, index }) {
  return (
    <motion.a
      className="contact-social-card"
      href={item.href}
      target={item.href.startsWith('mailto:') ? undefined : '_blank'}
      rel={item.href.startsWith('mailto:') ? undefined : 'noreferrer'}
      data-cursor="magnetic"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ delay: index * 0.055, duration: 0.46, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -6, scale: 1.015 }}
      aria-label={`Open ${item.label}`}
    >
      <span className="social-pixels" aria-hidden="true"><i /><i /><i /><i /></span>
      <span className="social-icon"><BrandIcon label={item.label} size={22} /></span>
      <span className="social-copy">
        <strong>{item.label}</strong>
        <small>{item.handle}</small>
      </span>
      <ArrowUpRight size={17} />
    </motion.a>
  );
}

function Contact() {
  return (
    <section id="contact" className="section contact-section">
      <div className="contact-grid-bg" />
      <ContactFramePlayer />
      <motion.div
        className="contact-terminal"
        initial={{ opacity: 0, y: 42 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-120px' }}
        transition={{ duration: 0.72, ease: [0.16, 1, 0.3, 1] }}
      >
        <span className="eyebrow">Contact</span>
        <h2><span>Signal</span> <em>Open.</em></h2>
        <p data-cursor="text">
          No forms. No friction. Pick a channel and send the signal directly.
        </p>
        <div className="contact-social-grid">
          {socials.map((item, index) => (
            <SocialTerminalCard key={item.label} item={item} index={index} />
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
  const [audioStatus, setAudioStatus] = useState('idle');
  const [audioSrc, setAudioSrc] = useState(() => assetPath('audio/myvoice.mp3'));

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
        setAudioStatus('paused');
      } else {
        setAudioStatus('loading');
        audioRef.current.volume = 0.72;
        await audioRef.current.play();
        setSoundOn(true);
        setAudioStatus('playing');
      }
    } catch {
      setSoundOn(false);
      setAudioStatus('error');
    }
  };

  return (
    <>
      <Loader />
      <CustomCursor />
      <audio
        ref={audioRef}
        src={audioSrc}
        preload="none"
        loop
        onPlay={() => {
          setSoundOn(true);
          setAudioStatus('playing');
        }}
        onPause={() => {
          setSoundOn(false);
          setAudioStatus('paused');
        }}
        onWaiting={() => setAudioStatus('loading')}
        onError={() => {
          if (audioSrc.endsWith('myvoice.mp3')) {
            setAudioSrc(assetPath('audio/myvoice.mp4'));
            setAudioStatus('idle');
          } else {
            setSoundOn(false);
            setAudioStatus('error');
          }
        }}
      />
      <Navbar soundOn={soundOn} toggleSound={toggleSound} audioStatus={audioStatus} />
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
