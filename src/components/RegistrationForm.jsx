import React, { useState } from 'react';
import './RegistrationForm.css';
import { saveRegistrationToFirestore } from '../firebase';
import {
  validateSafeUrl,
  sanitizeForSpreadsheet,
  sanitizeText,
  checkSubmissionRateLimit,
  recordSubmissionTimestamp
} from '../utils/security';

const ALLOWED_BRANCHES = ['CSE', 'IT', 'EL', 'EE', 'Other'];
const ALLOWED_YEARS = ['1st Year', '2nd Year', '3rd Year', '4th Year'];

export default function RegistrationForm() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    college: '',
    branch: '',
    year: '',
    github: '',
    interests: [],
    hp_field: '' // Bot honeypot trap
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleBackHome = (e) => {
    if (e) e.preventDefault();
    window.history.pushState({}, '', '/');
    window.dispatchEvent(new PopStateEvent('popstate'));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Handle text fields and dropdowns
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle interest checkboxes
  const handleInterestChange = (e) => {
    const { value, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      interests: checked
        ? [...prev.interests, value]
        : prev.interests.filter((item) => item !== value),
    }));
  };

  // Submit registration with cybersecurity defenses
  const handleSubmit = async (e) => {
    e.preventDefault();

    // 1. Bot Honeypot Defense: Silently neutralize automated bot scrapers
    if (formData.hp_field) {
      setSubmitted(true);
      return;
    }

    // 2. Client-Side Rate Limiter: Prevent automated flood / DoS spamming
    const rateCheck = checkSubmissionRateLimit('stic_reg_cooldown', 15000);
    if (!rateCheck.allowed) {
      setError(`Please wait ${rateCheck.remainingSeconds}s before submitting again.`);
      return;
    }

    setLoading(true);
    setError('');

    try {
      const cleanName = sanitizeText(formData.fullName, 100);
      const cleanEmail = sanitizeText(formData.email, 120).toLowerCase();
      const cleanPhone = sanitizeText(formData.phone, 10);
      const cleanCollege = sanitizeText(formData.college, 120);
      const cleanGithub = sanitizeText(formData.github, 200);

      // Validation bounds
      if (cleanName.length < 2) {
        throw new Error('Please enter a valid full name.');
      }

      const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*\.[a-zA-Z]{2,24}$/;
      if (!emailRegex.test(cleanEmail)) {
        throw new Error('Please enter a valid email address.');
      }

      if (!/^[0-9]{10}$/.test(cleanPhone)) {
        throw new Error('Please enter a valid 10-digit mobile number.');
      }

      if (!ALLOWED_BRANCHES.includes(formData.branch)) {
        throw new Error('Please select a valid branch.');
      }

      if (!ALLOWED_YEARS.includes(formData.year)) {
        throw new Error('Please select your academic year.');
      }

      // 3. GitHub Profile URL Safety & SSRF / Executable Sideloading Guard
      if (cleanGithub) {
        const urlValidation = validateSafeUrl(cleanGithub);
        if (!urlValidation.valid) {
          throw new Error(urlValidation.error || 'Please provide a valid, safe HTTP/HTTPS profile URL.');
        }
      }

      // 4. Formula & CSV Injection Prevention (CWE-1236)
      const registrationData = {
        fullName: sanitizeForSpreadsheet(cleanName),
        email: sanitizeForSpreadsheet(cleanEmail),
        phone: sanitizeForSpreadsheet(cleanPhone),
        college: sanitizeForSpreadsheet(cleanCollege),
        branch: formData.branch,
        year: formData.year,
        github: cleanGithub ? sanitizeForSpreadsheet(cleanGithub) : 'N/A',
        interests: formData.interests.map(i => sanitizeForSpreadsheet(sanitizeText(i, 50))),
      };

      const registrationId = await saveRegistrationToFirestore(registrationData);

      if (!registrationId) {
        throw new Error('Registration could not be recorded. Please try again.');
      }

      // Record successful submission timestamp for rate limiting
      recordSubmissionTimestamp('stic_reg_cooldown');
      setSubmitted(true);
    } catch (err) {
      setError(err?.message || 'Registration failed. Please check details and try again.');
    } finally {
      setLoading(false);
    }
  };

  // Registration success screen (Minimal & Clean)
  if (submitted) {
    return (
      <section className="registration-page">
        <div className="registration-container">
          <div className="registration-success">
            <h2>Registration Received</h2>

            <p>
              Your details have been securely recorded. We look forward to seeing you at our lab sessions.
            </p>

            <button
              type="button"
              className="registration-submit"
              onClick={() => {
                setSubmitted(false);
                setFormData({
                  fullName: '',
                  email: '',
                  phone: '',
                  college: '',
                  branch: '',
                  year: '',
                  github: '',
                  interests: [],
                  hp_field: ''
                });
                setError('');
              }}
            >
              Register Another Student
            </button>

            <a href="/" className="registration-back" onClick={handleBackHome}>
              ← Back to Home
            </a>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="registration-page">
      <div className="registration-container">
        <a href="/" className="registration-back" onClick={handleBackHome}>
          ← Back to Home
        </a>

        <div className="registration-heading">
          <span className="registration-tag">
            STIC · SAREC MIRZAPUR
          </span>

          <h1>
            Student <span>Registration</span>
          </h1>

          <p>
            Join technical tracks, project sprints, and open-source contributions.
          </p>
        </div>

        <form
          className="registration-form"
          onSubmit={handleSubmit}
        >
          {/* Honeypot anti-bot trap */}
          <input
            type="text"
            name="hp_field"
            value={formData.hp_field}
            onChange={handleChange}
            tabIndex={-1}
            autoComplete="off"
            aria-hidden="true"
            style={{ position: 'absolute', left: '-9999px', opacity: 0, pointerEvents: 'none' }}
          />

          <h2>Student Details</h2>

          <p className="registration-form-note">
            Required fields marked *
          </p>

          <div className="registration-grid">
            {/* Full Name */}
            <label>
              Full Name *
              <input
                type="text"
                name="fullName"
                placeholder="Enter your full name"
                value={formData.fullName}
                onChange={handleChange}
                autoComplete="name"
                maxLength={100}
                required
              />
            </label>

            {/* Email */}
            <label>
              Email Address *
              <input
                type="email"
                name="email"
                placeholder="you@example.com"
                value={formData.email}
                onChange={handleChange}
                autoComplete="email"
                maxLength={254}
                required
              />
            </label>

            {/* Phone */}
            <label>
              Phone Number *
              <input
                type="tel"
                name="phone"
                placeholder="10-digit mobile number"
                value={formData.phone}
                onChange={handleChange}
                pattern="[0-9]{10}"
                maxLength={10}
                autoComplete="tel"
                required
              />
            </label>

            {/* College */}
            <label>
              College Name *
              <input
                type="text"
                name="college"
                placeholder="Enter your college name"
                value={formData.college}
                onChange={handleChange}
                maxLength={150}
                required
              />
            </label>

            {/* Branch */}
            <label>
              Branch *
              <select
                name="branch"
                value={formData.branch}
                onChange={handleChange}
                required
              >
                <option value="">Select your branch</option>
                <option value="CSE">
                  Computer Science (CSE)
                </option>
                <option value="IT">
                  Information Technology (IT)
                </option>
                <option value="EL">EL</option>
                <option value="EE">EE</option>
                <option value="Other">Other</option>
              </select>
            </label>

            {/* Year */}
            <label>
              Year of Study *
              <select
                name="year"
                value={formData.year}
                onChange={handleChange}
                required
              >
                <option value="">Select your year</option>
                <option value="1st Year">1st Year</option>
                <option value="2nd Year">2nd Year</option>
                <option value="3rd Year">3rd Year</option>
                <option value="4th Year">4th Year</option>
              </select>
            </label>

            {/* GitHub */}
            <label className="registration-full-width">
              GitHub Profile (Optional)
              <input
                type="url"
                name="github"
                placeholder="https://github.com/yourusername"
                value={formData.github}
                onChange={handleChange}
                maxLength={300}
              />
            </label>
          </div>

          {/* Interests */}
          <fieldset className="registration-interests">
            <legend>Areas of Interest *</legend>

            <div className="registration-options">
              {[
                'Git & GitHub',
                'Open Source',
                'Web Development',
                'Mobile App Dev',
                'DSA & Competitive Programming',
                'SIH & GSoC',
              ].map((interest) => (
                <label
                  key={interest}
                  className="registration-option"
                >
                  <input
                    type="checkbox"
                    value={interest}
                    checked={formData.interests.includes(interest)}
                    onChange={handleInterestChange}
                  />

                  <span>{interest}</span>
                </label>
              ))}
            </div>
          </fieldset>

          {/* Require at least one interest */}
          {formData.interests.length === 0 && (
            <p className="registration-form-note">
              Please select at least one area of interest.
            </p>
          )}

          {/* Error message */}
          {error && (
            <p role="alert" className="registration-form-note">
              {error}
            </p>
          )}

          {/* Submit */}
          <button
            type="submit"
            className="registration-submit"
            disabled={loading || formData.interests.length === 0}
          >
            {loading ? 'Submitting...' : 'Register →'}
          </button>

          <p className="registration-privacy">
            Your details are securely handled for community participation.
          </p>
        </form>
      </div>
    </section>
  );
}
