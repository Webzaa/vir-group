import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { usePageMeta } from '@/lib/seo/usePageMeta';
import { RevealController } from '@/components/animation/RevealController';
import { CareerForm } from '@/components/forms/CareerForm';
import {
  CareersHero,
  CareersPerks,
  CareersPositions,
  CareersCulture,
  CareersGeneralCta,
} from '@/All Section/Careers';

export function Careers() {
  usePageMeta({
    title: 'Careers | Join Our Team | VIR Group Mumbai',
    description: "Build your career with VIR Group. Be part of a legacy that's been transforming Mumbai's skyline for over 50 years. View open positions in Sales, Engineering, Architecture, and Management.",
    path: '/careers',
  });

  const [modalJob, setModalJob] = useState(null);

  useEffect(() => {
    if (modalJob) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = prev;
      };
    }
  }, [modalJob]);

  const scrollToPositions = () => {
    const el = document.getElementById('open-positions');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleApplyClick = (job) => {
    setModalJob(job);
  };

  return (
    <div className="careers-v2-page">
      <CareersHero onScrollToPositions={scrollToPositions} />
      <CareersPerks />
      <CareersPositions onApplyJob={handleApplyClick} />
      <CareersCulture onScrollToPositions={scrollToPositions} />
      <CareersGeneralCta onApplyGeneral={() => handleApplyClick({ title: 'General Application' })} />

      {modalJob &&
        createPortal(
          <div
            className="careers-v2-modal-backdrop"
            onClick={() => setModalJob(null)}
            role="dialog"
            aria-modal="true"
          >
            <div
              className="careers-v2-modal-card"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                className="careers-v2-modal-close"
                onClick={() => setModalJob(null)}
                aria-label="Close modal"
              >
                ✕
              </button>

              <CareerForm
                job={modalJob}
                onClose={() => setModalJob(null)}
              />
            </div>
          </div>,
          document.body
        )}

      <RevealController />
    </div>
  );
}

export default Careers;
