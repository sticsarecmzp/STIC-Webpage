export const COMMUNITY_INFO = {
  name: "STIC",
  fullName: "SAREC Mirzapur Technology & Innovation Community",
  subtitle: "Student Technical Society & Innovation Hub",
  college: "Samrat Ashoka Rajkiya Engineering College, Mirzapur",
  collegeShort: "SAREC Mirzapur",
  university: "Dr. A.P.J. Abdul Kalam Technical University (AKTU), Lucknow",
  institutionType: "State Government Engineering College, Uttar Pradesh",
  establishedYear: "2023",
  collegeWebsite: "https://www.sarecmzp.ac.in/",
  tagline: "Code, Build, Innovate",
  officialEmail: "sticsarecmzp@gmail.com",
  venue: "Central Computer Lab & Innovation Workshop, SAREC Mirzapur",
  location: "Mirzapur, Uttar Pradesh - 231001",
  officialAbout: "STIC (SAREC Mirzapur Technology & Innovation Community) is the official tech-driven student society of Samrat Ashoka Rajkiya Engineering College, Mirzapur. Built by students for students, STIC bridges the gap between academic curriculum and real-world technology. We focus on hands-on growth across core engineering domains: Data Structures & Algorithms (DSA), Full-Stack Development, Machine Learning, and Competitive Programming. From hosting hackathons to community workshops, our mission is to empower developers from ground zero to confident builders. Following our milestone Build with AI initiative, we are actively driving open-source culture on campus, currently organizing Open Source Day in collaboration with WikiClub Tech and GDG Prayagraj.",
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
    id: "event-upcoming-opensource",
    type: "upcoming",
    category: "Flagship Campus Initiative",
    title: "Open Source Day (Collab: WikiClub Tech & GDG Prayagraj)",
    date: "Upcoming Campus Event",
    time: "Full-Day Collaborative Contribution Sprint",
    venue: "Central Computer Center / Seminar Hall, SAREC Mirzapur",
    badge: "UPCOMING EVENT",
    accent: "cyan",
    description: "Driving open-source culture on campus! Organized by STIC in collaboration with WikiClub Tech and GDG Prayagraj. Building directly on the roadmap introduced in our orientation, students will master Git & GitHub workflows, resolve 'good first issues', and make live pull requests to global open-source repositories under mentor guidance.",
    eligibility: "Open to all B.Tech students (1st, 2nd, 3rd & 4th Year) across CSE, IT, EL, and EE branches.",
    actions: [
      { label: "Register Interest / Join", url: "#contact", isInternal: true, primary: true },
      { label: "Explore STIC GitHub", url: "https://github.com/sticsarecmzp", isInternal: false, primary: false }
    ]
  },
  {
    id: "event-past-buildwithai",
    type: "past",
    category: "Milestone Hands-on Masterclass",
    title: "Build With AI: Mirzapur Edition (Collab: GDG Prayagraj & TFUG Prayagraj)",
    date: "April 4, 2026",
    time: "9:00 AM – Full Day Hands-on Session",
    venue: "Seminar Hall & Computer Lab, SAREC Mirzapur",
    badge: "COMPLETED MILESTONE",
    accent: "purple",
    speaker: "Nitin Tiwari Sir (Google Developer Expert / GDG Prayagraj)",
    coordinators: "Pawan Kumar Yadav, Piyush Kushwaha & STIC Student Team",
    description: "Milestone practical AI masterclass organized at SAREC Mirzapur in collaboration with GDG Prayagraj and TFUG Prayagraj (ML Prayagraj). Featured in-depth sessions by Google Developer Expert Nitin Tiwari on Vision Language Models (VLMs), Google's open models (PaliGemma 2, Gemma 3n), MatFormer architecture, and live in-browser AI inference.",
    recap: "Over 120+ student engineers across all engineering departments attended, ran live browser AI models (including Fashion Sketch2Runway demo), and received official certificates of participation.",
    photos: [
      {
        url: "/assets/events/build-with-ai/bwa-01.jpg",
        caption: "Google Developer Expert Nitin Tiwari delivering the session on Vision Language Models & PaliGemma 2",
        alt: "Nitin Tiwari presenting at Build With AI SAREC Mirzapur"
      },
      {
        url: "/assets/events/build-with-ai/bwa-02.jpg",
        caption: "GDG Prayagraj x SARECM Build With AI: Mirzapur Edition team & student coordinators",
        alt: "Build With AI team at SAREC Mirzapur entrance"
      },
      {
        url: "/assets/events/build-with-ai/bwa-03.jpg",
        caption: "SAREC student developers participating in the hands-on AI masterclass in the auditorium",
        alt: "Students attending Build With AI session"
      },
      {
        url: "/assets/events/build-with-ai/bwa-04.jpg",
        caption: "Live browser AI inference demonstration: Fashion Sketch2Runway interactive web app",
        alt: "Live demo of Fashion Sketch2Runway"
      },
      {
        url: "/assets/events/build-with-ai/bwa-05.jpg",
        caption: "Certificate felicitation acknowledging student organizers and active contributors",
        alt: "Certificate presentation at SAREC Mirzapur"
      },
      {
        url: "/assets/events/build-with-ai/bwa-06.jpg",
        caption: "Google Developer Groups Prayagraj x SARECM community collaboration meeting in session",
        alt: "GDG Prayagraj x SAREC collaboration meeting"
      }
    ],
    actions: [
      { label: "View Post on LinkedIn", url: "https://www.linkedin.com/posts/stic-sarec-mirzapur_activity-7450132771399729152-N3fo", isInternal: false, primary: true },
      { label: "Explore STIC Projects", url: "https://github.com/sticsarecmzp", isInternal: false, primary: false }
    ]
  },
  {
    id: "event-past-orientation",
    type: "past",
    category: "Community Orientation",
    title: "Freshers Orientation & Technical Guilds Roadmap Kickoff",
    date: "Completed Campus Session",
    time: "Comprehensive Technical Roadmap",
    venue: "Conference Hall, SAREC Mirzapur",
    badge: "ROADMAP UNVEILED",
    accent: "amber",
    speaker: "Piyush Kushwaha (Overall Coordinator & Tech Lead), Pawan Kumar Yadav & Core Team",
    description: "Conducted to eliminate early-stage confusion for incoming engineering freshers and provide clear, guided technical trajectories. Unveiled 4 core engineering domains: Open Source Contribution, Web & Mobile Development, Competitive Programming (DSA), and AI/Machine Learning.",
    recap: "Addressed common beginner roadblocks, demonstrated how to start from ground zero, and laid out the pathway to hackathons and SIH. Mentored by seniors Shivansh Mishra & Utkarsh Aryan Mishra with guidance from Ankit Kumar Verma sir (GDG Prayagraj).",
    photos: [
      {
        url: "/assets/events/orientation/orientation-01.jpg",
        caption: "STIC student leadership team at the Freshers Orientation & Technical Roadmap kickoff",
        alt: "STIC team at orientation"
      },
      {
        url: "/assets/events/orientation/orientation-02.jpg",
        caption: "Student Co-founder Piyush Kushwaha presenting Track 02: Open Source Contribution at the podium",
        alt: "Open Source Contribution presentation"
      },
      {
        url: "/assets/events/orientation/orientation-03.jpg",
        caption: "Student Co-founder Pawan Kumar Yadav presenting the AI/ML & Deep Learning roadmap",
        alt: "Deep learning path presentation"
      },
      {
        url: "/assets/events/orientation/orientation-04.jpg",
        caption: "Executive council members and student engineers attending the roadmap orientation",
        alt: "Students at STIC orientation"
      }
    ],
    actions: [
      { label: "View Post on LinkedIn", url: "https://www.linkedin.com/posts/stic-sarec-mirzapur_webdevelopment-genai-studentdeveloper-activity-7449718872049389570-KEMx", isInternal: false, primary: true },
      { label: "Meet Leadership Team", url: "#leadership", isInternal: true, primary: false }
    ]
  },
  {
    id: "news-collab-opensource",
    type: "news",
    category: "Official Announcement",
    title: "STIC Driving Open Source Culture with WikiClub Tech & GDG Prayagraj",
    date: "Official Circular",
    time: "Campus Announcement",
    venue: "SAREC Mirzapur",
    badge: "OFFICIAL NEWS",
    accent: "cyan",
    description: "Following our milestone Build with AI initiative, STIC is actively fostering real-world developer practices on campus in formal collaboration with WikiClub Tech and GDG Prayagraj to prepare students for Smart India Hackathon (SIH), Google Summer of Code (GSoC), and product engineering roles.",
    actions: [
      { label: "Connect with STIC", url: "#contact", isInternal: true, primary: true }
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
