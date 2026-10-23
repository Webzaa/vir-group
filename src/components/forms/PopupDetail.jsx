import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useNavigate } from 'react-router-dom';

export function PopupDetail({ project, delay = 3500, onAction }) {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsOpen(true);
    }, delay);

    return () => clearTimeout(timer);
  }, [delay]);

  useEffect(() => {
    if (isOpen) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = prev;
      };
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleClose = () => {
    setIsOpen(false);
  };

  const handlePrimaryClick = () => {
    setIsOpen(false);
    if (onAction) {
      onAction();
    } else {
      const targetSlug = project?.slug || 'opportunity';
      navigate(`/projects/${targetSlug}`);
    }
  };

  const title =
    project?.name === 'VIR Paradise'
      ? 'Code Name: Paradise'
      : project?.name?.startsWith('Code') || project?.name?.startsWith('VIR')
      ? project.name
      : `Code Name: ${project?.name || 'Opportunity'}`;

  const subtitle =
    project?.area
      ? `${project.area}'s biggest launch coming soon!`
      : "Malad East's biggest launch coming soon!";

  const location = project?.area ? `${project.area}, Mumbai` : 'Malad East, Mumbai';
  const config =
    project?.facts?.find((f) => f.label === 'Configuration')?.value || '1-2-3 BHK';
  const startingPrice = project?.priceFrom ? `₹${project.priceFrom}` : '₹1 Cr';
  const possession = project?.possession || 'Coming Soon';
  const projectArea = project?.sqftTotal ? `${project.sqftTotal} sqft` : '1200000 sqft';

  return createPortal(
    <div className="popup-detail-backdrop" onClick={handleClose} role="dialog" aria-modal="true" aria-labelledby="popup-detail-title">
      <div className="popup-detail-card" onClick={(e) => e.stopPropagation()}>
        <button type="button" className="popup-detail-close" onClick={handleClose} aria-label="Close popup">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
        <div className="popup-detail-tag-row">
          <span className="popup-detail-tag">PREMIUM PROJECT</span>
          <span className="popup-detail-tag-line" />
        </div>
        <h2 id="popup-detail-title" className="popup-detail-title">
          {title}
        </h2>
        <p className="popup-detail-subtitle">{subtitle}</p>
        <div className="popup-detail-location">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1e293b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
            <circle cx="12" cy="10" r="3" />
          </svg>
          <span>{location}</span>
        </div>
        <div className="popup-detail-grid">
          <div className="popup-detail-stat-card">
            <div className="popup-detail-icon-wrap">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                <polyline points="9 22 9 12 15 12 15 22" />
              </svg>
            </div>
            <div className="popup-detail-stat-info">
              <span className="popup-detail-stat-label">Configuration</span>
              <strong className="popup-detail-stat-value">{config}</strong>
            </div>
          </div>
          <div className="popup-detail-stat-card">
            <div className="popup-detail-icon-wrap">
              <span className="popup-detail-rupee-icon">₹</span>
            </div>
            <div className="popup-detail-stat-info">
              <span className="popup-detail-stat-label">Starting Price</span>
              <strong className="popup-detail-stat-value">{startingPrice}</strong>
            </div>
          </div>
          <div className="popup-detail-stat-card">
            <div className="popup-detail-icon-wrap">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                <line x1="16" y1="2" x2="16" y2="6" />
                <line x1="8" y1="2" x2="8" y2="6" />
                <line x1="3" y1="10" x2="21" y2="10" />
              </svg>
            </div>
            <div className="popup-detail-stat-info">
              <span className="popup-detail-stat-label">Possession</span>
              <strong className="popup-detail-stat-value">{possession}</strong>
            </div>
          </div>
          <div className="popup-detail-stat-card">
            <div className="popup-detail-icon-wrap">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21.3 8.7 8.7 21.3c-1 1-2.5 1-3.5 0l-1.5-1.5c-1-1-1-2.5 0-3.5L16.3 3.7c1-1 2.5-1 3.5 0l1.5 1.5c1 1 1 2.5 0 3.5z" />
                <line x1="9" y1="9" x2="11" y2="11" />
                <line x1="12" y1="12" x2="14" y2="14" />
                <line x1="15" y1="15" x2="17" y2="17" />
              </svg>
            </div>
            <div className="popup-detail-stat-info">
              <span className="popup-detail-stat-label">Project Area</span>
              <strong className="popup-detail-stat-value">{projectArea}</strong>
            </div>
          </div>
        </div>
        <div className="popup-detail-offer-pill">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#b45309" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 2l2.4 7.4h7.6l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z" />
          </svg>
          <span>Limited Time Offer</span>
        </div>
        <div className="popup-detail-actions">
          <button type="button" className="popup-detail-btn-primary" onClick={handlePrimaryClick}>
            <span>View Full Details</span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </button>
          <button type="button" className="popup-detail-btn-secondary" onClick={handleClose}>
            Maybe Later
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
}

export default PopupDetail;
