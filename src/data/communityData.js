export const COMMUNITY_INFO = {
  name: "STIC",
  fullName: "SAREC Mirzapur Technology & Innovation Community",
  subtitle: "Student Developer Club & Technical Community",
  college: "Samrat Ashoka Rajkiya Engineering College, Mirzapur",
  collegeShort: "SAREC Mirzapur",
  university: "Dr. A.P.J. Abdul Kalam Technical University (AKTU), Lucknow",
  institutionType: "State Government Engineering College, Uttar Pradesh",
  establishedYear: "2025",
  collegeWebsite: "https://www.sarecmzp.ac.in/",
  tagline: "Code, Build, Innovate",
  officialEmail: "sticsarecmzp@gmail.com",
  venue: "Central Computer Lab, SAREC Mirzapur",
  location: "Mirzapur, Uttar Pradesh - 231001",
  mapsUrl: "https://maps.app.goo.gl/WdbGH2mPbMcq5Bjj6",
  googleMaps: "https://maps.app.goo.gl/WdbGH2mPbMcq5Bjj6",
  githubOrg: "https://github.com/sticsarecmzp",
  instagram: "https://www.instagram.com/sticsarecmzp",
  linkedin: "https://www.linkedin.com/company/stic-sarec-mirzapur/",
  whatsappGroup: "https://chat.whatsapp.com/LYFm0ufaEtIBjQ9Ao2MXU9",
  openSourceDayForm: "https://docs.google.com/forms/d/e/1FAIpQLSfUl83plbNbxrTvZvdiUuxyqp1VuQXJDW50QrSvY9xEAZVZqw/viewform?usp=publish-editor"
};

export const COMMUNITY_STATS = [
  { value: "4", label: "Learning Domains" },
  { value: "2", label: "Active Projects" },
  { value: "2025", label: "Started In" },
  { value: "100%", label: "Free for Students" }
];

export const COMMUNITY_WORKFLOW = [
  {
    step: "01",
    phase: "Explore",
    title: "Choose Your Track",
    subtitle: "Open to 1st–4th Year",
    description:
      "Web, DSA, Mobile, or Systems. Zero prerequisites — start from scratch with curated roadmaps.",
    accent: "cyan"
  },
  {
    step: "02",
    phase: "Practice",
    title: "Hands-on Lab Sessions",
    subtitle: "Central Computer Lab",
    description:
      "Weekly coding meetups, live debugging sessions, and practical mentorship from senior students.",
    accent: "amber"
  },
  {
    step: "03",
    phase: "Build",
    title: "Team Projects",
    subtitle: "Cross-Branch Teams",
    description:
      "Collaborate across CSE, IT, EL, and EE on real campus tools and open-source software via Git & GitHub.",
    accent: "cyan"
  },
  {
    step: "04",
    phase: "Compete",
    title: "Hackathons & Careers",
    subtitle: "SIH & Placement Prep",
    description:
      "Form college teams for Smart India Hackathon and build a standout technical portfolio.",
    accent: "amber"
  }
];

export const DEPARTMENTS = [
  {
    code: "CSE",
    name: "Computer Science & Engineering",
    description: "Algorithms, systems & computing foundations."
  },
  {
    code: "IT",
    name: "Information Technology",
    description: "Web engineering, cloud systems & security."
  },
  {
    code: "EL",
    name: "Electronics Engineering",
    description: "Embedded systems, microcontrollers & IoT."
  },
  {
    code: "EE",
    name: "Electrical Engineering",
    description: "Power electronics, automation & control."
  }
];

export const FOCUS_AREAS = [
  {
    id: "software",
    title: "Web & App Development",
    accent: "cyan",
    description:
      "Modern web applications, responsive user interfaces, and scalable backend APIs.",
    tags: ["React", "JavaScript", "Node.js", "Next.js", "APIs"]
  },
  {
    id: "app-dev",
    title: "Mobile App Development",
    accent: "amber",
    description:
      "Cross-platform iOS & Android mobile applications built with Flutter and React Native.",
    tags: ["Flutter", "React Native", "Dart", "Android", "Mobile UI"]
  },
  {
    id: "cp-dsa",
    title: "DSA & Problem Solving",
    accent: "cyan",
    description:
      "Data structures, algorithmic thinking, and competitive programming prep in C++.",
    tags: ["C++", "Data Structures", "Algorithms", "LeetCode", "Logic"]
  },
  {
    id: "cyber-cloud",
    title: "DevOps & Systems",
    accent: "cyan",
    description:
      "Linux fundamentals, Git workflows, Docker containers, and secure cloud deployments.",
    tags: ["Linux", "Git & GitHub", "Docker", "Web Security", "Cloud"]
  }
];

export const NOTICES_AND_EVENTS = [
  {
    id: "event-upcoming-opensource",
    type: "upcoming",
    category: "Workshop",
    title: "Open Source Day (Collab: WikiClub Tech & GDG Prayagraj)",
    poster: "/assets/Poster.jpeg",
    date: "Upcoming Campus Event",
    time: "Contribution Sprint",
    venue: "Central Computer Center / Seminar Hall",
    badge: "Upcoming",
    accent: "cyan",
    description:
      "A hands-on sprint with WikiClub Tech and GDG Prayagraj. Learn Git, discover beginner-friendly issues, and submit your first open-source pull requests.",
    eligibility:
      "Open to all B.Tech students (1st–4th Year) across all departments.",
    actions: [
      {
        label: "Register for Open Source Day",
        url: "https://docs.google.com/forms/d/e/1FAIpQLSfUl83plbNbxrTvZvdiUuxyqp1VuQXJDW50QrSvY9xEAZVZqw/viewform?usp=publish-editor",
        isInternal: false,
        primary: true
      },
      {
        label: "Join STIC Community",
        url: "/register",
        isInternal: true,
        primary: false
      }
    ]
  },
  {
    id: "event-past-bwa",
    type: "past",
    category: "AI Workshop & Masterclass",
    title: "Build With AI: Mirzapur Edition (Collab: GDG Prayagraj x TFUG)",
    date: "Completed Session",
    time: "Masterclass & Hands-on Lab",
    venue: "Auditorium & Computer Lab, SAREC Mirzapur",
    badge: "Past Event",
    accent: "cyan",
    speaker: "Nitin Tiwari Sir (Google Developer Expert / GDG Prayagraj)",
    coordinators: "Pawan Kumar Yadav, Piyush Kushwaha & STIC Student Team",
    description:
      "Milestone practical AI masterclass organized at SAREC Mirzapur in collaboration with GDG Prayagraj and TFUG Prayagraj (ML Prayagraj). Featured in-depth sessions by Google Developer Expert Nitin Tiwari on Vision Language Models (VLMs), Google's open models (PaliGemma 2, Gemma 3n), MatFormer architecture, and live in-browser AI inference.",
    recap:
      "Over 120+ student engineers across all engineering departments attended, ran live browser AI models (including Fashion Sketch2Runway demo), and received official certificates of participation.",
    photos: [
      {
        url: "/assets/events/build-with-ai/bwa-01.jpg",
        caption:
          "Google Developer Expert Nitin Tiwari delivering the session on Vision Language Models & PaliGemma 2",
        alt: "Nitin Tiwari presenting at Build With AI SAREC Mirzapur"
      },
      {
        url: "/assets/events/build-with-ai/bwa-02.jpg",
        caption:
          "GDG Prayagraj x SARECM Build With AI: Mirzapur Edition team & student coordinators",
        alt: "Build With AI team at SAREC Mirzapur entrance"
      },
      {
        url: "/assets/events/build-with-ai/bwa-03.jpg",
        caption:
          "SAREC student developers participating in the hands-on AI masterclass in the auditorium",
        alt: "Students attending Build With AI session"
      },
      {
        url: "/assets/events/build-with-ai/bwa-04.jpg",
        caption:
          "Live browser AI inference demonstration: Fashion Sketch2Runway interactive web app",
        alt: "Live demo of Fashion Sketch2Runway"
      },
      {
        url: "/assets/events/build-with-ai/bwa-05.jpg",
        caption:
          "Certificate felicitation acknowledging student organizers and active contributors",
        alt: "Certificate presentation at SAREC Mirzapur"
      },
      {
        url: "/assets/events/build-with-ai/bwa-06.jpg",
        caption:
          "Google Developer Groups Prayagraj x SARECM community collaboration meeting in session",
        alt: "GDG Prayagraj x SAREC collaboration meeting"
      }
    ],
    actions: [
      {
        label: "View on LinkedIn",
        url: "https://www.linkedin.com/posts/stic-sarec-mirzapur_activity-7450132771399729152-N3fo",
        isInternal: false,
        primary: true
      },
      {
        label: "Meet the Team",
        url: "#leadership",
        isInternal: true,
        primary: false
      }
    ]
  },
  {
    id: "event-past-orientation",
    type: "past",
    category: "Orientation",
    title: "Freshers Orientation & Learning Roadmaps",
    date: "Completed Session",
    time: "Roadmaps & Q&A",
    venue: "Conference Hall, SAREC Mirzapur",
    badge: "Past Event",
    accent: "cyan",
    speaker:
      "Piyush Kushwaha, Pawan Kumar Yadav & Leads",
    description:
      "Introduction to engineering tracks in Open Source, Web Development, DSA, and Systems with dev setup guidance for beginners.",
    recap:
      "Clarified starter tracks, setup dev environments, and connected freshers with senior mentors.",
    photos: [
      {
        url: "/assets/events/orientation/orientation-01.jpg",
        caption:
          "STIC student leadership team at the Freshers Orientation kickoff",
        alt: "STIC team at orientation"
      },
      {
        url: "/assets/events/orientation/orientation-02.jpg",
        caption:
          "Piyush Kushwaha introducing Open Source and Git workflows",
        alt: "Open Source presentation"
      },
      {
        url: "/assets/events/orientation/orientation-03.jpg",
        caption:
          "Pawan Kumar Yadav introducing Software Systems and DSA",
        alt: "Software systems roadmap presentation"
      },
      {
        url: "/assets/events/orientation/orientation-04.jpg",
        caption:
          "Students attending the technical roadmap orientation",
        alt: "Students at STIC orientation"
      }
    ],
    actions: [
      {
        label: "View on LinkedIn",
        url: "https://www.linkedin.com/posts/stic-sarec-mirzapur_activity-7449718872049389570-KEMx",
        isInternal: false,
        primary: true
      },
      {
        label: "Meet the Team",
        url: "#leadership",
        isInternal: true,
        primary: false
      }
    ]
  }
];

export const ABOUT_POINTS = [
  {
    title: "Hands-on Projects",
    description:
      "Build real-world web apps and tools rather than just reading theory."
  },
  {
    title: "Senior Mentorship",
    description:
      "Direct guidance on DSA problem solving, debugging, and tech stacks."
  },
  {
    title: "Hackathons & SIH",
    description:
      "Form cross-branch campus teams for Smart India Hackathon and contests."
  },
  {
    title: "Open Source",
    description:
      "Learn Git workflows, collaborate publicly, and make merged pull requests."
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
      focus: "Academic Leadership & Computer Lab Guidance",
      image: "/assets/faculty/Amit.jpeg"
    },
    {
      id: "prince-rajpoot",
      name: "Dr. Prince Rajpoot",
      role: "Faculty Mentor",
      designation: "Associate Professor",
      affiliation: "Dept. of Information Technology",
      college: "SAREC Mirzapur",
      focus: "IoT Hardware, Embedded Systems & Student Projects",
      image: "/assets/faculty/Prince.jpeg"
    },
    {
      id: "abhinav-gupta",
      name: "Dr. Abhinav Gupta",
      role: "Faculty Mentor",
      designation: "Associate Professor",
      affiliation: "Dept. of Electronics Engineering",
      college: "SAREC Mirzapur",
      focus: "Semiconductor Devices & Circuit Design",
      image: "/assets/faculty/Abhinav.jpeg"
    }
  ],
  executives: [
    {
      name: "Piyush Kushwaha",
      role: "Co-Founder & Lead Coordinator",
      affiliation: "B.Tech IT",
      focus: "Web Development & Software Development",
      image: "/assets/team/piyush-kushwaha.jpg"
    },
    {
      name: "Pawan Kumar Yadav",
      role: "Co-Founder & Lead Member",
      affiliation: "B.Tech IT",
      focus: "Linux, Open Source & AI/ML",
      image: "/assets/team/pawan-kumar-yadav-v2.jpg"
    },
    {
      name: "Aditi Yadav",
      role: "Executive Member",
      affiliation: "B.Tech IT",
      focus: "Compèring & Outreach",
      image: "/assets/team/aditi-yadav.jpg"
    },
    {
      name: "Sidhant Maurya",
      role: "Executive Member",
      affiliation: "B.Tech CSE",
      focus: "AI/ML & Data Science",
      image: "/assets/team/sidhant-maurya.jpg"
    },
    {
      name: "Khushi Umrao",
      role: "Executive Member",
      affiliation: "B.Tech CSE",
      focus: "UI/UX & Graphic Design",
      image: "/assets/team/khushi-umrao.jpg"
    },
    {
      name: "Ayush Mishra",
      role: "Executive Member",
      affiliation: "B.Tech IT",
      focus: "AI/ML & Data Science",
      image: "/assets/team/ayush-mishra.jpg"
    },
    {
      name: "Shital Kushwaha",
      role: "Executive Member",
      affiliation: "B.Tech CSE",
      focus: "DSA & Outreach",
      image: "/assets/team/shital-kushwaha.jpg"
    }
  ]
};
