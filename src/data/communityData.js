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
  githubOrg: "https://github.com/sticsarecmzp",
  instagram: "https://www.instagram.com/sticsarecmzp",
  linkedin: "https://www.linkedin.com/company/stic-sarec-mirzapur/",
  whatsappGroup: "https://chat.whatsapp.com/HyFakBeKgHeBSF0E0k0sVT"
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
    phase: "Getting Started",
    title: "Pick What You Want to Learn",
    subtitle: "Open to 1st to 4th Year",
    description:
      "Choose what interests you—Web Development, DSA, Mobile Apps, or Systems. There are no prerequisites. Everyone starts somewhere, and we help you get set up from day one.",
    accent: "cyan"
  },
  {
    step: "02",
    phase: "Weekly Meetups",
    title: "Learn & Code in the Lab",
    subtitle: "Central Computer Lab, SAREC",
    description:
      "We meet for hands-on sessions in the lab. Seniors walk through practical problem-solving approaches, help debug your code, and share tips for tech careers.",
    accent: "amber"
  },
  {
    step: "03",
    phase: "Building Together",
    title: "Work on Real Projects",
    subtitle: "Cross-Branch Teams",
    description:
      "Team up with friends across CSE, IT, EL, and EE. Use Git and GitHub to collaborate on useful software, tools for the campus, and open-source contributions.",
    accent: "cyan"
  },
  {
    step: "04",
    phase: "Competitions",
    title: "Compete in Hackathons",
    subtitle: "Hackathons & Opportunities",
    description:
      "Form college teams for Smart India Hackathon (SIH) and regional tech contests. Build a strong project portfolio that stands out in internship and placement drives.",
    accent: "amber"
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
    title: "Web & App Development",
    accent: "cyan",
    description:
      "Building responsive websites, interactive web applications, and backend APIs using modern tools.",
    tags: ["React", "JavaScript", "Node.js", "Next.js", "APIs"]
  },
  {
    id: "app-dev",
    title: "Mobile & App Development",
    accent: "amber",
    description:
      "Building responsive mobile applications, cross-platform apps, and modern interfaces using Flutter and React Native.",
    tags: ["Flutter", "React Native", "Dart", "Android", "Mobile UI"]
  },
  {
    id: "cp-dsa",
    title: "DSA & Problem Solving",
    accent: "cyan",
    description:
      "Building strong problem-solving skills in C++, mastering data structures, and practicing for competitive coding and interviews.",
    tags: ["C++", "Data Structures", "Algorithms", "LeetCode", "Logic Building"]
  },
  {
    id: "cyber-cloud",
    title: "DevOps & Systems",
    accent: "cyan",
    description:
      "Learning Linux essentials, Git workflows, Docker containers, and practical software hosting.",
    tags: ["Linux", "Git & GitHub", "Docker", "Web Security", "Hosting"]
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
    time: "Full-Day Hands-on Contribution Sprint",
    venue: "Central Computer Center / Seminar Hall, SAREC Mirzapur",
    badge: "Upcoming",
    accent: "cyan",
    description:
      "A hands-on sprint organized by STIC with WikiClub Tech and GDG Prayagraj. Mentors will help students set up Git, navigate GitHub repositories, find beginner-friendly issues, and submit their first pull requests to open-source projects.",
    eligibility:
      "Open to all B.Tech students (1st, 2nd, 3rd & 4th Year) across all branches.",
    actions: [
      {
        label: "Register / Join",
        url: "/register",
        isInternal: true,
        primary: true
      },
      {
        label: "Visit STIC GitHub",
        url: "https://github.com/sticsarecmzp",
        isInternal: false,
        primary: false
      }
    ]
  },
  {
    id: "event-past-webmasterclass",
    type: "past",
    category: "Tech Masterclass",
    title: "Full-Stack & Cloud Architecture (Collab: GDG Prayagraj)",
    date: "April 4, 2026",
    time: "Full Day Hands-on Session",
    venue: "Seminar Hall & Computer Lab, SAREC Mirzapur",
    badge: "Past Event",
    accent: "amber",
    speaker: "Nitin Tiwari Sir (Google Developer Expert / GDG Prayagraj)",
    coordinators:
      "Pawan Kumar Yadav, Piyush Kushwaha & STIC Student Team",
    description:
      "Hands-on full-stack engineering and cloud deployment workshop hosted at SAREC Mirzapur with GDG Prayagraj. Industry mentors demonstrated modern application design, scalable backend APIs, and collaborative development workflows.",
    recap:
      "Over 120+ students from across all departments attended, coded practical applications on their laptops, and received participation certificates.",
    photos: [
      {
        url: "/assets/events/orientation/orientation-01.jpg",
        caption:
          "STIC leadership team and coordinators at the campus technical session",
        alt: "STIC leadership team at SAREC Mirzapur"
      },
      {
        url: "/assets/events/orientation/orientation-02.jpg",
        caption:
          "Mentors delivering full-stack and open-source roadmap session",
        alt: "Full-stack developer roadmap session at SAREC Mirzapur"
      },
      {
        url: "/assets/events/orientation/orientation-03.jpg",
        caption:
          "Students participating in the hands-on coding masterclass",
        alt: "Students attending coding masterclass session"
      },
      {
        url: "/assets/events/orientation/orientation-04.jpg",
        caption:
          "Interactive development walkthrough and architecture demonstration",
        alt: "Interactive developer walkthrough at SAREC Mirzapur"
      },
      {
        url: "/assets/events/orientation/orientation-05.jpg",
        caption:
          "Certificate distribution and student contributor recognition",
        alt: "Certificate presentation at SAREC Mirzapur"
      },
      {
        url: "/assets/events/orientation/orientation-06.jpg",
        caption:
          "Community collaboration and future workshop roadmap discussion",
        alt: "STIC community collaboration meeting"
      }
    ],
    actions: [
      {
        label: "View Post on LinkedIn",
        url: "https://www.linkedin.com/posts/stic-sarec-mirzapur_activity-7450132771399729152-N3fo",
        isInternal: false,
        primary: true
      },
      {
        label: "Explore GitHub",
        url: "https://github.com/sticsarecmzp",
        isInternal: false,
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
    time: "Introductory Roadmap & Q&A",
    venue: "Conference Hall, SAREC Mirzapur",
    badge: "Past Event",
    accent: "cyan",
    speaker:
      "Piyush Kushwaha, Pawan Kumar Yadav & Senior Student Leads",
    description:
      "Organized to help first-year students start their engineering journey with clear direction. We discussed learning tracks in Open Source, Web Development, DSA, and Cloud Systems, and explained how to get started from scratch.",
    recap:
      "Addressed common beginner doubts, showed how to set up dev environments, and mapped out paths to hackathons and placements with senior mentors.",
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
        label: "View Post on LinkedIn",
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
      "Learn by building tools, websites, and applications rather than just reading theory."
  },
  {
    title: "Senior Mentorship",
    description:
      "3rd and 4th year students help freshers with DSA, debugging, and roadmap guidance."
  },
  {
    title: "Hackathons & SIH",
    description:
      "Teaming up across departments to participate in Smart India Hackathon and college competitions."
  },
  {
    title: "Open Source & Workshops",
    description:
      "Hands-on sessions on Git, GitHub, collaborative workflows, and software development."
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
      focus: "IoT Hardware, Embedded Systems & Student Projects",
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
      focus: "Semiconductor Devices & Circuit Design",
      image: "/assets/faculty/abhinav-gupta.webp",
      fallbackImage: "/assets/faculty/abhinav-gupta.jpg"
    }
  ],
  executives: [
    {
      name: "Piyush Kushwaha",
      role: "Co-Founder & Lead Coordinator",
      affiliation: "B.Tech IT",
      focus: "Web Development, DevOps & Community Coordination",
      image: "/assets/team/piyush-kushwaha.jpg"
    },
    {
      name: "Pawan Kumar Yadav",
      role: "Co-Founder & Lead Member",
      affiliation: "B.Tech IT",
      focus: "Competitive Programming, DSA & System Design",
      image: "/assets/team/pawan-kumar-yadav-v2.jpg"
    },
    {
      name: "Aditi Yadav",
      role: "Executive Member",
      affiliation: "B.Tech IT",
      focus: "Event Coordination & Student Outreach",
      image: "/assets/team/aditi-yadav.jpg"
    },
    {
      name: "Sidhant Maurya",
      role: "Executive Member",
      affiliation: "B.Tech CSE",
      focus: "Python, Open-Source & Backend Systems",
      image: "/assets/team/sidhant-maurya.jpg"
    },
    {
      name: "Khushi Umrao",
      role: "Executive Member",
      affiliation: "B.Tech CSE",
      focus: "UI/UX Design & Creative Lead",
      image: "/assets/team/khushi-umrao.jpg"
    },
    {
      name: "Ayush Mishra",
      role: "Executive Member",
      affiliation: "B.Tech IT",
      focus: "Web Development & Community Outreach",
      image: "/assets/team/ayush-mishra.jpg"
    },
    {
      name: "Shital Kushwaha",
      role: "Executive Member",
      affiliation: "B.Tech CSE",
      focus: "Design, Visual Assets & Media",
      image: "/assets/team/shital-kushwaha.jpg"
    }
  ]
};
