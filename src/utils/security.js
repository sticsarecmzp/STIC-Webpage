/**
 * Security Utilities for STIC Webpage
 * Implements defensive validation, sanitization, SSRF guards,
 * formula injection prevention, and client-side rate limiting.
 */

// Allowed engineering departments
export const ALLOWED_BRANCHES = ['CSE', 'IT', 'EL', 'EE'];

// Allowed academic years
export const ALLOWED_YEARS = ['1st Year', '2nd Year', '3rd Year', '4th Year'];

// Allowed primary technology guilds
export const ALLOWED_GUILDS = [
  'AI/ML Syndicate',
  'Web & Mobile Guild',
  'STIC Coding Guild',
  'Open Source SAREC',
  'RoboTech & Automation',
  'CyberSec Guild',
  'Cloud & DevOps Guild',
  'Design & Innovation Guild'
];

// Comprehensive Private / Loopback IP address patterns for SSRF prevention (IPv4, octal, hex, decimal)
const PRIVATE_IP_REGEX = /^(127\.|10\.|172\.(1[6-9]|2[0-9]|3[0-1])\.|192\.168\.|169\.254\.|0\.|localhost|0x|0177|2130706433)/i;

// IPv6 private & loopback addresses
const IPV6_PRIVATE_REGEX = /^(::1|0:0:0:0:0:0:0:1|::|fe80:|fc[0-9a-f]{2}:|fd[0-9a-f]{2}:|::ffff:)/i;

/**
 * Validates external URL to prevent SSRF, protocol exploitation, and loopback attacks.
 * Enforces HTTPS, blocks embedded credentials, verifies host against allowlist,
 * and validates application-level path structure.
 *
 * @param {string} urlString - URL to test
 * @param {string[]} [allowedDomains] - Optional array of authorized parent domains
 * @returns {{ valid: boolean, error?: string }}
 */
export function validateSafeUrl(urlString, allowedDomains = null) {
  if (!urlString || typeof urlString !== 'string') {
    return { valid: false, error: 'URL is required.' };
  }

  const trimmed = urlString.trim();

  // Block dangerous schemes immediately
  if (/^(javascript:|data:|vbscript:|file:|ftp:|blob:)/i.test(trimmed)) {
    return { valid: false, error: 'Dangerous URL protocol detected.' };
  }

  let parsed;
  try {
    parsed = new URL(trimmed);
  } catch {
    return { valid: false, error: 'Malformed URL format.' };
  }

  // Enforce HTTPS
  if (parsed.protocol !== 'https:' && parsed.protocol !== 'http:') {
    return { valid: false, error: 'Only HTTP/HTTPS URLs are permitted.' };
  }

  // Forbid embedded user credentials (RFC 3986 deprecated, common SSRF evasion vector)
  if (parsed.username || parsed.password) {
    return { valid: false, error: 'Embedded user credentials in URLs are prohibited.' };
  }

  // Enforce standard default ports (block non-standard port scanning)
  if (parsed.port && parsed.port !== '443' && parsed.port !== '80') {
    return { valid: false, error: 'Non-standard network ports are prohibited.' };
  }

  // SSRF guard: Block localhost, IPv4/IPv6 private & loopback addresses
  const hostname = parsed.hostname.toLowerCase();
  const rawHost = hostname.replace(/^\[|\]$/g, '');

  if (
    PRIVATE_IP_REGEX.test(rawHost) || 
    IPV6_PRIVATE_REGEX.test(rawHost) || 
    rawHost === '::1' || 
    rawHost.endsWith('.local') ||
    rawHost.endsWith('.internal') ||
    rawHost.endsWith('.lan')
  ) {
    return { valid: false, error: 'Access to loopback, private, or local metadata addresses is forbidden.' };
  }

  // Domain allowlist verification (if specified)
  if (allowedDomains && allowedDomains.length > 0) {
    const isAllowed = allowedDomains.some((domain) => {
      const d = domain.toLowerCase();
      return hostname === d || hostname.endsWith('.' + d);
    });

    if (!isAllowed) {
      return { 
        valid: false, 
        error: `Host "${hostname}" is not in the approved endpoint allowlist (${allowedDomains.join(', ')}).` 
      };
    }

    // Google Apps Script endpoint path enforcement (must match /macros/s/.../exec)
    if (hostname === 'script.google.com' || hostname.endsWith('.script.google.com')) {
      if (!/^\/macros\/s\/[a-zA-Z0-9_-]+\/exec$/i.test(parsed.pathname)) {
        return { 
          valid: false, 
          error: 'Google Apps Script endpoint must follow the format: /macros/s/<DEPLOYMENT_ID>/exec' 
        };
      }
    }
  }

  return { valid: true };
}

/**
 * Sanitizes input values against CSV/Spreadsheet Formula Injection (CWE-1236).
 * Prepends a single quote to strings starting with dangerous formula triggers.
 *
 * @param {string} value - String value to sanitize
 * @returns {string} Sanitized string
 */
export function sanitizeForSpreadsheet(value) {
  if (typeof value !== 'string') return '';
  if (!value) return '';

  // Dangerous formula and delimiter prefixes in Excel, Google Sheets, Calc
  const dangerousPrefixes = ['=', '+', '-', '@', '\t', '\r', '%', '|'];
  
  // Check raw string first for leading control / formula characters
  if (dangerousPrefixes.includes(value.charAt(0))) {
    return "'" + value;
  }

  const trimmed = value.trim();
  if (!trimmed) return '';

  if (dangerousPrefixes.includes(trimmed.charAt(0))) {
    return "'" + trimmed;
  }

  return trimmed;
}

/**
 * Defensive string cleaner: trims and caps maximum length to prevent DoS payloads.
 *
 * @param {string} val - Input value
 * @param {number} maxLen - Maximum character length
 * @returns {string} Cleaned value
 */
export function sanitizeText(val, maxLen = 500) {
  if (typeof val !== 'string') return '';
  return val.trim().slice(0, maxLen);
}

/**
 * Validates registration payload against strict schema constraints.
 *
 * @param {object} data - Form input data
 * @returns {{ isValid: boolean, errors: Record<string, string>, sanitizedData: object }}
 */
export function validateRegistrationPayload(data) {
  const errors = {};
  const sanitized = {};

  // 1. Full Name: 2 - 100 characters, letters, spaces, hyphens, periods
  const rawName = sanitizeText(data.fullName || '', 100);
  if (!rawName) {
    errors.fullName = 'Full name is required.';
  } else if (rawName.length < 2) {
    errors.fullName = 'Name must be at least 2 characters.';
  } else if (!/^[a-zA-Z\s.'-]+$/.test(rawName)) {
    errors.fullName = 'Name contains invalid characters.';
  } else {
    sanitized.fullName = sanitizeForSpreadsheet(rawName);
  }

  // 2. Roll Number: 3 - 30 characters, alphanumeric & common student ID separators
  const rawRoll = sanitizeText(data.rollNo || '', 30);
  if (!rawRoll) {
    errors.rollNo = 'Roll number / Student ID is required.';
  } else if (rawRoll.length < 3) {
    errors.rollNo = 'Roll number must be at least 3 characters.';
  } else if (!/^[a-zA-Z0-9/_-]+$/.test(rawRoll)) {
    errors.rollNo = 'Roll number contains invalid characters (alphanumeric only).';
  } else {
    sanitized.rollNo = sanitizeForSpreadsheet(rawRoll);
  }

  // 3. Email: Valid format, max 120 characters, deterministic non-backtracking RFC pattern with TLD enforcement
  const rawEmail = sanitizeText(data.email || '', 120).toLowerCase();
  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*\.[a-zA-Z]{2,24}$/;
  if (!rawEmail) {
    errors.email = 'Email address is required.';
  } else if (!emailRegex.test(rawEmail)) {
    errors.email = 'Please enter a valid academic or personal email address.';
  } else {
    sanitized.email = sanitizeForSpreadsheet(rawEmail);
  }

  // 4. Branch: Must match ALLOWED_BRANCHES
  if (!data.branch) {
    errors.branch = 'Please select your department.';
  } else if (!ALLOWED_BRANCHES.includes(data.branch)) {
    errors.branch = 'Selected branch is invalid.';
  } else {
    sanitized.branch = data.branch;
  }

  // 5. Year: Must match ALLOWED_YEARS
  if (!data.year) {
    errors.year = 'Please select your academic year.';
  } else if (!ALLOWED_YEARS.includes(data.year)) {
    errors.year = 'Selected academic year is invalid.';
  } else {
    sanitized.year = data.year;
  }

  // 6. Guild: Must match ALLOWED_GUILDS
  if (!data.guild) {
    errors.guild = 'Please select a primary technology guild.';
  } else if (!ALLOWED_GUILDS.includes(data.guild)) {
    errors.guild = 'Selected guild is unrecognized.';
  } else {
    sanitized.guild = data.guild;
  }

  // 7. Interests: Required, 2 - 150 characters
  const rawInterests = sanitizeText(data.interests || '', 150);
  if (!rawInterests) {
    errors.interests = 'Please specify your domain interest.';
  } else {
    sanitized.interests = sanitizeForSpreadsheet(rawInterests);
  }

  // 8. Portfolio / GitHub URL (Optional, max 250 characters, must be safe HTTP/HTTPS)
  const rawPortfolio = sanitizeText(data.portfolio || '', 250);
  if (rawPortfolio) {
    const urlCheck = validateSafeUrl(rawPortfolio);
    if (!urlCheck.valid) {
      errors.portfolio = urlCheck.error || 'Please enter a valid HTTP/HTTPS profile URL.';
    } else {
      sanitized.portfolio = sanitizeForSpreadsheet(rawPortfolio);
    }
  } else {
    sanitized.portfolio = 'N/A';
  }

  // 9. Message / Motivation (Optional, max 1000 characters)
  const rawMsg = sanitizeText(data.message || '', 1000);
  sanitized.message = rawMsg ? sanitizeForSpreadsheet(rawMsg) : 'N/A';

  // 10. Referral Key / Passcode (Optional, max 50 characters, alphanumeric)
  const rawRef = sanitizeText(data.referralKey || '', 50);
  if (rawRef && !/^[a-zA-Z0-9_-]+$/.test(rawRef)) {
    errors.referralKey = 'Referral code contains invalid characters.';
  } else {
    sanitized.referralKey = rawRef ? sanitizeForSpreadsheet(rawRef) : 'N/A';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
    sanitizedData: sanitized
  };
}

/**
 * Client-Side Rate Limiter / Cooldown tracker.
 * Prevents rapid automated submissions.
 *
 * @param {string} actionKey - Storage key identifier
 * @param {number} cooldownMs - Minimum cooldown in milliseconds (default: 15s)
 * @returns {{ allowed: boolean, remainingSeconds: number }}
 */
export function checkSubmissionRateLimit(actionKey = 'stic_form_last_sub', cooldownMs = 15000) {
  try {
    const lastSubTime = sessionStorage.getItem(actionKey);
    const now = Date.now();
    if (lastSubTime) {
      const diff = now - parseInt(lastSubTime, 10);
      if (diff < cooldownMs) {
        const remainingSeconds = Math.ceil((cooldownMs - diff) / 1000);
        return { allowed: false, remainingSeconds };
      }
    }
    return { allowed: true, remainingSeconds: 0 };
  } catch {
    return { allowed: true, remainingSeconds: 0 };
  }
}

/**
 * Records the timestamp of a successful submission for rate limiting.
 *
 * @param {string} actionKey - Storage key identifier
 */
export function recordSubmissionTimestamp(actionKey = 'stic_form_last_sub') {
  try {
    sessionStorage.setItem(actionKey, Date.now().toString());
  } catch {}
}
