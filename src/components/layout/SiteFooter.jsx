import { useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ScrollTrigger } from '@/lib/animations/gsap';
import { getMediaUrl } from '@/lib/media';

export function SiteFooter({ company }) {
  const containerRef = useRef(null);
  const footerRef = useRef(null);
  const { pathname } = useLocation();

  useEffect(() => {
    const container = containerRef.current;
    const footer = footerRef.current;
    if (!container || !footer) return;

    const isDesktop = () => window.innerWidth >= 1024;

    const updateHeight = () => {
      if (!isDesktop()) {
        if (container.style.height) container.style.height = '';
        if (footer.style.pointerEvents !== 'auto') footer.style.pointerEvents = 'auto';
        return;
      }
      const h = footer.offsetHeight;
      if (h > 0 && container.style.height !== `${h}px`) {
        container.style.height = `${h}px`;
      }
    };

    const updateVisibility = () => {
      if (!footer) return;
      if (!isDesktop()) {
        footer.style.pointerEvents = 'auto';
        return;
      }
      if (!container) return;
      const rect = container.getBoundingClientRect();
      // Container is visible in viewport or above bottom of viewport
      const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
      footer.style.pointerEvents = isVisible ? 'auto' : 'none';
    };

    updateHeight();
    updateVisibility();

    // IntersectionObserver for native viewport visibility tracking
    let io;
    if (typeof IntersectionObserver !== 'undefined') {
      io = new IntersectionObserver(
        (entries) => {
          const entry = entries[0];
          if (entry && footer) {
            if (!isDesktop()) {
              footer.style.pointerEvents = 'auto';
            } else {
              footer.style.pointerEvents = entry.isIntersecting ? 'auto' : 'none';
            }
          }
        },
        { root: null, rootMargin: '0px', threshold: 0 }
      );
      io.observe(container);
    }

    const ro = new ResizeObserver(() => {
      updateHeight();
      updateVisibility();
    });
    ro.observe(footer);

    const onScroll = () => {
      updateVisibility();
    };

    const onResize = () => {
      updateHeight();
      updateVisibility();
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onResize);

    // Delay a tick after client-side route transition to ensure DOM settled
    const timer = setTimeout(() => {
      updateHeight();
      updateVisibility();
      ScrollTrigger.refresh();
    }, 100);

    return () => {
      clearTimeout(timer);
      io?.disconnect();
      ro.disconnect();
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
    };
  }, [pathname]);

  return (
    <div ref={containerRef} className="footer-reveal-container">
      <footer ref={footerRef} className="vir-footer vir-footer--fixed" id="site-footer">
      {/* ── Main Footer Content ── */}
      <div className="vir-footer-main">
        <div className="vir-footer-grid">
          {/* Column 1: Brand / Logo */}
          <div className="vir-footer-brand">
            <Link to="/" className="vir-footer-logo-link" aria-label="VIR Group home">
              <img
                src={getMediaUrl('/media/logo.avif')}
                alt="VIR Group"
                className="vir-footer-logo"
                width={160}
                height={90}
                loading="lazy"
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = getMediaUrl('/media/logo.png');
                }}
              />
            </Link>
            <p className="vir-footer-tagline">
              Since {company.founded} Building Legacy,
              <br />
              Creating Homes
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <nav className="vir-footer-col" aria-label="Quick links">
            <h3 className="vir-footer-heading">QUICK LINKS</h3>
            <ul className="vir-footer-links">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/about">About us</Link></li>
              <li><Link to="/team">Our Team</Link></li>
              <li><Link to="/careers">Careers</Link></li>
              <li><Link to="/blog">Blog</Link></li>
              <li><Link to="/faq">FAQs</Link></li>
              {/* <li><Link to="/privacy-policy">Privacy Policy</Link></li> */}
              {/* <li><Link to="/terms-and-conditions">Terms & Conditions</Link></li> */}
            </ul>
          </nav>

          {/* Column 3: Our Projects */}
          <nav className="vir-footer-col" aria-label="Our projects">
            <h3 className="vir-footer-heading">OUR PROJECTS</h3>
            <ul className="vir-footer-links">
              <li><Link to="/projects">All Projects</Link></li>
              <li><Link to="/projects?type=residential">Residential</Link></li>
              <li><Link to="/projects?type=commercial">Commercial</Link></li>
              <li><Link to="/projects?status=upcoming">Upcoming</Link></li>
            </ul>
          </nav>

          {/* Column 4: Contact Us */}
          <div className="vir-footer-col vir-footer-contact">
            <h3 className="vir-footer-heading">CONTACT US</h3>
            <ul className="vir-footer-contact-list">
              <li>
                <span className="vir-footer-icon" aria-hidden="true">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                  </svg>
                </span>
                <a href={`tel:${company.phone}`} data-event="phone_click">
                  {company.phoneDisplay}
                </a>
              </li>
              <li>
                <span className="vir-footer-icon" aria-hidden="true">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="4" width="20" height="16" rx="2"/>
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
                  </svg>
                </span>
                <a href={`mailto:${company.email}`}>
                  {company.email}
                </a>
              </li>
              <li className="vir-footer-address-row">
                <span className="vir-footer-icon" aria-hidden="true">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/>
                    <circle cx="12" cy="10" r="3"/>
                  </svg>
                </span>
                <address>
                  B-605, EXPRESS ZONE, 
                  Western Express Hwy,<br />
                  near Oberoi Mall, Malad East,
                  Mumbai, Maharashtra - 400063
                </address>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* ── Bottom Bar ── */}
      <div className="vir-footer-bottom">
        <div className="vir-footer-bottom-inner">
          {/* Left Side: Social Icons & Copyright */}
          <div className="vir-footer-bottom-left">
            {/* Social Icons */}
            <div className="vir-footer-socials">
              {/* Facebook */}
              <a
                href={company.social.find(s => s.label === 'Facebook')?.href || '#'}
                target="_blank"
                rel="noopener noreferrer"
                className="vir-footer-social-icon"
                aria-label="Facebook"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"/>
                </svg>
              </a>
              {/* Instagram */}
              <a
                href={company.social.find(s => s.label === 'Instagram')?.href || '#'}
                target="_blank"
                rel="noopener noreferrer"
                className="vir-footer-social-icon"
                aria-label="Instagram"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
                </svg>
              </a>
              {/* YouTube */}
              <a
                href="https://www.youtube.com/@virgroup"
                target="_blank"
                rel="noopener noreferrer"
                className="vir-footer-social-icon"
                aria-label="YouTube"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </a>
              {/* LinkedIn */}
              <a
                href={company.social.find(s => s.label === 'LinkedIn')?.href || '#'}
                target="_blank"
                rel="noopener noreferrer"
                className="vir-footer-social-icon"
                aria-label="LinkedIn"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
            </div>

            {/* Copyright */}
            <p className="vir-footer-copy">
              © {new Date().getFullYear()} VIR Group. All rights reserved.
            </p>
          </div>

          {/* Right Side: Developed By Webzaa | Privacy Policy | Terms & Conditions */}
          <div className="vir-footer-bottom-right">
            <a
              href="https://webzaa.in"
              target="_blank"
              rel="noopener noreferrer"
              className="vir-footer-legal-link"
            >
              Developed By Webzaa
            </a>
            <span className="vir-footer-pipe" aria-hidden="true">|</span>
            <Link to="/privacy-policy" className="vir-footer-legal-link">
              Privacy Policy
            </Link>
            <span className="vir-footer-pipe" aria-hidden="true">|</span>
            <Link to="/terms-and-conditions" className="vir-footer-legal-link">
              Terms & Conditions
            </Link>
          </div>
        </div>
      </div>
    </footer>
    </div>
  );
}
