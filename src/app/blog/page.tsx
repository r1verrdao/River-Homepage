import Link from "next/link";
import StarParticles from "../../components/effects/StarParticles";
import DiskGalaxies from "../../components/effects/DiskGalaxies";
import ShootingStars from "../../components/effects/ShootingStars";
import BlogSubtitle from "../../components/Blog/BlogSubtitle";
import { allPosts } from "content-collections";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog | Rêveur",
  description: "A place where I write my thoughts on life, universe, and everything in between.",
};

export default function BlogList() {
  const posts = allPosts.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return (
    <main className="section" style={{ minHeight: "100vh", paddingTop: "9rem", paddingBottom: "6rem" }}>
      {/* Background effects */}
      <div className="nebula-purple" style={{ top: "5%", left: "-10%", opacity: 0.45 }} />
      <div className="nebula-cyan" style={{ bottom: "10%", right: "-8%", opacity: 0.3 }} />
      <DiskGalaxies />
      <ShootingStars />
      <StarParticles count={65} />

      <div className="container" style={{ position: "relative", zIndex: 10, maxWidth: "860px" }}>

        {/* Header */}
        <div style={{ marginBottom: "3.5rem" }}>
          <span className="section-tag" style={{ marginBottom: "1.5rem" }}>✦ Digital Garden</span>
          <h1
            className="font-heading"
            style={{
              fontSize: "clamp(2.8rem, 6vw, 4.5rem)",
              fontWeight: 700,
              lineHeight: 1.1,
              letterSpacing: "-0.03em",
              marginBottom: "1.25rem",
            }}
          >
            My <span className="gradient-text-shimmer">Blog</span>
          </h1>
          <BlogSubtitle />

          {/* Stats row */}
          <div
            style={{
              display: "flex",
              gap: "2rem",
              marginTop: "2rem",
              paddingTop: "1.5rem",
              borderTop: "1px solid rgba(255,255,255,0.06)",
            }}
          >
            <div>
              <div
                className="font-heading gradient-text"
                style={{ fontSize: "1.8rem", fontWeight: 700 }}
              >
                {posts.length}
              </div>
              <div style={{ fontSize: "0.78rem", color: "rgba(232,234,246,0.45)", fontFamily: "var(--font-body)" }}>
                Posts
              </div>
            </div>
          </div>
        </div>

        {/* Post list */}
        <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
          {posts.map((post, i) => {
            const wordCount = post.summary?.split(" ").length ?? 100;
            const readMin = Math.max(1, Math.ceil(wordCount / 200));
            return (
              <Link key={post.slug} href={`/blog/${post.slug}`} style={{ textDecoration: "none" }}>
                <article
              className="glass project-card blog-card-animate"
                  style={{
                    padding: "2rem 2.25rem",
                    borderRadius: "20px",
                    display: "block",
                    position: "relative",
                    overflow: "hidden",
                    animationDelay: `${i * 0.15}s`,
                  }}
                >
                  {/* Accent line */}
                  <div
                    style={{
                      position: "absolute",
                      left: 0,
                      top: "15%",
                      bottom: "15%",
                      width: "3px",
                      borderRadius: "0 2px 2px 0",
                      background: i % 2 === 0
                        ? "linear-gradient(180deg, var(--cyan), var(--purple))"
                        : "linear-gradient(180deg, var(--purple), var(--pink))",
                      opacity: 0.7,
                      animation: "accent-pulse 3s ease-in-out infinite",
                      animationDelay: `${i * 0.5}s`,
                    }}
                  />

                  <div style={{ paddingLeft: "0.5rem" }}>
                    {/* Meta row */}
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        marginBottom: "0.75rem",
                        flexWrap: "wrap",
                        gap: "0.5rem",
                      }}
                    >
                      <time
                        style={{
                          fontSize: "0.8rem",
                          color: "rgba(232,234,246,0.45)",
                          fontFamily: "var(--font-body)",
                        }}
                      >
                        {new Date(post.date).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </time>
                      <span
                        style={{
                          fontSize: "0.75rem",
                          color: "rgba(232,234,246,0.35)",
                          fontFamily: "var(--font-body)",
                          background: "rgba(255,255,255,0.04)",
                          padding: "0.2rem 0.6rem",
                          borderRadius: "999px",
                          border: "1px solid rgba(255,255,255,0.06)",
                        }}
                      >
                        {readMin} min read
                      </span>
                    </div>

                    <h2
                      className="font-heading"
                      style={{
                        fontSize: "1.5rem",
                        fontWeight: 700,
                        color: "var(--star-white)",
                        marginBottom: "0.75rem",
                        lineHeight: 1.3,
                      }}
                    >
                      {post.title}
                    </h2>

                    <p
                      style={{
                        color: "rgba(232,234,246,0.65)",
                        lineHeight: 1.75,
                        marginBottom: "1.25rem",
                        fontFamily: "var(--font-body)",
                        fontSize: "0.95rem",
                      }}
                    >
                      {post.summary}
                    </p>

                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        flexWrap: "wrap",
                        gap: "0.75rem",
                      }}
                    >
                      {post.tags && post.tags.length > 0 && (
                        <div style={{ display: "flex", gap: "0.4rem", flexWrap: "wrap" }}>
                          {post.tags.map((tag) => (
                            <span
                              key={tag}
                              style={{
                                fontSize: "0.73rem",
                                padding: "0.25rem 0.7rem",
                                borderRadius: "999px",
                                background: "rgba(0,217,255,0.07)",
                                border: "1px solid rgba(0,217,255,0.15)",
                                color: "var(--cyan)",
                                fontFamily: "var(--font-body)",
                                fontWeight: 500,
                              }}
                            >
                              #{tag}
                            </span>
                          ))}
                        </div>
                      )}
                      <span
                        style={{
                          fontSize: "0.85rem",
                          color: "var(--cyan)",
                          fontFamily: "var(--font-body)",
                          fontWeight: 500,
                        }}
                      >
                        Read more →
                      </span>
                    </div>
                  </div>
                </article>
              </Link>
            );
          })}

          {posts.length === 0 && (
            <div className="glass" style={{ padding: "4rem", borderRadius: "20px", textAlign: "center" }}>
              <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>🌌</div>
              <p style={{ color: "rgba(232,234,246,0.5)", fontStyle: "italic", fontFamily: "var(--font-body)" }}>
                The galaxy is empty... No posts yet.
              </p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
