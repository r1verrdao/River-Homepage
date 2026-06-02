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
    <main className="min-h-screen pt-24 pb-12 relative overflow-hidden">
      {/* Background effects */}
      <div className="nebula-purple" style={{ top: "0%", left: "20%", opacity: 0.3 }} />
      <StarParticles count={20} />

      <article className="container relative z-10 max-w-3xl mx-auto px-6">
        <Link href="/blog" className="text-cyan-400 hover:text-cyan-300 transition-colors mb-8 inline-block font-space">
          ← Back to Blog
        </Link>
        
        <header className="mb-10">
          <h1 className="text-3xl md:text-5xl font-bold mb-4 text-white font-space">
            {post.title}
          </h1>
          <div className="flex items-center gap-4 text-gray-400 font-mono text-sm">
            <time dateTime={post.date}>
              {new Date(post.date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </time>
          </div>
          {post.tags && post.tags.length > 0 && (
            <div className="flex gap-2 mt-6 flex-wrap">
              {post.tags.map(tag => (
                <span key={tag} className="text-xs px-3 py-1 rounded-full bg-cyan-900/30 border border-cyan-500/30 text-cyan-300">
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </header>

        <div className="prose prose-invert prose-cyan max-w-none glass-panel p-6 md:p-10 rounded-2xl
          prose-headings:font-space prose-headings:text-cyan-100
          prose-a:text-cyan-400 prose-a:no-underline hover:prose-a:text-cyan-300
          prose-pre:bg-[#0d1117] prose-pre:border prose-pre:border-white/10 prose-pre:shadow-xl
          prose-code:text-purple-300 prose-code:bg-purple-900/20 prose-code:px-1 prose-code:rounded
          prose-strong:text-white prose-p:text-gray-300">
          <MDXContent code={post.mdx} />
        </div>
      </article>
    </main>
  );
}
