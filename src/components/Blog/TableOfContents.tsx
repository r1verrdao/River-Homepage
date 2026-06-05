"use client";

import { useEffect, useState } from "react";

interface Heading {
  id: string;
  text: string;
  level: number;
}

export default function TableOfContents() {
  const [headings, setHeadings] = useState<Heading[]>([]);
  const [activeId, setActiveId] = useState("");

  useEffect(() => {
    // Wait a tick for MDX to render into the DOM
    const timer = setTimeout(() => {
      const elements = Array.from(document.querySelectorAll(".blog-content h2, .blog-content h3"));
      const hData = elements.map((el) => {
        if (!el.id) {
          // generate an ID if the markdown didn't provide one
          el.id = el.textContent?.toLowerCase().replace(/\s+/g, "-").replace(/[^\w-]/g, "") || "";
        }
        return {
          id: el.id,
          text: el.textContent || "",
          level: el.tagName === "H2" ? 2 : 3,
        };
      });
      setHeadings(hData);
    }, 100);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: "0px 0px -80% 0px" } // trigger when near the top
    );

    // Give a little time before observing
    setTimeout(() => {
      document.querySelectorAll(".blog-content h2, .blog-content h3").forEach((el) => observer.observe(el));
    }, 200);

    return () => {
      clearTimeout(timer);
      observer.disconnect();
    };
  }, []);

  if (headings.length === 0) return null;

  return (
    <nav 
      className="glass blog-card-animate" 
      style={{ padding: "1.5rem", borderRadius: "16px", animationDelay: "0.2s" }}
    >
      <h4 style={{ color: "var(--cyan)", marginBottom: "1rem", fontFamily: "var(--font-heading)", fontSize: "1.1rem" }}>
        On this page
      </h4>
      <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "0.6rem" }}>
        {headings.map((h) => (
          <li key={h.id} style={{ paddingLeft: h.level === 3 ? "1rem" : "0" }}>
            <a
              href={`#${h.id}`}
              style={{
                color: activeId === h.id ? "var(--cyan)" : "rgba(232,234,246,0.5)",
                textDecoration: "none",
                fontSize: "0.85rem",
                transition: "color 0.2s ease, transform 0.2s ease",
                display: "block",
                transform: activeId === h.id ? "translateX(4px)" : "translateX(0)",
              }}
              onClick={(e) => {
                e.preventDefault();
                document.getElementById(h.id)?.scrollIntoView({ behavior: "smooth", block: "start" });
                setActiveId(h.id);
              }}
            >
              {h.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
