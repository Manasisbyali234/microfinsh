import { useState, useRef, useEffect } from 'react';
import useInView from '../hooks/useInView';
import sbiFactory from '../assets/sbi-factory.jpg';
import './About.css';

const MILESTONES = [
  { year: '1971', text: 'Shree Balaji Industries founded as a precision valve manufacturer serving the Indian oil & gas sector.' },
  { year: '1985', text: 'Expanded product range to include cryogenic and high-pressure valves.' },
  { year: '1994', text: 'Achieved ISO 9001 certification — first in the region for valve manufacturing.' },
  { year: '1999', text: 'Awarded API 6D monogram license (6D-0301) for pipeline valves.' },
  { year: '2008', text: 'Entered international markets across 40+ countries in Asia, Europe, and the Americas.' },
  { year: '2024', text: 'Celebrating 50+ years of engineering excellence with 13 active product lines.' },
];

const TABS = ['Our Vision','Commitment to Quality','Health & Safety','Sustainability','Social Responsibility'];

const TAB_CONTENT = {
  'Our Vision': 'To be the globally preferred manufacturer of precision flow-control equipment, delivering engineered solutions that ensure safety, reliability, and operational excellence across critical industries.',
  'Commitment to Quality': 'Every product at Shree Balaji Industries is manufactured under our ISO 9001 quality management system. Our in-house testing facilities include hydrostatic, pneumatic, and fugitive emission testing to API, ASME, and BS standards.',
  'Health & Safety': 'We maintain a zero-incident culture through rigorous HSE training, regular audits, and compliance with international safety standards including OSHA and local regulatory frameworks.',
  'Sustainability': 'Our low-emission valve range is designed to minimize fugitive emissions. We continuously invest in energy-efficient manufacturing processes and responsible material sourcing.',
  'Social Responsibility': 'We invest in local communities through skills development programs, apprenticeships, and partnerships with engineering institutions to build the next generation of industrial talent.',
};

const TAB_IMAGES = {
  'Our Vision':             'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=700&q=85',
  'Commitment to Quality':  'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=700&q=85',
  'Health & Safety':        'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=700&q=85',
  'Sustainability':         'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=700&q=85',
  'Social Responsibility':  'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=700&q=85',
};

export default function About() {
  const [activeTab, setActiveTab] = useState(TABS[0]);
  const [headerRef, headerIn] = useInView();
  const [founderRef, founderIn] = useInView();
  const [timelineRef, timelineIn] = useInView();
  const [tabsRef, tabsIn] = useInView();

  const milestoneRefs = useRef([]);
  const [milestoneIn, setMilestoneIn] = useState(Array(MILESTONES.length).fill(false));
  useEffect(() => {
    const observers = milestoneRefs.current.map((el, i) => {
      if (!el) return null;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) { setMilestoneIn(prev => { const n = [...prev]; n[i] = true; return n; }); obs.disconnect(); } },
        { threshold: 0.3 }
      );
      obs.observe(el);
      return obs;
    });
    return () => observers.forEach(o => o?.disconnect());
  }, []);

  return (
    <main>
      {/* Page header with image */}
      <section className="page-header blueprint-bg about-header">
        <div className="about-header-img-wrap">
          <img
            src={sbiFactory}
            alt="Shree Balaji Industries manufacturing facility"
            className="about-header-img"
          />
          <div className="about-header-overlay" />
        </div>
        <div ref={headerRef} className="container about-header-content">
          <p className={`section-eyebrow anim fade-up ${headerIn ? 'in-view' : ''}`} style={{color:'#B8D4E8'}}>About Us</p>
          <h1 className={`section-title anim fade-up delay-1 ${headerIn ? 'in-view' : ''}`} style={{fontSize:'clamp(2rem,4vw,3rem)',color:'#fff'}}>
            Over Five Decades of<br />Engineering Excellence
          </h1>
          <div className={`about-header-stats anim fade-up delay-2 ${headerIn ? 'in-view' : ''}`}>
            {[['1971','Founded'],['ISO 9001','Certified'],['API 6D','Licensed'],['40+','Countries']].map(([v,l], i) => (
              <div key={l} className="about-header-stat">
                <span className="about-header-stat-val" style={{ animationDelay: `${0.3 + i * 0.1}s` }}>{v}</span>
                <span className="about-header-stat-lbl">{l}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Founder story */}
      <section className="section">
        <div ref={founderRef} className="container founder-section">
          <div className="founder-text">
            <p className={`section-eyebrow anim fade-up ${founderIn ? 'in-view' : ''}`}>Our Story</p>
            <h2 className={`section-title anim fade-up delay-1 ${founderIn ? 'in-view' : ''}`}>Founded 2010 &mdash; Founder: Santosh Athani</h2>
            <p className={`founder-lead anim fade-up delay-2 ${founderIn ? 'in-view' : ''}`}>Since 2010, we&apos;ve been turning ideas into impact.</p>
            <p className={`anim fade-up delay-3 ${founderIn ? 'in-view' : ''}`}>What began as a bold vision by our founder, Santosh Athani, has blossomed into a story of passion, perseverance, and progress. From humble beginnings, we set out with one goal — to create something people could trust, value, and rely on for years to come.</p>
            <p className={`anim fade-up delay-4 ${founderIn ? 'in-view' : ''}`}>Today, over a decade later, that goal has grown into a legacy. Every milestone we&apos;ve crossed, every challenge we&apos;ve overcome, and every relationship we&apos;ve built has shaped who we are — a team driven not just by ambition, but by purpose.</p>
            <p className={`anim fade-up delay-5 ${founderIn ? 'in-view' : ''}`}>We believe great businesses aren&apos;t built on products alone — they&apos;re built on people, trust, and consistency. That&apos;s the foundation we&apos;ve stood on since day one, and it&apos;s what continues to drive us forward.</p>
            <p className={`anim fade-up delay-6 ${founderIn ? 'in-view' : ''}`}>Our journey has never been just about growth in numbers. It&apos;s been about growing the right way — staying true to our values, listening closely to the people we serve, and constantly evolving to meet their needs. We&apos;ve learned that success isn&apos;t a destination; it&apos;s a continuous process of improvement, learning, and giving back to the people who make our journey possible.</p>
            <p className={`anim fade-up delay-7 ${founderIn ? 'in-view' : ''}`}>From our very first steps to where we stand today, one thing has remained unchanged — our commitment to doing things with honesty, care, and purpose. This is the story of a company that started small but dreamed big, and continues to write new chapters of success every single day.</p>
          </div>
          <div className="founder-highlights">
            {[['2010','Founded'],['Santosh Athani','Founder'],['15+','Years of Impact'],['Trust','Our Foundation']].map(([val, lbl], i) => (
              <div key={lbl} className={`founder-highlight-card anim scale-in delay-${i + 2} ${founderIn ? 'in-view' : ''}`}>
                <span className="founder-highlight-val">{val}</span>
                <span className="founder-highlight-lbl">{lbl}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* History timeline */}
      <section className="section">
        <div ref={timelineRef} className="container about-history-grid">
          <div>
            <p className={`section-eyebrow anim fade-up ${timelineIn ? 'in-view' : ''}`}>Our History</p>
            <h2 className={`section-title anim fade-up delay-1 ${timelineIn ? 'in-view' : ''}`}>Key Milestones</h2>
            <div className="timeline">
              {MILESTONES.map((m, i) => (
                <div
                  key={m.year}
                  ref={el => milestoneRefs.current[i] = el}
                  className={`timeline-item ${milestoneIn[i] ? 'milestone-visible' : ''}`}
                >
                  <div className="timeline-year">{m.year}</div>
                  <div className="timeline-dot" />
                  <div className="timeline-text">{m.text}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="about-img-stack">
            <div className={`about-img-main-wrap anim fade-right ${timelineIn ? 'in-view' : ''}`}>
              <img
                src="https://images.unsplash.com/photo-1518770660439-4636190af475?w=700&q=85"
                alt="Industrial control systems"
                className="about-img-main"
              />
              <div className="about-img-badge">
                <span className="about-img-badge-num">50+</span>
                <span className="about-img-badge-txt">Years</span>
              </div>
            </div>
            <div className={`about-img-secondary-wrap anim fade-right delay-2 ${timelineIn ? 'in-view' : ''}`}>
              <img
                src="https://images.unsplash.com/photo-1565043589221-1a6fd9ae45c7?w=700&q=85"
                alt="Industrial valve"
                className="about-img-secondary"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Tabs with image */}
      <section className="section section-alt">
        <div ref={tabsRef} className={`container about-tabs-grid anim fade-up ${tabsIn ? 'in-view' : ''}`}>
          <div>
            <div className="tabs">
              {TABS.map(t => (
                <button
                  key={t}
                  className={`tab-btn ${activeTab === t ? 'active' : ''}`}
                  onClick={() => setActiveTab(t)}
                >{t}</button>
              ))}
            </div>
            <div className="tab-panel" key={activeTab}>
              <p>{TAB_CONTENT[activeTab]}</p>
            </div>
          </div>
          <div className="tab-img-wrap">
            <img
              src={TAB_IMAGES[activeTab]}
              alt={activeTab}
              className="tab-img"
              key={activeTab}
            />
          </div>
        </div>
      </section>
    </main>
  );
}
