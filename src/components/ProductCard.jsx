import { Link } from 'react-router-dom';
import sbiProduct from '../assets/sbi-product.jpg';
import './ProductCard.css';

const IMAGES = {
  'Trunnion Mounted Ball Valves': sbiProduct,
  'Floating Ball Valves': sbiProduct,
  'Low Emission Valves': 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=400&q=80',
  'Cryogenic Valves': 'https://images.unsplash.com/photo-1611273426858-450d8e3c9fce?w=400&q=80',
  'Metal Seated Valves': sbiProduct,
  'Oxygen Service Valves': 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=400&q=80',
  'Chlorine Service Valves': 'https://images.unsplash.com/photo-1509391366360-2e959784a276?w=400&q=80',
  'Bellows Seal Valves': sbiProduct,
  'Swing Check Valves': 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&q=80',
  'Knife Edge Gate Valve': sbiProduct,
  'Chemical Process Pumps': 'https://images.unsplash.com/photo-1576671081837-49000212a370?w=400&q=80',
  'Actuators': 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&q=80',
  'Automation': 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&q=80',
};

const CATEGORY_FALLBACK = {
  Valves: sbiProduct,
  Pumps: 'https://images.unsplash.com/photo-1576671081837-49000212a370?w=400&q=80',
  Actuators: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&q=80',
  Automation: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&q=80',
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
