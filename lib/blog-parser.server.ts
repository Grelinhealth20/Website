import * as cheerio from "cheerio";
import fs from "fs";
import path from "path";

export interface ParsedSection {
  heading: string;
  paragraphs: string[];
}

export interface ParsedRelated {
  title: string;
  href: string;
}

export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  author: string;
  date: string;
  readTime: string;
  eyebrow: string;
  keywords: string[];
  lead: string;
  intro: string[];
  sections: ParsedSection[];
  related: ParsedRelated[];
  // FAQ ids resolved from content/faq/faqs.json, matched by eyebrow → section
  faqIds: string[];
}

const POSTS_DIR = path.join(process.cwd(), "content", "blog");

// ── Eyebrow (HTML tag) → faqs.json section name ────────────────────────────────
// Your HTML .eyebrow text doesn't always match the JSON "## section" 1:1.
// This map closes that gap. Add an entry whenever you introduce a new eyebrow.
const EYEBROW_TO_FAQ_SECTION: Record<string, string> = {
  "Claim Integrity":    "Claim Integrity",
  "Revenue Integrity":  "Results and ROI",
  "Wound Care":         "Wound Care",
  "Pain Management":    "Pain Management",
  "MSO":                "MSO",
  "Platform":           "The Grelin Platform",
  "Security":           "Security, AI, and Integration",
};

const DEFAULT_FAQ_SECTION = "The Grelin Platform";

function resolveFaqIds(eyebrow: string): string[] {
  try {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const { getFaqIdsForSection } = require("@/app/api/blog/faqApi");

    const mappedSection = EYEBROW_TO_FAQ_SECTION[eyebrow] ?? eyebrow;
    const ids: string[] = getFaqIdsForSection(mappedSection);

    if (ids.length) return ids;

    // Fallback: always show platform FAQs if no section matched
    return getFaqIdsForSection(DEFAULT_FAQ_SECTION);
  } catch {
    return [];
  }
}

export function parseHtmlPost(slug: string): BlogPost | null {
  const filePath = path.join(POSTS_DIR, `${slug}.html`);
  if (!fs.existsSync(filePath)) return null;

  const html = fs.readFileSync(filePath, "utf-8");
  const $ = cheerio.load(html);

  // ── Title ─────────────────────────────────────────────────────────────────
  const ogTitle  = $('meta[property="og:title"]').attr("content") ?? "";
  const rawTitle = $("title").text().split("|")[0].trim();
  const title    = ogTitle || rawTitle;

  // ── Description: .dek → og → meta ─────────────────────────────────────────
  const dekText  = $(".dek").first().text().trim();
  const ogDesc   = $('meta[property="og:description"]').attr("content") ?? "";
  const metaDesc = $('meta[name="description"]').attr("content") ?? "";
  const description = dekText || ogDesc || metaDesc;

  // ── Keywords ───────────────────────────────────────────────────────────────
  const keywordsStr = $('meta[name="keywords"]').attr("content") ?? "";
  const keywords = keywordsStr.split(",").map((k) => k.trim()).filter(Boolean);

  // ── Author + date from JSON-LD ─────────────────────────────────────────────
  let author = "Grelin Health";
  let date   = "";
  const ldScript = $('script[type="application/ld+json"]').html() ?? "";
  if (ldScript) {
    try {
      const ld = JSON.parse(ldScript);
      author = ld?.author?.name ?? author;
      date   = ld?.datePublished ?? "";
    } catch { /* ignore */ }
  }

  // ── Eyebrow ────────────────────────────────────────────────────────────────
  const eyebrow = $(".eyebrow").first().text().trim();

  // ── Read time ──────────────────────────────────────────────────────────────
  const bylineText = $(".byline").text();
  const readMatch  = bylineText.match(/(\d+\s*min\s*read)/i);
  const readTime   = readMatch ? readMatch[1] : "3 min read";

  // ── Lead ───────────────────────────────────────────────────────────────────
  const lead = $("article p.lead").first().text().trim();

  // ── Intro + sections ───────────────────────────────────────────────────────
  const intro: string[] = [];
  const sections: ParsedSection[] = [];
  let currentSection: ParsedSection | null = null;
  let passedLead = false;

  $("article").children().each((_, el) => {
    const tag = el.type === "tag" ? el.name : null;
    if (!tag) return;
    if ($(el).hasClass("related")) return;

    if (tag === "h2") {
      currentSection = { heading: $(el).text().trim(), paragraphs: [] };
      sections.push(currentSection);
      return;
    }
    if (tag === "p") {
      const text = $(el).text().trim();
      if (!text) return;
      if (!passedLead && $(el).hasClass("lead")) { passedLead = true; return; }
      if (currentSection) currentSection.paragraphs.push(text);
      else intro.push(text);
    }
  });

  // ── Related ────────────────────────────────────────────────────────────────
  const related: ParsedRelated[] = [];
  $(".related a").each((_, el) => {
    const href  = $(el).attr("href") ?? "#";
    const clone = $(el).clone();
    clone.find("span").remove();
    const linkTitle = clone.text().trim();
    if (linkTitle) related.push({ title: linkTitle, href });
  });

  // ── FAQ ids — from content/faq/faqs.json, matched by eyebrow ──────────────
  const faqIds = resolveFaqIds(eyebrow);

  return {
    slug, title, description, author, date, readTime,
    eyebrow, keywords, lead, intro, sections, related, faqIds,
  };
}

export function getAllHtmlSlugs(): string[] {
  if (!fs.existsSync(POSTS_DIR)) return [];
  return fs
    .readdirSync(POSTS_DIR)
    .filter((f) => f.endsWith(".html"))
    .map((f) => f.replace(/\.html$/, ""));
}

export function getAllPosts(): BlogPost[] {
  return getAllHtmlSlugs()
    .map(parseHtmlPost)
    .filter(Boolean)
    .sort((a, b) => {
      const da = a!.date ? new Date(a!.date).getTime() : 0;
      const db = b!.date ? new Date(b!.date).getTime() : 0;
      return db - da;
    }) as BlogPost[];
}
