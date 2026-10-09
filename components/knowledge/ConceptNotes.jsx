import Link from "next/link";
import { useI18n } from "@/contexts/I18nContext";
import { noteCopy, noteHref, notesFor } from "@/lib/knowledge-notes";

/**
 * "Concept notes" block on a topic page: one card per live note filed under
 * the topic (lib/knowledge-notes.js). KnowledgeLayout renders it between the
 * prose body and the footer, so topic content files never need editing.
 * Renders nothing when the topic has no notes.
 */
export default function ConceptNotes({ topic }) {
  const { t, locale = "en-AU" } = useI18n();
  const notes = notesFor(topic);
  if (notes.length === 0) return null;

  return (
    <section aria-labelledby="concept-notes-heading" className="mt-16">
      <h2
        id="concept-notes-heading"
        className="flex items-center gap-2.5 font-mono text-[10px] tracking-widest uppercase text-accent-ink"
      >
        <span className="block w-2 h-2 bg-[#FF3C3C]" aria-hidden="true" />
        {t("knowledgeLayout.conceptNotes")}
      </h2>
      <p className="mt-2 text-[13px] text-[#6E6E6E] dark:text-[#9A9A9A] [text-wrap:pretty]">
        {t("knowledgeLayout.conceptNotesBlurb")}
      </p>
      <ul className="mt-5 grid gap-4">
        {notes.map((n) => {
          const copy = noteCopy(n, locale);
          return (
            <li key={n.slug}>
              <Link
                href={noteHref(n.slug)}
                className="group block border border-[#E0E0E0] dark:border-[#2A2A2A] p-5 hover:border-black dark:hover:border-white transition-colors"
              >
                <span className="block text-sm text-[#1A1A1A] dark:text-white group-hover:text-[#FF3C3C] transition-colors">
                  {copy.title}
                </span>
                <span className="block mt-1.5 text-[13px] text-[#6E6E6E] dark:text-[#9A9A9A] [text-wrap:pretty]">
                  {copy.note}
                </span>
                <span className="block mt-2 font-mono text-[10px] tracking-widest uppercase text-[#6E6E6E] dark:text-[#9A9A9A]">
                  {copy.readingTime}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
