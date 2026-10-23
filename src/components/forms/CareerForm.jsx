import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
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

/** Builds the lead API payload for a job application */
const buildPayload = ({ formData, countryCode, currentCountry, job }) => {
  const marketing = captureMarketingParams() || getMarketingData() || {};
  const countryData = { dialCode: countryCode, name: currentCountry.country };
  const cleanMobile = cleanPhoneNumber(formData.phone, countryData);
  const dialCode = countryCode
    ? countryCode.startsWith('+')
      ? countryCode
      : `+${countryCode}`
    : '+91';
  const roleTitle = job?.title || 'General Application';

  return {
    name: formData.fullName.trim(),
    email: formData.email.trim(),
    mobile: cleanMobile,
    countrycode: dialCode,
    countryname: currentCountry.country || 'India',
    projectSelectValues: roleTitle,
    configuration: `Experience: ${formData.experience.trim()}`,
    configInterestValues: [''],
    configTypeValues: [''],
    purposeValues: [''],
    visitdayValues: [''],
    favdestinationValues: [''],
    formname: `Career Application - ${roleTitle}`,
    form_id: '',
    leadgen_id: '',
    page_id: '',
    ad_id: '',
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

export function CareerForm({ job = { title: 'General Application' }, onClose, onSuccess }) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    experience: '',
  });

  const [countryCode, setCountryCode] = useState('+91');
  const [fieldErrors, setFieldErrors] = useState({});
  const [resumeFile, setResumeFile] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const fileInputRef = useRef(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
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

  const handleFileSelect = (file) => {
    if (!file) return;
    const allowedExtensions = ['pdf', 'doc', 'docx'];
    const ext = file.name.split('.').pop()?.toLowerCase();
    if (!allowedExtensions.includes(ext)) {
      setErrorMsg('Please upload a valid PDF or DOCX file.');
      return;
    }
    // Limit to 10MB
    if (file.size > 10 * 1024 * 1024) {
      setErrorMsg('File size must be under 10MB.');
      return;
    }
    setErrorMsg('');
    if (fieldErrors.resume) {
      setFieldErrors((prev) => ({ ...prev, resume: null }));
    }
    setResumeFile(file);
  };

  const onFileInputChange = (e) => {
    const file = e.target.files?.[0];
    handleFileSelect(file);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    handleFileSelect(file);
  };

  const removeResume = (e) => {
    e.stopPropagation();
    setResumeFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;

    // 1. Validation
    const nameErr = validateFullName(formData.fullName);
    const emailErr = validateEmailAddress(formData.email);
    const phoneErr = validatePhoneNumber(formData.phone, countryCode);
    const expErr = !formData.experience.trim() ? 'Please specify your years of experience.' : null;
    const resumeErr = !resumeFile ? 'Please upload your resume / CV to proceed.' : null;

    if (nameErr || emailErr || phoneErr || expErr || resumeErr) {
      const errs = {};
      if (nameErr) errs.fullName = nameErr;
      if (emailErr) errs.email = emailErr;
      if (phoneErr) errs.phone = phoneErr;
      if (expErr) errs.experience = expErr;
      if (resumeErr) errs.resume = resumeErr;

      setFieldErrors(errs);
      setErrorMsg(resumeErr || nameErr || emailErr || phoneErr || expErr);
      return;
    }

    setIsSubmitting(true);
    setErrorMsg('');
    setFieldErrors({});

    try {
      const currentCountry =
        COUNTRY_CODES.find((c) => c.code === countryCode) || COUNTRY_CODES[0];

      const payload = buildPayload({ formData, countryCode, currentCountry, job });

      // NOTE: the lead API takes JSON only, so the resume file itself is not sent.
      // Only the details above reach the CRM. See the note below the code.
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
        throw new Error(result.msg || 'Application submission failed.');
      }

      try {
        track('form_submit', { form: 'career', role: job.title });
      } catch {
        // Safe fallback
      }

      onSuccess?.({
        ...formData,
        phone: `${countryCode}${formData.phone.trim().replace(/\D/g, '')}`,
        countryCode,
        role: job.title,
        fileName: resumeFile.name,
      });

      onClose?.();
      navigate(`/thank-you?name=${encodeURIComponent(formData.fullName.trim())}&type=career`);
    } catch (error) {
      console.error('Application submission failed:', error);
      setErrorMsg(
        error?.message || 'Something went wrong. Please try again or contact us directly.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="careers-v2-modal-success">
        <div className="careers-v2-success-icon">✓</div>
        <h3>Application Submitted!</h3>
        <p>
          Thank you for applying for <strong>{job.title}</strong>. Our human resources team will review your credentials and get in touch with you shortly.
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="careers-v2-modal-head">
        <span className="careers-v2-modal-tag">Apply for Position</span>
        <h3 className="careers-v2-modal-title">{job.title}</h3>
        <p className="careers-v2-modal-desc">
          Submit your details and resume. Our recruitment team will review your application.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="careers-v2-modal-form" noValidate>
        {errorMsg && (
          <div style={{ padding: '10px 14px', borderRadius: '8px', background: '#fef2f2', color: '#b91c1c', fontSize: '13.5px', border: '1px solid #fecaca',}}>
            {errorMsg}
          </div>
        )}
        <div className="careers-v2-form-row">
          <div className="careers-v2-form-field">
            <label htmlFor="career-name">Full Name *</label>
            <input id="career-name" name="fullName" type="text" required placeholder="Enter your name" value={formData.fullName} onChange={handleInputChange} style={{ borderColor: fieldErrors.fullName ? '#ef4444' : undefined }}/>
            {fieldErrors.fullName && (
              <span style={{ color: '#ef4444', fontSize: '12px', marginTop: '4px' }}>
                {fieldErrors.fullName}
              </span>
            )}
          </div>
          <div className="careers-v2-form-field">
            <label htmlFor="career-email">Email Address *</label>
            <input id="career-email" name="email" type="email" required placeholder="Enter your email" value={formData.email} onChange={handleInputChange} style={{ borderColor: fieldErrors.email ? '#ef4444' : undefined }}/>
            {fieldErrors.email && (
              <span style={{ color: '#ef4444', fontSize: '12px', marginTop: '4px' }}>
                {fieldErrors.email}
              </span>
            )}
          </div>
        </div>

        <div className="careers-v2-form-row">
          <div className="careers-v2-form-field">
            <label htmlFor="career-phone">Phone Number *</label>
            <div className={`career-phone-wrap ${fieldErrors.phone ? 'has-error' : ''}`}>
              <select value={countryCode} onChange={handleCountryChange} className="career-country-select" aria-label="Country Code">
                {COUNTRY_CODES.map((c) => (
                  <option key={`${c.iso}-${c.code}`} value={c.code}>
                    {c.flag} {c.code} ({c.country})
                  </option>
                ))}
              </select>
              <input id="career-phone" name="phone" type="tel" required placeholder="Enter your number" value={formData.phone} onChange={handleInputChange} maxLength={countryCode === '+91' ? 10 : 15} />
            </div>
            {fieldErrors.phone && (
              <span style={{ color: '#ef4444', fontSize: '12px', marginTop: '4px' }}>
                {fieldErrors.phone}
              </span>
            )}
          </div>
          <div className="careers-v2-form-field">
            <label htmlFor="career-exp">Years of Experience *</label>
            <input id="career-exp" name="experience" type="text" required placeholder="Enter your experience" value={formData.experience} onChange={handleInputChange} style={{ borderColor: fieldErrors.experience ? '#ef4444' : undefined }} />
            {fieldErrors.experience && (
              <span style={{ color: '#ef4444', fontSize: '12px', marginTop: '4px' }}>
                {fieldErrors.experience}
              </span>
            )}
          </div>
        </div>
        <div className="careers-v2-form-field">
          <label>Resume / CV (PDF or DOCX) *</label>
          <div className="careers-v2-upload-box" onDragOver={handleDragOver} onDragLeave={handleDragLeave} onDrop={handleDrop} onClick={() => fileInputRef.current?.click()} style={{
              borderColor: isDragging ? '#2563eb' : fieldErrors.resume ? '#ef4444' : resumeFile ? '#16a34a' : undefined,
              background: isDragging ? '#eff6ff' : fieldErrors.resume ? '#fef2f2' : resumeFile ? '#f0fdf4' : undefined,
            }}
          >
            <input ref={fileInputRef} type="file" accept=".pdf,.doc,.docx" style={{ display: 'none' }} onChange={onFileInputChange} />
            {resumeFile ? (
              <div className="careers-v2-uploaded-file">
                <span className="careers-v2-file-name">📄 {resumeFile.name}</span>
                <button type="button" className="careers-v2-remove-file" onClick={removeResume} title="Remove file">✕</button>
              </div>
            ) : (
              <div className="careers-v2-upload-placeholder">
                <span className="careers-v2-upload-icon">📁</span>
                <p>
                  <strong>Click to upload</strong> or drag & drop your resume here
                </p>
                <small>PDF or DOCX (Max size: 10MB)</small>
              </div>
            )}
          </div>
          {fieldErrors.resume && (
            <span style={{ color: '#ef4444', fontSize: '12px', marginTop: '4px' }}>
              {fieldErrors.resume}
            </span>
          )}
        </div>
        <div className="careers-v2-modal-actions">
          {/* <button type="button" className="careers-v2-btn-cancel" onClick={onClose}>Cancel</button> */}
          <button type="submit" className="careers-v2-btn-submit" disabled={isSubmitting}>
            {isSubmitting ? 'Submitting...' : 'Submit Application'}
          </button>
        </div>
      </form>
    </>
  );
}