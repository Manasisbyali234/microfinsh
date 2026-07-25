import { Link } from 'react-router-dom';
import { useRef, useState, useEffect } from 'react';
import Hero from '../components/Hero';
import ProductCard from '../components/ProductCard';
import GlobalReach from '../components/GlobalReach';
import useInView from '../hooks/useInView';
import sbiFactory from '../assets/sbi-factory.jpg';
import './Home.css';

const FEATURED_PRODUCTS = [
  { name: 'Trunnion Mounted Ball Valves', category: 'Valves', description: 'High-pressure, large-bore ball valves for critical pipeline applications.' },
  { name: 'Cryogenic Valves', category: 'Valves', description: 'Designed for LNG and air separation service down to -196°C.' },
  { name: 'Chemical Process Pumps', category: 'Pumps', description: 'Corrosion-resistant centrifugal pumps for aggressive media.' },
  { name: 'Actuators', category: 'Actuators', description: 'Pneumatic and electric actuators for automated valve control.' },
  { name: 'Vertical Air Receiver Tank', category: 'Tanks', description: 'Vertical air receiver tanks for compressed air storage and pressure regulation.' },
  { name: 'Stainless Steel Idler Convertor Roller', category: 'Rollers', description: 'Stainless steel idler convertor rollers for conveyor and material handling systems.' },
];

const INDUSTRIES = [
  {
    name: 'Oil and Gas',
    icon: (
      <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="20" y="4" width="8" height="20" rx="2" fill="#4FA8D8"/><path d="M14 24h20l3 16H11L14 24z" fill="#1C6EA4"/><circle cx="24" cy="14" r="4" fill="#fff" opacity=".3"/><rect x="22" y="38" width="4" height="4" rx="1" fill="#4FA8D8"/></svg>
    ),
  },
  {
    name: 'Refining',
    icon: (
      <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="8" y="16" width="8" height="24" rx="2" fill="#1C6EA4"/><rect x="20" y="10" width="8" height="30" rx="2" fill="#4FA8D8"/><rect x="32" y="20" width="8" height="20" rx="2" fill="#1C6EA4"/><path d="M6 40h36" stroke="#4FA8D8" strokeWidth="2" strokeLinecap="round"/><path d="M12 16 Q16 8 20 10" stroke="#4FA8D8" strokeWidth="1.5" fill="none"/><path d="M28 10 Q32 6 36 20" stroke="#4FA8D8" strokeWidth="1.5" fill="none"/></svg>
    ),
  },
  {
    name: 'Chemical & Petrochemical',
    icon: (
      <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="16" cy="32" r="8" fill="#1C6EA4"/><circle cx="32" cy="32" r="8" fill="#4FA8D8"/><circle cx="24" cy="18" r="8" fill="#2a7fb5"/><circle cx="16" cy="32" r="3" fill="#fff" opacity=".25"/><circle cx="32" cy="32" r="3" fill="#fff" opacity=".25"/><circle cx="24" cy="18" r="3" fill="#fff" opacity=".25"/></svg>
    ),
  },
  {
    name: 'LNG & Air Separation',
    icon: (
      <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="12" y="20" width="24" height="20" rx="12" fill="#1C6EA4"/><path d="M24 20 C24 20 18 12 24 6 C30 12 24 20 24 20Z" fill="#4FA8D8"/><path d="M16 30 Q24 26 32 30" stroke="#fff" strokeWidth="1.5" fill="none" opacity=".5"/><path d="M14 36 Q24 32 34 36" stroke="#fff" strokeWidth="1.5" fill="none" opacity=".3"/></svg>
    ),
  },
  {
    name: 'Thermal Power',
    icon: (
      <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M10 40 L10 20 Q10 10 20 10 L28 10 Q38 10 38 20 L38 40" stroke="#1C6EA4" strokeWidth="3" fill="none" strokeLinecap="round"/><rect x="18" y="28" width="12" height="14" rx="2" fill="#4FA8D8"/><path d="M8 40h32" stroke="#4FA8D8" strokeWidth="2" strokeLinecap="round"/><path d="M16 10 Q18 4 24 4 Q30 4 32 10" stroke="#4FA8D8" strokeWidth="1.5" fill="none"/></svg>
    ),
  },
  {
    name: 'Nuclear',
    icon: (
      <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="24" cy="24" r="5" fill="#4FA8D8"/><ellipse cx="24" cy="24" rx="18" ry="7" stroke="#1C6EA4" strokeWidth="2" fill="none"/><ellipse cx="24" cy="24" rx="18" ry="7" stroke="#1C6EA4" strokeWidth="2" fill="none" transform="rotate(60 24 24)"/><ellipse cx="24" cy="24" rx="18" ry="7" stroke="#1C6EA4" strokeWidth="2" fill="none" transform="rotate(120 24 24)"/></svg>
    ),
  },
  {
    name: 'Pharmaceutical',
    icon: (
      <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="20" y="6" width="8" height="36" rx="4" fill="#1C6EA4"/><rect x="6" y="20" width="36" height="8" rx="4" fill="#4FA8D8"/><rect x="20" y="6" width="8" height="18" rx="4" fill="#1C6EA4"/><rect x="6" y="20" width="18" height="8" rx="4" fill="#2a7fb5"/></svg>
    ),
  },
  {
    name: 'Food and Beverage',
    icon: (
      <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M10 18 Q10 8 24 8 Q38 8 38 18 L36 40 Q36 42 34 42 H14 Q12 42 12 40 Z" fill="#1C6EA4"/><path d="M18 8 L18 4" stroke="#4FA8D8" strokeWidth="2" strokeLinecap="round"/><path d="M24 8 L24 4" stroke="#4FA8D8" strokeWidth="2" strokeLinecap="round"/><path d="M30 8 L30 4" stroke="#4FA8D8" strokeWidth="2" strokeLinecap="round"/><path d="M12 26 Q24 22 36 26" stroke="#fff" strokeWidth="1.5" fill="none" opacity=".4"/></svg>
    ),
  },
  {
    name: 'Desalination',
    icon: (
      <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6 30 Q12 22 18 30 Q24 38 30 30 Q36 22 42 30" stroke="#4FA8D8" strokeWidth="2.5" fill="none" strokeLinecap="round"/><path d="M6 36 Q12 28 18 36 Q24 44 30 36 Q36 28 42 36" stroke="#1C6EA4" strokeWidth="2" fill="none" strokeLinecap="round" opacity=".6"/><path d="M24 6 C24 6 16 16 16 22 C16 26.4 19.6 30 24 30 C28.4 30 32 26.4 32 22 C32 16 24 6 24 6Z" fill="#4FA8D8" opacity=".8"/></svg>
    ),
  },
];

const CERTS = [
  { label: 'ISO 9001', sub: 'Quality Management' },
  { label: 'API 6D', sub: 'Pipeline Valves' },
  { label: 'API 6D-0301', sub: 'Monogram License' },
  { label: 'EST. 1971', sub: '50+ Years Experience' },
];



export default function Home() {
  const [aboutRef, aboutIn] = useInView();
  const [founderStripRef, founderStripIn] = useInView();
  const [productsRef, productsIn] = useInView();
  const [certsRef, certsIn] = useInView();
  const [visionRef, visionIn] = useInView();
  const [ctaRef, ctaIn] = useInView();

  return (
    <main>
      <Hero />

      {/* About teaser */}
      <section className="section about-teaser">
        <div ref={aboutRef} className="container about-teaser-inner">
          <div className={`about-teaser-img-col anim fade-left ${aboutIn ? 'in-view' : ''}`}>
            <img
              src={sbiFactory}
              alt="Shree Balaji Industries manufacturing facility"
              className="about-teaser-img"
            />
            <div className="about-teaser-img-badge">
              <span className="badge-num">50+</span>
              <span className="badge-txt">Years of Excellence</span>
            </div>
          </div>
          <div className={`anim fade-right ${aboutIn ? 'in-view' : ''}`}>
            <p className="section-eyebrow">About Us</p>
            <h2 className="section-title">Built on Precision.<br />Trusted by Industry.</h2>
            <div className="about-teaser-body">
              <p>Since 1971, Shree Balaji Industries has engineered flow-control solutions for the world's most demanding industrial environments. Our ISO 9001 and API 6D certified manufacturing ensures every valve and pump meets the highest standards of safety, reliability, and performance.</p>
              <div ref={founderStripRef} className={`home-founder-strip anim fade-up delay-2 ${founderStripIn ? 'in-view' : ''}`}>
                <span className="home-founder-tag">Founded 2010 &mdash; Santosh Athani</span>
                <p>Since 2010, we&apos;ve been turning ideas into impact. What began as a bold vision has blossomed into a story of passion, perseverance, and progress &mdash; built on people, trust, and consistency.</p>
              </div>
              <Link to="/about" className={`btn-primary anim fade-up delay-3 ${founderStripIn ? 'in-view' : ''}`} style={{marginTop:'1.25rem',display:'inline-block'}}>Read More</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Product highlights */}
      <section className="section section-alt">
        <div ref={productsRef} className="container">
          <p className={`section-eyebrow anim fade-up ${productsIn ? 'in-view' : ''}`}>Our Products</p>
          <h2 className={`section-title anim fade-up delay-1 ${productsIn ? 'in-view' : ''}`}>Featured Product Lines</h2>
        </div>
        <div className="carousel-track-wrap">
          <div className="carousel-track">
            {[...FEATURED_PRODUCTS, ...FEATURED_PRODUCTS].map((p, i) => (
              <div key={`${p.name}-${i}`} className="carousel-item">
                <ProductCard {...p} />
              </div>
            ))}
          </div>
        </div>
        <div style={{textAlign:'center',marginTop:'2rem'}} className={`container anim fade-up delay-5 ${productsIn ? 'in-view' : ''}`}>
          <Link to="/products" className="btn-secondary">View All Products</Link>
        </div>
      </section>

      {/* Vision / Mission / Why Choose Us */}
      <section className="section vision-section">
        <div ref={visionRef} className="container">
          <p className={`section-eyebrow anim fade-up ${visionIn ? 'in-view' : ''}`}>Who We Are</p>
          <h2 className={`section-title anim fade-up delay-1 ${visionIn ? 'in-view' : ''}`}>Our Vision &amp; Mission</h2>
          <div className="vision-grid">
            <div className={`vision-card anim fade-up delay-2 ${visionIn ? 'in-view' : ''}`}>
              <span className="vision-card-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="3"/><line x1="12" y1="2" x2="12" y2="5"/><line x1="12" y1="19" x2="12" y2="22"/><line x1="2" y1="12" x2="5" y2="12"/><line x1="19" y1="12" x2="22" y2="12"/></svg>
              </span>
              <h3>Our Vision</h3>
              <p>To be a name people trust and remember — recognized not just for what we offer, but for the difference we make. We aspire to set new standards of excellence while staying rooted in the values that brought us here.</p>
            </div>
            <div className={`vision-card anim fade-up delay-3 ${visionIn ? 'in-view' : ''}`}>
              <span className="vision-card-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
              </span>
              <h3>Our Mission</h3>
              <p>To consistently deliver excellence through innovation, integrity, and genuine care — building lasting relationships one customer at a time. We respond to evolving needs with solutions that add real value to people's lives.</p>
            </div>
          </div>

          <div className={`why-us-wrap anim fade-up delay-4 ${visionIn ? 'in-view' : ''}`}>
            <h3 className="why-us-title">Why Choose Us</h3>
            <div className="why-us-grid">
              {[
                { icon: '🏆', title: 'Proven Legacy', desc: 'Over a decade of experience since 2010 — deep industry knowledge and a track record of reliability.' },
                { icon: '🤝', title: 'Customer First', desc: 'Every decision starts with one question: how does this benefit the people we serve?' },
                { icon: '🔥', title: 'Driven by Passion', desc: "Innovation and quality aren't just words — they're the fuel behind everything we create." },
                { icon: '🛡️', title: 'Built on Trust', desc: 'Relationships matter more than transactions. Trust is earned through consistency, not promises.' },
                { icon: '📈', title: 'Committed to Growth', desc: 'We constantly strive to improve and grow — not just as a business, but as partners in your success.' },
              ].map((item) => (
                <div key={item.title} className="why-us-item">
                  <span className="why-us-emoji">{item.icon}</span>
                  <div>
                    <strong>{item.title}</strong>
                    <p>{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <p className={`vision-looking-ahead anim fade-up delay-5 ${visionIn ? 'in-view' : ''}`}>
            As we look toward the future, our focus remains clear — to keep building on the foundation of trust and excellence that has defined us since 2010. Join us as we continue this journey, because every great story deserves the right partner.
          </p>
        </div>
      </section>

      {/* Industries — Global Reach */}
      <GlobalReach />

      {/* Certifications with background image */}
      <section className="cert-section">
        <div className="cert-section-bg-wrap" aria-hidden="true">
          <img
            src="https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=1400&q=80"
            alt=""
            className="cert-section-bg"
          />
          <div className="cert-section-overlay" />
        </div>
        <div ref={certsRef} className="container cert-section-inner">
          <p className={`section-eyebrow anim fade-up ${certsIn ? 'in-view' : ''}`} style={{color:'#B8D4E8'}}>Certifications &amp; Trust</p>
          <h2 className={`section-title anim fade-up delay-1 ${certsIn ? 'in-view' : ''}`} style={{color:'#fff',marginBottom:'2rem'}}>Built to the World's Standards</h2>
          <div className="cert-row">
            {CERTS.map((c, i) => (
              <div key={c.label} className={`cert-badge anim scale-in delay-${i + 2} ${certsIn ? 'in-view' : ''}`}>
                <span className="cert-label">{c.label}</span>
                <span className="cert-sub">{c.sub}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA banner with real image */}
      <section className="cta-banner">
        <div className="cta-banner-bg-wrap" aria-hidden="true">
          <img
            src="https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=1400&q=80"
            alt=""
            className="cta-banner-bg"
          />
          <div className="cta-banner-overlay" />
        </div>
        <div ref={ctaRef} className="container cta-banner-inner">
          <div className={`anim fade-left ${ctaIn ? 'in-view' : ''}`}>
            <h2 className="section-title" style={{marginBottom:'0.5rem',color:'#fff'}}>Ready to Specify?</h2>
            <p style={{color:'rgba(234,244,251,0.8)'}}>Our engineers are ready to help you select the right solution.</p>
          </div>
          <div className={`cta-banner-actions anim fade-right delay-2 ${ctaIn ? 'in-view' : ''}`}>
            <Link to="/contact" className="btn-primary">Talk to an Engineer</Link>
            <Link to="/products" className="cta-btn-outline">Browse Products</Link>
          </div>
        </div>
      </section>
    </main>
  );
}
