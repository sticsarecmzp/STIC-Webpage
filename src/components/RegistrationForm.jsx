import React, { useState } from 'react';
import './RegistrationForm.css';

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

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleInterestChange = (e) => {
    const { value, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      interests: checked
        ? [...prev.interests, value]
        : prev.interests.filter((item) => item !== value),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Form submitted successfully! Backend connection is pending.');
  };

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

        <form className="registration-form" onSubmit={handleSubmit}>
          <h2>Student Information</h2>
          <p className="registration-form-note">
            Fields marked * are required.
          </p>

          <div className="registration-grid">
            <label>
              Full Name *
              <input
                type="text"
                name="fullName"
                placeholder="Enter your full name"
                value={formData.fullName}
                onChange={handleChange}
                required
              />
            </label>

            <label>
              Email Address *
              <input
                type="email"
                name="email"
                placeholder="you@example.com"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </label>

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
                required
              />
            </label>

            <label>
              College Name *
              <input
                type="text"
                name="college"
                placeholder="Enter your college name"
                value={formData.college}
                onChange={handleChange}
                required
              />
            </label>

            <label>
              Branch *
              <select
                name="branch"
                value={formData.branch}
                onChange={handleChange}
                required
              >
                <option value="">Select your branch</option>
                <option value="CSE">Computer Science (CSE)</option>
                <option value="IT">Information Technology (IT)</option>
                <option value="EL">EL</option>
                <option value="EE">EE</option>
                <option value="Other">Other</option>
              </select>
            </label>

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

            <label className="registration-full-width">
              GitHub Profile (Optional)
              <input
                type="url"
                name="github"
                placeholder="https://github.com/yourusername"
                value={formData.github}
                onChange={handleChange}
              />
            </label>
          </div>

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
                <label key={interest} className="registration-option">
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

          <button
            type="submit"
            className="registration-submit"
            disabled={formData.interests.length === 0}
          >
            Register Now →
          </button>

          <p className="registration-privacy">
            Your details will be used for event registration and
            related communication.
          </p>
        </form>
      </div>
    </section>
  );
}
