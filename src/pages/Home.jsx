import { Link } from 'react-router-dom';
import Hero from '../components/Hero';
import ProductCard from '../components/ProductCard';
import IndustryCard from '../components/IndustryCard';
import useInView from '../hooks/useInView';
import './Home.css';

const FEATURED_PRODUCTS = [
  { name: 'Trunnion Mounted Ball Valves', category: 'Valves', description: 'High-pressure, large-bore ball valves for critical pipeline applications.' },
  { name: 'Cryogenic Valves', category: 'Valves', description: 'Designed for LNG and air separation service down to -196°C.' },
  { name: 'Chemical Process Pumps', category: 'Pumps', description: 'Corrosion-resistant centrifugal pumps for aggressive media.' },
  { name: 'Actuators', category: 'Actuators', description: 'Pneumatic and electric actuators for automated valve control.' },
];

const INDUSTRIES = ['Oil and Gas','Refining','Chemical and Petrochemical','LNG and Air Separation','Thermal Power Generation','Nuclear'];

const CERTS = [
  { label: 'ISO 9001', sub: 'Quality Management' },
  { label: 'API 6D', sub: 'Pipeline Valves' },
  { label: 'API 6D-0301', sub: 'Monogram License' },
  { label: 'EST. 1971', sub: '50+ Years Experience' },
];

export default function Home() {
  const [aboutRef, aboutIn] = useInView();
  const [productsRef, productsIn] = useInView();
  const [industriesRef, industriesIn] = useInView();
  const [certsRef, certsIn] = useInView();
  const [ctaRef, ctaIn] = useInView();

  return (
    <main>
      <Hero />

      {/* About teaser */}
      <section className="section about-teaser">
        <div ref={aboutRef} className="container about-teaser-inner">
          <div className={`about-teaser-img-col anim fade-left ${aboutIn ? 'in-view' : ''}`}>
            <img
              src="https://images.unsplash.com/photo-1565043589221-1a6fd9ae45c7?w=700&q=80"
              alt="Valve manufacturing facility"
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
              <p>Since 1971, Microfinish Group has engineered flow-control solutions for the world's most demanding industrial environments. Our ISO 9001 and API 6D certified manufacturing ensures every valve and pump meets the highest standards of safety, reliability, and performance.</p>
              <Link to="/about" className="btn-primary" style={{marginTop:'1.25rem',display:'inline-block'}}>Read More</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Product highlights */}
      <section className="section section-alt">
        <div ref={productsRef} className="container">
          <p className={`section-eyebrow anim fade-up ${productsIn ? 'in-view' : ''}`}>Our Products</p>
          <h2 className={`section-title anim fade-up delay-1 ${productsIn ? 'in-view' : ''}`}>Featured Product Lines</h2>
          <div className="card-grid-4">
            {FEATURED_PRODUCTS.map((p, i) => (
              <div key={p.name} className={`anim fade-up delay-${i + 1} ${productsIn ? 'in-view' : ''}`}>
                <ProductCard {...p} />
              </div>
            ))}
          </div>
          <div style={{textAlign:'center',marginTop:'2rem'}} className={`anim fade-up delay-5 ${productsIn ? 'in-view' : ''}` }>
            <Link to="/products" className="btn-secondary">View All Products</Link>
          </div>
        </div>
      </section>

      {/* Industries strip */}
      <section className="section blueprint-bg">
        <div ref={industriesRef} className="container">
          <p className={`section-eyebrow anim fade-up ${industriesIn ? 'in-view' : ''}`}>Industries We Serve</p>
          <h2 className={`section-title anim fade-up delay-1 ${industriesIn ? 'in-view' : ''}`}>Global Industrial Reach</h2>
          <div className="industry-strip">
            {INDUSTRIES.map((i, idx) => (
              <div key={i} className={`anim scale-in delay-${idx + 1} ${industriesIn ? 'in-view' : ''}`}>
                <IndustryCard name={i} />
              </div>
            ))}
          </div>
          <div style={{textAlign:'center',marginTop:'2rem'}} className={`anim fade-up delay-5 ${industriesIn ? 'in-view' : ''}`}>
            <Link to="/industries" className="btn-secondary">All Industries</Link>
          </div>
        </div>
      </section>

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
