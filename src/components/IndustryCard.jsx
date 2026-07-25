import './IndustryCard.css';
import oilGas from '../assets/industries/oil-gas.jpg';
import refining from '../assets/industries/refining.jpg';
import chemical from '../assets/industries/chemical.jpg';
import lng from '../assets/industries/lng.jpg';
import thermalPower from '../assets/industries/thermal-power.jpg';
import nuclear from '../assets/industries/nuclear.jpg';
import pharmaceutical from '../assets/industries/pharmaceutical.jpg';
import foodBeverage from '../assets/industries/food-beverage.jpg';
import desalination from '../assets/industries/desalination.jpg';

const IMAGES = {
  'Oil and Gas': oilGas,
  'Refining': refining,
  'Chemical and Petrochemical': chemical,
  'LNG and Air Separation': lng,
  'Thermal Power Generation': thermalPower,
  'Nuclear': nuclear,
  'Pharmaceutical': pharmaceutical,
  'Food and Beverage': foodBeverage,
  'Desalination': desalination,
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
          onError={e => { e.currentTarget.src = oilGas; }}
        />
        <div className="industry-img-overlay" />
        <h3 className="industry-name">{name}</h3>
      </div>
    </div>
  );
}
