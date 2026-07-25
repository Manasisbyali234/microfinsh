import { useState } from 'react';
import ProductCard from '../components/ProductCard';
import useInView from '../hooks/useInView';
import './Products.css';

const ALL_PRODUCTS = [
  { name: 'Trunnion Mounted Ball Valves', category: 'Valves', description: 'High-pressure, large-bore ball valves for critical pipeline applications.' },
  { name: 'Floating Ball Valves', category: 'Valves', description: 'Versatile soft-seated valves for general service applications.' },
  { name: 'Low Emission Valves', category: 'Valves', description: 'Fugitive emission-controlled valves meeting ISO 15848 standards.' },
  { name: 'Cryogenic Valves', category: 'Valves', description: 'Extended bonnet design for LNG and air separation service to -196°C.' },
  { name: 'Metal Seated Valves', category: 'Valves', description: 'For high-temperature and abrasive service conditions.' },
  { name: 'Oxygen Service Valves', category: 'Valves', description: 'Cleaned and degreased for oxygen-enriched service.' },
  { name: 'Chlorine Service Valves', category: 'Valves', description: 'Specially designed for chlorine and aggressive chemical media.' },
  { name: 'Bellows Seal Valves', category: 'Valves', description: 'Zero-leakage stem sealing for toxic and hazardous media.' },
  { name: 'Swing Check Valves', category: 'Valves', description: 'Non-return valves for pipeline backflow prevention.' },
  { name: 'Knife Edge Gate Valve', category: 'Valves', description: 'For slurry, pulp, and viscous media applications.' },
  { name: 'Chemical Process Pumps', category: 'Pumps', description: 'ISO 2858 / ASME B73.1 centrifugal pumps for corrosive media.' },
  { name: 'Actuators', category: 'Actuators', description: 'Pneumatic and electric actuators for automated valve control.' },
  { name: 'Automation', category: 'Automation', description: 'Positioners, limit switches, and solenoid valve assemblies.' },
  { name: 'Vertical Air Receiver Tank', category: 'Tanks', description: 'Vertical air receiver tanks for compressed air storage and pressure regulation.' },
  { name: 'Stainless Steel Idler Convertor Roller', category: 'Rollers', description: 'Stainless steel idler convertor rollers for conveyor and material handling systems.' },
];

const CATEGORIES = ['All', 'Valves', 'Pumps', 'Actuators', 'Automation', 'Tanks', 'Rollers'];

export default function Products() {
  const [filter, setFilter] = useState('All');
  const [search, setSearch] = useState('');
  const [headerRef, headerIn] = useInView();
  const [gridRef, gridIn] = useInView();

  const visible = ALL_PRODUCTS.filter(p => {
    const matchCat = filter === 'All' || p.category === filter;
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <main>
      <section className="page-header blueprint-bg products-header">
        <div className="products-header-img-wrap">
          <img
            src="https://images.unsplash.com/photo-1565043589221-1a6fd9ae45c7?w=1400&q=80"
            alt="Industrial valve manufacturing"
            className="products-header-img"
          />
          <div className="products-header-overlay" />
        </div>
        <div ref={headerRef} className="container products-header-content">
          <p className={`section-eyebrow anim fade-up ${headerIn ? 'in-view' : ''}`} style={{color:'#B8D4E8'}}>Products</p>
          <h1 className={`section-title anim fade-up delay-1 ${headerIn ? 'in-view' : ''}`} style={{fontSize:'clamp(2rem,4vw,3rem)',color:'#fff'}}>
            15 Product Lines.<br />One Standard: Excellence.
          </h1>
        </div>
      </section>

      <section className="section">
        <div ref={gridRef} className="container">
          <div className={`products-toolbar anim fade-up ${gridIn ? 'in-view' : ''}`}>
            <div className="filter-tabs">
              {CATEGORIES.map(c => (
                <button
                  key={c}
                  className={`filter-btn ${filter === c ? 'active' : ''}`}
                  onClick={() => setFilter(c)}
                >{c}</button>
              ))}
            </div>
            <input
              className="search-input"
              type="search"
              placeholder="Search products…"
              value={search}
              onChange={e => setSearch(e.target.value)}
              aria-label="Search products"
            />
          </div>

          <div className="products-grid">
            {visible.length > 0
              ? visible.map((p, i) => (
                  <div key={p.name} className={`anim fade-up delay-${(i % 4) + 1} ${gridIn ? 'in-view' : ''}`}>
                    <ProductCard {...p} />
                  </div>
                ))
              : <p className="no-results">No products match your search.</p>
            }
          </div>
        </div>
      </section>
    </main>
  );
}
