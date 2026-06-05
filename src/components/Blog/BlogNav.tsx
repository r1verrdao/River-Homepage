"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";

export default function BlogNav() {
  const pathname = usePathname();
  const isPostPage = pathname !== "/blog";

  return (
    <motion.header
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
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
        background: "rgba(3,2,10,0.85)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        borderBottom: "1px solid rgba(255,255,255,0.06)",
      }}
    >
      {/* Left: Logo → home */}
      <Link
        href="/"
        style={{
          fontFamily: "var(--font-heading)",
          fontWeight: 700,
          fontSize: "1.25rem",
          background: "linear-gradient(135deg, var(--cyan), var(--purple))",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
          textDecoration: "none",
          letterSpacing: "-0.02em",
        }}
      >
        Rêveur<span style={{ color: "var(--cyan)", WebkitTextFillColor: "var(--cyan)" }}>.</span>
      </Link>

      {/* Center: breadcrumb */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "0.5rem",
          fontFamily: "var(--font-body)",
          fontSize: "0.85rem",
          color: "rgba(232,234,246,0.5)",
        }}
      >
        <Link href="/blog" style={{ color: isPostPage ? "var(--cyan)" : "var(--star-white)", textDecoration: "none", fontWeight: 500 }}>
          Blog
        </Link>
        {isPostPage && (
          <>
            <span style={{ opacity: 0.3 }}>/</span>
            <span style={{ color: "rgba(232,234,246,0.5)" }}>Post</span>
          </>
        )}
      </div>

      {/* Right: nav links */}
      <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
        <Link
          href="/"
          style={{
            padding: "0.45rem 1rem",
            borderRadius: "999px",
            border: "1px solid rgba(255,255,255,0.08)",
            color: "rgba(232,234,246,0.65)",
            fontFamily: "var(--font-body)",
            fontSize: "0.85rem",
            textDecoration: "none",
            transition: "all 0.2s ease",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLAnchorElement).style.color = "var(--star-white)";
            (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(255,255,255,0.2)";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLAnchorElement).style.color = "rgba(232,234,246,0.65)";
            (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(255,255,255,0.08)";
          }}
        >
          ← Portfolio
        </Link>
      </div>
    </motion.header>
  );
}
