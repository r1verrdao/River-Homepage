"use client";

export default function Footer() {
  return (
    <footer
      style={{
        padding: "2.5rem 2rem",
        borderTop: "1px solid var(--border-subtle)",
        textAlign: "center",
        background: "var(--bg-deep)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Decorative star line */}
      <div
        style={{
          fontSize: "0.6rem",
          letterSpacing: "0.5em",
          color: "rgba(232,234,246,0.15)",
          marginBottom: "1rem",
        }}
      >
        ✦ ✦ ✦ ✦ ✦ ✦ ✦ ✦ ✦ ✦ ✦ ✦
      </div>

      <p
        style={{
          fontFamily: "var(--font-body)",
          fontSize: "0.85rem",
          color: "rgba(232,234,246,0.35)",
          lineHeight: 1.8,
        }}
      >
        Crafted with{" "}
        <span style={{ color: "var(--pink)" }}>♥</span> and a telescope by{" "}
        <span
          style={{
            background: "linear-gradient(135deg, var(--cyan), var(--purple))",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            fontWeight: 600,
          }}
        >
          Rêveur
        </span>
        {" "}·{" "}
        <span style={{ color: "rgba(232,234,246,0.2)" }}>
          Somewhere in the universe
        </span>
      </p>

      <p
        style={{
          fontFamily: "var(--font-body)",
          fontSize: "0.75rem",
          color: "rgba(232,234,246,0.2)",
          marginTop: "0.5rem",
        }}
      >
        Built with Next.js · Three.js · Framer Motion · Chakra UI
      </p>
    </footer>
  );
}
