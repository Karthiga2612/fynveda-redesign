import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/sections/Footer";
import { BLOG_POSTS } from "@/content/blog";

export const metadata: Metadata = {
  title: "Blog — FynVeda",
  description: "Ideas on real net worth, wealth tracking and what most financial apps get wrong.",
};

export default function BlogIndex() {
  return (
    <main>
      <Navbar />

      <section
        className="border-l-4 pl-5 bg-vellum text-ink xl:border-l-0 xl:pl-24"
        style={{ borderColor: "var(--rule-on-light)" }}
      >
        <div className="container pt-32 pb-16 md:pt-40 md:pb-24 lg:pb-28">
          <p className="text-[12px] font-medium uppercase text-iris" style={{ letterSpacing: "0.08em" }}>
            The FynVeda blog
          </p>
          <h1
            className="font-display mt-3 max-w-xl text-3xl leading-[1.1] sm:text-4xl lg:text-[48px]"
            style={{ letterSpacing: "-0.02em" }}
          >
            Ideas on wealth, not just investments.
          </h1>

          <div className="mt-12 grid gap-6 sm:grid-cols-2">
            {BLOG_POSTS.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group flex flex-col rounded-[14px] border p-6 transition-all duration-200 hover:-translate-y-0.5"
                style={{ borderColor: "var(--rule-on-light)", background: "var(--paper-strong)" }}
              >
                <div className="flex items-center gap-3">
                  <span
                    className="text-[11px] font-medium uppercase text-iris"
                    style={{ letterSpacing: "0.06em" }}
                  >
                    {post.category}
                  </span>
                  <span className="tabular text-[13px]" style={{ color: "var(--ink-soft)" }}>
                    {post.date}
                  </span>
                </div>
                <h2
                  className="font-display mt-3 text-[22px] leading-[1.25] transition-colors duration-200 group-hover:text-iris"
                  style={{ letterSpacing: "-0.01em" }}
                >
                  {post.title}
                </h2>
                <p className="mt-3 flex-1 text-[15px] leading-[1.6]" style={{ color: "var(--ink-soft)" }}>
                  {post.excerpt}
                </p>
                <span
                  className="mt-6 inline-flex items-center gap-1.5 text-[14px] font-medium text-iris transition-transform duration-200 group-hover:translate-x-1"
                  aria-hidden="true"
                >
                  Read article
                  <span>→</span>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
