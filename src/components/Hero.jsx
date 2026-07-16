import { Link } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import './Hero.css';

const STATS = [
  { end: 50, suffix: '+', label: 'Years in Service' },
  { end: 13, suffix: '',  label: 'Product Lines'    },
  { end: 40, suffix: '+', label: 'Countries Served' },
];

const BADGES = ['ISO 9001', 'API 6D', 'API 6D-0301'];

const SLIDES = [
  {
    img: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=800&q=85',
    name: 'SBI Precision Valve',
    spec: 'API 6D · ISO 9001 · EST. 1971',
  },
  {
    img: 'https://images.unsplash.com/photo-1565043589221-1a6fd9ae45c7?w=800&q=85',
    name: 'Cryogenic Gate Valve',
    spec: 'DN 80 · CLASS 300 · -196°C',
  },
  {
    img: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=800&q=85',
    name: 'Chemical Process Pump',
    spec: 'ISO 2858 · 316SS · ATEX',
  },
];

const WORDS = ['ENGINEERED', 'TO HOLD', 'THE LINE'];

function useCountUp(end, duration = 1800) {
  const [count, setCount] = useState(0);
  const started = useRef(false);
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started.current) {
        started.current = true;
        const start = performance.now();
        const tick = (now) => {
          const progress = Math.min((now - start) / duration, 1);
          setCount(Math.floor(progress * end));
          if (progress < 1) requestAnimationFrame(tick);
          else setCount(end);
        };
        requestAnimationFrame(tick);
      }
    }, { threshold: 0.5 });
    observer.observe(el);
    return () => observer.disconnect();
  }, [end, duration]);

  return { ref, count };
}

function StatItem({ end, suffix, label, index, divider }) {
  const { ref, count } = useCountUp(end);
  return (
    <div ref={ref} className="stat">
      {divider && <div className="stat-divider" aria-hidden="true" />}
      <span className="stat-value">{count}{suffix}</span>
      <span className="stat-label">{label}</span>
    </div>
  );
}

export default function Hero() {
  const [slide, setSlide] = useState(0);
  const [sliding, setSliding] = useState(false);
  const [slideDir, setSlideDir] = useState('next');
  const cardRef = useRef(null);
  const timerRef = useRef(null);

  /* Auto-advance slides */
  useEffect(() => {
    timerRef.current = setInterval(() => goTo('next'), 4000);
    return () => clearInterval(timerRef.current);
  }, [slide]);

  function goTo(dir) {
    if (sliding) return;
    setSlideDir(dir);
    setSliding(true);
    setTimeout(() => {
      setSlide(s => dir === 'next' ? (s + 1) % SLIDES.length : (s - 1 + SLIDES.length) % SLIDES.length);
      setSliding(false);
    }, 420);
  }

  /* 3-D tilt on mouse move */
  function onMouseMove(e) {
    const card = cardRef.current;
    if (!card) return;
    const { left, top, width, height } = card.getBoundingClientRect();
    const x = (e.clientX - left) / width  - 0.5;
    const y = (e.clientY - top)  / height - 0.5;
    card.style.transform = `perspective(900px) rotateY(${x * 14}deg) rotateX(${-y * 10}deg) scale(1.02)`;
  }
  function onMouseLeave() {
    if (cardRef.current)
      cardRef.current.style.transform = 'perspective(900px) rotateY(0deg) rotateX(0deg) scale(1)';
  }

  return (
    <section className="hero">
      {/* Full-bleed background with slow pan */}
      <div className="hero-bg" aria-hidden="true">
        <img
          src="https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=1800&q=85"
          alt=""
          className="hero-bg-img hero-bg-pan"
        />
        <div className="hero-bg-overlay" />
      </div>

      {/* Floating particle dots */}
      <div className="hero-particles" aria-hidden="true">
        {Array.from({ length: 18 }).map((_, i) => (
          <span key={i} className="hero-particle" style={{
            '--x': `${Math.random() * 100}%`,
            '--y': `${Math.random() * 100}%`,
            '--d': `${3 + Math.random() * 6}s`,
            '--s': `${2 + Math.random() * 4}px`,
          }} />
        ))}
      </div>

      {/* Rotating blueprint ring */}
      <div className="hero-ring" aria-hidden="true" />

      <div className="hero-inner container">

        {/* LEFT — text */}
        <div className="hero-content">
          <div className="hero-eyebrow-wrap anim slide-down in-view">
            <span className="hero-eyebrow">
              <span className="eyebrow-dot" />
              EST. 1971 · ISO 9001 · API 6D CERTIFIED
            </span>
          </div>

          <h1 className="hero-headline">
            {WORDS.map((word, wi) => (
              <span key={wi} className="hero-word-row">
                {word.split('').map((ch, ci) => (
                  <span
                    key={ci}
                    className="hero-letter"
                    style={{ animationDelay: `${0.08 + wi * 0.18 + ci * 0.045}s` }}
                  >{ch === ' ' ? '\u00A0' : ch}</span>
                ))}
                {wi === WORDS.length - 1 && <span className="accent-dot">.</span>}
                <br />
              </span>
            ))}
          </h1>

          <p className="hero-sub anim fade-up in-view delay-2">
            Precision valves, pumps &amp; automation systems for oil &amp; gas,
            refining, and petrochemical industries — built to the world's toughest standards.
          </p>

          <div className="hero-ctas anim fade-up in-view delay-3">
            <Link to="/products" className="hero-btn-primary">
              Explore Products
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Link>
            <Link to="/contact" className="hero-btn-ghost">
              Talk to an Engineer
            </Link>
          </div>

          <div className="hero-stats anim fade-up in-view delay-4">
            {STATS.map((s, i) => (
              <StatItem key={s.label} end={s.end} suffix={s.suffix} label={s.label} index={i} divider={i > 0} />
            ))}
          </div>
        </div>

        {/* RIGHT — 3-D tilt card with sliding images */}
        <div className="hero-visual anim fade-right in-view delay-2">

          {/* Rotating glow ring behind card */}
          <div className="hero-card-ring" aria-hidden="true" />

          <div
            ref={cardRef}
            className="hero-img-card hero-img-card--tilt"
            onMouseMove={onMouseMove}
            onMouseLeave={onMouseLeave}
          >
            {/* Sliding image */}
            <div className="hero-img-wrap">
              <img
                key={slide}
                src={SLIDES[slide].img}
                alt={SLIDES[slide].name}
                className={`hero-product-img hero-slide-img hero-slide-${slideDir} ${sliding ? 'hero-slide-exit' : 'hero-slide-enter'}`}
              />
              <div className="hero-img-gradient" />
            </div>

            {/* Cert badges */}
            <div className="hero-cert-strip">
              {BADGES.map((b, i) => (
                <span key={b} className="hero-cert-badge" style={{ animationDelay: `${0.6 + i * 0.12}s` }}>{b}</span>
              ))}
            </div>

            {/* Slide nav dots */}
            <div className="hero-slide-dots">
              {SLIDES.map((_, i) => (
                <button
                  key={i}
                  className={`hero-dot ${i === slide ? 'active' : ''}`}
                  onClick={() => { clearInterval(timerRef.current); goTo(i > slide ? 'next' : 'prev'); }}
                  aria-label={`Slide ${i + 1}`}
                />
              ))}
            </div>

            {/* Slide arrows */}
            <button className="hero-arrow hero-arrow-prev" onClick={() => { clearInterval(timerRef.current); goTo('prev'); }} aria-label="Previous">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M10 3L5 8l5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </button>
            <button className="hero-arrow hero-arrow-next" onClick={() => { clearInterval(timerRef.current); goTo('next'); }} aria-label="Next">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M6 3l5 5-5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </button>

            {/* Floating info tag — slides in with image */}
            <div className="hero-product-tag" key={`tag-${slide}`}>
              <span className="hero-product-tag-label">FEATURED</span>
              <span className="hero-product-tag-name">{SLIDES[slide].name}</span>
              <span className="hero-product-tag-spec">{SLIDES[slide].spec}</span>
            </div>
          </div>

          {/* Floating badge — rotates */}
          <div className="hero-rotate-badge" aria-hidden="true">
            <svg viewBox="0 0 120 120" width="120" height="120">
              <defs>
                <path id="circle-text" d="M 60,60 m -45,0 a 45,45 0 1,1 90,0 a 45,45 0 1,1 -90,0" />
              </defs>
              <text fontSize="10.5" fill="#4FA8D8" letterSpacing="3" fontFamily="JetBrains Mono, monospace" fontWeight="600">
                <textPath href="#circle-text">API 6D CERTIFIED · ISO 9001 · EST.1971 · </textPath>
              </text>
              <circle cx="60" cy="60" r="6" fill="#4FA8D8" />
            </svg>
          </div>

        </div>
      </div>
    </section>
  );
}
