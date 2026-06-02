"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { label: "About", href: "about" },
  { label: "Experience", href: "experience" },
  { label: "Skills", href: "skills" },
  { label: "Projects", href: "projects" },
  { label: "Contact", href: "contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [active, setActive] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 60);

      // Active section detection
      const sections = navLinks.map((l) => l.href);
      for (const id of [...sections].reverse()) {
        const el = document.getElementById(id);
        if (el && window.scrollY >= el.offsetTop - 120) {
          setActive(id);
          break;
        }
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMobileOpen(false);
  };

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, delay: 0.2 }}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          padding: "1rem 2rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          transition: "background 0.3s ease, border-color 0.3s ease",
          ...(scrolled
            ? {
                background: "rgba(3,2,10,0.85)",
                backdropFilter: "blur(20px)",
                WebkitBackdropFilter: "blur(20px)",
                borderBottom: "1px solid rgba(255,255,255,0.06)",
              }
            : {
                background: "transparent",
              }),
        }}
      >
        {/* Logo */}
        <button
          id="nav-logo"
          onClick={() => scrollTo("hero")}
          style={{
            fontFamily: "var(--font-heading)",
            fontWeight: 700,
            fontSize: "1.35rem",
            background: "linear-gradient(135deg, var(--cyan), var(--purple))",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            border: "none",
            cursor: "pointer",
            letterSpacing: "-0.02em",
          }}
        >
          Rêveur
          <span style={{ color: "var(--cyan)", WebkitTextFillColor: "var(--cyan)" }}>.</span>
        </button>

        {/* Desktop links */}
        <div
          style={{
            display: "flex",
            gap: "0.5rem",
            alignItems: "center",
          }}
          className="desktop-nav"
        >
          {navLinks.map((link) => (
            <button
              key={link.href}
              id={`nav-${link.href}`}
              onClick={() => scrollTo(link.href)}
              style={{
                padding: "0.5rem 1.1rem",
                borderRadius: "999px",
                border: "none",
                background: active === link.href ? "var(--cyan-dim)" : "transparent",
                color: active === link.href ? "var(--cyan)" : "rgba(232,234,246,0.65)",
                fontFamily: "var(--font-body)",
                fontSize: "0.9rem",
                fontWeight: 500,
                cursor: "pointer",
                transition: "all 0.2s ease",
                borderWidth: "1px",
                borderStyle: "solid",
                borderColor: active === link.href ? "rgba(0,217,255,0.2)" : "transparent",
              }}
              onMouseEnter={(e) => {
                if (active !== link.href) {
                  (e.currentTarget as HTMLButtonElement).style.color = "var(--star-white)";
                  (e.currentTarget as HTMLButtonElement).style.background = "rgba(255,255,255,0.05)";
                }
              }}
              onMouseLeave={(e) => {
                if (active !== link.href) {
                  (e.currentTarget as HTMLButtonElement).style.color = "rgba(232,234,246,0.65)";
                  (e.currentTarget as HTMLButtonElement).style.background = "transparent";
                }
              }}
            >
              {link.label}
            </button>
          ))}

          <a
            href="https://github.com/r1verrdao"
            target="_blank"
            rel="noopener noreferrer"
            id="nav-github"
            style={{
              marginLeft: "0.5rem",
              padding: "0.5rem 1.3rem",
              borderRadius: "999px",
              background: "linear-gradient(135deg, var(--cyan), var(--purple))",
              color: "#fff",
              fontFamily: "var(--font-body)",
              fontSize: "0.9rem",
              fontWeight: 600,
              textDecoration: "none",
              transition: "transform 0.2s ease, box-shadow 0.2s ease",
              boxShadow: "0 0 20px var(--cyan-glow)",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(-2px)";
              (e.currentTarget as HTMLAnchorElement).style.boxShadow = "0 0 35px var(--cyan-glow)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(0)";
              (e.currentTarget as HTMLAnchorElement).style.boxShadow = "0 0 20px var(--cyan-glow)";
            }}
          >
            GitHub ↗
          </a>
        </div>

        {/* Hamburger */}
        <button
          id="nav-hamburger"
          onClick={() => setMobileOpen(!mobileOpen)}
          style={{
            display: "none",
            flexDirection: "column",
            gap: "5px",
            background: "none",
            border: "none",
            cursor: "pointer",
            padding: "0.5rem",
          }}
          className="hamburger"
          aria-label="Toggle mobile menu"
        >
          {[0, 1, 2].map((i) => (
            <motion.span
              key={i}
              animate={
                mobileOpen
                  ? i === 0
                    ? { rotate: 45, y: 8.5 }
                    : i === 1
                    ? { opacity: 0 }
                    : { rotate: -45, y: -8.5 }
                  : { rotate: 0, y: 0, opacity: 1 }
              }
              style={{
                display: "block",
                width: "22px",
                height: "1.5px",
                background: "var(--star-white)",
                borderRadius: "2px",
                transformOrigin: "center",
              }}
            />
          ))}
        </button>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25 }}
            style={{
              position: "fixed",
              top: "4.5rem",
              left: "1rem",
              right: "1rem",
              zIndex: 99,
              background: "rgba(13,11,26,0.96)",
              backdropFilter: "blur(20px)",
              border: "1px solid var(--border-subtle)",
              borderRadius: "16px",
              padding: "1.5rem",
              display: "flex",
              flexDirection: "column",
              gap: "0.5rem",
            }}
          >
            {navLinks.map((link, i) => (
              <motion.button
                key={link.href}
                id={`mobile-nav-${link.href}`}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.06 }}
                onClick={() => scrollTo(link.href)}
                style={{
                  textAlign: "left",
                  padding: "0.85rem 1.2rem",
                  borderRadius: "10px",
                  border: "none",
                  background: active === link.href ? "var(--cyan-dim)" : "transparent",
                  color: active === link.href ? "var(--cyan)" : "rgba(232,234,246,0.8)",
                  fontFamily: "var(--font-body)",
                  fontSize: "1rem",
                  fontWeight: 500,
                  cursor: "pointer",
                  width: "100%",
                }}
              >
                {link.label}
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .hamburger { display: flex !important; }
        }
      `}</style>
    </>
  );
}
