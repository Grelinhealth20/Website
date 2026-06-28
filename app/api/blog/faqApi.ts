// ─── faqApi.ts ────────────────────────────────────────────────────────────────
// Runs on the SERVER only. Reads content/faq/faqs.json directly — no markdown
// parsing, no regex. JSON.parse is effectively free compared to the old MD walk.
//
// CLIENT usage: fetch("/api/blog/faq?ids=id1,id2")
// SERVER usage: import { getFaqItemsBySection, getFaqIdsForSection } from "./faqApi"

import fs from "fs";
import path from "path";

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  section: string;
}

interface FaqJson {
  sections: Record<string, Omit<FaqItem, "section">[]>;
}

const FAQ_JSON_PATH = path.join(process.cwd(), "content", "faq", "faqs.json");

// ── In-memory cache ────────────────────────────────────────────────────────────
// JSON.parse runs once per server lifetime (not per request) unless the file
// changes on disk. This is the main perf win vs the old markdown parser.
let cache: FaqItem[] | null = null;
let cacheMtime = 0;

function loadFaqs(): FaqItem[] {
  if (!fs.existsSync(FAQ_JSON_PATH)) return [];

  const stat = fs.statSync(FAQ_JSON_PATH);
  const mtime = stat.mtimeMs;

  // Reuse cache unless the file has been edited since last read
  if (cache && mtime === cacheMtime) return cache;

  const raw = fs.readFileSync(FAQ_JSON_PATH, "utf-8");
  const data: FaqJson = JSON.parse(raw);

  const flat: FaqItem[] = [];
  for (const [section, items] of Object.entries(data.sections)) {
    for (const item of items) {
      flat.push({ ...item, section });
    }
  }

  cache = flat;
  cacheMtime = mtime;
  return flat;
}

// ── Public API ────────────────────────────────────────────────────────────────

export function getAllFaqItems(): FaqItem[] {
  return loadFaqs();
}

export function getFaqItemsByIds(ids: string[]): FaqItem[] {
  const all = loadFaqs();
  if (!ids.length) return all;
  const byId = new Map(all.map((f) => [f.id, f]));
  return ids.map((id) => byId.get(id)).filter(Boolean) as FaqItem[];
}

export function getFaqItemsBySection(section: string): FaqItem[] {
  return loadFaqs().filter(
    (f) => f.section.toLowerCase() === section.toLowerCase()
  );
}

export function getFaqAnswer(id: string): string {
  return loadFaqs().find((f) => f.id === id)?.answer ?? "";
}

export function getFaqIdsForSection(section: string): string[] {
  return getFaqItemsBySection(section).map((f) => f.id);
}

// All section names available — useful for debugging / admin UI
export function getAllFaqSections(): string[] {
  const data: FaqJson = JSON.parse(fs.readFileSync(FAQ_JSON_PATH, "utf-8"));
  return Object.keys(data.sections);
}

// ── Client-side fetch helper ────────────────────────────────────────────────────
export async function fetchFaqAnswer(id: string): Promise<string> {
  const res = await fetch(`/api/blog/faq?ids=${id}`);
  if (!res.ok) throw new Error("faq fetch failed");
  const data: FaqItem[] = await res.json();
  return data[0]?.answer ?? "";
}
