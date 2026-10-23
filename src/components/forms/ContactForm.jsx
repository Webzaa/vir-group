import { useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { track } from '@/lib/analytics/track';
import {
  COUNTRY_CODES,
  validateFullName,
  validateEmailAddress,
  validatePhoneNumber,
} from '@/data/countryCodes';
import { API_URL } from '@/config';
import {
  captureMarketingParams,
  getMarketingData,
  cleanPhoneNumber,
} from '@/lib/marketing';

/** Builds the lead API payload */
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

    websitename: typeof window !== 'undefined' ? window.location.hostname : '',
  };
};

export function ContactForm({ projects, defaultProject = '', defaultSubject = '' }) {
  const navigate = useNavigate();
  const form = useRef(null);
  const started = useRef(false);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
  });
  const [countryCode, setCountryCode] = useState('+91');
  const [errors, setErrors] = useState({});
  const [state, setState] = useState('idle'); // 'idle' | 'sending' | 'sent' | 'error'

  const onStart = () => {
    if (!started.current) {
      started.current = true;
      track('form_start', { form: 'contact' });
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

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
    if (state === 'error') setState('idle');
  };

  const handleCountryChange = (e) => {
    setCountryCode(e.target.value);
    if (errors.phone) {
      setErrors((prev) => ({ ...prev, phone: null }));
    }
  };

  async function submit(e) {
    e.preventDefault();
    if (state === 'sending') return;

    const fd = new FormData(e.currentTarget);
    const rawConsent = fd.get('consent') === 'on';
    const honeypot = String(fd.get('website') ?? '');

    const name = formData.name.trim();
    const email = formData.email.trim();
    const phone = formData.phone.trim();

    // 1. Validation checks
    const nameErr = validateFullName(name);
    const emailErr = validateEmailAddress(email);
    const phoneErr = validatePhoneNumber(phone, countryCode);
    const consentErr = !rawConsent ? 'Please agree to the privacy policy to proceed.' : null;

    if (nameErr || emailErr || phoneErr || consentErr) {
      const next = {};
      if (nameErr) next.name = nameErr;
      if (phoneErr) next.phone = phoneErr;
      if (emailErr) next.email = emailErr;
      if (consentErr) next.consent = consentErr;
      setErrors(next);

      const first = ['name', 'phone', 'email', 'consent'].find((k) => next[k]);
      if (first) form.current?.querySelector(`[name="${first}"]`)?.focus();
      return;
    }

    const projectName = String(defaultProject || 'General Enquiry').trim();

    if (honeypot) {
      navigate(`/thank-you?name=${encodeURIComponent(formData.name.trim())}&project=${encodeURIComponent(projectName)}&type=contact`);
      return;
    }

    setErrors({});
    setState('sending');

    try {
      const currentCountry =
        COUNTRY_CODES.find((c) => c.code === countryCode) || COUNTRY_CODES[0];

      const payload = buildPayload({
        formData,
        countryCode,
        currentCountry,
        projectName,
      });

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

      track('form_submit', { form: 'contact', project: projectName });
      navigate(`/thank-you?name=${encodeURIComponent(formData.name.trim())}&project=${encodeURIComponent(projectName)}&type=contact`);
    } catch (error) {
      console.error('Lead submission failed:', error);
      setState('error');
    }
  }

  if (state === 'sent') {
    return (
      <div className="sent cb" tabIndex={-1} ref={(el) => el?.focus()}>
        <h3>Message sent.</h3>
        <p className="t-body">We’ll reply within one working day.</p>
      </div>
    );
  }

  return (
    <form ref={form} className="form cb" noValidate onSubmit={submit} onFocus={onStart}>
      <div className={`field${errors.name ? ' err' : ''} full`}>
        <label htmlFor="f-name">Full name *</label>
        <input id="f-name" name="name" type="text" autoComplete="name" placeholder="Enter your name" value={formData.name} onChange={handleInputChange} required aria-invalid={errors.name ? true : undefined} />
        {errors.name && <span className="help" id="f-name-h">{errors.name}</span>}
      </div>
      <div className={`field${errors.phone ? ' err' : ''} full`}>
        <label htmlFor="f-phone">Phone number *</label>
        <div className="contact-phone-wrap">
          <select className="contact-country-select" value={countryCode} onChange={handleCountryChange} aria-label="Country Code">
            {COUNTRY_CODES.map((c) => (
              <option key={`${c.iso}-${c.code}`} value={c.code}>
                {c.flag} {c.code} ({c.country})
              </option>
            ))}
          </select>
          <input id="f-phone" name="phone" type="tel" inputMode="tel" autoComplete="tel" placeholder="Enter your number" value={formData.phone} onChange={handleInputChange} maxLength={countryCode === '+91' ? 10 : 15} required aria-invalid={errors.phone ? true : undefined} />
        </div>
        {errors.phone && <span className="help" id="f-phone-h">{errors.phone}</span>}
      </div>
      <div className={`field${errors.email ? ' err' : ''} full`}>
        <label htmlFor="f-email">Email *</label>
        <input id="f-email" name="email" type="email" autoComplete="email" placeholder="Enter your email" value={formData.email} onChange={handleInputChange} required aria-invalid={errors.email ? true : undefined} />
        {errors.email && <span className="help" id="f-email-h">{errors.email}</span>}
      </div>
      <input type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" style={{ position: 'absolute', left: '-9999px', opacity: 0 }} />
      <label className="consent" style={{ gridColumn: '1 / -1' }}>
        <input type="checkbox" name="consent" defaultChecked required aria-invalid={errors.consent ? true : undefined} />
        <span>
          By checking this box, you agree to our{' '}
          <Link
            to="/privacy-policy"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: 'var(--ink)', textDecoration: 'underline', fontWeight: 600 }}
          >
            Privacy Policy
          </Link>{' '}
          and consent to be contacted with relevant updates.
        </span>
      </label>
      {errors.consent && (
        <span id="f-consent-h" style={{ gridColumn: '1 / -1', color: 'var(--error)', font: '400 14px/1.5 var(--font-sans)' }}>
          {errors.consent}
        </span>
      )}

      <div className="form-foot">
        <p className="t-small">
          {state === 'error' ? (
            <span style={{ color: 'var(--error)' }}>That didn’t send. Please try again, or call +91 93262 87741.</span>
          ) : (
            'All fields are required.'
          )}
        </p>
        <button className="btn btn-solid" type="submit" disabled={state === 'sending'}>
          {state === 'sending' ? 'Sending…' : 'Send message'}
        </button>
      </div>
    </form>
  );
}