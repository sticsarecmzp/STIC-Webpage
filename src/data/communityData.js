export const COMMUNITY_INFO = {
  name: "STIC",
  fullName: "Technology and Innovation Community",
  college: "Samrat Ashok Rajkiya Engineering College, Mirzapur",
  collegeShort: "SAREC Mirzapur",
  collegeCode: "AKTU Code 1215",
  establishedYear: "2023",
  collegeWebsite: "https://www.sarecmzp.ac.in/",
  tagline: "Code, Build, Innovate",
  officialEmail: "sticsarecmzp@gmail.com",
  venue: "SAREC Central Computer Lab and Workshop Hall",
  academicYear: "2025 - 2026",
  meetingSchedule: "Weekly Saturday afternoon build sprints and midweek evening lab hours",
  githubOrg: "https://github.com/sticsarecmzp",
  instagram: "https://www.instagram.com/sticsarecmzp",
  linkedin: "https://www.linkedin.com/company/stic-sarec-mirzapur/posts/",
  whatsappGroup: "https://chat.whatsapp.com/HyFakBeKgHeBSF0E0k0sVT",
  formEndpoint: "https://script.google.com/macros/s/AKfycbxXI59ceq99apRfS656UR1H-wrsO3I9oefcD1ktieMFUeaGLpuLuEJEH9GkkJs9oPT3/exec"
};

export const COMMUNITY_STATS = [
  { value: "8", label: "Technology Guilds", sub: "4 Active • 4 Future Scope" },
  { value: "4", label: "Engineering Branches", sub: "CSE • IT • EL • EE" },
  { value: "1215", label: "AKTU College Code", sub: "SAREC Mirzapur Campus" },
  { value: "₹0", label: "Membership Cost", sub: "100% Free & Open Access" }
];

export const DEPARTMENTS = [
  { code: "CSE", name: "Computer Science and Engineering" },
  { code: "IT", name: "Information Technology" },
  { code: "EL", name: "Electronics Engineering" },
  { code: "EE", name: "Electrical Engineering" }
];

export const CLUBS = [
  {
    id: "ai-ml",
    name: "AI & Data Science",
    category: "ai",
    status: "active",
    statusLabel: "Currently Active",
    statusBadge: "Active",
    badge: "AI/ML",
    description: "Exploring neural networks, PyTorch, computer vision, data pipelines, predictive models, and deploying production AI APIs.",
    schedule: "Fridays at 5:00 PM",
    venue: "Lab 1",
    topics: ["Python", "PyTorch", "Pandas", "Scikit-Learn", "FastAPI"],
    primaryTrack: "AI/ML Syndicate"
  },
  {
    id: "web-mobile",
    name: "Web & Mobile Dev",
    category: "software",
    status: "active",
    statusLabel: "Currently Active",
    statusBadge: "Active",
    badge: "Full-Stack",
    description: "Crafting modern full-stack web and mobile experiences with React, Next.js, Node.js backends, Flutter, and cloud architecture.",
    schedule: "Thursdays at 5:30 PM",
    venue: "Lab 2",
    topics: ["React", "Next.js", "Node.js", "TypeScript", "Flutter"],
    primaryTrack: "Web & Mobile Guild"
  },
  {
    id: "coding-guild",
    name: "Coding & CP Guild",
    category: "software",
    status: "active",
    statusLabel: "Currently Active",
    statusBadge: "Active",
    badge: "CP & DSA",
    description: "Mastering data structures, algorithms problem solving, weekly Codeforces & LeetCode contest debriefs, and national competitive programming.",
    schedule: "Saturdays at 4:00 PM",
    venue: "Lab 1",
    topics: ["C++", "Java", "DSA", "Problem Solving", "Codeforces"],
    primaryTrack: "STIC Coding Guild"
  },
  {
    id: "open-source",
    name: "Open Source SAREC",
    category: "software",
    status: "active",
    statusLabel: "Currently Active",
    statusBadge: "Active",
    badge: "Open Source",
    description: "Contributing to global tech ecosystems: Git and GitHub best practices, open pull requests, documentation, code reviews, and GSoC mentorship.",
    schedule: "Tuesdays at 5:30 PM",
    venue: "Lab 1",
    topics: ["Git", "GitHub", "Open Source", "Documentation", "Linux"],
    primaryTrack: "Open Source SAREC"
  },
  {
    id: "robotech",
    name: "RoboTech & IoT",
    category: "hardware",
    status: "future",
    statusLabel: "Future Scope",
    statusBadge: "Future Scope",
    badge: "IoT & Robotics",
    description: "Where hardware meets software innovation: microcontroller programming, Arduino, Raspberry Pi, sensor networks, PCB prototyping, and robotics.",
    schedule: "Sundays at 11:00 AM",
    venue: "Robotics Workshop",
    topics: ["Arduino", "Raspberry Pi", "Embedded C", "IoT", "Sensors"],
    primaryTrack: "RoboTech & Automation"
  },
  {
    id: "cybersec",
    name: "Cyber Security",
    category: "software",
    status: "future",
    statusLabel: "Future Scope",
    statusBadge: "Future Scope",
    badge: "Security",
    description: "Defending the digital frontier with Linux administration, network security, penetration testing methodologies, web exploits, and CTF competitions.",
    schedule: "Wednesdays at 5:00 PM",
    venue: "Lab 2",
    topics: ["Linux", "Wireshark", "Burp Suite", "CTFs", "Cryptography"],
    primaryTrack: "CyberSec Guild"
  },
  {
    id: "uiux-media",
    name: "Pixels UI/UX",
    category: "creative",
    status: "future",
    statusLabel: "Future Scope",
    statusBadge: "Future Scope",
    badge: "UI/UX",
    description: "Designing human-centric interfaces, design systems, Figma wireframing, interactive prototyping, and technical accessibility for web & mobile.",
    schedule: "Mondays at 5:00 PM",
    venue: "Design Studio",
    topics: ["Figma", "Design Systems", "Wireframing", "UI Prototyping"],
    primaryTrack: "Pixels UI/UX Guild"
  },
  {
    id: "ecell",
    name: "E-Cell & Tech Innovation",
    category: "creative",
    status: "future",
    statusLabel: "Future Scope",
    statusBadge: "Future Scope",
    badge: "E-Cell",
    description: "Bridging engineering with entrepreneurship: translating campus code into scalable products, pitch deck coaching, hackathon strategy, and startup grants.",
    schedule: "Saturdays at 6:00 PM",
    venue: "Seminar Room",
    topics: ["Product Strategy", "Pitch Decks", "Hackathons", "Ideation"],
    primaryTrack: "E-Cell & Innovation"
  }
];

export const CORE_PILLARS = [
  {
    title: "Project-Centric Learning",
    description: "We focus on building functional systems rather than solely reading theory. From terminal tools to full-stack platforms, you write code that runs in production.",
    detail: "Focus on practical software delivery"
  },
  {
    title: "Senior Peer Mentorship",
    description: "Experienced seniors guide juniors through core programming fundamentals, debugging hurdles, and roadmap planning without gatekeeping.",
    detail: "Direct guidance from experienced peers"
  },
  {
    title: "Hackathon Team Formation",
    description: "Assemble balanced teams combining developers, designers, and hardware specialists for Smart India Hackathon (SIH) and state-level engineering contests.",
    detail: "Collaborative teams for national events"
  },
  {
    title: "Transparent Career Pathways",
    description: "Get honest advice on internships, open source programs, off-campus hiring, resume structure, and portfolio repositories from students actively pursuing them.",
    detail: "Real guidance on engineering careers"
  }
];

export const EVENTS = [
  {
    id: "weekly-sprints",
    title: "Weekly Guild Build Sprints",
    category: "workshop",
    status: "Every Weekend",
    date: "Every Saturday",
    rawDate: "2026-10-17",
    location: "SAREC Central Computer Lab",
    description: "Hands-on collaborative build hours across all 8 guilds where students build projects, review code, and solve problem sheets together.",
    deliverable: "Hands-on project progress and peer code reviews"
  },
  {
    id: "sih-prep",
    title: "Smart India Hackathon (SIH) Internal Prep",
    category: "hackathon",
    status: "Annual Initiative",
    date: "Upcoming Sprint",
    rawDate: "2026-10-24",
    location: "SAREC Seminar Hall",
    description: "Internal campus evaluation and mentor guidance for problem statements, technical architecture, and team formation.",
    deliverable: "Project architecture deck and functional MVP"
  },
  {
    id: "git-bootcamp",
    title: "Git, GitHub & Open Source Onboarding",
    category: "bootcamp",
    status: "Scheduled",
    date: "Semester Session",
    rawDate: "2026-11-07",
    location: "SAREC Main Workshop Hall",
    description: "Practical workshop for freshers and sophomores to master version control, open pull requests, and collaborate on GitHub.",
    deliverable: "Personal GitHub portfolio and first open PR"
  }
];

export const STUDENT_PROJECTS = [
  {
    id: "stic-web",
    title: "STIC Community Platform",
    track: "Open Source & Web",
    category: "web",
    status: "Active Repository",
    description: "The official open-source web platform for the STIC community at SAREC Mirzapur, built with React, Vite, and glassmorphic UI design tokens.",
    stack: ["React", "Vite", "JavaScript", "Vanilla CSS"],
    teamSize: "Community Maintained",
    github: "https://github.com/sticsarecmzp/STIC-Webpage",
    liveUrl: "https://github.com/sticsarecmzp/STIC-Webpage"
  },
  {
    id: "sarec-hub",
    title: "SAREC Hub Academic Vault",
    track: "Academic Utility",
    category: "utility",
    status: "Community Initiative",
    description: "Centralized repository for semester syllabus, previous year question papers, lab manuals, and departmental circulars for SAREC students.",
    stack: ["Markdown", "Git", "Google Drive", "Open Docs"],
    teamSize: "Student Contributed",
    github: "https://github.com/sticsarecmzp",
    liveUrl: "https://sarecmzp.ac.in/"
  },
  {
    id: "sih-incubator",
    title: "SIH Innovation Incubator",
    track: "Hackathons",
    category: "systems",
    status: "Cohort Sprint",
    description: "Campus problem statement sandbox preparing multidisciplinary engineering student teams for national Smart India Hackathon problem statements.",
    stack: ["Ideation", "Hardware/Software", "Prototyping"],
    teamSize: "Interdisciplinary Teams",
    github: "https://github.com/sticsarecmzp",
    liveUrl: "https://github.com/sticsarecmzp"
  },
  {
    id: "ai-sandbox",
    title: "SAREC AI & Data Lab Sandbox",
    track: "AI & Data Science",
    category: "ai",
    status: "Guild Track",
    description: "Collaborative repository of machine learning notebooks, exploratory data analysis on regional datasets, and weekly AI guild workshop code.",
    stack: ["Python", "Jupyter", "Scikit-Learn", "Pandas"],
    teamSize: "AI/ML Syndicate",
    github: "https://github.com/sticsarecmzp",
    liveUrl: "https://github.com/sticsarecmzp"
  },
  {
    id: "robotech-iot",
    title: "Campus IoT & Robotics Workbench",
    track: "Hardware & IoT",
    category: "hardware",
    status: "Workshop Track",
    description: "Embedded schematics, sensor telemetry routines, and microcontroller code developed for hands-on electronics training in the SAREC Workshop.",
    stack: ["Arduino", "ESP32", "Embedded C++", "Sensors"],
    teamSize: "RoboTech Guild",
    github: "https://github.com/sticsarecmzp",
    liveUrl: "https://github.com/sticsarecmzp"
  }
];

export const TEAM_MEMBERS = [
  {
    name: "Professor Amit Kumar Tiwari",
    role: "Faculty Coordinator",
    affiliation: "Department of Computer Science and Engineering, SAREC Mirzapur",
    initials: "AT",
    isFaculty: true,
    note: "Providing institutional direction, academic lab coordination, and faculty support for all student technical initiatives."
  },
  {
    name: "Piyush Kushwaha",
    role: "Student Co-founder",
    affiliation: "B.Tech CSE, SAREC Mirzapur",
    email: "piyushkushwaha414@gmail.com",
    phone: "+91 94515 01321",
    initials: "PK",
    isFaculty: false,
    focus: "Full-Stack Architecture, Community Operations, Web Guild Lead"
  },
  {
    name: "Pawan Kumar Yadav",
    role: "Student Co-founder",
    affiliation: "B.Tech CSE, SAREC Mirzapur",
    email: "sspawanky@gmail.com",
    phone: "+91 72008 06065",
    initials: "PY",
    isFaculty: false,
    focus: "Competitive Programming, Systems and Linux, Open Source Lead"
  }
];

export const FAQS = [
  {
    question: "Do I need to already know how to code before joining?",
    answer: "No. STIC welcomes students from the absolute beginning. Senior members run foundational sessions in C++, Git, and Web fundamentals to help freshers build their first working projects."
  },
  {
    question: "Is STIC restricted to Computer Science (CSE) students only?",
    answer: "STIC is open to students across all four engineering departments at SAREC Mirzapur: Computer Science and Engineering (CSE), Information Technology (IT), Electronics Engineering (EL), and Electrical Engineering (EE). Cross-disciplinary teams are especially valuable in robotics, IoT, and hackathons."
  },
  {
    question: "Are there any membership fees or paid courses?",
    answer: "No. STIC is entirely free and student-led. All workshops, study circles, lab sessions, and mentorship discussions are hosted free of charge for the campus community."
  },
  {
    question: "Where and when do sessions take place?",
    answer: "Primary physical sessions are held in the SAREC Central Computer Lab and Workshop Hall on weekends (primarily Saturdays) and select weekday evenings after regular academic hours."
  },
  {
    question: "How do I become an active contributor or track lead?",
    answer: "Submit the registration form below with your preferred club track. You can attend the next weekly sprint, introduce yourself in the lab, and start collaborating on existing club repositories."
  }
];
