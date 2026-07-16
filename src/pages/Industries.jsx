import useInView from '../hooks/useInView';
import './Industries.css';

const INDUSTRIES = [
  { name: 'Oil and Gas', desc: 'Upstream, midstream, and downstream pipeline and process valves.', img: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=600&q=80' },
  { name: 'Refining', desc: 'High-temperature, high-pressure valves for refinery process units.', img: 'https://images.unsplash.com/photo-1611273426858-450d8e3c9fce?w=600&q=80' },
  { name: 'Chemical and Petrochemical', desc: 'Corrosion-resistant valves for aggressive chemical media.', img: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=600&q=80' },
  { name: 'LNG and Air Separation', desc: 'Cryogenic valves for liquefied natural gas and ASU plants.', img: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=600&q=80' },
  { name: 'Thermal Power Generation', desc: 'Steam and feedwater valves for power plant applications.', img: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?w=600&q=80' },
  { name: 'Nuclear', desc: 'Safety-class valves meeting nuclear quality assurance requirements.', img: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80' },
  { name: 'Pharmaceutical', desc: 'Hygienic valves for sterile and clean-in-place processes.', img: 'https://images.unsplash.com/photo-1576671081837-49000212a370?w=600&q=80' },
  { name: 'Food and Beverage', desc: 'Sanitary valves compliant with FDA and EHEDG standards.', img: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=600&q=80' },
  { name: 'Desalination', desc: 'Seawater-resistant valves for RO and thermal desalination plants.', img: 'https://images.unsplash.com/photo-1505118380757-91f5f5632de0?w=600&q=80' },
];

export default function Industries() {
  const [headerRef, headerIn] = useInView();
  const [statsRef, statsIn] = useInView();
  const [gridRef, gridIn] = useInView();

  return (
    <main>
      <section className="page-header blueprint-bg industries-header">
        <div className="industries-header-img-wrap">
          <img
            src="https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=1600&q=80"
            alt="Industrial facilities"
            className="industries-header-img"
          />
          <div className="industries-header-overlay" />
        </div>
        <div ref={headerRef} className="container industries-header-content">
          <p className={`section-eyebrow anim fade-up ${headerIn ? 'in-view' : ''}`} style={{color:'#B8D4E8'}}>Industries We Serve</p>
          <h1 className={`section-title anim fade-up delay-1 ${headerIn ? 'in-view' : ''}`} style={{fontSize:'clamp(2rem,4vw,3rem)',color:'#fff'}}>
            Trusted Across<br />Critical Industries
          </h1>
        </div>
      </section>

      {/* Stats strip */}
      <section ref={statsRef} className="industries-stats-strip">
        {[['9', 'Industries Served'],['40+','Countries'],['50+','Years Experience'],['13','Product Lines']].map(([val, lbl], i) => (
          <div key={lbl} className={`ind-stat anim scale-in delay-${i + 1} ${statsIn ? 'in-view' : ''}`}>
            <span className="ind-stat-val">{val}</span>
            <span className="ind-stat-lbl">{lbl}</span>
          </div>
        ))}
      </section>

      <section className="section">
        <div ref={gridRef} className="container">
          <div className="industries-grid">
            {INDUSTRIES.map((i, idx) => (
              <div key={i.name} className={`industry-item anim fade-up delay-${(idx % 3) + 1} ${gridIn ? 'in-view' : ''}`}>
                <div className="industry-img-wrap">
                  <img src={i.img} alt={i.name} className="industry-img" loading="lazy" />
                  <div className="industry-img-overlay" />
                  <h3 className="industry-name-overlay">{i.name}</h3>
                </div>
                <p className="industry-desc">{i.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
