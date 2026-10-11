import KnowledgeLayout from "@/components/knowledge/KnowledgeLayout";
import { useI18n } from "@/contexts/I18nContext";
import { getContent } from "@/components/knowledge/notes/alpha-beta-pruning";

export default function AlphaBetaPruningNotePage() {
  const { locale = "en-AU" } = useI18n();
  const { Body, ...meta } = getContent(locale);

  return (
    <KnowledgeLayout {...meta}>
      <Body />
    </KnowledgeLayout>
  );
}
