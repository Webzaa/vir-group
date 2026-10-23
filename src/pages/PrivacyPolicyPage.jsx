import React, { useEffect } from 'react';
import { Link, useLoaderData } from 'react-router-dom';
import { usePageMeta } from '@/lib/seo/usePageMeta';
import { getMediaUrl } from '@/lib/media';

export function PrivacyPolicyPage() {
  const loaderData = useLoaderData() || {};
  const company = loaderData.company || {
    name: 'VIR Group',
    email: 'privacy@virgroup.in',
    phone: '+919326287741',
    phoneDisplay: '+91 93262 87741',
  };

  usePageMeta({
    title: 'Privacy Policy | VIR Group Luxury Real Estate',
    description: 'Our comprehensive privacy policy outlines how we collect, protect, and utilize your personal information with transparency and integrity.',
    path: '/privacy-policy',
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
    <div className="legal-page" id="privacy-policy-page">
      {/* ── Hero Banner ── */}
      <section className="legal-hero" data-hero="true" data-theme="basalt" aria-labelledby="privacy-heading">
        <div className="legal-hero-bg" aria-hidden="true">
          <img
            src={getMediaUrl('/media/Contact-Us_Deskto-Slider.jpg')}
            alt=""
            className="legal-hero-img"
          />
          <div className="legal-hero-overlay" />
        </div>

        <div className="legal-hero-inner">
          <h1 id="privacy-heading" className="legal-title">
            Privacy Policy
          </h1>

          <p className="legal-subtitle">
            Your privacy is paramount. This policy outlines how VIR Group collects, protects, and utilizes your personal information with unwavering transparency and integrity.
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
              <span>12 min read</span>
            </div>
            <div className="legal-meta-item">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
              </svg>
              <span>DPDP Act & MahaRERA Compliant</span>
            </div>
            <span className="legal-badge">Official Legal Document</span>
          </div>

          <nav className="legal-crumbs" aria-label="Breadcrumb" style={{ marginTop: '24px', marginBottom: 0 }}>
            <Link to="/">Home</Link>
            <span>/</span>
            <span>Legal</span>
            <span>/</span>
            <span style={{ color: '#e5c38c' }}>Privacy Policy</span>
          </nav>
        </div>
      </section>

      {/* ── Main Full Screen Content Container ── */}
      <div className="legal-container" data-theme="white">
        <main className="legal-content">
          {/* Section 1: Introduction */}
          <section id="intro" className="legal-section" aria-labelledby="sec-intro-title">
            <header className="legal-section-header">
              <h2 id="sec-intro-title" className="legal-section-title">Introduction & Scope</h2>
            </header>
            <p className="legal-lead-text">
              Welcome to VIR Group. We understand that your personal and financial information is sensitive and valuable. This comprehensive Privacy Policy outlines our strict standards for collecting, managing, and securing your information across our website and real estate advisory channels.
            </p>
            <p className="legal-para">
              Our operations adhere strictly to the Digital Personal Data Protection (DPDP) Act of India and relevant real estate regulatory frameworks including MahaRERA. By accessing our platform, inquiring about properties, or scheduling site visits, you consent to the information practices described in this document.
            </p>
          </section>

          {/* Section 2: Information We Collect */}
          <section id="info-collected" className="legal-section" aria-labelledby="sec-info-title">
            <header className="legal-section-header">
              <h2 id="sec-info-title" className="legal-section-title">Information We Collect</h2>
            </header>
            <p className="legal-lead-text">
              We collect information that allows us to deliver personalized, high-touch luxury real estate services:
            </p>

            <div className="legal-grid-3">
              {/* Personal Information */}
              <article className="legal-card">
                <div className="legal-card-icon" aria-hidden="true">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                    <circle cx="12" cy="7" r="4"/>
                  </svg>
                </div>
                <h3 className="legal-card-title">Identity & Contact Data</h3>
                <ul className="legal-list">
                  <li className="legal-list-item">Full legal name and salutation</li>
                  <li className="legal-list-item">Mobile number and country dialing code</li>
                  <li className="legal-list-item">Verified email address</li>
                  <li className="legal-list-item">Mailing address (for physical agreements)</li>
                </ul>
              </article>

              {/* Property Search Data */}
              <article className="legal-card">
                <div className="legal-card-icon" aria-hidden="true">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="11" cy="11" r="8"/>
                    <line x1="21" y1="21" x2="16.65" y2="16.65"/>
                  </svg>
                </div>
                <h3 className="legal-card-title">Property Preferences</h3>
                <ul className="legal-list">
                  <li className="legal-list-item">Configuration interest (1 BHK, 2 BHK, 3 BHK)</li>
                  <li className="legal-list-item">Preferred micro-market & location filters</li>
                  <li className="legal-list-item">Budget spectrum & purchase timelines</li>
                  <li className="legal-list-item">Site visit scheduling preferences</li>
                </ul>
              </article>

              {/* Technical Analytics */}
              <article className="legal-card">
                <div className="legal-card-icon" aria-hidden="true">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="3" width="20" height="14" rx="2" ry="2"/>
                    <line x1="8" y1="21" x2="16" y2="21"/>
                    <line x1="12" y1="17" x2="12" y2="21"/>
                  </svg>
                </div>
                <h3 className="legal-card-title">Technical Metadata</h3>
                <ul className="legal-list">
                  <li className="legal-list-item">IP address and generalized geolocation</li>
                  <li className="legal-list-item">Browser type, device model, and OS</li>
                  <li className="legal-list-item">Referring URL & digital marketing attribution</li>
                  <li className="legal-list-item">Interactive level and floor plan views</li>
                </ul>
              </article>
            </div>
          </section>

          {/* Section 3: How We Use Your Information */}
          <section id="how-we-use" className="legal-section" aria-labelledby="sec-use-title">
            <header className="legal-section-header">
              <h2 id="sec-use-title" className="legal-section-title">How We Use Your Information</h2>
            </header>
            <p className="legal-lead-text">
              We process your data exclusively for legitimate residential real estate purposes and client service excellence.
            </p>

            <div className="legal-grid-2">
              <div className="legal-card">
                <h3 className="legal-card-title">Personalized Property Advisory</h3>
                <p className="legal-card-desc">Matching your specific lifestyle and budget requirements with authentic configurations across projects like Codename Opportunity, Paradise, and Surya Prakash.</p>
              </div>
              <div className="legal-card">
                <h3 className="legal-card-title">Site Visit Coordination</h3>
                <p className="legal-card-desc">Scheduling private site inspections, sample flat tours, and dedicated relationship manager consultations.</p>
              </div>
              <div className="legal-card">
                <h3 className="legal-card-title">Transaction & Documentation Support</h3>
                <p className="legal-card-desc">Preparing booking tokens, allotments, RERA compliance filings, and coordinating with premier home loan partner banks.</p>
              </div>
              <div className="legal-card">
                <h3 className="legal-card-title">Security & Spam Mitigation</h3>
                <p className="legal-card-desc">Protecting our communications infrastructure against automated bot abuse, fraud, and unauthorized inquiries.</p>
              </div>
            </div>
          </section>

          {/* Section 4: Sharing & Disclosure */}
          <section id="sharing" className="legal-section" aria-labelledby="sec-sharing-title">
            <header className="legal-section-header">
              <h2 id="sec-sharing-title" className="legal-section-title">Sharing & Third-Party Disclosures</h2>
            </header>
            <p className="legal-lead-text">
              VIR Group does <strong>never sell, rent, or trade</strong> your personal contact information to third-party marketing brokers. Disclosures occur solely in the following controlled circumstances:
            </p>

            <div className="legal-grid-2">
              <div className="legal-card">
                <h3 className="legal-card-title">Authorized Sales & Advisory Executives</h3>
                <p className="legal-card-desc">Direct in-house sales managers and dedicated project advisors assigned to guide your property enquiry.</p>
              </div>
              <div className="legal-card">
                <h3 className="legal-card-title">Financial & Banking Partners</h3>
                <p className="legal-card-desc">Empaneled nationalized and private banking institutions (SBI, HDFC, ICICI) solely upon your explicit request for home loan pre-approvals.</p>
              </div>
              <div className="legal-card">
                <h3 className="legal-card-title">Statutory & Regulatory Authorities</h3>
                <p className="legal-card-desc">MahaRERA, judicial bodies, or law enforcement agencies when mandated by binding Indian statutes or court directives.</p>
              </div>
              <div className="legal-card">
                <h3 className="legal-card-title">Cloud Infrastructure & Security Vendors</h3>
                <p className="legal-card-desc">Encrypted cloud hosting and enterprise email delivery networks under strict contractual non-disclosure agreements.</p>
              </div>
            </div>
          </section>

          {/* Section 5: Data Security */}
          <section id="security" className="legal-section" aria-labelledby="sec-security-title">
            <header className="legal-section-header">
              <h2 id="sec-security-title" className="legal-section-title">Data Security & Infrastructure</h2>
            </header>
            <p className="legal-lead-text">
              We employ enterprise-grade defensive protocols to ensure that all customer records remain shielded against unauthorized access, tampering, or loss.
            </p>

            <div className="legal-security-box">
              <div className="legal-security-item">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                  <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                </svg>
                <span><strong>256-Bit SSL/TLS Encryption:</strong> All data transmitted between your browser and our servers is secured with advanced HTTPS encryption.</span>
              </div>
              <div className="legal-security-item">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                </svg>
                <span><strong>Role-Based Access Isolation:</strong> Only certified personnel with verified business needs have clearance to access customer enquiry databases.</span>
              </div>
              <div className="legal-security-item">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
                </svg>
                <span><strong>Automated Audits & Firewalls:</strong> Continuous monitoring, bot protection, and server-side validation against injection or scraping attempts.</span>
              </div>
            </div>
          </section>

          {/* Section 6: Your Privacy Rights */}
          <section id="rights" className="legal-section" aria-labelledby="sec-rights-title">
            <header className="legal-section-header">
              <h2 id="sec-rights-title" className="legal-section-title">Your Rights & Choices</h2>
            </header>
            <p className="legal-lead-text">
              Under applicable Indian privacy regulations, you retain substantial rights concerning your personal information:
            </p>

            <div className="legal-grid-2">
              <div className="legal-card">
                <h3 className="legal-card-title">Right to Access & Review</h3>
                <p className="legal-card-desc">You may request a copy of the personal details, booking records, and communication notes we maintain in your profile.</p>
              </div>
              <div className="legal-card">
                <h3 className="legal-card-title">Right to Rectification</h3>
                <p className="legal-card-desc">Request immediate corrections if your phone number, email address, or registered spelling contains discrepancies.</p>
              </div>
              <div className="legal-card">
                <h3 className="legal-card-title">Right to Opt-Out</h3>
                <p className="legal-card-desc">Unsubscribe from project update SMS, WhatsApp broadcasts, or promotional emails at any point via opt-out links or verbal request.</p>
              </div>
              <div className="legal-card">
                <h3 className="legal-card-title">Right to Erasure (Forget Me)</h3>
                <p className="legal-card-desc">Request complete purging of your prospective enquiry data once property research has concluded, subject to statutory tax and RERA retention mandates.</p>
              </div>
            </div>
          </section>

          {/* Section 7: Cookies & Tracking */}
          <section id="cookies" className="legal-section" aria-labelledby="sec-cookies-title">
            <header className="legal-section-header">
              <h2 id="sec-cookies-title" className="legal-section-title">Cookies & Digital Analytics</h2>
            </header>
            <p className="legal-lead-text">
              We employ essential, functional, and performance cookies to provide a smooth browsing experience across our interactive floor plans and project tours.
            </p>

            <div className="legal-grid-3">
              <div className="legal-card">
                <h3 className="legal-card-title">Essential Cookies</h3>
                <p className="legal-card-desc">Required for fundamental security, session state, and form submissions.</p>
              </div>
              <div className="legal-card">
                <h3 className="legal-card-title">Performance & Analytics</h3>
                <p className="legal-card-desc">Anonymous telemetry measuring page render speeds, interactive floor plan usage, and popular unit views.</p>
              </div>
              <div className="legal-card">
                <h3 className="legal-card-title">Marketing Attribution</h3>
                <p className="legal-card-desc">Attribution tags measuring whether visitors arrived via search, Google Ads, or direct referral.</p>
              </div>
            </div>
          </section>

          {/* Section 8: Get in Touch */}
          <section id="contact" className="legal-section" aria-labelledby="sec-contact-title">
            <header className="legal-section-header">
              <h2 id="sec-contact-title" className="legal-section-title">Grievance Officer & Legal Contact</h2>
            </header>
            <p className="legal-lead-text">
              If you have any questions, wish to exercise privacy rights, or need clarification regarding data practices, our legal grievance cell is ready to assist:
            </p>

            <div className="legal-contact-grid">
              <div className="legal-contact-card">
                <span className="legal-contact-card-label">Direct Legal Email</span>
                <p className="legal-contact-card-val">
                  <a href={`mailto:${company.email || 'privacy@virgroup.in'}`}>
                    {company.email || 'privacy@virgroup.in'}
                  </a>
                </p>
              </div>
              <div className="legal-contact-card">
                <span className="legal-contact-card-label">Official Advisory Desk</span>
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
