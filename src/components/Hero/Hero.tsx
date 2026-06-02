"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { Suspense, useEffect, useState } from "react";

// Dynamically import Three.js canvas to avoid SSR issues
const GalaxyCanvas = dynamic(() => import("./GalaxyCanvas"), { ssr: false });

const roles = [
  "AI Engineer",
  "Book Lover",
  "Astronomy Enthusiast",
];

export default function Hero() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  // Typewriter effect
  useEffect(() => {
    const fullText = roles[roleIndex];
    let timeout: ReturnType<typeof setTimeout>;

    if (!isDeleting) {
      if (displayed.length < fullText.length) {
        timeout = setTimeout(() => {
          setDisplayed(fullText.slice(0, displayed.length + 1));
        }, 90);
      } else {
        timeout = setTimeout(() => setIsDeleting(true), 2200);
      }
    } else {
      if (displayed.length > 0) {
        timeout = setTimeout(() => {
          setDisplayed(displayed.slice(0, -1));
        }, 45);
      } else {
        setIsDeleting(false);
        setRoleIndex((prev) => (prev + 1) % roles.length);
      }
    }

    return () => clearTimeout(timeout);
  }, [displayed, isDeleting, roleIndex]);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="hero" style={{ position: "relative", height: "100vh", overflow: "hidden" }}>
      {/* Three.js Galaxy Canvas */}
      <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
        <Suspense fallback={null}>
          <GalaxyCanvas />
        </Suspense>
      </div>

      {/* Nebula gradient overlays */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse 80% 60% at 20% 60%, rgba(124,58,237,0.18) 0%, transparent 60%), radial-gradient(ellipse 60% 50% at 80% 30%, rgba(0,217,255,0.12) 0%, transparent 60%)",
          zIndex: 1,
          pointerEvents: "none",
        }}
      />

      {/* Bottom fade */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: "200px",
          background: "linear-gradient(to top, #03020a, transparent)",
          zIndex: 2,
          pointerEvents: "none",
        }}
      />

      {/* Content */}
      <div
        style={{
          position: "relative",
          zIndex: 10,
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          padding: "0 1.5rem",
        }}
      >
        {/* Dark backdrop behind text so it reads over the galaxy core */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(ellipse 70% 55% at 50% 48%, rgba(3,2,10,0.72) 0%, rgba(3,2,10,0.45) 50%, transparent 80%)",
            pointerEvents: "none",
            zIndex: -1,
          }}
        />
        {/* Greeting badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="section-tag"
          style={{ marginBottom: "1.5rem" }}
        >
          <span>✦</span> Hello, I&apos;m
        </motion.div>

        {/* Name */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="font-heading"
          style={{
            fontSize: "clamp(2.8rem, 7vw, 6.5rem)",
            fontWeight: 700,
            lineHeight: 1.05,
            letterSpacing: "-0.02em",
            marginBottom: "0.5rem",
          }}
        >
          <span className="gradient-text">DAO Duy Manh Ha</span>
        </motion.h1>

        {/* Nickname */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          style={{
            fontSize: "clamp(1rem, 2.5vw, 1.4rem)",
            color: "rgba(232,234,246,0.85)",
            fontStyle: "italic",
            marginBottom: "1.5rem",
            fontFamily: "var(--font-body)",
            textShadow: "0 2px 12px rgba(3,2,10,0.9)",
          }}
        >
          aka{" "}
          <span style={{ color: "var(--cyan)", fontStyle: "normal", fontWeight: 600 }}>
            Rêveur
          </span>
          {" "}— The Dreamer
        </motion.p>

        {/* Typewriter role */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.45 }}
          style={{
            fontSize: "clamp(1.1rem, 2.8vw, 1.6rem)",
            color: "#ffffff",
            fontFamily: "var(--font-body)",
            fontWeight: 500,
            marginBottom: "2.5rem",
            minHeight: "2.2rem",
            textShadow: "0 0 20px rgba(3,2,10,1), 0 2px 8px rgba(3,2,10,0.95)",
          }}
        >
          {displayed}
          <span className="cursor-blink" />
        </motion.div>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.6 }}
          style={{
            maxWidth: "560px",
            fontSize: "clamp(0.9rem, 2vw, 1.05rem)",
            color: "rgba(232,234,246,0.92)",
            lineHeight: 1.8,
            marginBottom: "3rem",
            fontFamily: "var(--font-body)",
            textShadow: "0 1px 10px rgba(3,2,10,0.95), 0 0 30px rgba(3,2,10,0.8)",
          }}
        >
          AI Engineer based in Hanoi, Vietnam — building intelligent systems
          from Computer Vision to NLP, while finding inspiration in the endless mysteries of the cosmos.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.75 }}
          style={{ display: "flex", gap: "1rem", flexWrap: "wrap", justifyContent: "center" }}
        >
          <button
            id="hero-explore-btn"
            onClick={() => scrollTo("projects")}
            style={{
              padding: "0.85rem 2.2rem",
              borderRadius: "999px",
              background: "linear-gradient(135deg, var(--cyan), var(--purple))",
              color: "#fff",
              fontFamily: "var(--font-heading)",
              fontWeight: 600,
              fontSize: "0.95rem",
              border: "none",
              cursor: "pointer",
              letterSpacing: "0.03em",
              boxShadow: "0 0 30px var(--cyan-glow)",
              transition: "transform 0.2s ease, box-shadow 0.2s ease",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLButtonElement).style.transform = "translateY(-3px) scale(1.03)";
              (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 0 50px var(--cyan-glow)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.transform = "translateY(0) scale(1)";
              (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 0 30px var(--cyan-glow)";
            }}
          >
            Explore My Work 🚀
          </button>

          <button
            id="hero-contact-btn"
            onClick={() => scrollTo("contact")}
            className="glass"
            style={{
              padding: "0.85rem 2.2rem",
              borderRadius: "999px",
              background: "transparent",
              color: "var(--star-white)",
              fontFamily: "var(--font-heading)",
              fontWeight: 600,
              fontSize: "0.95rem",
              cursor: "pointer",
              letterSpacing: "0.03em",
              transition: "all 0.2s ease",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLButtonElement).style.borderColor = "var(--cyan)";
              (e.currentTarget as HTMLButtonElement).style.color = "var(--cyan)";
              (e.currentTarget as HTMLButtonElement).style.transform = "translateY(-3px)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(255,255,255,0.08)";
              (e.currentTarget as HTMLButtonElement).style.color = "var(--star-white)";
              (e.currentTarget as HTMLButtonElement).style.transform = "translateY(0)";
            }}
          >
            Get In Touch ✦
          </button>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
          style={{
            position: "absolute",
            bottom: "2.5rem",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "0.5rem",
            color: "rgba(232,234,246,0.35)",
            fontSize: "0.75rem",
            fontFamily: "var(--font-body)",
            letterSpacing: "0.15em",
            textTransform: "uppercase",
          }}
        >
          <span>Scroll to explore</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            style={{
              width: "1px",
              height: "40px",
              background: "linear-gradient(to bottom, var(--cyan), transparent)",
            }}
          />
        </motion.div>
      </div>
    </section>
  );
}
