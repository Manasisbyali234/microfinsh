import { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import './Navbar.css';

const PRODUCTS = [
  'Trunnion Mounted Ball Valves','Floating Ball Valves','Low Emission Valves',
  'Cryogenic Valves','Metal Seated Valves','Oxygen Service Valves',
  'Chlorine Service Valves','Bellows Seal Valves','Swing Check Valves',
  'Knife Edge Gate Valve','Chemical Process Pumps','Actuators','Automation',
];
const INDUSTRIES = [
  'Oil and Gas','Refining','Chemical and Petrochemical','LNG and Air Separation',
  'Thermal Power Generation','Nuclear','Pharmaceutical','Food and Beverage','Desalination',
];

const NAV_TABS = [
  { to: '/',           label: 'Home',       icon: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
  )},
  { to: '/about',      label: 'About',      icon: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
  )},
  { to: '/products',   label: 'Products',   icon: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/></svg>
  )},
  { to: '/industries', label: 'Industries', icon: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="4" height="18"/><rect x="10" y="8" width="4" height="13"/><rect x="18" y="13" width="4" height="8"/></svg>
  )},
  { to: '/contact',    label: 'Contact',    icon: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.18 2 2 0 0 1 3.6 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.6a16 16 0 0 0 6 6l.96-.96a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
  )},
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdown, setDropdown] = useState(null);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  // Only Home page has a full-viewport dark hero; all other pages need light navbar from the start
  const isHome = location.pathname === '/';
  const lightNav = !isHome || scrolled;

  useEffect(() => { setMenuOpen(false); setDropdown(null); }, [location]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    // Re-check on route change (scroll position may not be 0 immediately)
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [location]);

  const toggleDropdown = (key) => setDropdown(d => d === key ? null : key);

  return (
    <>
      {/* ── Desktop / Top App Bar ── */}
      <nav className={`navbar ${lightNav ? 'scrolled' : ''}`}>
        <div className="navbar-inner container">
          <Link to="/" className="navbar-logo">
            <span className="logo-mark">SBI</span>
            <span className="logo-text">Shree Balaji<br /><small>Industries</small></span>
          </Link>

          {/* Desktop links */}
          <ul className="nav-links desktop-only">
            <li><NavLink to="/" end>Home</NavLink></li>
            <li><NavLink to="/about">About</NavLink></li>
            <li className={`has-dropdown ${dropdown === 'products' ? 'dropdown-open' : ''}`}>
              <button className="dropdown-trigger" onClick={() => toggleDropdown('products')}>
                Products <span className="dropdown-arrow">▾</span>
              </button>
              <ul className="dropdown">
                {PRODUCTS.map(p => <li key={p}><Link to="/products">{p}</Link></li>)}
              </ul>
            </li>
            <li className={`has-dropdown ${dropdown === 'industries' ? 'dropdown-open' : ''}`}>
              <button className="dropdown-trigger" onClick={() => toggleDropdown('industries')}>
                Industries <span className="dropdown-arrow">▾</span>
              </button>
              <ul className="dropdown">
                {INDUSTRIES.map(i => <li key={i}><Link to="/industries">{i}</Link></li>)}
              </ul>
            </li>
            <li><NavLink to="/contact">Contact</NavLink></li>
          </ul>

          {/* Mobile hamburger */}
          <button
            className={`nav-hamburger mobile-only ${menuOpen ? 'open' : ''}`}
            onClick={() => setMenuOpen(o => !o)}
            aria-label="Menu"
          >
            <span /><span /><span />
          </button>
        </div>

        {/* Mobile slide-down menu */}
        <div className={`mobile-menu mobile-only ${menuOpen ? 'open' : ''}`}>
          <NavLink to="/" end className="mobile-menu-item">Home</NavLink>
          <NavLink to="/about" className="mobile-menu-item">About</NavLink>

          <div className={`mobile-accordion ${dropdown === 'products' ? 'open' : ''}`}>
            <button className="mobile-accordion-trigger" onClick={() => toggleDropdown('products')}>
              Products
              <svg className="acc-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="6 9 12 15 18 9"/></svg>
            </button>
            <div className="mobile-accordion-body">
              {PRODUCTS.map(p => <Link key={p} to="/products" className="mobile-sub-item">{p}</Link>)}
            </div>
          </div>

          <div className={`mobile-accordion ${dropdown === 'industries' ? 'open' : ''}`}>
            <button className="mobile-accordion-trigger" onClick={() => toggleDropdown('industries')}>
              Industries
              <svg className="acc-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="6 9 12 15 18 9"/></svg>
            </button>
            <div className="mobile-accordion-body">
              {INDUSTRIES.map(i => <Link key={i} to="/industries" className="mobile-sub-item">{i}</Link>)}
            </div>
          </div>

          <NavLink to="/contact" className="mobile-menu-item">Contact</NavLink>
        </div>
      </nav>

      {/* ── Bottom Tab Bar (mobile only) ── */}
      <nav className="bottom-tab-bar mobile-only">
        {NAV_TABS.map(tab => (
          <NavLink key={tab.to} to={tab.to} end={tab.to === '/'} className="tab-item">
            <span className="tab-icon">{tab.icon}</span>
            <span className="tab-label">{tab.label}</span>
          </NavLink>
        ))}
      </nav>
    </>
  );
}
