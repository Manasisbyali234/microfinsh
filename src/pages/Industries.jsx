import useInView from '../hooks/useInView';
import './Industries.css';

const INDUSTRIES = [
  { name: 'Agriculture', desc: 'Empowering farmers with crop loans, equipment finance, and rural credit solutions.', img: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=600&q=80' },
  { name: 'Small Business', desc: 'Micro-loans and working capital for small traders, shops, and entrepreneurs.', img: 'https://images.unsplash.com/photo-1604719312566-8912e9227c6a?w=600&q=80' },
  { name: 'Women Empowerment', desc: 'Self-help group lending and financial inclusion programs for women.', img: 'https://images.unsplash.com/photo-1607748862156-7c548e7e98f4?w=600&q=80' },
  { name: 'Education', desc: 'Affordable education loans for students from low-income households.', img: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=600&q=80' },
  { name: 'Healthcare', desc: 'Medical finance solutions for rural and semi-urban communities.', img: 'https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?w=600&q=80' },
  { name: 'Housing', desc: 'Affordable home improvement and construction loans for underserved families.', img: 'https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=600&q=80' },
  { name: 'Livestock & Dairy', desc: 'Loans for cattle, poultry, and dairy farming to boost rural livelihoods.', img: 'https://images.unsplash.com/photo-1570042225831-d98fa7577f1e?w=600&q=80' },
  { name: 'Handicrafts & Artisans', desc: 'Credit support for weavers, potters, and traditional craft communities.', img: 'https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=600&q=80' },
  { name: 'Renewable Energy', desc: 'Green energy loans for solar panels and clean cooking solutions.', img: 'https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?w=600&q=80' },
];

export default function Industries() {
  const [headerRef, headerIn] = useInView();
  const [statsRef, statsIn] = useInView();

  return (
    <main>
      <section className="page-header blueprint-bg industries-header">
        <div className="industries-header-img-wrap">
          <img
            src="https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=1400&q=80"
            alt="Microfinance industries"
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

      <section ref={statsRef} className="industries-stats-strip">
        {[['9', 'Industries Served'],['40+','Countries'],['50+','Years Experience'],['13','Product Lines']].map(([val, lbl], i) => (
          <div key={lbl} className={`ind-stat anim scale-in delay-${i + 1} ${statsIn ? 'in-view' : ''}`}>
            <span className="ind-stat-val">{val}</span>
            <span className="ind-stat-lbl">{lbl}</span>
          </div>
        ))}
      </section>

      <section className="section">
        <div className="container">
          <div className="industries-grid">
            {INDUSTRIES.map((ind) => (
              <div key={ind.name} className="industry-item">
                <div className="ind-img-wrap">
                  <img src={ind.img} alt={ind.name} className="ind-img" onError={e => { e.currentTarget.src = '/images/industries/oil-gas.jpg'; }} />
                  <div className="ind-img-overlay" />
                  <h3 className="industry-name-overlay">{ind.name}</h3>
                </div>
                <p className="industry-desc">{ind.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
