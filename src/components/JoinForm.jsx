import React, { useState, useEffect, useRef } from 'react';
import { Send, CheckCircle, AlertCircle, Loader2, Check, Sparkles, Settings, ExternalLink, X } from 'lucide-react';
import { COMMUNITY_INFO, DEPARTMENTS } from '../data/communityData';

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
    message: ''
  });

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMessage('');

    try {
      const formPayload = new FormData();
      
      // Fields aligned with Google Sheets Apps Script
      formPayload.append('fullName', formData.fullName);
      formPayload.append('name', formData.fullName); // backwards compatibility
      formPayload.append('rollNo', formData.rollNo);
      formPayload.append('email', formData.email);
      formPayload.append('branch', formData.branch);
      formPayload.append('year', formData.year);
      formPayload.append('guild', formData.guild);
      formPayload.append('club', formData.guild); // backwards compatibility
      formPayload.append('interests', formData.interests);
      formPayload.append('portfolio', formData.portfolio || 'N/A');
      formPayload.append('message', formData.message || 'N/A');
      formPayload.append('collegeCode', COMMUNITY_INFO.collegeCode || '1215');

      // Submit to Google Apps Script endpoint in no-cors mode
      await fetch(endpointUrl, {
        method: 'POST',
        body: formPayload,
        mode: 'no-cors'
      });

      setStatus('success');
      setFormData({
        fullName: '',
        rollNo: '',
        email: '',
        branch: '',
        year: '',
        guild: '',
        interests: '',
        portfolio: '',
        message: ''
      });
    } catch (err) {
      setStatus('error');
      setErrorMessage(
        'Could not record submission. Please check your internet connection or email us directly at ' +
          COMMUNITY_INFO.officialEmail
      );
    }
  };

  return (
    <section id="join" className="section">
      <div className="container">
        <div className="join-grid">
          <div className="join-info">
            <span className="section-tag">Track Registration</span>
            <h2>Join a Technical Track at SAREC Mirzapur</h2>
            <p className="join-info-p">
              Whether you are writing your first line of code or deploying complex full-stack systems,
              STIC provides regular lab access, peer code reviews, and project collaboration.
            </p>

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

            <div style={{ marginTop: '2rem' }}>
              <button
                type="button"
                className="btn btn-ghost btn-sm"
                onClick={() => {
                  setCustomEndpointInput(endpointUrl);
                  setShowEndpointModal(true);
                }}
                style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)', border: '1px solid var(--border-subtle)' }}
              >
                <Settings size={12} strokeWidth={1.5} />
                <span>Google Apps Script Endpoint Settings</span>
              </button>
            </div>
          </div>

          <div className="form-card">
            {status === 'success' && (
              <div className="form-status-banner success" role="alert">
                <CheckCircle size={18} strokeWidth={1.5} />
                <span>Your registration has been submitted. Check your email for track onboarding details.</span>
              </div>
            )}

            {status === 'error' && (
              <div className="form-status-banner error" role="alert">
                <AlertCircle size={18} strokeWidth={1.5} />
                <span>{errorMessage}</span>
              </div>
            )}

            <form onSubmit={handleSubmit}>
              {/* Full Name */}
              <div className="floating-group">
                <input
                  id="fullName"
                  name="fullName"
                  type="text"
                  className="floating-input"
                  placeholder=" "
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                />
                <label htmlFor="fullName" className="floating-label">
                  Full Name
                </label>
              </div>

              {/* College Roll No / Student ID & Email Row */}
              <div className="form-group form-row-2">
                <div className="floating-group" style={{ marginBottom: 0 }}>
                  <input
                    id="rollNo"
                    name="rollNo"
                    type="text"
                    className="floating-input"
                    placeholder=" "
                    value={formData.rollNo}
                    onChange={handleChange}
                    required
                  />
                  <label htmlFor="rollNo" className="floating-label">
                    Roll No / Student ID
                  </label>
                </div>

                <div className="floating-group" style={{ marginBottom: 0 }}>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    className="floating-input"
                    placeholder=" "
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                  <label htmlFor="email" className="floating-label">
                    College / Personal Email
                  </label>
                </div>
              </div>

              {/* Branch & Year Row */}
              <div className="form-group form-row-2">
                <div>
                  <label htmlFor="branch" className="form-label">
                    Branch / Department
                  </label>
                  <select
                    id="branch"
                    name="branch"
                    className="form-select"
                    value={formData.branch}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select Department</option>
                    {DEPARTMENTS.map((dept) => (
                      <option key={dept.code} value={dept.code}>
                        {dept.code} ({dept.name})
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label htmlFor="year" className="form-label">
                    Year of Study
                  </label>
                  <select
                    id="year"
                    name="year"
                    className="form-select"
                    value={formData.year}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select Year</option>
                    <option value="1st Year">1st Year</option>
                    <option value="2nd Year">2nd Year</option>
                    <option value="3rd Year">3rd Year</option>
                    <option value="4th Year">4th Year</option>
                  </select>
                </div>
              </div>

              {/* Primary Club Guild with Auto-Selection Pulse Glow */}
              <div className="form-group">
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.45rem' }}>
                  <label htmlFor="guild" className="form-label" style={{ marginBottom: 0 }}>
                    Primary Technology Guild
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
                  className={`form-select ${glowGuild ? 'guild-glow-active' : ''}`}
                  value={formData.guild}
                  onChange={handleChange}
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
              </div>

              {/* Specific Interests & Portfolio URL Row */}
              <div className="form-group form-row-2">
                <div>
                  <label htmlFor="interests" className="form-label">
                    Specific Technical Domain
                  </label>
                  <select
                    id="interests"
                    name="interests"
                    className="form-select"
                    value={formData.interests}
                    onChange={handleChange}
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
                  placeholder="Share any languages you know, tools you want to master, or project ideas..."
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
                Submissions are sent directly to the STIC organizing team Google Sheet. Your information is strictly used for campus club communications.
              </p>
            </form>
          </div>
        </div>
      </div>

      {/* Endpoint Configuration Drawer / Modal */}
      {showEndpointModal && (
        <div 
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0, 0, 0, 0.7)',
            backdropFilter: 'blur(8px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
            padding: '1rem'
          }}
        >
          <div className="form-card" style={{ maxWidth: '520px', width: '100%' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
              <h3 style={{ fontSize: 'var(--step-0)', fontWeight: 700, color: 'var(--text)' }}>
                Google Apps Script Web App URL
              </h3>
              <button 
                type="button" 
                className="btn-icon" 
                onClick={() => setShowEndpointModal(false)}
                aria-label="Close"
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
