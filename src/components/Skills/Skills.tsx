"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const skillGroups = [
  {
    category: "AI / ML",
    icon: "🤖",
    color: "var(--cyan)",
    dimColor: "var(--cyan-dim)",
    skills: ["Machine Learning", "Deep Learning", "Computer Vision", "NLP", "Image Processing", "OOP & Algorithms"],
  },
  {
    category: "Languages & Frameworks",
    icon: "🐍",
    color: "var(--purple)",
    dimColor: "var(--purple-dim)",
    skills: ["Python", "MATLAB", "PyTorch", "Scikit-learn", "OpenCV", "FastAPI", "Streamlit", "Langchain", "Langgraph"],
  },
  {
    category: "Data & Tools",
    icon: "🛸",
    color: "var(--pink)",
    dimColor: "var(--pink-dim)",
    skills: ["Numpy", "Pandas", "Git", "Docker", "Linux", "n8n", "AWS (basic)", "Jira", "Ollama", "vLLM"],
  },
  {
    category: "Astronomy",
    icon: "🔭",
    color: "var(--amber)",
    dimColor: "rgba(245,158,11,0.15)",
    skills: ["Stellarium", "Astrophotography", "Celestial Mechanics", "Nebulae", "Deep Sky Objects", "Cosmology"],
  },
];

const constellationLines = [
  { x1: "15%", y1: "20%", x2: "30%", y2: "40%" },
  { x1: "30%", y1: "40%", x2: "55%", y2: "25%" },
  { x1: "55%", y1: "25%", x2: "80%", y2: "45%" },
  { x1: "80%", y1: "45%", x2: "70%", y2: "70%" },
  { x1: "70%", y1: "70%", x2: "45%", y2: "80%" },
  { x1: "45%", y1: "80%", x2: "20%", y2: "65%" },
];

export default function Skills() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="skills" className="section" ref={ref} style={{ background: "var(--bg-surface)" }}>
      <div className="nebula-purple" style={{ bottom: "-20%", left: "10%", opacity: 0.5 }} />

      {/* Constellation decoration */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          overflow: "hidden",
          pointerEvents: "none",
          opacity: 0.12,
        }}
      >
        <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
          {constellationLines.map((line, i) => (
            <line
              key={i}
              x1={line.x1}
              y1={line.y1}
              x2={line.x2}
              y2={line.y2}
              stroke="var(--cyan)"
              strokeWidth="0.15"
              strokeDasharray="0.5 0.5"
            />
          ))}
          {[
            { cx: "15%", cy: "20%" },
            { cx: "30%", cy: "40%" },
            { cx: "55%", cy: "25%" },
            { cx: "80%", cy: "45%" },
            { cx: "70%", cy: "70%" },
            { cx: "45%", cy: "80%" },
            { cx: "20%", cy: "65%" },
          ].map((star, i) => (
            <circle key={i} cx={star.cx} cy={star.cy} r="0.6" fill="var(--cyan)" />
          ))}
        </svg>
      </div>

      <div className="container" style={{ position: "relative", zIndex: 1 }}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          style={{ textAlign: "center", marginBottom: "4rem" }}
        >
          <span className="section-tag">✦ Skills</span>
          <h2
            className="font-heading"
            style={{
              fontSize: "clamp(2rem, 4vw, 3rem)",
              fontWeight: 700,
              letterSpacing: "-0.02em",
              lineHeight: 1.15,
              marginBottom: "1rem",
            }}
          >
            My <span className="gradient-text">Constellation</span> of Skills
          </h2>
          <p
            style={{
              color: "rgba(232,234,246,0.55)",
              maxWidth: "500px",
              margin: "0 auto",
              lineHeight: 1.7,
              fontFamily: "var(--font-body)",
            }}
          >
            Like stars forming constellations, these skills come together to create
            meaningful digital experiences.
          </p>
        </motion.div>

        {/* Skill groups */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: "1.5rem",
          }}
        >
          {skillGroups.map((group, gi) => (
            <motion.div
              key={group.category}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: gi * 0.12 }}
              className="glass"
              style={{
                borderRadius: "20px",
                padding: "1.75rem",
                position: "relative",
                overflow: "hidden",
                transition: "border-color 0.3s ease, box-shadow 0.3s ease",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLDivElement).style.borderColor = group.color
                  .replace("var(--cyan)", "rgba(0,217,255,0.3)")
                  .replace("var(--purple)", "rgba(124,58,237,0.3)")
                  .replace("var(--pink)", "rgba(236,72,153,0.3)")
                  .replace("var(--amber)", "rgba(245,158,11,0.3)");
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLDivElement).style.borderColor = "var(--border-subtle)";
              }}
            >
              {/* Category header */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.75rem",
                  marginBottom: "1.25rem",
                }}
              >
                <div
                  style={{
                    width: "38px",
                    height: "38px",
                    borderRadius: "10px",
                    background: group.dimColor,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "1.2rem",
                  }}
                >
                  {group.icon}
                </div>
                <span
                  className="font-heading"
                  style={{ fontSize: "1.05rem", fontWeight: 600, color: group.color }}
                >
                  {group.category}
                </span>
              </div>

              {/* Skill badges */}
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
                {group.skills.map((skill) => (
                  <span
                    key={skill}
                    className="skill-badge"
                    style={{
                      padding: "0.35rem 0.85rem",
                      borderRadius: "999px",
                      fontSize: "0.8rem",
                      fontFamily: "var(--font-body)",
                      fontWeight: 500,
                      background: "rgba(255,255,255,0.04)",
                      border: "1px solid var(--border-subtle)",
                      color: "rgba(232,234,246,0.75)",
                      cursor: "default",
                      transition: "all 0.2s ease",
                    }}
                    onMouseEnter={(e) => {
                      const el = e.currentTarget as HTMLSpanElement;
                      el.style.borderColor = group.color;
                      el.style.color = group.color;
                      el.style.background = group.dimColor;
                      el.style.transform = "scale(1.05)";
                    }}
                    onMouseLeave={(e) => {
                      const el = e.currentTarget as HTMLSpanElement;
                      el.style.borderColor = "var(--border-subtle)";
                      el.style.color = "rgba(232,234,246,0.75)";
                      el.style.background = "rgba(255,255,255,0.04)";
                      el.style.transform = "scale(1)";
                    }}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
