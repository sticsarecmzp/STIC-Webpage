import React from "react";
import {
  Award,
  Shield,
  Sparkles,
  GraduationCap,
  Users,
} from "lucide-react";

import { LEADERSHIP } from "../data/communityData";

const Leadership = () => {
  const faculty = LEADERSHIP?.faculty || [];
  const executives = LEADERSHIP?.executives || [];

  // Core Team Members
  const coreTeam = [
    {
      id: 1,
      name: "Harshita Mishra",
      role: "Core Team Member",
      image: "/assets/team/Harshita.jpeg",
    },
    {
      id: 2,
      name: "Anjesh",
      role: "Core Team Member",
      image: "/assets/team/Anjesh.jpeg",
    },
    {
      id: 3,
      name: "Om Prakash",
      role: "Core Team Member",
      image: "/assets/team/Om%20prakash.jpeg",
    },
    {
      id: 4,
      name: "Divyansh Vandan Srivastava",
      role: "Core Team Member",
      image: "/assets/team/Divyansh%20vandan.jpeg",
    },
  ];

  // Normalize names to avoid spacing and capitalization issues.
  const normalizeName = (name = "") =>
    name.trim().replace(/\s+/g, " ").toLowerCase();

  // Identify Founder and Co-Founder.
  const getFounderType = (name) => {
    const normalizedName = normalizeName(name);

    if (normalizedName === "piyush kushwaha") {
      return "founder";
    }

    if (normalizedName === "pawan kumar yadav") {
      return "cofounder";
    }

    return "";
  };

  // Reusable member card.
  const renderMemberCard = (member, index, section) => {
    const founderType =
      section === "executives" ? getFounderType(member.name) : "";

    const cardClass = [
      "neo-card",
      section === "faculty" ? "faculty-card" : "",
      section === "executives" ? "exec-mini-card" : "",
      section === "core" ? "core-team-card" : "",
      founderType === "founder" ? "founder-highlight" : "",
      founderType === "cofounder" ? "cofounder-highlight" : "",
    ]
      .filter(Boolean)
      .join(" ");

    return (
      <div
        key={member.id || member.name || index}
        className={cardClass}
      >
        {/* Founder / Co-Founder Label */}
        {founderType && (
          <div className={`founder-ribbon ${founderType}`}>
            {founderType === "founder" ? "FOUNDER" : "CO-FOUNDER"}
          </div>
        )}

        {/* Member Image */}
        <div className="leadership-image-wrapper">
          <img
            src={member.image || member.img || "/assets/default-avatar.png"}
            alt={member.name || "Team Member"}
            className="leadership-image"
            loading="lazy"
            onError={(event) => {
              event.currentTarget.style.visibility = "hidden";
            }}
          />
        </div>

        {/* Member Information */}
        <div className="leadership-info">
          <h3 className="leadership-name">
            {member.name}
          </h3>

          {member.role && (
            <span className="exec-role-pill">
              {member.role}
            </span>
          )}

          {member.designation && (
            <p className="leadership-designation">
              {member.designation}
            </p>
          )}

          {member.department && (
            <p className="leadership-department">
              {member.department}
            </p>
          )}

          {member.description && (
            <p className="leadership-description">
              {member.description}
            </p>
          )}

          {member.bio && (
            <p className="leadership-description">
              {member.bio}
            </p>
          )}

          {/* Social Links */}
          {(member.linkedin || member.github || member.website) && (
            <div className="leadership-socials">
              {member.linkedin && (
                <a
                  href={member.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${member.name} LinkedIn`}
                >
                  LinkedIn
                </a>
              )}

              {member.github && (
                <a
                  href={member.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${member.name} GitHub`}
                >
                  GitHub
                </a>
              )}

              {member.website && (
                <a
                  href={member.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${member.name} Website`}
                >
                  Website
                </a>
              )}
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <section className="leadership-section" id="leadership">
      {/* Main Heading */}
      <div className="leadership-header">
        <span className="section-eyebrow">
          <Sparkles size={16} />
          THE PEOPLE BEHIND STIC
        </span>

        <h1 className="leadership-main-title">
          Meet Our <span>Leadership</span>
        </h1>

        <p className="leadership-subtitle">
          Meet the mentors, leaders, and dedicated team members
          working together to build our community.
        </p>
      </div>

      {/* =========================================
          1. FACULTY MENTORS & ADVISORS
      ========================================= */}
      <div className="leadership-group faculty-group">
        <div className="leadership-group-heading">
          <div className="leadership-heading-icon faculty-heading-icon">
            <GraduationCap size={25} />
          </div>

          <div>
            <h2>Faculty Mentors &amp; Advisors</h2>
            <p>
              Guidance, mentorship, and academic support.
            </p>
          </div>
        </div>

        <div className="leadership-grid faculty-grid">
          {faculty.map((member, index) =>
            renderMemberCard(member, index, "faculty")
          )}
        </div>
      </div>

      {/* =========================================
          2. CO-FOUNDERS & EXECUTIVE MEMBERS
      ========================================= */}
      <div className="leadership-group executive-group">
        <div className="leadership-group-heading">
          <div className="leadership-heading-icon executive-heading-icon">
            <Shield size={25} />
          </div>

          <div>
            <h2>Co-Founders &amp; Executive Members</h2>
            <p>
              The leaders driving our vision and initiatives forward.
            </p>
          </div>
        </div>

        <div className="leadership-grid executive-grid">
          {executives.map((member, index) =>
            renderMemberCard(member, index, "executives")
          )}
        </div>
      </div>

      {/* =========================================
          3. CORE TEAM
      ========================================= */}
      <div className="leadership-group core-team-group">
        <div className="leadership-group-heading">
          <div className="leadership-heading-icon core-heading-icon">
            <Users size={25} />
          </div>

          <div>
            <h2>Core Team</h2>
            <p>
              The passionate people who make things happen.
            </p>
          </div>
        </div>

        <div className="leadership-grid core-team-grid">
          {coreTeam.map((member, index) =>
            renderMemberCard(member, index, "core")
          )}
        </div>
      </div>

      {/* Closing Section */}
      <div className="leadership-footer">
        <Award size={22} />

        <p>
          Together, we learn, lead, innovate, and grow.
        </p>
      </div>
    </section>
  );
};

export default Leadership;
