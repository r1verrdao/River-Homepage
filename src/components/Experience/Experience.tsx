"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import StarParticles from "../effects/StarParticles";

interface ExperienceItem {
  role: string;
  company: string;
  location: string;
  period: string;
  type: "work" | "research";
  highlights: string[];
}

const experiences: ExperienceItem[] = [
  {
    role: "AI Engineer",
    company: "eUp Technology JSC",
    location: "Thanh Xuan, Hanoi",
    period: "Apr 2025 — Feb 2026",
    type: "work",
    highlights: [
      "Developed algorithms for coloring SVG components from PNG regions using K-Means/DBSCAN clustering.",
      "Researched & applied novel image generation models with prompt engineering to optimize project costs.",
      "Built n8n workflows with prompt engineering for multilingual (CN/JP) error detection; refined with batch API & Python service to reduce cost.",
      "Created a Streamlit web app with Python backend & MongoDB for accountants — auto-analyzes monthly financial reports via Gemini API.",
      "Researched open-source ASR models (Whisper, Moonshine, Zipformer ONNX) and deployed Korean subtitle translation service for Migii Topik app using Gemini API across 20+ languages.",
    ],
  },
  {
    role: "Research Internship",
    company: "ICTLab, USTH",
    location: "Hanoi",
    period: "Apr 2024 — Oct 2024",
    type: "research",
    highlights: [
      "Researched deep learning models for PET & MRI medical image fusion using advanced imaging techniques.",
      "Implemented from scratch a novel image enhancement method based on histogram equalization & noise removal.",
      "Proposed a new pipeline combining enhancement techniques and deep learning to synthesize MRI and PET images.",
      "Enhanced edge preservation and structural similarity index from source to fused images using the proposed fusion technique.",
      "Github: https://github.com/r1verrdao/Img-enhancement"
    ],
  },
];

const education = [
  {
    degree: "Master in AI",
    school: "Queensland University of Technology (QUT)",
    period: "Feb 2026 — Dec 2027",
    note: "In progress",
  },
  {
    degree: "B.Sc in ICT",
    school: "University of Science and Technology of Hanoi (USTH)",
    period: "Oct 2021 — Oct 2024",
    note: "GPA: 3.6/4.0",
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.12 },
  }),
};

export default function Experience() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [expandedIdx, setExpandedIdx] = useState<number | null>(0);

  return (
    <section id="experience" className="section" ref={ref}>
      {/* Nebula backgrounds */}
      <div className="nebula-purple" style={{ top: "10%", left: "-8%", opacity: 0.5 }} />
      <div className="nebula-cyan" style={{ bottom: "5%", right: "-5%", opacity: 0.4 }} />
      <StarParticles count={30} />

      <div className="container" style={{ position: "relative", zIndex: 1 }}>
        {/* Header */}
        <motion.div
          custom={0}
          variants={fadeUp}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          <span className="section-tag">✦ Experience</span>
        </motion.div>

        <motion.h2
          custom={1}
          variants={fadeUp}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="font-heading"
          style={{
            fontSize: "clamp(2rem, 4vw, 3rem)",
            fontWeight: 700,
            lineHeight: 1.15,
            marginBottom: "3rem",
            letterSpacing: "-0.02em",
          }}
        >
          Where I&apos;ve{" "}
          <span className="gradient-text">built &amp; explored</span>
        </motion.h2>

        {/* Timeline */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "0" }}>
          {experiences.map((exp, idx) => (
            <motion.div
              key={idx}
              custom={idx + 2}
              variants={fadeUp}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              style={{
                display: "grid",
                gridTemplateColumns: "auto 1fr",
                gap: "1.5rem",
              }}
            >
              {/* Timeline line + dot */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  paddingTop: "0.4rem",
                }}
              >
                {/* Dot */}
                <div
                  style={{
                    width: "16px",
                    height: "16px",
                    borderRadius: "50%",
                    background: exp.type === "work"
                      ? "linear-gradient(135deg, var(--cyan), var(--purple))"
                      : "linear-gradient(135deg, var(--purple), var(--pink))",
                    boxShadow: exp.type === "work"
                      ? "0 0 20px var(--cyan-glow)"
                      : "0 0 20px var(--purple-glow)",
                    flexShrink: 0,
                  }}
                />
                {/* Line */}
                <div
                  style={{
                    width: "2px",
                    flex: 1,
                    background: "linear-gradient(180deg, rgba(0,217,255,0.3), rgba(124,58,237,0.1))",
                    marginTop: "0.5rem",
                  }}
                />
              </div>

              {/* Card */}
              <div
                className="glass"
                style={{
                  borderRadius: "16px",
                  padding: "1.5rem 1.8rem",
                  marginBottom: "1.5rem",
                  cursor: "pointer",
                  transition: "border-color 0.3s ease, box-shadow 0.3s ease",
                  borderColor: expandedIdx === idx ? "rgba(0,217,255,0.2)" : undefined,
                  boxShadow: expandedIdx === idx ? "0 0 30px rgba(0,217,255,0.08)" : undefined,
                }}
                onClick={() => setExpandedIdx(expandedIdx === idx ? null : idx)}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(0,217,255,0.2)";
                }}
                onMouseLeave={(e) => {
                  if (expandedIdx !== idx) {
                    (e.currentTarget as HTMLDivElement).style.borderColor = "var(--border-subtle)";
                  }
                }}
              >
                {/* Header row */}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    flexWrap: "wrap",
                    gap: "0.5rem",
                    marginBottom: "0.5rem",
                  }}
                >
                  <div>
                    <h3
                      className="font-heading"
                      style={{
                        fontSize: "1.25rem",
                        fontWeight: 600,
                        color: "var(--star-white)",
                        marginBottom: "0.25rem",
                      }}
                    >
                      {exp.role}
                    </h3>
                    <p
                      style={{
                        fontFamily: "var(--font-body)",
                        fontSize: "0.9rem",
                        color: "var(--cyan)",
                        fontWeight: 500,
                      }}
                    >
                      {exp.company}{" "}
                      <span style={{ color: "rgba(232,234,246,0.4)" }}>· {exp.location}</span>
                    </p>
                  </div>

                  <span
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: "0.8rem",
                      color: "rgba(232,234,246,0.5)",
                      background: "rgba(255,255,255,0.04)",
                      padding: "0.3rem 0.8rem",
                      borderRadius: "999px",
                      border: "1px solid rgba(255,255,255,0.06)",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {exp.period}
                  </span>
                </div>

                {/* Type badge */}
                <div style={{ marginBottom: "0.75rem" }}>
                  <span
                    style={{
                      display: "inline-block",
                      fontSize: "0.7rem",
                      fontWeight: 600,
                      letterSpacing: "0.08em",
                      textTransform: "uppercase",
                      color: exp.type === "work" ? "var(--cyan)" : "var(--purple)",
                      background: exp.type === "work" ? "var(--cyan-dim)" : "var(--purple-dim)",
                      border: `1px solid ${exp.type === "work" ? "rgba(0,217,255,0.2)" : "rgba(124,58,237,0.2)"}`,
                      padding: "0.2rem 0.6rem",
                      borderRadius: "999px",
                    }}
                  >
                    {exp.type === "work" ? "💼 Full-time" : "🔬 Research"}
                  </span>
                </div>

                {/* Expandable highlights */}
                <motion.div
                  initial={false}
                  animate={{
                    height: expandedIdx === idx ? "auto" : 0,
                    opacity: expandedIdx === idx ? 1 : 0,
                  }}
                  transition={{ duration: 0.35, ease: "easeInOut" }}
                  style={{ overflow: "hidden" }}
                >
                  <ul
                    style={{
                      listStyle: "none",
                      padding: 0,
                      display: "flex",
                      flexDirection: "column",
                      gap: "0.6rem",
                    }}
                  >
                    {exp.highlights.map((h, i) => (
                      <li
                        key={i}
                        style={{
                          display: "flex",
                          gap: "0.6rem",
                          fontSize: "0.88rem",
                          lineHeight: 1.7,
                          color: "rgba(232,234,246,0.65)",
                          fontFamily: "var(--font-body)",
                        }}
                      >
                        <span
                          style={{
                            color: "var(--cyan)",
                            flexShrink: 0,
                            marginTop: "0.35rem",
                            fontSize: "0.5rem",
                          }}
                        >
                          ◆
                        </span>
                        {h}
                      </li>
                    ))}
                  </ul>
                </motion.div>

                {/* Expand indicator */}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    marginTop: "0.5rem",
                  }}
                >
                  <motion.span
                    animate={{ rotate: expandedIdx === idx ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    style={{
                      fontSize: "0.8rem",
                      color: "rgba(232,234,246,0.3)",
                    }}
                  >
                    ▾
                  </motion.span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Education Section */}
        <motion.div
          custom={5}
          variants={fadeUp}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          style={{ marginTop: "2rem" }}
        >
          <h3
            className="font-heading"
            style={{
              fontSize: "1.3rem",
              fontWeight: 600,
              marginBottom: "1.25rem",
              color: "var(--star-white)",
            }}
          >
            🎓 Education
          </h3>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: "1rem",
            }}
          >
            {education.map((edu, idx) => (
              <div
                key={idx}
                className="glass"
                style={{
                  padding: "1.2rem 1.5rem",
                  borderRadius: "14px",
                  transition: "border-color 0.2s ease",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(0,217,255,0.2)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLDivElement).style.borderColor = "var(--border-subtle)";
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    flexWrap: "wrap",
                    gap: "0.4rem",
                    marginBottom: "0.4rem",
                  }}
                >
                  <h4
                    className="font-heading"
                    style={{
                      fontSize: "1.05rem",
                      fontWeight: 600,
                      color: "var(--star-white)",
                    }}
                  >
                    {edu.degree}
                  </h4>
                  <span
                    style={{
                      fontSize: "0.75rem",
                      color: "rgba(232,234,246,0.45)",
                      fontFamily: "var(--font-body)",
                    }}
                  >
                    {edu.period}
                  </span>
                </div>
                <p
                  style={{
                    fontSize: "0.85rem",
                    color: "rgba(232,234,246,0.55)",
                    fontFamily: "var(--font-body)",
                    marginBottom: "0.4rem",
                  }}
                >
                  {edu.school}
                </p>
                <span
                  style={{
                    display: "inline-block",
                    fontSize: "0.72rem",
                    fontWeight: 600,
                    color: edu.note === "In progress" ? "var(--amber)" : "var(--cyan)",
                    background: edu.note === "In progress" ? "rgba(245,158,11,0.12)" : "var(--cyan-dim)",
                    border: `1px solid ${edu.note === "In progress" ? "rgba(245,158,11,0.2)" : "rgba(0,217,255,0.2)"}`,
                    padding: "0.2rem 0.6rem",
                    borderRadius: "999px",
                    textTransform: "uppercase",
                    letterSpacing: "0.06em",
                  }}
                >
                  {edu.note}
                </span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
