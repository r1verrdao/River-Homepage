import { allPosts } from "content-collections";
import { notFound } from "next/navigation";
import { MDXContent } from "@content-collections/mdx/react";
import Link from "next/link";
import StarParticles from "../../../components/effects/StarParticles";

export function generateStaticParams() {
  return allPosts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const post = allPosts.find((p) => p.slug === resolvedParams.slug);
  if (!post) return {};
  return {
    title: `${post.title} | Rêveur Blog`,
    description: post.summary,
  };
}

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const post = allPosts.find((p) => p.slug === resolvedParams.slug);
  if (!post) notFound();

  const wordCount = (post.summary?.split(" ").length ?? 0) * 8;
  const readMin = Math.max(1, Math.ceil(wordCount / 200));

  return (
    <main style={{ minHeight: "100vh", paddingTop: "8rem", paddingBottom: "6rem", position: "relative", overflow: "hidden" }}>
      {/* Background */}
      <div className="nebula-purple" style={{ top: "0%", left: "15%", opacity: 0.3 }} />
      <div className="nebula-cyan" style={{ bottom: "10%", right: "-5%", opacity: 0.25 }} />
      <StarParticles count={20} />

      <article
        className="container"
        style={{ position: "relative", zIndex: 10, maxWidth: "780px" }}
      >
        {/* Back link */}
        <Link
          href="/blog"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.4rem",
            color: "var(--cyan)",
            textDecoration: "none",
            marginBottom: "2.5rem",
            fontFamily: "var(--font-body)",
            fontSize: "0.9rem",
            fontWeight: 500,
            opacity: 0.8,
            transition: "opacity 0.2s",
          }}
        >
          ← Back to Blog
        </Link>

        {/* Header */}
        <header style={{ marginBottom: "3rem" }}>
          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <div style={{ display: "flex", gap: "0.4rem", flexWrap: "wrap", marginBottom: "1.25rem" }}>
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

          <h1
            className="font-heading"
            style={{
              fontSize: "clamp(2rem, 5vw, 3.5rem)",
              fontWeight: 700,
              marginBottom: "1.25rem",
              lineHeight: 1.15,
              letterSpacing: "-0.02em",
            }}
          >
            {post.title}
          </h1>

          {/* Meta */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "1.25rem",
              color: "rgba(232,234,246,0.5)",
              fontFamily: "var(--font-body)",
              fontSize: "0.88rem",
              paddingBottom: "2rem",
              borderBottom: "1px solid rgba(255,255,255,0.06)",
            }}
          >
            <time dateTime={post.date}>
              {new Date(post.date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </time>
            <span style={{ opacity: 0.3 }}>·</span>
            <span>{readMin} min read</span>
            <span style={{ opacity: 0.3 }}>·</span>
            <span>Rêveur</span>
          </div>
        </header>

        {/* Content */}
        <div className="glass blog-content" style={{ padding: "2.5rem 3rem", borderRadius: "24px" }}>
          <MDXContent code={post.mdx} />
        </div>

        {/* Footer nav */}
        <div
          style={{
            marginTop: "3rem",
            paddingTop: "2rem",
            borderTop: "1px solid rgba(255,255,255,0.06)",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Link
            href="/blog"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              padding: "0.7rem 1.5rem",
              borderRadius: "999px",
              border: "1px solid rgba(0,217,255,0.2)",
              color: "var(--cyan)",
              fontFamily: "var(--font-body)",
              fontSize: "0.9rem",
              fontWeight: 500,
              textDecoration: "none",
              background: "rgba(0,217,255,0.05)",
              transition: "all 0.2s ease",
            }}
          >
            ← All Posts
          </Link>
        </div>
      </article>
    </main>
  );
}
