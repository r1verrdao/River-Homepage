"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import StarParticles from "../effects/StarParticles";

const stats = [
  { value: "3.6", label: "GPA / 4.0 at USTH", icon: "🎓" },
  { value: "5+", label: "Projects Built", icon: "🚀" },
  { value: "1+", label: "Years Experience", icon: "💼" },
  { value: "∞", label: "Stars Counted", icon: "🌌" },
];

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.12 },
  }),
};

export default function About() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="about" className="section" ref={ref}>
      {/* Nebula backgrounds */}
      <div className="nebula-purple" style={{ top: "-10%", right: "-5%", opacity: 0.6 }} />
      <div className="nebula-cyan" style={{ bottom: "-10%", left: "-5%", opacity: 0.5 }} />
      <StarParticles count={25} />

      <div className="container">
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "4rem",
            alignItems: "center",
          }}
        >
          {/* Left: Avatar + Decoration */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            style={{ display: "flex", justifyContent: "center" }}
          >
            <div style={{ position: "relative", width: "280px", height: "280px" }}>
              {/* Outer orbit ring */}
              <div
                style={{
                  position: "absolute",
                  inset: "-24px",
                  borderRadius: "50%",
                  border: "1px dashed rgba(0,217,255,0.2)",
                  animation: "orbit-ring 20s linear infinite",
                }}
              />
              {/* Orbiting dot */}
              <div
                style={{
                  position: "absolute",
                  top: "-8px",
                  left: "50%",
                  width: "14px",
                  height: "14px",
                  borderRadius: "50%",
                  background: "var(--cyan)",
                  boxShadow: "0 0 20px var(--cyan-glow)",
                  transform: "translateX(-50%)",
                  animation: "orbit 6s linear infinite",
                }}
              />

              {/* Avatar circle */}
              <div
                style={{
                  width: "100%",
                  height: "100%",
                  borderRadius: "50%",
                  background:
                    "linear-gradient(135deg, rgba(124,58,237,0.3), rgba(0,217,255,0.2))",
                  border: "2px solid rgba(0,217,255,0.25)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  overflow: "hidden",
                  boxShadow:
                    "0 0 60px rgba(124,58,237,0.3), inset 0 0 40px rgba(0,0,0,0.4)",
                }}
              >
                <Image
                  src="/IMG_6250(1).JPG"
                  alt="DAO Duy Manh Ha"
                  width={280}
                  height={280}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                  priority
                />
              </div>

              {/* Floating badge */}
              <motion.div
                animate={{ y: [-6, 6, -6] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
                className="glass"
                style={{
                  position: "absolute",
                  bottom: "-1rem",
                  right: "-1.5rem",
                  padding: "0.6rem 1rem",
                  borderRadius: "12px",
                  fontSize: "0.8rem",
                  color: "var(--cyan)",
                  fontFamily: "var(--font-body)",
                  fontWeight: 500,
                  whiteSpace: "nowrap",
                }}
              >
                ⚡ Neural Architect
              </motion.div>
            </div>
          </motion.div>

          {/* Right: Text */}
          <div>
            <motion.div
              custom={0}
              variants={fadeUp}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
            >
              <span className="section-tag">✦ About Me</span>
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
                marginBottom: "1.25rem",
                letterSpacing: "-0.02em",
              }}
            >
              Building intelligence,{" "}
              <span className="gradient-text">guided by the stars</span>
            </motion.h2>

            <motion.p
              custom={2}
              variants={fadeUp}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              style={{
                color: "rgba(232,234,246,0.65)",
                lineHeight: 1.9,
                fontSize: "1rem",
                marginBottom: "1rem",
                fontFamily: "var(--font-body)",
              }}
            >
              Hi! I&apos;m <strong style={{ color: "var(--star-white)" }}>DAO Duy Manh Ha</strong>,
              known as <strong style={{ color: "var(--cyan)" }}>Rêveur</strong>.
              I&apos;m an AI Engineer &amp; ML Researcher based in Hanoi, Vietnam, previously worked at
              <strong style={{ color: "var(--star-white)" }}> eUp Technology JSC</strong> and pursuing a
              <strong style={{ color: "var(--star-white)" }}> Master in AI at QUT</strong> (Feb 2026).
            </motion.p>

            <motion.p
              custom={3}
              variants={fadeUp}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              style={{
                color: "rgba(232,234,246,0.65)",
                lineHeight: 1.9,
                fontSize: "1rem",
                marginBottom: "2rem",
                fontFamily: "var(--font-body)",
              }}
            >
              My work spans Computer Vision, NLP, and generative AI — from medical image fusion
              research at ICTLab to building production-ready AI pipelines. I graduated with a
              <strong style={{ color: "var(--star-white)" }}> GPA of 3.6/4.0</strong> from USTH and
              hold IELTS 7.0 and DELF B1.
            </motion.p>

            {/* Stats grid */}
            <motion.div
              custom={4}
              variants={fadeUp}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(2, 1fr)",
                gap: "1rem",
              }}
            >
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="glass"
                  style={{
                    padding: "1.2rem",
                    borderRadius: "14px",
                    textAlign: "center",
                    transition: "border-color 0.2s ease",
                    cursor: "default",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(0,217,255,0.25)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLDivElement).style.borderColor = "var(--border-subtle)";
                  }}
                >
                  <div style={{ fontSize: "1.4rem", marginBottom: "0.3rem" }}>{stat.icon}</div>
                  <div
                    className="font-heading gradient-text"
                    style={{ fontSize: "1.8rem", fontWeight: 700 }}
                  >
                    {stat.value}
                  </div>
                  <div
                    style={{
                      fontSize: "0.78rem",
                      color: "rgba(232,234,246,0.5)",
                      fontFamily: "var(--font-body)",
                      marginTop: "0.2rem",
                    }}
                  >
                    {stat.label}
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes orbit-ring {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </section>
  );
}
