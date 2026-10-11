import KnowledgeLayout from "@/components/knowledge/KnowledgeLayout";
import { useI18n } from "@/contexts/I18nContext";
import { getContent } from "@/components/knowledge/content/applied-data-science";
import { getSkillsForTopic } from "@/lib/topic-skills-loader";

export async function getStaticProps({ locale = "en-AU" }) {
  const relatedSkills = getSkillsForTopic("applied-data-science");
  return { props: { relatedSkills } };
}

export default function AppliedDataScienceKnowledgePage({ relatedSkills = [] }) {
  const { locale = "en-AU" } = useI18n();
  const { Body, ...meta } = getContent(locale);

  return (
    <KnowledgeLayout {...meta} relatedSkills={relatedSkills}>
      <Body />
    </KnowledgeLayout>
  );
}
