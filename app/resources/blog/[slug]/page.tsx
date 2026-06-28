// SERVER COMPONENT — no "use client"

import { BlogLayout } from "@/components/BlogLayout";
import { getAllHtmlSlugs, parseHtmlPost } from "@/lib/blog-parser.server";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return getAllHtmlSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;          // ← await params (Next.js 15)
  const post = parseHtmlPost(slug);
  if (!post) return {};

  return {
    title: `${post.title} | Grelin Health`,
    description: post.description,
    keywords: post.keywords,
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      publishedTime: post.date,
      authors: [post.author],
      siteName: "Grelin Health",
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
    },
    alternates: {
      canonical: `https://grelinhealth.com/resources/blog/${slug}`,
    },
    robots: { index: true, follow: true },
  };
}

function BlogPostJsonLd({
  post,
}: {
  post: NonNullable<ReturnType<typeof parseHtmlPost>>;
}) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    author: {
      "@type": "Organization",
      name: post.author,
      url: "https://grelinhealth.com",
    },
    publisher: {
      "@type": "Organization",
      name: "Grelin Health",
      url: "https://grelinhealth.com",
    },
    datePublished: post.date,
    dateModified: post.date,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://grelinhealth.com/resources/blog/${post.slug}`,
    },
    articleSection: post.eyebrow,
    keywords: post.keywords.join(", "),
    ...(post.sections.length > 0 && {
      hasPart: post.sections.map((s) => ({
        "@type": "WebPageElement",
        name: s.heading,
        text: s.paragraphs.join(" "),
      })),
    }),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;          // ← await params (Next.js 15)
  const post = parseHtmlPost(slug);
  if (!post) notFound();

  return (
    <>
      <BlogPostJsonLd post={post} />
      <BlogLayout post={post} />
    </>
  );
}