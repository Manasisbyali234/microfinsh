import { useState } from 'react';
import useInView from '../hooks/useInView';
import sbiFactory from '../assets/sbi-factory.jpg';
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
            {/* Factory image */}
            <div className="contact-office-img-wrap">
              <img
                src={sbiFactory}
                alt="Shree Balaji Industries manufacturing facility"
                className="contact-office-img"
              />
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
              <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="linkedin-link">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452H17.21v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.985V9h3.102v1.561h.046c.432-.818 1.487-1.681 3.061-1.681 3.274 0 3.878 2.155 3.878 4.958v6.614zM5.337 7.433a1.8 1.8 0 1 1 0-3.6 1.8 1.8 0 0 1 0 3.6zm1.554 13.019H3.783V9h3.108v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                LinkedIn
              </a>
            </div>

            {/* Team image */}
            <div className="contact-office-img-wrap">
              <img
                src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=700&q=80"
                alt="Engineering office"
                className="contact-office-img"
              />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
