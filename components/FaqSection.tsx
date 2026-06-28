"use client";

// FaqSection.tsx
// Light theme — matches the "Expert Board Perspectives" design.
//
// Data flow:
//   BlogLayout passes faqIds (resolved server-side in blog-parser.ts
//   from content/faq/faqs.json, matched by post.eyebrow)
//        ↓
//   FaqSection fetches question + answer text for all faqIds ONCE on mount:
//     GET /api/blog/faq?ids=id1,id2,id3
//        ↓
//   FaqRow is a pure display component — it receives `answer` as a prop.
//   No per-row fetch, no race condition, no "stuck on loading" state.

import { AnimatePresence, motion } from "framer-motion";
import { ChevronDownIcon, ChevronUpIcon } from "lucide-react";
import { useEffect, useState } from "react";

// ── Types ─────────────────────────────────────────────────────────────────────

interface FaqItem {
  id: string;
  question: string;
  answer: string;
  section: string;
}

// ── Single FAQ row — pure display, no fetching ─────────────────────────────────

interface FaqRowProps {
  id: string;
  question: string;
  answer: string;          // ← answer is passed in directly, already loaded
  isOpen: boolean;
  onToggle: () => void;
}

function FaqRow({ id, question, answer, isOpen, onToggle }: FaqRowProps) {
  const panelId = `faq-panel-${id}`;
  const buttonId = `faq-button-${id}`;

  return (
    <motion.div
      layout
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className={`rounded-2xl border transition-colors ${
        isOpen
          ? "border-blue-600 bg-blue-50/40 shadow-sm"
          : "border-transparent bg-slate-50"
      }`}
    >
      <h3>
        <button
          id={buttonId}
          type="button"
          aria-expanded={isOpen}
          aria-controls={panelId}
          onClick={onToggle}
          className="flex w-full items-center justify-between gap-4 px-5 py-5 text-left sm:px-7"
        >
          <span className="text-base font-semibold text-slate-900 sm:text-lg">
            {question}
          </span>
          <span
            className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full transition-colors ${
              isOpen ? "bg-blue-600 text-white" : "bg-slate-200 text-slate-600"
            }`}
          >
            {isOpen ? (
              <ChevronUpIcon className="h-5 w-5" />
            ) : (
              <ChevronDownIcon className="h-5 w-5" />
            )}
          </span>
        </button>
      </h3>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            id={panelId}
            role="region"
            aria-labelledby={buttonId}
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="px-5 pb-6 sm:px-7">
              <div className="mb-5 h-px w-full bg-slate-200" />

              {answer ? (
                <motion.p
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.25 }}
                  className="text-[15px] leading-relaxed text-slate-600"
                >
                  {answer}
                </motion.p>
              ) : (
                <p className="text-sm text-red-500">
                  Sorry, this answer is unavailable right now.
                </p>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// ── FaqSection ────────────────────────────────────────────────────────────────
// Props come from BlogLayout, which resolves them server-side per post:
//   faqIds  — list of FAQ ids matched from content/faq/faqs.json by eyebrow
//   eyebrow — post category, shown as a small label above the heading

interface FaqSectionProps {
  faqIds: string[];
  eyebrow?: string;
}

export function FaqSection({ faqIds, eyebrow }: FaqSectionProps) {
  const [items, setItems] = useState<FaqItem[]>([]);
  const [openId, setOpenId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  // Fetch question + answer text for ALL ids in a single request, once.
  // No per-row fetch — answers come down with the initial payload.
  useEffect(() => {
    if (!faqIds?.length) {
      setLoading(false);
      return;
    }
    setLoading(true);
    setError(false);

    fetch(`/api/blog/faq?ids=${faqIds.join(",")}`)
      .then((r) => {
        if (!r.ok) throw new Error(`FAQ fetch failed: ${r.status}`);
        return r.json();
      })
      .then((data: FaqItem[]) => {
        setItems(data);
        setOpenId(data[0]?.id ?? null); // open the first row by default
      })
      .catch(() => {
        setItems([]);
        setError(true);
      })
      .finally(() => setLoading(false));
  }, [faqIds.join(",")]);

  // Nothing to show and nothing went wrong — don't render an empty section
  if (!loading && !error && items.length === 0) return null;

  return (
    <section className="w-full bg-white px-4 py-16 sm:py-20">
      <div className="mx-auto max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-600">
            {eyebrow ? `${eyebrow} · ` : ""}Expert Board Perspectives
          </p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-blue-900 sm:text-4xl">
            Frequently Asked Questions
          </h2>
          <p className="mx-auto mt-4 max-w-md text-base text-slate-500">
            Clear questions addressing implementation scopes, timing logic, and
            commercial payer parameters.
          </p>
        </motion.div>

        <div className="mt-10 space-y-4">
          {loading && (
            // Skeleton rows while the FAQ list loads — generic placeholders,
            // not tied to any real `answer` variable
            <div className="space-y-4" aria-hidden="true">
              {[0, 1, 2].map((i) => (
                <div
                  key={i}
                  className="h-16 rounded-2xl bg-slate-50 animate-pulse"
                />
              ))}
            </div>
          )}

          {!loading && error && (
            <div className="rounded-2xl border border-red-200 bg-red-50 px-6 py-5 text-center">
              <p className="text-sm text-red-600">
                Could not load FAQs right now. Please refresh the page.
              </p>
            </div>
          )}

          {!loading &&
            !error &&
            items.map((item) => (
              <FaqRow
                key={item.id}
                id={item.id}
                question={item.question}
                answer={item.answer}
                isOpen={openId === item.id}
                onToggle={() =>
                  setOpenId((prev) => (prev === item.id ? null : item.id))
                }
              />
            ))}
        </div>
      </div>
    </section>
  );
}