export const COMMUNITY_INFO = {
  name: "STIC",
  fullName: "SAREC Mirzapur Technology & Innovation Community",
  subtitle: "Student Technical Society & Innovation Hub",
  college: "Samrat Ashok Rajkiya Engineering College, Mirzapur",
  collegeShort: "SAREC Mirzapur",
  university: "Dr. A.P.J. Abdul Kalam Technical University (AKTU), Lucknow",
  institutionType: "State Government Engineering College, Uttar Pradesh",
  establishedYear: "2023",
  collegeWebsite: "https://www.sarecmzp.ac.in/",
  tagline: "Code, Build, Innovate",
  officialEmail: "sticsarecmzp@gmail.com",
  venue: "Central Computer Lab & Innovation Workshop, SAREC Mirzapur",
  location: "Mirzapur, Uttar Pradesh - 231001",
  githubOrg: "https://github.com/sticsarecmzp",
  instagram: "https://www.instagram.com/sticsarecmzp",
  linkedin: "https://www.linkedin.com/company/stic-sarec-mirzapur/",
  whatsappGroup: "https://chat.whatsapp.com/HyFakBeKgHeBSF0E0k0sVT"
};

export const COMMUNITY_STATS = [
  { value: "5", label: "Tech Focus Tracks" },
  { value: "20+", label: "Collaborative Projects" },
  { value: "2023", label: "Community Est." },
  { value: "100%", label: "Student-Led & Open" }
];

export const COMMUNITY_WORKFLOW = [
  {
    step: "01",
    phase: "Onboarding & Track Selection",
    title: "Join a Technical Track (Guild)",
    subtitle: "From Zero to Active Builder",
    description: "Whether you are a 1st year beginner or an experienced developer, pick one or more technical tracks: Web & Mobile, AI/ML, CP/DSA, CyberSec, or Embedded Systems. No prerequisites required—we start from ground zero.",
    accent: "cyan"
  },
  {
    step: "02",
    phase: "Weekly Sprints & Mentorship",
    title: "Peer Learning & Lab Coding Sprints",
    subtitle: "Central Computer Lab, SAREC",
    description: "Participate in weekly hands-on coding sessions, guided algorithmic problem solving, and modern development masterclasses led by senior student leads and guided by faculty mentors.",
    accent: "purple"
  },
  {
    step: "03",
    phase: "Team Project Incubation",
    title: "Build Real Software on GitHub",
    subtitle: "Interdisciplinary Collaboration",
    description: "Team up in squads across CSE, IT, EL, and EE branches. Use production Git workflows to build campus portals, community tools, automation systems, and public open-source software.",
    accent: "amber"
  },
  {
    step: "04",
    phase: "Competitions & Careers",
    title: "Hackathons, SIH & Career Growth",
    subtitle: "National Stages & Industry Portfolios",
    description: "Represent SAREC Mirzapur at Smart India Hackathon (SIH) and premier national hackathons. Build an authentic, verified developer portfolio to secure top-tier engineering internships and job opportunities.",
    accent: "emerald"
  }
];

export const DEPARTMENTS = [
  { 
    code: "CSE", 
    name: "Computer Science & Engineering",
    description: "Algorithms, operating systems & computing foundations."
  },
  { 
    code: "IT", 
    name: "Information Technology",
    description: "Web engineering, cloud infrastructure & software systems."
  },
  { 
    code: "EL", 
    name: "Electronics Engineering",
    description: "Embedded circuits, microcontrollers & robotics hardware."
  },
  { 
    code: "EE", 
    name: "Electrical Engineering",
    description: "Power electronics, IoT interfacing & automation."
  }
];

export const FOCUS_AREAS = [
  {
    id: "software",
    title: "Web & Mobile",
    accent: "cyan",
    description: "Production-grade web apps, responsive UIs, and modern API microservices.",
    tags: ["React", "Node.js", "TypeScript", "Next.js", "APIs"]
  },
  {
    id: "ai-ds",
    title: "AI / ML & Data",
    accent: "purple",
    description: "Machine learning, neural networks, predictive modeling, and data pipelines.",
    tags: ["Python", "TensorFlow", "PyTorch", "Pandas", "Scikit-Learn"]
  },
  {
    id: "cp-dsa",
    title: "CP & Algorithms",
    accent: "amber",
    description: "Data structures, algorithmic problem solving & competitive coding contests.",
    tags: ["C++", "DSA", "LeetCode", "Codeforces", "System Design"]
  },
  {
    id: "cyber-cloud",
    title: "CyberSec & DevOps",
    accent: "emerald",
    description: "Defensive security, Linux systems, Docker containers & CI/CD deployment.",
    tags: ["Linux", "Docker", "Git/CI", "OWASP", "Cloud Ops"]
  },
  {
    id: "iot-robotics",
    title: "Systems & Embedded",
    accent: "rose",
    description: "Microcontrollers, telemetry, physical computing & robotics hardware.",
    tags: ["Arduino", "ESP32", "Sensors", "Robotics", "Embedded C"]
  }
];

export const NOTICES_AND_EVENTS = [
  {
    id: "event-upcoming-1",
    type: "upcoming",
    category: "Hackathon",
    title: "STIC HackSprint 2026: 24-Hour Campus Hackathon",
    date: "November 14 – 15, 2026",
    time: "24-Hour Overnight Sprint",
    venue: "Central Computer Lab & Workshop Hall, SAREC Mirzapur",
    badge: "REGISTRATIONS OPEN",
    accent: "amber",
    description: "The flagship annual hackathon bringing together cross-departmental teams to build innovative solutions for campus challenges, smart governance, and AI automation.",
    eligibility: "Open to all B.Tech students (1st, 2nd, 3rd & 4th Year) across CSE, IT, EL, and EE.",
    actions: [
      { label: "Register for HackSprint", url: "#contact", isInternal: true, primary: true },
      { label: "View Problem Tracks", url: "#domains", isInternal: true, primary: false }
    ]
  },
  {
    id: "event-upcoming-2",
    type: "upcoming",
    category: "Technical Masterclass",
    title: "DSA & Competitive Programming Masterclass: Roadmap 2026",
    date: "October 28, 2026",
    time: "4:00 PM – 6:30 PM IST",
    venue: "Central Computer Lab & Hybrid Stream",
    badge: "UPCOMING WORKSHOP",
    accent: "purple",
    description: "Senior club leads share the exact roadmap to master LeetCode, Codeforces, time-space complexity, recursion, and dynamic programming for technical interviews.",
    eligibility: "Open to all students aiming for top-tier product engineering careers.",
    actions: [
      { label: "Reserve Seat (Free)", url: "#contact", isInternal: true, primary: true }
    ]
  },
  {
    id: "event-past-1",
    type: "past",
    category: "Bootcamp Recap",
    title: "Hands-on Git, GitHub & Open Source Contribution Sprint",
    date: "September 18, 2026",
    time: "Completed Session",
    venue: "Central Computer Lab, SAREC",
    badge: "COMPLETED",
    accent: "cyan",
    description: "Practical workshop on distributed version control, branching strategies, resolving merge conflicts, and making first verified PR contributions to STIC campus repositories.",
    recap: "85+ student engineers configured Git SSH keys, resolved merge conflicts, and submitted their first pull requests on GitHub.",
    actions: [
      { label: "View GitHub Repositories", url: "https://github.com/sticsarecmzp", isInternal: false, primary: true }
    ]
  },
  {
    id: "event-past-2",
    type: "past",
    category: "Ideathon Recap",
    title: "STIC Internal Ideathon: Smart India Hackathon (SIH) Qualifier",
    date: "August 24, 2026",
    time: "Completed Session",
    venue: "Seminar Hall, SAREC Mirzapur",
    badge: "COMPLETED",
    accent: "emerald",
    description: "14 cross-departmental student squads pitched technology solutions across Smart Agriculture, Campus Utilities, and AI Healthcare. Top 3 teams shortlisted for faculty mentorship.",
    recap: "14 squads pitched prototypes; 3 winning squads received dedicated faculty mentorship and project incubation guidance.",
    actions: [
      { label: "Explore Open Source Projects", url: "https://github.com/sticsarecmzp", isInternal: false, primary: true }
    ]
  },
  {
    id: "news-circular-1",
    type: "news",
    category: "Official Circular",
    title: "STIC 2026-27 Executive Council & Domain Leads Announced",
    date: "October 10, 2026",
    time: "Official Release",
    venue: "STIC SAREC Mirzapur",
    badge: "OFFICIAL NEWS",
    accent: "rose",
    description: "Announcing the newly appointed student executive council and technical domain coordinators across Web, AI/ML, CP/DSA, CyberSec, and Embedded Systems.",
    actions: [
      { label: "Meet the Leadership Team", url: "#leadership", isInternal: true, primary: true }
    ]
  },
  {
    id: "news-circular-2",
    type: "news",
    category: "Campus Update",
    title: "STIC Open Innovation Lab Open for Student Project Squads",
    date: "September 02, 2026",
    time: "Facility Announcement",
    venue: "Central Computer Center, SAREC Mirzapur",
    badge: "ANNOUNCEMENT",
    accent: "cyan",
    description: "Dedicated workstation bay, high-speed campus internet, and test hardware kits (ESP32, sensor modules) now accessible for registered STIC project squads.",
    actions: [
      { label: "Learn How to Join", url: "#workflow", isInternal: true, primary: true }
    ]
  }
];

export const ABOUT_POINTS = [
  {
    title: "Applied Software & Systems",
    description: "Building production web platforms, AI pipelines, and embedded IoT systems."
  },
  {
    title: "Peer-to-Peer Mentorship",
    description: "Senior guidance in algorithms, competitive programming, and developer roadmaps."
  },
  {
    title: "Hackathons & SIH Sprints",
    description: "Assembling interdisciplinary teams for national hackathons and open challenges."
  },
  {
    title: "Open Source & Bootcamps",
    description: "Modern Git workflows, hands-on workshops, and student tech talks."
  }
];

export const LEADERSHIP = {
  faculty: [
    {
      id: "amit-tiwari",
      name: "Dr. Amit Kumar Tiwari",
      role: "Faculty Coordinator",
      designation: "Associate Professor",
      affiliation: "Dept. of Computer Science & Engineering",
      college: "SAREC Mirzapur",
      focus: "Academic Leadership, Research & Computer Lab Mentorship",
      image: "/assets/faculty/amit-kumar-tiwari.webp",
      fallbackImage: "/assets/faculty/amit-kumar-tiwari.jpg"
    },
    {
      id: "prince-rajpoot",
      name: "Dr. Prince Rajpoot",
      role: "Faculty Mentor",
      designation: "Associate Professor",
      affiliation: "Dept. of Electronics Engineering",
      college: "SAREC Mirzapur",
      focus: "WSN, IoT Hardware, AI/ML & Embedded Systems",
      image: "/assets/faculty/prince-rajpoot.webp",
      fallbackImage: "/assets/faculty/prince-rajpoot.jpg"
    },
    {
      id: "abhinav-gupta",
      name: "Dr. Abhinav Gupta",
      role: "Faculty Mentor",
      designation: "Associate Professor",
      affiliation: "Dept. of Electronics Engineering",
      college: "SAREC Mirzapur",
      focus: "Semiconductor Devices, VLSI & Low-Power Architectures",
      image: "/assets/faculty/abhinav-gupta.webp",
      fallbackImage: "/assets/faculty/abhinav-gupta.jpg"
    }
  ],
  coFounders: [
    {
      name: "Piyush Kushwaha",
      role: "Student Co-founder",
      affiliation: "B.Tech IT",
      focus: "Web & Mobile Platforms, Cloud Architecture & DevOps"
    },
    {
      name: "Pawan Kumar Yadav",
      role: "Student Co-founder",
      affiliation: "B.Tech IT",
      focus: "Competitive Programming, DSA & Linux Systems"
    }
  ],
  executives: [
    {
      name: "Ayush Mishra",
      role: "Executive Member",
      affiliation: "B.Tech IT",
      focus: "AI & Data Science, Promotion & Technical Outreach"
    },
    {
      name: "Sidhant Maurya",
      role: "Executive Member",
      affiliation: "B.Tech CSE",
      focus: "AI & Data Science, Open-Source Development"
    },
    {
      name: "Khushi Umrao",
      role: "Executive Member",
      affiliation: "B.Tech CSE",
      focus: "Creative UI/UX Design & Event Brand Graphics"
    },
    {
      name: "Aditi Yadav",
      role: "Executive Member",
      affiliation: "B.Tech IT",
      focus: "Sponsorship & Institutional Relations, Public Relations"
    },
    {
      name: "Shital Kushwaha",
      role: "Executive Member",
      affiliation: "B.Tech CSE",
      focus: "Visual Design, Media Assets & Community Identity"
    }
  ]
};
