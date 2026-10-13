# STIC-Webpage

> **Technology & Innovation Community (STIC)**  
> **Samrat Ashok Rajkiya Engineering College, Mirzapur** • AKTU College Code 1215  
> Official community platform crafted with a Human-Centric & Glassmorphism Design System.

---

##  Quick Start

### 1. Prerequisites
- **Node.js** (v18 or higher recommended)
- **npm** (bundled with Node.js)

### 2. Installation & Running Locally

```bash
# Clone the repository and navigate to the project directory
cd STIC-Webpage

# Install dependencies
npm install

# Start Vite development server with hot reload
npm run dev

# Build production-ready bundle
npm run build

# Preview production build locally
npm run preview
```

---

##  Project Architecture

```plaintext
STIC-Webpage/
├── index.html                   # SEO metadata for STIC SAREC Mirzapur, OpenGraph, Fonts
├── vite.config.js               # Vite bundler configuration
├── package.json                 # Scripts (dev, build, preview) and dependencies
├── public/                      # Static favicons, webmanifest, and brand logos
├── README.md                    # Setup guide & Google Sheets Apps Script guide
└── src/
    ├── main.jsx                 # Application entry point
    ├── App.jsx                  # Root orchestrator & dark/light state manager
    ├── index.css                # Fluid typography clamp() & glassmorphic token system
    ├── data/
    │   └── communityData.js     # Data layer: 8 Guilds, Projects, Team, FAQs, Stats
    └── components/
        ├── Navbar.jsx           # Glass header with theme toggle & mobile menu
        ├── Hero.jsx             # Mesh gradient glow, SAREC Code 1215 pill, CTAs
        ├── Clubs.jsx            # The 8 Tech Guilds with interactive glass hover
        ├── Projects.jsx         # Real student innovation showcase with category filters
        ├── Team.jsx             # Faculty mentor, student leads & committee cards
        ├── JoinForm.jsx         # Google Sheets intake form with no-cors POST & prefill
        ├── Faq.jsx              # Glass accordion for student FAQs
        ├── WhyStic.jsx          # Core learning methodology pillars
        ├── Events.jsx           # Campus calendar & .ics invite downloader
        ├── InstitutionStrip.jsx # AKTU Code 1215 credibility strip
        └── Footer.jsx           # SAREC Mirzapur credentials, AKTU Code 1215 & socials
```

---

##  Design System

- **Fluid Typography**: Calculated with CSS `clamp()` (`--step--2` to `--step-5`) for seamless scaling across devices from 320px mobile up to 4K displays without rigid breakpoint jumps.
- **Deep Glassmorphism**: High-performance backdrop blur (`backdrop-filter: blur(14px)`), translucent border highlights (`var(--glass-border)`), layered elevation, and ambient radial glow pulses.
- **Modern Color Palette**: Electric Indigo (`#6366f1`) and Cyan (`#06b6d4`) on midnight dark background (`#030712`) and sleek light background (`#f8fafc`).
- **Micro-Interactions**: Smooth hover translations (`translateY(-8px)`), animated pulse dots, active track glow in the intake form, and smooth accordion transitions.

---

##  Google Sheets & Apps Script Setup

The registration form (`JoinForm.jsx`) sends student applications directly to Google Sheets using a Google Apps Script Web App without requiring any dedicated backend server or paid database.

### Step-by-Step Setup:

1. **Create a Google Sheet**:
   - Open [Google Sheets](https://sheets.new) and create a new spreadsheet named `STIC SAREC Registrations`.
   - In row 1, set up the column headers:
     `Timestamp` | `Full Name` | `Roll No` | `Email` | `Branch` | `Year` | `Guild` | `Interests` | `Portfolio` | `College Code`

2. **Open Apps Script Editor**:
   - In your Google Sheet, click **Extensions** > **Apps Script**.
   - Delete any default code in `Code.gs` and paste the following script:

```javascript
function doPost(e) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var p = e.parameter;
  
  sheet.appendRow([
    new Date(),
    p.fullName || p.name || 'Anonymous',
    p.rollNo || 'N/A',
    p.email || 'N/A',
    p.branch || 'N/A',
    p.year || 'N/A',
    p.guild || p.club || 'N/A',
    p.interests || p.interest || 'N/A',
    p.portfolio || 'N/A',
    p.collegeCode || '1215'
  ]);
  
  return ContentService.createTextOutput(
    JSON.stringify({ result: 'success' })
  ).setMimeType(ContentService.MimeType.JSON);
}
```

3. **Deploy as a Web App**:
   - Click the blue **Deploy** button > **New deployment**.
   - Click the gear icon next to "Select type" and select **Web app**.
   - Configure the deployment settings:
     - **Description**: `STIC Registration Form Intake`
     - **Execute as**: `Me (your email)`
     - **Who has access**: `Anyone` *(Crucial: allows student submissions without login barriers)*
   - Click **Deploy** and authorize access if prompted.
   - Copy the generated **Web app URL** (format: `https://script.google.com/macros/s/.../exec`).

4. **Connect to the Webpage**:
   - Update `formEndpoint` in `src/data/communityData.js`, OR
   - Click the **Google Apps Script Endpoint Settings** button directly in the web app under the Join Form to save your custom URL into `localStorage`.

---

## 🏛️ Institutional Credentials

- **Community**: Technology & Innovation Community (STIC)
- **Institution**: Samrat Ashok Rajkiya Engineering College, Mirzapur (SAREC Mirzapur)
- **Affiliation**: Dr. A.P.J. Abdul Kalam Technical University (AKTU Lucknow)
- **College Code**: 1215
- **Academic Year**: 2026 – 2027

---

## 📜 License

Created and maintained by the student engineering leads of **STIC SAREC Mirzapur**.  
Released under the MIT License.
