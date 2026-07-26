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

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdown, setDropdown] = useState(null);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  // Only Home page has a full-viewport dark hero; all other pages need light navbar from the start
  const isHome = location.pathname === '/';
  const lightNav = !isHome || scrolled || menuOpen;

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


    </>
  );
}
