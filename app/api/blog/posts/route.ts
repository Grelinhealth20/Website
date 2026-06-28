import { getAllPosts } from "@/lib/blog-parser.server";
import { NextResponse } from "next/server";

// GET /api/blog/posts
// Called by blog/page.tsx (client) to get all parsed posts
// Returns array of BlogPost — used to populate the listing page
export async function GET() {
  try {
    const posts = getAllPosts();
    return NextResponse.json(posts);
  } catch (err) {
    console.error("[blog/posts] parse error:", err);
    return NextResponse.json([], { status: 200 }); // return empty → client shows fallback
  }
}