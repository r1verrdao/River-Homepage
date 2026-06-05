"use client";

import { useEffect, useState } from "react";

const FULL_TEXT =
  "My place to share my thoughts, experiences, and things that I am passionate about.";
const TYPING_SPEED = 32; // ms per character

export default function BlogSubtitle() {
  const [displayed, setDisplayed] = useState("");
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (displayed.length < FULL_TEXT.length) {
      const timeout = setTimeout(() => {
        setDisplayed(FULL_TEXT.slice(0, displayed.length + 1));
      }, TYPING_SPEED);
      return () => clearTimeout(timeout);
    } else {
      setDone(true);
    }
  }, [displayed]);

  return (
    <p
      style={{
        color: "rgba(232,234,246,0.6)",
        fontSize: "1.1rem",
        lineHeight: 1.7,
        fontFamily: "var(--font-body)",
        maxWidth: "520px",
        minHeight: "3.8rem", // prevent layout shift while typing
      }}
    >
      {displayed}
      {!done && <span className="cursor-blink" />}
    </p>
  );
}
