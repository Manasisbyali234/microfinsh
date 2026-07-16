import { Link } from 'react-router-dom';
import useInView from '../hooks/useInView';
import './Footer.css';

export default function Footer() {
  const year = new Date().getFullYear();
  const [ref, inView] = useInView();
  return (
    <footer className="footer">
      <div ref={ref} className="footer-main container">
        {/* Brand */}
        <div className={`footer-brand anim fade-up ${inView ? 'in-view' : ''}`}>
          <div className="footer-logo">
            <span className="logo-mark">SBI</span>
            <span>Shree Balaji<br /><small>Industries</small></span>
          </div>
          <p className="footer-tagline">Engineered to hold the line since 1971.</p>
          <div className="footer-contact-details">
            <p>Santosh Athani</p>
            <p><a href="tel:9900431038">9900431038</a> / <a href="tel:8453549143">8453549143</a></p>
            <p><a href="mailto:shreebalajisbi2016@gmail.com">shreebalajisbi2016@gmail.com</a></p>
            <p>15-B, 1st Gate/Cross Industrial Estate,<br />Gokul Road, Hubballi, Karnataka – 580030</p>
            <p className="footer-gst">GSTIN: 29AUWPG6619B1ZB</p>
          </div>
          <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="footer-linkedin" aria-label="LinkedIn">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20.447 20.452H17.21v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.985V9h3.102v1.561h.046c.432-.818 1.487-1.681 3.061-1.681 3.274 0 3.878 2.155 3.878 4.958v6.614zM5.337 7.433a1.8 1.8 0 1 1 0-3.6 1.8 1.8 0 0 1 0 3.6zm1.554 13.019H3.783V9h3.108v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
            </svg>
          </a>
        </div>

        {/* Quick links */}
        <div className={`footer-col anim fade-up delay-2 ${inView ? 'in-view' : ''}`}>
          <h4>Company</h4>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">About Us</Link></li>
            <li><Link to="/products">Products</Link></li>
            <li><Link to="/industries">Industries</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>
        </div>

        {/* Product links */}
        <div className={`footer-col anim fade-up delay-3 ${inView ? 'in-view' : ''}`}>
          <h4>Products</h4>
          <ul>
            {['Trunnion Mounted Ball Valves','Floating Ball Valves','Cryogenic Valves',
              'Metal Seated Valves','Bellows Seal Valves','Chemical Process Pumps',
              'Actuators','Automation'].map(p => (
              <li key={p}><Link to="/products">{p}</Link></li>
            ))}
          </ul>
        </div>

        {/* Newsletter */}
        <div className={`footer-col footer-newsletter anim fade-up delay-4 ${inView ? 'in-view' : ''}`}>
          <h4>Stay Updated</h4>
          <p>Technical bulletins &amp; product updates.</p>
          <form onSubmit={e => e.preventDefault()} className="newsletter-form">
            <input type="email" placeholder="your@email.com" aria-label="Email" />
            <button type="submit" className="btn-primary">Subscribe</button>
          </form>
        </div>
      </div>

      <div className="footer-bottom container">
        <span className="mono">© {year} Shree Balaji Industries. All rights reserved.</span>
        <span className="mono">ISO 9001 · API 6D CERTIFIED</span>
      </div>
    </footer>
  );
}
