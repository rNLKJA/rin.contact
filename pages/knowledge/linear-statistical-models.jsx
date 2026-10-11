import KnowledgeLayout from "@/components/knowledge/KnowledgeLayout";
import { useI18n } from "@/contexts/I18nContext";
import { getContent } from "@/components/knowledge/content/linear-statistical-models";
import { getSkillsForTopic } from "@/lib/topic-skills-loader";

export async function getStaticProps({ locale = "en-AU" }) {
  const relatedSkills = getSkillsForTopic("linear-statistical-models");
  return { props: { relatedSkills } };
}

export default function LinearStatisticalModelsKnowledgePage({ relatedSkills = [] }) {
  const { locale = "en-AU" } = useI18n();
  const { Body, ...meta } = getContent(locale);

  return (
    <KnowledgeLayout {...meta} relatedSkills={relatedSkills}>
      <Body />
    </KnowledgeLayout>
  );
}
