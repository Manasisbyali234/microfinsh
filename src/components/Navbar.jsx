import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
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
  const [open, setOpen] = useState(false);
  const [dropdown, setDropdown] = useState(null);

  return (
    <nav className="navbar anim slide-down in-view">
      <div className="navbar-inner container">
        <Link to="/" className="navbar-logo">
          <span className="logo-mark">MFG</span>
          <span className="logo-text">Microfinish<br /><small>Valves &amp; Pumps</small></span>
        </Link>

        <button className="nav-hamburger" onClick={() => setOpen(o => !o)} aria-label="Menu">
          <span /><span /><span />
        </button>

        <ul className={`nav-links ${open ? 'open' : ''}`}>
          <li><NavLink to="/" end onClick={() => setOpen(false)}>Home</NavLink></li>
          <li><NavLink to="/about" onClick={() => setOpen(false)}>About</NavLink></li>

          {/* Products dropdown */}
          <li className="has-dropdown"
            onMouseEnter={() => setDropdown('products')}
            onMouseLeave={() => setDropdown(null)}>
            <NavLink to="/products" onClick={() => setOpen(false)}>Products ▾</NavLink>
            {dropdown === 'products' && (
              <ul className="dropdown">
                {PRODUCTS.map(p => (
                  <li key={p}><Link to="/products" onClick={() => { setOpen(false); setDropdown(null); }}>{p}</Link></li>
                ))}
              </ul>
            )}
          </li>

          {/* Industries dropdown */}
          <li className="has-dropdown"
            onMouseEnter={() => setDropdown('industries')}
            onMouseLeave={() => setDropdown(null)}>
            <NavLink to="/industries" onClick={() => setOpen(false)}>Industries ▾</NavLink>
            {dropdown === 'industries' && (
              <ul className="dropdown">
                {INDUSTRIES.map(i => (
                  <li key={i}><Link to="/industries" onClick={() => { setOpen(false); setDropdown(null); }}>{i}</Link></li>
                ))}
              </ul>
            )}
          </li>

          <li><NavLink to="/contact" onClick={() => setOpen(false)}>Contact</NavLink></li>
        </ul>
      </div>
    </nav>
  );
}
