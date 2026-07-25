import { useState } from 'react';
import useInView from '../hooks/useInView';
import industryImg from '../assets/industry.jpg';
import './Contact.css';

const INDUSTRIES = [
  'Oil and Gas','Refining','Chemical and Petrochemical','LNG and Air Separation',
  'Thermal Power Generation','Nuclear','Pharmaceutical','Food and Beverage','Desalination','Other',
];

export default function Contact() {
  const [form, setForm] = useState({ name:'', email:'', phone:'', industry:'', message:'' });
  const [sent, setSent] = useState(false);
  const [headerRef, headerIn] = useInView();
  const [bodyRef, bodyIn] = useInView();

  const handle = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }));
  const submit = e => { e.preventDefault(); setSent(true); };

  return (
    <main>
      <section className="page-header blueprint-bg contact-header">
        <div className="contact-header-img-wrap">
          <img
            src="https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=1600&q=80"
            alt="Engineering team"
            className="contact-header-img"
          />
          <div className="contact-header-overlay" />
        </div>
        <div ref={headerRef} className="container contact-header-content">
          <p className={`section-eyebrow anim fade-up ${headerIn ? 'in-view' : ''}`} style={{color:'#B8D4E8'}}>Contact Us</p>
          <h1 className={`section-title anim fade-up delay-1 ${headerIn ? 'in-view' : ''}`} style={{fontSize:'clamp(2rem,4vw,3rem)',color:'#fff'}}>
            Talk to an Engineer
          </h1>
        </div>
      </section>

      <section className="section">
        <div ref={bodyRef} className="container contact-layout">
          {/* Form */}
          <div className={`contact-form-wrap anim fade-left ${bodyIn ? 'in-view' : ''}`}>
            {sent ? (
              <div className="form-success">
                <span className="success-icon">✓</span>
                <h3>Message Received</h3>
                <p>Our engineering team will respond within 1 business day.</p>
              </div>
            ) : (
              <form className="contact-form" onSubmit={submit}>
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="name">Full Name *</label>
                    <input id="name" name="name" type="text" required value={form.name} onChange={handle} placeholder="Your Name" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="email">Email *</label>
                    <input id="email" name="email" type="email" required value={form.email} onChange={handle} placeholder="your@email.com" />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="phone">Phone</label>
                    <input id="phone" name="phone" type="tel" value={form.phone} onChange={handle} placeholder="+1 000 000 0000" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="industry">Industry</label>
                    <select id="industry" name="industry" value={form.industry} onChange={handle}>
                      <option value="">Select industry…</option>
                      {INDUSTRIES.map(i => <option key={i} value={i}>{i}</option>)}
                    </select>
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="message">Message *</label>
                  <textarea id="message" name="message" rows={5} required value={form.message} onChange={handle} placeholder="Describe your application or requirement…" />
                </div>
                <button type="submit" className="btn-primary">Send Message</button>
              </form>
            )}
          </div>

          {/* Info block */}
          <div className={`contact-info anim fade-right delay-2 ${bodyIn ? 'in-view' : ''}`}>
            <div className={`industry-img-wrap ${bodyIn ? 'in-view' : ''}`}>
              <img src={industryImg} alt="Industry" className="industry-img" />
              <div className="industry-img-shine" />
            </div>
            <div className="info-block">
              <span className="info-label">Address</span>
              <p>
                Shree Balaji Industries<br />
                15-B, 1st Gate/Cross Industrial Estate,<br />
                Gokul Road, Hubballi,<br />
                Dharwad, Karnataka – 580030
              </p>
            </div>
            <div className="info-block">
              <span className="info-label">GST Registration</span>
              <p className="mono-sm">29AUWPG6619B1ZB</p>
            </div>
            <div className="info-block">
              <span className="info-label">Phone</span>
              <p>
                <a href="tel:9900431038">9900431038</a><br />
                <a href="tel:8453549143">8453549143</a>
              </p>
            </div>
            <div className="info-block">
              <span className="info-label">Email</span>
              <p><a href="mailto:shreebalajisbi2016@gmail.com">shreebalajisbi2016@gmail.com</a></p>
            </div>
            <div className="info-block">
              <span className="info-label">Contact Person</span>
              <p>Santosh Athani</p>
            </div>
            <div className="info-block">
              <span className="info-label">Connect</span>
              <div className="contact-socials">
                <a href="https://linkedin.com" target="_blank" rel="noreferrer" aria-label="LinkedIn" className="contact-social-icon">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452H17.21v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.985V9h3.102v1.561h.046c.432-.818 1.487-1.681 3.061-1.681 3.274 0 3.878 2.155 3.878 4.958v6.614zM5.337 7.433a1.8 1.8 0 1 1 0-3.6 1.8 1.8 0 0 1 0 3.6zm1.554 13.019H3.783V9h3.108v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                  <span>LinkedIn</span>
                </a>
                <a href="https://wa.me/919900431038" target="_blank" rel="noreferrer" aria-label="WhatsApp" className="contact-social-icon">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                  <span>WhatsApp</span>
                </a>
                <a href="https://instagram.com" target="_blank" rel="noreferrer" aria-label="Instagram" className="contact-social-icon">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
                  <span>Instagram</span>
                </a>
                <a href="https://facebook.com" target="_blank" rel="noreferrer" aria-label="Facebook" className="contact-social-icon">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                  <span>Facebook</span>
                </a>
                <a href="https://twitter.com" target="_blank" rel="noreferrer" aria-label="Twitter / X" className="contact-social-icon">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.253 5.622 5.911-5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                  <span>Twitter / X</span>
                </a>
              </div>
            </div>

          </div>
        </div>
      </section>
    </main>
  );
}
