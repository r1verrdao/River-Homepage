"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import StarParticles from "../effects/StarParticles";

const projects = [
  {
    id: "project-medical-fusion",
    title: "Medical Image Fusion",
    category: "Computer Vision",
    emoji: "🧠",
    color: "var(--cyan)",
    dimColor: "var(--cyan-dim)",
    description:
      "Research at ICTLab, USTH: Deep learning pipeline for fusing PET and MRI medical images. Novel enhancement method using histogram equalization, noise removal, and structural similarity index.",
    tech: ["Python", "PyTorch", "Deep Learning", "Image Processing", "OpenCV"],
    links: { github: null, live: null },
    featured: true,
  },
  {
    id: "project-vietnamese-ocr",
    title: "Vietnamese OCR",
    category: "Computer Vision",
    emoji: "📄",
    color: "var(--purple)",
    dimColor: "var(--purple-dim)",
    description:
      "End-to-end OCR system for Vietnamese text. Uses YOLOv8 for text detection and VietOCR for recognition. Fine-tuned VGG19+Transformer and VGG19+Seq2Seq models for improved accuracy.",
    tech: ["Python", "YOLOv8", "PyTorch", "VietOCR", "Transformer"],
    links: { github: null, live: null },
    featured: true,
  },
  {
    id: "project-ml-models-management",
    title: "ML Models Management",
    category: "Machine Learning",
    emoji: "🌾",
    color: "var(--pink)",
    dimColor: "var(--pink-dim)",
    description:
      "Machine learning platform to train and run inference on models predicting necessary nutrition amounts for rice plants. Includes data pre-processing pipelines and model evaluation.",
    tech: ["Python", "Scikit-learn", "PyTorch", "Pandas", "Numpy"],
    links: { github: null, live: null },
    featured: false,
  },
  {
    id: "project-bird-classification",
    title: "Bird & Ant/Bee Classifier",
    category: "Computer Vision",
    emoji: "🦅",
    color: "var(--amber)",
    dimColor: "rgba(245,158,11,0.15)",
    description:
      "ResNet50-based image classifier achieving 80% accuracy for bird species and 95% accuracy for ant/bee classification. Fine-tuned with transfer learning on custom datasets.",
    tech: ["Python", "PyTorch", "ResNet50", "Transfer Learning"],
    links: { github: null, live: null },
    featured: false,
  },
  {
    id: "project-image-denoiser",
    title: "Image Denoiser",
    category: "Image Processing",
    emoji: "✨",
    color: "var(--cyan)",
    dimColor: "var(--cyan-dim)",
    description:
      "Research and implementation (from scratch) of several classical and modern noise removal methods for digital images. Comprehensive benchmarking across PSNR, SSIM metrics.",
    tech: ["Python", "OpenCV", "Numpy", "MATLAB", "Scikit-image"],
    links: { github: null, live: null },
    featured: false,
  },
  {
    id: "project-portfolio",
    title: "This Portfolio",
    category: "Frontend",
    emoji: "🌌",
    color: "var(--purple)",
    dimColor: "var(--purple-dim)",
    description:
      "The very site you're exploring — built with Next.js, Framer Motion, and Three.js to render a live galaxy simulation. Astronomy-themed dark UI with glassmorphism design.",
    tech: ["Next.js", "Three.js", "Framer Motion", "TypeScript"],
    links: { github: "https://github.com/r1verrdao/River-Homepage", live: "#" },
    featured: false,
  },
];

const categories = ["All", "Computer Vision", "Machine Learning", "Image Processing", "Frontend"];

export default function Projects() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered =
    activeCategory === "All"
      ? projects
      : projects.filter((p) => p.category === activeCategory);

  return (
    <section id="projects" className="section" ref={ref}>
      <div className="nebula-cyan" style={{ top: "-10%", right: "-5%", opacity: 0.5 }} />
      <div className="nebula-purple" style={{ bottom: "-15%", left: "-8%", opacity: 0.4 }} />
      <StarParticles count={35} />

      <div className="container" style={{ position: "relative", zIndex: 1 }}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          style={{ textAlign: "center", marginBottom: "3rem" }}
        >
          <span className="section-tag">✦ Missions</span>
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
            Featured <span className="gradient-text">Projects</span>
          </h2>
          <p
            style={{
              color: "rgba(232,234,246,0.55)",
              maxWidth: "480px",
              margin: "0 auto",
              lineHeight: 1.7,
              fontFamily: "var(--font-body)",
            }}
          >
            Here are some of my featured projects. 
          </p>
        </motion.div>

        {/* Filter tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.15 }}
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "0.5rem",
            justifyContent: "center",
            marginBottom: "2.5rem",
          }}
        >
          {categories.map((cat) => (
            <button
              key={cat}
              id={`filter-${cat.toLowerCase().replace(/[^a-z]/g, "")}`}
              onClick={() => setActiveCategory(cat)}
              style={{
                padding: "0.45rem 1.1rem",
                borderRadius: "999px",
                border: "1px solid",
                fontFamily: "var(--font-body)",
                fontSize: "0.82rem",
                fontWeight: 500,
                cursor: "pointer",
                transition: "all 0.2s ease",
                ...(activeCategory === cat
                  ? {
                      background: "linear-gradient(135deg, var(--cyan), var(--purple))",
                      borderColor: "transparent",
                      color: "#fff",
                      boxShadow: "0 0 20px var(--cyan-glow)",
                    }
                  : {
                      background: "transparent",
                      borderColor: "var(--border-subtle)",
                      color: "rgba(232,234,246,0.6)",
                    }),
              }}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        {/* Project grid */}
        <motion.div
          layout
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
            gap: "1.5rem",
          }}
        >
          {filtered.map((project, i) => (
            <motion.article
              key={project.id}
              id={project.id}
              layout
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className={`glass project-card ${project.featured ? "featured" : ""}`}
              style={{
                borderRadius: "20px",
                padding: "1.75rem",
                position: "relative",
                overflow: "hidden",
                ...(project.featured
                  ? { border: `1px solid ${project.color}30` }
                  : {}),
              }}
            >
              {/* Featured badge */}
              {project.featured && (
                <div
                  style={{
                    position: "absolute",
                    top: "1rem",
                    right: "1rem",
                    padding: "0.2rem 0.7rem",
                    borderRadius: "999px",
                    fontSize: "0.68rem",
                    fontWeight: 600,
                    fontFamily: "var(--font-body)",
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    background: project.dimColor,
                    color: project.color,
                    border: `1px solid ${project.color}40`,
                  }}
                >
                  Featured
                </div>
              )}

              {/* Header */}
              <div style={{ display: "flex", alignItems: "flex-start", gap: "1rem", marginBottom: "1rem" }}>
                <div
                  style={{
                    width: "48px",
                    height: "48px",
                    borderRadius: "14px",
                    background: project.dimColor,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "1.5rem",
                    flexShrink: 0,
                  }}
                >
                  {project.emoji}
                </div>
                <div>
                  <div
                    style={{
                      fontSize: "0.72rem",
                      fontWeight: 600,
                      letterSpacing: "0.12em",
                      textTransform: "uppercase",
                      color: project.color,
                      fontFamily: "var(--font-body)",
                      marginBottom: "0.2rem",
                    }}
                  >
                    {project.category}
                  </div>
                  <h3
                    className="font-heading"
                    style={{ fontSize: "1.15rem", fontWeight: 700, lineHeight: 1.2 }}
                  >
                    {project.title}
                  </h3>
                </div>
              </div>

              {/* Description */}
              <p
                style={{
                  color: "rgba(232,234,246,0.6)",
                  fontSize: "0.88rem",
                  lineHeight: 1.75,
                  marginBottom: "1.25rem",
                  fontFamily: "var(--font-body)",
                }}
              >
                {project.description}
              </p>

              {/* Tech stack */}
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem", marginBottom: "1.25rem" }}>
                {project.tech.map((t) => (
                  <span
                    key={t}
                    style={{
                      padding: "0.25rem 0.7rem",
                      borderRadius: "999px",
                      fontSize: "0.75rem",
                      fontFamily: "var(--font-body)",
                      background: "rgba(255,255,255,0.05)",
                      border: "1px solid var(--border-subtle)",
                      color: "rgba(232,234,246,0.6)",
                    }}
                  >
                    {t}
                  </span>
                ))}
              </div>

              {/* Links */}
              <div style={{ display: "flex", gap: "0.75rem" }}>
                {project.links.github && (
                <a
                  href={project.links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.4rem",
                    fontSize: "0.85rem",
                    fontFamily: "var(--font-body)",
                    fontWeight: 500,
                    color: "rgba(232,234,246,0.65)",
                    textDecoration: "none",
                    padding: "0.45rem 1rem",
                    borderRadius: "999px",
                    border: "1px solid var(--border-subtle)",
                    transition: "all 0.2s ease",
                  }}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget as HTMLAnchorElement;
                    el.style.borderColor = project.color;
                    el.style.color = project.color;
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget as HTMLAnchorElement;
                    el.style.borderColor = "var(--border-subtle)";
                    el.style.color = "rgba(232,234,246,0.65)";
                  }}
                >
                  ↗ GitHub
                </a>
                )}
                {project.links.live && (
                  <a
                    href={project.links.live}
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "0.4rem",
                      fontSize: "0.85rem",
                      fontFamily: "var(--font-body)",
                      fontWeight: 500,
                      color: project.color,
                      textDecoration: "none",
                      padding: "0.45rem 1rem",
                      borderRadius: "999px",
                      border: `1px solid ${project.color}40`,
                      background: project.dimColor,
                      transition: "all 0.2s ease",
                    }}
                  >
                    🚀 Live Demo
                  </a>
                )}
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
