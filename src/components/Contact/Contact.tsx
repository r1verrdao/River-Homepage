"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import StarParticles from "../effects/StarParticles";

const socials = [
  { label: "GitHub", icon: "⌥", href: "https://github.com/r1verrdao", color: "var(--star-white)" },
  { label: "LinkedIn", icon: "in", href: "https://linkedin.com/in/riverdao36", color: "var(--cyan)" },
  { label: "Facebook", icon: "f", href: "https://www.facebook.com/riverdao03/", color: "#4267B2" },
  { label: "Email", icon: "@", href: "mailto:riverdao36@gmail.com", color: "var(--purple)" },
];

export default function Contact() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [copied, setCopied] = useState(false);
  const [formState, setFormState] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);

  const copyEmail = () => {
    navigator.clipboard.writeText("riverdao36@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const { name, email, message } = formState;
    const subject = encodeURIComponent(`Portfolio Contact from ${name}`);
    const body = encodeURIComponent(`Hi Ha,\n\n${message}\n\n— ${name} (${email})`);
    window.open(`mailto:riverdao36@gmail.com?subject=${subject}&body=${body}`, "_blank");
    setSent(true);
    setTimeout(() => setSent(false), 3000);
    setFormState({ name: "", email: "", message: "" });
  };

  return (
    <section id="contact" className="section" ref={ref} style={{ background: "var(--bg-surface)" }}>
      <div className="nebula-purple" style={{ top: "-20%", right: "-10%", opacity: 0.5 }} />
      <div className="nebula-cyan" style={{ bottom: "-20%", left: "-10%", opacity: 0.4 }} />
      <StarParticles count={20} />

      <div className="container" style={{ position: "relative", zIndex: 1 }}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          style={{ textAlign: "center", marginBottom: "3.5rem" }}
        >
          <span className="section-tag">✦ Contact</span>
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
            Send a <span className="gradient-text">Message</span>
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
            Whether it&apos;s about a project, collaboration, or just yapping about interesting stuffs —
            I&apos;m always happy to receive messages.
          </p>
        </motion.div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "2.5rem",
            alignItems: "start",
          }}
        >
          {/* Left: Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7 }}
          >
            <div
              className="glass"
              style={{
                borderRadius: "20px",
                padding: "2rem",
                marginBottom: "1.5rem",
              }}
            >
              <h3
                className="font-heading"
                style={{ fontSize: "1.2rem", fontWeight: 700, marginBottom: "0.5rem" }}
              >
                🌌 Open for Opportunities
              </h3>
              <p
                style={{
                  color: "rgba(232,234,246,0.6)",
                  fontSize: "0.9rem",
                  lineHeight: 1.75,
                  fontFamily: "var(--font-body)",
                  marginBottom: "1.5rem",
                }}
              >
                I&apos;m currently looking for new opportunities. Whether you have a question or just
                want to say hi, my inbox is always open!
              </p>

              {/* Email copy */}
              <button
                id="copy-email-btn"
                onClick={copyEmail}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.6rem",
                  padding: "0.75rem 1.25rem",
                  borderRadius: "12px",
                  background: copied ? "var(--cyan-dim)" : "rgba(255,255,255,0.04)",
                  border: `1px solid ${copied ? "rgba(0,217,255,0.3)" : "var(--border-subtle)"}`,
                  color: copied ? "var(--cyan)" : "rgba(232,234,246,0.75)",
                  fontFamily: "var(--font-body)",
                  fontSize: "0.9rem",
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                  width: "100%",
                }}
              >
                <span>{copied ? "✓" : "@"}</span>
                <span>{copied ? "Copied!" : "riverdao36@gmail.com"}</span>
              </button>
            </div>

            {/* Socials */}
            <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              {socials.map((social) => (
                <motion.a
                  key={social.label}
                  id={`contact-${social.label.toLowerCase()}`}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ x: 6 }}
                  className="glass"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "1rem",
                    padding: "1rem 1.25rem",
                    borderRadius: "14px",
                    textDecoration: "none",
                    color: "rgba(232,234,246,0.75)",
                    fontFamily: "var(--font-body)",
                    transition: "border-color 0.2s ease",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLAnchorElement).style.borderColor = social.color;
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLAnchorElement).style.borderColor = "var(--border-subtle)";
                  }}
                >
                  <div
                    style={{
                      width: "36px",
                      height: "36px",
                      borderRadius: "10px",
                      background: "rgba(255,255,255,0.06)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "0.85rem",
                      fontWeight: 700,
                      color: social.color,
                      flexShrink: 0,
                    }}
                  >
                    {social.icon}
                  </div>
                  <span style={{ fontWeight: 500 }}>{social.label}</span>
                  <span style={{ marginLeft: "auto", fontSize: "0.8rem", opacity: 0.4 }}>↗</span>
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Right: Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.15 }}
          >
            <form
              id="contact-form"
              onSubmit={handleSubmit}
              className="glass"
              style={{
                borderRadius: "20px",
                padding: "2rem",
                display: "flex",
                flexDirection: "column",
                gap: "1.25rem",
              }}
            >
              <h3
                className="font-heading"
                style={{ fontSize: "1.15rem", fontWeight: 700, marginBottom: "0.25rem" }}
              >
                Send a Message 📡
              </h3>

              {[
                { id: "contact-name", label: "Name", name: "name", type: "text", placeholder: "Your name" },
                { id: "contact-email", label: "Email", name: "email", type: "email", placeholder: "your@email.com" },
              ].map((field) => (
                <div key={field.name}>
                  <label
                    htmlFor={field.id}
                    style={{
                      display: "block",
                      fontSize: "0.82rem",
                      fontFamily: "var(--font-body)",
                      color: "rgba(232,234,246,0.55)",
                      marginBottom: "0.4rem",
                      fontWeight: 500,
                    }}
                  >
                    {field.label}
                  </label>
                  <input
                    id={field.id}
                    type={field.type}
                    name={field.name}
                    required
                    placeholder={field.placeholder}
                    value={formState[field.name as keyof typeof formState]}
                    onChange={(e) =>
                      setFormState((prev) => ({ ...prev, [field.name]: e.target.value }))
                    }
                    style={{
                      width: "100%",
                      padding: "0.75rem 1rem",
                      borderRadius: "10px",
                      background: "rgba(255,255,255,0.04)",
                      border: "1px solid var(--border-subtle)",
                      color: "var(--star-white)",
                      fontFamily: "var(--font-body)",
                      fontSize: "0.9rem",
                      outline: "none",
                      transition: "border-color 0.2s ease",
                    }}
                    onFocus={(e) => {
                      (e.currentTarget as HTMLInputElement).style.borderColor = "var(--cyan)";
                    }}
                    onBlur={(e) => {
                      (e.currentTarget as HTMLInputElement).style.borderColor = "var(--border-subtle)";
                    }}
                  />
                </div>
              ))}

              <div>
                <label
                  htmlFor="contact-message"
                  style={{
                    display: "block",
                    fontSize: "0.82rem",
                    fontFamily: "var(--font-body)",
                    color: "rgba(232,234,246,0.55)",
                    marginBottom: "0.4rem",
                    fontWeight: 500,
                  }}
                >
                  Message
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  required
                  rows={5}
                  placeholder="What would you like to transmit?"
                  value={formState.message}
                  onChange={(e) => setFormState((prev) => ({ ...prev, message: e.target.value }))}
                  style={{
                    width: "100%",
                    padding: "0.75rem 1rem",
                    borderRadius: "10px",
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid var(--border-subtle)",
                    color: "var(--star-white)",
                    fontFamily: "var(--font-body)",
                    fontSize: "0.9rem",
                    outline: "none",
                    resize: "vertical",
                    transition: "border-color 0.2s ease",
                  }}
                  onFocus={(e) => {
                    (e.currentTarget as HTMLTextAreaElement).style.borderColor = "var(--cyan)";
                  }}
                  onBlur={(e) => {
                    (e.currentTarget as HTMLTextAreaElement).style.borderColor = "var(--border-subtle)";
                  }}
                />
              </div>

              <button
                id="contact-submit-btn"
                type="submit"
                style={{
                  padding: "0.85rem",
                  borderRadius: "12px",
                  background: sent
                    ? "rgba(0,217,255,0.15)"
                    : "linear-gradient(135deg, var(--cyan), var(--purple))",
                  border: sent ? "1px solid rgba(0,217,255,0.3)" : "none",
                  color: sent ? "var(--cyan)" : "#fff",
                  fontFamily: "var(--font-heading)",
                  fontWeight: 600,
                  fontSize: "0.95rem",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                  boxShadow: sent ? "none" : "0 0 30px var(--cyan-glow)",
                }}
              >
                {sent ? "✓ Message Sent!" : "Send Message 📩"}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
