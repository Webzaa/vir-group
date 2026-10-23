import React, { useState, useMemo, useId, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { usePageMeta } from '@/lib/seo/usePageMeta';
import { RevealController } from '@/components/animation/RevealController';
import { getMediaUrl } from '@/lib/media';

// --- FAQ DATA ---
const CATEGORIES = [
  { key: 'all', name: 'All Questions', icon: 'grid' },
  { key: 'buying', name: 'Buying Process', icon: 'house' },
  { key: 'financing', name: 'Financing', icon: 'wallet' },
  { key: 'documentation', name: 'Documentation', icon: 'file' },
  { key: 'amenities', name: 'Amenities', icon: 'stars' },
  { key: 'general', name: 'General', icon: 'info' },
];

const FAQ_DATA = [
  {
    id: 1,
    num: '01',
    category: 'buying',
    categoryName: 'Buying Process',
    question: 'What is the process of buying a property with VIR Group?',
    answer:
      'Our buying process is simple and transparent. First, visit our site or contact our sales team. Choose your preferred property, book it with a token amount, complete documentation, and sign the agreement. Our team guides you through every step.',
  },
  {
    id: 2,
    num: '02',
    category: 'buying',
    categoryName: 'Buying Process',
    question: 'Can I customize my apartment before possession?',
    answer:
      'Yes, we offer customization options during the construction phase. You can choose from various flooring, kitchen fittings, and paint options. Our design team will help you create your dream home within the available options.',
  },
  {
    id: 3,
    num: '03',
    category: 'financing',
    categoryName: 'Financing',
    question: 'Do you provide home loan assistance?',
    answer:
      'Yes, we have tie-ups with leading banks and financial institutions. Our dedicated loan assistance team helps you get the best interest rates and smooth loan approval process.',
  },
  {
    id: 4,
    num: '04',
    category: 'financing',
    categoryName: 'Financing',
    question: 'What are the payment plan options available?',
    answer:
      'We offer flexible payment plans including construction-linked, possession-linked, and down payment schemes. Our sales team can create a customized payment schedule based on your financial convenience.',
  },
  {
    id: 5,
    num: '05',
    category: 'financing',
    categoryName: 'Financing',
    question: 'Are there any hidden charges?',
    answer:
      'No, VIR Group believes in complete transparency. All charges including GST, registration, parking, and maintenance deposits are clearly mentioned in the agreement. There are no hidden costs.',
  },
  {
    id: 6,
    num: '06',
    category: 'documentation',
    categoryName: 'Documentation',
    question: 'What documents are required for booking?',
    answer:
      "You'll need PAN card, Aadhaar card, address proof, passport-size photographs, and cheque/payment receipt. For home loan applicants, additional documents like income proof and bank statements are required.",
  },
  {
    id: 7,
    num: '07',
    category: 'documentation',
    categoryName: 'Documentation',
    question: 'Is the property RERA approved?',
    answer:
      'Yes, all our projects are RERA registered. You can verify the RERA registration number on our project details page and the official RERA website.',
  },
  {
    id: 8,
    num: '08',
    category: 'documentation',
    categoryName: 'Documentation',
    question: 'When will I receive the possession letter?',
    answer:
      "Possession is handed over as per the timeline mentioned in the agreement. You'll receive a possession letter 30-45 days before the actual possession date with complete details.",
  },
  {
    id: 9,
    num: '09',
    category: 'amenities',
    categoryName: 'Amenities',
    question: 'What amenities are included in VIR Group projects?',
    answer:
      "Our projects include modern amenities like gym, swimming pool, clubhouse, children's play area, landscaped gardens, 24/7 security, power backup, and covered parking. Specific amenities vary by project.",
  },
  {
    id: 10,
    num: '10',
    category: 'amenities',
    categoryName: 'Amenities',
    question: 'Is parking space included in the flat price?',
    answer:
      'One parking space is typically included. Additional parking spaces can be purchased separately. The details are mentioned in your booking agreement.',
  },
  {
    id: 11,
    num: '11',
    category: 'general',
    categoryName: 'General',
    question: 'Can I visit the site before booking?',
    answer:
      'Absolutely! We encourage site visits. Our sales team conducts guided site tours daily. You can schedule a visit by calling us or filling the form on our website.',
  },
  {
    id: 12,
    num: '12',
    category: 'general',
    categoryName: 'General',
    question: 'What is the maintenance charge structure?',
    answer:
      'Maintenance charges are calculated per square foot and cover common area maintenance, security, staff salaries, and utilities. The exact amount is shared before possession and collected monthly or quarterly.',
  },
  {
    id: 13,
    num: '13',
    category: 'general',
    categoryName: 'General',
    question: 'What is your cancellation and refund policy?',
    answer:
      'Our cancellation policy is as per RERA guidelines. In case of cancellation, the refund is processed within 45-60 days after deducting applicable charges as mentioned in the agreement.',
  },
  {
    id: 14,
    num: '14',
    category: 'buying',
    categoryName: 'Buying Process',
    question: 'How long does it take to complete the purchase?',
    answer:
      'From booking to possession, the timeline varies by project. Under-construction properties typically take 24-36 months, while ready-to-move properties can be possessed within 3-6 months after documentation.',
  },
  {
    id: 15,
    num: '15',
    category: 'financing',
    categoryName: 'Financing',
    question: 'What is the minimum down payment required?',
    answer:
      "The minimum down payment is typically 10-20% of the property value. The exact percentage depends on the payment plan you choose and the project you're interested in.",
  },
];

// Helper icon component
function CategoryIcon({ type }) {
  switch (type) {
    case 'house':
      return (
        <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
          <polyline points="9 22 9 12 15 12 15 22" />
        </svg>
      );
    case 'wallet':
      return (
        <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M19 7V4a1 1 0 0 0-1-1H5a2 2 0 0 0 0 4h15a1 1 0 0 1 1 1v4h-3a2 2 0 0 0 0 4h3a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1" />
          <path d="M3 5v14a2 2 0 0 0 2 2h15a1 1 0 0 0 1-1v-4" />
        </svg>
      );
    case 'file':
      return (
        <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
          <polyline points="14 2 14 8 20 8" />
          <line x1="16" y1="13" x2="8" y2="13" />
          <line x1="16" y1="17" x2="8" y2="17" />
          <line x1="10" y1="9" x2="8" y2="9" />
        </svg>
      );
    case 'stars':
      return (
        <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="m12 3-1.9 5.8a2 2 0 0 1-1.3 1.3L3 12l5.8 1.9a2 2 0 0 1 1.3 1.3L12 21l1.9-5.8a2 2 0 0 1 1.3-1.3L21 12l-5.8-1.9a2 2 0 0 1-1.3-1.3Z" />
        </svg>
      );
    case 'info':
      return (
        <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <line x1="12" y1="16" x2="12" y2="12" />
          <line x1="12" y1="8" x2="12.01" y2="8" />
        </svg>
      );
    case 'grid':
    default:
      return (
        <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect width="7" height="7" x="3" y="3" rx="1" />
          <rect width="7" height="7" x="14" y="3" rx="1" />
          <rect width="7" height="7" x="14" y="14" rx="1" />
          <rect width="7" height="7" x="3" y="14" rx="1" />
        </svg>
      );
  }
}

export function FAQs() {
  usePageMeta({
    title: 'Help Center & FAQs | VIR Group Mumbai',
    description: 'Find answers to common questions about buying property, home loans, RERA compliance, documentation, and amenities with VIR Group.',
    path: '/faq',
  });

  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [openItems, setOpenItems] = useState({ 1: true }); // First question open by default

  const faqContentRef = React.useRef(null);
  const searchInputId = useId();

  // Category counts
  const categoryCounts = useMemo(() => {
    const counts = { all: FAQ_DATA.length };
    CATEGORIES.forEach((cat) => {
      if (cat.key !== 'all') {
        counts[cat.key] = FAQ_DATA.filter((item) => item.category === cat.key).length;
      }
    });
    return counts;
  }, []);

  // Filtered FAQs
  const filteredFAQs = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return FAQ_DATA.filter((item) => {
      const matchesCategory = activeCategory === 'all' || item.category === activeCategory;
      const matchesSearch =
        !q ||
        item.question.toLowerCase().includes(q) ||
        item.answer.toLowerCase().includes(q);
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  // Accordion: only one answer open at a time (opening one closes the other)
  const toggleItem = (id) => {
    setOpenItems((prev) => (prev[id] ? {} : { [id]: true }));
  };

  // Mobile category dropdown
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    if (!dropdownOpen) return undefined;
    const onDocPointer = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) setDropdownOpen(false);
    };
    const onKey = (e) => {
      if (e.key === 'Escape') setDropdownOpen(false);
    };
    document.addEventListener('pointerdown', onDocPointer);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('pointerdown', onDocPointer);
      document.removeEventListener('keydown', onKey);
    };
  }, [dropdownOpen]);

  const activeCategoryObj = CATEGORIES.find((c) => c.key === activeCategory) || CATEGORIES[0];

  const handleCategorySelect = (catKey) => {
    // Align scroll to top of FAQ section first if user has scrolled down, preventing browser clamping to bottom
    const mainSection = document.querySelector('.faq-main') || faqContentRef.current;
    if (mainSection) {
      const navbarHeight = 85;
      const sectionTop = mainSection.getBoundingClientRect().top + window.scrollY - navbarHeight;
      if (window.scrollY > sectionTop) {
        window.scrollTo(0, Math.max(0, sectionTop));
      }
    }

    setActiveCategory(catKey);

    // Auto-open first item of selected category
    const firstItem = FAQ_DATA.find((item) => catKey === 'all' || item.category === catKey);
    if (firstItem) {
      setOpenItems({ [firstItem.id]: true });
    }
  };

  const handleReset = () => {
    const mainSection = document.querySelector('.faq-main') || faqContentRef.current;
    if (mainSection) {
      const navbarHeight = 85;
      const sectionTop = mainSection.getBoundingClientRect().top + window.scrollY - navbarHeight;
      if (window.scrollY > sectionTop) {
        window.scrollTo(0, Math.max(0, sectionTop));
      }
    }
    setSearchQuery('');
    setActiveCategory('all');
    setOpenItems({ 1: true });
  };

  const currentHeading = useMemo(() => {
    if (searchQuery.trim()) return 'Search Results.';
    if (activeCategory === 'all') return 'Everything, Answered.';
    const cat = CATEGORIES.find((c) => c.key === activeCategory);
    return cat ? `${cat.name}.` : 'Everything, Answered.';
  }, [searchQuery, activeCategory]);

  return (
    <div className="faq-page-wrapper">
      {/* ── 1. HERO SECTION ── */}
      <header className="faq-hero" id="home" data-theme="basalt" data-hero="true">
        <div className="faq-hero-bg">
          <img
            src={getMediaUrl('/media/Contact-Us_Deskto-Slider.jpg')}
            alt="VIR Group FAQs Help Center"
            className="faq-hero-img"
          />
          <div className="faq-hero-overlay" />
        </div>
        <div className="wrap" style={{ position: 'relative', zIndex: 2 }}>
          <div className="hero-content">
            <div className="section-label hero-label">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ display: 'inline-block' }}>
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
              </svg>
              HELP CENTER
            </div>

            <h1 className="serif">
              Frequently Asked<br />
              <span>Questions.</span>
            </h1>

            <p className="hero-description">
              Find answers to common questions about buying property with VIR Group
            </p>

            <div className="faq-search-wrap">
              <form className="faq-search" role="search" onSubmit={(e) => e.preventDefault()}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--gold, #c7a56b)" strokeWidth="2.2">
                  <circle cx="11" cy="11" r="8" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>

                <input id={searchInputId} type="search" placeholder="Search for answers..." aria-label="Search frequently asked questions" autoComplete="off" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />

                {searchQuery && (
                  <button type="button" className="search-clear visible" onClick={() => setSearchQuery('')} aria-label="Clear search">
                    ✕
                  </button>
                )}
              </form>
            </div>
          </div>
          <p className="crumbs" style={{ marginTop: '32px', marginBottom: 0 }}>
            <Link to="/">Home</Link>
            <span>/</span>
            <span>FAQs</span>
          </p>
        </div>
      </header>

      {/* ── 2. FAQ MAIN LAYOUT ── */}
      <main className="faq-main">
        <div className="wrap">
          <div className="faq-layout">
            {/* Left Sidebar Categories */}
            <aside className="faq-sidebar">
              <h3 className="sidebar-heading">Browse by category</h3>

              {/* Mobile / tablet: categories as a dropdown */}
              <div className={`faq-cat-dropdown ${dropdownOpen ? 'is-open' : ''}`} ref={dropdownRef}>
                <button
                  type="button"
                  className="faq-cat-trigger"
                  onClick={() => setDropdownOpen((v) => !v)}
                  aria-haspopup="listbox"
                  aria-expanded={dropdownOpen}
                >
                  <span className="category-name">
                    <CategoryIcon type={activeCategoryObj.icon} />
                    {activeCategoryObj.name}
                  </span>
                  <span className="faq-cat-trigger-right">
                    <span className="category-count">{categoryCounts[activeCategoryObj.key] || 0}</span>
                    <svg className="faq-cat-caret" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
                      <polyline points="6 9 12 15 18 9" />
                    </svg>
                  </span>
                </button>

                {dropdownOpen && (
                  <ul className="faq-cat-menu" role="listbox" aria-label="Browse by category">
                    {CATEGORIES.map((cat) => {
                      const isActive = activeCategory === cat.key;
                      return (
                        <li key={cat.key} role="option" aria-selected={isActive}>
                          <button
                            type="button"
                            className={`faq-cat-option ${isActive ? 'active' : ''}`}
                            onClick={() => {
                              handleCategorySelect(cat.key);
                              setDropdownOpen(false);
                            }}
                          >
                            <span className="category-name">
                              <CategoryIcon type={cat.icon} />
                              {cat.name}
                            </span>
                            <span className="category-count">{categoryCounts[cat.key] || 0}</span>
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                )}
              </div>

              <div className="category-list" id="categoryList">
                {CATEGORIES.map((cat) => {
                  const isActive = activeCategory === cat.key;
                  const count = categoryCounts[cat.key] || 0;
                  return (
                    <button
                      key={cat.key}
                      className={`category-btn ${isActive ? 'active' : ''}`}
                      type="button"
                      onClick={() => handleCategorySelect(cat.key)}
                      aria-pressed={isActive}
                    >
                      <span className="category-name">
                        <CategoryIcon type={cat.icon} />
                        {cat.name}
                      </span>
                      <span className="category-count">{count}</span>
                    </button>
                  );
                })}
              </div>

              {/* Sidebar Assistance Card */}
              <div className="sidebar-card">
                <div className="sidebar-card-icon">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M3 18v-6a9 9 0 0 1 18 0v6" />
                    <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z" />
                  </svg>
                </div>
                <h4>Need personal assistance?</h4>
                <p>
                  Our property specialists are ready to help you make the right decision.
                </p>
                <a href="#contact">
                  Talk to our team
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </a>
              </div>
            </aside>

            {/* Right Accordion Content */}
            <section className="faq-content" ref={faqContentRef} aria-label="Frequently asked questions">
              <div className="faq-content-header">
                <div>
                  <div className="section-label">KNOW MORE</div>
                  <h2 className="serif" id="faqHeading">
                    {currentHeading}
                  </h2>
                </div>

                <div className="faq-count" aria-live="polite">
                  Showing <strong>{filteredFAQs.length}</strong> of{' '}
                  <strong>{FAQ_DATA.length}</strong> questions
                </div>
              </div>

              {/* Accordion Items */}
              {filteredFAQs.length > 0 ? (
                <div className="faq-accordion" id="faqAccordion">
                  {filteredFAQs.map((faq) => {
                    const isOpen = !!openItems[faq.id];
                    return (
                      <article
                        key={faq.id}
                        className={`faq-item ${isOpen ? 'open' : ''}`}
                      >
                        <button
                          className="faq-question"
                          type="button"
                          onClick={() => toggleItem(faq.id)}
                          aria-expanded={isOpen}
                          aria-controls={`answer-${faq.id}`}
                        >
                          <span className="faq-number">{faq.num}</span>
                          <span className="faq-question-text">{faq.question}</span>
                          <span className="faq-chevron">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                              <polyline points="6 9 12 15 18 9" />
                            </svg>
                          </span>
                        </button>

                        <div
                          className="faq-answer"
                          id={`answer-${faq.id}`}
                          role="region"
                          aria-labelledby={`question-${faq.id}`}
                        >
                          <div className="faq-answer-inner">
                            <div className="faq-answer-text">
                              <span className="faq-category-tag">{faq.categoryName}</span>
                              <p style={{ margin: 0 }}>{faq.answer}</p>
                            </div>
                          </div>
                        </div>
                      </article>
                    );
                  })}
                </div>
              ) : (
                /* No Results Found State */
                <div className="no-results visible" role="status">
                  <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="var(--gold, #c7a56b)" strokeWidth="2" style={{ margin: '0 auto 16px', display: 'block' }}>
                    <circle cx="11" cy="11" r="8" />
                    <line x1="21" y1="21" x2="16.65" y2="16.65" />
                  </svg>
                  <h3>No answers found</h3>
                  <p>Try another keyword or explore a different category.</p>
                  <button
                    type="button"
                    className="reset-search"
                    onClick={handleReset}
                  >
                    <span>VIEW ALL QUESTIONS</span>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" style={{ marginLeft: 8 }}>
                      <line x1="5" y1="12" x2="19" y2="12" />
                      <polyline points="12 5 19 12 12 19" />
                    </svg>
                  </button>
                </div>
              )}
            </section>
          </div>
        </div>
      </main>

      {/* ── 3. STILL HAVE QUESTIONS? (CONTACT SECTION) ── */}
      {/* ── 3. STILL HAVE QUESTIONS? (CONTACT SECTION) ── */}
<section
  id="contact"
  style={{
    padding: '80px 20px 90px',
    background: '#eef0f3',
    fontFamily: "'Montserrat', 'Inter', system-ui, sans-serif",
  }}
>
  <div style={{ maxWidth: 1120, margin: '0 auto' }}>
    {/* Heading */}
    <div style={{ textAlign: 'center', marginBottom: 48 }}>
      <div style={{ display: 'flex', justifyContent: 'center', fontSize: 11, fontWeight: 600, letterSpacing: '0.22em', color: '#1c3f79', marginBottom: 14 }}>
        WE ARE HERE FOR YOU
      </div>
      <h2 style={{ margin: '0 0 12px', fontFamily: "'Playfair Display', Georgia, serif", fontSize: 'clamp(32px, 5vw, 46px)', fontWeight: 600, color: '#0f1b3d' }}>
        Still Have <span style={{ color: '#1c3f79' }}>Questions?</span>
      </h2>
      <p style={{ margin: 0, fontSize: 15, color: '#5b6478' }}>
        Our team is here to help. Reach out to us directly.
      </p>
    </div>

    {/* Cards */}
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 24, alignItems: 'stretch' }}>

      {/* ── CALL ── */}
      <div style={{ position: 'relative', overflow: 'hidden', padding: '28px 28px 26px', borderRadius: 18, background: 'linear-gradient(160deg, rgba(255,255,255,.97), rgba(246,249,255,.92))', border: '1px solid rgba(255,255,255,.9)', boxShadow: '0 12px 32px rgba(40,70,130,.10)' }}>
        <div style={{ position: 'absolute', top: 14, right: 12, pointerEvents: 'none' }}>
          <svg width="86" height="96" viewBox="0 0 24 24" fill="#dbe6f7" stroke="#cfdcf2" strokeWidth="0.4" style={{ filter: 'drop-shadow(0 8px 10px rgba(60,100,180,.15))' }}>
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
          </svg>
        </div>

        <div style={{ width: 52, height: 52, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#fff', boxShadow: '0 0 0 9px rgba(28,63,121,.06), 0 6px 14px rgba(40,70,130,.12)', marginBottom: 22 }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1c3f79" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
          </svg>
        </div>

        <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: '0.2em', color: '#5b6478', marginBottom: 8 }}>GIVE US A CALL</div>
        <h3 style={{ margin: '0 0 8px', fontFamily: "'Playfair Display', Georgia, serif", fontSize: 30, fontWeight: 600, lineHeight: 1.1, color: '#0f1b3d' }}>Call Us</h3>
        <p style={{ margin: '0 0 14px', fontSize: 13, lineHeight: 1.5, color: '#5b6478', maxWidth: 200 }}>Speak directly with our team for quick assistance.</p>
        <div style={{ fontSize: 14, fontWeight: 700, color: '#1c3f79', marginBottom: 20 }}>+91 93262 87741</div>

        <a href="tel:+919326287741" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', height: 44, borderRadius: 999, textDecoration: 'none', fontSize: 13, fontWeight: 700, color: '#0f1b3d', background: 'rgba(255,255,255,.85)', border: '1px solid #c9d4e8' }}>
          <span>Call Now</span>
          <span style={{ position: 'absolute', right: 5, top: 5, width: 34, height: 34, borderRadius: '50%', background: '#e6ecf6', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#1c3f79" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg>
          </span>
        </a>
      </div>

      {/* ── EMAIL (featured) ── */}
      <div style={{ position: 'relative', overflow: 'hidden', padding: '28px 28px 26px', borderRadius: 18, background: 'linear-gradient(160deg, rgba(230,236,246,.97), rgba(214,224,241,.9))', border: '1px solid #b7c6e0', boxShadow: '0 18px 40px rgba(28,63,121,.16), 0 0 0 5px rgba(28,63,121,.05)' }}>
        <div style={{ position: 'absolute', top: 14, right: 12, pointerEvents: 'none' }}>
          <svg width="120" height="100" viewBox="0 0 120 100" style={{ filter: 'drop-shadow(0 10px 14px rgba(40,90,200,.22))' }}>
            <defs>
              <linearGradient id="envBody" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#d6e6ff" /><stop offset="1" stopColor="#a9c8f7" /></linearGradient>
              <linearGradient id="envFlap" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#f2f7ff" /><stop offset="1" stopColor="#bcd6fa" /></linearGradient>
            </defs>
            <polygon points="8,30 70,6 112,48 60,92 14,70" fill="url(#envBody)" opacity=".9" />
            <polygon points="8,30 70,6 112,48 62,60" fill="url(#envFlap)" opacity=".95" />
          </svg>
        </div>

        <div style={{ width: 52, height: 52, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#1c3f79', boxShadow: '0 0 0 9px rgba(28,63,121,.10), 0 8px 18px rgba(28,63,121,.35)', marginBottom: 22 }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect width="20" height="16" x="2" y="4" rx="2" />
            <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
          </svg>
        </div>

        <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: '0.2em', color: '#5b6478', marginBottom: 8 }}>WRITE TO US</div>
        <h3 style={{ margin: '0 0 8px', fontFamily: "'Playfair Display', Georgia, serif", fontSize: 30, fontWeight: 600, lineHeight: 1.1, color: '#0f1b3d' }}>Email Us</h3>
        <p style={{ margin: '0 0 14px', fontSize: 13, lineHeight: 1.5, color: '#5b6478', maxWidth: 200 }}>Drop us an email and we'll get back to you soon.</p>
        <div style={{ fontSize: 14, fontWeight: 700, color: '#1c3f79', marginBottom: 20, wordBreak: 'break-all' }}>virgroupmumbai@gmail.com</div>

        <a href="mailto:virgroupmumbai@gmail.com" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', height: 44, borderRadius: 999, textDecoration: 'none', fontSize: 13, fontWeight: 700, color: '#fff', background: 'linear-gradient(90deg, #1c3f79, #2a5398)', boxShadow: '0 10px 22px rgba(28,63,121,.35)' }}>
          <span>Send an Email</span>
          <span style={{ position: 'absolute', right: 5, top: 5, width: 34, height: 34, borderRadius: '50%', background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#1c3f79" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg>
          </span>
        </a>
      </div>

      {/* ── LIVE CHAT ── */}
      <div style={{ position: 'relative', overflow: 'hidden', padding: '28px 28px 26px', borderRadius: 18, background: 'linear-gradient(160deg, rgba(255,255,255,.97), rgba(246,249,255,.92))', border: '1px solid rgba(255,255,255,.9)', boxShadow: '0 12px 32px rgba(40,70,130,.10)' }}>
        <div style={{ position: 'absolute', top: 14, right: 12, pointerEvents: 'none' }}>
          <svg width="100" height="100" viewBox="0 0 100 100" style={{ filter: 'drop-shadow(0 8px 12px rgba(60,100,180,.15))' }}>
            <path d="M50 8a38 38 0 1 1-18 71l-20 6 6-19A38 38 0 0 1 50 8z" fill="#e4edfb" stroke="#d3e0f6" strokeWidth="1.5" />
            <path d="M38 34c-3 0-6 3-5 8 2 9 12 19 22 21 5 1 8-2 8-5l-6-4-4 3c-5-2-9-6-11-11l3-4-4-8z" fill="#c9daf5" />
          </svg>
        </div>

        <div style={{ width: 52, height: 52, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#fff', boxShadow: '0 0 0 9px rgba(28,63,121,.06), 0 6px 14px rgba(40,70,130,.12)', marginBottom: 22 }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1c3f79" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" />
          </svg>
        </div>

        <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: '0.2em', color: '#5b6478', marginBottom: 8 }}>LET'S TALK</div>
        <h3 style={{ margin: '0 0 8px', fontFamily: "'Playfair Display', Georgia, serif", fontSize: 30, fontWeight: 600, lineHeight: 1.1, color: '#0f1b3d' }}>Live Chat</h3>
        <p style={{ margin: '0 0 14px', fontSize: 13, lineHeight: 1.5, color: '#5b6478', maxWidth: 200 }}>Chat with our team on WhatsApp for instant support.</p>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: '#0f1b3d', marginBottom: 20 }}>
          <span style={{ width: 9, height: 9, borderRadius: '50%', background: '#1c3f79', display: 'inline-block' }} />
          Available 9 AM - 7 PM
        </div>

        <a href="https://wa.me/919326287741" target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', height: 44, borderRadius: 999, textDecoration: 'none', fontSize: 13, fontWeight: 700, color: '#1c3f79', background: 'rgba(255,255,255,.85)', border: '1px solid #c9d4e8' }}>
          <span>Chat on WhatsApp</span>
          <span style={{ position: 'absolute', right: 5, top: 5, width: 34, height: 34, borderRadius: '50%', background: '#e6ecf6', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#1c3f79" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg>
          </span>
        </a>
      </div>

    </div>
  </div>
</section>
      <RevealController />
    </div>
  );
}

export default FAQs;