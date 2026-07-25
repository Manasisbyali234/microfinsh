import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import useInView from '../hooks/useInView';
import './GlobalReach.css';

/* ── SVG Icons ── */
const MoleculeIcon = () => (
  <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="40" cy="40" r="38" fill="url(#mol-bg)" opacity=".18"/>
    <circle cx="40" cy="22" r="10" fill="url(#mol-a)"/>
    <circle cx="22" cy="52" r="10" fill="url(#mol-b)"/>
    <circle cx="58" cy="52" r="10" fill="url(#mol-c)"/>
    <line x1="40" y1="32" x2="28" y2="44" stroke="#4FA8D8" strokeWidth="2.5" strokeLinecap="round"/>
    <line x1="40" y1="32" x2="52" y2="44" stroke="#4FA8D8" strokeWidth="2.5" strokeLinecap="round"/>
    <line x1="32" y1="52" x2="48" y2="52" stroke="#4FA8D8" strokeWidth="2.5" strokeLinecap="round"/>
    <circle cx="40" cy="22" r="4" fill="#fff" opacity=".35"/>
    <circle cx="22" cy="52" r="4" fill="#fff" opacity=".35"/>
    <circle cx="58" cy="52" r="4" fill="#fff" opacity=".35"/>
    <defs>
      <radialGradient id="mol-bg" cx="50%" cy="50%" r="50%"><stop offset="0%" stopColor="#4FA8D8"/><stop offset="100%" stopColor="#1C6EA4" stopOpacity="0"/></radialGradient>
      <linearGradient id="mol-a" x1="30" y1="12" x2="50" y2="32" gradientUnits="userSpaceOnUse"><stop stopColor="#7EC8E3"/><stop offset="1" stopColor="#1C6EA4"/></linearGradient>
      <linearGradient id="mol-b" x1="12" y1="42" x2="32" y2="62" gradientUnits="userSpaceOnUse"><stop stopColor="#4FA8D8"/><stop offset="1" stopColor="#0d4f7a"/></linearGradient>
      <linearGradient id="mol-c" x1="48" y1="42" x2="68" y2="62" gradientUnits="userSpaceOnUse"><stop stopColor="#7EC8E3"/><stop offset="1" stopColor="#1C6EA4"/></linearGradient>
    </defs>
  </svg>
);

const LNGTankIcon = () => (
  <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="tank-body" x1="20" y1="10" x2="60" y2="70" gradientUnits="userSpaceOnUse"><stop stopColor="#7EC8E3"/><stop offset="1" stopColor="#0d4f7a"/></linearGradient>
      <linearGradient id="tank-top" x1="20" y1="10" x2="60" y2="30" gradientUnits="userSpaceOnUse"><stop stopColor="#B8E4F5"/><stop offset="1" stopColor="#4FA8D8"/></linearGradient>
      <radialGradient id="tank-glow" cx="50%" cy="50%" r="50%"><stop offset="0%" stopColor="#4FA8D8" stopOpacity=".4"/><stop offset="100%" stopColor="#4FA8D8" stopOpacity="0"/></radialGradient>
    </defs>
    <circle cx="40" cy="40" r="38" fill="url(#tank-glow)"/>
    <rect x="22" y="28" width="36" height="34" rx="4" fill="url(#tank-body)"/>
    <ellipse cx="40" cy="28" rx="18" ry="7" fill="url(#tank-top)"/>
    <ellipse cx="40" cy="62" rx="18" ry="7" fill="#0d4f7a"/>
    <rect x="36" y="14" width="8" height="14" rx="3" fill="#4FA8D8"/>
    <ellipse cx="40" cy="14" rx="4" ry="3" fill="#7EC8E3"/>
    <line x1="28" y1="38" x2="52" y2="38" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" opacity=".4"/>
    <line x1="26" y1="46" x2="54" y2="46" stroke="#fff" strokeWidth="1" strokeLinecap="round" opacity=".25"/>
    <rect x="16" y="44" width="6" height="3" rx="1.5" fill="#4FA8D8"/>
    <rect x="58" y="44" width="6" height="3" rx="1.5" fill="#4FA8D8"/>
    <line x1="16" y1="45.5" x2="22" y2="45.5" stroke="#4FA8D8" strokeWidth="1.5"/>
    <line x1="58" y1="45.5" x2="64" y2="45.5" stroke="#4FA8D8" strokeWidth="1.5"/>
  </svg>
);

const BoilerIcon = () => (
  <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="boil-body" x1="15" y1="15" x2="65" y2="65" gradientUnits="userSpaceOnUse"><stop stopColor="#5BB8D4"/><stop offset="1" stopColor="#0d4f7a"/></linearGradient>
      <linearGradient id="boil-top" x1="20" y1="10" x2="60" y2="30" gradientUnits="userSpaceOnUse"><stop stopColor="#B8E4F5"/><stop offset="1" stopColor="#4FA8D8"/></linearGradient>
    </defs>
    <rect x="18" y="30" width="44" height="32" rx="6" fill="url(#boil-body)"/>
    <ellipse cx="40" cy="30" rx="22" ry="8" fill="url(#boil-top)"/>
    <rect x="34" y="14" width="12" height="16" rx="4" fill="#4FA8D8"/>
    <ellipse cx="40" cy="14" rx="6" ry="4" fill="#7EC8E3"/>
    <rect x="10" y="50" width="8" height="4" rx="2" fill="#4FA8D8"/>
    <rect x="62" y="50" width="8" height="4" rx="2" fill="#4FA8D8"/>
    <circle cx="30" cy="46" r="4" fill="#fff" opacity=".15"/>
    <circle cx="40" cy="46" r="4" fill="#fff" opacity=".15"/>
    <circle cx="50" cy="46" r="4" fill="#fff" opacity=".15"/>
    <line x1="18" y1="58" x2="62" y2="58" stroke="#fff" strokeWidth="1" strokeLinecap="round" opacity=".2"/>
    <path d="M30 30 Q32 22 34 26 Q36 18 38 22 Q40 14 42 18" stroke="#7EC8E3" strokeWidth="1.5" fill="none" strokeLinecap="round" opacity=".7"/>
  </svg>
);

const CARDS = [
  {
    id: 'chemical',
    title: 'Chemical & Petrochemical',
    desc: 'Precision flow-control solutions engineered for aggressive media, high-pressure reactors, and critical process safety.',
    Icon: MoleculeIcon,
    highlight: false,
  },
  {
    id: 'lng',
    title: 'LNG & Air Separation',
    desc: 'Cryogenic-grade valves and systems rated to −196 °C, trusted in the world\'s most demanding liquefaction plants.',
    Icon: LNGTankIcon,
    highlight: true,
  },
  {
    id: 'thermal',
    title: 'Thermal Power',
    desc: 'High-temperature, high-pressure valve assemblies built for supercritical boilers and turbine bypass systems.',
    Icon: BoilerIcon,
    highlight: false,
  },
];

/* ── Animated world-map dot positions (simplified grid) ── */
const MAP_DOTS = [
  [12,38],[18,32],[22,28],[28,30],[32,26],[38,24],[44,26],[50,28],[56,30],[62,32],[68,36],[72,40],
  [14,44],[20,48],[26,44],[32,40],[38,36],[44,38],[50,42],[56,38],[62,40],[68,44],[74,46],
  [16,52],[22,56],[28,52],[34,48],[40,50],[46,52],[52,48],[58,50],[64,52],[70,50],
  [20,60],[26,62],[32,58],[38,56],[44,58],[50,60],[56,56],[62,58],
  [24,66],[30,68],[36,64],[42,66],[48,64],[54,66],
  [10,30],[8,42],[10,54],[74,34],[76,46],[74,56],
];

/* ── Floating particles ── */
const PARTICLES = Array.from({ length: 18 }, (_, i) => ({
  id: i,
  x: 5 + (i * 37 + 13) % 90,
  y: 5 + (i * 53 + 7) % 85,
  size: 2 + (i % 3),
  dur: 6 + (i % 5) * 1.4,
  delay: (i * 0.7) % 5,
}));

export default function GlobalReach() {
  const [active, setActive] = useState(1); // LNG highlighted by default
  const [sectionRef, inView] = useInView();
  const timerRef = useRef(null);

  const startAuto = () => {
    timerRef.current = setInterval(() => {
      setActive(p => (p + 1) % CARDS.length);
    }, 4000);
  };

  useEffect(() => {
    startAuto();
    return () => clearInterval(timerRef.current);
  }, []);

  const pause = () => clearInterval(timerRef.current);
  const resume = () => startAuto();

  const prev = () => { pause(); setActive(p => (p - 1 + CARDS.length) % CARDS.length); resume(); };
  const next = () => { pause(); setActive(p => (p + 1) % CARDS.length); resume(); };

  return (
    <section className={`gr-section anim fade-up ${inView ? 'in-view' : ''}`} ref={sectionRef}>
      {/* Blueprint grid overlay */}
      <div className="gr-grid" aria-hidden="true" />

      {/* Radial glows */}
      <div className="gr-glow gr-glow-1" aria-hidden="true" />
      <div className="gr-glow gr-glow-2" aria-hidden="true" />

      {/* World map dots */}
      <div className="gr-map" aria-hidden="true">
        {MAP_DOTS.map(([x, y], i) => (
          <span
            key={i}
            className="gr-map-dot"
            style={{ left: `${x}%`, top: `${y}%`, animationDelay: `${(i * 0.18) % 3}s` }}
          />
        ))}
        {/* Connection lines SVG */}
        <svg className="gr-map-lines" viewBox="0 0 100 100" preserveAspectRatio="none">
          <path d="M12 38 Q32 26 50 28 Q68 30 72 40" stroke="#4FA8D8" strokeWidth="0.3" fill="none" strokeDasharray="2 3" opacity=".35"/>
          <path d="M14 44 Q38 36 56 38 Q68 44 74 46" stroke="#4FA8D8" strokeWidth="0.25" fill="none" strokeDasharray="1.5 4" opacity=".25"/>
          <path d="M20 60 Q40 50 60 56 Q68 58 70 50" stroke="#4FA8D8" strokeWidth="0.2" fill="none" strokeDasharray="2 5" opacity=".2"/>
        </svg>
      </div>

      {/* Floating particles */}
      <div className="gr-particles" aria-hidden="true">
        {PARTICLES.map(p => (
          <span
            key={p.id}
            className="gr-particle"
            style={{
              left: `${p.x}%`,
              top: `${p.y}%`,
              width: p.size,
              height: p.size,
              animationDuration: `${p.dur}s`,
              animationDelay: `${p.delay}s`,
            }}
          />
        ))}
      </div>

      {/* Industrial plant silhouette */}
      <div className="gr-plant" aria-hidden="true">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 120 L0 80 L40 80 L40 40 L50 40 L50 20 L60 20 L60 40 L70 40 L70 80 L100 80 L100 60 L110 60 L110 30 L120 30 L120 60 L130 60 L130 80 L160 80 L160 50 L170 50 L170 80 L200 80 L200 90 L220 90 L220 70 L230 70 L230 50 L240 50 L240 70 L250 70 L250 90 L280 90 L280 80 L300 80 L300 60 L310 60 L310 40 L320 40 L320 60 L330 60 L330 80 L360 80 L360 70 L380 70 L380 80 L400 80 L400 50 L410 50 L410 30 L420 30 L420 50 L430 50 L430 80 L460 80 L460 90 L480 90 L480 80 L500 80 L500 60 L510 60 L510 40 L520 40 L520 60 L530 60 L530 80 L560 80 L560 70 L580 70 L580 50 L590 50 L590 70 L600 70 L600 80 L630 80 L630 60 L640 60 L640 40 L650 40 L650 60 L660 60 L660 80 L700 80 L700 90 L720 90 L720 70 L730 70 L730 50 L740 50 L740 70 L750 70 L750 90 L780 90 L780 80 L800 80 L800 60 L810 60 L810 40 L820 40 L820 60 L830 60 L830 80 L860 80 L860 70 L880 70 L880 80 L900 80 L900 50 L910 50 L910 30 L920 30 L920 50 L930 50 L930 80 L960 80 L960 90 L980 90 L980 80 L1000 80 L1000 60 L1010 60 L1010 40 L1020 40 L1020 60 L1030 60 L1030 80 L1060 80 L1060 70 L1080 70 L1080 50 L1090 50 L1090 70 L1100 70 L1100 80 L1130 80 L1130 60 L1140 60 L1140 40 L1150 40 L1150 60 L1160 60 L1160 80 L1200 80 L1200 120 Z" fill="#1C6EA4" opacity=".07"/>
          <path d="M0 120 L0 95 L60 95 L60 85 L80 85 L80 95 L150 95 L150 88 L170 88 L170 95 L250 95 L250 90 L270 90 L270 95 L350 95 L350 88 L370 88 L370 95 L450 95 L450 90 L470 90 L470 95 L550 95 L550 88 L570 88 L570 95 L650 95 L650 90 L670 90 L670 95 L750 95 L750 88 L770 88 L770 95 L850 95 L850 90 L870 90 L870 95 L950 95 L950 88 L970 88 L970 95 L1050 95 L1050 90 L1070 90 L1070 95 L1150 95 L1150 88 L1170 88 L1170 95 L1200 95 L1200 120 Z" fill="#4FA8D8" opacity=".05"/>
        </svg>
      </div>

      <div className="container gr-container">
        {/* Header */}
        <div className="gr-header">
          <p className="section-eyebrow gr-eyebrow">Industries We Serve</p>
          <h2 className="section-title gr-title">Global Industrial Reach</h2>
          <p className="gr-subtitle">
            Delivering advanced engineering solutions and trusted expertise across the world's most demanding industries.
          </p>
        </div>

        {/* Cards + Nav */}
        <div
          className="gr-carousel-wrap"
          onMouseEnter={pause}
          onMouseLeave={resume}
        >
          {/* Prev button */}
          <button className="gr-nav-btn gr-nav-prev" onClick={prev} aria-label="Previous industry">
            <svg viewBox="0 0 24 24" fill="none"><path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </button>

          {/* Cards */}
          <div className="gr-cards">
            {CARDS.map((card, i) => {
              const isActive = i === active;
              return (
                <div
                  key={card.id}
                  className={`gr-card ${isActive ? 'gr-card--active' : ''} ${card.highlight ? 'gr-card--highlight' : ''}`}
                  onClick={() => { pause(); setActive(i); resume(); }}
                >
                  {card.highlight && <div className="gr-card-glow" aria-hidden="true" />}
                  <div className="gr-card-icon">
                    <card.Icon />
                  </div>
                  <div className="gr-card-body">
                    <div className="gr-card-underline" />
                    <h3 className="gr-card-title">{card.title}</h3>
                    <p className="gr-card-desc">{card.desc}</p>
                  </div>
                </div>
              );
            })}

            {/* Connection lines between cards */}
            <svg className="gr-conn-lines" viewBox="0 0 100 10" preserveAspectRatio="none" aria-hidden="true">
              <line x1="33" y1="5" x2="67" y2="5" stroke="#4FA8D8" strokeWidth="0.5" strokeDasharray="3 3" opacity=".4"/>
              <circle cx="33" cy="5" r="1.5" fill="#4FA8D8" opacity=".6"/>
              <circle cx="67" cy="5" r="1.5" fill="#4FA8D8" opacity=".6"/>
            </svg>
          </div>

          {/* Next button */}
          <button className="gr-nav-btn gr-nav-next" onClick={next} aria-label="Next industry">
            <svg viewBox="0 0 24 24" fill="none"><path d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </button>
        </div>

        {/* Pagination dots */}
        <div className="gr-dots">
          {CARDS.map((_, i) => (
            <button
              key={i}
              className={`gr-dot ${i === active ? 'gr-dot--active' : ''}`}
              onClick={() => { pause(); setActive(i); resume(); }}
              aria-label={`Go to card ${i + 1}`}
            />
          ))}
        </div>

        {/* CTA */}
        <div className="gr-cta-wrap">
          <Link to="/industries" className="gr-cta-btn">
            <span className="gr-cta-shine" aria-hidden="true" />
            All Industries →
          </Link>
        </div>
      </div>
    </section>
  );
}
