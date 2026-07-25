import { Link } from 'react-router-dom';
import p01 from '../assets/products/p01.jpg';
import p02 from '../assets/products/p02.jpg';
import p03 from '../assets/products/p03.jpg';
import p04 from '../assets/products/p04.jpg';
import p05 from '../assets/products/p05.jpg';
import p06 from '../assets/products/p06.jpg';
import p07 from '../assets/products/p07.jpg';
import p08 from '../assets/products/p08.jpg';
import p09 from '../assets/products/p09.jpg';
import p10 from '../assets/products/p10.jpg';
import p11 from '../assets/products/p11.jpg';
import p12 from '../assets/products/p12.jpg';
import p13 from '../assets/products/p13.jpg';
import p14 from '../assets/products/p14.jpg';
import p15 from '../assets/products/p15.jpg';
import p16 from '../assets/products/p16.jpg';
import p17 from '../assets/products/p17.jpg';
import p18 from '../assets/products/p18.jpg';
import p19 from '../assets/products/p19.jpg';
import p20 from '../assets/products/p20.jpg';
import p21 from '../assets/products/p21.jpg';
import p22 from '../assets/products/p22.jpg';
import p23 from '../assets/products/p23.jpg';
import p24 from '../assets/products/p24.jpg';
import p25 from '../assets/products/p25.jpg';
import p26 from '../assets/products/p26.jpg';
import './ProductCard.css';

const IMAGES = {
  'Trunnion Mounted Ball Valves': p01,
  'Floating Ball Valves':         p02,
  'Low Emission Valves':          p03,
  'Cryogenic Valves':             p04,
  'Metal Seated Valves':          p05,
  'Oxygen Service Valves':        p06,
  'Chlorine Service Valves':      p07,
  'Bellows Seal Valves':          p08,
  'Swing Check Valves':           p09,
  'Knife Edge Gate Valve':        p10,
  'Chemical Process Pumps':       p11,
  'Actuators':                    p12,
  'Automation':                   p13,
  'Vertical Air Receiver Tank':   p25,
  'Stainless Steel Idler Convertor Roller': p26,
};

const CATEGORY_FALLBACK = {
  Valves: p01,
  Pumps:  p11,
  Actuators: p12,
  Automation: p13,
  Tanks: p25,
  Rollers: p26,
};

export default function ProductCard({ name, category, description }) {
  const img = IMAGES[name] || CATEGORY_FALLBACK[category] || CATEGORY_FALLBACK.Valves;
  return (
    <div className="product-card">
      <div className="product-card-img-wrap">
        <img src={img} alt={name} className="product-card-img" loading="lazy" />
        <span className="product-card-cat-badge">{category}</span>
      </div>
      <div className="product-card-body">
        <h3 className="product-card-name">{name}</h3>
        {description && <p className="product-card-desc">{description}</p>}
        <Link to="/contact" className="product-card-link">Request Specs →</Link>
      </div>
    </div>
  );
}
