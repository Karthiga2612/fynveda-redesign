import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/sections/Footer";
import { BLOG_POSTS, getBlogPost } from "@/content/blog";

export function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) return {};
  return {
    title: `${post.title} — FynVeda`,
    description: post.excerpt,
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) notFound();

  return (
    <main>
      <Navbar />

      <article
        className="border-l-4 pl-5 bg-vellum text-ink xl:border-l-0 xl:pl-24"
        style={{ borderColor: "var(--rule-on-light)" }}
      >
        <div className="container pt-32 pb-16 md:pt-40 md:pb-24 lg:pb-28">
          <Link
            href="/blog"
            className="inline-flex items-center gap-1.5 text-[14px] font-medium text-iris transition-opacity hover:opacity-80"
          >
            <span aria-hidden="true">←</span>
            Blog
          </Link>

          <div className="mt-8 flex items-center gap-3">
            <span className="text-[11px] font-medium uppercase text-iris" style={{ letterSpacing: "0.06em" }}>
              {post.category}
            </span>
            <span className="tabular text-[13px]" style={{ color: "var(--ink-soft)" }}>
              {post.date}
            </span>
          </div>

          <h1
            className="font-display mt-3 max-w-2xl text-3xl leading-[1.1] sm:text-4xl lg:text-[44px]"
            style={{ letterSpacing: "-0.02em" }}
          >
            {post.title}
          </h1>

          <div className="mt-10 flex max-w-[62ch] flex-col gap-5">
            {post.body.map((block, i) => {
              if (block.type === "h3") {
                return (
                  <h3
                    key={i}
                    className="font-display mt-3 text-[21px] leading-[1.3]"
                    style={{ letterSpacing: "-0.01em" }}
                  >
                    {block.text}
                  </h3>
                );
              }
              if (block.type === "quote") {
                return (
                  <blockquote
                    key={i}
                    className="my-2 pl-5 text-[19px] italic leading-[1.6] text-iris"
                    style={{ borderLeft: "2px solid var(--iris)" }}
                  >
                    {block.text}
                  </blockquote>
                );
              }
              return (
                <p key={i} className="text-[17px] leading-[1.7]" style={{ color: "var(--ink)", opacity: 0.85 }}>
                  {block.text}
                </p>
              );
            })}
          </div>
        </div>
      </article>

      <Footer />
    </main>
  );
}
