import React, { useState, useEffect, useRef } from 'react';
import { 
  Send, 
  CheckCircle2, 
  AlertCircle, 
  Loader2, 
  Check, 
  Sparkles, 
  Settings, 
  ExternalLink, 
  X, 
  Mail, 
  MessageSquare, 
  RefreshCw, 
  ArrowRight,
  Phone,
  Eye,
  EyeOff,
  Copy,
  KeyRound,
  Compass
} from 'lucide-react';
import { COMMUNITY_INFO, DEPARTMENTS } from '../data/communityData';
import ConfirmModal from './ConfirmModal';

export default function JoinForm({ selectedClub }) {
  const [formData, setFormData] = useState({
    fullName: '',
    rollNo: '',
    email: '',
    branch: '',
    year: '',
    guild: '',
    interests: '',
    portfolio: '',
    message: '',
    referralKey: ''
  });

  const [fieldErrors, setFieldErrors] = useState({});
  const [submittedData, setSubmittedData] = useState(null);
  const [showReferralKey, setShowReferralKey] = useState(false);
  const [showEndpointKey, setShowEndpointKey] = useState(false);
  const [customEndpointKey, setCustomEndpointKey] = useState('');
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);

  // UTM tracking state
  const [utmData, setUtmData] = useState({
    source: '',
    medium: '',
    campaign: ''
  });

  useEffect(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      const source = params.get('utm_source') || '';
      const medium = params.get('utm_medium') || '';
      const campaign = params.get('utm_campaign') || '';
      if (source || medium || campaign) {
        setUtmData({ source, medium, campaign });
      }
    } catch {}
  }, []);

  const [endpointUrl, setEndpointUrl] = useState(() => {
    try {
      return localStorage.getItem('stic_apps_script_url') || COMMUNITY_INFO.formEndpoint;
    } catch {
      return COMMUNITY_INFO.formEndpoint;
    }
  });

  const [showEndpointModal, setShowEndpointModal] = useState(false);
  const [customEndpointInput, setCustomEndpointInput] = useState('');
  const [status, setStatus] = useState('idle'); // 'idle' | 'loading' | 'success' | 'error'
  const [errorMessage, setErrorMessage] = useState('');
  const [glowGuild, setGlowGuild] = useState(false);
  const clubSelectRef = useRef(null);

  // Update club selection if passed from parent with active glow indicator
  useEffect(() => {
    if (selectedClub) {
      setFormData(prev => ({ ...prev, guild: selectedClub }));
      setFieldErrors(prev => ({ ...prev, guild: '' }));
      setGlowGuild(true);

      const timer = setTimeout(() => {
        setGlowGuild(false);
      }, 2200);

      if (clubSelectRef.current) {
        clubSelectRef.current.focus();
      }

      return () => clearTimeout(timer);
    }
  }, [selectedClub]);

  // Handle Escape key for modal
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && showEndpointModal) {
        setShowEndpointModal(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [showEndpointModal]);

  const validateField = (name, value) => {
    switch (name) {
      case 'fullName':
        if (!value.trim()) return 'Full name is required.';
        if (value.trim().length < 2) return 'Name must be at least 2 characters.';
        return '';
      case 'rollNo':
        if (!value.trim()) return 'Roll number / Student ID is required.';
        if (value.trim().length < 3) return 'Enter a valid roll number.';
        return '';
      case 'email':
        if (!value.trim()) return 'Email is required.';
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim())) return 'Please enter a valid email address.';
        return '';
      case 'branch':
        if (!value) return 'Please select your department.';
        return '';
      case 'year':
        if (!value) return 'Please select your academic year.';
        return '';
      case 'guild':
        if (!value) return 'Please select a primary technology guild.';
        return '';
      case 'interests':
        if (!value) return 'Please choose your specific domain interest.';
        return '';
      default:
        return '';
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    if (fieldErrors[name]) {
      setFieldErrors(prev => ({ ...prev, [name]: validateField(name, value) }));
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    const error = validateField(name, value);
    if (error) {
      setFieldErrors(prev => ({ ...prev, [name]: error }));
    }
  };

  const handleCopyCollegeCode = () => {
    navigator.clipboard.writeText('1215');
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const handleSaveEndpoint = (e) => {
    e.preventDefault();
    if (customEndpointInput.trim()) {
      setEndpointUrl(customEndpointInput.trim());
      try {
        localStorage.setItem('stic_apps_script_url', customEndpointInput.trim());
      } catch {}
    }
    setShowEndpointModal(false);
  };

  const handleResetEndpoint = () => {
    setEndpointUrl(COMMUNITY_INFO.formEndpoint);
    setCustomEndpointInput('');
    try {
      localStorage.removeItem('stic_apps_script_url');
    } catch {}
    setShowEndpointModal(false);
  };

  // Called when user clicks "Submit Track Registration"
  const handlePreSubmit = (e) => {
    e.preventDefault();

    const errors = {};
    const requiredFields = ['fullName', 'rollNo', 'email', 'branch', 'year', 'guild', 'interests'];
    requiredFields.forEach(field => {
      const error = validateField(field, formData[field]);
      if (error) errors[field] = error;
    });

    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      setStatus('error');
      setErrorMessage('Please fix the highlighted fields before proceeding.');
      return;
    }

    // Open confirmation modal
    setShowConfirmModal(true);
  };

  // Called after confirmation in modal
  const handleConfirmedSubmit = async () => {
    setShowConfirmModal(false);
    setStatus('loading');
    setErrorMessage('');

    try {
      const formPayload = new FormData();
      
      formPayload.append('fullName', formData.fullName.trim());
      formPayload.append('name', formData.fullName.trim());
      formPayload.append('rollNo', formData.rollNo.trim());
      formPayload.append('email', formData.email.trim());
      formPayload.append('branch', formData.branch);
      formPayload.append('year', formData.year);
      formPayload.append('guild', formData.guild);
      formPayload.append('club', formData.guild);
      formPayload.append('interests', formData.interests);
      formPayload.append('portfolio', formData.portfolio.trim() || 'N/A');
      formPayload.append('message', formData.message.trim() || 'N/A');
      formPayload.append('referralKey', formData.referralKey.trim() || 'N/A');
      formPayload.append('collegeCode', COMMUNITY_INFO.collegeCode || '1215');

      // UTM parameters
      formPayload.append('utmSource', utmData.source || 'direct');
      formPayload.append('utmMedium', utmData.medium || 'web');
      formPayload.append('utmCampaign', utmData.campaign || 'general');

      // Submit to Google Apps Script endpoint in no-cors mode
      await fetch(endpointUrl, {
        method: 'POST',
        body: formPayload,
        mode: 'no-cors'
      });

      setSubmittedData({
        name: formData.fullName.trim(),
        email: formData.email.trim(),
        guild: formData.guild,
        branch: formData.branch,
        year: formData.year
      });

      setStatus('success');
      setFieldErrors({});
      setFormData({
        fullName: '',
        rollNo: '',
        email: '',
        branch: '',
        year: '',
        guild: '',
        interests: '',
        portfolio: '',
        message: '',
        referralKey: ''
      });
    } catch (err) {
      setStatus('error');
      setErrorMessage(
        'Could not complete submission due to network latency. Please check your internet connection or email us directly at ' +
          COMMUNITY_INFO.officialEmail
      );
    }
  };

  const resetFormState = () => {
    setStatus('idle');
    setErrorMessage('');
    setSubmittedData(null);
  };

  return (
    <section id="join" className="section">
      <div className="container">
        <div className="join-grid">
          {/* Information & Benefits Column */}
          <div className="join-info">
            <span className="section-tag">Track Registration</span>
            <h2>Join a Technical Track at SAREC Mirzapur</h2>
            <p className="join-info-p">
              Whether you are writing your first line of code or deploying complex full-stack systems,
              STIC provides regular lab access, peer code reviews, and project collaboration.
            </p>

            {/* UTM Tag Detection Indicator */}
            {utmData.source && (
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.45rem', padding: '0.35rem 0.8rem', background: 'rgba(99, 102, 241, 0.12)', border: '1px solid rgba(99, 102, 241, 0.35)', borderRadius: '9999px', fontSize: '0.78rem', color: 'var(--primary)', marginBottom: '1.25rem' }}>
                <Compass size={13} strokeWidth={2} />
                <span>Referred via campaign: <strong>{utmData.source}</strong> ({utmData.campaign || 'general'})</span>
              </div>
            )}

            <ul className="join-bullets">
              <li className="join-bullet-item">
                <Check size={16} strokeWidth={1.5} className="bullet-icon" />
                <span>Open to all academic years and engineering branches at SAREC Mirzapur.</span>
              </li>
              <li className="join-bullet-item">
                <Check size={16} strokeWidth={1.5} className="bullet-icon" />
                <span>Physical access to weekly weekend lab sprints and mentor office hours.</span>
              </li>
              <li className="join-bullet-item">
                <Check size={16} strokeWidth={1.5} className="bullet-icon" />
                <span>Eligibility for campus hackathon teams, Season of Code, and open-source sprints.</span>
              </li>
              <li className="join-bullet-item">
                <Check size={16} strokeWidth={1.5} className="bullet-icon" />
                <span>Completely student-operated with zero registration charges or fees.</span>
              </li>
            </ul>

            <div style={{ marginTop: '2rem', display: 'flex', gap: '0.65rem', flexWrap: 'wrap', alignItems: 'center' }}>
              <button
                type="button"
                className="btn btn-secondary btn-sm"
                onClick={handleCopyCollegeCode}
                title="Copy AKTU College Code"
                style={{ fontSize: '0.8rem' }}
              >
                <Copy size={13} strokeWidth={1.8} />
                <span>{copiedCode ? 'Copied Code 1215!' : 'Copy College Code (1215)'}</span>
              </button>

              <a
                href={`mailto:${COMMUNITY_INFO.officialEmail}`}
                className="btn btn-secondary btn-sm"
                style={{ fontSize: '0.8rem' }}
              >
                <Mail size={14} strokeWidth={1.5} />
                <span>Email: {COMMUNITY_INFO.officialEmail}</span>
              </a>

              <button
                type="button"
                className="btn btn-ghost btn-sm"
                onClick={() => {
                  setCustomEndpointInput(endpointUrl);
                  setShowEndpointModal(true);
                }}
                style={{ fontSize: '0.78rem' }}
                title="Configure Google Apps Script Web App Endpoint URL"
                aria-label="Configure Google Apps Script Endpoint URL"
              >
                <Settings size={13} strokeWidth={1.5} />
                <span>Sheet Endpoint</span>
              </button>
            </div>
          </div>

          {/* Form / Success Card Column */}
          <div className="form-card">
            {status === 'success' && submittedData ? (
              <div className="registration-success-card" role="alert">
                <div className="success-icon-badge">
                  <CheckCircle2 size={36} strokeWidth={1.8} style={{ color: 'var(--success)' }} />
                </div>

                <h3 className="success-heading">Registration Confirmed!</h3>
                <p className="success-subheading">
                  Welcome aboard, <strong>{submittedData.name}</strong>! Your application for the{' '}
                  <span className="success-track-pill">{submittedData.guild}</span> has been recorded.
                </p>

                <div className="success-checklist">
                  <div className="success-step">
                    <span className="step-num">1</span>
                    <p>
                      Check your email (<strong>{submittedData.email}</strong>) for lab workspace invitations and orientation schedules.
                    </p>
                  </div>
                  <div className="success-step">
                    <span className="step-num">2</span>
                    <p>
                      Join the official WhatsApp community group for real-time announcements.
                    </p>
                  </div>
                  <div className="success-step">
                    <span className="step-num">3</span>
                    <p>
                      Visit the next weekend build sprint in the SAREC Central Computer Lab.
                    </p>
                  </div>
                </div>

                <div className="success-action-row">
                  <a
                    href="https://wa.me/919451501321?text=Hi%20STIC%20Team%2C%20I%20just%20submitted%20my%20registration%20for%20STIC."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-primary"
                    style={{ flex: 1 }}
                  >
                    <MessageSquare size={16} strokeWidth={1.5} />
                    <span>Join WhatsApp Community</span>
                  </a>

                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={resetFormState}
                  >
                    <RefreshCw size={14} strokeWidth={1.5} />
                    <span>Submit Another</span>
                  </button>
                </div>
              </div>
            ) : (
              <>
                {status === 'error' && (
                  <div className="form-status-banner error" role="alert">
                    <AlertCircle size={20} strokeWidth={1.8} style={{ flexShrink: 0 }} />
                    <div style={{ flex: 1 }}>
                      <strong>Submission Notice:</strong> {errorMessage}
                      <div style={{ marginTop: '0.4rem', fontSize: '0.8rem' }}>
                        Need help? Email us directly at{' '}
                        <a
                          href={`mailto:${COMMUNITY_INFO.officialEmail}`}
                          style={{ textDecoration: 'underline', color: 'inherit', fontWeight: 600 }}
                        >
                          {COMMUNITY_INFO.officialEmail}
                        </a>
                      </div>
                    </div>
                  </div>
                )}

                <form onSubmit={handlePreSubmit} noValidate>
                  {/* Full Name */}
                  <div className="floating-group">
                    <input
                      id="fullName"
                      name="fullName"
                      type="text"
                      className={`floating-input ${fieldErrors.fullName ? 'input-error' : ''}`}
                      placeholder=" "
                      value={formData.fullName}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      required
                    />
                    <label htmlFor="fullName" className="floating-label">
                      Full Name *
                    </label>
                    {fieldErrors.fullName && (
                      <span className="field-error-text">
                        <AlertCircle size={12} strokeWidth={1.5} />
                        {fieldErrors.fullName}
                      </span>
                    )}
                  </div>

                  {/* College Roll No / Student ID & Email Row */}
                  <div className="form-group form-row-2">
                    <div className="floating-group" style={{ marginBottom: 0 }}>
                      <input
                        id="rollNo"
                        name="rollNo"
                        type="text"
                        className={`floating-input ${fieldErrors.rollNo ? 'input-error' : ''}`}
                        placeholder=" "
                        value={formData.rollNo}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        required
                      />
                      <label htmlFor="rollNo" className="floating-label">
                        Roll No / Student ID *
                      </label>
                      {fieldErrors.rollNo && (
                        <span className="field-error-text">
                          <AlertCircle size={12} strokeWidth={1.5} />
                          {fieldErrors.rollNo}
                        </span>
                      )}
                    </div>

                    <div className="floating-group" style={{ marginBottom: 0 }}>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        className={`floating-input ${fieldErrors.email ? 'input-error' : ''}`}
                        placeholder=" "
                        value={formData.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        required
                      />
                      <label htmlFor="email" className="floating-label">
                        College / Personal Email *
                      </label>
                      {fieldErrors.email && (
                        <span className="field-error-text">
                          <AlertCircle size={12} strokeWidth={1.5} />
                          {fieldErrors.email}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Branch & Year Row */}
                  <div className="form-group form-row-2">
                    <div>
                      <label htmlFor="branch" className="form-label">
                        Branch / Department *
                      </label>
                      <select
                        id="branch"
                        name="branch"
                        className={`form-select ${fieldErrors.branch ? 'input-error' : ''}`}
                        value={formData.branch}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        required
                      >
                        <option value="">Select Department</option>
                        {DEPARTMENTS.map((dept) => (
                          <option key={dept.code} value={dept.code}>
                            {dept.code} ({dept.name})
                          </option>
                        ))}
                      </select>
                      {fieldErrors.branch && (
                        <span className="field-error-text">
                          <AlertCircle size={12} strokeWidth={1.5} />
                          {fieldErrors.branch}
                        </span>
                      )}
                    </div>

                    <div>
                      <label htmlFor="year" className="form-label">
                        Year of Study *
                      </label>
                      <select
                        id="year"
                        name="year"
                        className={`form-select ${fieldErrors.year ? 'input-error' : ''}`}
                        value={formData.year}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        required
                      >
                        <option value="">Select Year</option>
                        <option value="1st Year">1st Year</option>
                        <option value="2nd Year">2nd Year</option>
                        <option value="3rd Year">3rd Year</option>
                        <option value="4th Year">4th Year</option>
                      </select>
                      {fieldErrors.year && (
                        <span className="field-error-text">
                          <AlertCircle size={12} strokeWidth={1.5} />
                          {fieldErrors.year}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Primary Club Guild with Auto-Selection Pulse Glow */}
                  <div className="form-group">
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.45rem' }}>
                      <label htmlFor="guild" className="form-label" style={{ marginBottom: 0 }}>
                        Primary Technology Guild *
                      </label>
                      {glowGuild && (
                        <span style={{ fontSize: '0.72rem', color: 'var(--primary)', display: 'inline-flex', alignItems: 'center', gap: '0.3rem', fontWeight: 600 }}>
                          <Sparkles size={12} strokeWidth={1.5} />
                          Track Selected
                        </span>
                      )}
                    </div>
                    <select
                      ref={clubSelectRef}
                      id="guild"
                      name="guild"
                      className={`form-select ${glowGuild ? 'guild-glow-active' : ''} ${fieldErrors.guild ? 'input-error' : ''}`}
                      value={formData.guild}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      required
                    >
                      <option value="">Select a Primary Guild</option>
                      <option value="Web & Mobile Guild">Web &amp; Mobile Dev</option>
                      <option value="AI/ML Syndicate">AI &amp; Data Science</option>
                      <option value="STIC Coding Guild">STIC Coding &amp; CP Guild</option>
                      <option value="RoboTech & Automation">RoboTech &amp; IoT</option>
                      <option value="CyberSec Guild">Cyber Security</option>
                      <option value="Open Source SAREC">Open Source SAREC</option>
                      <option value="Pixels UI/UX Guild">Pixels UI/UX</option>
                      <option value="E-Cell & Innovation">E-Cell &amp; Tech Innovation</option>
                    </select>
                    {fieldErrors.guild && (
                      <span className="field-error-text">
                        <AlertCircle size={12} strokeWidth={1.5} />
                        {fieldErrors.guild}
                      </span>
                    )}
                  </div>

                  {/* Specific Interests & Portfolio URL Row */}
                  <div className="form-group form-row-2">
                    <div>
                      <label htmlFor="interests" className="form-label">
                        Specific Technical Domain *
                      </label>
                      <select
                        id="interests"
                        name="interests"
                        className={`form-select ${fieldErrors.interests ? 'input-error' : ''}`}
                        value={formData.interests}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        required
                      >
                        <option value="">Choose domain focus</option>
                        <option value="Full-Stack Web">Full-Stack Web Development</option>
                        <option value="Machine Learning">Machine Learning &amp; AI</option>
                        <option value="Competitive Programming">Competitive Programming &amp; DSA</option>
                        <option value="Robotics & IoT">Robotics, Arduino &amp; IoT</option>
                        <option value="Cyber Security">Cyber Security &amp; CTFs</option>
                        <option value="Open Source">Open Source Contributions</option>
                        <option value="UI/UX Prototyping">UI/UX Design Systems</option>
                      </select>
                      {fieldErrors.interests && (
                        <span className="field-error-text">
                          <AlertCircle size={12} strokeWidth={1.5} />
                          {fieldErrors.interests}
                        </span>
                      )}
                    </div>

                    <div className="floating-group" style={{ marginBottom: 0, marginTop: '1.6rem' }}>
                      <input
                        id="portfolio"
                        name="portfolio"
                        type="url"
                        className="floating-input"
                        placeholder=" "
                        value={formData.portfolio}
                        onChange={handleChange}
                      />
                      <label htmlFor="portfolio" className="floating-label">
                        GitHub / Portfolio URL (Optional)
                      </label>
                    </div>
                  </div>

                  {/* Password / Mentor Referral Key with Visibility Toggle */}
                  <div className="form-group">
                    <label htmlFor="referralKey" className="form-label" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}>
                        <KeyRound size={13} strokeWidth={1.8} />
                        <span>Mentor Referral / Laboratory Passcode (Optional)</span>
                      </span>
                    </label>
                    <div style={{ position: 'relative' }}>
                      <input
                        id="referralKey"
                        name="referralKey"
                        type={showReferralKey ? "text" : "password"}
                        className="form-input"
                        style={{ paddingRight: '2.5rem' }}
                        placeholder="Enter mentor code if referred by a senior or faculty..."
                        value={formData.referralKey}
                        onChange={handleChange}
                      />
                      <button
                        type="button"
                        onClick={() => setShowReferralKey(!showReferralKey)}
                        style={{ position: 'absolute', right: '0.75rem', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', color: 'var(--text-tertiary)', cursor: 'pointer', padding: '0.25rem' }}
                        aria-label={showReferralKey ? "Hide passcode" : "Show passcode"}
                        title={showReferralKey ? "Hide passcode" : "Show passcode"}
                      >
                        {showReferralKey ? <EyeOff size={16} /> : <Eye size={16} />}
                      </button>
                    </div>
                  </div>

                  {/* Goals / Message */}
                  <div className="form-group">
                    <label htmlFor="message" className="form-label">
                      Goals or Project Ideas (Optional)
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={2}
                      className="form-textarea"
                      placeholder="Share languages you know, tools you want to master, or project concepts..."
                      value={formData.message}
                      onChange={handleChange}
                    />
                  </div>

                  <button
                    type="submit"
                    className="btn btn-primary"
                    style={{ width: '100%', padding: '0.85rem' }}
                    disabled={status === 'loading'}
                  >
                    {status === 'loading' ? (
                      <>
                        <Loader2 size={16} strokeWidth={1.5} className="animate-spin" />
                        <span>Submitting Application...</span>
                      </>
                    ) : (
                      <>
                        <span>Submit Track Registration</span>
                        <Send size={15} strokeWidth={1.5} />
                      </>
                    )}
                  </button>

                  <p className="form-notice">
                    Submissions are recorded in the official STIC Google Sheet. Your data is strictly used for SAREC campus club communications.
                  </p>
                </form>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Confirmation Modal */}
      <ConfirmModal
        isOpen={showConfirmModal}
        title="Confirm Track Application"
        message="Please review your details before submitting to the STIC organizing committee:"
        details={{
          "Student Name": formData.fullName,
          "Roll Number": formData.rollNo,
          "Email Address": formData.email,
          "Department": formData.branch,
          "Year of Study": formData.year,
          "Primary Guild": formData.guild,
          "Domain Focus": formData.interests
        }}
        confirmLabel="Confirm & Submit"
        cancelLabel="Review & Edit"
        onConfirm={handleConfirmedSubmit}
        onCancel={() => setShowConfirmModal(false)}
      />

      {/* Endpoint Configuration Modal */}
      {showEndpointModal && (
        <div 
          className="modal-backdrop-overlay"
          onClick={() => setShowEndpointModal(false)}
          role="dialog"
          aria-modal="true"
          aria-labelledby="endpointModalTitle"
        >
          <div 
            className="form-card modal-dialog-box" 
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
              <h3 id="endpointModalTitle" style={{ fontSize: 'var(--step-0)', fontWeight: 700, color: 'var(--text)' }}>
                Google Apps Script Web App URL
              </h3>
              <button 
                type="button" 
                className="btn-icon" 
                onClick={() => setShowEndpointModal(false)}
                aria-label="Close endpoint settings modal"
              >
                <X size={16} strokeWidth={1.5} />
              </button>
            </div>

            <p style={{ fontSize: 'var(--step--1)', color: 'var(--text-secondary)', marginBottom: '1.25rem', lineHeight: 1.5 }}>
              By default, submissions go to the official STIC Google Sheet. If you are deploying your own spreadsheet, paste your Google Apps Script Web App URL below:
            </p>

            <form onSubmit={handleSaveEndpoint}>
              <div className="form-group">
                <input
                  type="url"
                  className="form-input"
                  value={customEndpointInput}
                  onChange={(e) => setCustomEndpointInput(e.target.value)}
                  placeholder="https://script.google.com/macros/s/.../exec"
                  required
                />
              </div>

              {/* Endpoint API Secret with Password Visibility Toggle */}
              <div className="form-group">
                <label className="form-label" style={{ fontSize: '0.78rem' }}>
                  Optional Sheet API Secret Key:
                </label>
                <div style={{ position: 'relative' }}>
                  <input
                    type={showEndpointKey ? "text" : "password"}
                    className="form-input"
                    placeholder="Enter sheet authorization token..."
                    value={customEndpointKey}
                    onChange={(e) => setCustomEndpointKey(e.target.value)}
                    style={{ paddingRight: '2.5rem' }}
                  />
                  <button
                    type="button"
                    onClick={() => setShowEndpointKey(!showEndpointKey)}
                    style={{ position: 'absolute', right: '0.75rem', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', color: 'var(--text-tertiary)', cursor: 'pointer' }}
                    aria-label="Toggle secret key visibility"
                  >
                    {showEndpointKey ? <EyeOff size={15} /> : <Eye size={15} />}
                  </button>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'flex-end', marginTop: '1.25rem' }}>
                <button
                  type="button"
                  className="btn btn-secondary btn-sm"
                  onClick={handleResetEndpoint}
                >
                  Reset Default
                </button>
                <button
                  type="submit"
                  className="btn btn-primary btn-sm"
                >
                  Save Endpoint
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
}
