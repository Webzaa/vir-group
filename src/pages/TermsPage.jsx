import React, { useEffect } from 'react';
import { Link, useLoaderData } from 'react-router-dom';
import { usePageMeta } from '@/lib/seo/usePageMeta';
import { getMediaUrl } from '@/lib/media';

export function TermsPage() {
  const loaderData = useLoaderData() || {};
  const company = loaderData.company || {
    name: 'VIR Group',
    email: 'legal@virgroup.in',
    phone: '+919326287741',
    phoneDisplay: '+91 93262 87741',
  };

  usePageMeta({
    title: 'Terms & Conditions | VIR Group Luxury Real Estate',
    description: 'Read the terms and conditions governing the use of our premier real estate platform, property listings, and advisory services.',
    path: '/terms-and-conditions',
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const currentDate = new Intl.DateTimeFormat('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  }).format(new Date());

  return (
    <div className="legal-page" id="terms-page">
      {/* ── Hero Banner ── */}
      <section className="legal-hero" data-hero="true" data-theme="basalt" aria-labelledby="terms-heading">
        <div className="legal-hero-bg" aria-hidden="true">
          <img
            src={getMediaUrl('/media/Contact-Us_Deskto-Slider.jpg')}
            alt=""
            className="legal-hero-img"
          />
          <div className="legal-hero-overlay" />
        </div>

        <div className="legal-hero-inner">
          <h1 id="terms-heading" className="legal-title">
            Terms & Conditions
          </h1>

          <p className="legal-subtitle">
            Please read these terms carefully before exploring or reserving properties. By accessing our services, you agree to be bound by these legal covenants and guidelines.
          </p>

          <div className="legal-meta-bar">
            <div className="legal-meta-item">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                <line x1="16" y1="2" x2="16" y2="6"/>
                <line x1="8" y1="2" x2="8" y2="6"/>
                <line x1="3" y1="10" x2="21" y2="10"/>
              </svg>
              <span>Last Updated: {currentDate}</span>
            </div>
            <div className="legal-meta-item">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <circle cx="12" cy="12" r="10"/>
                <polyline points="12 6 12 12 16 14"/>
              </svg>
              <span>15 min read</span>
            </div>
            <div className="legal-meta-item">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                <polyline points="14 2 14 8 20 8"/>
                <line x1="16" y1="13" x2="8" y2="13"/>
                <line x1="16" y1="17" x2="8" y2="17"/>
              </svg>
              <span>Version 2.4 | MahaRERA Aligned</span>
            </div>
            <span className="legal-badge">Legally Binding Contract</span>
          </div>

          <nav className="legal-crumbs" aria-label="Breadcrumb" style={{ marginTop: '24px', marginBottom: 0 }}>
            <Link to="/">Home</Link>
            <span>/</span>
            <span>Legal</span>
            <span>/</span>
            <span style={{ color: '#e5c38c' }}>Terms & Conditions</span>
          </nav>
        </div>
      </section>

      {/* ── Main Full Screen Content Container ── */}
      <div className="legal-container">
        <main className="legal-content">
          {/* Section 1: Acceptance of Terms */}
          <section id="acceptance" className="legal-section" aria-labelledby="sec-acceptance-title">
            <header className="legal-section-header">
              <h2 id="sec-acceptance-title" className="legal-section-title">Acceptance of Terms</h2>
            </header>
            <p className="legal-lead-text">
              By accessing and browsing our residential portal, registering enquiries, or booking visits across VIR Group developments, you acknowledge that you have read, understood, and agreed to be bound by these comprehensive Terms and Conditions.
            </p>
            <p className="legal-para">
              These terms constitute a legally binding agreement between you and VIR Group. If you do not agree with any provision herein, you must discontinue the use of our digital platforms immediately.
            </p>
          </section>

          {/* Section 2: Platform Services */}
          <section id="services" className="legal-section" aria-labelledby="sec-services-title">
            <header className="legal-section-header">
              <h2 id="sec-services-title" className="legal-section-title">Platform Services & Scope</h2>
            </header>
            <p className="legal-lead-text">
              Our digital platform provides comprehensive property research, virtual unit explorations, and direct developer communication channels:
            </p>

            <div className="legal-grid-2">
              <article className="legal-card">
                <div className="legal-card-icon" aria-hidden="true">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2 2z"/>
                    <polyline points="9 22 9 12 15 12 15 22"/>
                  </svg>
                </div>
                <h3 className="legal-card-title">Direct Developer Listings</h3>
                <p className="legal-card-desc">Authentic architectural configurations, carpet area breakdowns, high-res floor plans, and sanctioned RERA approvals for ongoing and upcoming developments.</p>
              </article>

              <article className="legal-card">
                <div className="legal-card-icon" aria-hidden="true">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                    <circle cx="9" cy="7" r="4"/>
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
                    <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                  </svg>
                </div>
                <h3 className="legal-card-title">Dedicated Site Visits</h3>
                <p className="legal-card-desc">Scheduling private site inspections, experiential show-flat walk-throughs, and personalized relationship manager consultations.</p>
              </article>

              <article className="legal-card">
                <div className="legal-card-icon" aria-hidden="true">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="1" y="4" width="22" height="16" rx="2" ry="2"/>
                    <line x1="10" y1="23" x2="10"/>
                  </svg>
                </div>
                <h3 className="legal-card-title">Transparent Pricing</h3>
                <p className="legal-card-desc">Upfront pricing schedules, all-inclusive estimates with government charges (stamp duty, GST, registration), and structured payment milestone timelines.</p>
              </article>

              <article className="legal-card">
                <div className="legal-card-icon" aria-hidden="true">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="7" width="20" height="14" rx="2" ry="2"/>
                    <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>
                  </svg>
                </div>
                <h3 className="legal-card-title">Document Facilitation</h3>
                <p className="legal-card-desc">Providing pre-sanctioned bank loan documentation, allotment application letters, and RERA registration certificates.</p>
              </article>
            </div>
          </section>

          {/* Section 3: User Obligations */}
          <section id="obligations" className="legal-section" aria-labelledby="sec-obligations-title">
            <header className="legal-section-header">
              <h2 id="sec-obligations-title" className="legal-section-title">User Obligations & Integrity</h2>
            </header>
            <p className="legal-lead-text">
              To ensure a genuine and secure environment for all homebuyers, platform users agree to the following standards:
            </p>

            <div className="legal-grid-2">
              <div className="legal-card">
                <h3 className="legal-card-title">Authentic Inquiries Only</h3>
                <ul className="legal-list">
                  <li className="legal-list-item">Provide bona fide contact details and authentic identity credentials</li>
                  <li className="legal-list-item">Refrain from speculative, frivolous, or fraudulent unit bookings</li>
                </ul>
              </div>
              <div className="legal-card">
                <h3 className="legal-card-title">Platform Respect & Fair Use</h3>
                <ul className="legal-list">
                  <li className="legal-list-item">Do not use web crawlers, scrapers, or automated bots to extract architectural assets</li>
                  <li className="legal-list-item">Do not interfere with website hosting, security headers, or API endpoints</li>
                </ul>
              </div>
              <div className="legal-card">
                <h3 className="legal-card-title">Statutory Compliance</h3>
                <ul className="legal-list">
                  <li className="legal-list-item">Comply with all guidelines set forth under MahaRERA and Indian banking regulations</li>
                  <li className="legal-list-item">Submit authentic KYC documentation (PAN card, Aadhaar, IT returns) during formal booking</li>
                </ul>
              </div>
              <div className="legal-card">
                <h3 className="legal-card-title">Confidentiality</h3>
                <ul className="legal-list">
                  <li className="legal-list-item">Protect private quote sheets and customized payment schedules provided by sales managers</li>
                  <li className="legal-list-item">Maintain professional courtesy during communications with sales and support staff</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Section 4: Property Listings */}
          <section id="listings" className="legal-section" aria-labelledby="sec-listings-title">
            <header className="legal-section-header">
              <h2 id="sec-listings-title" className="legal-section-title">Property Listings & Architectural Representations</h2>
            </header>
            <p className="legal-lead-text">
              We take pride in absolute clarity regarding all project configurations and visual impressions:
            </p>

            <ul className="legal-list" style={{ marginTop: '16px' }}>
              <li className="legal-list-item">All artistic impressions, 3D renderings, and walkthroughs are conceptual and designed to provide an aesthetic preview of the completed development.</li>
              <li className="legal-list-item">Carpet areas are calculated in strict conformance with the Real Estate (Regulation and Development) Act (RERA). Exact measurements are specified in the formal registered Agreement for Sale.</li>
              <li className="legal-list-item">Furniture, fittings, interior decor, and decorative fixtures shown in sample apartments or 3D visuals are for display inspiration only and do not constitute standard inclusions unless explicitly specified in writing.</li>
              <li className="legal-list-item">Prices, availability of specific unit numbers, and launch promotions are subject to change without prior notice. Final consideration is fixed upon payment of the formal booking token and issue of allotment letter.</li>
            </ul>
          </section>

          {/* Section 5: Payment & Fees */}
          <section id="fees" className="legal-section" aria-labelledby="sec-fees-title">
            <header className="legal-section-header">
              <h2 id="sec-fees-title" className="legal-section-title">Commercial Terms & Booking Tokens</h2>
            </header>
            <p className="legal-lead-text">
              Financial transactions and booking milestone terms are managed through scheduled escrow mechanisms:
            </p>

            <div className="legal-metrics-row">
              <div className="legal-metric-card">
                <div className="legal-metric-number">RERA</div>
                <div className="legal-metric-label">Escrow Account Routing</div>
                <p className="legal-metric-desc">70% of all project collections routed into designated project escrow accounts as per statutory mandates</p>
              </div>
              <div className="legal-metric-card">
                <div className="legal-metric-number">100%</div>
                <div className="legal-metric-label">Encrypted Channels</div>
                <p className="legal-metric-desc">Token advances processed via banking NEFT/RTGS and authorized digital gateways with instant receipts</p>
              </div>
              <div className="legal-metric-card">
                <div className="legal-metric-number">Clear</div>
                <div className="legal-metric-label">Allotment Framework</div>
                <p className="legal-metric-desc">Transparent cancellation and refund guidelines governed by standard MahaRERA model agreements</p>
              </div>
            </div>
          </section>

          {/* Section 6: Limitation of Liability */}
          <section id="liability" className="legal-section" aria-labelledby="sec-liability-title">
            <header className="legal-section-header">
              <h2 id="sec-liability-title" className="legal-section-title">Limitation of Liability</h2>
            </header>
            <p className="legal-lead-text">
              While VIR Group exercises utmost care in maintaining portal accuracy, we disclaim liability for the following circumstances to the fullest extent permissible by law:
            </p>

            <div className="legal-grid-2">
              <div className="legal-card">
                <h3 className="legal-card-title">Third-Party Broker Representations</h3>
                <p className="legal-card-desc">Statements, unauthorized commercial offers, or commitments made by unauthorized independent agents not officially documented in company stationery.</p>
              </div>
              <div className="legal-card">
                <h3 className="legal-card-title">Bank Loan Approvals & Eligibility</h3>
                <p className="legal-card-desc">Sanction timelines, rate revisions, or individual credit eligibility determinations made independently by partnering financial institutions.</p>
              </div>
              <div className="legal-card">
                <h3 className="legal-card-title">Technical Downtime & Internet Outages</h3>
                <p className="legal-card-desc">Temporary service disruptions due to ISP downtime, telecom outages, maintenance upgrades, or distributed denial-of-service events.</p>
              </div>
              <div className="legal-card">
                <h3 className="legal-card-title">Market Conditions & Statutory Charges</h3>
                <p className="legal-card-desc">Changes in government stamp duty rates, registration fees, GST revisions, or general real estate market price fluctuations.</p>
              </div>
            </div>
          </section>

          {/* Section 7: Intellectual Property */}
          <section id="ip" className="legal-section" aria-labelledby="sec-ip-title">
            <header className="legal-section-header">
              <h2 id="sec-ip-title" className="legal-section-title">Intellectual Property Rights</h2>
            </header>
            <p className="legal-lead-text">
              The VIR Group logo, project names (including Codename Opportunity, Paradise, Surya Prakash, Vinayanand), floor plans, 3D architectural renders, site photographs, codebases, and marketing slogans are proprietary assets of VIR Group.
            </p>
            <p className="legal-para">
              Any unauthorized reproduction, modification, distribution, or public display of our materials without express written authorization constitutes copyright infringement and will invite immediate statutory action.
            </p>
          </section>

          {/* Section 8: Account Termination */}
          <section id="termination" className="legal-section" aria-labelledby="sec-termination-title">
            <header className="legal-section-header">
              <h2 id="sec-termination-title" className="legal-section-title">Termination & Suspension of Access</h2>
            </header>
            <p className="legal-lead-text">
              We reserve the right to restrict or terminate access to our portal or booking services if a user breaches these terms, engages in malicious behavior, or attempts to disrupt operations.
            </p>
            <p className="legal-para">
              Any pre-existing statutory obligations, registered agreements, or financial transactions executed prior to termination shall continue to remain in full legal force.
            </p>
          </section>

          {/* Section 9: Governing Law & Jurisdiction */}
          <section id="governing" className="legal-section" aria-labelledby="sec-governing-title">
            <header className="legal-section-header">
              <h2 id="sec-governing-title" className="legal-section-title">Governing Law & Legal Jurisdiction</h2>
            </header>
            <p className="legal-lead-text">
              These terms are governed by and construed in accordance with the substantive laws of India, including the Real Estate (Regulation and Development) Act, 2016.
            </p>
            <p className="legal-para">
              All legal claims, proceedings, or arbitrations arising from the use of our services or property transactions shall be submitted to the exclusive jurisdiction of the competent courts in <strong>Mumbai, Maharashtra, India</strong>.
            </p>
          </section>

          {/* Section 10: Legal Inquiries */}
          <section id="contact" className="legal-section" aria-labelledby="sec-contact-title">
            <header className="legal-section-header">
              <h2 id="sec-contact-title" className="legal-section-title">Legal Inquiries & Advisory Desk</h2>
            </header>
            <p className="legal-lead-text">
              For legal clarification regarding project documentation, agreements, or terms of use, please reach our corporate legal cell:
            </p>

            <div className="legal-contact-grid">
              <div className="legal-contact-card">
                <span className="legal-contact-card-label">Corporate Legal Desk</span>
                <p className="legal-contact-card-val">
                  <a href={`mailto:${company.email || 'legal@virgroup.in'}`}>
                    {company.email || 'legal@virgroup.in'}
                  </a>
                </p>
              </div>
              <div className="legal-contact-card">
                <span className="legal-contact-card-label">Relationship Hotline</span>
                <p className="legal-contact-card-val">
                  <a href={`tel:${company.phone || '+919326287741'}`}>
                    {company.phoneDisplay || '+91 93262 87741'}
                  </a>
                </p>
              </div>
              <div className="legal-contact-card">
                <span className="legal-contact-card-label">Corporate Office</span>
                <p className="legal-contact-card-val" style={{ fontSize: '13.5px', lineHeight: 1.5 }}>
                  B-605, Express Zone, Western Express Hwy, near Oberoi Mall, Malad East, Mumbai, Maharashtra - 400063
                </p>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
