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
  if (!post) {
    notFound();
  }

  return (
    <main className="section" style={{ minHeight: "100vh", paddingTop: "8rem", paddingBottom: "4rem" }}>
      {/* Background effects */}
      <div className="nebula-purple" style={{ top: "0%", left: "20%", opacity: 0.3 }} />
      <StarParticles count={20} />

      <article className="container" style={{ position: "relative", zIndex: 10, maxWidth: "800px" }}>
        <Link 
          href="/blog" 
          className="back-link"
          style={{ 
            color: "var(--cyan)", 
            textDecoration: "none", 
            marginBottom: "2.5rem", 
            display: "inline-block", 
            fontFamily: "var(--font-heading)",
            fontSize: "0.95rem",
            fontWeight: 500,
            transition: "all 0.2s ease"
          }}
        >
          ← Back to Blog
        </Link>
        
        <header style={{ marginBottom: "3rem" }}>
          <h1 className="font-heading" style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)", fontWeight: 700, marginBottom: "1rem", lineHeight: 1.2 }}>
            {post.title}
          </h1>
          <div style={{ display: "flex", alignItems: "center", gap: "1rem", color: "rgba(232,234,246,0.5)", fontFamily: "var(--font-body)", fontSize: "0.95rem" }}>
            <time dateTime={post.date}>
              {new Date(post.date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </time>
          </div>
          {post.tags && post.tags.length > 0 && (
            <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", marginTop: "1.5rem" }}>
              {post.tags.map(tag => (
                <span key={tag} style={{ 
                  fontSize: "0.8rem", 
                  padding: "0.4rem 1rem", 
                  borderRadius: "999px", 
                  background: "var(--cyan-dim)", 
                  border: "1px solid rgba(0,217,255,0.2)", 
                  color: "var(--cyan)" 
                }}>
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </header>

        <div className="glass blog-content" style={{ padding: "3rem", borderRadius: "24px" }}>
          <MDXContent code={post.mdx} />
        </div>
      </article>
    </main>
  );
}
