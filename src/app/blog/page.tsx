import Link from "next/link";
import StarParticles from "../../components/effects/StarParticles";
import { allPosts } from "content-collections";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog | Rêveur",
  description: "Writings on AI, Machine Learning, and the cosmos.",
};

export default function BlogList() {
  // Sort posts by date, descending
  const posts = allPosts.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return (
    <main className="section" style={{ minHeight: "100vh", paddingTop: "8rem", paddingBottom: "4rem" }}>
      {/* Background effects */}
      <div className="nebula-purple" style={{ top: "10%", left: "-10%", opacity: 0.4 }} />
      <StarParticles count={30} />

      <div className="container" style={{ position: "relative", zIndex: 10, maxWidth: "900px" }}>
        <h1 className="font-heading" style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)", fontWeight: 700, marginBottom: "1rem" }}>
          My <span className="gradient-text">Digital Garden</span>
        </h1>
        <p style={{ color: "rgba(232,234,246,0.65)", marginBottom: "4rem", fontSize: "1.1rem" }}>
          Exploring artificial intelligence, code, and the universe.
        </p>

        <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
          {posts.map((post) => (
            <Link key={post.slug} href={`/blog/${post.slug}`} style={{ textDecoration: "none" }}>
              <article className="glass project-card" style={{ padding: "2rem", borderRadius: "20px", display: "block" }}>
                <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem", marginBottom: "1rem" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", flexWrap: "wrap", gap: "1rem" }}>
                    <h2 className="font-heading" style={{ fontSize: "1.8rem", fontWeight: 700, color: "var(--star-white)" }}>
                      {post.title}
                    </h2>
                    <time style={{ fontSize: "0.9rem", color: "rgba(232,234,246,0.5)", fontFamily: "var(--font-body)" }}>
                      {new Date(post.date).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </time>
                  </div>
                </div>
                
                <p style={{ color: "rgba(232,234,246,0.7)", lineHeight: 1.7, marginBottom: "1.5rem" }}>
                  {post.summary}
                </p>

                {post.tags && post.tags.length > 0 && (
                  <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
                    {post.tags.map(tag => (
                      <span key={tag} style={{ 
                        fontSize: "0.75rem", 
                        padding: "0.3rem 0.8rem", 
                        borderRadius: "999px", 
                        background: "rgba(255,255,255,0.05)", 
                        border: "1px solid rgba(255,255,255,0.1)", 
                        color: "var(--cyan)" 
                      }}>
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}
              </article>
            </Link>
          ))}
          
          {posts.length === 0 && (
            <div className="glass" style={{ padding: "3rem", borderRadius: "20px", textAlign: "center" }}>
              <p style={{ color: "rgba(232,234,246,0.5)", fontStyle: "italic" }}>
                The galaxy is empty... No posts found.
              </p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
