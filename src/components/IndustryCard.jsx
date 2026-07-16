import './IndustryCard.css';

const IMAGES = {
  'Oil and Gas': 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=400&q=80',
  'Refining': 'https://images.unsplash.com/photo-1611273426858-450d8e3c9fce?w=400&q=80',
  'Chemical and Petrochemical': 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=400&q=80',
  'LNG and Air Separation': 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=400&q=80',
  'Thermal Power Generation': 'https://images.unsplash.com/photo-1509391366360-2e959784a276?w=400&q=80',
  'Nuclear': 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80',
  'Pharmaceutical': 'https://images.unsplash.com/photo-1576671081837-49000212a370?w=400&q=80',
  'Food and Beverage': 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400&q=80',
  'Desalination': 'https://images.unsplash.com/photo-1505118380757-91f5f5632de0?w=400&q=80',
};

export default function IndustryCard({ name }) {
  return (
    <div className="industry-card">
      <div className="industry-img-wrap">
        <img
          src={IMAGES[name] || IMAGES['Oil and Gas']}
          alt={name}
          className="industry-img"
          loading="lazy"
        />
        <div className="industry-img-overlay" />
        <h3 className="industry-name">{name}</h3>
      </div>
    </div>
  );
}
