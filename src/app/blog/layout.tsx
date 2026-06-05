import BlogNav from "@/components/Blog/BlogNav";

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <BlogNav />
      {children}
    </>
  );
}
