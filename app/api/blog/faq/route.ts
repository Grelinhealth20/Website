// GET /api/blog/faq?ids=id1,id2
// GET /api/blog/faq?section=Claim+Integrity
// GET /api/blog/faq  → all items

import { getAllFaqItems, getFaqItemsByIds, getFaqItemsBySection } from "../faqApi";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = req.nextUrl;
    const idsParam = searchParams.get("ids");
    const section  = searchParams.get("section");

    let items;
    if (idsParam) {
      const ids = idsParam.split(",").map((s) => s.trim()).filter(Boolean);
      items = getFaqItemsByIds(ids);
    } else if (section) {
      items = getFaqItemsBySection(section);
    } else {
      items = getAllFaqItems();
    }

    return NextResponse.json(items);
  } catch (err) {
    console.error("[faq route]", err);
    return NextResponse.json([], { status: 200 });
  }
}
