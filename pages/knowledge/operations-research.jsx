import KnowledgeLayout from "@/components/knowledge/KnowledgeLayout";
import { useI18n } from "@/contexts/I18nContext";
import { getContent } from "@/components/knowledge/content/operations-research";
import { getSkillsForTopic } from "@/lib/topic-skills-loader";

export async function getStaticProps({ locale = "en-AU" }) {
  const relatedSkills = getSkillsForTopic("operations-research");
  return { props: { relatedSkills } };
}

export default function OperationsResearchKnowledgePage({ relatedSkills = [] }) {
  const { locale = "en-AU" } = useI18n();
  const { Body, ...meta } = getContent(locale);

  return (
    <KnowledgeLayout {...meta} relatedSkills={relatedSkills}>
      <Body />
    </KnowledgeLayout>
  );
}
