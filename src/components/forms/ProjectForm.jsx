import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { track } from '@/lib/analytics/track';
import {
  COUNTRY_CODES,
  validateFullName,
  validateEmailAddress,
  validatePhoneNumber,
} from '@/data/countryCodes';
// ⬇️ Adjust these paths to wherever they live in your project
import { API_URL } from '@/config';
import {
  captureMarketingParams,
  getMarketingData,
  cleanPhoneNumber,
} from '@/lib/marketing';

/** Builds the lead API payload (same shape as ContactForm) */
const buildPayload = ({ formData, countryCode, currentCountry, projectName }) => {
  const marketing = captureMarketingParams() || getMarketingData() || {};
  const countryData = { dialCode: countryCode, name: currentCountry.country };
  const cleanMobile = cleanPhoneNumber(formData.phone, countryData);
  const dialCode = countryCode
    ? countryCode.startsWith('+')
      ? countryCode
      : `+${countryCode}`
    : '+91';

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
    formname: `${projectName || 'General Enquiry'} Contact Form`,
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

/**
 * ProjectForm - High-converting luxury inline form for project CTA sections
 *
 * Sits in a single line on desktop (Name, Email, Number with Country Code, Submit)
 * with minimalist border-bottom styling and robust validation.
 */
export function ProjectForm({
  projectName = 'General Enquiry',
  buttonText = 'Enquire Now',
  onSuccess,
}) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
  });
  const [countryCode, setCountryCode] = useState('+91');
  const [consent, setConsent] = useState(true);
  const [fieldErrors, setFieldErrors] = useState({});
  const [state, setState] = useState('idle'); // 'idle' | 'sending' | 'sent' | 'error'
  const [errorMsg, setErrorMsg] = useState('');

  const currentCountry = COUNTRY_CODES.find((c) => c.code === countryCode) || COUNTRY_CODES[0];

  const handleChange = (e) => {
    const { name, value } = e.target;
    // For phone, only allow numbers, spaces, and dashes
    if (name === 'phone') {
      const sanitized = value.replace(/[^\d\s-]/g, '');
      setFormData((prev) => ({ ...prev, phone: sanitized }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }

    if (fieldErrors[name]) {
      setFieldErrors((prev) => ({ ...prev, [name]: null }));
    }
    if (errorMsg) setErrorMsg('');
  };

  const handleCountryChange = (e) => {
    setCountryCode(e.target.value);
    if (fieldErrors.phone) {
      setFieldErrors((prev) => ({ ...prev, phone: null }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (state === 'sending') return;

    // 1. Comprehensive Field Validations
    const nameErr = validateFullName(formData.name);
    const emailErr = validateEmailAddress(formData.email);
    const phoneErr = validatePhoneNumber(formData.phone, countryCode);

    if (nameErr || emailErr || phoneErr) {
      setFieldErrors({
        name: nameErr,
        email: emailErr,
        phone: phoneErr,
      });
      setErrorMsg(nameErr || emailErr || phoneErr);
      return;
    }

    if (!consent) {
      setErrorMsg('Please agree to receive communications to proceed.');
      return;
    }

    setFieldErrors({});
    setErrorMsg('');
    setState('sending');

    try {
      const payload = buildPayload({ formData, countryCode, currentCountry, projectName });

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

      const result = await response.json();

      if (Number(result.status) !== 1) {
        throw new Error(result.msg || 'Lead submission failed.');
      }

      track('form_submit', { form: 'project_inline_cta', project: projectName });
      try {
        sessionStorage.setItem('vir_hotspot_lead_submitted', 'true');
      } catch {}
      onSuccess?.(payload);
      navigate(`/thank-you?name=${encodeURIComponent(formData.name.trim())}&project=${encodeURIComponent(projectName)}&type=lead`);
    } catch (error) {
      console.error('Lead submission failed:', error);
      setErrorMsg(error?.message || 'Unable to submit your enquiry. Please try again.');
      setState('idle');
    }
  };

  if (state === 'sent') {
    return (
      <div className="project-form-success" role="alert">
        <div className="project-form-success-icon">✓</div>
        <div className="project-form-success-text">
          <h4>Thank you, {formData.name || 'valued customer'}!</h4>
          <p>
            Your inquiry for <strong>{projectName}</strong> has been received. Our sales team will get in touch with you shortly.
          </p>
        </div>
        <div className="project-form-success-actions">
          <a href={`https://wa.me/919326287741?text=${encodeURIComponent(`Hi VIR Group, I submitted an enquiry for ${projectName}`)}`} target="_blank" rel="noopener noreferrer" className="project-form-wa-btn">
            Chat on WhatsApp ↗
          </a>
          <button type="button" className="project-form-reset-btn" onClick={() => {
              setFormData({ name: '', email: '', phone: '' });
              setConsent(true);
              setFieldErrors({});
              setErrorMsg('');
              setState('idle');
            }}>
            Submit Another
          </button>
        </div>
      </div>
    );
  }

  return (
    <form className="project-form-wrap" onSubmit={handleSubmit} noValidate>
      <div className="project-form-inline">
        <div className="project-form-field">
          <input type="text" name="name" placeholder="Enter your name *" value={formData.name} onChange={handleChange} required autoComplete="name" className={`project-form-input ${fieldErrors.name ? 'has-error' : ''}`} aria-label="Your Name" aria-invalid={!!fieldErrors.name}/>
          {fieldErrors.name && (
            <span className="project-form-field-err">{fieldErrors.name}</span>
          )}
        </div>
        <div className="project-form-field">
          <input type="email" name="email" placeholder="Enter your email *" value={formData.email} onChange={handleChange} required autoComplete="email" className={`project-form-input ${fieldErrors.email ? 'has-error' : ''}`} aria-label="Email Address" aria-invalid={!!fieldErrors.email}/>
          {fieldErrors.email && (
            <span className="project-form-field-err">{fieldErrors.email}</span>
          )}
        </div>
        <div className="project-form-field project-form-field-phone">
          <div className="project-form-phone-group">
            <select value={countryCode} onChange={handleCountryChange} className="project-form-country-select" aria-label="Country Code">
              {COUNTRY_CODES.map((c) => (
                <option key={`${c.iso}-${c.code}`} value={c.code}>
                  {c.flag} {c.code} ({c.country})
                </option>
              ))}
            </select>
            <input type="tel" name="phone" placeholder="Enter your number *" value={formData.phone} onChange={handleChange} required maxLength={countryCode === '+91' ? 10 : 15}
               autoComplete="tel" className={`project-form-input ${fieldErrors.phone ? 'has-error' : ''}`} aria-label="Mobile Number" aria-invalid={!!fieldErrors.phone} />
          </div>
          {fieldErrors.phone && (
            <span className="project-form-field-err">{fieldErrors.phone}</span>
          )}
        </div>
        <label className="project-form-consent">
          <input type="checkbox" name="consent" checked={consent}
            onChange={(e) => {
              setConsent(e.target.checked);
              if (errorMsg) setErrorMsg('');
            }}
          />
          <span>
            By submitting, you agree to receive communications regarding {projectName}. We respect your privacy.
          </span>
        </label>
        <button type="submit" className="project-form-submit-btn" disabled={state === 'sending'}>
          {state === 'sending' ? (
            <span>Sending...</span>
          ) : (
            <>
              <span>{buttonText}</span>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </>
          )}
        </button>
      </div>
      {errorMsg && (
        <p className="project-form-error" role="alert">
          {errorMsg}
        </p>
      )}
    </form>
  );
}