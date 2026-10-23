import { Image } from '@/components/ui/Image';
import { Link, useLocation } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import { REFRESH, ScrollTrigger, useGSAP } from '@/lib/animations/gsap';
import { PopupForm } from '@/components/forms/PopupForm';

export function SiteHeader({ nav, phone, phoneDisplay, whatsapp }) {
  const ref = useRef(null);
  const menuBtn = useRef(null);
  const closeBtn = useRef(null);
  const overlay = useRef(null);
  const [theme, setTheme] = useState('basalt');
  const [over, setOver] = useState(true);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);
  const [popupOpen, setPopupOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY || document.documentElement.scrollTop || (window.__lenis?.scroll ?? 0);
      setScrolled(scrollY > 20);

      const hero = document.querySelector('.homeslider, [data-hero="true"], .legal-hero, .blog-hero');
      if (hero) {
        const rect = hero.getBoundingClientRect();
        setOver(rect.bottom > 80);
      } else {
        setOver(false);
      }
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });

    let lenisTimer = null;
    const attachLenis = () => {
      if (window.__lenis) {
        window.__lenis.on('scroll', handleScroll);
      } else {
        lenisTimer = setTimeout(attachLenis, 120);
      }
    };
    attachLenis();

    return () => {
      if (lenisTimer) clearTimeout(lenisTimer);
      window.removeEventListener('scroll', handleScroll);
      window.__lenis?.off('scroll', handleScroll);
    };
  }, [pathname]);

  useGSAP(
    (_ctx, contextSafe) => {
      const create = contextSafe(() => {
        document.querySelectorAll('main section[data-theme], main .legal-hero, main .blog-hero, .blog-hero, footer[data-theme]').forEach((sec) => {
          ScrollTrigger.create({
            trigger: sec,
            start: 'top 40px',
            end: 'bottom 40px',
            refreshPriority: REFRESH.OBSERVER,
            onToggle: (st) => {
              if (!st.isActive) return;
              setTheme(sec.dataset.theme ?? (sec.classList.contains('legal-hero') || sec.classList.contains('blog-hero') ? 'basalt' : 'basalt'));
              if (sec.dataset.hero === 'true' || sec.classList.contains('homeslider') || sec.classList.contains('legal-hero') || sec.classList.contains('blog-hero')) {
                setOver(true);
              }
            },
          });
        });
        // Navbar stays permanently visible across all scroll positions
        setHidden(false);
      });
      const id = window.setTimeout(create, 60);
      const first = document.querySelector('main section[data-theme], main .homeslider, main .legal-hero, main .blog-hero, .blog-hero');
      setTheme(first?.dataset.theme ?? 'basalt');
      if (first?.dataset.hero === 'true' || first?.classList.contains('homeslider') || first?.classList.contains('legal-hero') || first?.classList.contains('blog-hero')) {
        setOver(true);
      }
      setHidden(false);
      return () => window.clearTimeout(id);
    },
    { dependencies: [pathname], revertOnUpdate: true },
  );
  useEffect(() => {
    const lenis = window.__lenis;
    if (open) {
      lenis?.stop();
      document.body.style.overflow = 'hidden';
      closeBtn.current?.focus();
    } else {
      lenis?.start();
      document.body.style.overflow = '';
    }
    if (!open) return;
    const onKey = (e) => {
      if (e.key === 'Escape') {
        setOpen(false);
        menuBtn.current?.focus();
      }
      if (e.key === 'Tab' && overlay.current) {
        const f = overlay.current.querySelectorAll('a,button');
        const first = f[0],
          last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last?.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first?.focus();
        }
      }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open]);

  useEffect(() => {
    const onOpen = () => setPopupOpen(true);
    window.addEventListener('open-enquiry-popup', onOpen);
    if (typeof window !== 'undefined' && (window.location.hash === '#enquiry' || window.location.search.includes('enquiry=open'))) {
      setPopupOpen(true);
    }
    return () => window.removeEventListener('open-enquiry-popup', onOpen);
  }, []);

  const close = () => {
    setOpen(false);
    menuBtn.current?.focus();
  };
  return (
    <>
      <header
        ref={ref}
        className={`hdr${hidden && !open ? ' is-hidden' : ''}${scrolled ? ' is-scrolled' : ' is-transparent'}`}
        data-theme={theme}
        data-over={over && !scrolled ? 'true' : 'false'}
        data-scrolled={scrolled ? 'true' : 'false'}
      >
        <div className="wrap hdr-in">
          <div className="hdr-left">
            <button ref={menuBtn} className="hdr-menu-btn" aria-expanded={open} aria-controls="menu" onClick={() => setOpen(true)}>
              <span className="hdr-menu-icon" aria-hidden="true">
                <span className="hdr-menu-line" />
                <span className="hdr-menu-line" />
              </span>
              <span className="hdr-menu-label">MENU</span>
            </button>
          </div>

          <div className="hdr-center">
            <Link className="hdr-logo-link" to="/" aria-label="VIR Group home">
              <Image src="/media/logo.avif" alt="VIR Group" width={160} height={44} priority className="hdr-logo-img" />
            </Link>
          </div>

          <div className="hdr-right">
            <button
              type="button"
              className="hdr-contact-link"
              onClick={() => setPopupOpen(true)}
              data-event="project_enquiry"
            >
              CONTACT US
            </button>
          </div>
        </div>
      </header>

      {/* Full-screen menu overlay */}
      <div ref={overlay} id="menu" className={`overlay${open ? ' is-open' : ''}`} role="dialog" aria-modal="true" aria-label="Menu" data-theme="basalt">
        <div className="overlay-top">
          <Link to="/" onClick={() => setOpen(false)} className="hdr-logo-link" aria-label="VIR Group home">
            <Image src="/media/logo.avif" alt="VIR Group" width={130} height={36} className="hdr-logo-img" />
          </Link>
          <button ref={closeBtn} className="menu-btn" onClick={close}>
            CLOSE
          </button>
        </div>
        <ul>
          <li>
            <Link to="/" onClick={() => setOpen(false)}>
              Home
            </Link>
          </li>
          {nav.map((n) => (
            <li key={n.href}>
              <Link to={n.href} onClick={() => setOpen(false)}>
                {n.label}
              </Link>
            </li>
          ))}
        </ul>
        <div className="overlay-foot">
          <button
            type="button"
            className="overlay-contact-btn"
            onClick={() => {
              setOpen(false);
              setPopupOpen(true);
            }}
          >
            Contact Us
          </button>
          <a href={`tel:${phone}`} data-event="phone_click">
            {phoneDisplay}
          </a>
          <a href={whatsapp} data-event="whatsapp_click">
            WhatsApp
          </a>
        </div>
      </div>

      {/* Contact Enquiry Popup Form */}
      <PopupForm
        isOpen={popupOpen}
        onClose={() => setPopupOpen(false)}
        title="Contact VIR Group"
      />
    </>
  );
}
