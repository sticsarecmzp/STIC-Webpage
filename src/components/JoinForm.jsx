import React, { useState, useEffect, useRef } from 'react';
import { 
  Send, 
  CheckCircle2, 
  AlertCircle, 
  Loader2, 
  Check, 
  Sparkles, 
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
  Compass,
  ShieldCheck,
  Lock
} from 'lucide-react';
import { COMMUNITY_INFO, DEPARTMENTS } from '../data/communityData';
import ConfirmModal from './ConfirmModal';
import { 
  validateRegistrationPayload, 
  checkSubmissionRateLimit, 
  recordSubmissionTimestamp,
  sanitizeText 
} from '../utils/security';
import { 
  auth, 
  signInWithGoogle, 
  logOut, 
  onAuthStateChanged, 
  saveRegistrationToFirestore 
} from '../firebase';

function GoogleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true" style={{ flexShrink: 0 }}>
      <path
        fill="#4285F4"
        d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z"
      />
      <path
        fill="#34A853"
        d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24z"
      />
      <path
        fill="#FBBC05"
        d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.98 0 12s.45 3.82 1.25 5.42l4.03-3.15z"
      />
      <path
        fill="#EA4335"
        d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
      />
    </svg>
  );
}

export default function JoinForm({ selectedClub }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [guestBypass, setGuestBypass] = useState(false);
  const [authLoading, setAuthLoading] = useState(true);
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [authError, setAuthError] = useState('');

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
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const isSubmittingRef = useRef(false);

  // UTM tracking state
  const [utmData, setUtmData] = useState({
    source: '',
    medium: '',
    campaign: ''
  });

  // Helper to persist verified student profile in localStorage
  const saveAuthSession = (user) => {
    if (!user) return;
    try {
      localStorage.setItem('stic_auth_user', JSON.stringify({
        uid: user.uid,
        displayName: user.displayName || '',
        email: user.email || '',
        photoURL: user.photoURL || null
      }));
    } catch {}
  };

  // Restore session from cache & listen for Firebase Auth state changes
  useEffect(() => {
    // 1. Immediately check cached auth to eliminate flicker or page reload lockout
    try {
      const cached = localStorage.getItem('stic_auth_user');
      if (cached) {
        const parsed = JSON.parse(cached);
        if (parsed?.email) {
          setCurrentUser(parsed);
          setFormData(prev => ({
            ...prev,
            fullName: prev.fullName || parsed.displayName || '',
            email: parsed.email || prev.email
          }));
          setFieldErrors(prev => ({ ...prev, email: '', fullName: '' }));
          setAuthLoading(false);
        }
      }
    } catch (cacheErr) {
      console.warn('Cached auth read notice:', cacheErr);
    }

    if (!auth) {
      setAuthLoading(false);
      return;
    }

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setAuthLoading(false);
      if (user) {
        setCurrentUser(user);
        saveAuthSession(user);
        setFormData(prev => ({
          ...prev,
          fullName: prev.fullName || user.displayName || '',
          email: user.email || prev.email
        }));
        setFieldErrors(prev => ({ ...prev, email: '', fullName: '' }));
      }
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      const source = (params.get('utm_source') || '').slice(0, 50);
      const medium = (params.get('utm_medium') || '').slice(0, 50);
      const campaign = (params.get('utm_campaign') || '').slice(0, 50);
      if (source || medium || campaign) {
        setUtmData({ source, medium, campaign });
      }
    } catch {}
  }, []);

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    const nextFormData = { ...formData, [name]: value };
    setFormData(nextFormData);

    if (fieldErrors[name]) {
      const validation = validateRegistrationPayload(nextFormData);
      setFieldErrors(prev => ({ ...prev, [name]: validation.errors[name] || '' }));
    }
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    const validation = validateRegistrationPayload(formData);
    if (validation.errors[name]) {
      setFieldErrors(prev => ({ ...prev, [name]: validation.errors[name] }));
    }
  };

  const handleCopyCollegeCode = () => {
    navigator.clipboard.writeText('1215');
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const handleGoogleSignIn = async () => {
    setAuthError('');
    setIsAuthenticating(true);
    try {
      const user = await signInWithGoogle();
      if (user && user.email) {
        setCurrentUser(user);
        saveAuthSession(user);
        setFormData(prev => ({
          ...prev,
          fullName: prev.fullName || user.displayName || '',
          email: user.email || prev.email
        }));
        setFieldErrors(prev => ({ ...prev, email: '', fullName: '' }));
      }
    } catch (err) {
      console.warn('Google sign-in error:', err);
      const errCode = err?.code || '';
      if (errCode === 'auth/popup-closed-by-user') {
        setAuthError('Sign-in cancelled. The Google authentication popup was closed.');
      } else if (errCode === 'auth/popup-blocked') {
        setAuthError('The sign-in popup was blocked by your browser. Please allow popups for this site.');
      } else if (errCode === 'auth/unauthorized-domain') {
        setAuthError('Domain is not authorized in Firebase. Add this domain in Firebase Console → Authentication → Settings → Authorized domains.');
      } else {
        setAuthError(err?.message || 'Google authentication failed. Please try again or use Manual Registration below.');
      }
    } finally {
      setIsAuthenticating(false);
    }
  };

  const handleSignOut = async () => {
    try {
      localStorage.removeItem('stic_auth_user');
      await logOut();
      setCurrentUser(null);
      setGuestBypass(false);
      setFormData(prev => ({ ...prev, email: '' }));
    } catch (err) {
      console.warn('Sign out error:', err);
    }
  };

  // Called when user clicks "Submit Track Registration"
  const handlePreSubmit = (e) => {
    e.preventDefault();

    // 0. Enforce Google Authentication unless manual bypass
    if (!currentUser && !guestBypass) {
      setStatus('error');
      setErrorMessage('Please authenticate with Google or continue with manual registration.');
      return;
    }

    // 1. Client-Side Rate Limit & Cooldown Check (prevents rapid automated submissions)
    const rateCheck = checkSubmissionRateLimit('stic_form_last_sub', 15000);
    if (!rateCheck.allowed) {
      setStatus('error');
      setErrorMessage(`Rate limit: Please wait ${rateCheck.remainingSeconds}s before submitting again.`);
      return;
    }

    // 2. Strict Schema Validation (lengths, patterns, protocols, allowlists)
    const validation = validateRegistrationPayload(formData);
    if (!validation.isValid) {
      setFieldErrors(validation.errors);
      setStatus('error');
      setErrorMessage('Please fix the highlighted fields before proceeding.');
      return;
    }

    // Open confirmation modal
    setShowConfirmModal(true);
  };

  // Called after confirmation in modal - enforces atomic in-flight submission lock (CWE-362)
  const handleConfirmedSubmit = async () => {
    if (isSubmittingRef.current) return;
    isSubmittingRef.current = true;
    setIsSubmitting(true);
    setStatus('loading');
    setErrorMessage('');

    try {
      // Re-verify Google Auth & rate limit & schema validity
      if (!currentUser) {
        setShowConfirmModal(false);
        setStatus('error');
        setErrorMessage('Authentication expired. Please sign in with Google again.');
        return;
      }

      const rateCheck = checkSubmissionRateLimit('stic_form_last_sub', 15000);
      if (!rateCheck.allowed) {
        setShowConfirmModal(false);
        setStatus('error');
        setErrorMessage(`Rate limit: Please wait ${rateCheck.remainingSeconds}s before submitting again.`);
        return;
      }

      const validation = validateRegistrationPayload(formData);
      if (!validation.isValid) {
        setShowConfirmModal(false);
        setFieldErrors(validation.errors);
        setStatus('error');
        setErrorMessage('Validation error: Please review highlighted fields.');
        return;
      }

      const sanitized = validation.sanitizedData;
      const formPayload = new FormData();
      
      // Sanitized against CSV / Formula Injection
      formPayload.append('fullName', sanitized.fullName);
      formPayload.append('name', sanitized.fullName);
      formPayload.append('rollNo', sanitized.rollNo);
      formPayload.append('email', sanitized.email);
      formPayload.append('branch', sanitized.branch);
      formPayload.append('year', sanitized.year);
      formPayload.append('guild', sanitized.guild);
      formPayload.append('club', sanitized.guild);
      formPayload.append('interests', sanitized.interests);
      formPayload.append('portfolio', sanitized.portfolio);
      formPayload.append('message', sanitized.message);
      formPayload.append('referralKey', sanitized.referralKey);
      formPayload.append('collegeCode', COMMUNITY_INFO.collegeCode || '1215');
      formPayload.append('googleUid', currentUser?.uid || '');
      formPayload.append('googleVerified', 'true');

      // Sanitized UTM parameters
      formPayload.append('utmSource', utmData.source ? sanitizeText(utmData.source, 50) : 'direct');
      formPayload.append('utmMedium', utmData.medium ? sanitizeText(utmData.medium, 50) : 'web');
      formPayload.append('utmCampaign', utmData.campaign ? sanitizeText(utmData.campaign, 50) : 'general');

      // 1. Submit concurrently to Firebase Cloud Firestore and Google Sheets with strict fail-safe timeouts
      const firestoreTask = Promise.race([
        saveRegistrationToFirestore({
          fullName: sanitized.fullName,
          rollNo: sanitized.rollNo,
          email: sanitized.email,
          branch: sanitized.branch,
          year: sanitized.year,
          guild: sanitized.guild,
          interests: sanitized.interests,
          portfolio: sanitized.portfolio,
          message: sanitized.message,
          collegeCode: COMMUNITY_INFO.collegeCode || '1215',
          googleUid: currentUser?.uid || null,
          googleEmail: currentUser?.email || sanitized.email,
          googlePhoto: currentUser?.photoURL || null,
          verifiedWithGoogle: true,
          utmSource: utmData.source ? sanitizeText(utmData.source, 50) : 'direct',
          utmMedium: utmData.medium ? sanitizeText(utmData.medium, 50) : 'web',
          utmCampaign: utmData.campaign ? sanitizeText(utmData.campaign, 50) : 'general'
        }),
        new Promise((_, reject) =>
          setTimeout(() => reject(new Error('Firestore connection timeout')), 2500)
        )
      ]).catch((firestoreErr) => {
        console.warn('Firebase Firestore save notice:', firestoreErr?.message || firestoreErr);
      });

      const sheetTask = Promise.race([
        fetch(COMMUNITY_INFO.formEndpoint, {
          method: 'POST',
          body: formPayload,
          mode: 'no-cors'
        }),
        new Promise((_, reject) =>
          setTimeout(() => reject(new Error('Google Sheet sync timeout')), 3000)
        )
      ]).catch((sheetErr) => {
        console.warn('Google Sheet sync notice:', sheetErr?.message || sheetErr);
      });

      // Wait for both to complete or safely timeout (maximum 3 seconds total wait)
      await Promise.allSettled([firestoreTask, sheetTask]);

      // Record rate limit timestamp
      recordSubmissionTimestamp('stic_form_last_sub');

      setSubmittedData({
        name: formData.fullName.trim(),
        email: formData.email.trim(),
        guild: sanitized.guild,
        branch: sanitized.branch,
        year: sanitized.year
      });

      setShowConfirmModal(false);
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
      setShowConfirmModal(false);
      setStatus('error');
      setErrorMessage(
        'Could not complete submission due to network latency. Please check your internet connection or email us directly at ' +
          COMMUNITY_INFO.officialEmail
      );
    } finally {
      isSubmittingRef.current = false;
      setIsSubmitting(false);
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
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.45rem', padding: '0.35rem 0.8rem', background: 'var(--brutal-yellow)', border: '2px solid var(--border-color)', borderRadius: '4px', fontSize: '0.78rem', color: '#000000', fontWeight: 600, boxShadow: '2px 2px 0px var(--shadow-color)', marginBottom: '1.25rem' }}>
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
            </div>
          </div>

          {/* Form / Success Card Column */}
          <div className="form-card">
            {status === 'success' && submittedData ? (
              <div className="registration-success-card" role="alert">
                <div className="success-icon-badge">
                  <CheckCircle2 size={36} strokeWidth={1.8} style={{ color: '#000000' }} />
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
                    href={COMMUNITY_INFO.whatsappGroup}
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
            ) : authLoading ? (
              <div className="auth-gate-loading">
                <Loader2 size={24} className="spinner" />
                <span>Checking Google authentication status...</span>
              </div>
            ) : (!currentUser && !guestBypass) ? (
              <div className="google-auth-gate-card">
                <div className="auth-gate-badge">
                  <ShieldCheck size={14} strokeWidth={2.5} />
                  <span>STUDENT VERIFICATION REQUIRED</span>
                </div>

                <h3 className="auth-gate-title">Authenticate with Google to Register</h3>

                <p className="auth-gate-desc">
                  Before filling out the technical track registration, please authenticate with your Google account. This verifies your identity, prevents spam, and secures your application record.
                </p>

                <div className="auth-gate-perks">
                  <div className="auth-perk-item">
                    <Check size={14} strokeWidth={2.5} className="auth-perk-icon" />
                    <span>Official student verification via Gmail OAuth</span>
                  </div>
                  <div className="auth-perk-item">
                    <Check size={14} strokeWidth={2.5} className="auth-perk-icon" />
                    <span>Automatic pre-fill of your verified Full Name and Email</span>
                  </div>
                  <div className="auth-perk-item">
                    <Check size={14} strokeWidth={2.5} className="auth-perk-icon" />
                    <span>Instant synchronization to SAREC Cloud Firestore</span>
                  </div>
                </div>

                {authError && (
                  <div className="form-status-banner error" role="alert" style={{ marginBottom: '0.75rem' }}>
                    <AlertCircle size={16} strokeWidth={2} style={{ flexShrink: 0 }} />
                    <span>{authError}</span>
                  </div>
                )}

                <button
                  type="button"
                  className="btn btn-primary btn-google-auth"
                  onClick={handleGoogleSignIn}
                  disabled={isAuthenticating}
                  id="googleAuthTriggerBtn"
                >
                  {isAuthenticating ? (
                    <>
                      <Loader2 size={16} className="spinner" />
                      <span>Connecting Google Account...</span>
                    </>
                  ) : (
                    <>
                      <GoogleIcon />
                      <span>Continue with Google to Fill Form</span>
                    </>
                  )}
                </button>

                <div style={{ textAlign: 'center', marginTop: '0.25rem' }}>
                  <button
                    type="button"
                    className="btn btn-secondary btn-sm"
                    onClick={() => setGuestBypass(true)}
                    style={{ fontSize: '0.78rem', width: '100%', padding: '0.55rem 1rem' }}
                  >
                    Continue with Manual Registration (Without Google)
                  </button>
                </div>

                <p className="auth-gate-footnote">
                  Secured by Firebase Authentication. We only receive your basic profile and verified email address.
                </p>
              </div>
            ) : (
              <>
                {/* User Status Bar (Google Verified or Manual Mode) */}
                {currentUser ? (
                  <div className="auth-user-bar">
                    <div className="auth-user-info">
                      {currentUser.photoURL ? (
                        <img
                          src={currentUser.photoURL}
                          alt={currentUser.displayName || 'Google Student'}
                          className="auth-user-avatar"
                          referrerPolicy="no-referrer"
                        />
                      ) : (
                        <div className="auth-user-avatar-placeholder">
                          {(currentUser.displayName || currentUser.email || 'U')[0].toUpperCase()}
                        </div>
                      )}
                      <div>
                        <div className="auth-user-tag">
                          <CheckCircle2 size={12} strokeWidth={2.5} />
                          <span>GOOGLE VERIFIED STUDENT</span>
                        </div>
                        <div className="auth-user-name">{currentUser.displayName || 'Verified Student'}</div>
                        <div className="auth-user-email">{currentUser.email}</div>
                      </div>
                    </div>
                    <button
                      type="button"
                      className="btn btn-secondary btn-sm"
                      onClick={handleSignOut}
                      title="Switch to another Google account"
                    >
                      <RefreshCw size={12} strokeWidth={2} />
                      <span>Switch</span>
                    </button>
                  </div>
                ) : (
                  <div className="auth-user-bar">
                    <div className="auth-user-info">
                      <div className="auth-user-avatar-placeholder" style={{ background: 'var(--text)', color: 'var(--bg)', fontSize: '0.85rem' }}>
                        ID
                      </div>
                      <div>
                        <div className="auth-user-tag">
                          <span>MANUAL ENTRY MODE</span>
                        </div>
                        <div className="auth-user-name">Direct Student Registration</div>
                        <div className="auth-user-email">Manual input without Google verification</div>
                      </div>
                    </div>
                    <button
                      type="button"
                      className="btn btn-secondary btn-sm"
                      onClick={() => setGuestBypass(false)}
                      title="Switch back to Google Authentication"
                    >
                      <RefreshCw size={12} strokeWidth={2} />
                      <span>Use Google</span>
                    </button>
                  </div>
                )}

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
                        readOnly={Boolean(currentUser)}
                        style={currentUser ? { background: 'var(--bg-surface-elevated)', cursor: 'default' } : {}}
                        required
                      />
                      <label htmlFor="email" className="floating-label">
                        {currentUser ? 'Verified Email (Google OAuth) *' : 'College / Personal Email *'}
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
                        <span style={{ fontSize: '0.72rem', background: 'var(--brutal-yellow)', color: '#000000', border: '1.5px solid var(--border-color)', padding: '0.1rem 0.45rem', borderRadius: '4px', display: 'inline-flex', alignItems: 'center', gap: '0.3rem', fontWeight: 800 }}>
                          <Sparkles size={12} strokeWidth={2} />
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
                      <optgroup label="Currently Active Tracks (In Current Time)">
                        <option value="AI/ML Syndicate">AI &amp; Data Science</option>
                        <option value="Web & Mobile Guild">Web &amp; Mobile Dev</option>
                        <option value="STIC Coding Guild">STIC Coding &amp; CP Guild</option>
                        <option value="Open Source SAREC">Open Source SAREC</option>
                      </optgroup>
                      <optgroup label="Future Scope Tracks (Incubation)">
                        <option value="RoboTech & Automation">RoboTech &amp; IoT</option>
                        <option value="CyberSec Guild">Cyber Security</option>
                        <option value="Pixels UI/UX Guild">Pixels UI/UX</option>
                        <option value="E-Cell & Innovation">E-Cell &amp; Tech Innovation</option>
                      </optgroup>
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
                        onBlur={handleBlur}
                      />
                      <label htmlFor="portfolio" className="floating-label">
                        GitHub / Portfolio URL (Optional)
                      </label>
                      {fieldErrors.portfolio && (
                        <span className="field-error-text">
                          <AlertCircle size={12} strokeWidth={1.5} />
                          {fieldErrors.portfolio}
                        </span>
                      )}
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
                        className={`form-input ${fieldErrors.referralKey ? 'input-error' : ''}`}
                        style={{ paddingRight: '2.5rem' }}
                        placeholder="Enter mentor code if referred by a senior or faculty..."
                        value={formData.referralKey}
                        onChange={handleChange}
                        onBlur={handleBlur}
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
                    {fieldErrors.referralKey && (
                      <span className="field-error-text">
                        <AlertCircle size={12} strokeWidth={1.5} />
                        {fieldErrors.referralKey}
                      </span>
                    )}
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
        isLoading={isSubmitting}
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
        onCancel={() => {
          if (!isSubmitting) setShowConfirmModal(false);
        }}
      />
    </section>
  );
}
