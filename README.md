# STIC-Webpage

> **Technology & Innovation Community (STIC)**  
> **Samrat Ashok Rajkiya Engineering College, Mirzapur**  
> Official community platform crafted with a Human-Centric Neo-Brutalist & Glassmorphic Design System.

---

## ⚡ Quick Start

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

# Run security verification tests
npm run test:security

# Build production-ready bundle
npm run build

# Preview production build locally
npm run preview
```

---

## 📂 Project Architecture

```plaintext
STIC-Webpage/
├── index.html                   # SEO metadata, OpenGraph, security headers, theme anti-flash
├── vite.config.js               # Vite bundler configuration
├── package.json                 # Scripts and dependencies
├── vercel.json                  # Deployment rewrites, headers & caching rules
├── public/                      # Static favicons, webmanifest, and brand logos
│   └── assets/
│       ├── logos/               # Institutional seals & STIC logos
│       └── faculty/             # Faculty coordinator & mentor portraits
├── README.md                    # Setup guide & architectural documentation
├── test/
│   └── security.test.js         # Security unit test suite (52 passing assertions)
└── src/
    ├── main.jsx                 # Application entry point
    ├── App.jsx                  # Root orchestrator & dark/light state manager
    ├── index.css                # Fluid typography clamp() & neo-brutalist design system
    ├── data/
    │   └── communityData.js     # Data layer: Domains, Departments, Leadership, Stats
    ├── hooks/
    │   └── useScrollReveal.js   # IntersectionObserver with prefers-reduced-motion check
    ├── utils/
    │   └── security.js          # Defensive validation, SSRF guard & formula injection prevention
    └── components/
        ├── Navbar.jsx           # Glass header with theme toggle & mobile menu
        ├── Hero.jsx             # Dual-column identity showcase, institutional pill & stats
        ├── About.jsx            # SAREC college profile & STIC mission pillars
        ├── FocusAreas.jsx       # Technical domain exploration tracks
        ├── Departments.jsx      # B.Tech engineering disciplines (CSE, IT, EL, EE)
        ├── Leadership.jsx       # Faculty guidance with portraits, co-founders & executive leads
        ├── Contact.jsx          # Official email copy-to-clipboard, venue & social channels
        ├── Footer.jsx           # SAREC Mirzapur credentials, social links & back-to-top
        ├── ScrollProgressBar.jsx # Reading progress indicator
        ├── BackToTop.jsx        # Floating back to top trigger
        ├── NotFound.jsx         # 404 error screen
        └── Icons.jsx            # Custom SVG social brand icons
```

---

## 🎨 Design System

- **Fluid Typography**: Calculated with CSS `clamp()` (`--step--2` to `--step-5`) for seamless scaling across devices from 320px mobile up to 4K displays without rigid breakpoint jumps.
- **Neo-Brutalist & Glassmorphic Elements**: Arcade Yellow (`#FFE600`) highlights, bold solid borders (`var(--border-width)`), hard contrast shadows (`var(--card-shadow)`), and smooth dark/light theme switching.
- **Anti-Flash Theme Engine**: Synchronous script in `<head>` inspecting `localStorage` and `prefers-color-scheme` to prevent any white-flash loading state.
- **Micro-Interactions**: Smooth hover translations (`translateY(-4px)`), animated pulse dots, and responsive navigation drawers.

---

## 🏛️ Institutional Credentials

- **Community**: Technology & Innovation Community (STIC)
- **Institution**: Samrat Ashok Rajkiya Engineering College, Mirzapur (SAREC Mirzapur)
- **Affiliation**: Dr. A.P.J. Abdul Kalam Technical University (AKTU Lucknow)
- **Academic Cohort**: 2026 – 2027

---

## 📜 License

Created and maintained by the student engineering leads of **STIC SAREC Mirzapur**.  
Released under the MIT License.
