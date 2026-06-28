"use client";

import { useEffect, useState } from "react";
import { BlogLayout } from "@/components/BlogLayout";
import type { BlogPost } from "@/lib/blog-parser.server";

export default function ListPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);

  useEffect(() => {
    fetch("/api/blog/posts")
      .then((res) => res.json())
      .then(setPosts);
  }, []);

  return (
    <div>
      {posts.map((post) => (
        <BlogLayout key={post.slug} post={post} />
      ))}
    </div>
  );
}