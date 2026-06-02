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
    <main className="min-h-screen pt-24 pb-12 relative overflow-hidden">
      {/* Background effects */}
      <div className="nebula-purple" style={{ top: "10%", left: "-10%", opacity: 0.4 }} />
      <StarParticles count={30} />

      <div className="container relative z-10 max-w-4xl mx-auto px-6">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 font-space">
          My <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">Digital Garden</span>
        </h1>
        <p className="text-gray-400 mb-12 text-lg">
          Exploring artificial intelligence, code, and the universe.
        </p>

        <div className="grid gap-6">
          {posts.map((post) => (
            <Link key={post.slug} href={`/blog/${post.slug}`}>
              <article className="glass-panel p-6 rounded-2xl hover:border-cyan-500/30 transition-all duration-300 group cursor-pointer block">
                <div className="flex flex-col md:flex-row md:items-baseline justify-between mb-2">
                  <h2 className="text-2xl font-bold font-space group-hover:text-cyan-400 transition-colors">
                    {post.title}
                  </h2>
                  <time className="text-sm text-gray-500 font-mono shrink-0 mt-2 md:mt-0">
                    {new Date(post.date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </time>
                </div>
                
                <p className="text-gray-400 line-clamp-2 mt-2">
                  {post.summary}
                </p>

                {post.tags && post.tags.length > 0 && (
                  <div className="flex gap-2 mt-4 flex-wrap">
                    {post.tags.map(tag => (
                      <span key={tag} className="text-xs px-2 py-1 rounded-full bg-white/5 border border-white/10 text-cyan-200">
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}
              </article>
            </Link>
          ))}
          
          {posts.length === 0 && (
            <p className="text-gray-500 italic text-center py-10 glass-panel rounded-2xl">
              The galaxy is empty... No posts found.
            </p>
          )}
        </div>
      </div>
    </main>
  );
}
