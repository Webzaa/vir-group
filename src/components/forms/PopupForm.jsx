import React, { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { createPortal } from 'react-dom';
import { track } from '@/lib/analytics/track';
import {
  COUNTRY_CODES,
  validateFullName,
  validateEmailAddress,
  validatePhoneNumber,
} from '@/data/countryCodes';
import { API_URL } from '@/config';
import { captureMarketingParams, getMarketingData, cleanPhoneNumber } from '@/lib/marketing';

const DEFAULT_ISO = COUNTRY_CODES.find((c) => c.code === '+91')?.iso ?? COUNTRY_CODES[0]?.iso;

const buildPayload = ({ formData, currentCountry, projectName }) => {
  const marketing = captureMarketingParams() || getMarketingData() || {};
  const countryCode = currentCountry.code || '+91';
  const countryData = { dialCode: countryCode, name: currentCountry.country };
  const cleanMobile = cleanPhoneNumber(formData.phone, countryData);
  const dialCode = countryCode.startsWith('+') ? countryCode : `+${countryCode}`;

  return {
    // Lead details
    name: formData.name.trim(),
    email: formData.email.trim(),
    mobile: cleanMobile,
    countrycode: dialCode,
    countryname: currentCountry.country || 'India',

    // Project
    projectSelectValues: projectName || 'General Enquiry',
    configuration: '',

    // API required fields
    configInterestValues: [''],
    configTypeValues: [''],
    purposeValues: [''],
    visitdayValues: [''],
    favdestinationValues: [''],

    // Form details
    formname: `${projectName || 'General Enquiry'} Popup Form`,
    form_id: '',
    leadgen_id: '',
    page_id: '',
    ad_id: '',

    // Marketing parameters
    utm_source: marketing.utm_source || '',
    utm_sub_source: marketing.utm_sub_source || '',
    utm_medium: marketing.utm_medium || '',
    campaigncode: marketing.campaigncode || '',
    campaignname: marketing.campaignname || marketing.utm_campaignname || '',
    utm_campaignname: marketing.utm_campaignname || marketing.campaignname || '',
    utm_campaignid: marketing.utm_campaignid || marketing.gad_campaignid || '',
    utm_adset: marketing.utm_adset || marketing.utm_adgroupname || '',
    utm_adgroupname: marketing.utm_adgroupname || marketing.utm_adset || '',
    utm_adgroupid: marketing.utm_adgroupid || '',
    utm_adname: marketing.utm_adname || marketing.utm_adcreative || '',
    utm_adcreative: marketing.utm_adcreative || marketing.utm_adname || '',
    Lead_Keyword: marketing.Lead_Keyword || marketing.keyword || '',
    keyword: marketing.keyword || marketing.Lead_Keyword || '',
    Lead_Placement: marketing.Lead_Placement || marketing.placement || '',
    placement: marketing.placement || marketing.Lead_Placement || '',
    Lead_Device: marketing.Lead_Device || marketing.device || '',
    device: marketing.device || marketing.Lead_Device || '',
    gad_source: marketing.gad_source || '',
    gad_campaignid: marketing.gad_campaignid || marketing.utm_campaignid || '',
    gbraid: marketing.gbraid || '',
    gclid: marketing.gclid || '',

    // Website
    websitename: typeof window !== 'undefined' ? window.location.hostname : '',
  };
};

export function PopupForm({
  isOpen = false,
  onClose,
  onSuccess,
  title = 'Enquire Now',
  subtitle = '',
  defaultProject = '',
}) {
  const navigate = useNavigate();
  const formRef = useRef(null);
  const modalPanelRef = useRef(null);
  const startedRef = useRef(false);

  // iso se track karte hain, kyunki kai countries ka dial code same hota hai (+1 etc.)
  const [countryIso, setCountryIso] = useState(DEFAULT_ISO);
  const [formData, setFormData] = useState({ name: '', email: '', phone: '' });
  const [errors, setErrors] = useState({});
  const [state, setState] = useState('idle'); // idle | sending

  const currentCountry =
    COUNTRY_CODES.find((c) => c.iso === countryIso) || COUNTRY_CODES[0];
  const countryCode = currentCountry.code;

  useEffect(() => {
    if (!isOpen) {
      setErrors({});
      setState('idle');
      startedRef.current = false;
      return;
    }

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const lenis = window.__lenis;
    lenis?.stop();

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose?.();
    };
    window.addEventListener('keydown', handleKeyDown);

    const timer = setTimeout(() => {
      modalPanelRef.current?.querySelector('input[name="name"]')?.focus();
    }, 120);

    return () => {
      document.body.style.overflow = prevOverflow;
      lenis?.start();
      window.removeEventListener('keydown', handleKeyDown);
      clearTimeout(timer);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const onStart = () => {
    if (!startedRef.current) {
      startedRef.current = true;
      track('form_start', { form: 'popup_enquiry' });
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'phone') {
      const sanitized = value.replace(/[^\d\s-]/g, '');
      setFormData((prev) => ({ ...prev, phone: sanitized }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }

    if (errors[name] || errors.submit) {
      setErrors((prev) => ({ ...prev, [name]: null, submit: null }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (state === 'sending') return;

    const fd = new FormData(e.currentTarget);
    const rawConsent = fd.get('consent') === 'on';
    const honeypot = String(fd.get('website') ?? '');

    const name = formData.name.trim();
    const email = formData.email.trim();
    const phone = formData.phone.trim();

    // 1. Validations
    const nameErr = validateFullName(name);
    const emailErr = validateEmailAddress(email);
    const phoneErr = validatePhoneNumber(phone, countryCode);
    const consentErr = !rawConsent ? 'Please agree to the privacy policy to proceed.' : null;

    if (nameErr || emailErr || phoneErr || consentErr) {
      const nextErrors = {};
      if (nameErr) nextErrors.name = nameErr;
      if (phoneErr) nextErrors.phone = phoneErr;
      if (emailErr) nextErrors.email = emailErr;
      if (consentErr) nextErrors.consent = consentErr;
      setErrors(nextErrors);

      const firstErrKey = ['name', 'phone', 'email', 'consent'].find((k) => nextErrors[k]);
      if (firstErrKey) {
        formRef.current?.querySelector(`[name="${firstErrKey}"]`)?.focus();
      }
      return;
    }

    const projectName = String(defaultProject || 'General Enquiry').trim();
    const thankYouUrl = `/thank-you?name=${encodeURIComponent(name)}&project=${encodeURIComponent(projectName)}&type=lead`;

    // 2. Honeypot: bot ne hidden field bhara. Fake success.
    if (honeypot) {
      onClose?.();
      navigate(thankYouUrl);
      return;
    }

    setErrors({});
    setState('sending');

    try {
      const payload = buildPayload({ formData, currentCountry, projectName });

      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`);
      }

      let result;
      try {
        result = await response.json();
      } catch {
        throw new Error('Server ne invalid response diya. Please try again.');
      }

      if (Number(result.status) !== 1) {
        throw new Error(result.msg || 'Lead submission failed.');
      }

      track('form_submit', { form: 'popup_enquiry', project: projectName });
      try {
        sessionStorage.setItem('vir_hotspot_lead_submitted', 'true');
      } catch {
        /* storage unavailable, ignore */
      }
      onSuccess?.(payload);
      onClose?.();
      navigate(thankYouUrl);
    } catch (error) {
      console.error('Lead submission failed:', error);
      setErrors({
        submit: error?.message || 'Unable to submit your enquiry. Please try again.',
      });
      setState('idle');
    }
  };

  return createPortal(
    <div
      className="popup-form-backdrop"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="popup-form-title"
    >
      <div ref={modalPanelRef} className="popup-form-card" onClick={(e) => e.stopPropagation()}>
        <button type="button" className="popup-form-close-btn" onClick={onClose} aria-label="Close form">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

        <div className="popup-form-head">
          <span className="popup-form-tag">VIR GROUP • MUMBAI</span>
          <h2 id="popup-form-title" className="popup-form-title">{title}</h2>
          {subtitle && <p className="popup-form-subtitle">{subtitle}</p>}
        </div>

        <form ref={formRef} className="popup-form-body" noValidate onSubmit={handleSubmit} onFocus={onStart}>
          <div className={`popup-field full-width ${errors.name ? 'has-error' : ''}`}>
            <label htmlFor="pf-name">Your Full Name *</label>
            <input id="pf-name" name="name" type="text" autoComplete="name" placeholder="Enter your name" value={formData.name} onChange={handleInputChange} required />
            {errors.name && <span className="popup-field-err">{errors.name}</span>}
          </div>

          <div className={`popup-field full-width ${errors.phone ? 'has-error' : ''}`}>
            <label htmlFor="pf-phone">Phone Number *</label>
            <div className="popup-phone-wrap" style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
              <select
                className="popup-phone-country-select"
                value={countryIso}
                onChange={(e) => {
                  setCountryIso(e.target.value);
                  if (errors.phone) setErrors((prev) => ({ ...prev, phone: null }));
                }}
                aria-label="Country Code"
                style={{ width: 'auto', maxWidth: '130px', flex: '0 0 auto', border: 'none', borderRight: '1px solid rgba(22, 34, 72, 0.25)', borderBottom: 'none', padding: '8px 22px 8px 0', cursor: 'pointer' }}
              >
                {COUNTRY_CODES.map((c) => (
                  <option key={`${c.iso}-${c.code}`} value={c.iso}>
                    {c.flag} {c.code} ({c.country})
                  </option>
                ))}
              </select>
              <input
                id="pf-phone"
                name="phone"
                type="tel"
                inputMode="tel"
                autoComplete="tel"
                placeholder="Enter your number"
                value={formData.phone}
                onChange={handleInputChange}
                maxLength={countryCode === '+91' ? 10 : 15}
                required
                style={{ flex: '1 1 auto', minWidth: 0, width: '100%', border: 'none', borderBottom: 'none', padding: '8px 0 8px 12px', background: 'transparent' }}
              />
            </div>
            {errors.phone && <span className="popup-field-err">{errors.phone}</span>}
          </div>

          <div className={`popup-field full-width ${errors.email ? 'has-error' : ''}`}>
            <label htmlFor="pf-email">Email Address *</label>
            <input id="pf-email" name="email" type="email" autoComplete="email" placeholder="Enter your email" value={formData.email} onChange={handleInputChange} required />
            {errors.email && <span className="popup-field-err">{errors.email}</span>}
          </div>

          {/* Honeypot */}
          <input type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" style={{ position: 'absolute', left: '-9999px', opacity: 0 }} />

          <div className={`popup-consent-wrap ${errors.consent ? 'has-error' : ''}`}>
            <label className="popup-consent-label">
              {/* defaultChecked hata diya: user ko khud tick karna hoga */}
              <input
                type="checkbox"
                name="consent"
                onChange={() => errors.consent && setErrors((prev) => ({ ...prev, consent: null }))}
              />
              <span>
                By checking this box, you agree to our{' '}
                <Link to="/privacy-policy" target="_blank" rel="noopener noreferrer">
                  Privacy Policy
                </Link>{' '}
                and consent to be contacted with relevant updates.
              </span>
            </label>
            {errors.consent && <span className="popup-field-err">{errors.consent}</span>}
          </div>

          {errors.submit && (
            <p className="popup-field-err" role="alert">
              {errors.submit}
            </p>
          )}

          <div className="popup-form-foot">
            <button type="submit" className="popup-submit-btn" disabled={state === 'sending'}>
              {state === 'sending' ? (
                <span className="popup-btn-loading">
                  <span className="popup-spinner" /> Submitting...
                </span>
              ) : (
                <span>Submit Enquiry</span>
              )}
            </button>
            <p className="popup-privacy-note">
              🔒 We respect your privacy. No spam guaranteed.
            </p>
          </div>
        </form>
      </div>
    </div>,
    document.body
  );
}

export default PopupForm;