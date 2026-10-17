import React, { useState } from 'react';
import './RegistrationForm.css';
import { saveRegistrationToFirestore } from '../firebase';

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
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

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

  // Submit registration to Firebase
  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError('');

    try {
      const registrationData = {
        fullName: formData.fullName.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        college: formData.college.trim(),
        branch: formData.branch,
        year: formData.year,
        github: formData.github.trim(),
        interests: formData.interests,
      };

      const registrationId =
        await saveRegistrationToFirestore(registrationData);

      if (!registrationId) {
        throw new Error(
          'Registration could not be saved to Firebase.'
        );
      }

      setSubmitted(true);
    } catch (err) {
      console.error('Registration error:', err);

      setError(
        'Registration failed. Please check your internet connection and try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  // Registration success screen
  if (submitted) {
    return (
      <section className="registration-page">
        <div className="registration-container">
          <div className="registration-success">
            <h2>Thank You!</h2>

            <p>
              Your registration has been submitted successfully.
              Your details have been saved.
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
                });
                setError('');
              }}
            >
              Register Another Student
            </button>

            <a href="/" className="registration-back">
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
        <a href="/" className="registration-back">
          ← Back to Home
        </a>

        <div className="registration-heading">
          <span className="registration-tag">
            STIC · SAREC MIRZAPUR
          </span>

          <h1>
            Event <span>Registration</span>
          </h1>

          <p>
            Join our technical community, collaborate with students,
            and start contributing to open source.
          </p>
        </div>

        <form
          className="registration-form"
          onSubmit={handleSubmit}
        >
          <h2>Student Information</h2>

          <p className="registration-form-note">
            Fields marked * are required.
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
                'AI / ML',
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
            {loading ? 'Submitting...' : 'Register Now →'}
          </button>

          <p className="registration-privacy">
            Your details will be used for event registration
            and related communication.
          </p>
        </form>
      </div>
    </section>
  );
}
